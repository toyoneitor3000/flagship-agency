export interface ChecklistItem {
    id: string;
    phase: 1 | 2 | 3 | 4;
    phaseTitle: string;
    weekRange: string;
    title: string;
    description: string;
    deliverables: string[];
    technicalDetails: string;
    completed: boolean;
    completedAt?: string;
    keyFiles: string[];
    category: 'identidad' | '3d-engine' | 'marketplace' | 'pasarela-pagos' | 'infra';
}

export interface Phase {
    id: string;
    phaseNumber: 1 | 2 | 3 | 4;
    title: string;
    subtitle: string;
    weekRange: string;
    description: string;
    items: ChecklistItem[];
}

export const HYBRID_LAB_CHECKLIST: ChecklistItem[] = [
    // --- FASE 1: IDENTIDAD VISUAL, VECTORES Y ARQUITECTURA MULTIPÁGINA ---
    {
        id: 'hibrido-1.1-brand-identity',
        phase: 1,
        phaseTitle: 'Fase 1: Identidad Visual, Activos y Arquitectura Multipágina',
        weekRange: 'Semanas 1-2',
        title: 'Ingesta de Manual de Marca, Paleta de Color y Tipografía',
        description: 'Estandarización de la identidad visual de Híbrido Lab Creativo: paleta cromática (#52388d, acentos magenta, cian y naranja), tipografía Space Grotesk y logos oficiales en alta resolución.',
        deliverables: [
            'Configuración de tokens cromáticos de Híbrido Lab en Tailwind y CSS globals',
            'Integración de logo oficial en variantes blanco y negro en /public/clients/hibrido-lab',
            'Definición de micro-estilos para auras oscuras, contrastes y sombras de logotipo'
        ],
        technicalDetails: 'Tokens cromáticos centralizados (#52388d), imágenes SVG y PNG vectoriales en public/clients/hibrido-lab.',
        completed: true,
        completedAt: '2026-10-02',
        keyFiles: ['src/app/hibrido/layout.tsx', 'public/clients/hibrido-lab/Logo completo_blanco.png'],
        category: 'identidad'
    },
    {
        id: 'hibrido-1.2-vector-pipeline',
        phase: 1,
        phaseTitle: 'Fase 1: Identidad Visual, Activos y Arquitectura Multipágina',
        weekRange: 'Semanas 1-2',
        title: 'Pipeline de Vectores Adobe Illustrator (.ai a SVG) e Iconos',
        description: 'Herramientas y scripts para leer, procesar y convertir archivos .ai de Adobe Illustrator a vectores SVG limpios para su uso en la web. Generación del set de iconos de navegación.',
        deliverables: [
            'Instalación y configuración de PyMuPDF, pypdf y herramientas de extracción vectorial',
            'Creación del set de iconos SVG: Conócenos, Productos, Experiencias, Recicla y Clientes',
            'Soporte para logotipos de Dinamita Mood y Plástico con Final Feliz en SVG'
        ],
        technicalDetails: 'PyMuPDF y scripts de extracción en scratch/venv; SVGs vectoriales nativos en public/clients/hibrido-lab/icons/.',
        completed: true,
        completedAt: '2026-10-02',
        keyFiles: [
            'public/clients/hibrido-lab/icons/icono_conocenos.svg',
            'public/clients/hibrido-lab/icons/icono_productos.svg',
            'public/clients/hibrido-lab/icons/icono_experiencias.svg',
            'public/clients/hibrido-lab/icons/icono_recicla.svg',
            'public/clients/hibrido-lab/icons/icono_clientes.svg'
        ],
        category: 'identidad'
    },
    {
        id: 'hibrido-1.3-header-navigation',
        phase: 1,
        phaseTitle: 'Fase 1: Identidad Visual, Activos y Arquitectura Multipágina',
        weekRange: 'Semanas 1-2',
        title: 'Header Líquido Interactivo con Barra de Píldoras e Iconos',
        description: 'Maquetación del navbar principal exactamente según el boceto del cliente: logo a la izquierda, cinta de gradiente cósmico fluido y píldoras interactivas con sus respectivos iconos debajo.',
        deliverables: [
            'Componente HibridoHeader con backdrop blur y efecto de aura líquida',
            'Píldoras de navegación: Conócenos, Productos, Experiencias, Recicla y Clientes',
            'Accesos rápidos a las divisiones: - pelos + amor y Dinamita Mood'
        ],
        technicalDetails: 'Componente Next.js Client con Tailwind CSS, Framer Motion y SVG renders dinámicos.',
        completed: true,
        completedAt: '2026-10-02',
        keyFiles: ['src/components/hibrido/Header.tsx'],
        category: 'identidad'
    },
    {
        id: 'hibrido-1.4-multipage-routing',
        phase: 1,
        phaseTitle: 'Fase 1: Identidad Visual, Activos y Arquitectura Multipágina',
        weekRange: 'Semanas 1-2',
        title: 'Arquitectura y Enrutamiento Multipágina del Laboratorio',
        description: 'Estructuración completa del sistema de páginas dedicadas: portal central, página de - pelos + amor, página de Plástico con final feliz y página de Dinamita Mood.',
        deliverables: [
            'Landing principal interactiva en /hibrido',
            'Landing temática para - pelos + amor en /hibrido/pelos-amor',
            'Landing temática para Plástico con final feliz en /hibrido/plastico-final-feliz',
            'Landing temática para Dinamita Mood en /hibrido/dinamita'
        ],
        technicalDetails: 'Next.js App Router con layout compartido, SEO metatags y Open Graph para WhatsApp y redes sociales.',
        completed: true,
        completedAt: '2026-10-02',
        keyFiles: [
            'src/app/hibrido/page.tsx',
            'src/app/hibrido/pelos-amor/page.tsx',
            'src/app/hibrido/plastico-final-feliz/page.tsx',
            'src/app/hibrido/dinamita/page.tsx'
        ],
        category: 'infra'
    },

    // --- FASE 2: MOTOR 3D INTERACTIVO DE PRODUCTO (GOMUNATOR & OBJETOS) ---
    {
        id: 'hibrido-2.1-webgl-r3f-engine',
        phase: 2,
        phaseTitle: 'Fase 2: Motor 3D Interactivo de Producto (El Gomunator & Colección)',
        weekRange: 'Semanas 3-4',
        title: 'Infraestructura WebGL con Three.js y React Three Fiber',
        description: 'Pipeline de renderizado 3D en cliente con Canvas WebGL acelerado por hardware, iluminación de estudio multicapa, sombras de contacto y rotación procedural fluida.',
        deliverables: [
            'Componente ModelViewer3D configurado con @react-three/fiber y @react-three/drei',
            'Sistema de luces: directional, ambient y luces puntuales de acento cian/magenta',
            'Soporte para Float animations y sombras de contacto dinámicas'
        ],
        technicalDetails: 'Canvas con ssr: false, gestión de memoria GPU, antialiasing y fallback automático.',
        completed: true,
        completedAt: '2026-10-02',
        keyFiles: ['src/components/hibrido/ModelViewer3D.tsx'],
        category: '3d-engine'
    },
    {
        id: 'hibrido-2.2-gomunator-360-viewer',
        phase: 2,
        phaseTitle: 'Fase 2: Motor 3D Interactivo de Producto (El Gomunator & Colección)',
        weekRange: 'Semanas 3-4',
        title: 'Visor 3D Interactivo en 360° para "El Gomunator"',
        description: 'Modelo interactivo de El Gomunator con OrbitControls para rotación de 360°, zoom milimétrico y selector interactivo de variantes de acabado y color de silicona.',
        deliverables: [
            'Modelo procedural con cuerpo ergonómico, nervaduras de tracción y empuñadura',
            'Selector de materiales y colores: Híbrido Purple, Toxic Violet, Cyber Magenta, Volcanic Orange',
            'Toggle para auto-rotación y controles táctiles para dispositivos móviles'
        ],
        technicalDetails: 'Mesh interactivo con Three.js Standard Material, roughness, metalness y orbit controls con restricciones de zoom.',
        completed: true,
        completedAt: '2026-10-02',
        keyFiles: ['src/components/hibrido/ModelViewer3D.tsx', 'src/app/hibrido/pelos-amor/page.tsx'],
        category: '3d-engine'
    },
    {
        id: 'hibrido-2.3-gltf-ingestion',
        phase: 2,
        phaseTitle: 'Fase 2: Motor 3D Interactivo de Producto (El Gomunator & Colección)',
        weekRange: 'Semanas 3-4',
        title: 'Ingesta y Optimización de Archivos 3D del Cliente (.glb / .obj / .stl)',
        description: 'Procesamiento de los modelos 3D originales provistos en el Google Drive de Híbrido Lab. Conversión, optimización con compresión Draco y carga progresiva con useGLTF.',
        deliverables: [
            'Pipeline de inspección y validación con biblioteca trimesh en Python',
            'Compresión Draco / Meshopt para reducir peso de archivos de 20MB a <1.5MB',
            'Precarga de modelos en caché del navegador con Skeleton Loader'
        ],
        technicalDetails: 'Integración useGLTF.preload(), decodificadores DRACOLoader para Next.js.',
        completed: false,
        keyFiles: ['src/components/hibrido/ModelViewer3D.tsx'],
        category: '3d-engine'
    },
    {
        id: 'hibrido-2.4-hotspots-interactive',
        phase: 2,
        phaseTitle: 'Fase 2: Motor 3D Interactivo de Producto (El Gomunator & Colección)',
        weekRange: 'Semanas 3-4',
        title: 'Hotspots Interactivos y Despiece Técnico 3D',
        description: 'Puntos de información interactivos anclados en coordenadas 3D para destacar beneficios del polímero lavable, ergonomía y modo de uso.',
        deliverables: [
            'Marcadores 3D reactivos que se proyectan a coordenadas de pantalla (Html de Drei)',
            'Tooltips informativos con animación al hacer hover o tap',
            'Botón de vista explosionada / componentes del producto'
        ],
        technicalDetails: 'Uso de Drei <Html occlude> para anclar elementos React DOM directamente sobre la geometría 3D.',
        completed: false,
        keyFiles: ['src/components/hibrido/ModelViewer3D.tsx'],
        category: '3d-engine'
    },

    // --- FASE 3: MARKETPLACE & CATÁLOGO E-COMMERCE HÍBRIDO ---
    {
        id: 'hibrido-3.1-unified-catalog',
        phase: 3,
        phaseTitle: 'Fase 3: Marketplace & Catálogo E-Commerce Híbrido',
        weekRange: 'Semanas 5-6',
        title: 'Catálogo Unificado Multi-División con Filtros',
        description: 'Plataforma de marketplace con filtrado instantáneo por las tres divisiones de negocio: - pelos + amor (Gomunator 3D), Plástico con final feliz (objetos upcycling) y Dinamita (ropa streetwear).',
        deliverables: [
            'Vista de cuadrícula responsiva con tarjetas de producto de alta fidelidad',
            'Filtros por división con conteos en tiempo real',
            'Badge de acceso directo a visualización 3D para productos compatibles'
        ],
        technicalDetails: 'Filtros optimistas sin recarga de página en Next.js con Tailwind y estado local reactivo.',
        completed: true,
        completedAt: '2026-10-02',
        keyFiles: ['src/app/hibrido/marketplace/page.tsx'],
        category: 'marketplace'
    },
    {
        id: 'hibrido-3.2-global-cart-drawer',
        phase: 3,
        phaseTitle: 'Fase 3: Marketplace & Catálogo E-Commerce Híbrido',
        weekRange: 'Semanas 5-6',
        title: 'Carrito de Compras Global (Cart Drawer) con Persistencia',
        description: 'Drawer lateral interactivo para gestión de compras: adición de productos, selector de cantidades, cálculo automático de subtotal en COP y persistencia en LocalStorage.',
        deliverables: [
            'Panel deslizante Cart Drawer con animación fluida y backdrop blur',
            'Gestión de cantidades (incrementar, decrementar, eliminar ítem)',
            'Cálculo de impuestos y costos de envío estimados para Colombia'
        ],
        technicalDetails: 'Estado centralizado en React Context / Zustand con sincronización automática en LocalStorage.',
        completed: true,
        completedAt: '2026-10-02',
        keyFiles: ['src/app/hibrido/marketplace/page.tsx'],
        category: 'marketplace'
    },
    {
        id: 'hibrido-3.3-recycling-bank-credits',
        phase: 3,
        phaseTitle: 'Fase 3: Marketplace & Catálogo E-Commerce Híbrido',
        weekRange: 'Semanas 5-6',
        title: 'Sistema del Banco de Reciclaje y Créditos Circulares',
        description: 'Módulo interactivo que permite a los usuarios canjear plástico reciclado por descuentos y créditos aplicables a compras en el marketplace.',
        deliverables: [
            'Calculadora de equivalencia: Kilos de plástico reciclado = Descuento COP',
            'Formulario de registro y generación de código de entrega en puntos aliados',
            'Aplicación de cupones automáticos en el carrito de compras'
        ],
        technicalDetails: 'Lógica matemática de reducción de huella plástica y generación de códigos promocionales únicos.',
        completed: false,
        keyFiles: ['src/app/hibrido/plastico-final-feliz/page.tsx', 'src/app/hibrido/marketplace/page.tsx'],
        category: 'marketplace'
    },
    {
        id: 'hibrido-3.4-database-inventory',
        phase: 3,
        phaseTitle: 'Fase 3: Marketplace & Catálogo E-Commerce Híbrido',
        weekRange: 'Semanas 5-6',
        title: 'Modelado de Base de Datos e Inventario en Supabase / Prisma',
        description: 'Esquema relacional en Supabase (PostgreSQL) para gestionar productos, variantes (tallas de ropa Dinamita, colores de Gomunator), stock en tiempo real y registro de órdenes.',
        deliverables: [
            'Tablas Prisma: Product, ProductVariant, Category, Order, OrderItem',
            'Control de inventario con transacciones ACID para evitar sobreventa',
            'API routes para consulta y sincronización de catálogo (/api/hibrido/products)'
        ],
        technicalDetails: 'Prisma Client con adaptador LibSQL / Supabase PostgreSQL, índices por slug y categoría.',
        completed: false,
        keyFiles: ['prisma/schema.prisma', 'src/app/api/hibrido/products/route.ts'],
        category: 'marketplace'
    },

    // --- FASE 4: PASARELA DE PAGOS TRANSACCIONAL, RESPONSIVE & GO-LIVE ---
    {
        id: 'hibrido-4.1-payment-gateway',
        phase: 4,
        phaseTitle: 'Fase 4: Pasarela de Pagos Transaccional, Responsive & Go-Live',
        weekRange: 'Semanas 7-8',
        title: 'Integración de Pasarela de Pagos (Wompi / Bold)',
        description: 'Conexión con pasarela de pagos nacional para procesar pagos seguros en Colombia vía PSE, tarjetas de crédito/débito, Nequi y Bancolombia.',
        deliverables: [
            'Integración de widget y checkout con Wompi o Bold API',
            'Generación de integrity signatures criptográficas para evitar manipulación de montos',
            'Página de confirmación de orden (/hibrido/checkout/success y /hibrido/checkout/failed)'
        ],
        technicalDetails: 'Generación de firma SHA-256 en servidor con secreto privado; invocación de pasarela.',
        completed: false,
        keyFiles: ['src/app/api/hibrido/checkout/route.ts', 'src/app/hibrido/marketplace/page.tsx'],
        category: 'pasarela-pagos'
    },
    {
        id: 'hibrido-4.2-webhook-fulfillment',
        phase: 4,
        phaseTitle: 'Fase 4: Pasarela de Pagos Transaccional, Responsive & Go-Live',
        weekRange: 'Semanas 7-8',
        title: 'Webhooks Criptográficos y Notificaciones de Pedido',
        description: 'Endpoint para recibir la confirmación de pago de la pasarela, actualizar inventario, generar factura digital y disparar notificaciones automáticas por correo y WhatsApp.',
        deliverables: [
            'API Route /api/hibrido/webhooks/payment con validación de firma y checksum',
            'Manejo de estados: PENDING, APPROVED, DECLINED, VOIDED',
            'Plantilla de confirmación de pedido con número de guía de despacho'
        ],
        technicalDetails: 'Next.js API route con validación de cabeceras criptográficas y actualización atómica en base de datos.',
        completed: false,
        keyFiles: ['src/app/api/hibrido/webhooks/payment/route.ts'],
        category: 'pasarela-pagos'
    },
    {
        id: 'hibrido-4.3-responsive-qa-cwv',
        phase: 4,
        phaseTitle: 'Fase 4: Pasarela de Pagos Transaccional, Responsive & Go-Live',
        weekRange: 'Semanas 7-8',
        title: 'Auditoría Responsive Móvil y Optimización Core Web Vitals',
        description: 'Verificación exhaustiva en dispositivos móviles iOS y Android. Optimización de rendimiento para lograr LCP < 1.8s, CLS 0 y 60 FPS en navegación y visores 3D.',
        deliverables: [
            'Inspección de breakpoints móviles (375px a 1440px)',
            'Optimización de carga de texturas 3D con dpr controlado para pantallas Retina',
            'Configuración de caché HTTP y compresión Brotli'
        ],
        technicalDetails: 'Pruebas con Lighthouse, Chrome DevTools y Next.js dynamic imports para componentes 3D pesados.',
        completed: false,
        keyFiles: ['src/app/hibrido/page.tsx', 'src/components/hibrido/ModelViewer3D.tsx'],
        category: 'infra'
    },
    {
        id: 'hibrido-4.4-golive-production',
        phase: 4,
        phaseTitle: 'Fase 4: Pasarela de Pagos Transaccional, Responsive & Go-Live',
        weekRange: 'Semanas 7-8',
        title: 'Despliegue en Producción y Vinculación de Dominio',
        description: 'Puesta en marcha final de la plataforma web en infraestructura Vercel, vinculación con el dominio oficial del cliente (laboratoriohibrido.com) y entrega formal.',
        deliverables: [
            'Configuración de DNS y aprovisionamiento de certificados SSL automáticos',
            'Indexación en Google Search Console y Sitemap XML generado dinámicamente',
            'Manual de usuario y entrega de repositorio en GitHub a la organización Híbrido'
        ],
        technicalDetails: 'Deploy en Vercel Edge Network con CDN global, variables de entorno seguras y backup de base de datos.',
        completed: false,
        keyFiles: ['next.config.mjs', 'src/app/sitemap.ts'],
        category: 'infra'
    }
];

