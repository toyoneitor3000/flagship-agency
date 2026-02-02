'use client';

import { useState, useEffect } from "react";
import { getUserFluidConfig } from "@/app/inertia-engine/fluid/actions";
import FluidBackground from "@/components/creative/FluidBackground";
import { FLUID_PRESET_PURRPURR } from "@/config/creative";

export function UserFluidBackground() {
    const [config, setConfig] = useState(FLUID_PRESET_PURRPURR);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const fetchedConfig = await getUserFluidConfig();
                if (fetchedConfig) {
                    setConfig(fetchedConfig);
                }
            } catch (error) {
                // Silently fall back to default config if fetch fails
                // This prevents errors when auth is not configured or database is unavailable
                console.warn("[UserFluidBackground] Using default config due to error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig().catch((error) => {
            // Additional catch to prevent unhandled promise rejections
            console.warn("[UserFluidBackground] Failed to fetch config:", error);
            setIsLoading(false);
        });
    }, []);

    // Generate a unique key based on config to force remount when config changes
    const configKey = JSON.stringify(config.colors) + config.speed + config.force;

    // Don't render until we've attempted to load config to prevent flash
    if (isLoading) {
        return null;
    }

    return (
        <div className="absolute inset-0 w-full h-screen z-0 pointer-events-none opacity-30">
            <FluidBackground
                key={configKey}
                {...config}
                globalInteraction={true}
                className="absolute inset-0 w-full h-screen z-0 pointer-events-none"
            />
        </div>
    );
}
