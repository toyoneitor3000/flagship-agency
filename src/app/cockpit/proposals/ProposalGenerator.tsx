'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  CreditCard,
  ZoomIn,
  Minimize2,
  ShieldCheck,
  FileText,
  Layers,
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { ACTIVE_PROPOSAL } from '@/config/active-proposal';

const A4_WIDTH = 820;
const A4_HEIGHT = 1160;
const OFFICIAL_VECTOR_PDF_URL =
  '/cotizaciones/PROPUESTA_JULIAN_LOTERO_PROP-JL-2026-094_2026-10-29.pdf';

function VectorArrow({
  direction = 'ne',
  className = 'w-8 h-8',
  color = '#111111',
}: {
  direction?: 'ne' | 'se';
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {direction === 'ne' ? (
        <path
          d="M7 29L29 7M29 7H12M29 7V24"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      ) : (
        <path
          d="M7 7L29 29M29 29H12M29 29V12"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      )}
    </svg>
  );
}

function EditorialFooter({
  docCode,
  sectionLabel,
  pageNumber,
  totalPages = 5,
}: {
  docCode: string;
  sectionLabel: string;
  pageNumber: number;
  totalPages?: number;
}) {
  const paddedPage = String(pageNumber).padStart(2, '0');
  const paddedTotal = String(totalPages).padStart(2, '0');
  return (
    <footer className="border-t border-[#E7E7E5] pt-3 mt-4 flex items-center justify-between text-[9.5px] font-mono text-[#777777] tracking-wider uppercase">
      <div className="flex items-center gap-2.5">
        <span className="inline-block w-2 h-2 rounded-full bg-[#9B5CFF]" />
        <span className="text-[#111111] font-bold">
          PURRPURR.DEV × SPEEDLIGHT CULTURE
        </span>
        <span>·</span>
        <span>#{docCode}</span>
      </div>
      <div className="flex items-center gap-6">
        <span>{sectionLabel}</span>
        <span className="text-[#111111] font-bold">
          P.{paddedPage} / {paddedTotal}
        </span>
      </div>
    </footer>
  );
}

function EditorialHeaderStrip({
  docCode,
  partLabel,
  direction = 'se',
}: {
  docCode: string;
  partLabel: string;
  direction?: 'ne' | 'se';
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#E7E7E5] pb-3.5 mb-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#111111] text-[#F7F7F5] font-mono text-[9.5px] font-bold uppercase tracking-widest">
          {partLabel}
        </span>
        <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider">
          PROPUESTA #{docCode}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <img
          src="/brand/purrpurrlogo.png"
          alt="purrpurr.dev"
          className="h-4 w-auto object-contain opacity-90"
        />
        <span className="font-mono text-[10px] text-[#777777]">×</span>
        <img
          src="/brand/speedlight-logo-black-ui.png"
          alt="Speedlight Culture"
          className="h-4 w-auto object-contain opacity-90"
        />
        <VectorArrow
          direction={direction}
          className="w-5 h-5 ml-1"
          color="#111111"
        />
      </div>
    </div>
  );
}

