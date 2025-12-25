
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
    config: { stiffness: 120, damping: 21, mass: 2.3 },
    colors: { 
        color1: '#dff0a3',
        color2: '#cde6b7',
        color3: '#8059b1',
        color4: '#361952'
    },
    speed: 0.2,
    force: 1.5,
    blurStrength: 100,
    grainOpacity: 0.4,
    interactionRadius: 1,
    fluidZoom: 1,
    blendThresholds: { blend1: 0, blend2: 0, blend3: 0.1 }
};

// Add more presets here if needed
