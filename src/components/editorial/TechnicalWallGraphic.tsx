import React from "react";

export const TechnicalWallGraphic: React.FC = () => {
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
        <filter id="wallShadowLight" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.06" />
        </filter>
        <pattern id="lightGridWall" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.7" />
        </pattern>
      </defs>

      <rect width="1200" height="675" fill="#FAF9F5" />
      <rect width="1200" height="675" fill="url(#lightGridWall)" />

      {/* Editorial NYT Header Bar */}
      <g>
        <text x="50" y="36" fill="#64748B" fontSize="11" fontFamily="monospace" letterSpacing="2">
          THE PURRPURR DISPATCH • INFOGRAFÍA DE SEGURIDAD OPERACIONAL
        </text>
        <text x="1150" y="36" fill="#D97706" fontSize="11" fontFamily="monospace" letterSpacing="2" textAnchor="end" fontWeight="700">
          FIG. 2.0 — EL MURO TÉCNICO Y LA AUDITORÍA DE PASARELA
        </text>
        <line x1="50" y1="46" x2="1150" y2="46" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
      </g>

      {/* Title & Premise */}
      <g transform="translate(50, 75)">
        <text x="0" y="0" fill="#0F172A" fontSize="22" fontWeight="900" letterSpacing="-0.5">
          La Brecha Transaccional: Del Píxel Ficticio al Dinero Real
        </text>
        <text x="0" y="24" fill="#64748B" fontSize="12">
          Comparación paso a paso entre una maqueta generada automáticamente frente al protocolo de misión crítica en Purrpurr.
        </text>
      </g>

      {/* ==================== RUTA 1: EL COLAPSO GENERATIVO (ROJO) ==================== */}
      <g transform="translate(50, 130)">
        <rect x="0" y="0" width="1100" height="215" rx="12" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.2" filter="url(#wallShadowLight)" />
        <rect x="0" y="0" width="8" height="215" rx="4" fill="#EF4444" />

        <g transform="translate(30, 28)">
          <rect x="0" y="-16" width="290" height="24" rx="4" fill="#FEE2E2" stroke="#F87171" strokeWidth="1" />
          <circle cx="14" cy="-4" r="4" fill="#EF4444" />
          <text x="26" y="1" fill="#991B1B" fontSize="10.5" fontFamily="monospace" fontWeight="800" letterSpacing="1">
            RUTA A: GENERADOR IA SIN INGENIERÍA (30s)
          </text>
          <text x="310" y="0" fill="#DC2626" fontSize="11" fontWeight="600">
            Vulnerabilidad crítica: ausencia total de backend con validación criptográfica
          </text>
        </g>

        {/* Step 1 */}
        <g transform="translate(30, 55)">
          <rect x="0" y="0" width="220" height="125" rx="8" fill="#FFFFFF" stroke="#FECACA" strokeWidth="1" filter="url(#wallShadowLight)" />
          <text x="16" y="24" fill="#0F172A" fontSize="12" fontWeight="800">1. Checkout Ficticio</text>
          <text x="16" y="44" fill="#64748B" fontSize="10.5">Formulario web creado por IA. Pide datos y redirige a un link estático sin validación.</text>
          <rect x="16" y="90" width="105" height="20" rx="3" fill="#FEE2E2" />
          <text x="24" y="104" fill="#B91C1C" fontSize="9" fontFamily="monospace" fontWeight="700">Sin Server Nonce</text>
        </g>

        <path d="M 260 118 L 295 118" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,3" />
        <polygon points="295,114 305,118 295,122" fill="#EF4444" />

        {/* Step 2 */}
        <g transform="translate(310, 55)">
          <rect x="0" y="0" width="240" height="125" rx="8" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="1.4" filter="url(#wallShadowLight)" />
          <text x="16" y="24" fill="#BE123C" fontSize="12" fontWeight="900">2. Muro: Firma Criptográfica</text>
          <text x="16" y="44" fill="#881337" fontSize="10.5">Wompi/Bold envían Webhook. La IA no configuró listener ni valida el hash SHA-256.</text>
          <rect x="16" y="90" width="205" height="20" rx="3" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="0.8" />
          <text x="24" y="104" fill="#9F1239" fontSize="9" fontFamily="monospace" fontWeight="800">FALLA: Firma no verificada ✗</text>
        </g>

        <path d="M 560 118 L 595 118" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,3" />
        <polygon points="595,114 605,118 595,122" fill="#EF4444" />

        {/* Step 3 */}
        <g transform="translate(610, 55)">
          <rect x="0" y="0" width="220" height="125" rx="8" fill="#FFFFFF" stroke="#FECACA" strokeWidth="1" filter="url(#wallShadowLight)" />
          <text x="16" y="24" fill="#0F172A" fontSize="12" fontWeight="800">3. Sin Bloqueo ACID</text>
          <text x="16" y="44" fill="#64748B" fontSize="10.5">El inventario se guarda en JSON o memoria. Dos clientes compran el mismo stock.</text>
          <rect x="16" y="90" width="130" height="20" rx="3" fill="#FEE2E2" />
          <text x="24" y="104" fill="#B91C1C" fontSize="9" fontFamily="monospace" fontWeight="700">Sobreventa masiva</text>
        </g>

        <path d="M 840 118 L 875 118" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,3" />
        <polygon points="875,114 885,118 875,122" fill="#EF4444" />

        {/* Step 4 */}
        <g transform="translate(890, 55)">
          <rect x="0" y="0" width="180" height="125" rx="8" fill="#FFF1F2" stroke="#E11D48" strokeWidth="1.2" filter="url(#wallShadowLight)" />
          <text x="14" y="24" fill="#BE123C" fontSize="12" fontWeight="900">4. Colapso Final</text>
          <text x="14" y="44" fill="#881337" fontSize="10">Sin XML DIAN.<br/>Sin soporte contable.<br/>Pagos duplicados.<br/>Pedidos perdidos.</text>
          <rect x="14" y="92" width="152" height="20" rx="3" fill="#BE123C" />
          <text x="20" y="106" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="800">PÉRDIDA MONETARIA</text>
        </g>
      </g>

      {/* ==================== RUTA 2: LA ARQUITECTURA PURRPURR (ESMERALDA) ==================== */}
      <g transform="translate(50, 375)">
        <rect x="0" y="0" width="1100" height="260" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.4" filter="url(#wallShadowLight)" />
        <rect x="0" y="0" width="8" height="260" rx="4" fill="#059669" />

        <g transform="translate(30, 28)">
          <rect x="0" y="-16" width="330" height="24" rx="4" fill="#DCFCE7" stroke="#10B981" strokeWidth="1" />
          <circle cx="14" cy="-4" r="4" fill="#059669" />
          <text x="26" y="1" fill="#065F46" fontSize="10.5" fontFamily="monospace" fontWeight="800" letterSpacing="1">
            RUTA B: SISTEMA OPERATIVO PURRPURR (INGENIERÍA)
          </text>
          <text x="350" y="0" fill="#047857" fontSize="11" fontWeight="700">
            Validación criptográfica server-side, base de datos relacional ACID y sincronización omnicanal
          </text>
        </g>

        {/* Step 1: Tokenization */}
        <g transform="translate(30, 55)">
          <rect x="0" y="0" width="220" height="170" rx="8" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1" filter="url(#wallShadowLight)" />
          <text x="16" y="24" fill="#0F172A" fontSize="12" fontWeight="800">1. Tokenización Segura</text>
          <text x="16" y="44" fill="#475569" fontSize="10.5">
            El cliente ingresa datos directo en Wompi o Bold. Los números de tarjeta jamás tocan el servidor (PCI-DSS Compliant).
          </text>
          <rect x="16" y="110" width="188" height="40" rx="4" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="0.8" />
          <text x="24" y="126" fill="#0369A1" fontSize="8.5" fontFamily="monospace" fontWeight="700">Idempotency-Key:</text>
          <text x="24" y="140" fill="#0284C7" fontSize="8.5" fontFamily="monospace">idemp_live_99a8f23</text>
        </g>

        <path d="M 260 140 L 295 140" stroke="#059669" strokeWidth="2.5" />
        <polygon points="295,136 305,140 295,144" fill="#059669" />

        {/* Step 2: Webhook HMAC */}
        <g transform="translate(310, 55)">
          <rect x="0" y="0" width="240" height="170" rx="8" fill="#FFFFFF" stroke="#6EE7B7" strokeWidth="1.4" filter="url(#wallShadowLight)" />
          <text x="16" y="24" fill="#065F46" fontSize="12" fontWeight="900">2. Validación Webhook</text>
          <text x="16" y="44" fill="#475569" fontSize="10.5">
            Servidor valida la firma con secreto privado de Bancolombia. Ningún pago simulado puede vulnerar el backend.
          </text>
          <rect x="16" y="110" width="208" height="40" rx="4" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
          <text x="24" y="126" fill="#047857" fontSize="8.5" fontFamily="monospace" fontWeight="800">HMAC-SHA256: VALIDADO ✓</text>
          <text x="24" y="140" fill="#059669" fontSize="8.5" fontFamily="monospace">checksum_match: TRUE</text>
        </g>

        <path d="M 560 140 L 595 140" stroke="#059669" strokeWidth="2.5" />
        <polygon points="595,136 605,140 595,144" fill="#059669" />

        {/* Step 3: ACID Row-Lock */}
        <g transform="translate(610, 55)">
          <rect x="0" y="0" width="220" height="170" rx="8" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="1" filter="url(#wallShadowLight)" />
          <text x="16" y="24" fill="#0F172A" fontSize="12" fontWeight="800">3. Bloqueo Transaccional</text>
          <text x="16" y="44" fill="#475569" fontSize="10.5">
            Base de datos relacional ejecuta SELECT FOR UPDATE. Stock descontado en milisegundos sin colisiones.
          </text>
          <rect x="16" y="110" width="188" height="40" rx="4" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="0.8" />
          <text x="24" y="126" fill="#4338CA" fontSize="8.5" fontFamily="monospace" fontWeight="700">PRISMA TRANSACTION: OK</text>
          <text x="24" y="140" fill="#4F46E5" fontSize="8.5" fontFamily="monospace">Stock: 12 → 11 (ACID Locked)</text>
        </g>

        <path d="M 840 140 L 875 140" stroke="#059669" strokeWidth="2.5" />
        <polygon points="875,136 885,140 875,144" fill="#059669" />

        {/* Step 4: DIAN & WhatsApp */}
        <g transform="translate(890, 55)">
          <rect x="0" y="0" width="180" height="170" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.4" filter="url(#wallShadowLight)" />
          <text x="14" y="24" fill="#065F46" fontSize="12" fontWeight="900">4. Automatización Total</text>
          <text x="14" y="44" fill="#047857" fontSize="10">
            • Emisión XML DIAN Res. 165<br />
            • Notificación WhatsApp<br />
            • Guía de despacho en bodega<br />
            • Depósito directo a cuenta
          </text>
          <rect x="14" y="118" width="152" height="28" rx="4" fill="#059669" />
          <text x="22" y="136" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="800">100% AUTOMATIZADO</text>
        </g>
      </g>
    </svg>
  );
};
