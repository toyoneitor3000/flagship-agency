'use client';

import React, { useState, useRef } from 'react';
import { Download, Rocket, Check, ArrowRight, ShoppingBag, Car, Globe, Database, Sparkles, ShieldCheck, UserCheck, RefreshCw } from 'lucide-react';
import { BASE_PLANS, calculatePlanPricing, formatMoneyCOP } from '@/config/pricing';

interface ProposalData {
  clientName: string;
  projectName: string;
  date: string;
  scope: string;
  phase1Price: string;
  phase1Title: string;
  phase1Features: string;
  phase2Price: string;
  phase2Title: string;
  phase2Features: string;
  timeline: string;
  paymentTerms: string;
  taxNote: string;
}

interface PresetOption {
  id: string;
  label: string;
  badge: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  planId: string;
  defaultClient: string;
}

const PRESET_OPTIONS: PresetOption[] = [
  { id: 'ecommerce', label: 'E-Commerce Store', badge: 'Tienda Completa', icon: ShoppingBag, planId: 'store', defaultClient: 'Cliente / Marca Comercial' },
  { id: 'speedlight', label: 'Portal Vehículos', badge: 'Marketplace', icon: Car, planId: 'store', defaultClient: 'Speedlight / Cliente Automotriz' },
  { id: 'corporate', label: 'Sitio Web Pro', badge: 'Multi-Página + CMS', icon: Globe, planId: 'pro', defaultClient: 'Cliente Corporativo' },
  { id: 'system', label: 'Web App / SaaS', badge: 'Software Cloud', icon: Database, planId: 'system', defaultClient: 'Startup / Empresa Tech' },
  { id: 'semilla', label: 'Landing Page', badge: 'Alta Conversión', icon: Sparkles, planId: 'semilla', defaultClient: 'Marca Personal / Emprendimiento' },
];

