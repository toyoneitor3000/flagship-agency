// ============================================================================
// SINGLE SOURCE OF TRUTH: TARIFAS, INFRAESTRUCTURA Y DESCUENTOS PURRPURR / FLAGSHIP
// ============================================================================

export interface PlanConfig {
  id: string;
  name: string;
  slug: string;
  category: 'web' | 'system' | 'venture';
  setupPriceCOP: number;
  setupPriceUSD: number;
  annualInfraCOP: number;
  annualInfraUSD: number;
  monthlyInfraCOP: number;
  monthlyInfraUSD: number;
  hours: number | string;
  description: string;
  scopePreset: string;
  features: string[];
  specs: {
    storage: string;
    bandwidth: string;
    compute: string;
    changes: string;
  };
  infraDetail: string;
}

export const SPEEDLIGHT_DISCOUNT_RATE = 0.30; // 30% descuento comunidad Speedlight

export const BASE_PLANS: PlanConfig[] = [
  {
    id: 'semilla',
    name: 'Plan Semilla (Start)',
    slug: 'semilla',
    category: 'web',
    setupPriceCOP: 350000,
    setupPriceUSD: 95,
    annualInfraCOP: 250000,
    annualInfraUSD: 65,
    monthlyInfraCOP: 15000,
    monthlyInfraUSD: 4,
    hours: 8,
    description: 'El punto de partida ideal. Tu espacio digital profesional, accesible y sin barreras.',
    scopePreset: 'Desarrollo de página de aterrizaje (Landing Page) optimizada para conversión directa y presencia digital inicial.',
    features: [
      'Diseño Web Profesional (Landing Page)',
      'Panel de Control (CMS Autoadministrable)',
      '1 Dominio .com Incluido',
      'Asistente Digital 24/7'
    ],
    specs: {
      storage: '5 GB NVMe SSD',
      bandwidth: '100 GB Transferencia',
      compute: 'Serverless (Shared CPU)',
      changes: 'Solo Contenido (CMS)'
    },
    infraDetail: 'Infraestructura Base: Cubre los esenciales técnicos (Dominio, SSL, DNS) para mantener el sitio online y seguro.'
  },
  {
    id: 'pro',
    name: 'Plan Profesional (Services)',
    slug: 'pro',
    category: 'web',
    setupPriceCOP: 850000,
    setupPriceUSD: 220,
    annualInfraCOP: 950000,
    annualInfraUSD: 250,
    monthlyInfraCOP: 95000,
    monthlyInfraUSD: 25,
    hours: 24,
    description: 'Para consultores y marcas. Blog, captación de clientes y presencia corporativa seria.',
    scopePreset: 'Desarrollo de sitio web corporativo institucional con blog, gestor de contenidos dinámicos (CMS), captura de clientes potenciales y optimización SEO integral.',
    features: [
      'Sitio Multi-Página (Inicio, Servicios, Nosotros, Blog, Contacto)',
      'CMS Autoadministrable para Blog y Noticias',
      'Formularios CRM & Integración directa a WhatsApp',
      'Optimización SEO Técnica Integral',
      'Diseño UI/UX Personalizado e Identidad de Marca'
    ],
    specs: {
      storage: '20 GB NVMe SSD',
      bandwidth: '500 GB Transferencia',
      compute: 'Serverless (Fast Edge)',
      changes: 'Ajustes de Diseño & Contenido'
    },
    infraDetail: 'Recursos Dinámicos: Un CMS consume recursos activos (Base de Datos & CPU). Incluye Backups diarios para proteger tu contenido.'
  },
  {
    id: 'store',
    name: 'Plan Comercio (Store / E-Commerce)',
    slug: 'store',
    category: 'web',
    setupPriceCOP: 2200000,
    setupPriceUSD: 580,
    annualInfraCOP: 1800000,
    annualInfraUSD: 480,
    monthlyInfraCOP: 180000,
    monthlyInfraUSD: 50,
    hours: 48,
    description: 'Vende sin comisiones por venta. Catálogo autoadministrable y pasarela de pago.',
    scopePreset: 'Desarrollo de ecosistema digital multipágina de alto rendimiento con tienda online (E-Commerce) integrada. Autoadministrable, optimizado para conversión, catálogo dinámico con variantes, pasarela de pagos automatizada y arquitectura SEO de última generación.',
    features: [
      'Arquitectura Multipágina (Inicio, Catálogo, Nosotros, Blog, Contacto, Políticas)',
      'Catálogo E-Commerce Dinámico (Filtros, Categorías, Variantes y Stock)',
      'Carrito de Compras y Checkout Optimizado sin Fricción',
      'Integración Pasarela de Pagos (Wompi, MercadoPago, Bold - PSE, Nequi, Tarjetas)',
      'Panel de Administración CMS (Subir/Editar productos, precios y pedidos)',
      'Notificaciones automáticas por WhatsApp y Correo Electrónico'
    ],
    specs: {
      storage: '50 GB NVMe SSD',
      bandwidth: '1 TB Transferencia',
      compute: 'Container Dedicado (2 vCPU)',
      changes: 'Soporte Funcional Completo'
    },
    infraDetail: 'E-Commerce Cloud: Contenedores dedicados para soportar picos de tráfico en ventas, transacciones concurrentes y aislamiento de pagos.'
  },
  {
    id: 'system',
    name: 'Web App / Sistema',
    slug: 'system',
    category: 'system',
    setupPriceCOP: 4500000,
    setupPriceUSD: 1200,
    annualInfraCOP: 2500000,
    annualInfraUSD: 650,
    monthlyInfraCOP: 250000,
    monthlyInfraUSD: 65,
    hours: 80,
    description: 'Software a medida con usuarios y datos.',
    scopePreset: 'Desarrollo de aplicación web dinámica a medida con arquitectura cloud escalable, autenticación de usuarios y base de datos relacional.',
    features: [
      'Arquitectura de Software a Medida (Frontend + Backend + Base de Datos)',
      'Autenticación Segura y Roles de Usuario',
      'Panel de Administración y Métricas',
      'API REST / GraphQL Escalable',
      'Despliegue Cloud en Infraestructura Dedicada'
    ],
    specs: {
      storage: '100 GB NVMe SSD',
      bandwidth: '2 TB Transferencia',
      compute: 'Dedicated Cluster',
      changes: 'Soporte de Arquitectura & Código'
    },
    infraDetail: 'Infraestructura Enterprise con balanceador de carga y replicación de base de datos.'
  },
  {
    id: 'venture',
    name: 'Venture (Startup)',
    slug: 'venture',
    category: 'venture',
    setupPriceCOP: 12000000,
    setupPriceUSD: 3200,
    annualInfraCOP: 0,
    annualInfraUSD: 0,
    monthlyInfraCOP: 0,
    monthlyInfraUSD: 0,
    hours: 160,
    description: 'Producto digital desde cero (MVP).',
    scopePreset: 'Construcción y aceleración de Producto Mínimo Viable (MVP) para startups, desde conceptualización hasta tracción en mercado.',
    features: [
      'Discovery & Prototipado UX/UI Completo',
      'Desarrollo MVP Fullstack de Alto Rendimiento',
      'Infraestructura Serverless Auto-escalable',
      'Setup de Analítica y Embudo de Conversión',
      'Acompañamiento Estratégico de Lanzamiento'
    ],
    specs: {
      storage: 'Ilimitado Cloud Elastic',
      bandwidth: 'Multi-región CDN',
      compute: 'Serverless Edge Global',
      changes: 'Sprint Iterativo Continuo'
    },
    infraDetail: 'Arquitectura nativa en la nube diseñada para rondas de inversión y tracción acelerada.'
  }
];

