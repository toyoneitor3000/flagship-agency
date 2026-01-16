import {
    ShieldCheck, Server, Truck, Users, BarChart3, Database, Globe, Cpu,
    ArrowUpRight, Sparkles, ShoppingBag, Radio, Receipt, FileText, Megaphone,
    Eye, Rocket, TrendingUp, Star, Infinity, Crown, Atom, Zap, Aperture,
    Code, Fingerprint, Cat, Command, Moon, Wind, Palette, Triangle, Dna,
    Heart, Ghost, Hourglass, RefreshCw, Circle, Briefcase, Palette as DesignIcon,
    Layout, Beaker, Layers, Building2, BookOpen, type LucideIcon
} from "lucide-react";

// ============================================================================
// MULTIVERSE PROJECTS (Satellites orbiting the main planet)
// ============================================================================

export interface MultiverseProject {
    id: string;
    name: string;
    description: string;
    type: 'startup' | 'tool' | 'foundation';
    orbitRadius: number;
    orbitSpeed: number;
    color: string;
}

export const MULTIVERSE_PROJECTS: MultiverseProject[] = [
    {
        id: 'p-1',
        name: 'Flagship Agency',
        description: 'La Nave Nodriza. Agencia de desarrollo y diseño.',
        type: 'foundation',
        orbitRadius: 18,
        orbitSpeed: 0.05,
        color: '#a855f7' // Purple
    },
    {
        id: 'p-2',
        name: 'Pigmento Stickers',
        description: 'Stickers y branding street-wear.',
        type: 'startup',
        orbitRadius: 24,
        orbitSpeed: 0.1,
        color: '#fbbf24' // Amber
    },
    {
        id: 'p-3',
        name: 'Victory Cars',
        description: 'Detailing automotriz y estética.',
        type: 'startup',
        orbitRadius: 28,
        orbitSpeed: 0.08,
        color: '#ef4444' // Red
    },
    {
        id: 'p-4',
        name: 'Speedlight Culture',
        description: 'Cultura automotriz y lifestyle.',
        type: 'startup',
        orbitRadius: 34,
        orbitSpeed: 0.12,
        color: '#06b6d4' // Cyan
    },
    {
        id: 'p-5',
        name: 'Financars',
        description: 'Soluciones financieras automotrices.',
        type: 'startup',
        orbitRadius: 38,
        orbitSpeed: 0.06,
        color: '#3b82f6' // Blue
    },
    {
        id: 'p-6',
        name: 'Beauty & Comfort',
        description: 'Bienestar y belleza.',
        type: 'startup',
        orbitRadius: 42,
        orbitSpeed: 0.04,
        color: '#ec4899' // Pink
    }
];

// ============================================================================
// UNIFIED BUILDING ARCHITECTURE (Pigmento Cosmic + Purrpurr Operational)
// ============================================================================

export type LevelCategory =
    | 'transcendent'
    | 'biological'
    | 'cosmic'
    | 'abstract'
    | 'strategic'
    | 'operational'
    | 'foundation'
    | 'underground';

export type LevelType =
    | 'underground'
    | 'foundation'
    | 'standard'
    | 'lab'
    | 'ecosystem'
    | 'top'
    | 'cosmic'
    | 'transcendent';

export interface BuildingLevel {
    level: number;
    threshold: number; // % of "evolution" required to unlock
    name: string;
    englishName?: string;
    color: string;
    type: LevelType;
    category: LevelCategory;
    height: number;
    title: string;
    subtitle: string;
    description?: string;
    icon?: LucideIcon;
    steps: StepItem[];
}

export interface StepItem {
    id: string;
    title: string;
    status?: 'operational' | 'pending' | 'warning' | 'locked';
    desc: string;
    cost?: string;
    link?: string;
    solution?: string;
}

