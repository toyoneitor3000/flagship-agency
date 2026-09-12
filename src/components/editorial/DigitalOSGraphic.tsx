import React from "react";

export const DigitalOSGraphic: React.FC = () => {
  return (
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
          <text x="75" y="77" fill="#0F766E" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">ZERO VENDOR LOCK-IN</text>
        </g>
      </g>
    </svg>
  );
};
