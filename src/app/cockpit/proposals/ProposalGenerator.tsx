'use client';

import React, { useState, useRef } from 'react';
import { Download, Settings, Rocket, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

export const ProposalGenerator = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [data, setData] = useState<ProposalData>({
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
    paymentTerms: '50% Anticipo al inicio del proyecto.\n50% Contra-entrega (antes de lanzar el dominio oficial).\nMétodos: Transferencia Bancolombia, Nequi, o Tarjeta de Crédito.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Configuramos para alta calidad
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#09090b' // Fondo oscuro de la preview
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // A4 format: 210 x 297 mm
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
        <div className="flex items-center gap-2 mb-6">
          <Settings className="text-indigo-500 w-5 h-5" />
          <h2 className="text-xl font-bold font-display">Generador de Propuestas</h2>
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
            <textarea name="scope" value={data.scope} onChange={handleChange} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none" />
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
            <label className="text-xs text-zinc-400 uppercase font-bold">Cronograma y Reuniones (una por línea)</label>
            <textarea name="timeline" value={data.timeline} onChange={handleChange} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none leading-relaxed" />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase font-bold">Formas de Pago (una por línea)</label>
            <textarea name="paymentTerms" value={data.paymentTerms} onChange={handleChange} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:border-indigo-500 outline-none leading-relaxed" />
          </div>
        </div>
      </div>
      
      {/* PANEL DERECHO - PREVIEW & EXPORT */}
      <div className="w-full lg:w-2/3 bg-zinc-950 flex flex-col items-center justify-start p-6 overflow-y-auto relative">
        <div className="w-full max-w-[800px] flex justify-between items-center mb-6 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50 p-4 rounded-xl border border-zinc-800 shadow-xl">
          <p className="text-zinc-400 text-sm">Vista Previa (A4 Vertical)</p>
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
          >
            {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-4 h-4" />}
            {isGenerating ? 'Generando PDF...' : 'Descargar PDF'}
          </button>
        </div>
        
        {/* CONTENEDOR PDF A4 (Proporción aprox 1:1.414) */}
        <div 
          ref={previewRef}
          className="w-full max-w-[800px] min-h-[1131px] p-12 lg:p-16 relative overflow-hidden shadow-2xl shrink-0"
          style={{ width: '800px', backgroundColor: '#ffffff', color: '#18181b', borderColor: '#e4e4e7', borderWidth: '1px' }} 
        >
          {/* Ambient Glows de diseño premium (suaves para fondo blanco) */}
          <div className='absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none' style={{ backgroundColor: '#6366f11A' }} />
          <div className='absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none' style={{ backgroundColor: '#00FF9C1A' }} />
          
          {/* HEADER */}
          <div className="flex justify-between items-end pb-8 mb-10 relative z-10" style={{ borderBottom: '1px solid #e4e4e7' }}>
            <div>
              <div className="mb-2">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 {/* Asumiendo que el logo de purrpurr oscuro necesita contraste, usaremos un filtro CSS si es blanco o lo dejamos si es de color. Para este caso se imprime tal cual */}
                 <img src="/brand_logo.png" alt="Purrpurr Logo" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} className="invert" />
              </div>
              <p className="text-sm font-mono tracking-widest uppercase" style={{ color: '#71717a' }}>Propuesta Tecnológica</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg" style={{ color: '#18181b' }}>{data.clientName}</p>
              <p className="text-sm" style={{ color: '#71717a' }}>{data.date}</p>
            </div>
          </div>
          
          {/* TÍTULO Y ALCANCE */}
          <div className="mb-10 relative z-10">
            <h2 className="text-3xl font-bold mb-4 font-display" style={{ color: '#18181b' }}>{data.projectName}</h2>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#3f3f46' }}>
              {data.scope}
            </p>
          </div>

          {/* PRECIOS Y FASES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
            {/* FASE 1 */}
            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ backgroundColor: '#f8fafc', border: '1px solid #c7d2fe' }}>
               <div className="absolute top-0 right-0 p-4 opacity-10"><Rocket className="w-24 h-24 rotate-45" style={{ color: '#6366f1' }} /></div>
               <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: '#4f46e5' }}>Pago Único</span>
               <h3 className="text-xl font-bold mb-2" style={{ color: '#18181b' }}>{data.phase1Title}</h3>
               <div className="text-3xl font-black font-mono mb-6 tracking-tight" style={{ color: '#18181b' }}>{data.phase1Price}</div>
               
               <ul className="space-y-3">
                 {data.phase1Features.split('\n').map((feat, i) => (
                   <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#3f3f46' }}>
                     <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4f46e5' }} />
                     <span className="leading-tight">{feat}</span>
                   </li>
                 ))}
               </ul>
            </div>
            
            {/* FASE 2 */}
            <div className="rounded-2xl p-6 relative overflow-hidden mt-6 md:mt-12" style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac' }}>
               <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: '#16a34a' }}>Renovación Anual</span>
               <h3 className="text-xl font-bold mb-2" style={{ color: '#18181b' }}>{data.phase2Title}</h3>
               <div className="text-3xl font-black font-mono mb-6 tracking-tight" style={{ color: '#16a34a' }}>{data.phase2Price}</div>
               
               <ul className="space-y-3">
                 {data.phase2Features.split('\n').map((feat, i) => (
                   <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#3f3f46' }}>
                     <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#16a34a' }} />
                     <span className="leading-tight">{feat}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
          
          {/* CRONOGRAMA & PAGOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#18181b' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6366f1' }} />
                Cronograma y Reuniones
              </h4>
              <ul className="space-y-3">
                 {data.timeline.split('\n').map((line, i) => (
                   <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#52525b' }}>
                     <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#a1a1aa' }} />
                     <span className="leading-snug">{line}</span>
                   </li>
                 ))}
               </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#18181b' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                Formas de Pago
              </h4>
              <ul className="space-y-3">
                 {data.paymentTerms.split('\n').map((line, i) => (
                   <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#52525b' }}>
                     <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#a1a1aa' }} />
                     <span className="leading-snug">{line}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
          
          {/* FOOTER & CTA */}
          <div className="absolute bottom-12 left-12 right-12 pt-6 flex justify-between items-end z-10" style={{ borderTop: '1px solid #e4e4e7' }}>
            <div style={{ maxWidth: '60%' }}>
              <p className="text-sm font-bold" style={{ color: '#18181b' }}>Conoce nuestro trabajo</p>
              <p className="text-xs mt-1 leading-snug" style={{ color: '#52525b' }}>Explora nuestros proyectos, casos de estudio y tecnología de inteligencia artificial directamente en nuestra central.</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] mb-1" style={{ color: '#71717a' }}>Válida por 15 días</p>
              <p className="text-sm font-black tracking-widest uppercase" style={{ color: '#4f46e5' }}>purrpurr.dev</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
