import React, { useState, useEffect } from 'react';
import { MARKETING_CATEGORIES, MARKETING_PHASES, PhaseId, classifyContent } from '@/lib/marketingConfig';
import { Instagram, ArrowRight, Play, Loader2, Target, Zap, Activity, BarChart2, FlaskConical, PowerOff, ImageIcon, ChevronDown } from 'lucide-react';

export default function MarketingPlanBoard({
  creatives,
  ads,
  campaigns,
  insights
}: {
  creatives: any[];
  ads: any[];
  campaigns: any[];
  insights?: any;
}) {
  const [mounted, setMounted] = useState(false);
  const [activePhase, setActivePhase] = useState<PhaseId>('repositorio');
  const [monthlyBudget, setMonthlyBudget] = useState<number | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [localAds, setLocalAds] = useState<any[]>([]);
  const [autoPausedCount, setAutoPausedCount] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchResult, setLaunchResult] = useState<{ success?: boolean; launchedCount?: number; failedCount?: number; error?: string } | null>(null);

  const handleLaunchAll = async () => {
    setIsLaunching(true);
    setLaunchResult(null);
    try {
      const res = await fetch('/api/meta/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget: monthlyBudget || 650000, days: 15, creatives: classifiedCreatives })
      });
      const data = await res.json();
      if (res.ok) {
        setLaunchResult({ success: true, launchedCount: data.launchedCount, failedCount: data.failedCount });
        // Recargar automáticamente la página después de 2 segundos para ver los nuevos anuncios
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setLaunchResult({ success: false, error: data.error || 'Error desconocido' });
      }
    } catch (err: any) {
      setLaunchResult({ success: false, error: err.message });
    }
    setIsLaunching(false);
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  useEffect(() => {
    setMounted(true);
    const savedBudget = localStorage.getItem('victory_campaign_budget');
    if (savedBudget) {
      setMonthlyBudget(parseFloat(savedBudget));
    }
  }, []);

  useEffect(() => {
    let count = 0;
    const processedAds = ads.map(ad => {
      if (['PAUSED', 'ARCHIVED', 'CAMPAIGN_PAUSED', 'ADSET_PAUSED', 'DELETED'].includes(ad.status)) return ad;
      const isRetargeting = ad.name?.toUpperCase().includes('RETARGETING') || ad.name?.toUpperCase().includes('RMKT');
      if (isRetargeting) return ad;
      
      const spend = ad.spend || 0;
      const cpa = ad.costPerConversation || 999999;
      
      if (spend >= 50000 && cpa >= 6000) {
        count++;
        // En producción se dispara la mutación a Facebook aquí: fetch('/api/meta/toggleAd', ...)
        return { ...ad, status: 'PAUSED' };
      }
      return ad;
    });

    setLocalAds(processedAds);
    if (count > 0) {
      setAutoPausedCount(prev => prev + count);
    }
  }, [ads]);

  const handleSetBudget = () => {
    const input = window.prompt('Ingresa el presupuesto inicial ideal para esta campaña (ej. 650000):', monthlyBudget?.toString() || '');
    if (input !== null) {
      const val = parseFloat(input.replace(/\D/g, ''));
      if (!isNaN(val)) {
        setMonthlyBudget(val);
        localStorage.setItem('victory_campaign_budget', val.toString());
      }
    }
  };



  if (!mounted) return null;

  // Icon mapping
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'instagram': return <Instagram className={className} />;
      case 'flask': return <FlaskConical className={className} />;
      case 'activity': return <Activity className={className} />;
      case 'bar-chart': return <BarChart2 className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'target': return <Target className={className} />;
      case 'power-off': return <PowerOff className={className} />;
      default: return <ImageIcon className={className} />;
    }
  };

  // Clasificar creatividades (Repositorio)
  const classifiedCreatives = creatives.map(c => ({
    ...c,
    category: classifyContent(c.caption || c.body || c.name || '')
  }));

  const repoByCategory = Object.keys(MARKETING_CATEGORIES).map(catId => {
    return {
      category: MARKETING_CATEGORIES[catId as keyof typeof MARKETING_CATEGORIES],
      items: classifiedCreatives.filter(c => c.category === catId)
    };
  });

  // Funciones auxiliares para agrupar ads por fase
  const getAdsForPhase = (phaseId: PhaseId) => {
    if (phaseId === 'repositorio') return []; // Handled separately
    
    return localAds.filter(ad => {
      // Un ad activo es aquel que está explícitamente en ACTIVE o en proceso de revisión.
      // Cualquier otro estado (incluyendo errores, rechazados, etc) lo consideraremos inactivo para no estorbar.
      const isActiveState = ['ACTIVE', 'PENDING_REVIEW', 'IN_PROCESS', 'PREAPPROVED'].includes(ad.status);
      const isPaused = !isActiveState;
      
      const isRetargeting = ad.name?.toUpperCase().includes('RETARGETING') || ad.name?.toUpperCase().includes('RMKT');
      const spend = ad.spend || 0;
      const cpa = ad.costPerConversation || 999999;

      if (phaseId === 'apagados') {
        return isPaused;
      }

      // If we reach here, it must be an active ad for the remaining phases
      if (isPaused) return false;

      if (phaseId === 'retargeting') return isRetargeting;
      if (isRetargeting) return false;

      // Active Prospecting Ads
      if (phaseId === 'testeo') return spend < 20000;
      if (phaseId === 'aprendizaje') return spend >= 20000 && spend < 50000;
      
      if (spend >= 50000) {
        if (phaseId === 'escalamiento') return cpa < 6000;
        if (phaseId === 'analisis') return cpa >= 6000;
      }
      
      return false;
    });
  };

  const getColorClasses = (colorTheme: string) => {
    switch (colorTheme) {
      case 'slate': return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', tag: 'bg-slate-50 text-slate-500 border-slate-100' };
      case 'blue': return { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', tag: 'bg-blue-50 text-blue-600 border-blue-100' };
      case 'amber': return { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200', tag: 'bg-amber-50 text-amber-600 border-amber-100' };
      case 'purple': return { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', tag: 'bg-purple-50 text-purple-600 border-purple-100' };
      case 'emerald': return { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200', tag: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
      case 'rose': return { bg: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-200', tag: 'bg-rose-50 text-rose-600 border-rose-100' };
      case 'gray': return { bg: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-200', tag: 'bg-gray-50 text-gray-500 border-gray-100' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', tag: 'bg-slate-50 text-slate-500 border-slate-100' };
    }
  };

  const activePhaseConfig = MARKETING_PHASES.find(p => p.id === activePhase)!;
  const activeColors = getColorClasses(activePhaseConfig.colorTheme);
  const activePhaseAds = getAdsForPhase(activePhase);

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      
      {/* SIDEBAR TABS (The Funnel) */}
      <div className="w-full md:w-[280px] shrink-0 flex flex-col md:sticky md:top-6 self-start pr-2 pb-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Fases del Pipeline</h3>
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-slate-200 z-0 rounded-full"></div>

          <div className="flex flex-col gap-2 relative z-10">
            {MARKETING_PHASES.map((phase, index) => {
              const colors = getColorClasses(phase.colorTheme);
              const isActive = activePhase === phase.id;
              const phaseAds = getAdsForPhase(phase.id);
              const count = phase.id === 'repositorio' ? classifiedCreatives.length : phaseAds.length;
              
              return (
                <button 
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all text-left border ${
                    isActive 
                      ? `${colors.bg} ${colors.border} shadow-sm ring-1 ring-black/5` 
                      : 'bg-white/40 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border transition-colors ${
                    isActive ? `bg-white ${colors.text} ${colors.border} shadow-sm` : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}>
                    {getIcon(phase.icon, "w-5 h-5")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm truncate transition-colors ${isActive ? colors.text : 'text-slate-600'}`}>
                      {index + 1}. {phase.label}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                      {count} {phase.id === 'repositorio' ? 'ítems' : 'anuncios'}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-xl rounded-[2rem] border border-slate-200 shadow-sm p-6">
        
        {/* HEADER DESC */}
        <div className="mb-6 shrink-0 flex items-center justify-between border-b border-slate-200/60 pb-4">
           <div>
             <div className="flex items-center gap-4 mb-1">
               <h2 className={`text-xl font-bold ${activeColors.text}`}>{activePhaseConfig.label}</h2>
               {insights && (
                 <div className="flex flex-col gap-2 min-w-[300px]">
                   {monthlyBudget !== null ? (
                     <div className="flex flex-col gap-1.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                       <div className="flex justify-between items-center text-xs">
                         <span className="font-bold text-slate-700">Progreso de Campaña</span>
                         <div className="flex items-center gap-2">
                           <span className="text-slate-500 font-mono">${(insights.spend || 0).toLocaleString('es-CO')} / ${(monthlyBudget).toLocaleString('es-CO')}</span>
                           <button onClick={handleSetBudget} className="text-slate-400 hover:text-slate-600" title="Editar presupuesto">
                             <Target className="w-3.5 h-3.5" />
                           </button>
                         </div>
                       </div>
                       
                       <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full transition-all duration-1000 ${
                             (insights.spend || 0) / monthlyBudget > 0.9 ? 'bg-rose-500' :
                             (insights.spend || 0) / monthlyBudget > 0.7 ? 'bg-amber-500' : 'bg-emerald-500'
                           }`}
                           style={{ width: `${Math.min(100, Math.max(0, ((insights.spend || 0) / monthlyBudget) * 100))}%` }}
                         />
                       </div>
                       <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                         <span>Gastado: {Math.round(((insights.spend || 0) / monthlyBudget) * 100)}%</span>
                         <span>Restante: ${Math.max(0, monthlyBudget - (insights.spend || 0)).toLocaleString('es-CO')}</span>
                       </div>
                     </div>
                   ) : (
                     <button 
                       onClick={handleSetBudget}
                       className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-xl border border-slate-200 shadow-sm font-medium transition-colors text-xs"
                     >
                       <Target className="w-4 h-4 text-emerald-500" />
                       Fijar Presupuesto de Campaña (Ej. 650k)
                     </button>
                   )}
                 </div>
               )}
             </div>
             <p className="text-sm text-slate-500">{activePhaseConfig.description}</p>
           </div>
           <div className="flex flex-col items-end gap-3">
             <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-sm border border-emerald-200">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               Piloto Automático: Activo
               {autoPausedCount > 0 && <span className="ml-1 text-emerald-600">({autoPausedCount} apagados hoy)</span>}
             </div>
             <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
               {activePhase === 'repositorio' ? `${classifiedCreatives.length} ítems` : `${activePhaseAds.length} anuncios`}
             </span>
           </div>
        </div>

        {/* ACTIVE TAB CONTENT */}
        <div className="flex-1 pr-2">
          
          {/* REPOSITORIO */}
          {activePhase === 'repositorio' && (
            <div className="space-y-6">
              
              {/* MASIVE LAUNCH BUTTON */}
              <div className="bg-gradient-to-br from-apple-blue to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-apple-blue/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-300" />
                    Lanzar Fase de Pruebas (Masivo)
                  </h2>
                  <p className="text-white/80 text-sm">
                    Esta herramienta tomará todos los creativos del repositorio y los inyectará en una campaña CBO Premium con segmentación automática a dueños de Alta Gama.
                  </p>
                  {launchResult && (
                    <div className={`mt-3 p-3 rounded-xl text-xs font-medium border ${launchResult.success ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-red-500/20 border-red-500/30'}`}>
                      {launchResult.success 
                        ? `¡Éxito! ${launchResult.launchedCount} anuncios creados.` 
                        : `Error: ${launchResult.error}`
                      }
                    </div>
                  )}
                </div>
                <div className="w-full md:w-auto shrink-0">
                  <button
                    onClick={handleLaunchAll}
                    disabled={isLaunching || classifiedCreatives.length === 0}
                    className="w-full md:w-auto px-6 bg-white text-apple-blue hover:bg-gray-50 font-bold py-3.5 rounded-full shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center whitespace-nowrap"
                  >
                    {isLaunching ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Lanzando...</>
                    ) : (
                      'Lanzar Todos los Creativos'
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
               {repoByCategory.map(group => (
                 <div key={group.category.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    <button 
                      onClick={() => toggleCategory(group.category.id)}
                      className={`w-full px-4 py-3 text-sm font-bold uppercase tracking-wider ${group.category.color} border-b shrink-0 flex justify-between items-center hover:opacity-90 transition-opacity cursor-pointer`}
                    >
                       <div className="flex items-center gap-2">
                         <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${collapsedCategories[group.category.id] ? '-rotate-90' : ''}`} />
                         <span>{group.category.label}</span>
                       </div>
                       <span className="bg-white/50 px-2 py-0.5 rounded-md text-xs border border-white/20 text-slate-700">{group.items.length}</span>
                    </button>
                    {!collapsedCategories[group.category.id] && (
                      group.items.length > 0 ? (
                        <div className="p-4 grid grid-cols-2 gap-3 content-start flex-1">
                           {group.items.map((item, idx) => (
                             <div key={idx} className="flex flex-col gap-2">
                                <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200 group">
                                  <img src={item.thumbnail_url || item.image_url || item.media_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                  {item.media_type === 'VIDEO' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                      <Play className="w-8 h-8 text-white fill-white" />
                                    </div>
                                  )}
                                </div>
                                <button className="w-full text-[10px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 py-1.5 rounded-lg border border-slate-200 transition-colors">
                                  Testear
                                </button>
                             </div>
                           ))}
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 bg-slate-50/50">
                          <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                            <Instagram className="w-5 h-5 text-slate-300" />
                          </div>
                          <p className="text-sm font-bold text-slate-500">Repositorio vacío</p>
                          <p className="text-xs mt-1">No hay contenido reciente para pautar.</p>
                        </div>
                      )
                    )}
                 </div>
               ))}
             </div>
            </div>
          )}

          {/* OTHER PHASES */}
          {activePhase !== 'repositorio' && (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
               {activePhaseAds.map(ad => (
                 <div key={ad.id} className={`bg-white border ${activeColors.border} p-4 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${activePhase === 'escalamiento' ? 'ring-2 ring-emerald-400/50' : ''}`}>
                   
                   <div className="flex gap-3">
                     <div className={`w-16 h-16 ${activeColors.bg} rounded-xl overflow-hidden shrink-0 border ${activeColors.border} flex items-center justify-center`}>
                       {ad.imageUrl ? (
                         <img src={ad.imageUrl} className="w-full h-full object-cover" />
                       ) : (
                         getIcon(activePhaseConfig.icon, `w-6 h-6 ${activeColors.text}`)
                       )}
                     </div>
                     <div className="flex-1 min-w-0 flex flex-col justify-center">
                       <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${activePhase === 'apagados' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                         {ad.name}
                       </h4>
                       <div className="mt-1">
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${activeColors.tag} inline-block`}>
                           {['PAUSED', 'ARCHIVED', 'CAMPAIGN_PAUSED', 'ADSET_PAUSED', 'DELETED'].includes(ad.status) ? 'Inactivo' : 'Activo'}
                         </span>
                       </div>
                     </div>
                   </div>

                   <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Inversión</span>
                        <span className="text-xs font-mono font-bold text-slate-700">${(ad.spend || 0).toLocaleString('es-CO')}</span>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">CPA</span>
                        <span className={`text-xs font-mono font-bold ${activePhase === 'escalamiento' ? 'text-emerald-600' : 'text-slate-700'}`}>
                          ${(ad.costPerConversation || 0).toLocaleString('es-CO')}
                        </span>
                      </div>
                   </div>

                 </div>
               ))}
               
               {activePhaseAds.length === 0 && (
                  <div className="col-span-full text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm bg-white/50">
                    Vacío. No hay anuncios en esta fase actualmente.
                  </div>
               )}
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
