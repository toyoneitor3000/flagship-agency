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

    console.log("[FLUID_ACTION] ATTEMPTING SAVE CONFIG", session?.user?.email);

    if (!session?.user?.email) {
        console.error("[FLUID_ACTION] Save failed: No session email");
        return { success: false, error: 'Must be logged in to save configuration' };
    }

    try {
        console.log("[FLUID_ACTION] Saving fluid config for:", session.user.email);
        await prisma.user.update({
            where: { email: session.user.email },
            data: {
                fluidConfig: JSON.stringify(data)
            }
        });
        console.log("[FLUID_ACTION] Save successful. Revalidating...");
        revalidatePath('/', 'layout');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('[FLUID_ACTION] Failed to save config:', error);
        return { success: false, error: `Failed to save configuration: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
}

export async function saveGlobalFluidConfig(data: FluidState) {
    const session = await auth();
    const adminEmails = ['camilotoloza1136@gmail.com', 'purpuregamechanger@gmail.com'];

    if (!session?.user?.email || !adminEmails.includes(session.user.email)) {
        return { success: false, error: 'Acceso denegado: Solo administradores pueden cambiar la landing global' };
    }

    const GLOBAL_USER_EMAIL = 'global@flagship-agency.com';

    try {
        // Upsert the global user config
        await prisma.user.upsert({
            where: { email: GLOBAL_USER_EMAIL },
            update: { fluidConfig: JSON.stringify(data) },
            create: {
                email: GLOBAL_USER_EMAIL,
                name: 'Global System',
                role: 'admin',
                fluidConfig: JSON.stringify(data)
            }
        });

        revalidatePath('/', 'layout');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('[FLUID_ACTION] Failed to save global config:', error);
        return { success: false, error: 'Error al guardar configuración global' };
    }
}

export async function saveFluidPresets(presets: FluidPreset[]) {
    const session = await auth();
    console.log("[FLUID_ACTION] SAVING PRESETS", session?.user?.email);

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

        // 1. If logged in, prioritize user config
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
                select: { fluidConfig: true }
            });

            if (user?.fluidConfig) {
                return JSON.parse(user.fluidConfig);
            }
        }

        // 2. Fallback to Global System config (for anonymous or users without custom config)
        const GLOBAL_USER_EMAIL = 'global@flagship-agency.com';
        const globalUser = await prisma.user.findUnique({
            where: { email: GLOBAL_USER_EMAIL },
            select: { fluidConfig: true }
        });

        if (globalUser?.fluidConfig) {
            return JSON.parse(globalUser.fluidConfig);
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
