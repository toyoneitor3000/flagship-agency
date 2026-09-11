// ============================================================================
// PROPUESTA ACTIVA EN CURSO - ACTUALIZADA DIRECTAMENTE POR EL ASISTENTE (ORQUESTADOR)
// ============================================================================

export interface ActiveProposalConfig {
  clientName: string;
  projectName: string;
  date: string;
  hasSpeedlightDiscount: boolean;
  scope: string;
  phase1: {
    title: string;
    price: string;
    originalPrice?: string;
    features: string[];
  };
  phase2: {
    title: string;
    price: string;
    originalPrice?: string;
    features: string[];
  };
  timeline: string[];
  paymentTerms: string[];
  taxNote: string;
}

export const ACTIVE_PROPOSAL: ActiveProposalConfig = {
  clientName: 'Cliente / Marca Comercial',
  projectName: 'Sistema Web Multipágina con E-Commerce & Pasarela de Pagos',
  date: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
  hasSpeedlightDiscount: true,
  scope: 'Desarrollo de ecosistema digital multipágina de alto rendimiento con tienda online (E-Commerce) integrada. Autoadministrable, optimizado para conversión, catálogo dinámico con variantes, pasarela de pagos automatizada y arquitectura SEO de última generación.',
  phase1: {
    title: 'Fase 1: Construcción & Despliegue E-Commerce',
    price: '$1,540,000 COP',
    originalPrice: '$2,200,000 COP',
    features: [
      'Arquitectura Multipágina (Inicio, Catálogo, Nosotros, Blog, Contacto, Políticas)',
      'Catálogo E-Commerce Dinámico (Filtros, Categorías, Variantes y Stock)',
      'Carrito de Compras y Checkout Optimizado sin Fricción',
      'Integración Pasarela de Pagos (Wompi, MercadoPago, Bold - PSE, Nequi, Tarjetas)',
      'Panel de Administración CMS (Subir/Editar productos, precios y pedidos)',
      'Notificaciones automáticas por WhatsApp y Correo Electrónico'
    ]
  },
  phase2: {
    title: 'Fase 2: Operación Cloud, Soporte Técnico & Acompañamiento',
    price: '$1,260,000 COP / Año',
    originalPrice: '$1,800,000 COP / Año',
    features: [
      'Renovación Anual de Dominio .com y Gestión de Registros DNS',
      'Servidor Cloud NVMe de Alta Disponibilidad con Certificados SSL',
      'Copias de Seguridad (Backups) Diarias Automatizadas',
      'Mantenimiento Preventivo y Parches de Seguridad en Código',
      'Acompañamiento Técnico Continuo y Monitoreo Uptime 24/7'
    ]
  },
  timeline: [
    '3 a 4 Semanas de Desarrollo Estimadas.',
    'Semana 1: Kickoff, Arquitectura de Información y Aprobación UI/UX.',
    'Semana 2: Desarrollo Multipágina y Motor de Catálogo/Tienda.',
    'Semana 3: Integración de Pasarela de Pagos y Pruebas Transaccionales (Beta).',
    'Semana 4: Despliegue en Dominio Oficial, Entrega de Accesos y Capacitación.'
  ],
  paymentTerms: [
    'Cuota 1 (40% - $616,000 COP): Anticipo al inicio del proyecto y diseño UI.',
    'Cuota 2 (30% - $462,000 COP): Contra-entrega de versión Beta funcional y catálogo.',
    'Cuota 3 (30% - $462,000 COP): Despliegue en producción final y entrega de accesos.',
    'Beneficio Especial: -30% Alianza Speedlight Culture aplicado (Cupón SPEEDLIGHT-30).',
    'Métodos: Transferencia Bancolombia, Nequi, Daviplata o PSE.'
  ],
  taxNote: 'Cotización sin IVA (No responsable de IVA - Art. 437 E.T.). Se expide Factura Legal Electrónica como Persona Natural (o Cuenta de Cobro formal con RUT y Seguridad Social), 100% válida y deducible tributariamente.'
};
