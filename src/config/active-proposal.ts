// ============================================================================
// PROPUESTA ACTIVA EN ALIANZA OFICIAL — PURRPURR.DEV × SPEEDLIGHT CULTURE
// FUENTE SINCRONIZADA CON speedlight-web/app/data/quotationsArchive.ts (#PROP-JL-2026-094)
// ============================================================================

export interface ProposalModuleItem {
  id: string;
  description: string;
  specification: string;
  deliverable: string;
  provider: string;
  stageLabel: string;
  listPrice: number;
  alliancePrice: number;
}

export interface ProposalContractOption {
  id: string;
  name: string;
  shortLabel: string;
  listPrice: number;
  discountLabel: string;
  discountPercentage: number;
  discountAmount: number;
  total: number;
  description: string;
  advancePaymentLabel: string;
  advancePaymentAmount: number;
  balancePaymentLabel: string;
  balancePaymentAmount: number;
}

export interface ActiveProposalConfig {
  id: string;
  code: string;
  docLabel: string;
  headerSubtitle: string;
  title: string;
  date: string;
  validDays: number;
  clientName: string;
  clientDoc: string;
  clientCompany: string;
  clientPhone: string;
  projectName: string;
  issuerName: string;
  issuerRepresentative: string;
  issuerDoc: string;
  issuerBankInfo: string;
  deliveryTime: string;
  concept: string;
  items: ProposalModuleItem[];
  subtotal: number;
  discount: {
    label: string;
    percentage: number;
    amount: number;
  };
  total: number;
  alternativePackages: ProposalContractOption[];
  blocks: {
    title: string;
    lines: { label: string; text: string }[];
  }[];
  speedlightUrl: string;
  checkoutBaseUrl: string;
  whatsappSummary: string;
}

