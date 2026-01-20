'use client';

import { useState, useEffect } from "react";
import { getUserFluidConfig } from "@/app/inertia-engine/fluid/actions";
import FluidBackground from "@/components/creative/FluidBackground";
import { FLUID_PRESET_PURRPURR } from "@/config/creative";

export function UserFluidBackground() {
    const [config, setConfig] = useState(FLUID_PRESET_PURRPURR);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const fetchedConfig = await getUserFluidConfig();
                if (fetchedConfig) {
                    setConfig(fetchedConfig);
                }
            } catch (error) {
                console.error("[UserFluidBackground] Error fetching config:", error);
            }
        };
        fetchConfig();
    }, []);

    // Generate a unique key based on config to force remount when config changes
    const configKey = JSON.stringify(config.colors) + config.speed + config.force;

    return (
        <FluidBackground
            key={configKey}
            {...config}
            globalInteraction={true}
            className="absolute inset-0 w-full h-screen z-0 pointer-events-none"
        />
    );
}
