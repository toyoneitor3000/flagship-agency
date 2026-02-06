"use client";

import { CheckCircle, Shield, Calendar, Award } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock Data for specific demo plate
const DEMO_CAR = {
    plate: "BMW-X5-AF3",
    model: "BMW X5 M-Competition",
    color: "Black Sapphire",
    year: 2024,
    status: "protected", // protected | warning | expired
    warranty_until: "2028-02-01",
    services: [
        { id: 1, name: "Protección Cerámica GTechniq 5 Años", date: "2025-02-01", type: "protection" },
        { id: 2, name: "Corrección de Pintura 95%", date: "2025-01-30", type: "correction" },
        { id: 3, name: "Lavado Detailing Inicial", date: "2025-01-30", type: "wash" }
    ]
};

export default function GaragePage() {
    const params = useParams();
    const plate = typeof params.plate === 'string' ? params.plate.toUpperCase() : "";

    const [car, setCar] = useState<typeof DEMO_CAR | null>(null);

    useEffect(() => {
        // In a real app, fetch from Supabase. 
        // Here we try to find in LocalStorage, if not, check if it's the demo car.

        // 1. Try LocalStorage (Simulating DB connection)
        const localDB = JSON.parse(localStorage.getItem("victory_db_services") || "[]");
        const foundLocal = localDB.find((s: any) => s.plate === plate);

        if (foundLocal) {
            // Construct a "Car Object" from the service log
            setCar({
                plate: foundLocal.plate,
                model: "Vehículo Registrado", // We don't have model in simple form yet
                color: "N/A",
                year: 2025,
                status: "protected",
                warranty_until: "2026-02-01", // Mock 1 year
                services: [
                    { id: 99, name: foundLocal.service, date: foundLocal.date.split('T')[0], type: "service" }
                ]
            });
        } else if (plate === "BMW-X5-AF3") {
            setCar(DEMO_CAR);
        } else {
            // Not found, but for demo purposes, show a "Not Found" state or generic
            setCar(null);
        }
    }, [plate]);

    if (!car) {
        return (
            <div className="min-h-screen bg-brand-dark-blue flex items-center justify-center p-6 text-center">
                <div>
                    <Shield className="w-16 h-16 text-brand-slate mx-auto mb-4 opacity-20" />
                    <h1 className="text-white text-xl font-orbitron">VEHÍCULO NO ENCONTRADO</h1>
                    <p className="text-brand-slate mt-2">Este vehículo no cuenta con historial certificado público.</p>
                </div>
            </div>
        );
    }

    const isProtected = car.status === "protected";

    return (
        <div className="min-h-screen bg-brand-dark-blue font-inter">
            {/* Header */}
            <div className="bg-brand-mid-blue/30 border-b border-white/5 p-6 flex justify-between items-center">
                <h1 className="text-brand-cyan font-orbitron font-bold tracking-wider">VICTORY LABS</h1>
                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 border border-green-500/20">
                    <CheckCircle size={14} /> CERTIFICADO
                </div>
            </div>

            <div className="max-w-md mx-auto p-6 space-y-8">

                {/* Main Status Card */}
                <div className="text-center relative">
                    <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 shadow-glow ${isProtected ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-red-500/20 text-red-500'}`}>
                        <Shield size={64} />
                    </div>
                    <h2 className="text-3xl text-white font-orbitron font-bold mb-1">{car.plate}</h2>
                    <p className="text-brand-slate uppercase tracking-widest text-sm">{car.model}</p>
                </div>

                {/* Protection Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-mid-blue/40 p-4 rounded-xl border border-white/5 text-center">
                        <p className="text-brand-slate text-xs uppercase mb-1">Estado</p>
                        <p className="text-white font-bold text-lg flex items-center justify-center gap-2">
                            {isProtected ? "BLINDADO" : "VULNERABLE"}
                        </p>
                    </div>
                    <div className="bg-brand-mid-blue/40 p-4 rounded-xl border border-white/5 text-center">
                        <p className="text-brand-slate text-xs uppercase mb-1">Garantía Hasta</p>
                        <p className="text-brand-cyan font-bold text-lg">{new Date(car.warranty_until).getFullYear()}</p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-brand-mid-blue/20 rounded-2xl p-6 border border-white/5">
                    <h3 className="text-white font-orbitron font-bold mb-6 flex items-center gap-2">
                        <HistoryIcon /> HISTORIAL CLÍNICO
                    </h3>

                    <div className="space-y-6 relative border-l border-white/10 ml-2 pl-6">
                        {car.services.map((service) => (
                            <div key={service.id} className="relative">
                                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-brand-cyan shadow-glow"></div>
                                <p className="text-white font-bold">{service.name}</p>
                                <p className="text-brand-slate text-xs flex items-center gap-2 mt-1">
                                    <Calendar size={12} /> {service.date}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Value Prop for Resale */}
                <div className="bg-gradient-to-br from-brand-mid-blue to-brand-dark-blue p-6 rounded-2xl border border-brand-cyan/20 text-center">
                    <Award className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                    <h3 className="text-white font-bold font-orbitron mb-2">VALOR CERTIFICADO</h3>
                    <p className="text-brand-slate text-sm mb-4">
                        Este vehículo cuenta con historial de mantenimiento estético verificable por Victory Labs.
                    </p>
                    <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/20 py-3 rounded-lg text-sm font-bold transition-all">
                        DESCARGAR PDF
                    </button>
                </div>

                <p className="text-center text-brand-slate/30 text-xs mt-12">
                    Victory Cars S.A.S. • ID: {plate}-{new Date().getFullYear()}
                </p>

            </div>
        </div>
    );
}

function HistoryIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" /></svg>
    )
}