export const ACTIVE_PROPOSAL: ActiveProposalConfig = {
  id: 'prop-julian-lotero-software-001',
  code: 'PROP-JL-2026-094',
  docLabel: 'Propuesta Comercial en Alianza',
  headerSubtitle:
    'Alianza Oficial de Ingeniería de Software & Plataforma Automotriz · purrpurr.dev · speedlightculture.com',
  title:
    'Cotización Formal · Sistema de Cotizaciones, Agendamiento & Dispersión Wompi',
  date: '2026-10-29',
  validDays: 15,
  clientName: 'Julián Lotero',
  clientDoc: 'Dirección de Operaciones & Taller',
  clientCompany: 'Marca Independiente · Dirección de Operaciones',
  clientPhone: '+57 313 883 0156',
  projectName: 'Sistema Web de Cotizaciones A4, Agenda & Dispersión Wompi',
  issuerName: 'purrpurr.dev × Speedlight Works',
  issuerRepresentative: 'Lead Architect purrpurr.dev & Dirección Speedlight',
  issuerDoc: 'C.C. 1019089803 · Camilo Andrés Toloza Petter',
  issuerBankInfo:
    'Bancolombia Ahorros # 204 795227 91 · Titular: Camilo Andrés Toloza Petter · purrpurr.dev × Speedlight',
  deliveryTime: '3 Etapas · 15 a 20 días hábiles',
  concept:
    'Desarrollo de ecosistema web a medida presentado en alianza oficial por purrpurr.dev (Ingeniería de Software) y Speedlight Culture (Ecosistema Automotriz). El sistema se entrega en 3 etapas semanales acumulativas e incluye motor de cotizaciones A4, cálculo automático de costos de taller, pasarela Wompi con dispersión a operarios y panel administrativo CRM privado.',
  items: [
    {
      id: 'item-jl-motor-cotizaciones',
      description: '1. Motor Web de Cotizaciones Ejecutivas & Generador PDF A4',
      specification:
        'Desarrollo de interfaz privada para armar cotizaciones formales con identidad propia. Incluye cálculo automático de costos de taller (Mano de obra + Insumos + Márgenes), enlaces directos para compartir por WhatsApp, visor PDF en alta resolución y botón de pago Wompi.',
      deliverable: '1 Módulo',
      provider: 'PURRPURR.DEV × SPEEDLIGHT',
      stageLabel: 'Etapa 1 (Semana 1)',
      listPrice: 1000000,
      alliancePrice: 800000,
    },
    {
      id: 'item-jl-dispersion-wompi',
      description:
        '2. Integración Pasarela Wompi & Dispersión Automatizada a Operarios',
      specification:
        'Configuración de pasarela de recaudo en línea con botón PSE, tarjetas de crédito, Nequi y Bancolombia. Módulo de dispersión de pagos para liquidar automáticamente al día siguiente a los trabajadores e insumos por servicio terminado.',
      deliverable: '1 Módulo',
      provider: 'PURRPURR.DEV × WOMPI B2B',
      stageLabel: 'Etapa 2 (Semana 2)',
      listPrice: 800000,
      alliancePrice: 600000,
    },
    {
      id: 'item-jl-panel-crm',
      description:
        '3. Panel Administrativo Privado (CRM de Citas, Vehículos & Evidencias)',
      specification:
        'Panel de control seguro para gestión de turnos en taller, agenda de servicios, registro fotográfico de entrega por parte de operarios y control de mano de obra liquidada sin fricción.',
      deliverable: '1 Módulo',
      provider: 'PURRPURR.DEV × SPEEDLIGHT',
      stageLabel: 'Etapa 3 (Semana 3)',
      listPrice: 700000,
      alliancePrice: 400000,
    },
  ],
  subtotal: 2500000,
  discount: {
    label: 'Beneficio Alianza purrpurr.dev × Speedlight (-28% OFF)',
    percentage: 28,
    amount: 700000,
  },
  total: 1800000,
  alternativePackages: [
    {
      id: 'opt-1-modulo-cotizador',
      name: 'Opción 1 · Módulo 1: Motor de Cotizaciones & PDF A4',
      shortLabel: 'Opción 1 · Módulo 1',
      listPrice: 1000000,
      discountLabel: 'Alianza purrpurr.dev × Speedlight (-20% OFF)',
      discountPercentage: 20,
      discountAmount: 200000,
      total: 800000,
      description:
        'Solo Etapa 1 (Semana 1): Motor privado para emitir cotizaciones A4 con cálculo de costos, enlace WhatsApp y pago Wompi. Lista $ 1.000.000 → $ 800.000 COP.',
      advancePaymentLabel: 'Anticipo 50%',
      advancePaymentAmount: 400000,
      balancePaymentLabel: 'Saldo contra entrega',
      balancePaymentAmount: 400000,
    },
    {
      id: 'opt-2-sistema-integral',
      name: 'Opción 2 · Sistema Integral (Módulos 1 + 2 + 3)',
      shortLabel: 'Opción 2 · Sistema Integral (Módulos 1 + 2 + 3)',
      listPrice: 2500000,
      discountLabel: 'Beneficio Alianza purrpurr.dev × Speedlight (-28% OFF)',
      discountPercentage: 28,
      discountAmount: 700000,
      total: 1800000,
      description:
        'Las 3 etapas llave en mano: Motor de Cotizaciones ($ 800k) + Pasarela & Dispersión Wompi ($ 600k) + Panel CRM de Citas ($ 400k). Lista $ 2.500.000 → $ 1.800.000 COP.',
      advancePaymentLabel: 'Anticipo 50%',
      advancePaymentAmount: 900000,
      balancePaymentLabel: 'Saldo contra entrega',
      balancePaymentAmount: 900000,
    },
  ],
  blocks: [
    {
      title: 'Esquema de Pago 50/50',
      lines: [
        {
          label: 'Inicio',
          text: '50% de anticipo al aprobar la modalidad elegida.',
        },
        {
          label: 'Entrega',
          text: '50% contra verificación funcional en producción (valor neto cerrado · Régimen No Responsable de IVA).',
        },
      ],
    },
    {
      title: 'Propiedad & Despliegue',
      lines: [
        {
          label: 'Datos',
          text: 'Base de datos, catálogo, operarios y panel CRM 100% propiedad del cliente.',
        },
        {
          label: 'Infra',
          text: 'Despliegue independiente en dominio propio sin dependencia de terceros.',
        },
      ],
    },
    {
      title: 'Garantía & Respaldo',
      lines: [
        {
          label: 'Cobertura',
          text: 'Respaldo conjunto purrpurr.dev × Speedlight Culture.',
        },
        {
          label: 'Soporte',
          text: '60 días de soporte técnico continuo y ajustes operativos post-lanzamiento.',
        },
      ],
    },
  ],
  speedlightUrl:
    'https://speedlightculture.com/cotizaciones?id=PROP-JL-2026-094',
  checkoutBaseUrl:
    'https://speedlightculture.com/checkout?doc=prop-julian-lotero-software-001',
  whatsappSummary: `📄 *PROPUESTA EN ALIANZA · PURRPURR.DEV × SPEEDLIGHT CULTURE*
👤 *Cliente:* Julián Lotero · Marca Independiente
📋 *Código:* PROP-JL-2026-094 • Bogotá D.C.
💻 *Proyecto:* Sistema Web de Cotizaciones A4, Agenda & Dispersión Wompi

✨ *DESGLOSE POR ETAPAS & MÓDULOS:*
1️⃣ *Etapa 1 (Sem 1) · Motor Cotizaciones & PDF A4:* ~$1.000.000~ → *$ 800.000 COP*
2️⃣ *Etapa 2 (Sem 2) · Pasarela & Dispersión Wompi:* ~$800.000~ → *$ 600.000 COP*
3️⃣ *Etapa 3 (Sem 3) · Panel Administrativo CRM:* ~$700.000~ → *$ 400.000 COP*

💰 *Tarifa Regular Lista (purrpurr.dev):* ~$ 2.500.000 COP~
⭐ *Beneficio Alianza purrpurr.dev × Speedlight (-28% OFF):* -$ 700.000 COP
🔥 *OPCIÓN 1 (Solo Módulo 1):* *$ 800.000 COP* (50% anticipo $ 400.000 / 50% saldo $ 400.000)
🔥 *OPCIÓN 2 (Sistema Integral 1+2+3):* *$ 1.800.000 COP* (50% anticipo $ 900.000 / 50% saldo $ 900.000)
💳 *Valor neto cerrado (Régimen No Responsable de IVA)* · Entrega 15 a 20 días hábiles.
🔗 *Ver en Speedlight:* https://speedlightculture.com/cotizaciones?id=PROP-JL-2026-094`,
};
