'use client';

import React, { useState, useRef } from 'react';
import { Download, Settings, Rocket, Check, ArrowRight, FileText, ShoppingBag, Car, Globe, ShieldCheck } from 'lucide-react';

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

const PRESETS: Record<string, ProposalData> = {
  ecommerce: {
    clientName: 'Cliente / Marca Comercial',
    projectName: 'Sistema Web Multipágina con E-Commerce & Pasarela de Pagos',
    date: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
    scope: 'Desarrollo de ecosistema digital multipágina de alto rendimiento con tienda online (E-Commerce) integrada. Autoadministrable, optimizado para conversión, catálogo dinámico con variantes, pasarela de pagos automatizada y arquitectura SEO de última generación.',
    phase1Title: 'Fase 1: Construcción & Despliegue E-Commerce',
    phase1Price: '$2,200,000 COP',
    phase1Features: 'Arquitectura Multipágina (Inicio, Catálogo, Nosotros, Blog, Contacto, Políticas)\nCatálogo E-Commerce Dinámico (Filtros, Categorías, Variantes y Stock)\nCarrito de Compras y Checkout Optimizado sin Fricción\nIntegración Pasarela de Pagos (Wompi, MercadoPago, Bold - PSE, Nequi, Tarjetas)\nPanel de Administración CMS (Subir/Editar productos, precios y pedidos)\nNotificaciones automáticas por WhatsApp y Correo Electrónico',
    phase2Title: 'Fase 2: Infraestructura Cloud & Soporte',
    phase2Price: '$1,800,000 COP / Año',
    phase2Features: 'Renovación Anual de Dominio .com\nServidor Cloud NVMe de Alta Velocidad\nCertificado SSL de Seguridad y Protección de Pagos\nBackups Diarios Automatizados y Monitoreo 24/7\nSoporte Técnico y Actualizaciones de Seguridad',
    timeline: '3 a 4 Semanas de Desarrollo.\nSemana 1: Kickoff, Arquitectura de Información y Aprobación UI/UX.\nSemana 2: Desarrollo Multipágina y Motor de Catálogo/Tienda.\nSemana 3: Integración de Pasarela de Pagos y Pruebas Transaccionales (Beta).\nSemana 4: Despliegue en Dominio Oficial, Entrega de Accesos y Capacitación.',
    paymentTerms: 'Cuota 1 (40% - $880,000 COP): Anticipo al inicio del proyecto y diseño UI.\nCuota 2 (30% - $660,000 COP): Contra-entrega de versión Beta funcional y catálogo.\nCuota 3 (30% - $660,000 COP): Despliegue en producción final y entrega de accesos.\nMétodos: Transferencia Bancolombia, Nequi, Daviplata o PSE.',
    taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se expide Factura Legal Electrónica como Persona Natural (o Cuenta de Cobro formal con RUT y Seguridad Social), 100% válida y deducible tributariamente.'
  },
  speedlight: {
    clientName: 'Speedlight / Cliente Automotriz',
    projectName: 'Portal de Venta de Vehículos (Marketplace)',
    date: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
    scope: 'Desarrollo de plataforma web optimizada para la publicación, búsqueda y visualización de vehículos en venta. Autoadministrable, rápida y diseñada para maximizar la conversión.',
    phase1Title: 'Fase 1: Construcción & Setup',
    phase1Price: '$2,200,000 COP',
    phase1Features: 'Página Principal (Buscador, Destacados)\nCatálogo Dinámico (Filtros, Paginación)\nFicha de Vehículo (Galería, Specs, WhatsApp)\nPanel de Administración (Subir/Editar autos)\nConfiguración Cloud Base',
    phase2Title: 'Fase 2: Operación & Mantenimiento',
    phase2Price: '$1,800,000 COP / Año',
    phase2Features: 'Renovación de Dominio .com\nServidor Cloud NVMe de Alta Velocidad\nTransferencia de imágenes sin límite\nCertificado SSL de Seguridad\nBackups Diarios y Monitoreo 24/7',
    timeline: '3 a 4 Semanas.\nReunión 1: Kickoff y Diseño.\nReunión 2: Aprobación Visual.\nReunión 3: Revisión Funcional (Beta).\nReunión 4: Entrega y Capacitación.',
    paymentTerms: '50% Anticipo al inicio del proyecto ($1,100,000 COP).\n50% Contra-entrega antes de lanzar el dominio oficial ($1,100,000 COP).\nMétodos: Transferencia Bancolombia, Nequi o PSE.',
    taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se genera soporte legal para deducción de costos.'
  },
  corporate: {
    clientName: 'Cliente Corporativo',
    projectName: 'Sitio Web Multi-Página Corporativo & Blog',
    date: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
    scope: 'Desarrollo de sitio web corporativo institucional con blog, gestor de contenidos dinámicos (CMS), captura de clientes potenciales y optimización SEO integral.',
    phase1Title: 'Fase 1: Construcción & Despliegue',
    phase1Price: '$850,000 COP',
    phase1Features: 'Sitio Multi-Página (Inicio, Servicios, Nosotros, Blog, Contacto)\nCMS Autoadministrable para Blog y Noticias\nFormularios CRM & Integración directa a WhatsApp\nOptimización SEO Técnica y Velocidad Mobile\nDiseño UI/UX Personalizado e Identidad de Marca',
    phase2Title: 'Fase 2: Infraestructura & Operación',
    phase2Price: '$950,000 COP / Año',
    phase2Features: 'Dominio .com por 1 año\nServidor Cloud Fast Edge de alta velocidad\nCertificado SSL de Seguridad\nBackups Diarios Automáticos\nMonitoreo y Soporte Preventivo 24/7',
    timeline: '2 a 3 Semanas de Desarrollo.\nHito 1: Estructura, contenido y aprobación de diseño.\nHito 2: Desarrollo y carga de contenidos en CMS.\nHito 3: Lanzamiento en dominio oficial y entrega de accesos.',
    paymentTerms: 'Cuota 1 (50% - $425,000 COP): Anticipo al inicio del proyecto.\nCuota 2 (50% - $425,000 COP): Contra-entrega previa al lanzamiento en producción.\nMétodos: Bancolombia, Nequi, Daviplata o PSE.',
    taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se expide Factura Legal Electrónica como Persona Natural.'
  }
};

