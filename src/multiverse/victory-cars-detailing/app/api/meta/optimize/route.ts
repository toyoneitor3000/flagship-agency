import { NextRequest, NextResponse } from 'next/server';
import { getAds, toggleAd } from '@/lib/metaClient';
import { checkAuth } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

interface OptimizerSettings {
  enabled: boolean;
  maxCostPerMessage: number; // in COP
  minSpendToEvaluate: number; // in COP
  maxActiveAds: number;
}

const DEFAULT_SETTINGS: OptimizerSettings = {
  enabled: true,
  maxCostPerMessage: 5000,
  minSpendToEvaluate: 8000,
  maxActiveAds: 4,
};

// Local storage fallback in case Firebase is not connected
let localSettings = { ...DEFAULT_SETTINGS };
let localLogs: any[] = [
  {
    id: 'log_initial',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    actions: ['Sistema inicializado. Se detectaron 18 anuncios.'],
    activeCount: 4,
    pausedCount: 14,
  }
];

export async function GET(req: NextRequest) {
  if (!req) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let settings = { ...localSettings };
  let logs = [...localLogs];

  // Try to load from Firestore if configured
  if (db) {
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'optimizer'));
      if (settingsDoc.exists()) {
        settings = settingsDoc.data() as OptimizerSettings;
      }
      
      const logsSnap = await getDocs(collection(db, 'optimizer_logs'));
      const dbLogs: any[] = [];
      logsSnap.forEach((docSnap) => {
        dbLogs.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (dbLogs.length > 0) {
        logs = dbLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      }
    } catch (e) {
      console.warn('Firebase query failed in optimize route, using memory database:', e);
    }
  }

  return NextResponse.json({ settings, logs });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    // 1. Save Settings
    if (action === 'save_settings') {
      const { settings } = body;
      if (!settings) {
        return NextResponse.json({ error: 'Missing settings' }, { status: 400 });
      }

      if (db) {
        await setDoc(doc(db, 'settings', 'optimizer'), settings);
      } else {
        localSettings = { ...settings };
      }

      return NextResponse.json({ success: true, settings });
    }

    // 2. Run Optimizer (Generate Proposals)
    if (action === 'run') {
      let settings = { ...localSettings };
      if (db) {
        const settingsDoc = await getDoc(doc(db, 'settings', 'optimizer'));
        if (settingsDoc.exists()) {
          settings = settingsDoc.data() as OptimizerSettings;
        }
      }

      if (!settings.enabled) {
        return NextResponse.json({ success: false, message: 'Optimizer is disabled' });
      }

      // Fetch current ads
      const ads = await getAds();
      const activeAds = ads.filter(a => a.status === 'ACTIVE');
      const pausedAds = ads.filter(a => a.status === 'PAUSED');

      const proposals: any[] = [];
      let projectedActiveCount = activeAds.length;

      // Rule A: Evaluate active ads to pause underperforming ones
      for (const ad of activeAds) {
        // Evaluate only if spend exceeds min threshold
        if (ad.spend >= settings.minSpendToEvaluate) {
          // If no conversations at all
          if (ad.conversations === 0) {
            proposals.push({
              id: `prop_${ad.id}`,
              adId: ad.id,
              adName: ad.name,
              suggestedAction: 'PAUSED',
              reason: `Gasto acumulado de $${ad.spend.toLocaleString('es-CO')} COP sin generar ningún mensaje.`,
              urgency: 'HIGH'
            });
            projectedActiveCount--;
          } 
          // If cost per conversation exceeds threshold
          else if (ad.costPerConversation > settings.maxCostPerMessage) {
             proposals.push({
              id: `prop_${ad.id}`,
              adId: ad.id,
              adName: ad.name,
              suggestedAction: 'PAUSED',
              reason: `Costo por mensaje de $${ad.costPerConversation.toLocaleString('es-CO')} COP supera límite de $${settings.maxCostPerMessage.toLocaleString('es-CO')} COP.`,
              urgency: 'MEDIUM'
            });
            projectedActiveCount--;
          }
        }
      }

      // Rule B: Rotate/Activate paused ads if below max active limit
      if (projectedActiveCount < settings.maxActiveAds) {
        const slotsAvailable = settings.maxActiveAds - projectedActiveCount;
        
        // Find best paused candidates based on historical CTR (highest first)
        const candidates = ads
          .filter(a => a.status === 'PAUSED')
          .sort((a, b) => b.ctr - a.ctr); // Sort by CTR descending

        for (let i = 0; i < Math.min(slotsAvailable, candidates.length); i++) {
          const candidate = candidates[i];
          proposals.push({
            id: `prop_act_${candidate.id}`,
            adId: candidate.id,
            adName: candidate.name,
            suggestedAction: 'ACTIVE',
            reason: `Espacio disponible en la campaña. Histórico de CTR aceptable (${candidate.ctr}%).`,
            urgency: 'LOW'
          });
          projectedActiveCount++;
        }
      }

      return NextResponse.json({
        success: true,
        proposals,
      });
    }

    // 3. Apply Proposal
    if (action === 'apply_proposal') {
      const { adId, suggestedAction, reason } = body;
      
      // Call Meta API
      await toggleAd(adId, suggestedAction);

      // Record log of user-approved action
      const newLog = {
        timestamp: new Date().toISOString(),
        actions: [`Usuario aprobó ${suggestedAction === 'PAUSED' ? 'pausar' : 'activar'} anuncio ${adId}. Motivo: ${reason}`],
        activeCount: 0,
        pausedCount: 0,
      };

      if (db) {
        await addDoc(collection(db, 'optimizer_logs'), newLog);
      } else {
        localLogs.unshift({ id: `log_${Date.now()}`, ...newLog });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Optimization failed' }, { status: 500 });
  }
}
