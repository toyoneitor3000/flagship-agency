"use client";

import { useState } from "react";
import { ArrowLeft, Save, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Catalog for Autocomplete
const SERVICES = [
    "Lavado Normal",
    "Lavado Premium Aqua Wash",
    "Lavado Detailing",
    "Protección Cerámica 3 Años",
    "Protección Cerámica 5 Años",
    "Mantenimiento Cerámico",
    "Tapicería Full Clean",
    "PPF - Frontal",
    "PPF - Total",
    "Polarizado Nano-Cerámico"
];

export default function NewServicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        plate: "",
        clientName: "",
        clientPhone: "",
        service: SERVICES[1], // Default to Premium
        notes: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "plate" ? value.toUpperCase() : value
        }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock Database Logic (LocalStorage)
        const newService = {
            id: Date.now().toString(),
            ...formData,
            date: new Date().toISOString(),
            status: "completed"
        };

        // Get existing and add new
        const existing = JSON.parse(localStorage.getItem("victory_db_services") || "[]");
        localStorage.setItem("victory_db_services", JSON.stringify([newService, ...existing]));

        // Generate WhatsApp Link
        // Format: "Hola [Nombre], tu [Placa] ya recibió su [Servicio]. Aquí tu certificado digital: victorycars.com/garage/[Placa]"
        const message = `Hola ${formData.clientName}, tu vehículo ${formData.plate} ha recibido su servicio de ${formData.service} en Victory Cars 🏁.\n\nPuedes ver tu historial digital y garantía aquí:\nhttps://victorycarsdetailing.com/garage/${formData.plate}`;
        const waLink = `https://wa.me/57${formData.clientPhone}?text=${encodeURIComponent(message)}`;

        // Simulate Network delay just for feel
        setTimeout(() => {
            const confirmSend = window.confirm("¡Guardado! ¿Quieres enviar el reporte por WhatsApp al cliente?");
            if (confirmSend) {
                window.open(waLink, '_blank');
            }
            router.push("/admin/dashboard");
        }, 800);
    };

    return (
        <div className="min-h-screen bg-brand-dark-blue p-6">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/dashboard" className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-white font-orbitron">NUEVO SERVICIO</h1>
            </div>

            <form onSubmit={handleSave} className="space-y-6 max-w-lg mx-auto">

                {/* Placa Section - BIG */}
                <div className="bg-brand-mid-blue/30 p-4 rounded-xl border border-brand-cyan/20">
                    <label className="block text-brand-cyan text-xs mb-2 uppercase font-bold tracking-wider">
                        Placa del Vehículo
                    </label>
                    <input
                        name="plate"
                        required
                        value={formData.plate}
                        onChange={handleChange}
                        className="w-full bg-transparent text-4xl font-black text-white text-center uppercase tracking-widest focus:outline-none placeholder-white/10 font-orbitron"
                        placeholder="ABC-123"
                        maxLength={6}
                    />
                </div>

                {/* Cliente Info */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-brand-slate text-xs mb-2">Nombre Cliente</label>
                        <input
                            name="clientName"
                            required
                            value={formData.clientName}
                            onChange={handleChange}
                            className="w-full bg-brand-mid-blue/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-cyan outline-none"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>
                    <div>
                        <label className="block text-brand-slate text-xs mb-2">WhatsApp (Sin +57)</label>
                        <input
                            name="clientPhone"
                            type="tel"
                            required
                            value={formData.clientPhone}
                            onChange={handleChange}
                            className="w-full bg-brand-mid-blue/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-cyan outline-none"
                            placeholder="3001234567"
                        />
                    </div>
                </div>

                {/* Service Select */}
                <div>
                    <label className="block text-brand-slate text-xs mb-2">Servicio Realizado</label>
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-brand-mid-blue/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-cyan outline-none appearance-none"
                    >
                        {SERVICES.map(s => (
                            <option key={s} value={s} className="bg-brand-mid-blue text-white">{s}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-cyan text-brand-dark-blue font-bold py-4 rounded-xl hover:bg-white hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 mt-8"
                >
                    {loading ? "GUARDANDO..." : (
                        <>
                            <Save size={20} />
                            GUARDAR Y NOTIFICAR
                        </>
                    )}
                </button>

            </form>
        </div>
    );
}
