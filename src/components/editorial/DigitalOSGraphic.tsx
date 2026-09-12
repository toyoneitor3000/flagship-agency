"use client";

import React, { useState } from "react";
import { 
  Cpu, ShoppingCart, MessageSquare, Landmark, 
  Receipt, Database, Shield, Eye, Smartphone
} from "lucide-react";

export const DigitalOSGraphic: React.FC = () => {
  const [mobileMode, setMobileMode] = useState<"cards" | "diagram">("cards");

  return (
    <div className="w-full bg-[#FAF9F5] text-zinc-900 rounded-2xl overflow-hidden font-sans border border-zinc-200 shadow-2xs">
      {/* MOBILE VIEW SWITCHER (Visible only on screens < md) */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-zinc-100/90 border-b border-zinc-200 text-xs">
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
          Modo de visualización:
        </span>
        <div className="inline-flex rounded-lg bg-white p-1 border border-zinc-300 shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileMode("cards")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              mobileMode === "cards" 
                ? "bg-zinc-900 text-white shadow-xs" 
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Smartphone className="w-3 h-3" />
            Tarjetas
          </button>
          <button
            type="button"
            onClick={() => setMobileMode("diagram")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
              mobileMode === "diagram" 
                ? "bg-zinc-900 text-white shadow-xs" 
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Eye className="w-3 h-3" />
            Panorámico
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE NATIVE CARDS VIEW (High-legibility vertical stream for phones)   */}
      {/* ========================================================================= */}
      <div className={`${mobileMode === "cards" ? "block" : "hidden"} md:hidden p-4 sm:p-6 space-y-6`}>
        {/* Header Title */}
        <div className="space-y-1 border-b border-zinc-200 pb-3">
          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block">
            THE PURRPURR DISPATCH • ARQUITECTURA DE ECOSISTEMAS
          </span>
          <h3 className="text-lg font-black text-zinc-950 tracking-tight leading-tight">
            Topología del Sistema Operativo Digital Purrpurr
          </h3>
          <p className="text-xs text-zinc-600 font-serif leading-relaxed">
            Un ecosistema unificado donde cada componente opera sincronizado a milisegundos sin intermediarios ni plataformas de alquiler.
          </p>
        </div>

        {/* NÚCLEO CENTRAL (Dark Slate) */}
        <div className="rounded-xl bg-zinc-950 text-white p-4 border-2 border-indigo-500/50 shadow-md space-y-2 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-pulse"></span>
            <span className="text-[10px] font-mono text-[#00FF9C] font-bold uppercase tracking-widest">
              NÚCLEO CENTRAL DE ORQUESTACIÓN
            </span>
          </div>
          <h4 className="text-base font-black text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            Next.js Edge Runtime + Prisma ORM
          </h4>
          <p className="text-xs text-zinc-300 font-serif leading-relaxed">
            Cerebro transaccional con despliegue serverless global. Latencia de respuesta inferior a 50 milisegundos con cero cuellos de botella.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[9px]">
            <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">LibSQL / Postgres ACID</span>
            <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">Edge Middleware</span>
            <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 font-bold">&lt; 50ms Latencia</span>
          </div>
        </div>

        {/* 6 NODOS SATÉLITE EN GRID RESPONSIVO */}
        <div className="space-y-3 pt-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
            6 Nodos Transaccionales Integrados:
          </span>

          {/* Node 1 */}
          <div className="p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">01. EXPERIENCIA CLIENTE</span>
              <span className="text-[9px] font-mono font-bold bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200">
                LCP &lt; 0.8s
              </span>
            </div>
            <h5 className="text-xs font-black text-zinc-950 flex items-center gap-1.5">
              <ShoppingCart className="w-3.5 h-3.5 text-sky-600" />
              Catálogo &amp; Checkout Veloz
            </h5>
            <p className="text-xs text-zinc-600 font-serif leading-relaxed">
              Renderizado ultrarrápido al borde de la red. Carrito sin fricción ni recargas lentas, reduciendo drásticamente el abandono.
            </p>
          </div>

          {/* Node 2 */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">02. MENSAJERÍA DIRECTA</span>
              <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                WHATSAPP BOT
              </span>
            </div>
            <h5 className="text-xs font-black text-zinc-950 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp Commerce Hub
            </h5>
            <p className="text-xs text-zinc-600 font-serif leading-relaxed">
              Confirmación inmediata de órdenes, cotizaciones en caliente y rescate automatizado de compras inconclusas en el chat.
            </p>
          </div>

          {/* Node 3 */}
          <div className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">03. RIELES BANCARIOS</span>
              <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                0% COMISIÓN SHOPIFY
              </span>
            </div>
            <h5 className="text-xs font-black text-zinc-950 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-amber-600" />
              Wompi / Bold / PSE Directo
            </h5>
            <p className="text-xs text-zinc-600 font-serif leading-relaxed">
              Conexión directa a Bancolombia y redes financieras. El dinero ingresa a tu cuenta bancaria en 24 horas sin intermediarios extranjeros.
            </p>
          </div>

          {/* Node 4 */}
          <div className="p-3.5 rounded-xl bg-white border border-indigo-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase">04. CUMPLIMIENTO FISCAL</span>
              <span className="text-[9px] font-mono font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">
                DIAN SYNC
              </span>
            </div>
            <h5 className="text-xs font-black text-zinc-950 flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-indigo-600" />
              Facturación DIAN Resolución 165
            </h5>
            <p className="text-xs text-zinc-600 font-serif leading-relaxed">
              Generación de XML UBL 2.1 con código CUFE firmado al instante de la compra. Blindaje legal y contable 100% automatizado.
            </p>
          </div>

          {/* Node 5 */}
          <div className="p-3.5 rounded-xl bg-white border border-purple-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-purple-700 uppercase">05. GESTIÓN DE EXISTENCIAS</span>
              <span className="text-[9px] font-mono font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">
                ACID LOCKED
              </span>
            </div>
            <h5 className="text-xs font-black text-zinc-950 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-600" />
              Bloqueo de Inventario en Tiempo Real
            </h5>
            <p className="text-xs text-zinc-600 font-serif leading-relaxed">
              Transacciones atómicas en base de datos. Dos usuarios no pueden pagar el mismo stock simultáneamente; cero quiebres de inventario.
            </p>
          </div>

          {/* Node 6 */}
          <div className="p-3.5 rounded-xl bg-white border border-teal-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">06. SOBERANÍA TECNOLÓGICA</span>
              <span className="text-[9px] font-mono font-bold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">
                100% TUYO
              </span>
            </div>
            <h5 className="text-xs font-black text-zinc-950 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-600" />
              Código Fuente Propio en GitHub
            </h5>
            <p className="text-xs text-zinc-600 font-serif leading-relaxed">
              Eres dueño absoluto de tu plataforma. Sin tarifas mensuales forzadas ni riesgo de que te cancelen la cuenta como en plataformas SaaS.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PANORAMIC SCHEMATIC (Shown on desktop OR when mobileMode === "diagram") */}
      {/* ========================================================================= */}
      <div className={`${mobileMode === "diagram" ? "block overflow-x-auto pb-4" : "hidden md:block"}`}>
        {mobileMode === "diagram" && (
          <div className="md:hidden p-2 text-center text-[10px] font-mono text-zinc-500 bg-amber-50 border-b border-amber-200">
            👉 Desliza horizontalmente para explorar el esquema completo a escala
          </div>
        )}
        <div className={mobileMode === "diagram" ? "min-w-[850px]" : "w-full"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 675"
            width="100%"
            height="100%"
            style={{
              background: "#FAF9F5",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
            className="w-full h-auto object-contain block"
          >
            <defs>
              <radialGradient id="hubGlowLight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#FAF9F5" stopOpacity="0" />
              </radialGradient>
              <filter id="osShadowLight" x="-10%" y="-10%" width="125%" height="125%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.07" />
              </filter>
              <pattern id="gridOSLight" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.2" fill="#CBD5E1" />
              </pattern>
            </defs>

            <rect width="1200" height="675" fill="#FAF9F5" />
            <rect width="1200" height="675" fill="url(#gridOSLight)" />

            <circle cx="600" cy="360" r="380" fill="url(#hubGlowLight)" />

            {/* Editorial NYT Top Bar */}
            <g>
              <text x="50" y="36" fill="#64748B" fontSize="11" fontFamily="monospace" letterSpacing="2">
                THE PURRPURR DISPATCH • ARQUITECTURA DE ECOSISTEMAS
              </text>
              <text x="1150" y="36" fill="#059669" fontSize="11" fontFamily="monospace" letterSpacing="2" textAnchor="end" fontWeight="700">
                FIG. 3.0 — TOPOLOGÍA DEL SISTEMA OPERATIVO DIGITAL
              </text>
              <line x1="50" y1="46" x2="1150" y2="46" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
            </g>

            {/* Header Title */}
            <g transform="translate(50, 75)">
              <text x="0" y="0" fill="#0F172A" fontSize="22" fontWeight="900" letterSpacing="-0.5">
                Más Allá de la Página Web: El Ecosistema Transaccional Unificado
              </text>
              <text x="0" y="24" fill="#64748B" fontSize="12">
                Infraestructura donde cada componente (ventas, mensajería, inventario, facturación DIAN y pasarela) opera sincronizado sin intermediarios.
              </text>
            </g>

            {/* Conduits */}
            <g strokeWidth="2" opacity="0.85">
              <path d="M 600 360 L 250 180" stroke="#0284C7" strokeDasharray="5,4" />
              <path d="M 600 360 L 950 180" stroke="#059669" strokeDasharray="5,4" />
              <path d="M 600 360 L 190 360" stroke="#D97706" strokeDasharray="5,4" />
              <path d="M 600 360 L 1010 360" stroke="#4F46E5" strokeDasharray="5,4" />
              <path d="M 600 360 L 250 540" stroke="#9333EA" strokeDasharray="5,4" />
              <path d="M 600 360 L 950 540" stroke="#0D9488" strokeDasharray="5,4" />
            </g>

            {/* Central Hub */}
            <g transform="translate(450, 255)">
              <circle cx="150" cy="105" r="115" fill="none" stroke="#6366F1" strokeWidth="1.4" strokeOpacity="0.5" strokeDasharray="6,4" />
              <circle cx="150" cy="105" r="100" fill="none" stroke="#059669" strokeWidth="1.2" strokeOpacity="0.4" />

              <rect x="25" y="20" width="250" height="170" rx="14" fill="#0F172A" stroke="#4338CA" strokeWidth="2" filter="url(#osShadowLight)" />

              <g transform="translate(45, 48)">
                <circle cx="10" cy="8" r="4.5" fill="#00FF9C" />
                <text x="24" y="12" fill="#00FF9C" fontSize="10" fontFamily="monospace" fontWeight="800" letterSpacing="1.5">
                  NÚCLEO PURRPURR
                </text>
                <text x="0" y="38" fill="#FFFFFF" fontSize="17" fontWeight="900">
                  Next.js Edge Core
                </text>
                <text x="0" y="56" fill="#C7D2FE" fontSize="11.5">
                  Motor de Orquestación &amp; API
                </text>
                <line x1="0" y1="68" x2="210" y2="68" stroke="#3730A3" strokeWidth="1" />
                <text x="0" y="86" fill="#94A3B8" fontSize="9.5" fontFamily="monospace">
                  • LibSQL / Prisma ORM
                </text>
                <text x="0" y="102" fill="#94A3B8" fontSize="9.5" fontFamily="monospace">
                  • Serverless Edge Nodes
                </text>
                <text x="0" y="118" fill="#34D399" fontSize="9.5" fontFamily="monospace" fontWeight="700">
                  • Latencia global &lt; 50ms
                </text>
              </g>
            </g>

            {/* Node 1: Frontend */}
            <g transform="translate(100, 120)">
              <rect x="0" y="0" width="250" height="120" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.4" filter="url(#osShadowLight)" />
              <rect x="0" y="0" width="5" height="120" rx="2" fill="#0284C7" />
              <g transform="translate(18, 24)">
                <text x="0" y="0" fill="#0369A1" fontSize="9" fontFamily="monospace" fontWeight="800">01. EXPERIENCIA CLIENTE</text>
                <text x="0" y="20" fill="#0F172A" fontSize="13" fontWeight="900">Catálogo &amp; Checkout Veloz</text>
                <text x="0" y="38" fill="#475569" fontSize="10.5">SSR/SSG Edge. LCP &lt; 0.8s. Carrito sin fricción ni redirecciones lentas.</text>
                <rect x="0" y="65" width="135" height="18" rx="3" fill="#E0F2FE" />
                <text x="67" y="77" fill="#0369A1" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">NEXT/IMAGE + CACHE</text>
              </g>
            </g>

            {/* Node 2: WhatsApp */}
            <g transform="translate(850, 120)">
              <rect x="0" y="0" width="250" height="120" rx="10" fill="#FFFFFF" stroke="#059669" strokeWidth="1.4" filter="url(#osShadowLight)" />
              <rect x="0" y="0" width="5" height="120" rx="2" fill="#059669" />
              <g transform="translate(18, 24)">
                <text x="0" y="0" fill="#065F46" fontSize="9" fontFamily="monospace" fontWeight="800">02. MENSAJERÍA OMNICANAL</text>
                <text x="0" y="20" fill="#0F172A" fontSize="13" fontWeight="900">WhatsApp Commerce Hub</text>
                <text x="0" y="38" fill="#475569" fontSize="10.5">Confirmación de compra al instante y carritos abandonados recuperados.</text>
                <rect x="0" y="65" width="145" height="18" rx="3" fill="#DCFCE7" />
                <text x="72" y="77" fill="#047857" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">BAILEY / CLOUD BOT</text>
              </g>
            </g>

            {/* Node 3: Banking */}
            <g transform="translate(40, 300)">
              <rect x="0" y="0" width="250" height="120" rx="10" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.4" filter="url(#osShadowLight)" />
              <rect x="0" y="0" width="5" height="120" rx="2" fill="#D97706" />
              <g transform="translate(18, 24)">
                <text x="0" y="0" fill="#92400E" fontSize="9" fontFamily="monospace" fontWeight="800">03. LIQUIDACIÓN BANCARIA</text>
                <text x="0" y="20" fill="#0F172A" fontSize="13" fontWeight="900">Wompi / Bold / PSE Directo</text>
                <text x="0" y="38" fill="#475569" fontSize="10.5">El dinero entra a la cuenta del negocio en 24h. 0% comisión a Shopify.</text>
                <rect x="0" y="65" width="145" height="18" rx="3" fill="#FEF3C7" />
                <text x="72" y="77" fill="#B45309" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">BANCOLOMBIA CLEARING</text>
              </g>
            </g>

            {/* Node 4: DIAN */}
            <g transform="translate(910, 300)">
              <rect x="0" y="0" width="250" height="120" rx="10" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="1.4" filter="url(#osShadowLight)" />
              <rect x="0" y="0" width="5" height="120" rx="2" fill="#4F46E5" />
              <g transform="translate(18, 24)">
                <text x="0" y="0" fill="#3730A3" fontSize="9" fontFamily="monospace" fontWeight="800">04. CUMPLIMIENTO FISCAL</text>
                <text x="0" y="20" fill="#0F172A" fontSize="13" fontWeight="900">Facturación DIAN Res. 165</text>
                <text x="0" y="38" fill="#475569" fontSize="10.5">Generación de XML UBL 2.1 con código CUFE automático. Cero multas.</text>
                <rect x="0" y="65" width="135" height="18" rx="3" fill="#EEF2FF" />
                <text x="67" y="77" fill="#4338CA" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">DIAN SYNC OFICIAL</text>
              </g>
            </g>

            {/* Node 5: Stock */}
            <g transform="translate(100, 480)">
              <rect x="0" y="0" width="250" height="120" rx="10" fill="#FFFFFF" stroke="#9333EA" strokeWidth="1.4" filter="url(#osShadowLight)" />
              <rect x="0" y="0" width="5" height="120" rx="2" fill="#9333EA" />
              <g transform="translate(18, 24)">
                <text x="0" y="0" fill="#6B21A8" fontSize="9" fontFamily="monospace" fontWeight="800">05. CONTROL DE EXISTENCIAS</text>
                <text x="0" y="20" fill="#0F172A" fontSize="13" fontWeight="900">Bloqueo de Inventario ACID</text>
                <text x="0" y="38" fill="#475569" fontSize="10.5">Reserva de stock en tiempo real. Imposibilita sobreventa o cobros duplicados.</text>
                <rect x="0" y="65" width="140" height="18" rx="3" fill="#F3E8FF" />
                <text x="70" y="77" fill="#7E22CE" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">CONCURRENCIA CERO ERROR</text>
              </g>
            </g>

            {/* Node 6: Ownership */}
            <g transform="translate(850, 480)">
              <rect x="0" y="0" width="250" height="120" rx="10" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.4" filter="url(#osShadowLight)" />
              <rect x="0" y="0" width="5" height="120" rx="2" fill="#0D9488" />
              <g transform="translate(18, 24)">
                <text x="0" y="0" fill="#115E59" fontSize="9" fontFamily="monospace" fontWeight="800">06. SOBERANÍA TECNOLÓGICA</text>
                <text x="0" y="20" fill="#0F172A" fontSize="13" fontWeight="900">100% Propiedad en GitHub</text>
                <text x="0" y="38" fill="#475569" fontSize="10.5">El cliente es dueño de todo el código. Cero alquiler de tienda mensual.</text>
                <rect x="0" y="65" width="150" height="18" rx="3" fill="#CCFBF1" />
                <text x="75" y="77" fill="#0F766E" font-size="8" font-family="monospace" font-weight="700" text-anchor="middle">ZERO VENDOR LOCK-IN</text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