export const ProposalGenerator = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<
    number | null
  >(null);
  const [copiedCopy, setCopiedCopy] = useState(false);
  const [scale, setScale] = useState(1);
  const [docHeight, setDocHeight] = useState(A4_HEIGHT * 5 + 96);
  const [forceFullZoom, setForceFullZoom] = useState(false);

  const data = ACTIVE_PROPOSAL;

  useEffect(() => {
    const updateMetrics = () => {
      if (containerRef.current) {
        const available = containerRef.current.clientWidth;
        if (available > 0 && available < A4_WIDTH) {
          setScale(Math.min(1, available / A4_WIDTH));
        } else {
          setScale(1);
        }
      }
      if (previewRef.current) {
        setDocHeight(previewRef.current.scrollHeight || A4_HEIGHT * 5 + 96);
      }
    };

    updateMetrics();
    const ro = new ResizeObserver(updateMetrics);
    if (containerRef.current) ro.observe(containerRef.current);
    if (previewRef.current) ro.observe(previewRef.current);
    window.addEventListener('resize', updateMetrics);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMetrics);
    };
  }, [selectedPackageIndex]);

  const effectiveScale = forceFullZoom ? 1 : scale;

  const activePkg =
    selectedPackageIndex !== null
      ? data.alternativePackages[selectedPackageIndex] || null
      : null;

  const isMultiOptionUnselected =
    data.alternativePackages.length > 1 && selectedPackageIndex === null;

  const pkgTotals = data.alternativePackages.map((p) => p.total);
  const minPkgTotal = Math.min(...pkgTotals);
  const maxPkgTotal = Math.max(...pkgTotals);

  const activeTotal = activePkg ? activePkg.total : data.total;
  const activeSubtotal = activePkg ? activePkg.listPrice : data.subtotal;
  const activeDiscountLabel = activePkg
    ? activePkg.discountLabel
    : data.discount.label;
  const activeDiscountAmount = activePkg
    ? activePkg.discountAmount
    : data.discount.amount;
  const anticipo50 = activePkg
    ? activePkg.advancePaymentAmount
    : Math.round(activeTotal * 0.5);
  const saldo50 = activePkg
    ? activePkg.balancePaymentAmount
    : activeTotal - anticipo50;

  const checkoutUrl =
    selectedPackageIndex !== null
      ? `${data.checkoutBaseUrl}&pkg=${selectedPackageIndex}`
      : data.checkoutBaseUrl;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(data.whatsappSummary);
      setCopiedCopy(true);
      setTimeout(() => setCopiedCopy(false), 2000);
    } catch (err) {
      console.error('Error copiando resumen:', err);
    }
  };

  const handleDownloadPDF = async () => {
    // If default state, download the true vector PDF with embedded fonts directly
    if (selectedPackageIndex === null) {
      const link = document.createElement('a');
      link.href = OFFICIAL_VECTOR_PDF_URL;
      link.download = `PROPUESTA_JULIAN_LOTERO_${data.code}_${data.date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (!previewRef.current) return;
    setIsGenerating(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pages = Array.from(
        previewRef.current.querySelectorAll<HTMLElement>('[data-pdf-page]')
      );
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pages.length; i++) {
        if (i > 0) pdf.addPage();
        const canvas = await html2canvas(pages[i], {
          scale: 2.5,
          useCORS: true,
          logging: false,
          backgroundColor: '#F7F7F5',
          windowWidth: A4_WIDTH,
          windowHeight: A4_HEIGHT,
          onclone: (clonedDoc) => {
            const wrapper = clonedDoc.querySelector('[data-a4-scale-wrapper]');
            if (wrapper) {
              (wrapper as HTMLElement).style.transform = 'none';
              (wrapper as HTMLElement).style.width = `${A4_WIDTH}px`;
            }
          },
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`PROPUESTA_JULIAN_LOTERO_${data.code}_${data.date}.pdf`);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('Error al generar PDF', error);
      alert(`Hubo un error al generar el PDF: ${msg}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const pageShellClass =
    'w-[820px] min-h-[1160px] max-h-[1160px] h-[1160px] bg-[#F7F7F5] text-[#111111] rounded-none sm:rounded-xl shadow-none sm:shadow-[0_12px_40px_rgba(17,17,17,0.08)] px-11 py-8 border border-[#E7E7E5] flex flex-col justify-between overflow-hidden box-border';

  const item1 = data.items[0];
  const item2 = data.items[1];
  const item3 = data.items[2];

  return (
    <div className="min-h-screen bg-[#E7E7E5] text-[#111111] flex flex-col items-center justify-start pb-16">
      {/* BARRA SUPERIOR DE ACCIONES SINCRONIZADAS */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#111111]/10 sticky top-14 z-40 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs print:hidden">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <img
              src="/brand/purrpurrlogo.png"
              alt="purrpurr.dev"
              className="h-5 w-auto object-contain"
            />
            <span className="font-mono text-xs font-black text-[#777777]">×</span>
            <img
              src="/brand/speedlight-logo-black-ui.png"
              alt="Speedlight Culture"
              className="h-5 w-auto object-contain"
            />
          </div>
          <div className="min-w-0 border-l border-[#111111]/15 pl-3">
            <h1 className="text-xs sm:text-sm font-bold text-[#111111] leading-none truncate">
              #{data.code} · {data.clientName} (Presentación 5 Páginas A4)
            </h1>
            <p className="text-[10.5px] text-[#777777] font-mono mt-0.5 truncate">
              Alianza purrpurr.dev × Speedlight Culture · {data.clientCompany}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {scale < 1 && (
            <button
              type="button"
              onClick={() => setForceFullZoom((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold bg-[#F7F7F5] hover:bg-[#E7E7E5] text-[#111111] border border-[#111111]/15 transition-colors cursor-pointer"
            >
              {forceFullZoom ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-[#9B5CFF]" />
                  <span>Ajustar</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5 text-[#9B5CFF]" />
                  <span>Zoom 100%</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#111111] hover:bg-[#222222] text-white transition-colors cursor-pointer"
          >
            {copiedCopy ? (
              <Check className="w-3.5 h-3.5 text-[#9B5CFF]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#9B5CFF]" />
            )}
            <span>{copiedCopy ? 'Copiado' : 'Copiar Copy'}</span>
          </button>

          <a
            href="/cockpit/proposal-studio"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#111111] hover:bg-[#222222] text-[#F7F7F5] border border-[#111111] transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#9B5CFF]" />
            <span>Proposal Studio</span>
          </a>

          <a
            href={OFFICIAL_VECTOR_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#F7F7F5] hover:bg-[#E7E7E5] text-[#111111] border border-[#111111]/15 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#9B5CFF]" />
            <span className="hidden sm:inline">PDF Vectorial</span>
            <span className="sm:hidden">PDF</span>
          </a>

          <a
            href={data.speedlightUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#F7F7F5] hover:bg-[#E7E7E5] text-[#111111] border border-[#111111]/15 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#9B5CFF]" />
            <span className="hidden sm:inline">Ver en Speedlight</span>
            <span className="sm:hidden">Speedlight</span>
          </a>

          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#F7F7F5] hover:bg-[#E7E7E5] text-[#111111] border border-[#111111]/15 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-1.5 bg-[#9B5CFF] hover:bg-[#8A48F5] text-white px-3.5 py-1.5 rounded-lg font-bold text-[11px] uppercase tracking-wider shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isGenerating ? 'Generando...' : 'Descargar PDF (5 Pág.)'}</span>
          </button>
        </div>
      </header>

      {/* ÁREA DE VISUALIZACIÓN PROPORCIONAL A4 MULTIPÁGINA */}
      <main
        ref={containerRef}
        className={`w-full max-w-5xl mx-auto px-2 sm:px-6 pt-6 flex justify-center ${
          forceFullZoom ? 'overflow-x-auto justify-start' : 'overflow-x-hidden'
        }`}
      >
        <div
          style={{
            width: `${A4_WIDTH * effectiveScale}px`,
            height: `${docHeight * effectiveScale}px`,
            position: 'relative',
          }}
        >
          <div
            data-a4-scale-wrapper="true"
            style={{
              width: `${A4_WIDTH}px`,
              transform: `scale(${effectiveScale})`,
              transformOrigin: 'top left',
              fontFamily:
                'var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif',
            }}
          >
            <div ref={previewRef} className="space-y-6">
              {/* =============================================================== */}
              {/* PÁGINA 1: PORTADA EDITORIAL & RESUMEN EJECUTIVO                 */}
              {/* =============================================================== */}
              <section data-pdf-page="1" className={pageShellClass}>
                <div>
                  <div className="flex items-center justify-between border-b border-[#E7E7E5] pb-5 mb-7">
                    <div className="flex items-center gap-4">
                      <img
                        src="/brand/purrpurrlogo.png"
                        alt="purrpurr.dev"
                        className="h-8 w-auto object-contain"
                      />
                      <span className="font-mono text-base font-bold text-[#777777]">
                        ×
                      </span>
                      <img
                        src="/brand/speedlight-logo-black-ui.png"
                        alt="Speedlight Culture"
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#F7F7F5] font-mono text-[10px] font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF]" />
                        PROPUESTA COMERCIAL · #{data.code}
                      </span>
                      <p className="font-mono text-[10px] text-[#777777] mt-1.5 tracking-wider uppercase">
                        EMISIÓN:{' '}
                        <strong className="text-[#111111]">{data.date}</strong> ·
                        VIGENCIA:{' '}
                        <strong className="text-[#111111]">
                          {data.validDays} DÍAS
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-6 h-[2px] bg-[#9B5CFF]" />
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#9B5CFF]">
                        Alianza de Ingeniería de Software &amp; Ecosistema
                        Automotriz
                      </span>
                    </div>
                    <h2 className="font-sans font-black text-[42px] leading-[0.98] tracking-[-0.03em] text-[#111111] uppercase">
                      SISTEMA WEB DE COTIZACIONES, AGENDA &amp; DISPERSIÓN WOMPI
                    </h2>
                    <p className="font-sans text-[13.5px] leading-snug text-[#555555] mt-3.5 max-w-[680px]">
                      {data.concept}
                    </p>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-[#E7E7E5] bg-[#111111] h-[395px] w-full">
                    <img
                      src="/cotizaciones/prop-jl-2026-094/hero-cover-detailing-studio.png"
                      alt="Estudio de detailing automotriz de alta gama"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-12 gap-6 items-end border-t border-[#E7E7E5] pt-5">
                    <div className="col-span-8 space-y-2.5">
                      <div className="grid grid-cols-12 gap-3 pb-2 border-b border-[#E7E7E5]">
                        <span className="col-span-4 font-mono text-[9.5px] uppercase tracking-widest text-[#777777] font-bold">
                          CLIENTE / DESTINATARIO
                        </span>
                        <div className="col-span-8">
                          <strong className="text-[13px] font-bold text-[#111111] block leading-tight">
                            {data.clientName} · {data.clientCompany}
                          </strong>
                          <span className="font-mono text-[10px] text-[#777777]">
                            {data.clientDoc} · {data.clientPhone}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-3 pb-2 border-b border-[#E7E7E5]">
                        <span className="col-span-4 font-mono text-[9.5px] uppercase tracking-widest text-[#777777] font-bold">
                          ALIANZA EMISORA
                        </span>
                        <div className="col-span-8">
                          <strong className="text-[13px] font-bold text-[#111111] block leading-tight">
                            purrpurr.dev × Speedlight Culture
                          </strong>
                          <span className="font-mono text-[10px] text-[#777777]">
                            Camilo Andrés Toloza Petter · Lead Architect &amp;
                            Dirección General
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-3">
                        <span className="col-span-4 font-mono text-[9.5px] uppercase tracking-widest text-[#777777] font-bold">
                          ESTRUCTURA &amp; PLAZO
                        </span>
                        <div className="col-span-8">
                          <strong className="text-[13px] font-bold text-[#111111] block leading-tight">
                            3 Módulos Acumulativos (3 Etapas Semanales)
                          </strong>
                          <span className="font-mono text-[10px] text-[#777777]">
                            Entrega estimada: {data.deliveryTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-4 flex flex-col items-end justify-end">
                      <div className="flex items-end gap-3">
                        <VectorArrow
                          direction="ne"
                          className="w-9 h-9 mb-2"
                          color="#111111"
                        />
                        <span className="font-sans font-black text-[88px] leading-[0.82] tracking-[-0.04em] text-[#111111]">
                          01<span className="text-[#9B5CFF]">.</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <EditorialFooter
                    docCode={data.code}
                    sectionLabel="PORTADA & RESUMEN EJECUTIVO"
                    pageNumber={1}
                  />
                </div>
              </section>

              {/* =============================================================== */}
              {/* PÁGINA 2: CONTEXTO, OBJETIVOS & ARQUITECTURA DE SOLUCIÓN        */}
              {/* =============================================================== */}
              <section data-pdf-page="2" className={pageShellClass}>
                <div>
                  <EditorialHeaderStrip
                    docCode={data.code}
                    partLabel="PARTE 02 · ARQUITECTURA DE SOLUCIÓN"
                    direction="se"
                  />

                  <div className="mb-5">
                    <h2 className="font-sans font-black text-[30px] leading-[1.04] tracking-[-0.02em] text-[#111111]">
                      Contexto Operativo &amp; Ecosistema Digital
                    </h2>
                    <p className="font-sans text-[12.5px] leading-snug text-[#555555] mt-1.5 max-w-[660px]">
                      Diseñado para centralizar en una plataforma privada la
                      emisión de cotizaciones ejecutivas, el cobro digital
                      mediante Wompi, la dispersión automática a técnicos e
                      insumos y el control diario de citas en bahía.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-white border border-[#E7E7E5] rounded-2xl p-5 flex flex-col justify-between min-h-[168px]">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#111111] text-[#F7F7F5] font-mono text-[9px] font-bold uppercase tracking-widest">
                          MÓDULO 01 · COTIZADOR A4
                        </span>
                        <h3 className="font-sans font-bold text-[17px] leading-tight text-[#111111] mt-3">
                          Motor Web de Cotizaciones Ejecutivas
                        </h3>
                        <p className="font-sans text-[11px] leading-snug text-[#555555] mt-1.5">
                          Cálculo automático de costos de taller (mano de obra +
                          insumos + márgenes), visor PDF A4 en alta resolución y
                          enlace directo de envío por WhatsApp.
                        </p>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#777777] pt-3 border-t border-[#E7E7E5] mt-3 block">
                        ETAPA 1 · IDENTIDAD PROPIA DEL TALLER
                      </span>
                    </div>

                    <div className="bg-white border border-[#E7E7E5] rounded-2xl p-5 flex flex-col justify-between min-h-[168px]">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#111111] text-[#F7F7F5] font-mono text-[9px] font-bold uppercase tracking-widest">
                          MÓDULO 02 · PASARELA WOMPI
                        </span>
                        <h3 className="font-sans font-bold text-[17px] leading-tight text-[#111111] mt-3">
                          Recaudo Digital Integrado en 1 Clic
                        </h3>
                        <p className="font-sans text-[11px] leading-snug text-[#555555] mt-1.5">
                          Configuración de checkout oficial con botón PSE,
                          tarjetas de crédito, Nequi y Bancolombia conectado
                          directamente al QR dinámico de cada cotización.
                        </p>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#777777] pt-3 border-t border-[#E7E7E5] mt-3 block">
                        ETAPA 2 · WEBHOOKS EN TIEMPO REAL
                      </span>
                    </div>

                    <div className="bg-white border border-[#9B5CFF]/40 rounded-2xl p-5 flex flex-col justify-between min-h-[168px]">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#9B5CFF] text-white font-mono text-[9px] font-bold uppercase tracking-widest">
                          AUTOMATIZACIÓN FINANCIERA
                        </span>
                        <h3 className="font-sans font-bold text-[17px] leading-tight text-[#111111] mt-3">
                          Dispersión Automática a Operarios
                        </h3>
                        <p className="font-sans text-[11px] leading-snug text-[#555555] mt-1.5">
                          Módulo de dispersión de fondos para liquidar
                          automáticamente al día siguiente las cuentas de los
                          trabajadores e insumos por cada servicio terminado.
                        </p>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#9B5CFF] font-bold pt-3 border-t border-[#E7E7E5] mt-3 block">
                        ETAPA 2 · CERO FRICCIÓN EN NÓMINA OPERATIVA
                      </span>
                    </div>

                    <div className="bg-white border border-[#E7E7E5] rounded-2xl p-5 flex flex-col justify-between min-h-[168px]">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#111111] text-[#F7F7F5] font-mono text-[9px] font-bold uppercase tracking-widest">
                          MÓDULO 03 · PANEL CRM
                        </span>
                        <h3 className="font-sans font-bold text-[17px] leading-tight text-[#111111] mt-3">
                          Agenda de Turnos, Vehículos &amp; Evidencias
                        </h3>
                        <p className="font-sans text-[11px] leading-snug text-[#555555] mt-1.5">
                          Panel administrativo privado para programar citas en
                          taller, registrar fotografías de entrega por parte de
                          operarios y auditar mano de obra liquidada.
                        </p>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#777777] pt-3 border-t border-[#E7E7E5] mt-3 block">
                        ETAPA 3 · CONTROL PRIVADO INDEPENDIENTE
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5 flex flex-col justify-between">
                      <div className="rounded-2xl overflow-hidden border border-[#E7E7E5] bg-white h-[315px]">
                        <img
                          src="/cotizaciones/prop-jl-2026-094/mockup-software-cotizador-ui.png"
                          alt="Mockup de interfaz web en tablet y smartphone"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="mt-2.5 flex items-center justify-center">
                        <span className="px-4 py-1.5 rounded-full border border-[#111111] bg-white font-mono text-[9.5px] font-bold uppercase tracking-widest text-[#111111]">
                          INTERFAZ PROPIA · BOGOTÁ DETAIL CENTER
                        </span>
                      </div>
                    </div>

                    <div className="col-span-7 bg-white border border-[#E7E7E5] rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#9B5CFF] font-bold block mb-1">
                          CAPACIDAD DEL ECOSISTEMA
                        </span>
                        <h3 className="font-sans font-black text-[20px] leading-tight text-[#111111]">
                          Arquitectura Modular e Independiente
                        </h3>
                        <p className="font-sans text-[11px] leading-snug text-[#555555] mt-1.5">
                          Cada documento emitido combina diseño corporativo,
                          cálculo interno de rentabilidad y enlace directo de
                          recaudo, operando bajo dominio propio sin depender de
                          plataformas de terceros.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-[#F7F7F5] border border-[#E7E7E5] rounded-xl p-3.5">
                          <span className="font-sans font-black text-[26px] leading-none text-[#111111] block">
                            3 Etapas
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#777777] mt-1.5 block">
                            DESPLIEGUE SEMANAL PROGRESIVO
                          </span>
                        </div>

                        <div className="bg-[#F7F7F5] border border-[#E7E7E5] rounded-xl p-3.5">
                          <span className="font-sans font-black text-[26px] leading-none text-[#111111] block">
                            100%
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#777777] mt-1.5 block">
                            PROPIEDAD PRIVADA DE DATOS
                          </span>
                        </div>

                        <div className="bg-[#F7F7F5] border border-[#E7E7E5] rounded-xl p-3.5">
                          <span className="font-sans font-black text-[26px] leading-none text-[#111111] block">
                            50 / 50
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#777777] mt-1.5 block">
                            ESQUEMA DE PAGO INICIO Y ENTREGA
                          </span>
                        </div>

                        <div className="bg-[#111111] border border-[#111111] rounded-xl p-3.5 text-[#F7F7F5]">
                          <span className="font-sans font-black text-[26px] leading-none text-[#9B5CFF] block">
                            -28%
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#E7E7E5] mt-1.5 block">
                            BENEFICIO ALIANZA TALLER
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <EditorialFooter
                  docCode={data.code}
                  sectionLabel="CONTEXTO & ARQUITECTURA"
                  pageNumber={2}
                />
              </section>

              {/* =============================================================== */}
              {/* PÁGINA 3: ALCANCE TÉCNICO, ENTREGABLES & PLAN DE IMPLEMENTACIÓN */}
              {/* =============================================================== */}
              <section data-pdf-page="3" className={pageShellClass}>
                <div>
                  <EditorialHeaderStrip
                    docCode={data.code}
                    partLabel="PARTE 03 · ALCANCE & CRONOGRAMA"
                    direction="ne"
                  />

                  <div className="grid grid-cols-12 gap-4 items-end mb-4">
                    <div className="col-span-8">
                      <h2 className="font-sans font-black text-[32px] leading-[1.0] tracking-[-0.02em] text-[#111111] uppercase">
                        ALCANCE TÉCNICO &amp; PLAN DE IMPLEMENTACIÓN
                      </h2>
                      <p className="font-sans text-[12px] leading-snug text-[#555555] mt-2">
                        Ejecución estructurada en 3 etapas semanales (15 a 20
                        días hábiles en total), con entregables técnicos
                        verificables y tarifa preferencial de alianza en cada
                        módulo.
                      </p>
                    </div>
                    <div className="col-span-4 flex items-end justify-end gap-2">
                      <VectorArrow
                        direction="ne"
                        className="w-7 h-7 mb-1.5"
                        color="#111111"
                      />
                      <span className="font-sans font-black text-[68px] leading-[0.82] tracking-[-0.04em] text-[#111111]">
                        03<span className="text-[#9B5CFF]">.</span>
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-[#E7E7E5] bg-[#111111] h-[235px] w-full mb-5">
                    <img
                      src="/cotizaciones/prop-jl-2026-094/operacion-wompi-crm-taller.png"
                      alt="Especialista inspeccionando vehículo con tablet CRM en bahía"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="space-y-3">
                    {[
                      { item: item1, badge: 'ETAPA 01 · SEMANA 1', highlight: false },
                      { item: item2, badge: 'ETAPA 02 · SEMANA 2', highlight: true },
                      { item: item3, badge: 'ETAPA 03 · SEMANA 3', highlight: false },
                    ].map((stage, idx) => (
                      <div
                        key={idx}
                        className={`rounded-2xl border p-4 bg-white ${
                          stage.highlight
                            ? 'border-[#9B5CFF]/50'
                            : 'border-[#E7E7E5]'
                        }`}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-9">
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <span
                                className={`px-2.5 py-0.5 rounded-full font-mono text-[8.5px] font-bold uppercase tracking-widest ${
                                  stage.highlight
                                    ? 'bg-[#9B5CFF] text-white'
                                    : 'bg-[#111111] text-[#F7F7F5]'
                                }`}
                              >
                                {stage.badge}
                              </span>
                              <span className="font-mono text-[9px] text-[#777777] uppercase">
                                ENTREGABLE:{' '}
                                <strong className="text-[#111111]">
                                  {stage.item.deliverable}
                                </strong>{' '}
                                · {stage.item.provider}
                              </span>
                            </div>
                            <h3 className="font-sans font-bold text-[14.5px] text-[#111111] leading-tight">
                              {stage.item.description}
                            </h3>
                            <p className="font-sans text-[10.5px] text-[#555555] leading-snug mt-1">
                              {stage.item.specification}
                            </p>
                          </div>
                          <div className="col-span-3 text-right border-l border-[#E7E7E5] pl-3">
                            <span className="font-mono text-[9px] uppercase text-[#777777] block">
                              Tarifa Regular
                            </span>
                            <span className="font-mono text-[11px] text-[#777777] line-through block">
                              $ {stage.item.listPrice.toLocaleString('es-CO')}
                            </span>
                            <span className="font-mono text-[9px] uppercase text-[#9B5CFF] font-bold block mt-1">
                              Alianza Speedlight
                            </span>
                            <span className="font-mono font-black text-[17px] text-[#111111] leading-tight">
                              ${' '}
                              {stage.item.alliancePrice.toLocaleString('es-CO')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-3 gap-4 bg-white border border-[#E7E7E5] rounded-2xl p-3.5 text-[10px]">
                    <div>
                      <span className="font-mono uppercase text-[8.5px] font-bold text-[#777777] block">
                        PLAZO DE EJECUCIÓN
                      </span>
                      <strong className="text-[#111111] font-sans text-[11.5px]">
                        {data.deliveryTime}
                      </strong>
                    </div>
                    <div className="border-l border-[#E7E7E5] pl-3">
                      <span className="font-mono uppercase text-[8.5px] font-bold text-[#777777] block">
                        DESPLIEGUE &amp; DOMINIO
                      </span>
                      <strong className="text-[#111111] font-sans text-[11.5px]">
                        Servidor Cloud Independiente
                      </strong>
                    </div>
                    <div className="border-l border-[#E7E7E5] pl-3">
                      <span className="font-mono uppercase text-[8.5px] font-bold text-[#777777] block">
                        GARANTÍA POST-LANZAMIENTO
                      </span>
                      <strong className="text-[#111111] font-sans text-[11.5px]">
                        60 días soporte + 1 año estabilidad
                      </strong>
                    </div>
                  </div>

                  <EditorialFooter
                    docCode={data.code}
                    sectionLabel="ALCANCE & ENTREGABLES"
                    pageNumber={3}
                  />
                </div>
              </section>

              {/* =============================================================== */}
              {/* PÁGINA 4: INVERSIÓN, VISUALIZACIÓN COMPARATIVA & MODALIDADES    */}
              {/* =============================================================== */}
              <section data-pdf-page="4" className={pageShellClass}>
                <div>
                  <EditorialHeaderStrip
                    docCode={data.code}
                    partLabel="PARTE 04 · INVERSIÓN & MODALIDADES"
                    direction="se"
                  />

                  <div className="mb-4">
                    <h2 className="font-sans font-black text-[30px] leading-[1.04] tracking-[-0.02em] text-[#111111]">
                      Estructura Financiera &amp; Modalidades
                    </h2>
                    <div className="flex flex-wrap items-center gap-2.5 mt-2.5">
                      <span className="px-3.5 py-1 rounded-full bg-[#111111] text-[#F7F7F5] font-mono text-[9.5px] font-bold uppercase tracking-wider">
                        BENEFICIO ALIANZA PURRPURR.DEV × SPEEDLIGHT (-28% OFF)
                      </span>
                      <span className="px-3.5 py-1 rounded-full bg-white border border-[#111111] text-[#111111] font-mono text-[9.5px] font-bold uppercase tracking-wider">
                        VALOR NETO CERRADO · RÉGIMEN NO RESPONSABLE DE IVA
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E7E7E5] rounded-2xl p-5 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-[#777777]">
                        DESCOMPOSICIÓN DE VALOR POR MÓDULO VS. PAQUETE INTEGRAL
                        (COP)
                      </span>
                      <span className="font-mono text-[9.5px] font-bold text-[#9B5CFF]">
                        AHORRO TOTAL ALIANZA: -${' '}
                        {data.discount.amount.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-3 items-end h-[180px] pt-2">
                      <div className="h-[46%] bg-[#F7F7F5] border border-[#E7E7E5] rounded-xl p-3 flex flex-col justify-between">
                        <span className="font-mono font-black text-[16px] text-[#111111] leading-none">
                          $ 400k
                        </span>
                        <div>
                          <span className="font-mono text-[8.5px] text-[#777777] line-through block">
                            Lista $ 700k
                          </span>
                          <span className="font-sans text-[10px] font-bold text-[#111111] block">
                            Etapa 3 · CRM Taller
                          </span>
                        </div>
                      </div>

                      <div className="h-[62%] bg-[#F7F7F5] border border-[#E7E7E5] rounded-xl p-3 flex flex-col justify-between">
                        <span className="font-mono font-black text-[17px] text-[#111111] leading-none">
                          $ 600k
                        </span>
                        <div>
                          <span className="font-mono text-[8.5px] text-[#777777] line-through block">
                            Lista $ 800k
                          </span>
                          <span className="font-sans text-[10px] font-bold text-[#111111] block">
                            Etapa 2 · Wompi B2B
                          </span>
                        </div>
                      </div>

                      <div className="h-[78%] bg-[#F7F7F5] border border-[#E7E7E5] rounded-xl p-3 flex flex-col justify-between">
                        <span className="font-mono font-black text-[18px] text-[#111111] leading-none">
                          $ 800k
                        </span>
                        <div>
                          <span className="font-mono text-[8.5px] text-[#777777] line-through block">
                            Lista $ 1.000k
                          </span>
                          <span className="font-sans text-[10px] font-bold text-[#111111] block">
                            Etapa 1 · Cotizador A4
                          </span>
                        </div>
                      </div>

                      <div className="h-full bg-[#111111] text-[#F7F7F5] rounded-xl p-3.5 flex flex-col justify-between">
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-[#9B5CFF] text-white font-mono text-[8px] font-bold uppercase tracking-wider mb-1.5">
                            SISTEMA INTEGRAL
                          </span>
                          <span className="font-mono font-black text-[21px] text-white leading-none block">
                            $ 1.800.000
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-[#E7E7E5]/70 line-through block">
                            Lista $ 2.500.000 COP
                          </span>
                          <span className="font-sans text-[10.5px] font-bold text-[#9B5CFF] block mt-0.5">
                            Módulos 1 + 2 + 3 (-28%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E7E7E5] rounded-2xl p-4 mb-4">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-[#111111] font-mono text-[9.5px] uppercase tracking-wider text-[#111111]">
                          <th className="py-1.5 pr-3">Módulo / Componente</th>
                          <th className="py-1.5 px-3 text-center w-32">Etapa</th>
                          <th className="py-1.5 px-3 text-right w-28">Lista</th>
                          <th className="py-1.5 pl-3 text-right w-32">
                            Alianza (COP)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E7E7E5] text-[11px]">
                        {data.items.map((it, idx) => {
                          const isDimmedByOpt1 =
                            selectedPackageIndex === 0 && idx > 0;
                          return (
                            <tr
                              key={it.id}
                              className={`transition-opacity ${
                                isDimmedByOpt1 ? 'opacity-40' : ''
                              }`}
                            >
                              <td className="py-2 pr-3 font-sans font-bold text-[#111111]">
                                {it.description}
                              </td>
                              <td className="py-2 px-3 text-center font-mono text-[10px] text-[#555555] whitespace-nowrap">
                                {it.stageLabel}
                              </td>
                              <td className="py-2 px-3 text-right font-mono text-[10.5px] text-[#777777] line-through whitespace-nowrap">
                                $ {it.listPrice.toLocaleString('es-CO')}
                              </td>
                              <td className="py-2 pl-3 text-right font-mono font-black text-[12.5px] text-[#111111] whitespace-nowrap">
                                $ {it.alliancePrice.toLocaleString('es-CO')}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="border-t-2 border-[#111111] font-mono text-[10.5px]">
                        <tr className="border-b border-[#E7E7E5]">
                          <td
                            colSpan={3}
                            className="py-1.5 pr-3 text-right text-[#777777]"
                          >
                            Subtotal Tarifa Regular Lista (purrpurr.dev):
                          </td>
                          <td className="py-1.5 pl-3 text-right line-through text-[#777777] whitespace-nowrap">
                            $ {data.subtotal.toLocaleString('es-CO')} COP
                          </td>
                        </tr>
                        <tr className="border-b border-[#E7E7E5] text-[#1B5E20]">
                          <td
                            colSpan={3}
                            className="py-1.5 pr-3 text-right font-bold"
                          >
                            {data.discount.label}:
                          </td>
                          <td className="py-1.5 pl-3 text-right font-bold whitespace-nowrap">
                            -$ {data.discount.amount.toLocaleString('es-CO')}{' '}
                            COP
                          </td>
                        </tr>
                        <tr className="bg-[#F7F7F5]">
                          <td
                            colSpan={3}
                            className="py-2 pr-3 text-right font-bold uppercase tracking-wider text-[#111111]"
                          >
                            Inversión Total Sistema Integral (Módulos 1 + 2 +
                            3):
                          </td>
                          <td className="py-2 pl-3 text-right font-black text-[14.5px] text-[#111111] whitespace-nowrap">
                            $ {data.total.toLocaleString('es-CO')} COP
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-[#111111]">
                        Modalidades de Contratación Disponibles (
                        {data.alternativePackages.length})
                      </span>
                      <span className="font-mono text-[9px] text-[#777777]">
                        {selectedPackageIndex !== null
                          ? `Opción 0${selectedPackageIndex + 1} seleccionada (clic para deseleccionar)`
                          : 'Haz clic para preseleccionar una modalidad en checkout'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5">
                      {data.alternativePackages.map((pkg, pIdx) => {
                        const isSelected = selectedPackageIndex === pIdx;
                        const isFullSuite = pIdx === 1;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() =>
                              setSelectedPackageIndex(isSelected ? null : pIdx)
                            }
                            className={`text-left p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
                              isSelected
                                ? 'border-[#9B5CFF] ring-2 ring-[#9B5CFF]/30'
                                : 'border-[#E7E7E5] hover:border-[#111111]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[8.5px] font-bold uppercase tracking-widest mb-1.5 ${
                                    isSelected
                                      ? 'bg-[#9B5CFF] text-white'
                                      : isFullSuite
                                        ? 'bg-[#111111] text-white'
                                        : 'bg-[#E7E7E5] text-[#111111]'
                                  }`}
                                >
                                  {isFullSuite
                                    ? 'SUITE COMPLETA (1+2+3)'
                                    : 'INICIO RÁPIDO (MÓDULO 1)'}
                                </span>
                                <h3 className="font-sans font-bold text-[13px] text-[#111111] leading-tight">
                                  {pkg.name}
                                </h3>
                              </div>
                              <span
                                className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center mt-0.5 ${
                                  isSelected
                                    ? 'border-[#9B5CFF] bg-[#9B5CFF]'
                                    : 'border-[#777777] bg-white'
                                }`}
                              >
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                              </span>
                            </div>
                            <p className="font-sans text-[10px] text-[#555555] leading-snug mt-1.5">
                              {pkg.description}
                            </p>
                            <div className="mt-3 pt-2.5 border-t border-[#E7E7E5] flex items-end justify-between">
                              <div>
                                <span className="font-mono text-[10px] text-[#777777] line-through block">
                                  Lista $ {pkg.listPrice.toLocaleString('es-CO')}
                                </span>
                                <span className="font-mono font-black text-[19px] text-[#111111] leading-none">
                                  $ {pkg.total.toLocaleString('es-CO')} COP
                                </span>
                              </div>
                              <div className="text-right font-mono text-[9px] text-[#555555]">
                                <div>
                                  Anticipo 50%:{' '}
                                  <strong className="text-[#111111]">
                                    ${' '}
                                    {pkg.advancePaymentAmount.toLocaleString(
                                      'es-CO'
                                    )}
                                  </strong>
                                </div>
                                <div>
                                  Saldo 50%:{' '}
                                  <strong className="text-[#111111]">
                                    ${' '}
                                    {pkg.balancePaymentAmount.toLocaleString(
                                      'es-CO'
                                    )}
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <EditorialFooter
                  docCode={data.code}
                  sectionLabel="INVERSIÓN & MODALIDADES"
                  pageNumber={4}
                />
              </section>

              {/* =============================================================== */}
              {/* PÁGINA 5: CONDICIONES COMERCIALES, LEGALES & ACEPTACIÓN         */}
              {/* =============================================================== */}
              <section data-pdf-page="5" className={pageShellClass}>
                <div>
                  <EditorialHeaderStrip
                    docCode={data.code}
                    partLabel="PARTE 05 · CONDICIONES & ACEPTACIÓN"
                    direction="ne"
                  />

                  <div className="grid grid-cols-12 gap-4 items-end mb-4">
                    <div className="col-span-9">
                      <h2 className="font-sans font-black text-[30px] leading-[1.04] tracking-[-0.02em] text-[#111111]">
                        Condiciones Comerciales, Legales &amp; Formalización
                      </h2>
                      <p className="font-sans text-[12px] text-[#555555] mt-1">
                        Términos transparentes de ejecución, propiedad de
                        activos, garantía técnica y canales oficiales de
                        liquidación para inicio inmediato.
                      </p>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="font-sans font-black text-[60px] leading-[0.82] tracking-[-0.04em] text-[#111111]">
                        05<span className="text-[#9B5CFF]">.</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      {
                        title: '1. Vigencia de la Propuesta',
                        body: `Propuesta válida por ${data.validDays} días calendario contados desde la fecha de emisión (${data.date}).`,
                      },
                      {
                        title: '2. Forma de Pago (50% / 50%)',
                        body: '50% de anticipo al iniciar desarrollo según modalidad elegida ($ 400.000 u $ 900.000 COP) y 50% contra entrega funcional en producción. Valor neto cerrado (Régimen No Responsable de IVA).',
                      },
                      {
                        title: '3. Plazos y Responsabilidades',
                        body: 'Plazo estimado de 15 a 20 días hábiles en 3 etapas semanales. El cliente provee accesos de dominio, identidad de marca y credenciales de comercio Wompi.',
                      },
                      {
                        title: '4. Propiedad Intelectual y de Datos',
                        body: 'Julián Lotero / Bogotá Detail Center es 100% dueño de su base de datos, catálogo de servicios, registros de clientes y operarios, bajo dominio propio sin ataduras.',
                      },
                      {
                        title: '5. Garantía Técnica & Soporte',
                        body: 'Incluye 60 días de soporte técnico continuo y ajustes operativos post-lanzamiento sin costo adicional + 1 año de garantía de estabilidad del sistema.',
                      },
                      {
                        title: '6. Exclusiones y Pasarela Externa',
                        body: 'Comisiones bancarias y tasas de transacción procesada en línea aplican según tarifa vigente de Wompi Colombia. No incluye pauta publicitaria ni servicios externos no descritos.',
                      },
                    ].map((cond, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-[#E7E7E5] rounded-2xl p-3.5"
                      >
                        <strong className="font-sans font-bold text-[12px] text-[#111111] block mb-1">
                          {cond.title}
                        </strong>
                        <p className="font-sans text-[10px] leading-snug text-[#555555]">
                          {cond.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#111111] text-[#F7F7F5] rounded-2xl p-5 mb-4 grid grid-cols-12 gap-5 items-center">
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-24 h-24 shrink-0 bg-white rounded-xl p-1.5 flex items-center justify-center">
                        <QRCodeCanvas
                          value={checkoutUrl}
                          size={84}
                          bgColor="#FFFFFF"
                          fgColor="#111111"
                          level="M"
                        />
                      </div>
                      <div className="space-y-1.5 min-w-0">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#9B5CFF] font-bold block">
                          PASARELA OFICIAL WOMPI &amp; QR
                        </span>
                        <p className="font-sans text-[10px] text-[#E7E7E5] leading-snug">
                          Escanea el QR o accede al enlace directo para activar
                          tu modalidad en línea (PSE, Nequi, Bancolombia o
                          Tarjetas).
                        </p>
                        <a
                          href={checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-[#9B5CFF] hover:bg-[#8A48F5] text-white font-sans font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-colors w-full text-center"
                        >
                          <CreditCard className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {isMultiOptionUnselected
                              ? 'Elegir Modalidad en Checkout ↗'
                              : 'Pagar Anticipo 50% en Wompi ↗'}
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="col-span-6 border-l border-white/15 pl-5 space-y-2">
                      {isMultiOptionUnselected ? (
                        <>
                          <div className="flex items-baseline justify-between border-b border-white/15 pb-1.5">
                            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#E7E7E5]/80">
                              Rango de Inversión
                            </span>
                            <span className="font-mono font-black text-[18px] text-white whitespace-nowrap">
                              $ {minPkgTotal.toLocaleString('es-CO')} – ${' '}
                              {maxPkgTotal.toLocaleString('es-CO')} COP
                            </span>
                          </div>
                          <div className="font-mono text-[9.5px] text-[#E7E7E5]/90 space-y-0.5">
                            {data.alternativePackages.map((p) => (
                              <div key={p.id} className="flex justify-between">
                                <span>{p.shortLabel}:</span>
                                <strong className="text-white">
                                  $ {p.total.toLocaleString('es-CO')} COP
                                </strong>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-baseline justify-between border-b border-white/15 pb-1.5">
                            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#E7E7E5]/80">
                              Total Modalidad Elegida
                            </span>
                            <span className="font-mono font-black text-[20px] text-white whitespace-nowrap">
                              $ {activeTotal.toLocaleString('es-CO')} COP
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                            <div>
                              <span className="text-[#E7E7E5]/70 block text-[8.5px] uppercase">
                                Anticipo 50% (Inicio)
                              </span>
                              <strong className="text-[#9B5CFF] text-[13px]">
                                $ {anticipo50.toLocaleString('es-CO')} COP
                              </strong>
                            </div>
                            <div>
                              <span className="text-[#E7E7E5]/70 block text-[8.5px] uppercase">
                                Saldo 50% (Entrega)
                              </span>
                              <strong className="text-white text-[13px]">
                                $ {saldo50.toLocaleString('es-CO')} COP
                              </strong>
                            </div>
                          </div>
                          <div className="font-mono text-[8.5px] text-[#E7E7E5]/70">
                            {activeDiscountLabel}: -$
                            {activeDiscountAmount.toLocaleString('es-CO')} sobre
                            $ {activeSubtotal.toLocaleString('es-CO')}
                          </div>
                        </>
                      )}
                      <p className="font-mono text-[9px] text-[#E7E7E5]/75 pt-1 border-t border-white/15">
                        Bancolombia Ahorros # 204 795227 91 · Titular: Camilo
                        Andrés Toloza Petter (C.C. 1019089803)
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E7E7E5] rounded-2xl p-5">
                    <div className="grid grid-cols-2 gap-8 items-end">
                      <div>
                        <div className="w-56">
                          <div className="h-11 flex items-end">
                            <img
                              src="/signatures/camilo-toloza-signature-black.png"
                              alt="Firma Camilo Andrés Toloza Petter"
                              className="h-11 w-auto object-contain object-left-bottom -mb-1 select-none pointer-events-none"
                            />
                          </div>
                          <div className="border-b border-[#111111] mb-1.5 w-full" />
                        </div>
                        <div className="font-sans font-bold text-[12.5px] text-[#111111]">
                          Camilo Andrés Toloza Petter
                        </div>
                        <div className="font-mono text-[9.5px] text-[#555555]">
                          Lead Architect purrpurr.dev × Dirección Speedlight
                          Culture
                        </div>
                        <div className="font-mono text-[8.5px] text-[#777777] flex items-center gap-1 mt-0.5">
                          <ShieldCheck className="w-3 h-3 text-[#9B5CFF]" />
                          <span>C.C. 1019089803 · Bogotá D.C., Colombia</span>
                        </div>
                      </div>

                      <div>
                        <div className="h-11 border-b border-[#111111] mb-1.5 w-56" />
                        <div className="font-sans font-bold text-[12.5px] text-[#111111]">
                          {data.clientName}
                        </div>
                        <div className="font-mono text-[9.5px] text-[#555555]">
                          Aceptación de la Propuesta · {data.clientCompany}
                        </div>
                        <div className="font-mono text-[8.5px] text-[#777777] mt-0.5">
                          Fecha de aprobación: ____ / ____ / 2026
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-3 gap-4 text-[8.5px] font-mono text-[#777777] pt-2">
                    <div>
                      <strong className="text-[#111111] block uppercase">
                        purrpurr.dev
                      </strong>
                      <span>
                        Ingeniería de Software &amp; Arquitectura Cloud
                      </span>
                    </div>
                    <div>
                      <strong className="text-[#111111] block uppercase">
                        Speedlight Culture × Works
                      </strong>
                      <span>
                        Ecosistema Automotriz &amp; Talleres Homologados
                      </span>
                    </div>
                    <div>
                      <strong className="text-[#111111] block uppercase">
                        Canales Oficiales
                      </strong>
                      <span>
                        WhatsApp (+57) 316 053 5247 · speedlightculture.com
                      </span>
                    </div>
                  </div>

                  <EditorialFooter
                    docCode={data.code}
                    sectionLabel="CIERRE & ACEPTACIÓN"
                    pageNumber={5}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
