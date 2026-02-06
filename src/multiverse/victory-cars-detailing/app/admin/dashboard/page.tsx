"use client";

import Link from "next/link";
import { PlusCircle, Search, History, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
    const router = useRouter();

    useEffect(() => {
        // Basic protection
        const session = localStorage.getItem("victory_admin_session");
        if (!session) router.push("/admin");
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("victory_admin_session");
        router.push("/admin");
    };

    return (
        <div className="min-h-screen bg-brand-dark-blue p-6">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white font-orbitron">VICTORY OS</h1>
                    <p className="text-brand-slate text-xs">Sistema de Gestión Integral</p>
                </div>
                <button onClick={handleLogout} className="text-brand-slate hover:text-white">
                    <LogOut size={20} />
                </button>
            </header>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <Link href="/admin/new-service" className="col-span-2">
                    <div className="bg-gradient-to-r from-brand-cyan to-blue-600 p-6 rounded-2xl shadow-glow text-center hover:scale-105 transition-transform cursor-pointer">
                        <PlusCircle className="w-10 h-10 text-brand-dark-blue mx-auto mb-2" />
                        <h2 className="text-xl font-bold text-brand-dark-blue">REGISTRAR AUTO</h2>
                        <p className="text-brand-dark-blue/70 text-sm">Nuevo ingreso o servicio</p>
                    </div>
                </Link>

                <div className="bg-brand-mid-blue/50 p-6 rounded-2xl border border-white/5 text-center opacity-50">
                    <Search className="w-8 h-8 text-brand-slate mx-auto mb-2" />
                    <h3 className="text-white font-medium">Buscar Placa</h3>
                    <span className="text-xs text-brand-slate">(Próximamente)</span>
                </div>

                <div className="bg-brand-mid-blue/50 p-6 rounded-2xl border border-white/5 text-center opacity-50">
                    <History className="w-8 h-8 text-brand-slate mx-auto mb-2" />
                    <h3 className="text-white font-medium">Historial</h3>
                    <span className="text-xs text-brand-slate">(Próximamente)</span>
                </div>
            </div>

            <section>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Actividad Reciente
                </h3>
                <div className="space-y-3">
                    {/* Mock Items */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-brand-mid-blue/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                            <div>
                                <p className="text-white font-bold">BMW X5 - AXK{100 + i}</p>
                                <p className="text-brand-slate text-xs">Lavado Premium • Hace 2h</p>
                            </div>
                            <span className="text-xs bg-brand-cyan/10 text-brand-cyan px-2 py-1 rounded">
                                Completado
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
