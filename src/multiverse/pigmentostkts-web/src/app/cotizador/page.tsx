"use client";

import PriceCalculator from "@/components/PriceCalculator";
import { FadeIn } from "@/components/ui/motion";

export default function CotizadorPage() {
    return (
        <main className="h-[100dvh] w-full bg-brand-black relative overflow-hidden flex flex-col pt-24 md:pt-28 pb-4">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
            <PriceCalculator />
        </main>
    );
}
