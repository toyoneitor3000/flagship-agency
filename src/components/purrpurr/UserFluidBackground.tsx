
import { getUserFluidConfig } from "@/app/inertia-engine/fluid/actions";
import FluidBackground from "@/components/creative/FluidBackground";
import { FLUID_PRESET_PURRPURR, type FluidConfig } from "@/config/creative";

export async function UserFluidBackground() {
    let config: FluidConfig = FLUID_PRESET_PURRPURR;

    try {
        const userConfig = await getUserFluidConfig();

        if (userConfig) {
            console.log("[UserFluidBackground] Loaded custom config from database");
            config = userConfig;
        } else {
            console.log("[UserFluidBackground] No custom config found, using default preset");
        }
    } catch (error) {
        console.error("[UserFluidBackground] Error loading config, falling back to default:", error);
        // Continue with default preset
    }

    // Generate a unique key based on config to force remount when config changes
    // This ensures the WebGL canvas is properly recreated
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
