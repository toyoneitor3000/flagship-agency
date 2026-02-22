"use client";

import PriceCalculator from "@/components/PriceCalculator";

export default function CubreplacasPage() {
    return (
        <main className="min-h-screen w-full bg-brand-black relative flex flex-col pt-24 md:pt-28 pb-4">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
            <PriceCalculator
                initialProjectType="cubreplacas"
                initialStep={1}
                initialHasDesign={true}
            />
        </main>
    );
}
