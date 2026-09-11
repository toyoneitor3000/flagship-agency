'use client';

import React, { useState, useRef } from 'react';
import { Download, Rocket, Check, ArrowRight, ShieldCheck, Printer } from 'lucide-react';
import { ACTIVE_PROPOSAL } from '@/config/active-proposal';

export const ProposalGenerator = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const data = ACTIVE_PROPOSAL;

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-start pb-16">
      
      {/* BARRA SUPERIOR DE ACCIONES RÁPIDAS (MINIMALISTA) */}
      <header className="w-full bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-pulse" />
          <div>
            <h1 className="text-sm font-bold text-white leading-none flex items-center gap-2">
              Propuesta Oficial: <span className="text-zinc-300 font-normal">{data.clientName}</span>
            </h1>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">{data.projectName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {data.hasSpeedlightDiscount && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/30 text-[#00FF9C]">
              ⚡ Alianza Speedlight (-30%)
            </span>
          )}

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir
          </button>

          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 text-white cursor-pointer"
          >
            {isGenerating ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            {isGenerating ? 'Generando PDF...' : 'Descargar PDF Oficial'}
          </button>
        </div>
      </header>

      {/* ÁREA DE VISUALIZACIÓN DEL DOCUMENTO A4 */}
      <main className="w-full flex flex-col items-center justify-start p-6 md:p-10">
        
        {/* CONTENEDOR PDF A4 (800px de proporción estándar) */}
        <div 
          ref={previewRef}
          className="w-full max-w-[800px] min-h-[1131px] p-10 lg:p-14 relative overflow-hidden shadow-2xl rounded-sm flex flex-col justify-between"
          style={{ width: '800px', backgroundColor: '#ffffff', color: '#18181b', borderColor: '#e4e4e7', borderWidth: '1px' }} 
        >
          {/* Ambient Glows sutiles para fondo limpio */}
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
              
              {/* FASE 1: CONSTRUCCIÓN */}
              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: '#f8fafc', border: '1px solid #c7d2fe' }}>
                 <div className="absolute top-0 right-0 p-4 opacity-10"><Rocket className="w-20 h-20 rotate-45" style={{ color: '#6366f1' }} /></div>
                 <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: '#4f46e5' }}>Pago Único (En Cuotas)</span>
                 <h3 className="text-lg font-bold mb-1" style={{ color: '#18181b' }}>{data.phase1.title}</h3>
                 
                  {data.hasSpeedlightDiscount && data.phase1.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md" style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac' }}>
                        ⚡ SPEEDLIGHT -30%
                      </span>
                       <span className="text-xs line-through font-mono font-medium" style={{ color: '#94a3b8' }}>
                         {data.phase1.originalPrice}
                       </span>
                    </div>
                  )}

                  <div className="text-2xl font-black font-mono mb-4 tracking-tight" style={{ color: '#18181b' }}>{data.phase1.price}</div>
                  
                  <ul className="space-y-2.5">
                    {data.phase1.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#3f3f46' }}>
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#4f46e5' }} />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
               </div>
              
              {/* FASE 2: OPERACIÓN & SOPORTE */}
              <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac' }}>
                 <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: '#16a34a' }}>Renovación Anual</span>
                 <h3 className="text-lg font-bold mb-1" style={{ color: '#18181b' }}>{data.phase2.title}</h3>
                 
                  {data.hasSpeedlightDiscount && data.phase2.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md" style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac' }}>
                        ⚡ SPEEDLIGHT -30%
                      </span>
                      <span className="text-xs line-through font-mono font-medium" style={{ color: '#94a3b8' }}>
                        {data.phase2.originalPrice}
                      </span>
                    </div>
                  )}

                 <div className="text-2xl font-black font-mono mb-4 tracking-tight" style={{ color: '#16a34a' }}>{data.phase2.price}</div>
                 
                 <ul className="space-y-2.5">
                   {data.phase2.features.map((feat, i) => (
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
                   {data.timeline.map((line, i) => (
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
                   {data.paymentTerms.map((line, i) => (
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
      </main>
    </div>
  );
};