export const HYBRID_LAB_PHASES: Phase[] = [
    {
        id: 'fase-1',
        phaseNumber: 1,
        title: 'Fase 1: Identidad Visual, Activos y Arquitectura Multipágina',
        subtitle: 'Semanas 1 y 2 • Cimientos Gráficos & Enrutamiento',
        weekRange: 'Semanas 1-2',
        description: 'Ingesta del manual de marca de Híbrido Lab, extracción de vectores de Illustrator (.ai), maquetación del Header Líquido con iconos y enrutamiento multipágina.',
        items: HYBRID_LAB_CHECKLIST.filter(item => item.phase === 1)
    },
    {
        id: 'fase-2',
        phaseNumber: 2,
        title: 'Fase 2: Motor 3D Interactivo de Producto (Gomunator & Colección)',
        subtitle: 'Semanas 3 y 4 • Experiencia 3D WebGL & Fichas Técnicas',
        weekRange: 'Semanas 3-4',
        description: 'Pipeline WebGL con Three.js / React Three Fiber, visualizador en 360° para El Gomunator con cambio de materiales y carga optimizada de modelos GLB/OBJ.',
        items: HYBRID_LAB_CHECKLIST.filter(item => item.phase === 2)
    },
    {
        id: 'fase-3',
        phaseNumber: 3,
        title: 'Fase 3: Marketplace & Catálogo E-Commerce Híbrido',
        subtitle: 'Semanas 5 y 6 • Catálogo Multi-Línea & Carrito Persistente',
        weekRange: 'Semanas 5-6',
        description: 'Marketplace unificado para las 3 líneas (- pelos + amor, Plástico con final feliz, Dinamita), carrito drawer interactivo, banco de reciclaje y modelado de inventario.',
        items: HYBRID_LAB_CHECKLIST.filter(item => item.phase === 3)
    },
    {
        id: 'fase-4',
        phaseNumber: 4,
        title: 'Fase 4: Pasarela de Pagos Transaccional, Responsive & Go-Live',
        subtitle: 'Semanas 7 y 8 • Wompi/Bold, QA Móvil & Producción',
        weekRange: 'Semanas 7-8',
        description: 'Integración transaccional con pasarela colombiana (PSE, Nequi, tarjetas), webhooks seguros de liquidación, optimización Core Web Vitals y lanzamiento en dominio final.',
        items: HYBRID_LAB_CHECKLIST.filter(item => item.phase === 4)
    }
];

export function calculateChecklistStats(phases: Phase[]) {
    let total = 0;
    let completed = 0;

    phases.forEach(p => {
        p.items.forEach(item => {
            total += 1;
            if (item.completed) completed += 1;
        });
    });

    const pending = total - completed;
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, progressPercentage };
}
