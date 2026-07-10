import { NextRequest, NextResponse } from 'next/server';
import { getAds, toggleAd } from '@/lib/metaClient';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

interface OptimizerSettings {
  enabled: boolean;
  maxCostPerMessage: number;
  minSpendToEvaluate: number;
  maxActiveAds: number;
}

const DEFAULT_SETTINGS: OptimizerSettings = {
  enabled: true,
  maxCostPerMessage: 5000,
  minSpendToEvaluate: 8000,
  maxActiveAds: 4,
};

export async function GET(req: NextRequest) {
  // Verificación estándar de Vercel Cron
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let settings = { ...DEFAULT_SETTINGS };
    
    // Obtener configuración desde Firebase si está disponible
    if (db) {
      const settingsDoc = await getDoc(doc(db, 'settings', 'optimizer'));
      if (settingsDoc.exists()) {
        settings = settingsDoc.data() as OptimizerSettings;
      }
    }

    if (!settings.enabled) {
      return NextResponse.json({ success: false, message: 'Optimizer is disabled' });
    }

    // Obtener los anuncios actuales
    const ads = await getAds();
    const activeAds = ads.filter((a: any) => a.status === 'ACTIVE');
    const pausedAds = ads.filter((a: any) => a.status === 'PAUSED');

    const actionsTaken: string[] = [];
    let projectedActiveCount = activeAds.length;

    // Regla A: Evaluar anuncios activos para pausar los de bajo rendimiento
    for (const ad of activeAds) {
      if (ad.spend >= settings.minSpendToEvaluate) {
        if (ad.conversations === 0) {
          await toggleAd(ad.id, 'PAUSED');
          actionsTaken.push(`Se pausó el anuncio ${ad.id} (${ad.name}). Motivo: Gasto de $${ad.spend.toLocaleString('es-CO')} sin conversaciones.`);
          projectedActiveCount--;
        } else if (ad.costPerConversation > settings.maxCostPerMessage) {
          await toggleAd(ad.id, 'PAUSED');
          actionsTaken.push(`Se pausó el anuncio ${ad.id} (${ad.name}). Motivo: CPA de $${ad.costPerConversation.toLocaleString('es-CO')} supera el límite de $${settings.maxCostPerMessage.toLocaleString('es-CO')}.`);
          projectedActiveCount--;
        }
      }
    }

    // Regla B: Activar anuncios pausados (Rotación) si hay espacio debajo del límite
    if (projectedActiveCount < settings.maxActiveAds) {
      const slotsAvailable = settings.maxActiveAds - projectedActiveCount;
      const candidates = pausedAds.sort((a: any, b: any) => b.ctr - a.ctr);

      for (let i = 0; i < Math.min(slotsAvailable, candidates.length); i++) {
        const candidate = candidates[i];
        await toggleAd(candidate.id, 'ACTIVE');
        actionsTaken.push(`Se activó el anuncio ${candidate.id} (${candidate.name}). Motivo: Espacio disponible y buen CTR histórico (${candidate.ctr}%).`);
        projectedActiveCount++;
      }
    }

    // Registrar en Firebase las acciones tomadas por el Cron
    if (actionsTaken.length > 0 && db) {
      const newLog = {
        timestamp: new Date().toISOString(),
        actions: actionsTaken,
        activeCount: projectedActiveCount,
        pausedCount: ads.length - projectedActiveCount,
        source: 'vercel_cron'
      };
      await addDoc(collection(db, 'optimizer_logs'), newLog);
    } else if (actionsTaken.length === 0 && db) {
       // Log de chequeo sin cambios (opcional, útil para saber que el cron sí corre)
       const pingLog = {
        timestamp: new Date().toISOString(),
        actions: ['Cron check: Sin cambios requeridos.'],
        activeCount: projectedActiveCount,
        pausedCount: ads.length - projectedActiveCount,
        source: 'vercel_cron_ping'
      };
      await addDoc(collection(db, 'optimizer_logs'), pingLog);
    }

    return NextResponse.json({
      success: true,
      actionsTaken,
    });
  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: error.message || 'Cron Optimization failed' }, { status: 500 });
  }
}
