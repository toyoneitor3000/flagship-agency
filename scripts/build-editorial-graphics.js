const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(process.cwd(), 'public/images/editorial');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const graphics = [
  // =========================================================================
  // 1. FIG 2.1: WEBHOOK CRYPTOGRAPHY
  // =========================================================================
  {
    name: 'webhook_cryptography',
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1376 768" width="1376" height="768" style="background:#FAF9F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <defs>
        <pattern id="gridW" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#E2E8F0" stroke-width="0.7"/>
        </pattern>
        <filter id="shW" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.06"/>
        </filter>
      </defs>

      <rect width="1376" height="768" fill="#FAF9F5"/>
      <rect width="1376" height="768" fill="url(#gridW)"/>

      <!-- Header -->
      <g transform="translate(60, 45)">
        <text x="0" y="0" fill="#64748B" font-size="12" font-family="monospace" letter-spacing="2">THE PURRPURR DISPATCH • AUDITORÍA DE SEGURIDAD FINANCIERA</text>
        <text x="1256" y="0" fill="#4F46E5" font-size="12" font-family="monospace" letter-spacing="2" text-anchor="end" font-weight="700">FIG. 2.1 — ANATOMÍA DE UN WEBHOOK CRIPTOGRÁFICO</text>
        <line x1="0" y1="12" x2="1256" y2="12" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4"/>
      </g>

      <!-- Title -->
      <g transform="translate(60, 95)">
        <text x="0" y="0" fill="#0F172A" font-size="24" font-weight="900" letter-spacing="-0.5">El Apretón de Manos Criptográfico: Wompi Bancolombia vs. Next.js Edge</text>
        <text x="0" y="24" fill="#64748B" font-size="13">Cómo viaja un pago real desde la pasarela financiera y por qué requiere una firma digital inviolable en el servidor.</text>
      </g>

      <!-- Panel 1: Incoming Webhook -->
      <g transform="translate(60, 155)">
        <rect width="380" height="420" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" filter="url(#shW)"/>
        <rect width="380" height="42" rx="14" fill="#F8FAFC"/>
        <rect y="38" width="380" height="4" fill="#F8FAFC"/>
        <line x1="0" y1="42" x2="380" y2="42" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="22" cy="21" r="5" fill="#EF4444"/>
        <circle cx="38" cy="21" r="5" fill="#F59E0B"/>
        <circle cx="54" cy="21" r="5" fill="#10B981"/>
        <text x="75" y="26" fill="#475569" font-size="11" font-family="monospace" font-weight="700">POST /api/webhooks/wompi</text>

        <g transform="translate(20, 65)">
          <text x="0" y="0" fill="#0369A1" font-size="10" font-family="monospace" font-weight="800">1. PAYLOAD ENTRANTE (BANCOLOMBIA)</text>
          <rect y="12" width="340" height="320" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
          
          <g transform="translate(14, 32)" font-family="monospace" font-size="10.5" fill="#1E293B">
            <text x="0" y="0"><tspan fill="#64748B">"event": </tspan><tspan fill="#059669">"transaction.updated"</tspan>,</text>
            <text x="0" y="20"><tspan fill="#64748B">"data": {</tspan></text>
            <text x="14" y="40"><tspan fill="#64748B">"id": </tspan><tspan fill="#D97706">"tran_99812_live"</tspan>,</text>
            <text x="14" y="60"><tspan fill="#64748B">"amount_in_cents": </tspan><tspan fill="#4F46E5">18500000</tspan>,</text>
            <text x="14" y="80"><tspan fill="#64748B">"currency": </tspan><tspan fill="#059669">"COP"</tspan>,</text>
            <text x="14" y="100"><tspan fill="#64748B">"status": </tspan><tspan fill="#059669">"APPROVED"</tspan>,</text>
            <text x="14" y="120"><tspan fill="#64748B">"customer_email": </tspan><tspan fill="#0284C7">"cliente@empresa.co"</tspan></text>
            <text x="0" y="140"><tspan fill="#64748B">},</tspan></text>
            <text x="0" y="165"><tspan fill="#64748B">"signature": {</tspan></text>
            <text x="14" y="185"><tspan fill="#DC2626">"checksum": </tspan><tspan fill="#991B1B" font-weight="700">"a79f...8b1e"</tspan>,</text>
            <text x="14" y="205"><tspan fill="#64748B">"timestamp": </tspan><tspan fill="#475569">1789254000</tspan></text>
            <text x="0" y="225"><tspan fill="#64748B">}</tspan></text>
          </g>

          <rect y="295" width="340" height="25" rx="4" fill="#E0F2FE"/>
          <text x="170" y="311" fill="#0369A1" font-size="9" font-family="monospace" font-weight="700" text-anchor="middle">ENVIADO DESDE IP OFICIAL WOMPI</text>
        </g>
      </g>

      <!-- Connecting Arrow 1 -->
      <g transform="translate(450, 360)">
        <path d="M 0 0 L 75 0" stroke="#4F46E5" stroke-width="3" stroke-dasharray="6,4"/>
        <polygon points="75,-5 85,0 75,5" fill="#4F46E5"/>
      </g>

      <!-- Panel 2: Cryptographic Chamber -->
      <g transform="translate(545, 155)">
        <rect width="400" height="420" rx="14" fill="#FFFFFF" stroke="#4F46E5" stroke-width="1.8" filter="url(#shW)"/>
        <rect width="400" height="42" rx="14" fill="#EEF2FF"/>
        <rect y="38" width="400" height="4" fill="#EEF2FF"/>
        <line x1="0" y1="42" x2="400" y2="42" stroke="#C7D2FE" stroke-width="1"/>
        <text x="20" y="26" fill="#3730A3" font-size="11" font-family="monospace" font-weight="800">2. CÁMARA DE VERIFICACIÓN HMAC-SHA256</text>

        <g transform="translate(20, 65)">
          <text x="0" y="0" fill="#1E293B" font-size="12" font-weight="800">Cómputo Local en Memoria Segura</text>
          <text x="0" y="20" fill="#64748B" font-size="11">El servidor concatena los valores con el secreto bancario privado:</text>

          <rect y="32" width="360" height="60" rx="6" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
          <text x="12" y="55" fill="#0F172A" font-size="10" font-family="monospace" font-weight="700">RAW_STRING =</text>
          <text x="12" y="74" fill="#4338CA" font-size="9.5" font-family="monospace">id + status + amount + WOMPI_SECRET</text>

          <g transform="translate(180, 125)">
            <circle cx="0" cy="0" r="30" fill="#4F46E5"/>
            <path d="M -8 -2 L -8 -7 C -8 -11.4 -4.4 -15 0 -15 C 4.4 -15 8 -11.4 8 -7 L 8 -2 L 10 -2 C 11.1 -2 12 -1.1 12 0 L 12 12 C 12 13.1 11.1 14 10 14 L -10 14 C -11.1 14 -12 13.1 -12 12 L -12 0 C -12 -1.1 -11.1 -2 -10 -2 Z M -5 -2 L 5 -2 L 5 -7 C 5 -9.8 2.8 -12 0 -12 C -2.8 -12 -5 -9.8 -5 -7 Z" fill="#FFFFFF"/>
            <circle cx="0" cy="5" r="2" fill="#4F46E5"/>
          </g>

          <rect y="175" width="360" height="65" rx="6" fill="#ECFDF5" stroke="#6EE7B7" stroke-width="1"/>
          <text x="12" y="196" fill="#065F46" font-size="10" font-family="monospace" font-weight="800">HASH GENERADO LOCALMENTE:</text>
          <text x="12" y="218" fill="#059669" font-size="10" font-family="monospace" font-weight="800">a79f8b1e4c0293d8e920...8b1e</text>
          <text x="348" y="218" fill="#059669" font-size="14" font-weight="900" text-anchor="end">OK</text>

          <rect y="260" width="360" height="65" rx="8" fill="#FEF3C7" stroke="#FCD34D" stroke-width="1"/>
          <text x="12" y="282" fill="#92400E" font-size="10" font-weight="800">COMPARACIÓN CONSTANT-TIME:</text>
          <text x="12" y="302" fill="#B45309" font-size="10.5" font-family="monospace">crypto.timingSafeEqual(localHash, headerHash)</text>
          <text x="348" y="302" fill="#B45309" font-size="11" font-family="monospace" font-weight="900" text-anchor="end">TRUE</text>
        </g>
      </g>

      <!-- Connecting Arrow 2 -->
      <g transform="translate(955, 360)">
        <path d="M 0 0 L 75 0" stroke="#059669" stroke-width="3" stroke-dasharray="6,4"/>
        <polygon points="75,-5 85,0 75,5" fill="#059669"/>
      </g>

      <!-- Panel 3: Autonomous Actions -->
      <g transform="translate(1040, 155)">
        <rect width="276" height="420" rx="14" fill="#FFFFFF" stroke="#059669" stroke-width="1.8" filter="url(#shW)"/>
        <rect width="276" height="42" rx="14" fill="#DCFCE7"/>
        <rect y="38" width="276" height="4" fill="#DCFCE7"/>
        <line x1="0" y1="42" x2="276" y2="42" stroke="#86EFAC" stroke-width="1"/>
        <text x="16" y="26" fill="#065F46" font-size="11" font-family="monospace" font-weight="800">3. ACCIONES BLINDADAS</text>

        <g transform="translate(16, 65)">
          <g>
            <g transform="translate(0, 0)">
              <rect width="244" height="65" rx="6" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1"/>
              <text x="12" y="22" fill="#065F46" font-size="11" font-weight="800">PostgreSQL ACID</text>
              <text x="12" y="42" fill="#475569" font-size="10">Estado: PAID_CONFIRMED.</text>
              <text x="12" y="56" fill="#059669" font-size="9" font-family="monospace">Stock reservado con bloqueo.</text>
            </g>

            <g transform="translate(0, 78)">
              <rect width="244" height="65" rx="6" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1"/>
              <text x="12" y="22" fill="#065F46" font-size="11" font-weight="800">DIAN Res. 165</text>
              <text x="12" y="42" fill="#475569" font-size="10">Emisión automática XML UBL 2.1</text>
              <text x="12" y="56" fill="#059669" font-size="9" font-family="monospace">CUFE generado al instante.</text>
            </g>

            <g transform="translate(0, 156)">
              <rect width="244" height="65" rx="6" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1"/>
              <text x="12" y="22" fill="#065F46" font-size="11" font-weight="800">WhatsApp Commerce</text>
              <text x="12" y="42" fill="#475569" font-size="10">Notificación inmediata al cliente.</text>
              <text x="12" y="56" fill="#059669" font-size="9" font-family="monospace">Guía y resumen de factura.</text>
            </g>

            <g transform="translate(0, 234)">
              <rect width="244" height="65" rx="6" fill="#059669"/>
              <text x="12" y="25" fill="#FFFFFF" font-size="11" font-weight="900">HTTP 200 OK RETORNADO</text>
              <text x="12" y="45" fill="#DCFCE7" font-size="10">Tiempo total de ejecución:</text>
              <text x="12" y="58" fill="#FFFFFF" font-size="11" font-family="monospace" font-weight="900">42 milisegundos</text>
            </g>
          </g>
        </g>
      </g>

      <!-- Bottom Comparative Banner -->
      <g transform="translate(60, 605)">
        <rect width="1256" height="110" rx="12" fill="#FEF2F2" stroke="#F87171" stroke-width="1.2"/>
        <g transform="translate(25, 25)">
          <text x="0" y="0" fill="#991B1B" font-size="12" font-family="monospace" font-weight="800">AVISO: LA VULNERABILIDAD FATAL DE LAS MAQUETAS GENERADAS POR IA (SIN INGENIERÍA):</text>
          <text x="0" y="24" fill="#7F1D1D" font-size="12" font-family="Georgia, serif">
            Las herramientas de moda (Lovable, Bolt, v0, maquetas estáticas) no crean este servidor ni conocen el secreto de Bancolombia. Si montas su código directamente, cualquiera puede disparar una petición POST falsa fingiendo ser Wompi con <tspan font-family="monospace" font-weight="bold">status: "APPROVED"</tspan>. Tu base de datos marcará el pedido como pagado y despacharás productos reales a costo cero. La ingeniería no es una opción; es el blindaje de tu patrimonio.
          </text>
        </g>
      </g>
    </svg>
    `
  },

  // =========================================================================
  // 2. FIG 2.2: DIAN COMPLIANCE UBL
  // =========================================================================
  {
    name: 'dian_compliance_ubl',
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1376 768" width="1376" height="768" style="background:#FAF9F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <defs>
        <pattern id="gridD" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="1.2" fill="#CBD5E1"/>
        </pattern>
        <filter id="shD" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.06"/>
        </filter>
      </defs>

      <rect width="1376" height="768" fill="#FAF9F5"/>
      <rect width="1376" height="768" fill="url(#gridD)"/>

      <!-- Header -->
      <g transform="translate(60, 45)">
        <text x="0" y="0" fill="#64748B" font-size="12" font-family="monospace" letter-spacing="2">THE PURRPURR DISPATCH • CUMPLIMIENTO TRIBUTARIO COLOMBIANO</text>
        <text x="1256" y="0" fill="#0D9488" font-size="12" font-family="monospace" letter-spacing="2" text-anchor="end" font-weight="700">FIG. 2.2 — CERTIFICACIÓN FISCAL DIAN RES. 165</text>
        <line x1="0" y1="12" x2="1256" y2="12" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4"/>
      </g>

      <!-- Title -->
      <g transform="translate(60, 95)">
        <text x="0" y="0" fill="#0F172A" font-size="24" font-weight="900" letter-spacing="-0.5">El Laberinto Legal: De una Venta en Línea a la Facturación Electrónica DIAN</text>
        <text x="0" y="24" fill="#64748B" font-size="13">Estructura técnica de emisión del estándar XML UBL 2.1 con código CUFE firmado, validación previa y almacenamiento normativo.</text>
      </g>

      <!-- 4 Stages Columns -->
      <!-- Step 1 -->
      <g transform="translate(60, 160)">
        <rect width="290" height="420" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" filter="url(#shD)"/>
        <rect width="290" height="45" rx="14" fill="#F8FAFC"/>
        <rect y="40" width="290" height="5" fill="#F8FAFC"/>
        <text x="20" y="28" fill="#0F172A" font-size="13" font-weight="900">1. Captura Fiscal</text>
        <g transform="translate(20, 65)">
          <text x="0" y="10" fill="#0D9488" font-size="10" font-family="monospace" font-weight="800">CHECKOUT PURRPURR</text>
          <text x="0" y="32" fill="#475569" font-size="11.5" font-family="Georgia, serif">El cliente suministra sus datos comerciales validados en vivo:</text>
          
          <rect y="48" width="250" height="230" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
          <g transform="translate(12, 70)" font-family="monospace" font-size="10" fill="#334155">
            <text x="0" y="0">• Cédula / NIT con Dígito</text>
            <text x="0" y="20">• Razón Social Oficial</text>
            <text x="0" y="40">• Responsabilidad IVA (05/48)</text>
            <text x="0" y="60">• Dirección y Código Postal</text>
            <text x="0" y="80">• Correo de Recepción DIAN</text>
            <text x="0" y="100">• Ciudad y Depto (DANE)</text>
          </g>

          <rect y="295" width="250" height="40" rx="6" fill="#CCFBF1"/>
          <text x="125" y="314" fill="#0F766E" font-size="9.5" font-family="monospace" font-weight="700" text-anchor="middle">VALIDACIÓN FORMATO NIT</text>
          <text x="125" y="328" fill="#115E59" font-size="9" font-family="monospace" text-anchor="middle">RUT / Cédula Verificada</text>
        </g>
      </g>

      <!-- Step 2 -->
      <g transform="translate(380, 160)">
        <rect width="290" height="420" rx="14" fill="#FFFFFF" stroke="#0D9488" stroke-width="1.6" filter="url(#shD)"/>
        <rect width="290" height="45" rx="14" fill="#F0FDFA"/>
        <rect y="40" width="290" height="5" fill="#F0FDFA"/>
        <text x="20" y="28" fill="#0F766E" font-size="13" font-weight="900">2. XML UBL 2.1</text>
        <g transform="translate(20, 65)">
          <text x="0" y="10" fill="#0D9488" font-size="10" font-family="monospace" font-weight="800">ESTÁNDAR INTERNACIONAL</text>
          <text x="0" y="32" fill="#475569" font-size="11.5" font-family="Georgia, serif">Construcción del documento electrónico canónico en milisegundos:</text>
          
          <rect y="48" width="250" height="230" rx="6" fill="#F0FDFA" stroke="#99F6E4" stroke-width="1"/>
          <g transform="translate(12, 70)" font-family="monospace" font-size="9.5" fill="#134E4A">
            <text x="0" y="0">&lt;Invoice xmlns="..."&gt;</text>
            <text x="10" y="18">&lt;CustomizationID&gt;10&lt;/&gt;</text>
            <text x="10" y="36">&lt;ProfileExecutionID&gt;1&lt;/&gt;</text>
            <text x="10" y="54">&lt;TaxTotal&gt;</text>
            <text x="20" y="72">&lt;TaxAmount currency="COP"&gt;</text>
            <text x="30" y="90">29.537,81 (IVA 19%)</text>
            <text x="20" y="108">&lt;/TaxAmount&gt;</text>
            <text x="10" y="126">&lt;/TaxTotal&gt;</text>
            <text x="0" y="144">&lt;/Invoice&gt;</text>
          </g>

          <rect y="295" width="250" height="40" rx="6" fill="#0F766E"/>
          <text x="125" y="318" fill="#FFFFFF" font-size="10" font-family="monospace" font-weight="800" text-anchor="middle">XML CANÓNICO SELLADO</text>
        </g>
      </g>

      <!-- Step 3 -->
      <g transform="translate(700, 160)">
        <rect width="290" height="420" rx="14" fill="#FFFFFF" stroke="#4F46E5" stroke-width="1.6" filter="url(#shD)"/>
        <rect width="290" height="45" rx="14" fill="#EEF2FF"/>
        <rect y="40" width="290" height="5" fill="#EEF2FF"/>
        <text x="20" y="28" fill="#3730A3" font-size="13" font-weight="900">3. Algoritmo CUFE</text>
        <g transform="translate(20, 65)">
          <text x="0" y="10" fill="#4338CA" font-size="10" font-family="monospace" font-weight="800">CÓDIGO ÚNICO TRIBUTARIO</text>
          <text x="0" y="32" fill="#475569" font-size="11.5" font-family="Georgia, serif">Firma criptográfica SHA-384 requerida por ley colombiana:</text>
          
          <rect y="48" width="250" height="230" rx="6" fill="#F8FAFC" stroke="#C7D2FE" stroke-width="1"/>
          <g transform="translate(12, 70)" font-family="monospace" font-size="9" fill="#1E1B4B">
            <text x="0" y="0" font-weight="bold">CUFE = SHA-384 (</text>
            <text x="10" y="20">NumFac: "SETP-9912",</text>
            <text x="10" y="40">FecFac: "2026-09-12",</text>
            <text x="10" y="60">ValFac: "185000.00",</text>
            <text x="10" y="80">CodImp1: "01", ValImp1: "29538",</text>
            <text x="10" y="100">NitFac: "901456789",</text>
            <text x="10" y="120">ClaveTecnica: "99a8...7b1"</text>
            <text x="0" y="140" font-weight="bold">)</text>
          </g>

          <rect y="295" width="250" height="40" rx="6" fill="#3730A3"/>
          <text x="125" y="318" fill="#FFFFFF" font-size="10" font-family="monospace" font-weight="800" text-anchor="middle">HASH CUFE INMUTABLE</text>
        </g>
      </g>

      <!-- Step 4 -->
      <g transform="translate(1020, 160)">
        <rect width="296" height="420" rx="14" fill="#FFFFFF" stroke="#059669" stroke-width="1.8" filter="url(#shD)"/>
        <rect width="296" height="45" rx="14" fill="#DCFCE7"/>
        <rect y="40" width="296" height="5" fill="#DCFCE7"/>
        <text x="20" y="28" fill="#065F46" font-size="13" font-weight="900">4. Aprobación DIAN</text>
        <g transform="translate(20, 65)">
          <text x="0" y="10" fill="#059669" font-size="10" font-family="monospace" font-weight="800">VALIDACIÓN PREVIA EN SERVIDOR</text>
          <text x="0" y="32" fill="#475569" font-size="11.5" font-family="Georgia, serif">Sincronización directa vía Web Services seguros:</text>
          
          <rect y="48" width="256" height="230" rx="6" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1"/>
          <g transform="translate(12, 70)" font-family="monospace" font-size="10" fill="#064E3B">
            <text x="0" y="0">DIAN Status: 200 OK</text>
            <text x="0" y="20">ApplicationResponse: VALIDADO</text>
            <text x="0" y="45" fill="#047857" font-weight="bold">Código QR Generado:</text>
            <text x="0" y="65" font-size="8">https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=...</text>
            <text x="0" y="100" fill="#475569">Factura legal emitida y enviada por email al cliente en 3.2s.</text>
          </g>

          <rect y="295" width="256" height="40" rx="6" fill="#059669"/>
          <text x="128" y="318" fill="#FFFFFF" font-size="10" font-family="monospace" font-weight="800" text-anchor="middle">100% BLINDADO ANTE SANCIONES</text>
        </g>
      </g>

      <!-- Bottom Note -->
      <g transform="translate(60, 610)">
        <rect width="1256" height="100" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
        <text x="25" y="32" fill="#0F172A" font-size="12" font-weight="800">EL COSTE LEGAL DEL DESCONOCIMIENTO:</text>
        <text x="25" y="55" fill="#475569" font-size="12" font-family="Georgia, serif">
          El Estatuto Tributario colombiano sanciona con el cierre del establecimiento de comercio (Artículo 657) y multas del 1% del valor facturado a los comercios electrónicos que no expidan factura electrónica con validación previa. Una plantilla generada por IA en 30 segundos no posee conexión a la DIAN, no calcula retenciones y deja a tu negocio en la ilegalidad fiscal.
        </text>
      </g>
    </svg>
    `
  },

  // =========================================================================
  // 3. FIG 2.3: ACID CONCURRENCY LOCK
  // =========================================================================
  {
    name: 'acid_concurrency_lock',
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1376 768" width="1376" height="768" style="background:#FAF9F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <defs>
        <filter id="shA" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.06"/>
        </filter>
      </defs>

      <rect width="1376" height="768" fill="#FAF9F5"/>

      <!-- Header -->
      <g transform="translate(60, 45)">
        <text x="0" y="0" fill="#64748B" font-size="12" font-family="monospace" letter-spacing="2">THE PURRPURR DISPATCH • ARQUITECTURA DE BASES DE DATOS</text>
        <text x="1256" y="0" fill="#9333EA" font-size="12" font-family="monospace" letter-spacing="2" text-anchor="end" font-weight="700">FIG. 2.3 — CONCURRENCIA ACID Y BLOQUEO TRANSACCIONAL</text>
        <line x1="0" y1="12" x2="1256" y2="12" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4"/>
      </g>

      <!-- Title -->
      <g transform="translate(60, 95)">
        <text x="0" y="0" fill="#0F172A" font-size="24" font-weight="900" letter-spacing="-0.5">La Colisión de Inventario: El Desafío de los 8 Milisegundos</text>
        <text x="0" y="24" fill="#64748B" font-size="13">Qué ocurre cuando dos compradores pulsan "Pagar" al mismo segundo por la última unidad disponible.</text>
      </g>

      <!-- Scenario Left: Naive AI Slop -->
      <g transform="translate(60, 155)">
        <rect width="610" height="490" rx="14" fill="#FEF2F2" stroke="#FCA5A5" stroke-width="1.5" filter="url(#shA)"/>
        <rect width="610" height="45" rx="14" fill="#FEE2E2"/>
        <rect y="40" width="610" height="5" fill="#FEE2E2"/>
        <text x="25" y="28" fill="#991B1B" font-size="13" font-family="monospace" font-weight="900">ESCENARIO A: GENERADOR IA (SIN BLOQUEO TRANSACCIONAL)</text>

        <g transform="translate(25, 65)">
          <text x="0" y="15" fill="#7F1D1D" font-size="12" font-family="Georgia, serif">Inventario almacenado en memoria volátil o lectura simple sin aislamiento:</text>

          <!-- Timeline -->
          <g transform="translate(0, 45)">
            <line x1="0" y1="40" x2="560" y2="40" stroke="#F87171" stroke-width="2"/>
            
            <circle cx="80" cy="40" r="8" fill="#EF4444"/>
            <text x="80" y="20" fill="#991B1B" font-size="10" font-family="monospace" font-weight="700" text-anchor="middle">T=00.000s</text>
            <text x="80" y="65" fill="#0F172A" font-size="10.5" font-weight="bold" text-anchor="middle">Cliente A (Bogotá)</text>
            <text x="80" y="80" fill="#64748B" font-size="9.5" text-anchor="middle">Lee Stock: 1 unidad</text>

            <circle cx="200" cy="40" r="8" fill="#EF4444"/>
            <text x="200" y="20" fill="#991B1B" font-size="10" font-family="monospace" font-weight="700" text-anchor="middle">T=00.008s</text>
            <text x="200" y="65" fill="#0F172A" font-size="10.5" font-weight="bold" text-anchor="middle">Cliente B (Medellín)</text>
            <text x="200" y="80" fill="#64748B" font-size="9.5" text-anchor="middle">Lee Stock: 1 unidad</text>

            <rect x="300" y="15" width="250" height="60" rx="8" fill="#FFFFFF" stroke="#EF4444" stroke-width="1.5"/>
            <text x="315" y="38" fill="#DC2626" font-size="11" font-weight="bold">¡AMBAS PASARELAS COBRAN!</text>
            <text x="315" y="55" fill="#7F1D1D" font-size="10">Wompi aprueba orden A y orden B.</text>
          </g>

          <rect y="170" width="560" height="130" rx="10" fill="#FFFFFF" stroke="#FECACA" stroke-width="1"/>
          <g transform="translate(18, 195)">
            <text x="0" y="0" fill="#B91C1C" font-size="13" font-weight="900">EL RESULTADO: SOBREVENTA &amp; QUIEBRE DE STOCK</text>
            <text x="0" y="25" fill="#475569" font-size="11.5" font-family="Georgia, serif">• El stock termina en -1 en la base de datos.</text>
            <text x="0" y="45" fill="#475569" font-size="11.5" font-family="Georgia, serif">• Tienes que llamar al cliente B para cancelar su pedido.</text>
            <text x="0" y="65" fill="#475569" font-size="11.5" font-family="Georgia, serif">• La pasarela cobra su comisión por el cobro y por la reversión.</text>
            <text x="0" y="85" fill="#DC2626" font-size="11" font-weight="bold">Daño reputacional grave y pérdida económica neta.</text>
          </g>
        </g>
      </g>

      <!-- Scenario Right: Purrpurr ACID -->
      <g transform="translate(706, 155)">
        <rect width="610" height="490" rx="14" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.8" filter="url(#shA)"/>
        <rect width="610" height="45" rx="14" fill="#DCFCE7"/>
        <rect y="40" width="610" height="5" fill="#DCFCE7"/>
        <text x="25" y="28" fill="#065F46" font-size="13" font-family="monospace" font-weight="900">ESCENARIO B: SISTEMA PURRPURR (POSTGRESQL + ROW LOCK)</text>

        <g transform="translate(25, 65)">
          <text x="0" y="15" fill="#047857" font-size="12" font-family="Georgia, serif">Transacción aislada ACID con bloqueo de fila en milisegundos:</text>

          <!-- Timeline -->
          <g transform="translate(0, 45)">
            <line x1="0" y1="40" x2="560" y2="40" stroke="#10B981" stroke-width="2.5"/>
            
            <circle cx="80" cy="40" r="8" fill="#059669"/>
            <text x="80" y="20" fill="#065F46" font-size="10" font-family="monospace" font-weight="700" text-anchor="middle">T=00.000s</text>
            <text x="80" y="65" fill="#0F172A" font-size="10.5" font-weight="bold" text-anchor="middle">Cliente A</text>
            <text x="80" y="80" fill="#059669" font-size="9.5" font-family="monospace" font-weight="bold" text-anchor="middle">ACID ROW-LOCK</text>

            <circle cx="200" cy="40" r="8" fill="#D97706"/>
            <text x="200" y="20" fill="#92400E" font-size="10" font-family="monospace" font-weight="700" text-anchor="middle">T=00.008s</text>
            <text x="200" y="65" fill="#0F172A" font-size="10.5" font-weight="bold" text-anchor="middle">Cliente B</text>
            <text x="200" y="80" fill="#D97706" font-size="9.5" font-family="monospace" font-weight="bold" text-anchor="middle">COLA DE ESPERA</text>

            <rect x="300" y="15" width="250" height="60" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="1.5"/>
            <text x="315" y="38" fill="#065F46" font-size="11" font-weight="bold">ORDEN A CONFIRMADA</text>
            <text x="315" y="55" fill="#047857" font-size="10">Stock se reduce a 0 atómicamente.</text>
          </g>

          <rect y="170" width="560" height="130" rx="10" fill="#FFFFFF" stroke="#BBF7D0" stroke-width="1"/>
          <g transform="translate(18, 195)">
            <text x="0" y="0" fill="#065F46" font-size="13" font-weight="900">EL RESULTADO: PROTECCIÓN TOTAL DEL INVENTARIO</text>
            <text x="0" y="25" fill="#475569" font-size="11.5" font-family="Georgia, serif">• El Cliente B recibe un aviso instantáneo en pantalla: "Agotado".</text>
            <text x="0" y="45" fill="#475569" font-size="11.5" font-family="Georgia, serif">• No se cobra un solo peso a la tarjeta del cliente B.</text>
            <text x="0" y="65" fill="#475569" font-size="11.5" font-family="Georgia, serif">• Se ofrece reserva prioritaria o aviso por WhatsApp.</text>
            <text x="0" y="85" fill="#059669" font-size="11" font-weight="bold">Cero sobreventa, cero fricción y reputación blindada.</text>
          </g>
        </g>
      </g>

      <!-- Code Snippet Bottom -->
      <g transform="translate(60, 665)">
        <rect width="1256" height="65" rx="8" fill="#0F172A"/>
        <text x="25" y="28" fill="#00FF9C" font-size="10" font-family="monospace" font-weight="bold">PRISMA TRANSACTION PROTOCOL (NATIVE ACID):</text>
        <text x="25" y="48" fill="#E2E8F0" font-size="11" font-family="monospace">await prisma.$transaction(async (tx) => { const item = await tx.product.findUnique({ where: { id }, select: { stock: true } }); if (item.stock &lt; 1) throw new Error("OUT_OF_STOCK"); await tx.product.update({ where: { id }, data: { stock: { decrement: 1 } } }); });</text>
      </g>
    </svg>
    `
  },

  // =========================================================================
  // 4. FIG 3.1: SAAS HIDDEN TAX CHART
  // =========================================================================
  {
    name: 'saas_hidden_tax_chart',
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1376 768" width="1376" height="768" style="background:#FAF9F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <defs>
        <linearGradient id="shGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E11D48" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#BE123C" stop-opacity="0.9"/>
        </linearGradient>
        <linearGradient id="purrGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10B981" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#059669" stop-opacity="0.9"/>
        </linearGradient>
        <filter id="shTax" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.06"/>
        </filter>
      </defs>

      <rect width="1376" height="768" fill="#FAF9F5"/>

      <!-- Header -->
      <g transform="translate(60, 45)">
        <text x="0" y="0" fill="#64748B" font-size="12" font-family="monospace" letter-spacing="2">THE PURRPURR DISPATCH • ANÁLISIS FINANCIERO Y AUDITORÍA DE COSTOS</text>
        <text x="1256" y="0" fill="#D97706" font-size="12" font-family="monospace" letter-spacing="2" text-anchor="end" font-weight="700">FIG. 3.1 — EL IMPUESTO INVISIBLE A 36 MESES</text>
        <line x1="0" y1="12" x2="1256" y2="12" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4"/>
      </g>

      <!-- Title -->
      <g transform="translate(60, 95)">
        <text x="0" y="0" fill="#0F172A" font-size="24" font-weight="900" letter-spacing="-0.5">El Impuesto Invisible: Fuga de Capital Acumulada a 3 Años</text>
        <text x="0" y="24" fill="#64748B" font-size="13">Para una marca mediana en Colombia facturando $20.000.000 COP al mes ($240M COP al año).</text>
      </g>

      <!-- Chart Area -->
      <g transform="translate(60, 160)">
        <rect width="840" height="480" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" filter="url(#shTax)"/>

        <!-- Grid Lines & Y Axis -->
        <g transform="translate(80, 50)" font-family="monospace" font-size="11" fill="#64748B">
          <line x1="0" y1="0" x2="700" y2="0" stroke="#F1F5F9" stroke-width="1"/>
          <text x="-15" y="4" text-anchor="end">$25M</text>

          <line x1="0" y1="80" x2="700" y2="80" stroke="#F1F5F9" stroke-width="1"/>
          <text x="-15" y="84" text-anchor="end">$20M</text>

          <line x1="0" y1="160" x2="700" y2="160" stroke="#F1F5F9" stroke-width="1"/>
          <text x="-15" y="164" text-anchor="end">$15M</text>

          <line x1="0" y1="240" x2="700" y2="240" stroke="#F1F5F9" stroke-width="1"/>
          <text x="-15" y="244" text-anchor="end">$10M</text>

          <line x1="0" y1="320" x2="700" y2="320" stroke="#F1F5F9" stroke-width="1"/>
          <text x="-15" y="324" text-anchor="end">$5M</text>

          <line x1="0" y1="400" x2="700" y2="400" stroke="#94A3B8" stroke-width="1.5"/>
          <text x="-15" y="404" text-anchor="end">$0</text>
        </g>

        <!-- Columns Comparison -->
        <!-- Year 1 -->
        <g transform="translate(170, 450)">
          <!-- Shopify Y1: 6.2M -> height = 6.2 * 16 = 99px -->
          <rect x="0" y="-99" width="70" height="99" rx="6" fill="url(#shGrad)"/>
          <text x="35" y="-108" fill="#BE123C" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">$6.2M</text>

          <!-- Purrpurr Y1: 1.2M -> height = 1.2 * 16 = 19px -->
          <rect x="85" y="-20" width="70" height="20" rx="6" fill="url(#purrGrad)"/>
          <text x="120" y="-28" fill="#059669" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">$1.2M</text>

          <text x="77" y="24" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">AÑO 1</text>
        </g>

        <!-- Year 2 -->
        <g transform="translate(390, 450)">
          <!-- Shopify Y2: 12.4M -> height = 12.4 * 16 = 198px -->
          <rect x="0" y="-198" width="70" height="198" rx="6" fill="url(#shGrad)"/>
          <text x="35" y="-207" fill="#BE123C" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">$12.4M</text>

          <!-- Purrpurr Y2: 2.5M -> height = 40px -->
          <rect x="85" y="-40" width="70" height="40" rx="6" fill="url(#purrGrad)"/>
          <text x="120" y="-48" fill="#059669" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">$2.5M</text>

          <text x="77" y="24" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">AÑO 2</text>
        </g>

        <!-- Year 3 -->
        <g transform="translate(610, 450)">
          <!-- Shopify Y3: 18.6M -> height = 18.6 * 16 = 297px -->
          <rect x="0" y="-297" width="70" height="297" rx="6" fill="url(#shGrad)"/>
          <text x="35" y="-306" fill="#BE123C" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">$18.6M COP</text>

          <!-- Purrpurr Y3: 3.7M -> height = 60px -->
          <rect x="85" y="-60" width="70" height="60" rx="6" fill="url(#purrGrad)"/>
          <text x="120" y="-68" fill="#059669" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">$3.7M COP</text>

          <text x="77" y="24" fill="#0F172A" font-size="12" font-weight="bold" text-anchor="middle">AÑO 3</text>
        </g>
      </g>

      <!-- Side Legend & Highlights -->
      <g transform="translate(930, 160)">
        <!-- Highlight Card -->
        <rect width="386" height="230" rx="14" fill="#ECFDF5" stroke="#10B981" stroke-width="2" filter="url(#shTax)"/>
        <g transform="translate(24, 30)">
          <text x="0" y="0" fill="#065F46" font-size="11" font-family="monospace" font-weight="bold" letter-spacing="1">AHORRO RETENIDO DIRECTO</text>
          <text x="0" y="42" fill="#047857" font-size="34" font-weight="900" font-family="monospace">+$14.900.000</text>
          <text x="0" y="65" fill="#065F46" font-size="14" font-weight="bold">COP Retenidos en 36 Meses</text>
          
          <line x1="0" y1="85" x2="338" y2="85" stroke="#A7F3D0" stroke-width="1"/>
          
          <text x="0" y="110" fill="#475569" font-size="12" font-family="Georgia, serif">
            Dinero que en Shopify se evapora en penalizaciones del 2.0% por no usar Shopify Payments (inoperante en Colombia) y suscripciones a apps externas de WhatsApp y reseñas.
          </text>
        </g>

        <!-- Breakdown Card -->
        <g transform="translate(0, 250)">
          <rect width="386" height="230" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" filter="url(#shTax)"/>
          <g transform="translate(24, 30)">
            <text x="0" y="0" fill="#0F172A" font-size="13" font-weight="bold">¿Por qué Shopify es tan costoso en Colombia?</text>
            
            <g transform="translate(0, 25)" font-size="11.5" font-family="Georgia, serif" fill="#475569">
              <text x="0" y="15">• <tspan font-weight="bold" fill="#BE123C">Multa del 2.0% por transacción:</tspan> Al usar Wompi o Bold, Shopify cobra un impuesto sobre cada venta.</text>
              <text x="0" y="55">• <tspan font-weight="bold" fill="#BE123C">Dólar TRM:</tspan> El plan de $39 USD/mes se encarece con la devaluación.</text>
              <text x="0" y="85">• <tspan font-weight="bold" fill="#BE123C">Apps adicionales:</tspan> Popups, WhatsApp y reseñas suman otros $30-$50 USD mensuales obligatorios.</text>
              <text x="0" y="125">• <tspan font-weight="bold" fill="#059669">Purrpurr:</tspan> Todo está compilado en tu propio código fuente. Cero intermediarios.</text>
            </g>
          </g>
      </g>
      </g>

      <!-- Bottom Tagline -->
      <g transform="translate(60, 670)">
        <rect width="1256" height="55" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="25" y="32" fill="#334155" font-size="11.5" font-family="Georgia, serif">
          <tspan font-weight="bold">Conclusión Financiera:</tspan> El alquiler de software parece barato en el mes uno, pero se convierte en una fuga de capital asfixiante conforme tu marca escala. La propiedad del código es la decisión más rentable de un director financiero.
        </text>
      </g>
    </svg>
    `
  },

  // =========================================================================
  // 5. FIG 4.1: AI ORCHESTRATOR BLUEPRINT
  // =========================================================================
  {
    name: 'ai_orchestrator_blueprint',
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1376 768" width="1376" height="768" style="background:#FAF9F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <defs>
        <filter id="shO" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.06"/>
        </filter>
      </defs>

      <rect width="1376" height="768" fill="#FAF9F5"/>

      <!-- Header -->
      <g transform="translate(60, 45)">
        <text x="0" y="0" fill="#64748B" font-size="12" font-family="monospace" letter-spacing="2">THE PURRPURR DISPATCH • METODOLOGÍA DE INGENIERÍA</text>
        <text x="1256" y="0" fill="#2563EB" font-size="12" font-family="monospace" letter-spacing="2" text-anchor="end" font-weight="700">FIG. 4.1 — EL VERDADERO "NIVEL IA"</text>
        <line x1="0" y1="12" x2="1256" y2="12" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4"/>
      </g>

      <!-- Title -->
      <g transform="translate(60, 95)">
        <text x="0" y="0" fill="#0F172A" font-size="24" font-weight="900" letter-spacing="-0.5">El Director de Orquesta: Cómo Purrpurr Utiliza la IA como Multiplicador</text>
        <text x="0" y="24" fill="#64748B" font-size="13">La IA no reemplaza al arquitecto; automatiza el 80% del trabajo mecánico para que el humano blinde la arquitectura crítica.</text>
      </g>

      <!-- 3-Column Matrix -->
      <!-- Column 1: Consultora Clásica -->
      <g transform="translate(60, 160)">
        <rect width="380" height="490" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" filter="url(#shO)"/>
        <rect width="380" height="50" rx="14" fill="#F8FAFC"/>
        <rect y="45" width="380" height="5" fill="#F8FAFC"/>
        <text x="24" y="32" fill="#475569" font-size="13" font-weight="bold">1. Consultora Tradicional</text>
        
        <g transform="translate(24, 75)">
          <g>
            <text x="0" y="10" fill="#0F172A" font-size="11" font-weight="bold" font-family="monospace">PARADIGMA MANUAL (2015-2023)</text>
            <text x="0" y="40" fill="#64748B" font-size="12">Picar cada línea de código a mano por equipos de 5 personas.</text>
            
            <rect y="60" width="332" height="70" rx="6" fill="#F1F5F9"/>
            <text x="14" y="85" fill="#334155" font-size="11" font-family="monospace" font-weight="bold">TIEMPO DE ENTREGA: 8 - 12 SEMANAS</text>
            <text x="14" y="105" fill="#64748B" font-size="11">COSTO: $15.000.000 - $30.000.000 COP</text>

            <text x="0" y="165" fill="#0F172A" font-size="12" font-weight="bold">Desventajas Críticas:</text>
            <text x="0" y="190" fill="#475569" font-size="11.5">• Lentitud en cambios y time-to-market tardío.</text>
            <text x="0" y="215" fill="#475569" font-size="11.5">• Costo desproporcionado en tareas repetitivas.</text>
            <text x="0" y="240" fill="#475569" font-size="11.5">• Dependencia de agencias burocráticas.</text>
          </g>

          <rect y="330" width="332" height="40" rx="6" fill="#E2E8F0"/>
          <text x="166" y="355" fill="#475569" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">SOBREPRECIO EN HORAS HOMBRE</text>
        </g>
      </g>

      <!-- Column 2: Generador IA 30s -->
      <g transform="translate(498, 160)">
        <rect width="380" height="490" rx="14" fill="#FEF2F2" stroke="#F87171" stroke-width="1.2" filter="url(#shO)"/>
        <rect width="380" height="50" rx="14" fill="#FEE2E2"/>
        <rect y="45" width="380" height="5" fill="#FEE2E2"/>
        <text x="24" y="32" fill="#991B1B" font-size="13" font-weight="bold">2. Generador IA (Bolt/Lovable)</text>
        
        <g transform="translate(24, 75)">
          <g>
            <text x="0" y="10" fill="#991B1B" font-size="11" font-weight="bold" font-family="monospace">PARADIGMA DESCARTE (2025-2026)</text>
            <text x="0" y="40" fill="#7F1D1D" font-size="12">Un prompt genera una maqueta de frontend en 30 segundos.</text>
            
            <rect y="60" width="332" height="70" rx="6" fill="#FFFFFF" stroke="#FCA5A5" stroke-width="1"/>
            <text x="14" y="85" fill="#DC2626" font-size="11" font-family="monospace" font-weight="bold">TIEMPO DE ENTREGA: 30 SEGUNDOS</text>
            <text x="14" y="105" fill="#7F1D1D" font-size="11">COSTO: $0 - $20 USD</text>

            <text x="0" y="165" fill="#991B1B" font-size="12" font-weight="bold">Fallas Letales:</text>
            <text x="0" y="190" fill="#7F1D1D" font-size="11.5">• Sin servidor para webhooks bancarios.</text>
            <text x="0" y="215" fill="#7F1D1D" font-size="11.5">• Sin base de datos ACID ni bloqueo de stock.</text>
            <text x="0" y="240" fill="#7F1D1D" font-size="11.5">• Sin soporte DIAN ni factura electrónica.</text>
          </g>

          <rect y="330" width="332" height="40" rx="6" fill="#F87171"/>
          <text x="166" y="355" fill="#FFFFFF" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">CASCAJAL VISUAL INOPERANTE</text>
        </g>
      </g>

      <!-- Column 3: Enfoque Purrpurr -->
      <g transform="translate(936, 160)">
        <rect width="380" height="490" rx="14" fill="#F0FDF4" stroke="#10B981" stroke-width="2" filter="url(#shO)"/>
        <rect width="380" height="50" rx="14" fill="#DCFCE7"/>
        <rect y="45" width="380" height="5" fill="#DCFCE7"/>
        <text x="24" y="32" fill="#065F46" font-size="13" font-weight="bold">3. Tesis Purrpurr "Nivel IA"</text>
        
        <g transform="translate(24, 75)">
          <g>
            <text x="0" y="10" fill="#047857" font-size="11" font-weight="bold" font-family="monospace">ORQUESTACIÓN DE INGENIERÍA</text>
            <text x="0" y="40" fill="#065F46" font-size="12">Ingenieros senior dirigen enjambres de IA para tareas mecánicas.</text>
            
            <rect y="60" width="332" height="70" rx="6" fill="#FFFFFF" stroke="#86EFAC" stroke-width="1.2"/>
            <text x="14" y="85" fill="#059669" font-size="11" font-family="monospace" font-weight="bold">TIEMPO DE ENTREGA: 2 - 3 SEMANAS</text>
            <text x="14" y="105" fill="#065F46" font-size="11">COSTO: ALTAMENTE ACCESIBLE</text>

            <text x="0" y="165" fill="#065F46" font-size="12" font-weight="bold">Ventajas Decisivas:</text>
            <text x="0" y="190" fill="#047857" font-size="11.5">• 100% código propio en GitHub (Next.js).</text>
            <text x="0" y="215" fill="#047857" font-size="11.5">• Pasarela Wompi con webhook validado.</text>
            <text x="0" y="240" fill="#047857" font-size="11.5">• Facturación DIAN y WhatsApp nativos.</text>
          </g>

          <rect y="330" width="332" height="40" rx="6" fill="#059669"/>
          <text x="166" y="355" fill="#FFFFFF" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">ARQUITECTURA DE ÉLITE SIN TIEMPOS MUERTOS</text>
        </g>
      </g>

      <!-- Bottom Tag -->
      <g transform="translate(60, 675)">
        <rect width="1256" height="50" rx="8" fill="#0F172A"/>
        <text x="628" y="31" fill="#00FF9C" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">
          LA EFICIENCIA DE LA IA NO DEBE SER PARA ABARATAR LA CALIDAD, SINO PARA DEMOCRATIZAR LA INGENIERÍA DE ALTO IMPACTO.
        </text>
      </g>
    </svg>
    `
  },

  // =========================================================================
  // 6. FIG 4.2: TELEMETRY MISSION CONTROL
  // =========================================================================
  {
    name: 'telemetry_mission_control',
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1376 768" width="1376" height="768" style="background:#090D16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <defs>
        <filter id="glowT" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      <rect width="1376" height="768" fill="#090D16"/>

      <!-- Grid Matrix -->
      <g stroke="#1E293B" stroke-width="0.7" opacity="0.6">
        <line x1="0" y1="96" x2="1376" y2="96"/>
        <line x1="0" y1="192" x2="1376" y2="192"/>
        <line x1="0" y1="288" x2="1376" y2="288"/>
        <line x1="0" y1="384" x2="1376" y2="384"/>
        <line x1="0" y1="480" x2="1376" y2="480"/>
        <line x1="0" y1="576" x2="1376" y2="576"/>
        <line x1="0" y1="672" x2="1376" y2="672"/>
      </g>

      <!-- Header Top -->
      <g transform="translate(60, 45)">
        <circle cx="8" cy="8" r="4.5" fill="#00FF9C" filter="url(#glowT)"/>
        <text x="24" y="12" fill="#00FF9C" font-size="11" font-family="monospace" font-weight="bold" letter-spacing="2">PURRPURR MISSION CONTROL • CENTRO DE TELEMETRÍA EN VIVO</text>
        <text x="1256" y="12" fill="#94A3B8" font-size="11" font-family="monospace" letter-spacing="1" text-anchor="end">STATUS: OPERACIONAL (99.99%) • REGION: BOGOTÁ (CO-DC1)</text>
        <line x1="0" y1="24" x2="1256" y2="24" stroke="#334155" stroke-width="1"/>
      </g>

      <!-- KPI Row (4 Cards) -->
      <g transform="translate(60, 95)">
        <!-- KPI 1 -->
        <rect width="296" height="110" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.2"/>
        <g transform="translate(20, 30)">
          <text x="0" y="0" fill="#94A3B8" font-size="10" font-family="monospace" font-weight="bold">LATENCIA EDGE P95</text>
          <text x="0" y="38" fill="#38BDF8" font-size="32" font-weight="900" font-family="monospace">34.2 ms</text>
          <text x="0" y="60" fill="#0284C7" font-size="10" font-family="monospace">SSR Bogotá / Medellín / Cali</text>
        </g>

        <!-- KPI 2 -->
        <g transform="translate(320, 0)">
          <rect width="296" height="110" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.2"/>
          <g transform="translate(20, 30)">
            <text x="0" y="0" fill="#94A3B8" font-size="10" font-family="monospace" font-weight="bold">TASA DE APROBACIÓN WOMPI</text>
            <text x="0" y="38" fill="#00FF9C" font-size="32" font-weight="900" font-family="monospace">99.82%</text>
            <text x="0" y="60" fill="#059669" font-size="10" font-family="monospace">1,480 transacciones verificadas</text>
          </g>
        </g>

        <!-- KPI 3 -->
        <g transform="translate(640, 0)">
          <rect width="296" height="110" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.2"/>
          <g transform="translate(20, 30)">
            <text x="0" y="0" fill="#94A3B8" font-size="10" font-family="monospace" font-weight="bold">SINCRONIZACIÓN DIAN CUFE</text>
            <text x="0" y="38" fill="#A855F7" font-size="32" font-weight="900" font-family="monospace">100% OK</text>
            <text x="0" y="60" fill="#9333EA" font-size="10" font-family="monospace">0 facturas en cola / Res. 165</text>
          </g>
        </g>

        <!-- KPI 4 -->
        <g transform="translate(960, 0)">
          <rect width="296" height="110" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.2"/>
          <g transform="translate(20, 30)">
            <text x="0" y="0" fill="#94A3B8" font-size="10" font-family="monospace" font-weight="bold">SOBREVENTAS PREVENIDAS</text>
            <text x="0" y="38" fill="#F59E0B" font-size="32" font-weight="900" font-family="monospace">47 BLOCKED</text>
            <text x="0" y="60" fill="#D97706" font-size="10" font-family="monospace">Bloqueo de fila ACID en pico</text>
          </g>
        </g>
      </g>

      <!-- Live Stream Terminal & Map -->
      <g transform="translate(60, 230)">
        <!-- Terminal (Left) -->
        <rect width="780" height="420" rx="14" fill="#0B132B" stroke="#1E293B" stroke-width="1.5"/>
        <rect width="780" height="38" rx="14" fill="#1C2541"/>
        <rect y="34" width="780" height="4" fill="#1C2541"/>
        <circle cx="20" cy="19" r="4.5" fill="#EF4444"/>
        <circle cx="34" cy="19" r="4.5" fill="#F59E0B"/>
        <circle cx="48" cy="19" r="4.5" fill="#10B981"/>
        <text x="70" y="24" fill="#94A3B8" font-size="11" font-family="monospace">LIVE TRANSACTION STREAM • NEXT.JS EDGE TELEMETRY</text>

        <g transform="translate(20, 60)" font-family="monospace" font-size="11" fill="#E2E8F0">
          <text x="0" y="15"><tspan fill="#64748B">[18:14:02.112]</tspan> <tspan fill="#38BDF8">INCOMING_POST</tspan> /api/webhooks/wompi <tspan fill="#10B981">200 OK (38ms)</tspan></text>
          <text x="20" y="35" fill="#94A3B8">↳ tran_id: "tr_live_891823" • amount: $450.000 COP • hash: VALIDATED OK</text>
          <text x="20" y="55" fill="#00FF9C">↳ ACID LOCK: sku_leather_jacket_m (Stock 2 → 1) • DIAN XML UBL 2.1 SIGNED</text>

          <line x1="0" y1="75" x2="740" y2="75" stroke="#1E293B" stroke-width="1"/>

          <text x="0" y="100"><tspan fill="#64748B">[18:14:02.120]</tspan> <tspan fill="#F59E0B">COLLISION_AVOIDED</tspan> /api/checkout/reserve <tspan fill="#F59E0B">409 CONFLICT</tspan></text>
          <text x="20" y="120" fill="#94A3B8">↳ Client from Medellín attempted last unit concurrently. ACID Row-Lock prevented duplicate payment.</text>
          <text x="20" y="140" fill="#A855F7">↳ WhatsApp Bot triggered alternative variant suggestion to customer.</text>

          <line x1="0" y1="160" x2="740" y2="160" stroke="#1E293B" stroke-width="1"/>

          <text x="0" y="185"><tspan fill="#64748B">[18:14:08.450]</tspan> <tspan fill="#38BDF8">INCOMING_POST</tspan> /api/webhooks/wompi <tspan fill="#10B981">200 OK (29ms)</tspan></text>
          <text x="20" y="205" fill="#94A3B8">↳ tran_id: "tr_live_891824" • amount: $120.000 COP • PSE Bancolombia Clearing</text>
          <text x="20" y="225" fill="#00FF9C">↳ Settlement queued for direct bank deposit in 24h. Zero third-party fees.</text>

          <line x1="0" y1="245" x2="740" y2="245" stroke="#1E293B" stroke-width="1"/>

          <text x="0" y="270"><tspan fill="#64748B">[18:14:15.890]</tspan> <tspan fill="#10B981">DIAN_VPFE_ACK</tspan> SOAP Response from Bogotá Tax Authority</text>
          <text x="20" y="290" fill="#94A3B8">↳ CUFE: 99a8f238b1e09c81726a84... • Factura legal registrada sin observaciones.</text>

          <rect y="315" width="740" height="30" rx="4" fill="#1C2541"/>
          <text x="370" y="335" fill="#00FF9C" font-size="10" font-family="monospace" text-anchor="middle">SISTEMA CORRIENDO EN ALTA VELOCIDAD • 0 ADVERTENCIAS EN BITÁCORA</text>
        </g>
      </g>

      <!-- Right Human Command Shield -->
      <g transform="translate(860, 230)">
        <rect width="456" height="420" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
        <rect width="456" height="38" rx="14" fill="#1E293B"/>
        <rect y="34" width="456" height="4" fill="#1E293B"/>
        <text x="20" y="24" fill="#FFFFFF" font-size="11" font-family="monospace" font-weight="bold">EL RESPALDO HUMANO EN HORAS PICO</text>

        <g transform="translate(24, 60)">
          <text x="0" y="15" fill="#F8FAFC" font-size="14" font-weight="900">Black Friday, CyberLunes y Días Sin IVA</text>
          <text x="0" y="40" fill="#94A3B8" font-size="12" font-family="Georgia, serif">
            Cuando tu tienda procesa cincuenta compras por minuto, no puedes esperar a que un chatbot de soporte en inglés te responda en 48 horas.
          </text>

          <rect y="65" width="408" height="100" rx="8" fill="#1E293B" stroke="#475569" stroke-width="1"/>
          <g transform="translate(16, 85)" font-family="monospace" font-size="11">
            <text x="0" y="5" fill="#38BDF8">HOTLINE INGENIERO PURRPURR ASIGNADO:</text>
            <text x="0" y="25" fill="#FFFFFF">Línea de WhatsApp y celular directa.</text>
            <text x="0" y="45" fill="#00FF9C">Tiempo de respuesta ante incidentes: &lt; 5 min.</text>
            <text x="0" y="65" fill="#94A3B8">Monitoreo activo de logs y balance transaccional.</text>
          </g>

          <rect y="180" width="408" height="155" rx="8" fill="#064E3B" stroke="#059669" stroke-width="1.2"/>
          <g transform="translate(16, 205)">
            <text x="0" y="5" fill="#00FF9C" font-size="12" font-family="monospace" font-weight="bold">GARANTÍA PURRPURR:</text>
            <text x="0" y="30" fill="#FFFFFF" font-size="11.5" font-family="Georgia, serif">
              "El cliente no paga únicamente por el código de software; paga por la certeza de que su dinero y sus transacciones están custodiadas por un equipo de ingeniería que responde su llamada cuando el dinero está en juego."
            </text>
            <text x="0" y="90" fill="#A7F3D0" font-size="11" font-family="monospace" font-weight="bold">— Camilo Toloza, Fundador</text>
          </g>
        </g>
      </g>

      <!-- Bottom Bar -->
      <g transform="translate(60, 675)">
        <rect width="1256" height="50" rx="8" fill="#0F172A" stroke="#1E293B" stroke-width="1"/>
        <text x="628" y="31" fill="#94A3B8" font-size="11" font-family="monospace" text-anchor="middle">
          CENTRO DE OPERACIONES PURRPURR • VIGILANCIA CRIPTOGRÁFICA 24/7/365
        </text>
      </g>
    </svg>
    `
  },

  // =========================================================================
  // 7. FIG 5.1: F1 ENGINE ON CHASSIS
  // =========================================================================
  {
    name: 'f1_engine_chassis',
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1376 768" width="1376" height="768" style="background:#FAF9F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <defs>
        <filter id="shF" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.06"/>
        </filter>
      </defs>

      <rect width="1376" height="768" fill="#FAF9F5"/>

      <!-- Header -->
      <g transform="translate(60, 45)">
        <text x="0" y="0" fill="#64748B" font-size="12" font-family="monospace" letter-spacing="2">THE PURRPURR DISPATCH • FILOSOFÍA DE ARQUITECTURA DE SOFTWARE</text>
        <text x="1256" y="0" fill="#BE123C" font-size="12" font-family="monospace" letter-spacing="2" text-anchor="end" font-weight="700">FIG. 5.1 — LA METÁFORA DEL CHASIS Y EL MOTOR</text>
        <line x1="0" y1="12" x2="1256" y2="12" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="4,4"/>
      </g>

      <!-- Title -->
      <g transform="translate(60, 95)">
        <text x="0" y="0" fill="#0F172A" font-size="24" font-weight="900" letter-spacing="-0.5">Un Motor de Fórmula 1 sin Chasis ni Frenos Solo Sirve para Estrellarse Más Rápido</text>
        <text x="0" y="24" fill="#64748B" font-size="13">La descomposición anatómica entre la aceleración generativa y el blindaje estructural que exige una empresa real.</text>
      </g>

      <!-- Left Card: The Engine (AI) -->
      <g transform="translate(60, 160)">
        <rect width="610" height="480" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" filter="url(#shF)"/>
        <rect width="610" height="45" rx="14" fill="#F8FAFC"/>
        <rect y="40" width="610" height="5" fill="#F8FAFC"/>
        <text x="24" y="28" fill="#0F172A" font-size="13" font-weight="900">EL MOTOR: INTELIGENCIA ARTIFICIAL (POTENCIA PURA)</text>

        <g transform="translate(24, 70)">
          <text x="0" y="10" fill="#475569" font-size="12" font-family="Georgia, serif">Lo que la IA resuelve con velocidad astronómica:</text>

          <g>
            <g transform="translate(0, 30)">
              <rect width="562" height="60" rx="6" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
              <text x="16" y="24" fill="#3730A3" font-size="11.5" font-weight="bold">1. Aceleración de Código Repetitivo</text>
              <text x="16" y="44" fill="#475569" font-size="10.5">Generación instantánea de componentes UI, tipado TypeScript y tests unitarios.</text>
            </g>

            <g transform="translate(0, 105)">
              <rect width="562" height="60" rx="6" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
              <text x="16" y="24" fill="#3730A3" font-size="11.5" font-weight="bold">2. Análisis y Síntesis de Datos</text>
              <text x="16" y="44" fill="#475569" font-size="10.5">Categorización de catálogos masivos, optimización SEO y textos en segundos.</text>
            </g>

            <g transform="translate(0, 180)">
              <rect width="562" height="60" rx="6" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
              <text x="16" y="24" fill="#3730A3" font-size="11.5" font-weight="bold">3. Personalización Dinámica</text>
              <text x="16" y="44" fill="#475569" font-size="10.5">Recomendaciones de productos contextuales basadas en la navegación del usuario.</text>
            </g>

            <g transform="translate(0, 255)">
              <rect width="562" height="90" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
              <text x="16" y="24" fill="#64748B" font-size="10" font-family="monospace" font-weight="bold">EL LÍMITE DE LA IA PURA:</text>
              <text x="16" y="45" fill="#7F1D1D" font-size="11" font-family="Georgia, serif">
                La IA no tiene cuenta en Bancolombia. No sabe qué es el Estatuto Tributario 657. No paga abogados si un cliente demanda por fraude de datos personales. No asume responsabilidad civil.
              </text>
            </g>
          </g>
        </g>
      </g>

      <!-- Right Card: The Chassis (Purrpurr Engineering) -->
      <g transform="translate(706, 160)">
        <rect width="610" height="480" rx="14" fill="#0F172A" stroke="#00FF9C" stroke-width="2" filter="url(#shF)"/>
        <rect width="610" height="45" rx="14" fill="#1E293B"/>
        <rect y="40" width="610" height="5" fill="#1E293B"/>
        <text x="24" y="28" fill="#00FF9C" font-size="13" font-family="monospace" font-weight="900">EL CHASIS: INGENIERÍA PURRPURR (RIGOR Y CONTROL)</text>

        <g transform="translate(24, 70)">
          <text x="0" y="10" fill="#94A3B8" font-size="12" font-family="Georgia, serif">La estructura de misión crítica que permite acelerar a fondo:</text>

          <g>
            <g transform="translate(0, 30)">
              <rect width="562" height="60" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1"/>
              <text x="16" y="24" fill="#00FF9C" font-size="11.5" font-weight="bold">1. Chasis Tubular de Titanio (Next.js App Router Edge)</text>
              <text x="16" y="44" fill="#94A3B8" font-size="10.5">Arquitectura monolítica moderna desplegada globalmente con latencia &lt; 50ms.</text>
            </g>

            <g transform="translate(0, 105)">
              <rect width="562" height="60" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1"/>
              <text x="16" y="24" fill="#00FF9C" font-size="11.5" font-weight="bold">2. Frenos Cerámicos Criptográficos (HMAC SHA-256)</text>
              <text x="16" y="44" fill="#94A3B8" font-size="10.5">Imposibilita transacciones falsas; valida cada peso con Bancolombia.</text>
            </g>

            <g transform="translate(0, 180)">
              <rect width="562" height="60" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1"/>
              <text x="16" y="24" fill="#00FF9C" font-size="11.5" font-weight="bold">3. Suspensión Activa ACID (PostgreSQL Relacional)</text>
              <text x="16" y="44" fill="#94A3B8" font-size="10.5">Bloqueo estricto de concurrencia para evitar sobreventa en picos de tráfico.</text>
            </g>

            <g transform="translate(0, 255)">
              <rect width="562" height="90" rx="8" fill="#064E3B" stroke="#059669" stroke-width="1"/>
              <text x="16" y="24" fill="#00FF9C" font-size="10" font-family="monospace" font-weight="bold">EL PILOTO HUMANO:</text>
              <text x="16" y="45" fill="#ECFDF5" font-size="11" font-family="Georgia, serif">
                Ingenieros con nombre, apellido y teléfono que supervisan cada despliegue, responden por la integridad de tu plataforma y construyen relaciones a largo plazo.
              </text>
            </g>
          </g>
        </g>
      </g>

      <!-- Bottom Tagline -->
      <g transform="translate(60, 665)">
        <rect width="1256" height="55" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="628" y="32" fill="#0F172A" font-size="12" font-family="Georgia, serif" font-weight="bold" text-anchor="middle">
          La tecnología sin ingeniería no es progreso; es fragilidad disfrazada de innovación.
        </text>
      </g>
    </svg>
    `
  }
];

async function run() {
  for (const g of graphics) {
    const svgPath = path.join(outDir, `${g.name}.svg`);
    const jpgPath = path.join(outDir, `${g.name}.jpg`);
    const webpPath = path.join(outDir, `${g.name}.webp`);

    fs.writeFileSync(svgPath, g.svg.trim());
    const buf = Buffer.from(g.svg.trim());

    await sharp(buf).jpeg({ quality: 92 }).toFile(jpgPath);
    await sharp(buf).webp({ quality: 90 }).toFile(webpPath);

    console.log(`Generated: ${g.name}.jpg and ${g.name}.webp`);
  }
  console.log('All editorial graphics built successfully!');
}

run().catch(console.error);
