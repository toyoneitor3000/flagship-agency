'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    buttonPalette?: {
        primary: string;
        accent: string;
        text: string;
    };
}

export interface FluidPreset {
    id: string;
    name: string;
    data: FluidState;
    timestamp: number;
}

export async function saveFluidConfig(data: FluidState) {
    const session = await auth();

    logo("ATTEMPTING SAVE CONFIG", session?.user?.email);

    if (!session?.user?.email) {
        console.error("Save failed: No session email");
        return { success: false, error: 'Must be logged in to save configuration' };
    }

    try {
        console.log("Saving fluid config for:", session.user.email);
        await prisma.user.update({
            where: { email: session.user.email },
            data: {
                fluidConfig: JSON.stringify(data)
            }
        });
        console.log("Save successful. Revalidating...");
        revalidatePath('/', 'layout');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to save config:', error);
        return { success: false, error: 'Failed to save configuration to user profile' };
    }
}

export async function saveFluidPresets(presets: FluidPreset[]) {
    const session = await auth();
    logo("SAVING PRESETS", session?.user?.email);

    if (!session?.user?.email) return { success: false, error: 'Auth required' };

    try {
        await prisma.user.update({
            where: { email: session.user.email },
            data: {
                fluidPresets: JSON.stringify(presets)
            }
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to save presets:', error);
        return { success: false, error: 'Failed to save presets' };
    }
}

function logo(msg: string, data: any) {
    console.log(`[FLUID_ACTION] ${msg}`, data);
}

export async function getUserFluidConfig() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { fluidConfig: true, fluidPresets: true }
        });

        if (user?.fluidConfig) {
            return JSON.parse(user.fluidConfig);
        }
    } catch (error) {
        console.error('Failed to fetch user fluid config:', error);
    }

    return null;
}

export async function getUserFluidPresets(): Promise<FluidPreset[]> {
    const session = await auth();
    if (!session?.user?.email) return [];

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { fluidPresets: true }
        });

        if (user?.fluidPresets) {
            return JSON.parse(user.fluidPresets);
        }
    } catch (error) {
        console.error('Failed to fetch user presets:', error);
    }
    return [];
}
