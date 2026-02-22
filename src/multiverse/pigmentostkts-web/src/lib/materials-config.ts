// Material and Cut Type Configurations for PriceCalculator

export interface MaterialPricing {
    sc_laminate: number;
    cc_laminate: number;
    hybrid_laminate?: number;
    sc_laminate_alt?: number;
    cc_laminate_alt?: number;
    hybrid_laminate_alt?: number;
}

export interface Material {
    id: string;
    name: string;
    description: string;
    sheetSize: { width: number; height: number };
    alternativeSheetSize?: { width: number; height: number };
    pricing: MaterialPricing;
    imageSrc: string;
    finishOptions: boolean;
    requiresLaminate: boolean;
    hasWidthOptions?: boolean;
}

export const MATERIALS_CONFIG: Material[] = [
    {
        id: 'vinilo-blanco',
        name: 'Vinilo Blanco',
        description: 'El estándar para stickers. Base blanca pura.',
        sheetSize: { width: 100, height: 100 },
        alternativeSheetSize: { width: 50, height: 100 },
        pricing: { sc_laminate: 129900, cc_laminate: 134900, hybrid_laminate: 145000, sc_laminate_alt: 69900, cc_laminate_alt: 74900, hybrid_laminate_alt: 79900 },
        imageSrc: '/materials/blanco-brillante.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'vinilo-transparente',
        name: 'Vinilo Transparente',
        description: 'Fondo invisible. Ideal para vidrio o superficies claras.',
        sheetSize: { width: 100, height: 100 },
        alternativeSheetSize: { width: 50, height: 100 },
        pricing: { sc_laminate: 129900, cc_laminate: 134900, hybrid_laminate: 145000, sc_laminate_alt: 69900, cc_laminate_alt: 74900, hybrid_laminate_alt: 79900 },
        imageSrc: '/materials/transparente-brillante.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'tornasol',
        name: 'Tornasol',
        description: 'Efecto iridiscente que cambia de color según la luz.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 280000, cc_laminate: 290000, hybrid_laminate: 300000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/tornasol.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'metalizado-dorado',
        name: 'Vinilo Metalizado Dorado',
        description: 'Acabado espejo dorado brillante. Lujo y distinción.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 280000, cc_laminate: 290000, hybrid_laminate: 300000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/metalizado-dorado.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'metalizado-plateado-espejo',
        name: 'Vinilo Metalizado Plateado Espejo',
        description: 'Acabado espejo plateado cromado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 280000, cc_laminate: 290000, hybrid_laminate: 300000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/metalizado-cromo.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'plateado-cepillado',
        name: 'Plateado Cepillado Brush',
        description: 'Acabado cepillado con textura metálica.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 280000, cc_laminate: 290000, hybrid_laminate: 300000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/metalizado-brush.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'blanco-holografico',
        name: 'Blanco Holográfico',
        description: 'Base blanca con destellos holográficos. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/blanco-holografico.png',
        finishOptions: false,
        requiresLaminate: false,
        hasWidthOptions: true
    },
    {
        id: 'escarchado',
        name: 'Escarchado (Glitter)',
        description: 'Textura con partículas brillantes. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/escarchado.png',
        finishOptions: false,
        requiresLaminate: false,
        hasWidthOptions: true
    },
    {
        id: 'canvas',
        name: 'Vinilo Canvas',
        description: 'Textura tipo lienzo artístico. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/canvas.png',
        finishOptions: false,
        requiresLaminate: false,
        hasWidthOptions: true
    }
];

export const CUT_TYPES = [
    {
        id: 'sc',
        name: 'Semi Corte (SC)',
        description: 'Solo se corta la capa de vinilo, dejando el papel respaldo intacto. Se entregan en planillas (hojas) o rollos.',
        imageSrc: '/cut-types/kiss-cut.png'
    },
    {
        id: 'cc',
        name: 'Corte Completo (CC)',
        description: 'Cada sticker se corta individualmente con la forma exacta del diseño. Ideal para regalar o vender sueltos.',
        imageSrc: '/cut-types/die-cut.png'
    },
    {
        id: 'hybrid',
        name: 'Semicorte + Corte Completo',
        description: 'El sticker tiene un corte superficial para despegar fácil, pero también se corta individualmente el respaldo. Lo mejor de ambos mundos.',
        imageSrc: '/cut-types/die-kiss-cut.png'
    }
];
