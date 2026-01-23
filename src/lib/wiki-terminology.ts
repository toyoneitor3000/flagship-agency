
import { Search, Server, Globe, Cpu, LayoutTemplate, Database, Bot, ShoppingCart, ShieldCheck, Activity, Layers, Code2 } from 'lucide-react';

// Simplified categories for the linker, icons will be handled in the UI mapping if needed, 
// strictly we just need the definition and slug here, but let's keep the full object for the Wiki page.

export type WikiTerm = {
    term: string;
    slug: string; // for URL linking #slug
    category: string;
    def: string;
    iconType?: 'infra' | 'web' | 'tech' | 'ui' | 'data' | 'ai' | 'commerce' | 'security' | 'biz';
};

export const wikiDatabase: WikiTerm[] = [
    // INFRAESTRUCTURA BASE
    {
        term: 'Hosting',
        slug: 'hosting',
        category: 'Infraestructura',
        iconType: 'infra',
        def: 'El "terreno" digital en la nube donde vive tu sitio web. Sin hosting, tu código no tiene dónde ejecutarse ni ser visto por el mundo.'
    },
    {
        term: 'Dominio',
        slug: 'dominio',
        category: 'Infraestructura',
        iconType: 'web',
        def: 'Tu dirección única en internet (ej. tupurrr.com). Es como la dirección catastral de tu terreno digital para que la gente te encuentre.'
    },
    {
        term: 'Servidor',
        slug: 'servidor',
        category: 'Infraestructura',
        iconType: 'infra',
        def: 'El computador potente en la nube que procesa las peticiones de tus usuarios y les devuelve tu página web al instante.'
    },
    {
        term: 'Serverless',
        slug: 'serverless',
        category: 'Tecnología Avanzada',
        iconType: 'tech',
        def: 'Una arquitectura moderna donde no pagas por un servidor prendido las 24h, sino solo cuando alguien visita tu web. Escala infinito y es más eficiente.'
    },
    {
        term: 'Despliegue',
        slug: 'despliegue',
        category: 'Desarrollo',
        iconType: 'tech',
        def: 'El acto de "subir" el código nuevo a producción. El momento exacto en que los cambios que trabajamos se hacen visibles para todo el mundo.'
    },
    {
        term: 'Nube Privada',
        slug: 'nube-privada',
        category: 'Infraestructura',
        iconType: 'security',
        def: 'Infraestructura dedicada solo para ti. Como tener tu propio edificio de servidores blindado y aislado, en vez de alquilar una oficina en un coworking (Nube Pública).'
    },

    // EXPERIENCIA Y DISEÑO
    {
        term: 'Landing Page',
        slug: 'landing-page',
        category: 'Web',
        iconType: 'ui',
        def: 'Una página diseñada con un solo objetivo: convertir visitas en clientes (vender o capturar datos). No tiene distracciones ni menús complejos.'
    },
    {
        term: 'Sistema Multipágina',
        slug: 'sistema-multipagina',
        category: 'Web',
        iconType: 'ui',
        def: 'Un sitio web completo con secciones interconectadas (Inicio, Nosotros, Servicios, Contacto). Ideal para dar una imagen corporativa robusta.'
    },
    {
        term: 'UI / UX',
        slug: 'ui-ux',
        category: 'Diseño',
        iconType: 'ui',
        def: 'UI (Interfaz) es cómo se ve: colores y estética. UX (Experiencia) es cómo se siente: que sea fácil, intuitivo y no frustre al usuario.'
    },
    {
        term: 'WebGL',
        slug: 'webgl',
        category: 'Diseño 3D',
        iconType: 'ui',
        def: 'Tecnología avanzada para mostrar gráficos 3D interactivos en el navegador. Permite experiencias visuales inmersivas tipo videojuego en tu web.'
    },

    // FUNCIONALIDAD
    {
        term: 'CMS Autoadministrable',
        slug: 'cms',
        category: 'Herramientas',
        iconType: 'web',
        def: 'Sistema de Gestión de Contenidos. Te permite cambiar textos, fotos y precios de tu web fácilmente sin saber programar y sin depender de nosotros.'
    },
    {
        term: 'Blog',
        slug: 'blog',
        category: 'Contenido',
        iconType: 'web',
        def: 'Tu canal de noticias propio. Fundamental para SEO (Google ama el contenido fresco) y para demostrar autoridad en tu industria.'
    },
    {
        term: 'Dashboard',
        slug: 'dashboard',
        category: 'Gestión',
        iconType: 'biz',
        def: 'Un panel de control privado donde ves qué pasa en tu negocio. Gráficas, usuarios, ventas... la cabina de mando de tu nave.'
    },
    {
        term: 'Panel Financiero',
        slug: 'panel-financiero',
        category: 'Gestión',
        iconType: 'biz',
        def: 'Una sección del Dashboard dedicada a ver dinero: ingresos, egresos, proyecciones y márgenes en tiempo real.'
    },
    {
        term: 'AOS',
        slug: 'aos',
        category: 'Ingeniería de Negocio',
        iconType: 'biz',
        def: 'Agency Operating System. La infraestructura técnica y lógica que permite a una agencia automatizar sus procesos, desde la captura de leads hasta la entrega final, eliminando el caos operativo.'
    },
    {
        term: 'SAOS',
        slug: 'saos',
        category: 'Ingeniería de Negocio',
        iconType: 'biz',
        def: 'Subscription Agency Operating System. Una evolución del AOS diseñada específicamente para modelos de suscripción. Permite gestionar ingresos recurrentes, pedidos ilimitados y flujos de trabajo escalables sin aumentar la carga operativa.'
    },

    // E-COMMERCE
    {
        term: 'eCommerce',
        slug: 'ecommerce',
        category: 'Comercio',
        iconType: 'commerce',
        def: 'Tu tienda online completa. Catálogo, carrito, procesamiento de pagos e inventario. Tu sucursal abierta al mundo 24/7.'
    },
    {
        term: 'Checkout',
        slug: 'checkout',
        category: 'Comercio',
        iconType: 'commerce',
        def: 'El punto crítico de pago. Una pasarela segura donde el cliente pone su tarjeta. Un buen checkout está optimizado para evitar abandonos.'
    },
    {
        term: 'Integración Logística',
        slug: 'logistica',
        category: 'Comercio',
        iconType: 'commerce',
        def: 'Conectar tu tienda online directamente con transportadoras (ej. Coordinadora, FedEx). Genera guías de envío automáticamente al vender.'
    },

    // DATA E INTELIGENCIA
    {
        term: 'CRM',
        slug: 'crm',
        category: 'Datos',
        iconType: 'data',
        def: 'Gestión de Relación con Clientes. Una base de datos inteligente que sabe quién te compró, cuándo, y qué le interesa. El cerebro de tus ventas.'
    },
    {
        term: 'Analítica',
        slug: 'analitica',
        category: 'Datos',
        iconType: 'data',
        def: 'El estudio de los datos de tus visitas. ¿De dónde vienen? ¿Por qué se van? La brújula matemática para mejorar tu negocio.'
    },
    {
        term: 'Data Engine',
        slug: 'data-engine',
        category: 'Datos',
        iconType: 'data',
        def: 'Un motor de procesamiento masivo. Toma información desordenada de muchas fuentes y la convierte en reportes estructurados y utilizables.'
    },
    {
        term: 'Asistente Digital',
        slug: 'asistente-digital',
        category: 'Inteligencia Artificial',
        iconType: 'ai',
        def: 'Un agente de IA entrenado con TU información que atiende clientes 24/7 en tu web, respondiendo preguntas y guiando ventas sin descanso.'
    },
    {
        term: 'Modelo AI RAG',
        slug: 'ai-rag',
        category: 'Inteligencia Artificial',
        iconType: 'ai',
        def: 'Retrieval-Augmented Generation. Una IA que no inventa, sino que consulta TU base de conocimientos (PDFs, manuales) antes de responder con precisión.'
    },

    // CORPORATIVO Y SEGURIDAD
    {
        term: 'SEO',
        slug: 'seo',
        category: 'Marketing',
        iconType: 'web',
        def: 'Posicionamiento en Buscadores. El arte técnico de convencer a Google de que tu página es la mejor respuesta, para aparecer primero sin pagar anuncios.'
    },
    {
        term: 'Sistema de Autenticación',
        slug: 'autenticacion',
        category: 'Seguridad',
        iconType: 'security',
        def: 'El "portero" de seguridad. Gestiona quién entra (Login), registros seguros y qué permisos tiene cada usuario (Admin vs Cliente).'
    },
    {
        term: 'Auditoría',
        slug: 'auditoria',
        category: 'Seguridad',
        iconType: 'security',
        def: 'Una revisión forense profunda de tu código. Buscamos grietas de seguridad, ineficiencias y problemas ocultos antes de que causen fallos.'
    },
    {
        term: 'Análisis de Arquitectura',
        slug: 'arquitectura',
        category: 'Ingeniería',
        iconType: 'infra',
        def: 'El plano de ingeniería antes de construir. Definimos qué tecnologías usar y cómo se conectarán para que el sistema soporte el crecimiento futuro.'
    },
    {
        term: 'SAP / Oracle',
        slug: 'sap-oracle',
        category: 'Enterprise',
        iconType: 'biz',
        def: 'Sistemas ERP gigantescos usados por multinacionales. Si tu empresa ya los usa, nosotros creamos los puentes para conectarnos a ellos.'
    },
    {
        term: 'Buyout',
        slug: 'buyout',
        category: 'Negocio',
        iconType: 'biz',
        def: 'La opción de pagar una suma única para recibir todo el código fuente y propiedad intelectual. Te vuelves dueño absoluto y dejas de pagar mensualidades, pero asumes el mantenimiento.'
    }
];
