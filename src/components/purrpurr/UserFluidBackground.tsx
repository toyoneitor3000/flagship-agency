
import { getUserFluidConfig } from "@/app/inertia-engine/fluid/actions";
import FluidBackground from "@/components/creative/FluidBackground";
import { FLUID_PRESET_PURRPURR } from "@/config/creative";

export async function UserFluidBackground() {
    const userConfig = await getUserFluidConfig();
    const config = userConfig || FLUID_PRESET_PURRPURR;

    if (userConfig) {
        console.log("[UserFluidBackground] Loaded custom config");
    } else {
        console.log("[UserFluidBackground] Using default preset (No user config found or no session)");
    }

    return (
        <FluidBackground
            {...config}
            globalInteraction={true}
            className="fixed inset-0 w-screen h-screen z-0"
        />
    );
}
