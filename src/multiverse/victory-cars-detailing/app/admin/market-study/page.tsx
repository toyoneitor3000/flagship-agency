'use client';

import React, { useState, useEffect } from 'react';
import { Target, Users, AlertTriangle, ShieldCheck, Zap, Activity, CheckCircle, Loader2, BarChart2, Crosshair, Search, DollarSign, Repeat, Lightbulb } from 'lucide-react';

export default function MarketStudyPage() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchResult, setLaunchResult] = useState<{ success?: boolean; launchedCount?: number; failedCount?: number; error?: string } | null>(null);
  
  // States para la barra de presupuesto
  const [mounted, setMounted] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(650000);
  const [insights, setInsights] = useState<{spend?: number}>({});

  useEffect(() => {
    setMounted(true);
    const savedBudget = localStorage.getItem('victory_campaign_budget');
    if (savedBudget) {
      setMonthlyBudget(parseFloat(savedBudget));
    }
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem('victory_admin_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const res = await fetch('/api/meta/insights', { headers });
      if (res.ok) {
        const data = await res.json();
        setInsights(data);
      }
    } catch (e) {
      console.error("Error fetching insights:", e);
    }
  };

  const handleSetBudget = () => {
    const input = window.prompt('Ingresa el presupuesto inicial ideal para esta campaña (ej. 650000):', monthlyBudget.toString());
    if (input !== null) {
      const val = parseFloat(input.replace(/\D/g, ''));
      if (!isNaN(val)) {
        setMonthlyBudget(val);
        localStorage.setItem('victory_campaign_budget', val.toString());
      }
    }
  };

  const currentSpend = insights.spend || 0;
  const progressPercent = Math.min(100, Math.max(0, (currentSpend / monthlyBudget) * 100));

  const handleLaunchAll = async () => {
    setIsLaunching(true);
    setLaunchResult(null);
    try {
      const res = await fetch('/api/meta/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget: 650000, days: 15, testAll: true })
      });
      const data = await res.json();
      if (res.ok) {
        setLaunchResult({ success: true, launchedCount: data.launchedCount, failedCount: data.failedCount });
      } else {
        setLaunchResult({ success: false, error: data.error || 'Error desconocido' });
      }
    } catch (err: any) {
      setLaunchResult({ success: false, error: err.message });
    }
    setIsLaunching(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-apple-text tracking-tight flex items-center">
            <Target className="w-6 h-6 mr-2 text-apple-blue" />
            Estudio de Mercado Integral (30 Puntos Estratégicos)
          </h1>
          <p className="text-apple-subtext text-sm mt-1">
            Análisis profundo de audiencias, competencia, retención y estrategias para Victory Cars Detailing.
          </p>
        </div>
        
        {/* KPI Summary Cards con Barra de Progreso */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {mounted && (
            <div className="bg-white px-5 py-4 rounded-3xl shadow-sm border border-apple-border flex flex-col min-w-[300px]">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-700">Progreso del Presupuesto</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono">${currentSpend.toLocaleString('es-CO')} / ${monthlyBudget.toLocaleString('es-CO')}</span>
                  <button onClick={handleSetBudget} className="text-slate-400 hover:text-slate-600" title="Editar presupuesto">
                    <Target className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1.5">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    progressPercent > 90 ? 'bg-rose-500' :
                    progressPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Gastado: {Math.round(progressPercent)}%</span>
                <span>Restante: ${Math.max(0, monthlyBudget - currentSpend).toLocaleString('es-CO')}</span>
              </div>
            </div>
          )}

          <div className="bg-white px-5 py-4 rounded-3xl shadow-sm border border-apple-border flex flex-col justify-center">
            <span className="text-xs text-apple-subtext font-medium mb-1">CPA Objetivo</span>
            <span className="text-xl font-bold text-emerald-600">&lt; $6.000 COP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* A. Expansión del Buyer Persona */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-apple-border">
          <h2 className="text-lg font-bold text-apple-text mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-500" />
            1. Expansión del Buyer Persona
          </h2>
          <ul className="space-y-3 text-sm text-apple-subtext">
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5"/> <strong>1. Micro-segmentación Corporativa:</strong> Ejecutivos, CEOS y dueños de empresas que ven su auto como símbolo de éxito.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5"/> <strong>2. Apasionados (Motorheads):</strong> Entusiastas de los autos que asisten a track days y valoran la estética impecable.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5"/> <strong>3. Familias Premium:</strong> Madres/Padres con SUVs de lujo (ej. Volvo XC90, Audi Q7) buscando protección contra rayones de niños o mascotas.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5"/> <strong>4. Demografía Financiera:</strong> Ingresos &gt; $200M COP anuales, con alta capacidad de inversión en "caprichos".</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5"/> <strong>5. Intereses Cruzados:</strong> Relojes de lujo, clubes de golf, inversiones, viajes internacionales y restaurantes premium.</li>
          </ul>
        </div>

        {/* B. Análisis de la Competencia */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-apple-border">
          <h2 className="text-lg font-bold text-apple-text mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-purple-500" />
            2. Análisis Competitivo
          </h2>
          <ul className="space-y-3 text-sm text-apple-subtext">
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0 mt-0.5"/> <strong>6. Competidores Directos:</strong> Boutiques de detailing certificadas en marcas como Gyeon, XPEL o SunTek.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0 mt-0.5"/> <strong>7. Competencia Indirecta:</strong> Concesionarios que ofrecen "cristalizado" genérico al entregar el vehículo nuevo.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0 mt-0.5"/> <strong>8. Debilidades del Mercado:</strong> Pésimo servicio postventa, falta de garantías reales y tiempos de entrega excesivos.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0 mt-0.5"/> <strong>9. Amenazas:</strong> Talleres tradicionales que bajan precios usando materiales chinos de baja calidad.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0 mt-0.5"/> <strong>10. Nuestra Ventaja Injusta:</strong> Cortes por computadora (cero bisturí), reportes fotográficos diarios y garantía por escrito.</li>
          </ul>
        </div>

        {/* C. Puntos de Dolor Avanzados */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-apple-border">
          <h2 className="text-lg font-bold text-apple-text mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            3. Puntos de Dolor Profundos
          </h2>
          <ul className="space-y-3 text-sm text-apple-subtext">
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 mt-0.5"/> <strong>11. Paranoia del Desarme:</strong> Miedo a que desmonten bumpers/paneles, rompan grapas o dañen sensores (Garantizamos desarme experto).</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 mt-0.5"/> <strong>12. Traumas Pasados:</strong> Experiencias previas con PPF que se puso amarillo, opaco o se despegó en los bordes.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 mt-0.5"/> <strong>13. Terror al Bisturí:</strong> Miedo a cortes sobre la pintura original al instalar la película.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 mt-0.5"/> <strong>14. Factor Tiempo:</strong> Angustia por quedarse sin carro varios días (Ofrecer servicio de recogida/entrega en grúa planchón).</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-red-500 flex-shrink-0 mt-0.5"/> <strong>15. Inseguridad de Marca:</strong> Desconfianza por talleres que no muestran los rollos originales y mienten sobre la marca del material.</li>
          </ul>
        </div>

        {/* D. Nuevas Objeciones y Cierres */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-apple-border xl:col-span-2">
          <h2 className="text-lg font-bold text-apple-text mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" />
            4. Objeciones Comunes y Cómo Rebatirlas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <strong className="text-emerald-900 block mb-1 text-sm">16. "El seguro cubre todo si me estrello"</strong>
              <p className="text-xs text-emerald-800">El deducible suele ser altísimo y el seguro no paga por los "chinazos" de carretera ni rayones de parqueadero. Repintar le quita originalidad.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <strong className="text-emerald-900 block mb-1 text-sm">17. "En otro lado me cobran la mitad"</strong>
              <p className="text-xs text-emerald-800">Estás pagando por poliuretano chino que se pone amarillo y se instala con bisturí cortando tu pintura. Lo barato sale carísimo.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <strong className="text-emerald-900 block mb-1 text-sm">18. "Solo voy a tener el carro un año"</strong>
              <p className="text-xs text-emerald-800">Con PPF, tu auto se venderá mucho más rápido y por encima del valor comercial al mantener la pintura inmaculada. Es una inversión, no un gasto.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <strong className="text-emerald-900 block mb-1 text-sm">19. "El vehículo es rentado/Leasing"</strong>
              <p className="text-xs text-emerald-800">Con más razón. Las penalidades del banco al devolver el vehículo con detalles de pintura son enormes; el PPF te salva de esas multas.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 md:col-span-2">
              <strong className="text-emerald-900 block mb-1 text-sm">20. "¿Si me aburro, se puede quitar después?"</strong>
              <p className="text-xs text-emerald-800">Absolutamente. El PPF premium tiene adhesivo seguro para la laca original. Se retira con vapor y la pintura queda exactamente como el día que se instaló el film.</p>
            </div>
          </div>
        </div>

        {/* E. Estrategias de LTV (Life Time Value) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-apple-border">
          <h2 className="text-lg font-bold text-apple-text mb-4 flex items-center">
            <Repeat className="w-5 h-5 mr-2 text-orange-500" />
            5. Retención y Upselling (LTV)
          </h2>
          <ul className="space-y-3 text-sm text-apple-subtext">
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0 mt-0.5"/> <strong>21. Suscripción Mantenimiento:</strong> Programa anual para descontaminar el PPF o recargar hidrofobia del cerámico.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0 mt-0.5"/> <strong>22. Cross-Selling:</strong> Vender Polarizado Nanocerámico (Window Tint) a clientes de PPF para confort térmico.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0 mt-0.5"/> <strong>23. Upsell Rines/Mordazas:</strong> Cerámico especial para altas temperaturas, facilitando el lavado del polvo de frenos.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0 mt-0.5"/> <strong>24. Upsell Interior:</strong> Protección para pantallas PPF interiores, cuero, Alcántara y plásticos contra rayos UV.</li>
            <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0 mt-0.5"/> <strong>25. Programa Referidos:</strong> Incentivos (detallados gratuitos) por traer a otros propietarios de gama alta.</li>
          </ul>
        </div>

        {/* F. Nuevos Ángulos y Canales de Pauta */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-apple-border xl:col-span-2">
          <h2 className="text-lg font-bold text-apple-text mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
            6. Estrategia Omnicanal y Nuevos Ángulos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
              <strong className="text-yellow-900 block mb-1 text-sm">26. Ángulo B2B (Alianzas)</strong>
              <p className="text-xs text-yellow-800">Acuerdos con asesores de venta en concesionarios Porsche, BMW y Mercedes para que ofrezcan nuestro servicio desde la sala de ventas.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
              <strong className="text-yellow-900 block mb-1 text-sm">27. Ángulo Testimonial</strong>
              <p className="text-xs text-yellow-800">Video estilo documental: "Me estrellaron, pensé que dañé el carro nuevo, pero el PPF absorbió todo el golpe".</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
              <strong className="text-yellow-900 block mb-1 text-sm">28. Canal: Google Ads (Intención)</strong>
              <p className="text-xs text-yellow-800">Pauta en búsquedas directas: "Dónde instalar PPF en Bogotá", "Mejor cerámico para carro nuevo", capturando demanda activa.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
              <strong className="text-yellow-900 block mb-1 text-sm">29. Canal: Eventos Presenciales</strong>
              <p className="text-xs text-yellow-800">Patrocinio en Track Days, Torneos de Golf y alianzas con clubes de autos (Club M, Porsche Club).</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 md:col-span-2">
              <strong className="text-yellow-900 block mb-1 text-sm">30. Retargeting Educativo (Funnels)</strong>
              <p className="text-xs text-yellow-800">Campañas que persiguen a quienes visitaron la web con videos desmintiendo mitos (ej. "Bisturí vs Plotter de corte") para matar objeciones antes de que pregunten.</p>
            </div>
          </div>
        </div>

        {/* Action Column */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-apple-border h-fit xl:col-span-1 xl:mt-0">
          <h3 className="font-semibold text-apple-text mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2 text-apple-blue" />
            Siguientes Pasos
          </h3>
          <ol className="list-decimal pl-4 space-y-3 text-sm text-apple-subtext mb-6">
            <li>Ve al <a href="/admin/marketing-plan" className="text-apple-blue hover:underline">Plan de Marketing</a> e integra estos ángulos.</li>
            <li>Configura los públicos en Meta Ads usando los intereses cruzados.</li>
            <li>Crea la campaña de Google Ads para capturar la demanda directa.</li>
            <li>Activa las campañas y monitoriza el CPA objetivo.</li>
          </ol>
        </div>

      </div>
    </div>
  );
}
