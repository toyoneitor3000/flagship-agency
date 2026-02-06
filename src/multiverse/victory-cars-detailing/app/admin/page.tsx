"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
    const [pin, setPin] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Phase 1: Simple Hardcoded PIN for speed
        if (pin === "2025") {
            localStorage.setItem("victory_admin_session", "true");
            router.push("/admin/dashboard");
        } else {
            alert("PIN Incorrecto");
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark-blue flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-brand-mid-blue/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-glow">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheck className="w-8 h-8 text-brand-cyan" />
                    </div>
                    <h1 className="text-2xl font-bold text-white font-orbitron">VICTORY OS</h1>
                    <p className="text-brand-slate text-sm">Acceso Administrativo</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-brand-slate text-xs mb-2 uppercase tracking-wider">
                            PIN de Acceso
                        </label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full bg-brand-dark-blue/50 border border-white/10 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                            placeholder="••••"
                            maxLength={4}
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-cyan text-brand-dark-blue font-bold py-3 rounded-full hover:bg-white hover:shadow-glow transition-all duration-300"
                    >
                        INGRESAR
                    </button>
                </form>
            </div>
        </div>
    );
}
