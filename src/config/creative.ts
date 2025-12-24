
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
    };
    speed: number;
    force: number;
    blurStrength: number;
    grainOpacity: number;
}

export const FLUID_PRESET_PURRPURR: FluidConfig = {
    config: { stiffness: 50, damping: 20, mass: 1 },
    colors: {
        color1: '#6D28D9', // Brand Purple
        color2: '#00FF9C', // Neon Green
        color3: '#3B82F6'  // Blue Accent
    },
    speed: 0.005,
    force: 2.0,
    blurStrength: 120,
    grainOpacity: 0.14
};

// Add more presets here if needed
