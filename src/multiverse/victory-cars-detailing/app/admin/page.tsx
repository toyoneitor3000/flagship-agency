'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  DollarSign, 
  Car, 
  MessageSquare, 
  ArrowRight,
  TrendingDown,
  Percent,
  Play,
  RotateCw,
  AlertCircle,
  Users,
  Megaphone,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Loader2,
  Calendar,
  X,
  PlayCircle,
  Upload,
  Instagram,
  ImageIcon,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { MARKETING_CATEGORIES } from '@/lib/marketingConfig';
import AdsHierarchyTable from '../components/AdsHierarchyTable';
import AdLauncher from '../components/AdLauncher';
import MassTestManager from '../components/MassTestManager';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface MetaInsights {
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversations: number;
  costPerConversation: number;
  isMock: boolean;
}

export interface MetaAd {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  spend: number;
  ctr: number;
  clicks: number;
  conversations: number;
  costPerConversation: number;
  imageUrl?: string;
  startTime?: string;
}

export interface MetaCampaign {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | string;
  spend: number;
  clicks: number;
  ctr: number;
  conversations: number;
  costPerConversation: number;
}

export interface MetaAdSet {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | string;
  campaign_id: string;
  spend: number;
  clicks: number;
  ctr: number;
  conversations: number;
  costPerConversation: number;
}

interface Lead {
  id: string;
  name: string;
  vehicle: string;
  plate: string;
  service: string;
  price: number;
  status: string;
  timestamp: string;
}

interface OptimizerSettings {
  enabled: boolean;
  maxCostPerMessage: number;
  minSpendToEvaluate: number;
  maxActiveAds: number;
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [insights, setInsights] = useState<MetaInsights | null>(null);
  const [ads, setAds] = useState<MetaAd[]>([]);
  const [campaigns, setCampaigns] = useState<MetaCampaign[]>([]);
  const [adsets, setAdsets] = useState<MetaAdSet[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeFunnelTab, setActiveFunnelTab] = useState<'tofu' | 'mofu' | 'bofu'>('tofu');
  const [selectedAdMedia, setSelectedAdMedia] = useState<{img: string, title: string, copy: string, videoUrl?: string} | null>(null);
  const [adPlacement, setAdPlacement] = useState<'reels' | 'feed'>('reels');
  const [realCreatives, setRealCreatives] = useState<any[]>([]);
  const [loadingCreatives, setLoadingCreatives] = useState(true);
  
  // Optimizer state
  const [optimizing, setOptimizing] = useState(false);
  const [optimizerLog, setOptimizerLog] = useState<string[] | null>(null);
  const [proposals, setProposals] = useState<any[] | null>(null);
  const [settings, setSettings] = useState<OptimizerSettings>({
    enabled: true,
    maxCostPerMessage: 5000,
    minSpendToEvaluate: 8000,
    maxActiveAds: 4
  });
  const [savingSettings, setSavingSettings] = useState(false);

  // Launcher state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editableCopy, setEditableCopy] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('victory_admin_token');
    const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

    try {
      // 1. Fetch Meta insights
      const insightsRes = await fetch('/api/meta/insights', { headers });
      if (insightsRes.ok) {
        const insightsData = await insightsRes.json();
        setInsights(insightsData);
      }

      // 2. Fetch Ads, Campaigns, Adsets
      const [adsRes, campRes, adsetRes] = await Promise.all([
        fetch('/api/meta/ads', { headers }),
        fetch('/api/meta/campaigns', { headers }),
        fetch('/api/meta/adsets', { headers })
      ]);

      if (adsRes.ok) {
        const adsData = await adsRes.json();
        setAds(adsData.ads || []);
      }
      if (campRes.ok) {
        const campData = await campRes.json();
        setCampaigns(campData.campaigns || []);
      }
      if (adsetRes.ok) {
        const adsetData = await adsetRes.json();
        setAdsets(adsetData.adsets || []);
      }

      // 3. Fetch Optimizer Settings
      const optRes = await fetch('/api/meta/optimize', { headers });
      if (optRes.ok) {
        const optData = await optRes.json();
        if (optData.settings) setSettings(optData.settings);
      }

      // 4. Load Leads from local storage
      const storedLeads = localStorage.getItem('victory_crm_leads_v2');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      } else {
        setLeads([]);
      }