const buildPreset = (presetKey: string, isSpeedlight: boolean, customClient?: string): ProposalData => {
  const presetConfig = PRESET_OPTIONS.find(p => p.id === presetKey) || PRESET_OPTIONS[0];
  const plan = BASE_PLANS.find(p => p.id === presetConfig.planId) || BASE_PLANS[2];
  const pricing = calculatePlanPricing(plan, isSpeedlight);
  const clientName = customClient && customClient.trim() !== '' ? customClient : presetConfig.defaultClient;
  const date = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  if (presetKey === 'ecommerce') {
    return {
      clientName,
      projectName: 'Sistema Web Multipágina con E-Commerce & Pasarela de Pagos',
      date,
      scope: plan.scopePreset,
      phase1Title: 'Fase 1: Construcción & Despliegue E-Commerce',
      phase1Price: pricing.formattedSetup,
      phase1Features: plan.features.join('\n'),
      phase2Title: 'Fase 2: Operación Cloud, Soporte Técnico & Acompañamiento',
      phase2Price: pricing.formattedAnnual,
      phase2Features: 'Renovación Anual de Dominio .com y Gestión DNS\nServidor Cloud NVMe de Alta Disponibilidad & SSL\nCopias de Seguridad Diarias Automatizadas\nMantenimiento Preventivo y Parches de Seguridad\nSoporte Técnico Especializado y Monitoreo Uptime 24/7',
      timeline: '3 a 4 Semanas de Desarrollo.\nSemana 1: Kickoff, Arquitectura de Información y Aprobación UI/UX.\nSemana 2: Desarrollo Multipágina y Motor de Catálogo/Tienda.\nSemana 3: Integración de Pasarela de Pagos y Pruebas Transaccionales (Beta).\nSemana 4: Despliegue en Dominio Oficial, Entrega de Accesos y Capacitación.',
      paymentTerms: pricing.paymentTermsText,
      taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se expide Factura Legal Electrónica como Persona Natural (o Cuenta de Cobro formal con RUT y Seguridad Social), 100% válida y deducible tributariamente.'
    };
  }

  if (presetKey === 'speedlight') {
    const c1 = Math.round(pricing.discountedSetup * 0.5);
    const c2 = pricing.discountedSetup - c1;
    const speedlightTerms = [
      `Cuota 1 (50% - ${formatMoneyCOP(c1)} COP): Anticipo al inicio del proyecto.`,
      `Cuota 2 (50% - ${formatMoneyCOP(c2)} COP): Contra-entrega previa al lanzamiento en producción.`
    ];
    if (isSpeedlight) {
      speedlightTerms.push(`Beneficio Especial: -30% Alianza Speedlight Culture aplicado (Cupón SPEEDLIGHT-30).`);
    }
    speedlightTerms.push(`Métodos: Transferencia Bancolombia, Nequi o PSE.`);

    return {
      clientName,
      projectName: 'Portal de Venta de Vehículos (Marketplace)',
      date,
      scope: 'Desarrollo de plataforma web optimizada para la publicación, búsqueda y visualización de vehículos en venta. Autoadministrable, rápida y diseñada para maximizar la conversión.',
      phase1Title: 'Fase 1: Construcción & Setup Portal Vehículos',
      phase1Price: pricing.formattedSetup,
      phase1Features: 'Página Principal (Buscador, Destacados)\nCatálogo Dinámico (Filtros, Paginación)\nFicha de Vehículo (Galería, Specs, WhatsApp)\nPanel de Administración (Subir/Editar autos)\nConfiguración Cloud Base',
      phase2Title: 'Fase 2: Operación Cloud, Soporte Técnico & Acompañamiento',
      phase2Price: pricing.formattedAnnual,
      phase2Features: 'Renovación de Dominio .com y Gestión DNS\nServidor Cloud NVMe de Alta Velocidad\nTransferencia de imágenes sin límite & SSL\nBackups Diarios Automatizados y Monitoreo 24/7\nSoporte Preventivo Continuo',
      timeline: '3 a 4 Semanas de Desarrollo.\nReunión 1: Kickoff y Diseño.\nReunión 2: Aprobación Visual.\nReunión 3: Revisión Funcional (Beta).\nReunión 4: Entrega y Capacitación.',
      paymentTerms: speedlightTerms.join('\n'),
      taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se genera soporte legal para deducción de costos.'
    };
  }

  if (presetKey === 'system') {
    return {
      clientName,
      projectName: 'Plataforma Web SaaS & Sistema a Medida',
      date,
      scope: plan.scopePreset,
      phase1Title: 'Fase 1: Arquitectura, Backend & Web App',
      phase1Price: pricing.formattedSetup,
      phase1Features: plan.features.join('\n'),
      phase2Title: 'Fase 2: Infraestructura Enterprise & Soporte Cloud',
      phase2Price: pricing.formattedAnnual,
      phase2Features: 'Infraestructura Cloud Dedicada con Balanceador de Carga\nBase de Datos Gestionada con Replicación y Backups Continuos\nCertificados SSL Wildcard y Protección DDoS\nMonitoreo de Rendimiento (APM) y Logs de Auditoría 24/7\nSoporte Técnico de Nivel Ingeniería y SLAs de Disponibilidad',
      timeline: '6 a 8 Semanas de Desarrollo por Sprints.\nSprint 1: Modelado de Datos, Autenticación y Arquitectura Cloud.\nSprint 2: Desarrollo Core de la Lógica de Negocio y APIs.\nSprint 3: Frontend Web App, Dashboards y Roles de Usuario.\nSprint 4: QA, Pruebas de Seguridad, Staging y Despliegue en Producción.',
      paymentTerms: pricing.paymentTermsText,
      taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se expide Factura Legal Electrónica como Persona Natural.'
    };
  }

  if (presetKey === 'semilla') {
    return {
      clientName,
      projectName: 'Landing Page de Alta Conversión',
      date,
      scope: plan.scopePreset,
      phase1Title: 'Fase 1: Diseño & Lanzamiento Landing Page',
      phase1Price: pricing.formattedSetup,
      phase1Features: plan.features.join('\n'),
      phase2Title: 'Fase 2: Dominio, Hosting & Mantenimiento',
      phase2Price: pricing.formattedAnnual,
      phase2Features: 'Renovación de Dominio .com Incluida\nServidor Serverless Ultra Rápido (Edge Global)\nCertificado SSL de Seguridad Automático\nBackups Periódicos y Asistencia Técnica Básica',
      timeline: '1 a 2 Semanas de Desarrollo.\nSemana 1: Estructura, Copywriting y Maquetación Visual.\nSemana 2: Integración de Formularios, WhatsApp y Lanzamiento.',
      paymentTerms: pricing.paymentTermsText,
      taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se expide Factura Legal Electrónica como Persona Natural.'
    };
  }

  // corporate
  return {
    clientName,
    projectName: 'Sitio Web Multi-Página Corporativo & Blog',
    date,
    scope: plan.scopePreset,
    phase1Title: 'Fase 1: Construcción & Despliegue Sitio Web Pro',
    phase1Price: pricing.formattedSetup,
    phase1Features: plan.features.join('\n'),
    phase2Title: 'Fase 2: Infraestructura Cloud & Soporte Técnico',
    phase2Price: pricing.formattedAnnual,
    phase2Features: 'Dominio .com por 1 año\nServidor Cloud Fast Edge de alta velocidad\nCertificado SSL de Seguridad\nBackups Diarios Automáticos\nMonitoreo y Soporte Preventivo 24/7',
    timeline: '2 a 3 Semanas de Desarrollo.\nHito 1: Estructura, contenido y aprobación de diseño.\nHito 2: Desarrollo y carga de contenidos en CMS.\nHito 3: Lanzamiento en dominio oficial y entrega de accesos.',
    paymentTerms: pricing.paymentTermsText,
    taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se expide Factura Legal Electrónica como Persona Natural.'
  };
};