export const BUILDING_LEVELS: BuildingLevel[] = [
    // =========================================================================
    // TRANSCENDENTAL LEVELS (26-23) - The Divine / Source
    // =========================================================================
    {
        level: 26, threshold: 100, name: "El Ciclo", englishName: "The Cycle",
        color: "#f97316", type: 'transcendent', category: 'transcendent', height: 0.6,
        title: "El Ciclo", subtitle: "Retorno Infinito", icon: RefreshCw,
        description: "El fin es el principio. La energía se recicla eternamente.",
        steps: []
    },
    {
        level: 25, threshold: 100, name: "La Eternidad", englishName: "The Eternity",
        color: "#f59e0b", type: 'transcendent', category: 'transcendent', height: 0.6,
        title: "La Eternidad", subtitle: "Dominio del Tiempo", icon: Hourglass,
        description: "La permanencia absoluta más allá del espacio.",
        steps: []
    },
    {
        level: 24, threshold: 100, name: "El Alma", englishName: "The Soul",
        color: "#cbd5e1", type: 'transcendent', category: 'transcendent', height: 0.6,
        title: "El Alma", subtitle: "Presencia Eterna", icon: Ghost,
        description: "El fantasma en la máquina. Lo que sobrevive.",
        steps: []
    },
    {
        level: 23, threshold: 100, name: "El Corazón", englishName: "The Heart",
        color: "#e11d48", type: 'transcendent', category: 'biological', height: 0.6,
        title: "El Corazón", subtitle: "Pasión Pura", icon: Heart,
        description: "El motor emocional que impulsa la creación.",
        steps: []
    },

    // =========================================================================
    // BIOLOGICAL & COSMIC LEVELS (22-19)
    // =========================================================================
    {
        level: 22, threshold: 99, name: "El ADN", englishName: "The DNA",
        color: "#84cc16", type: 'cosmic', category: 'biological', height: 0.6,
        title: "El ADN", subtitle: "Código Genético", icon: Dna,
        description: "La identidad biológica única de la marca.",
        steps: []
    },
    {
        level: 21, threshold: 99, name: "El Prisma", englishName: "The Prism",
        color: "#ffffff", type: 'cosmic', category: 'cosmic', height: 0.6,
        title: "El Prisma", subtitle: "Transformación Divina", icon: Triangle,
        description: "Refracta la luz pura en el espectro de la realidad.",
        steps: []
    },
    {
        level: 20, threshold: 98, name: "El Pigmento", englishName: "The Pigment",
        color: "#a855f7", type: 'cosmic', category: 'cosmic', height: 0.8,
        title: "El Pigmento", subtitle: "La Esencia Pura", icon: Palette,
        description: "El material crudo y cromático del universo.",
        steps: []
    },
    {
        level: 19, threshold: 97, name: "El Éter", englishName: "The Ether",
        color: "#a5f3fc", type: 'cosmic', category: 'cosmic', height: 0.6,
        title: "El Éter", subtitle: "Sustancia Primordial", icon: Wind,
        description: "El medio invisible por el que viajan las ideas.",
        steps: []
    },

    // =========================================================================
    // ABSTRACT LEVELS (18-11) - The Mind / Creation
    // =========================================================================
    {
        level: 18, threshold: 96, name: "El Sueño", englishName: "The Dream",
        color: "#6366f1", type: 'cosmic', category: 'abstract', height: 0.6,
        title: "El Sueño", subtitle: "Incepción Pura", icon: Moon,
        description: "El momento subconsciente de la creación.",
        steps: []
    },
    {
        level: 17, threshold: 95, name: "El Prompt", englishName: "The Prompt",
        color: "#9ca3af", type: 'cosmic', category: 'abstract', height: 0.6,
        title: "El Prompt", subtitle: "/hágase_la_luz", icon: Command,
        description: "El verbo inicial. La instrucción divina.",
        steps: []
    },
    {
        level: 16, threshold: 94, name: "El Ronroneo", englishName: "The Purr",
        color: "#ec4899", type: 'cosmic', category: 'abstract', height: 0.6,
        title: "El Ronroneo", subtitle: "Vibración Cósmica", icon: Cat,
        description: "La frecuencia fundamental del universo Purrpurr.",
        steps: []
    },
    {
        level: 15, threshold: 93, name: "El Arquitecto", englishName: "The Architect",
        color: "#dc2626", type: 'cosmic', category: 'abstract', height: 0.8,
        title: "El Arquitecto", subtitle: "La Mente Maestra", icon: Fingerprint,
        description: "Tú. El creador detrás de la pantalla.",
        steps: []
    },
    {
        level: 14, threshold: 92, name: "La Matriz", englishName: "The Matrix",
        color: "#22c55e", type: 'cosmic', category: 'abstract', height: 0.6,
        title: "La Matriz", subtitle: "Código Fuente Universal", icon: Code,
        description: "La realidad tejida en ceros y unos.",
        steps: []
    },
    {
        level: 13, threshold: 91, name: "El Vacío", englishName: "The Void",
        color: "#111827", type: 'cosmic', category: 'abstract', height: 0.6,
        title: "El Vacío", subtitle: "Potencial Infinito", icon: Aperture,
        description: "El caos primordial antes de la creación.",
        steps: []
    },
    {
        level: 12, threshold: 90, name: "La Fuente", englishName: "The Source",
        color: "#eab308", type: 'cosmic', category: 'abstract', height: 0.6,
        title: "La Fuente", subtitle: "Génesis", icon: Zap,
        description: "Energía creativa pura e inagotable.",
        steps: []
    },
    {
        level: 11, threshold: 88, name: "Multiverso", englishName: "The Multiverse",
        color: "#14b8a6", type: 'cosmic', category: 'abstract', height: 0.8,
        title: "Multiverso", subtitle: "Expansión", icon: Atom,
        description: "Todas las posibilidades y realidades alternativas.",
        steps: []
    },

    // =========================================================================
    // STRATEGIC & VISION LEVELS (10-7) - Purrpurr Original
    // =========================================================================
    {
        level: 10, threshold: 85, name: "Legado", englishName: "The Legacy",
        color: "#facc15", type: 'top', category: 'strategic', height: 1.0,
        title: "Legado", subtitle: "Eternidad", icon: Crown,
        description: "La huella imborrable que dejamos.",
        steps: []
    },
    {
        level: 9, threshold: 82, name: "Singularidad", englishName: "The Singularity",
        color: "#c084fc", type: 'standard', category: 'strategic', height: 0.8,
        title: "Singularidad", subtitle: "Autonomía", icon: Infinity,
        description: "El punto donde la entidad cobra vida propia.",
        steps: []
    },
    {
        level: 8, threshold: 78, name: "Constelación", englishName: "The Constellation",
        color: "#fbbf24", type: 'standard', category: 'strategic', height: 0.8,
        title: "Constelación", subtitle: "Comunidad", icon: Star,
        description: "La red de estrellas que nos conecta.",
        steps: []
    },
    {
        level: 7, threshold: 75, name: "Órbita", englishName: "The Orbit",
        color: "#f472b6", type: 'standard', category: 'strategic', height: 0.8,
        title: "Órbita", subtitle: "Futuro & I+D", icon: Rocket,
        description: "Exploración de nuevos horizontes.",
        steps: []
    },

    // =========================================================================
    // OPERATIONAL LEVELS (6-0) - Purrpurr Core Business with DETAILED STEPS
    // =========================================================================
    {
        level: 6, threshold: 70, name: "Observatorio", englishName: "The Observatory",
        color: "#2dd4bf", type: 'ecosystem', category: 'operational', height: 0.8,
        title: "Observatorio", subtitle: "Control & IA", icon: Eye,
        description: "Visión global y análisis de datos.",
        steps: [
            { id: 'o-1', title: 'Pigmento Stickers', status: 'operational', desc: 'Conectado. Branding & Retail.' },
            { id: 'o-2', title: 'Victory Cars', status: 'operational', desc: 'Conectado. Services & Booking.' },
            { id: 'o-3', title: 'Speedlight Culture', status: 'operational', desc: 'Conectado. Community & Events.' },
            { id: 'o-4', title: 'Financars', status: 'operational', desc: 'Conectado. Fintech Automotive.' },
            { id: 'o-5', title: 'Beauty & Comfort', status: 'operational', desc: 'Conectado. Wellness.' },
        ]
    },
    {
        level: 5, threshold: 65, name: "The Lab", englishName: "The Laboratory",
        color: "#a855f7", type: 'lab', category: 'operational', height: 1.2,
        title: "Laboratorio", subtitle: "I+D+i", icon: Beaker,
        description: "Fábrica de innovación y microservicios.",
        steps: []
    },
    {
        level: 4, threshold: 58, name: "Crecimiento", englishName: "Growth",
        color: "#f97316", type: 'standard', category: 'operational', height: 0.8,
        title: "Crecimiento", subtitle: "Marketing & Difusión", icon: Megaphone,
        description: "La voz que alcanza a las masas.",
        steps: []
    },
    {
        level: 3, threshold: 50, name: "Experiencia", englishName: "Experience",
        color: "#eab308", type: 'standard', category: 'operational', height: 0.8,
        title: "Experiencia", subtitle: "Ventas & Cliente", icon: Sparkles,
        description: "El contacto humano y la satisfacción.",
        steps: []
    },
    {
        level: 2, threshold: 42, name: "Operaciones", englishName: "Operations",
        color: "#3b82f6", type: 'standard', category: 'operational', height: 0.8,
        title: "Operaciones", subtitle: "Gestión de Pedidos", icon: Users,
        description: "El motor logístico del día a día.",
        steps: []
    },
    {
        level: 1, threshold: 30, name: "Academia", englishName: "The Academy",
        color: "#eab308", type: 'standard', category: 'operational', height: 0.8,
        title: "La Academia", subtitle: "Gestión de Conocimiento", icon: BookOpen,
        description: "El cerebro digital y la gestión del conocimiento.",
        steps: [
            { id: 'a-1', title: 'Diccionario Purrpurr', status: 'operational', desc: 'Terminología interna.' },
            { id: 'a-2', title: 'Wiki (GitHub/Notion)', status: 'pending', desc: 'Crear repositorio purrpurr-academy.' },
            { id: 'a-3', title: 'Tutoriales Zero-to-Hero', status: 'locked', desc: 'Videos de 5 min por Core.' },
        ]
    },
    {
        level: 0, threshold: 15, name: "Cimientos", englishName: "Foundation",
        color: "#10b981", type: 'foundation', category: 'foundation', height: 0.6,
        title: "Fundación: Legal", subtitle: "Protocolo SAS Colombia",
        description: "Tecnología: Vercel, Prisma, Next.js, Auth. Constitución Legal.",
        icon: Database,
        steps: [
            { id: 'f-1', title: '1. El ADN (Estatutos)', status: 'operational', desc: 'Documento Privado de Constitución.\n• Capital Autorizado: Alto (100M)\n• Capital Suscrito: Bajo (1M)\n• CIIU: 6201, 6202, 7310', cost: 'Gratis' },
            { id: 'f-2', title: '2. Plataforma VUE', status: 'operational', desc: 'vue.gov.co - DIAN + Cámara integrados.', link: 'https://www.vue.gov.co', cost: 'Gratis' },
            { id: 'f-3', title: '3. Ley 1780 (Jóvenes)', status: 'operational', desc: 'Matrícula $0 para menores de 35.', cost: '-$200k' },
            { id: 'f-4', title: '4. Tarifa Final', status: 'warning', desc: 'Impuesto + Formulario + Certificados', cost: '~$50k COP', solution: 'Vender 1 servicio freelance.' },
            { id: 'f-5', title: '5. Banco & NIT', status: 'locked', desc: 'Abrir cuenta Pyme con NIT.', cost: '$0' },
        ]
    },

    // =========================================================================
    // UNDERGROUND LEVELS (-1 to -4) - Deep Core
    // =========================================================================
    {
        level: -1, threshold: 0, name: "El Búnker", englishName: "The Bunker",
        color: "#334155", type: 'underground', category: 'underground', height: 0.8,
        title: "El Búnker", subtitle: "Seguridad Máxima", icon: ShieldCheck,
        description: "Almacenamiento en frío y copias de seguridad.",
        steps: []
    },
    {
        level: -2, threshold: 0, name: "La Fragua", englishName: "The Forge",
        color: "#ea580c", type: 'underground', category: 'underground', height: 0.8,
        title: "La Fragua", subtitle: "Generación de Energía", icon: Zap,
        description: "Sistemas geotérmicos de potencia.",
        steps: []
    },
    {
        level: -3, threshold: 0, name: "La Mina", englishName: "The Mine",
        color: "#78350f", type: 'underground', category: 'underground', height: 0.8,
        title: "La Mina", subtitle: "Extracción de Datos", icon: Server,
        description: "Minado de recursos y datos crudos.",
        steps: []
    },
    {
        level: -4, threshold: 0, name: "El Núcleo", englishName: "The Core",
        color: "#ef4444", type: 'underground', category: 'underground', height: 1.5,
        title: "El Núcleo", subtitle: "Origen", icon: Circle,
        description: "El centro ardiente de todo.",
        steps: []
    },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getLevelByNumber(level: number): BuildingLevel | undefined {
    return BUILDING_LEVELS.find(l => l.level === level);
}

export function getVisibleLevels(evolutionPercent: number): BuildingLevel[] {
    return BUILDING_LEVELS.filter(l => evolutionPercent >= l.threshold);
}

export function getUndergroundLevels(): BuildingLevel[] {
    return BUILDING_LEVELS.filter(l => l.level < 0);
}

export function getSurfaceLevels(): BuildingLevel[] {
    return BUILDING_LEVELS.filter(l => l.level >= 0 && l.level <= 10);
}

export function getCosmicLevels(): BuildingLevel[] {
    return BUILDING_LEVELS.filter(l => l.level > 10);
}
