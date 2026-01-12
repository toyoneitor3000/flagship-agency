
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
        color1: '#dff0a3',
        color2: '#cde6b7',
        color3: '#ff0000',
        color4: '#050505'
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
    blendThresholds: { blend1: 0.4, blend2: 0, blend3: 0 }
};

// Add more presets here if needed