export const ProposalGenerator = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('ecommerce');
  const [applySpeedlightDiscount, setApplySpeedlightDiscount] = useState(false);

  const [data, setData] = useState<ProposalData>(PRESETS.ecommerce);

  const getDiscountedValues = (presetKey: string, enableDiscount: boolean) => {
    if (!enableDiscount) {
      return {
        price: PRESETS[presetKey]?.phase1Price || '$2,200,000 COP',
        phase2Price: PRESETS[presetKey]?.phase2Price || '$1,800,000 COP / Año',
        paymentTerms: PRESETS[presetKey]?.paymentTerms || '',
      };
    }

    if (presetKey === 'ecommerce') {
      return {
        price: '$1,540,000 COP',
        phase2Price: '$1,260,000 COP / Año',
        paymentTerms: 'Cuota 1 (40% - $616,000 COP): Anticipo al inicio del proyecto y diseño UI.\nCuota 2 (30% - $462,000 COP): Contra-entrega de versión Beta funcional y catálogo.\nCuota 3 (30% - $462,000 COP): Despliegue en producción final y entrega de accesos.\nBeneficio Especial: -30% Alianza Speedlight Culture aplicado (Cupón SPEEDLIGHT-30).\nMétodos: Transferencia Bancolombia, Nequi, Daviplata o PSE.',
      };
    } else if (presetKey === 'speedlight') {
      return {
        price: '$1,540,000 COP',
        phase2Price: '$1,260,000 COP / Año',
        paymentTerms: 'Cuota 1 (50% - $770,000 COP): Anticipo al inicio del proyecto.\nCuota 2 (50% - $770,000 COP): Contra-entrega previa al lanzamiento en producción.\nBeneficio Especial: -30% Alianza Speedlight Culture aplicado (Cupón SPEEDLIGHT-30).\nMétodos: Transferencia Bancolombia, Nequi o PSE.',
      };
    } else {
      return {
        price: '$595,000 COP',
        phase2Price: '$665,000 COP / Año',
        paymentTerms: 'Cuota 1 (50% - $297,500 COP): Anticipo al inicio del proyecto.\nCuota 2 (50% - $297,500 COP): Contra-entrega de versión final.\nBeneficio Especial: -30% Alianza Speedlight Culture aplicado (Cupón SPEEDLIGHT-30).\nMétodos: Transferencia Bancolombia, Nequi o PSE.',
      };
    }
  };

  const handleSelectPreset = (presetKey: string) => {
    setSelectedPreset(presetKey);
    const base = PRESETS[presetKey];
    if (applySpeedlightDiscount) {
      const discounted = getDiscountedValues(presetKey, true);
      setData({
        ...base,
        phase1Price: discounted.price,
        phase2Price: discounted.phase2Price,
        paymentTerms: discounted.paymentTerms,
      });
    } else {
      setData(base);
    }
  };

  const handleToggleSpeedlight = () => {
    const nextState = !applySpeedlightDiscount;
    setApplySpeedlightDiscount(nextState);
    const discounted = getDiscountedValues(selectedPreset, nextState);
    setData(prev => ({
      ...prev,
      phase1Price: discounted.price,
      phase2Price: discounted.phase2Price,
      paymentTerms: discounted.paymentTerms,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
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

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-zinc-950 text-white overflow-hidden">
      {/* PANEL IZQUIERDO - FORMULARIO */}
      <div className="w-full lg:w-1/3 p-6 bg-zinc-900 border-r border-zinc-800 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="text-indigo-500 w-5 h-5" />
          <h2 className="text-xl font-bold font-display">Generador de Propuestas</h2>
        </div>

        {/* PRESET SELECTOR */}
        <div className="mb-6 space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Plantillas Rápidas</label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleSelectPreset('ecommerce')}
              className={`p-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                selectedPreset === 'ecommerce'
                  ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
              <span className="truncate text-[11px]">E-Commerce</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('speedlight')}
              className={`p-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                selectedPreset === 'speedlight'
                  ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-[#00FF9C]" />
              <span className="truncate text-[11px]">Vehículos</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('corporate')}
              className={`p-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                selectedPreset === 'corporate'
                  ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="truncate text-[11px]">Sitio Pro</span>
            </button>
          </div>
        </div>

        {/* SPEEDLIGHT DISCOUNT TOGGLE */}
        <div className={`p-3 rounded-xl border transition-all flex items-center justify-between mb-6 ${
          applySpeedlightDiscount 
            ? 'bg-[#00FF9C]/10 border-[#00FF9C]/40 text-[#00FF9C]' 
            : 'bg-zinc-950 border-zinc-800 text-zinc-400'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono transition-colors ${
              applySpeedlightDiscount ? 'bg-[#00FF9C] text-zinc-950 shadow-md shadow-[#00FF9C]/20' : 'bg-zinc-800 text-zinc-400'
            }`}>
              -30%
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                Descuento Speedlight
                {applySpeedlightDiscount && (
                  <span className="text-[9px] bg-[#00FF9C]/20 text-[#00FF9C] px-1.5 py-0.5 rounded font-mono font-bold">
                    ACTIVO
                  </span>
                )}
              </div>
              <p className="text-[10px] text-zinc-400">Cupón SPEEDLIGHT-30 (-30% en Fase 1)</p>
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
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase font-bold">Cliente</label>
            <input name="clientName" value={data.clientName} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none" />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase font-bold">Proyecto</label>
            <input name="projectName" value={data.projectName} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase font-bold">Fecha</label>
            <input name="date" value={data.date} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none" />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase font-bold">Alcance</label>
            <textarea name="scope" value={data.scope} onChange={handleChange} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none leading-relaxed" />
          </div>

          <div className="p-3 bg-zinc-950/50 rounded-lg border border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-400">FASE 1: CONSTRUCCIÓN</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs text-zinc-500">Título</label>
                <input name="phase1Title" value={data.phase1Title} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-1.5 text-xs focus:border-indigo-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500">Precio</label>
                <input name="phase1Price" value={data.phase1Price} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-1.5 text-xs font-mono focus:border-indigo-500 outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Características (una por línea)</label>
              <textarea name="phase1Features" value={data.phase1Features} onChange={handleChange} rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-xs focus:border-indigo-500 outline-none leading-relaxed" />
            </div>
          </div>

          <div className="p-3 bg-zinc-950/50 rounded-lg border border-zinc-800 space-y-3">
            <h3 className="text-sm font-bold text-[#00FF9C]">FASE 2: OPERACIÓN</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs text-zinc-500">Título</label>
                <input name="phase2Title" value={data.phase2Title} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-1.5 text-xs focus:border-[#00FF9C] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500">Precio</label>
                <input name="phase2Price" value={data.phase2Price} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-1.5 text-xs font-mono focus:border-[#00FF9C] outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500">Características (una por línea)</label>
              <textarea name="phase2Features" value={data.phase2Features} onChange={handleChange} rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-xs focus:border-[#00FF9C] outline-none leading-relaxed" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase font-bold">Cronograma y Entregas (una por línea)</label>
            <textarea name="timeline" value={data.timeline} onChange={handleChange} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none leading-relaxed" />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase font-bold">Formas de Pago / Cuotas (una por línea)</label>
            <textarea name="paymentTerms" value={data.paymentTerms} onChange={handleChange} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none leading-relaxed" />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase font-bold">Nota Tributaria y Facturación</label>
            <textarea name="taxNote" value={data.taxNote} onChange={handleChange} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none leading-relaxed text-zinc-300" />
          </div>
        </div>
      </div>
      
      {/* PANEL DERECHO - PREVIEW & EXPORT */}
      <div className="w-full lg:w-2/3 bg-zinc-950 flex flex-col items-center justify-start p-6 overflow-y-auto relative">
        <div className="w-full max-w-[800px] flex justify-between items-center mb-6 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50 p-4 rounded-xl border border-zinc-800 shadow-xl">
          <div>
            <p className="text-white font-medium text-sm">Vista Previa de Propuesta</p>
            <p className="text-zinc-400 text-xs">Formato A4 Vertical • Alta Calidad</p>
          </div>
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
          >
            {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-4 h-4" />}
            {isGenerating ? 'Generando PDF...' : 'Descargar PDF'}
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
                 <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: '#4f46e5' }}>Pago Único (En 3 Cuotas)</span>
                 <h3 className="text-lg font-bold mb-1" style={{ color: '#18181b' }}>{data.phase1Title}</h3>
                 
                 {applySpeedlightDiscount && (
                   <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md" style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac' }}>
                       ⚡ SPEEDLIGHT -30%
                     </span>
                      <span className="text-xs line-through font-mono font-medium" style={{ color: '#94a3b8' }}>
                        {selectedPreset === 'ecommerce' ? '$2,200,000 COP' : selectedPreset === 'speedlight' ? '$2,200,000 COP' : '$850,000 COP'}
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
                       {selectedPreset === 'ecommerce' ? '$1,800,000 COP / Año' : selectedPreset === 'speedlight' ? '$1,800,000 COP / Año' : '$950,000 COP / Año'}
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
                  Plan de Pago (3 Cuotas)
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
