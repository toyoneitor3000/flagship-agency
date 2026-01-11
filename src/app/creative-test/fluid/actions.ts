'use server';

import fs from 'fs/promises';
import path from 'path';

interface FluidState {
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

export async function saveFluidConfig(data: FluidState) {
    const configPath = path.join(process.cwd(), 'src/config/creative.ts');

    const content = `
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
    config: { stiffness: ${data.config.stiffness}, damping: ${data.config.damping}, mass: ${data.config.mass} },
    colors: { 
        color1: '${data.colors.color1}',
        color2: '${data.colors.color2}',
        color3: '${data.colors.color3}',
        color4: '${data.colors.color4}'
    },
    speed: ${data.speed},
    force: ${data.force},
    blurStrength: ${data.blurStrength},
    grainOpacity: ${data.grainOpacity},
    interactionRadius: ${data.interactionRadius},
    fluidZoom: ${data.fluidZoom},
    blendThresholds: { blend1: ${data.blendThresholds.blend1}, blend2: ${data.blendThresholds.blend2}, blend3: ${data.blendThresholds.blend3} }
};

// Add more presets here if needed
`;

    try {
        await fs.writeFile(configPath, content, 'utf-8');
        return { success: true };
    } catch (error) {
        console.error('Failed to save config:', error);
        return { success: false, error: 'Failed to write config file' };
    }
}