      // 5. Fetch Creatives
      setLoadingCreatives(true);
      const creativesRes = await fetch('/api/meta/creatives', { headers });
      if (creativesRes.ok) {
        const creativesData = await creativesRes.json();
        if (creativesData && creativesData.data) {
          // Filtrar las publicaciones reales de Victory Cars
          const victoryCarsCreatives = creativesData.data.filter((c: any) => 
            (c.thumbnail_url || c.image_url) &&
            (c.object_story_spec?.page_id === '107779549069255' || 
             c.instagram_actor_id === '17841460906674455')
          );
          setRealCreatives(victoryCarsCreatives);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingCreatives(false);
    }
  };

  const runOptimizer = async () => {
    setOptimizing(true);
    setProposals(null);
    setOptimizerLog(null);
    const token = localStorage.getItem('victory_admin_token');
    const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };

    try {
      const res = await fetch('/api/meta/optimize', { method: 'POST', headers, body: JSON.stringify({ action: 'run' }) });
      const data = await res.json();
      if (data.success && data.proposals) {
        setProposals(data.proposals);
        if (data.proposals.length === 0) {
          setOptimizerLog(['Evaluación completada. Todos los anuncios activos tienen un rendimiento óptimo.']);
        }
      } else {
        setOptimizerLog(['Error: El optimizador automático está desactivado o la petición falló.']);
      }
    } catch (err) {
      setOptimizerLog(['Error de red al ejecutar el optimizador.']);
    } finally {
      setOptimizing(false);
    }
  };

  const handleApplyProposal = async (proposalId: string, adId: string, suggestedAction: string, reason: string) => {
    const token = localStorage.getItem('victory_admin_token');
    const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };

    try {
      const res = await fetch('/api/meta/optimize', { 
        method: 'POST', 
        headers, 
        body: JSON.stringify({ action: 'apply_proposal', adId, suggestedAction, reason }) 
      });
      const data = await res.json();
      if (data.success) {
        // Remove from list
        setProposals(prev => prev ? prev.filter(p => p.id !== proposalId) : null);
        fetchData(); // Reload ads data
      }
    } catch (err) {
      console.error('Failed to apply proposal', err);
    }
  };

  const handleToggleAdStatus = async (adId: string, currentStatus: 'ACTIVE' | 'PAUSED') => {
    const token = localStorage.getItem('victory_admin_token');
    const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    try {
      const res = await fetch('/api/meta/ads', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', adId, status: newStatus })
      });
      if (res.ok) {
        fetchData(); // reload ads
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    const token = localStorage.getItem('victory_admin_token');
    try {
      const res = await fetch('/api/meta/optimize', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_settings', settings })
      });
      if (res.ok) {
        alert('Configuración guardada.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingSettings(false);
    }
  };

  // Calculations
  const completedLeads = leads.filter(l => l.status === 'completed');
  const totalRevenue = completedLeads.reduce((acc, lead) => acc + lead.price, 0);
  const totalSpend = insights?.spend || 0;
  const roas = totalSpend > 0 ? parseFloat((totalRevenue / totalSpend).toFixed(2)) : 0;
  const cac = completedLeads.length > 0 ? Math.round(totalSpend / completedLeads.length) : 0;
  
  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);
  };

  const activeAdsCount = ads.filter(a => a.status === 'ACTIVE').length;

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-12">

          {/* 1. TOP KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white backdrop-blur-2xl border border-apple-border p-6 rounded-3xl flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-apple-subtext text-xs font-semibold uppercase tracking-wider">Ingresos CRM (Mes)</span>
            <h3 className="text-2xl font-bold text-apple-text tracking-wide">{formatCOP(totalRevenue)}</h3>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 text-emerald-500">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white backdrop-blur-2xl border border-apple-border p-6 rounded-3xl flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-apple-subtext text-xs font-semibold uppercase tracking-wider">Inversión Meta Ads</span>
            <h3 className="text-2xl font-bold text-apple-text tracking-wide">{formatCOP(totalSpend)}</h3>
          </div>
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 text-apple-blue">
            <Megaphone className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white backdrop-blur-2xl border border-apple-border p-6 rounded-3xl flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-apple-subtext text-xs font-semibold uppercase tracking-wider">Retorno (ROAS)</span>
            <h3 className="text-2xl font-bold text-apple-text tracking-wide">{roas}x</h3>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 text-amber-500">
            <Percent className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white backdrop-blur-2xl border border-apple-border p-6 rounded-3xl flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-apple-subtext text-xs font-semibold uppercase tracking-wider">CAC (Costo Cliente)</span>
            <h3 className="text-2xl font-bold text-apple-text tracking-wide">{formatCOP(cac)}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 text-blue-500">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* MASS TEST & LAUNCHER AI (Moved to Top) */}
      <div className="mb-8">
        <MassTestManager />
      </div>
      
      <div className="mb-8">
        <AdLauncher />
      </div>

      {/* 2. PUBLICACIONES REALES META ADS */}
      <div className="bg-white backdrop-blur-2xl border border-apple-border p-6 rounded-3xl space-y-6 border-l-4 border-l-apple-blue">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Instagram className="w-6 h-6 text-pink-500" />
              <h3 className="text-lg font-bold text-slate-800">Tus Publicaciones Reales (Instagram/Facebook)</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Aquí están los creativos 100% reales que ya están en tu cuenta de Meta. Utilizaremos estos (Existing Posts) para no crear falsos anuncios.
            </p>
          </div>
          <button className="bg-apple-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center transition-colors">
            <Sparkles className="w-4 h-4 mr-2" /> Lanzar Nueva Campaña
          </button>
        </div>

        <div className="pt-2">
          {loadingCreatives ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-8 h-8 text-apple-blue animate-spin" />
              <span className="ml-3 text-sm font-bold text-slate-600">Conectando con tu Instagram...</span>
            </div>
          ) : realCreatives.length === 0 ? (
            <p className="text-sm text-slate-500">No se encontraron creativos con imagen o video en tu cuenta.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {realCreatives.map((creative, i) => {
                const img = creative.thumbnail_url || creative.image_url;
                const title = creative.name || `Publicación ${i + 1}`;
                const copy = creative.body || creative.object_story_spec?.video_data?.message || '';

                return (
                  <div 
                    key={creative.id}
                    onClick={() => setSelectedAdMedia({
                      img, 
                      title, 
                      copy
                    })}
                    className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-3 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0 bg-slate-100">
                        <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={title} />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <span className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{title}</span>
                        <p className="text-[9px] text-slate-500 mt-1 line-clamp-3">{copy}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex gap-2 text-[9px] font-bold">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Post Existente</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center"><MessageSquare className="w-3 h-3 mr-1"/> ID: {creative.id.slice(-6)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3. ADS HIERARCHY TABLE */}
      {loading ? (
        <div className="h-40 flex items-center justify-center text-apple-subtext text-sm border border-apple-border rounded-3xl bg-white">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Cargando datos de Meta...
        </div>
      ) : (
        <AdsHierarchyTable campaigns={campaigns} adsets={adsets} ads={ads} />
      )}

      {/* 3. OPTIMIZER CONTROL */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Optimizador Control */}
        <div className="bg-white backdrop-blur-2xl border border-apple-border p-6 rounded-3xl space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-apple-border">
            <RotateCw className="w-5 h-5 text-apple-blue" />
            <h3 className="text-sm font-bold text-apple-text uppercase tracking-wider">Reglas del Optimizador Inteligente</h3>
          </div>
          <form onSubmit={handleSaveSettings} className="space-y-5">
            <div className="flex items-center justify-between bg-apple-bg p-4 rounded-xl border border-apple-border">
              <div>
                <span className="text-xs font-bold text-apple-text block">Activar Auto-Optimización</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.enabled} onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })} className="sr-only peer" />
                <div className="w-9 h-5 bg-apple-border rounded-full peer peer-checked:bg-apple-blue after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-apple-subtext text-[10px] font-semibold uppercase mb-1">Max. Costo x Msg (COP)</label>
                <input type="number" value={settings.maxCostPerMessage} onChange={(e) => setSettings({ ...settings, maxCostPerMessage: parseInt(e.target.value) || 0 })} className="w-full bg-apple-bg border border-apple-border text-apple-text px-3 py-2 rounded-lg outline-none text-xs" />
              </div>
              <div>
                <label className="block text-apple-subtext text-[10px] font-semibold uppercase mb-1">Max. Anuncios Activos</label>
                <input type="number" value={settings.maxActiveAds} onChange={(e) => setSettings({ ...settings, maxActiveAds: parseInt(e.target.value) || 0 })} className="w-full bg-apple-bg border border-apple-border text-apple-text px-3 py-2 rounded-lg outline-none text-xs" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button type="submit" disabled={savingSettings} className="text-xs font-bold text-apple-blue hover:text-blue-600 transition-colors">
                {savingSettings ? 'Guardando...' : 'Guardar Reglas'}
              </button>
              <button type="button" onClick={runOptimizer} disabled={optimizing || !settings.enabled} className="bg-apple-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center">
                <Play className="w-3 h-3 mr-1.5 fill-current" /> {optimizing ? 'Analizando...' : 'Analizar Rendimiento'}
              </button>
            </div>
            
            {proposals && proposals.length > 0 && (
              <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-2">
                <span className="text-apple-blue font-bold text-xs block mb-2">PROPUESTAS DE OPTIMIZACIÓN:</span>
                {proposals.map((prop: any) => (
                  <div key={prop.id} className="bg-orange-50 border border-orange-200 p-3 rounded-xl flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {prop.suggestedAction === 'PAUSED' ? (
                          <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        )}
                        <span className="text-xs font-bold text-slate-800">
                          {prop.suggestedAction === 'PAUSED' ? 'Sugerencia: Pausar Anuncio' : 'Sugerencia: Activar Anuncio'}
                        </span>
                      </div>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-orange-100 text-orange-800 font-mono">
                        {prop.adName}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {prop.reason}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => handleApplyProposal(prop.id, prop.adId, prop.suggestedAction, prop.reason)}
                        className="flex-1 bg-white border border-orange-200 text-orange-700 hover:bg-orange-100 py-1.5 rounded-lg text-[10px] font-bold transition-colors"
                      >
                        Aprobar
                      </button>
                      <button
                        type="button"
                        onClick={() => setProposals(proposals.filter((p: any) => p.id !== prop.id))}
                        className="flex-1 bg-transparent border border-slate-200 text-slate-500 hover:bg-slate-50 py-1.5 rounded-lg text-[10px] font-bold transition-colors"
                      >
                        Descartar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {proposals && proposals.length === 0 && optimizerLog && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-800 text-xs p-3 rounded-xl flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                {optimizerLog[0] || 'Evaluación completada. Todo está óptimo.'}
              </div>
            )}
          </form>
        </div>

        {/* Lanzador Rápido (Simplificado) */}
        <div className="bg-white backdrop-blur-2xl border border-apple-border p-6 rounded-3xl space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-apple-border">
            <Sparkles className="w-5 h-5 text-apple-blue" />
            <h3 className="text-sm font-bold text-apple-text uppercase tracking-wider">Lanzador Rápido de Anuncios</h3>
          </div>
          
          {!selectedCategory ? (
            <div className="grid grid-cols-2 gap-3">
              {['Ceramico', 'Polarizado', 'PPF', 'Limpieza'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="bg-apple-bg border border-apple-border hover:border-apple-blue hover:text-apple-blue text-apple-text font-semibold py-4 rounded-xl text-xs transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-wider">Subir para: {selectedCategory}</h4>
                <button onClick={() => setSelectedCategory('')} className="text-[10px] text-apple-subtext underline">Cambiar</button>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-apple-bg hover:bg-apple-border border border-apple-border text-apple-text font-semibold py-3 rounded-xl flex items-center justify-center text-xs transition-all">
                  <Upload className="w-4 h-4 mr-2" /> Subir
                </button>
                <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center text-xs transition-all">
                  <Instagram className="w-4 h-4 mr-2" /> Instagram
                </button>
              </div>
              <p className="text-[10px] text-apple-subtext text-center mt-2">
                Sube la foto y Gemini AI escribirá el copy automáticamente.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* VIDEO PREVIEW MODAL WITH PLACEMENTS */}
      {selectedAdMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden max-w-4xl w-full relative shadow-2xl flex flex-col md:flex-row h-[90vh] max-h-[800px]">
            {/* Sidebar Controls */}
            <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col h-full shrink-0">
              <h3 className="font-bold text-slate-800 text-lg mb-1">Vista Previa</h3>
              <p className="text-slate-500 text-xs mb-6">Ubicaciones de Meta Ads</p>

              <div className="space-y-2 flex-1">
                <button 
                  onClick={() => setAdPlacement('reels')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${adPlacement === 'reels' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-600'}`}
                >
                  <Instagram className="w-5 h-5" /> Instagram Reels
                </button>
                <button 
                  onClick={() => setAdPlacement('feed')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${adPlacement === 'feed' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-600'}`}
                >
                  <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center font-serif font-black text-xs">f</div> Facebook Feed
                </button>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-200">
                <button 
                  onClick={() => setSelectedAdMedia(null)}
                  className="w-full py-3 border border-slate-300 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors"
                >
                  Cerrar Vista Previa
                </button>
              </div>
            </div>

            {/* Preview Canvas */}
            <div className="flex-1 bg-slate-200 flex items-center justify-center p-8 overflow-y-auto">
              
              {/* REELS PREVIEW */}
              {adPlacement === 'reels' && (
                <div className="relative w-full max-w-[320px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl ring-4 ring-slate-800 group">
                  {selectedAdMedia.videoUrl ? (
                    <video src={selectedAdMedia.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={selectedAdMedia.img} className="w-full h-full object-cover" alt="Video Preview" />
                  )}
                  
                  {/* Play Button Overlay (Only show if no video) */}
                  {!selectedAdMedia.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer">
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Top Header */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                    <span className="text-white font-bold text-xs drop-shadow-md">Reels</span>
                  </div>

                  {/* Bottom Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <div className="flex items-end gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border-2 border-white">
                        <Instagram className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <p className="text-white text-sm font-bold drop-shadow">Victory Cars Detailing</p>
                          <CheckCircle className="w-3 h-3 text-blue-400 fill-blue-400" />
                        </div>
                        <p className="text-white/80 text-[10px] mb-1">Publicidad</p>
                        <p className="text-white text-xs line-clamp-2 drop-shadow-md">{selectedAdMedia.copy}</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-2.5 rounded-full backdrop-blur-md transition-colors border border-white/30 flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Enviar mensaje
                    </button>
                    
                    {/* Fake progress bar */}
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FEED PREVIEW */}
              {adPlacement === 'feed' && (
                <div className="relative w-full max-w-[400px] bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-300">
                  {/* FB Header */}
                  <div className="p-3 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <div className="w-5 h-5 rounded text-white flex items-center justify-center font-serif font-black text-xs">V</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <p className="text-slate-900 text-sm font-bold">Victory Cars Detailing</p>
                      </div>
                      <div className="flex items-center text-slate-500 text-[10px] gap-1">
                        <span>Publicidad</span> • <Globe className="w-3 h-3" />
                      </div>
                    </div>
                    <button className="text-slate-500 hover:bg-slate-100 p-1.5 rounded-full"><X className="w-4 h-4" /></button>
                  </div>

                  {/* Copy Text */}
                  <div className="px-4 pb-3">
                    <p className="text-slate-800 text-sm">{selectedAdMedia.copy}</p>
                  </div>

                  {/* Image/Video */}
                  <div className="w-full aspect-square bg-slate-100 relative group cursor-pointer border-y border-slate-200">
                    {selectedAdMedia.videoUrl ? (
                      <video src={selectedAdMedia.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <img src={selectedAdMedia.img} className="w-full h-full object-cover" alt="Post" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                          <div className="bg-black/50 p-4 rounded-full border border-white/30 backdrop-blur-sm">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Bottom CTA Bar */}
                  <div className="bg-slate-50 p-3 flex items-center justify-between border-b border-slate-200">
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold">WHATSAPP</p>
                      <p className="text-slate-900 font-bold text-sm">Habla con nosotros</p>
                    </div>
                    <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-1.5 px-4 rounded-lg text-sm transition-colors">
                      WhatsApp
                    </button>
                  </div>
                  
                  {/* Likes / Comments fake */}
                  <div className="p-3 text-slate-500 text-xs flex justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center -mr-1 border border-white"><span className="text-white text-[8px]">👍</span></div>
                      <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white"><span className="text-white text-[8px]">❤️</span></div>
                      <span className="ml-1">128</span>
                    </div>
                    <span>24 comentarios • 12 compartidos</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