// UTILIDADES MATEMÁTICAS PURAS
export const formatMoneyCOP = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(Math.round(amount));
};

export interface CalculatedPricing {
  originalSetup: number;
  discountedSetup: number;
  setupSavings: number;
  formattedSetup: string;
  formattedOriginalSetup: string;

  originalAnnual: number;
  discountedAnnual: number;
  annualSavings: number;
  formattedAnnual: string;
  formattedOriginalAnnual: string;

  installments: {
    name: string;
    percentage: number;
    amount: number;
    formatted: string;
    description: string;
  }[];
  paymentTermsText: string;
}

export function calculatePlanPricing(plan: PlanConfig, applySpeedlightDiscount: boolean): CalculatedPricing {
  const discountMultiplier = applySpeedlightDiscount ? (1 - SPEEDLIGHT_DISCOUNT_RATE) : 1;

  const originalSetup = plan.setupPriceCOP;
  const discountedSetup = Math.round(originalSetup * discountMultiplier);
  const setupSavings = originalSetup - discountedSetup;

  const originalAnnual = plan.annualInfraCOP;
  const discountedAnnual = Math.round(originalAnnual * discountMultiplier);
  const annualSavings = originalAnnual - discountedAnnual;

  // Split en cuotas: 40% anticipo, 30% beta, 30% entrega final
  const c1 = Math.round(discountedSetup * 0.40);
  const c2 = Math.round(discountedSetup * 0.30);
  const c3 = discountedSetup - c1 - c2; // Garantiza suma exacta al peso

  const installments = [
    {
      name: 'Cuota 1 (40%)',
      percentage: 40,
      amount: c1,
      formatted: formatMoneyCOP(c1) + ' COP',
      description: 'Anticipo al inicio del proyecto y diseño UI.'
    },
    {
      name: 'Cuota 2 (30%)',
      percentage: 30,
      amount: c2,
      formatted: formatMoneyCOP(c2) + ' COP',
      description: 'Contra-entrega de versión Beta funcional y catálogo.'
    },
    {
      name: 'Cuota 3 (30%)',
      percentage: 30,
      amount: c3,
      formatted: formatMoneyCOP(c3) + ' COP',
      description: 'Despliegue en producción final y entrega de accesos.'
    }
  ];

  const termsLines = [
    `Cuota 1 (40% - ${formatMoneyCOP(c1)} COP): Anticipo al inicio del proyecto y diseño UI.`,
    `Cuota 2 (30% - ${formatMoneyCOP(c2)} COP): Contra-entrega de versión Beta funcional y catálogo.`,
    `Cuota 3 (30% - ${formatMoneyCOP(c3)} COP): Despliegue en producción final y entrega de accesos.`
  ];

  if (applySpeedlightDiscount) {
    termsLines.push(`Beneficio Especial: -30% Alianza Speedlight Culture aplicado (Cupón SPEEDLIGHT-30).`);
  }
  termsLines.push(`Métodos: Transferencia Bancolombia, Nequi, Daviplata o PSE.`);

  return {
    originalSetup,
    discountedSetup,
    setupSavings,
    formattedSetup: formatMoneyCOP(discountedSetup) + ' COP',
    formattedOriginalSetup: formatMoneyCOP(originalSetup) + ' COP',

    originalAnnual,
    discountedAnnual,
    annualSavings,
    formattedAnnual: formatMoneyCOP(discountedAnnual) + ' COP / Año',
    formattedOriginalAnnual: formatMoneyCOP(originalAnnual) + ' COP / Año',

    installments,
    paymentTermsText: termsLines.join('\n')
  };
}
