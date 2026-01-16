
export interface MulitverseProject {
    id: string;
    name: string;
    description: string;
    type: 'startup' | 'tool' | 'foundation';
    orbitRadius: number;
    orbitSpeed: number;
    color: string;
}

export interface BuildingLevel {
    level: number;
    threshold: number;
    name: string;
    color: string;
    type: 'underground' | 'foundation' | 'standard' | 'lab' | 'ecosystem' | 'top';
    height: number;
    title: string;
    subtitle: string;
    steps: any[];
}

export const MULTIVERSE_PROJECTS: MulitverseProject[] = [
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

export const BUILDING_LEVELS: BuildingLevel[] = [
    // --- UNDERGROUND (Cimientos del Planeta) ---
    {
        level: -4, threshold: 0, name: "The Core", color: "#ef4444", type: 'underground', height: 1.5,
        title: "El Núcleo", subtitle: "Energía Primordial", steps: []
    },
    {
        level: -3, threshold: 0, name: "The Mine", color: "#f97316", type: 'underground', height: 0.8,
        title: "La Mina", subtitle: "Recursos Brutos", steps: []
    },
    {
        level: -2, threshold: 0, name: "The Forge", color: "#ea580c", type: 'underground', height: 0.8,
        title: "La Forja", subtitle: "Herramientas Base", steps: []
    },
    {
        level: -1, threshold: 0, name: "The Bunker", color: "#71717a", type: 'underground', height: 0.8,
        title: "El Bunker", subtitle: "Seguridad & Backups", steps: []
    },

    // --- SURFACE (El Edificio) ---
    {
        level: 0, threshold: 15, name: "Fundación", color: "#10b981", type: 'foundation', height: 0.6,
        title: "Fundación: Legal", subtitle: "Protocolo SAS Colombia",
        steps: [
            { id: 'f-1', title: '1. El ADN (Estatutos)', status: 'operational', desc: 'Constitución SAS.' },
            { id: 'f-2', title: '2. Plataforma VUE', status: 'operational', desc: 'Registro Mercantil.' },
        ]
    },
    {
        level: 1, threshold: 30, name: "Academia", color: "#eab308", type: 'standard', height: 0.8,
        title: "La Academia", subtitle: "Gestión de Conocimiento",
        steps: [
            { id: 'a-1', title: 'Diccionario Purrpurr', desc: 'Terminología interna.' }
        ]
    },
    { level: 2, threshold: 40, name: "Diseño", color: "#ec4899", type: 'standard', height: 0.8, title: "Diseño", subtitle: "Sistema Visual", steps: [] },
    { level: 3, threshold: 50, name: "Frontend", color: "#0ea5e9", type: 'standard', height: 0.8, title: "Frontend", subtitle: "Experiencia de Usuario", steps: [] },
    { level: 4, threshold: 60, name: "Backend", color: "#3b82f6", type: 'standard', height: 0.8, title: "Backend", subtitle: "Lógica & Datos", steps: [] },
    { level: 5, threshold: 70, name: "The Lab", color: "#a855f7", type: 'lab', height: 1.2, title: "Laboratorio", subtitle: "I+D+i", steps: [] },
    {
        level: 6, threshold: 80, name: "Ecosystem", color: "#6366f1", type: 'ecosystem', height: 0.6,
        title: "Ecosistema Multiverso", subtitle: "Conexiones Satelitales",
        steps: [
            { id: 'e-1', title: 'Pigmento Stickers', status: 'operational', desc: 'Conectado. Branding & Retail.' },
            { id: 'e-2', title: 'Victory Cars', status: 'operational', desc: 'Conectado. Services & Booking.' },
            { id: 'e-3', title: 'Speedlight Culture', status: 'operational', desc: 'Conectado. Community & Events.' },
            { id: 'e-4', title: 'Financars', status: 'operational', desc: 'Conectado. Fintech Automotive.' },
            { id: 'e-5', title: 'Beauty & Comfort', status: 'operational', desc: 'Conectado. Wellness.' },
        ]
    },
    { level: 7, threshold: 85, name: "Growth", color: "#8b5cf6", type: 'standard', height: 0.8, title: "Growth", subtitle: "Marketing & Ventas", steps: [] },
    { level: 8, threshold: 90, name: "Strategy", color: "#f43f5e", type: 'standard', height: 0.8, title: "Estrategia", subtitle: "Dirección", steps: [] },
    { level: 9, threshold: 95, name: "Vision", color: "#ffffff", type: 'top', height: 1.0, title: "Visión", subtitle: "El Futuro", steps: [] },
];
