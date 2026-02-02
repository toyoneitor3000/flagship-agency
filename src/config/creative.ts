
export interface FluidConfig {
    config: {
        stiffness: number;
        damping: number;
        mass: number;
    };
    colors: {
        color1: string;
        color2: string;
        color3: string;
        color4: string;
    };
    speed: number;
    force: number;
    blurStrength: number;
    grainOpacity: number;
    interactionRadius: number;
    fluidZoom: number;
    blendThresholds: {
        blend1: number;
        blend2: number;
        blend3: number;
    };
    buttonPalette?: {
        primary: string;
        accent: string;
        text: string;
    };
}

export const FLUID_PRESET_PURRPURR: FluidConfig = {
    config: { stiffness: 150, damping: 30, mass: 5 },
    colors: {
        color1: '#8f69ff', // Púrpura Purrpurr (Core)
        color2: '#6d42e5', // Púrpura Profundo (Profundidad)
        color3: '#709600', // Verde Eco (Crecimiento)
        color4: '#1a0b40'  // Noche Violeta (Fondo)
    },
    buttonPalette: {
        primary: '#8f69ff', // Púrpura Purrpurr
        accent: '#709600',  // Verde Eco
        text: '#f0ffcc'     // Lima Claro
    },
    speed: 0.6,
    force: 0.6,
    blurStrength: 160,
    grainOpacity: 0.2,
    interactionRadius: 1.1,
    fluidZoom: 0.7,
    blendThresholds: { blend1: 0.2, blend2: 0.4, blend3: 0.6 }
};

// Add more presets here if needed