export const ProposalGenerator = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('ecommerce');
  const [applySpeedlightDiscount, setApplySpeedlightDiscount] = useState(true);
  const [clientName, setClientName] = useState<string>('');

  const [data, setData] = useState<ProposalData>(() => buildPreset('ecommerce', true));

  const handleSelectPreset = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setData(buildPreset(presetKey, applySpeedlightDiscount, clientName));
  };

  const handleToggleSpeedlight = () => {
    const nextState = !applySpeedlightDiscount;
    setApplySpeedlightDiscount(nextState);
    setData(buildPreset(selectedPreset, nextState, clientName));
  };

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setClientName(newName);
    setData(prev => ({
      ...prev,
      clientName: newName.trim() !== '' ? newName : (PRESET_OPTIONS.find(p => p.id === selectedPreset)?.defaultClient || 'Cliente')
    }));
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(previewRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Propuesta_${data.clientName.replace(/\s+/g, '_')}.pdf`);
    } catch (error: any) {
      console.error('Error al generar PDF', error);
      alert(`Hubo un error al generar el PDF: ${error?.message || String(error)}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentOption = PRESET_OPTIONS.find(p => p.id === selectedPreset) || PRESET_OPTIONS[0];
  const currentPlan = BASE_PLANS.find(p => p.id === currentOption.planId) || BASE_PLANS[2];
  const currentPricing = calculatePlanPricing(currentPlan, applySpeedlightDiscount);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-zinc-950 text-white overflow-hidden">
      
      {/* PANEL DE CONTROL EJECUTIVO (SIN FORMULARIOS MANUALES) */}
      <div className="w-full lg:w-[380px] shrink-0 p-6 bg-zinc-900/90 border-r border-zinc-800 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          
          {/* TITULAR DEL COCKPIT */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#00FF9C]">Purrpurr Cockpit</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white">Generador Ejecutivo</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Propuestas comerciales generadas desde el motor central de tarifas.</p>
          </div>

          {/* 1. SELECCIÓN DE CASO DE USO / PLANTILLA */}
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider flex items-center justify-between">
              <span>Caso de Uso / Proyecto</span>
              <span className="text-[9px] text-indigo-400 font-mono">5 Plantillas</span>
            </label>
            <div className="space-y-1.5">
              {PRESET_OPTIONS.map(preset => {
                const Icon = preset.icon;
                const isSelected = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`w-full p-2.5 rounded-xl text-left border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                        : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{preset.label}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{preset.badge}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. SWITCH DESCUENTO COMUNIDAD SPEEDLIGHT (-30%) */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            applySpeedlightDiscount 
              ? 'bg-[#00FF9C]/10 border-[#00FF9C]/40 text-[#00FF9C]' 
              : 'bg-zinc-950 border-zinc-800 text-zinc-400'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs font-mono transition-colors ${
                  applySpeedlightDiscount ? 'bg-[#00FF9C] text-zinc-950 shadow-md shadow-[#00FF9C]/20' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  -30%
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    Alianza Speedlight
                    {applySpeedlightDiscount && (
                      <span className="text-[9px] bg-[#00FF9C]/20 text-[#00FF9C] px-1.5 py-0.5 rounded font-mono font-bold">
                        ACTIVO
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">30% OFF en Construcción y Operación</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleSpeedlight}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  applySpeedlightDiscount ? 'bg-[#00FF9C]' : 'bg-zinc-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-zinc-950 transition-transform ${
                  applySpeedlightDiscount ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* 3. CAMPO RÁPIDO: NOMBRE DEL CLIENTE */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3 h-3 text-indigo-400" />
              Nombre del Cliente / Empresa
            </label>
            <input 
              type="text"
              placeholder={currentOption.defaultClient}
              value={clientName}
              onChange={handleClientNameChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-medium text-white placeholder-zinc-600 focus:border-indigo-500 outline-none transition-colors"
            />
            <p className="text-[10px] text-zinc-500">Dejar en blanco para usar el nombre sugerido del caso de uso.</p>
          </div>

          {/* 4. RESUMEN FINANCIERO DINÁMICO (DERIVADO DEL MOTOR CENTRAL) */}
          <div className="bg-zinc-950/80 rounded-2xl p-4 border border-zinc-800/80 space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Resumen Financiero</div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Fase 1 (Setup):</span>
              <span className="font-mono font-bold text-white">{currentPricing.formattedSetup}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Fase 2 (Anual):</span>
              <span className="font-mono font-bold text-[#00FF9C]">{currentPricing.formattedAnnual}</span>
            </div>

            {applySpeedlightDiscount && (
              <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-center text-xs">
                <span className="text-zinc-400">Ahorro Aplicado:</span>
                <span className="font-mono font-bold text-[#00FF9C]">
                  {formatMoneyCOP(currentPricing.setupSavings + currentPricing.annualSavings)}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* BOTÓN DESCARGAR PDF */}
        <div className="pt-6 space-y-2">
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all disabled:opacity-50 text-white cursor-pointer"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isGenerating ? 'Generando PDF...' : 'Descargar Propuesta PDF'}
          </button>
          <p className="text-[10px] text-zinc-500 text-center">Formato A4 Oficial • Renderizado Vectorial</p>
        </div>

      </div>

      {/* PANEL DERECHO - VISTA DEL DOCUMENTO PDF EN TIEMPO REAL */}
      <div className="flex-1 bg-zinc-950 flex flex-col items-center justify-start p-6 overflow-y-auto relative">
        <div className="w-full max-w-[800px] flex justify-between items-center mb-6 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50 p-4 rounded-xl border border-zinc-800 shadow-xl">
          <div>
            <p className="text-white font-medium text-sm">Vista Previa de Propuesta Oficial</p>
            <p className="text-zinc-400 text-xs">Sincronizada con el Configurador y la Fuente de la Verdad</p>
          </div>
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-bold text-xs transition-colors disabled:opacity-50 text-white cursor-pointer"
          >
            {isGenerating ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {isGenerating ? 'Generando...' : 'Descargar PDF'}
          </button>
        </div>
        
        {/* CONTENEDOR PDF A4 (Proporción 800px de ancho) */}
        <div 
          ref={previewRef}
          className="w-full max-w-[800px] min-h-[1131px] p-10 lg:p-14 relative overflow-hidden shadow-2xl shrink-0 flex flex-col justify-between"
          style={{ width: '800px', backgroundColor: '#ffffff', color: '#18181b', borderColor: '#e4e4e7', borderWidth: '1px' }} 
        >
          {/* Ambient Glows suaves */}
          <div className='absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none' style={{ backgroundColor: '#6366f114' }} />
          <div className='absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none' style={{ backgroundColor: '#00FF9C14' }} />
          
          <div>
            {/* HEADER */}
            <div className="flex justify-between items-end pb-6 mb-8 relative z-10" style={{ borderBottom: '1px solid #e4e4e7' }}>
              <div>
                <div className="mb-2">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src="/brand_logo.png" alt="Purrpurr Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} className="invert" />
                </div>
                <p className="text-xs font-mono tracking-widest uppercase" style={{ color: '#71717a' }}>Propuesta Tecnológica</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg" style={{ color: '#18181b' }}>{data.clientName}</p>
                <p className="text-xs" style={{ color: '#71717a' }}>{data.date}</p>
              </div>
            </div>
            
            {/* TÍTULO Y ALCANCE */}
            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-bold mb-3 font-display leading-tight" style={{ color: '#18181b' }}>{data.projectName}</h2>
              <p className="text-xs leading-relaxed max-w-2xl" style={{ color: '#3f3f46' }}>
                {data.scope}
              </p>
            </div>

            {/* PRECIOS Y FASES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 relative z-10">
              {/* FASE 1 */}
              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: '#f8fafc', border: '1px solid #c7d2fe' }}>
                 <div className="absolute top-0 right-0 p-4 opacity-10"><Rocket className="w-20 h-20 rotate-45" style={{ color: '#6366f1' }} /></div>
                 <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: '#4f46e5' }}>Pago Único (En Cuotas)</span>
                 <h3 className="text-lg font-bold mb-1" style={{ color: '#18181b' }}>{data.phase1Title}</h3>
                 
                  {applySpeedlightDiscount && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md" style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac' }}>
                        ⚡ SPEEDLIGHT -30%
                      </span>
                       <span className="text-xs line-through font-mono font-medium" style={{ color: '#94a3b8' }}>
                         {buildPreset(selectedPreset, false, clientName).phase1Price}
                       </span>
                    </div>
                  )}

                  <div className="text-2xl font-black font-mono mb-4 tracking-tight" style={{ color: '#18181b' }}>{data.phase1Price}</div>
                  
                  <ul className="space-y-2.5">
                    {data.phase1Features.split('\n').filter(Boolean).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#3f3f46' }}>
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#4f46e5' }} />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
               </div>
              
              {/* FASE 2 */}
              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac' }}>
                 <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: '#16a34a' }}>Renovación Anual</span>
                 <h3 className="text-lg font-bold mb-1" style={{ color: '#18181b' }}>{data.phase2Title}</h3>
                 
                  {applySpeedlightDiscount && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md" style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac' }}>
                        ⚡ SPEEDLIGHT -30%
                      </span>
                      <span className="text-xs line-through font-mono font-medium" style={{ color: '#94a3b8' }}>
                        {buildPreset(selectedPreset, false, clientName).phase2Price}
                      </span>
                    </div>
                  )}

                 <div className="text-2xl font-black font-mono mb-4 tracking-tight" style={{ color: '#16a34a' }}>{data.phase2Price}</div>
                 
                 <ul className="space-y-2.5">
                   {data.phase2Features.split('\n').filter(Boolean).map((feat, i) => (
                     <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#3f3f46' }}>
                       <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#16a34a' }} />
                       <span className="leading-snug">{feat}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
            
            {/* CRONOGRAMA & PAGOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#18181b' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6366f1' }} />
                  Cronograma de Desarrollo
                </h4>
                <ul className="space-y-2.5">
                   {data.timeline.split('\n').filter(Boolean).map((line, i) => (
                     <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#52525b' }}>
                       <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#a1a1aa' }} />
                       <span className="leading-snug">{line}</span>
                     </li>
                   ))}
                 </ul>
              </div>
              
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#18181b' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                  Plan de Pago en Cuotas
                </h4>
                <ul className="space-y-2.5">
                   {data.paymentTerms.split('\n').filter(Boolean).map((line, i) => (
                     <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#52525b' }}>
                       <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#16a34a' }} />
                       <span className="leading-snug">{line}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>

            {/* NOTA TRIBUTARIA & FACTURACIÓN LEGAL */}
            <div className="p-3.5 rounded-xl mb-6 relative z-10" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4f46e5' }} />
                <div className="text-[11px] leading-relaxed" style={{ color: '#475569' }}>
                  <span className="font-bold uppercase tracking-wider block mb-0.5" style={{ color: '#1e293b' }}>
                    Aspectos Legales, Tributarios y Facturación
                  </span>
                  {data.taxNote}
                </div>
              </div>
            </div>
          </div>
          
          {/* FOOTER & CTA */}
          <div className="pt-4 flex justify-between items-end relative z-10" style={{ borderTop: '1px solid #e4e4e7' }}>
            <div style={{ maxWidth: '65%' }}>
              <p className="text-xs font-bold" style={{ color: '#18181b' }}>Flagship Agency • Purrpurr</p>
              <p className="text-[11px] mt-0.5 leading-snug" style={{ color: '#71717a' }}>Desarrollo de software de alta gama, comercio electrónico y ecosistemas de inteligencia artificial.</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] mb-0.5" style={{ color: '#71717a' }}>Válida por 15 días</p>
              <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#4f46e5' }}>purrpurr.dev</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
