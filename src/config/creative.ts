
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
}

export const FLUID_PRESET_PURRPURR: FluidConfig = {
    config: { stiffness: 223, damping: 50, mass: 5 },
    colors: {
        color1: '#dff0a3',
        color2: '#cde6b7',
        color3: '#8c00ff',
        color4: '#250047'
    },
    speed: 0.22,
    force: 0.8,
    blurStrength: 200,
    grainOpacity: 0.5,
    interactionRadius: 0.6,
    fluidZoom: 1.3,
    blendThresholds: { blend1: 0.4, blend2: 0, blend3: 0 }
};

// Add more presets here if needed
