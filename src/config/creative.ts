
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
    config: { stiffness: 269, damping: 22, mass: 5 },
    colors: {
        color1: '#6366f1', // Indigo
        color2: '#00FF9C', // Spring Green
        color3: '#000000', // Black
        color4: '#050505'  // Deep Black
    },
    buttonPalette: {
        primary: '#8f69ff', // Indigo 500
        accent: '#00FF9C',  // Spring Green
        text: '#000000'
    },
    speed: 1.77,
    force: 0.9,
    blurStrength: 200,
    grainOpacity: 0.5,
    interactionRadius: 1.1,
    fluidZoom: 0.7,
    blendThresholds: { blend1: 0.2, blend2: 0.4, blend3: 0.6 }
};

// Add more presets here if needed
