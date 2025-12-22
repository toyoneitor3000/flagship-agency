'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface LeadMagnetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LeadMagnetModal = ({ isOpen, onClose }: LeadMagnetModalProps) => {
    const [step, setStep] = useState<'form' | 'processing' | 'confirmed'>('form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: ''
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStep('processing');

        try {
            // Run request and minimum timer in parallel
            await Promise.all([
                fetch('/api/send-lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }),
                new Promise(resolve => setTimeout(resolve, 2000)) // Min 2s animation
            ]);

            setStep('confirmed');
        } catch (error) {
            console.error('Error submitting lead:', error);
            // Fallback to confirmed to not block user (logs error in console)
            setStep('confirmed');
        }
    };

    const reset = () => {
        setStep('form');
        setFormData({ name: '', email: '', website: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-zinc-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 animate-gradient"></div>

                        <div className="p-6 md:p-8">
                            {step === 'form' && (
                                <>
                                    <div className="text-center mb-6">
                                        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
                                            AGENTE_PURRPURR_V1.0
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Auditoría Técnica Gratuita</h3>
                                        <p className="text-zinc-400 text-sm">
                                            Déjame revisar tu sitio. Un experto analizará tu arquitectura y te enviará un plan de mejora sin costo.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">URL_OBJETIVO</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="tu-negocio.com"
                                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm font-mono"
                                                value={formData.website}
                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">NOMBRE_CLIENTE</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">EMAIL_REPORTE</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-lg shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.5)] transition-all active:scale-[0.98] group"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                SOLICITAR ANÁLISIS
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </span>
                                        </button>

                                        <p className="text-[10px] text-zinc-600 text-center font-mono">
                                            * Análisis manual valorado en $200 USD. Gratis por tiempo limitado.
                                        </p>
                                    </form>
                                </>
                            )}

                            {step === 'processing' && (
                                <div className="py-8 text-center">
                                    <div className="relative w-24 h-24 mx-auto mb-6">
                                        <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center font-mono text-purple-400 text-xs animate-pulse">
                                            SYNCING
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Conectando con Flagship...</h3>
                                    <div className="space-y-1 font-mono text-xs text-zinc-500">
                                        <p className="animate-pulse">Validando URL del proyecto...</p>
                                        <p className="animate-pulse delay-75">Verificando disponibilidad de ingenieros...</p>
                                        <p className="animate-pulse delay-150">Creando ticket de auditoría #AUD-2024...</p>
                                    </div>
                                </div>
                            )}

                            {step === 'confirmed' && (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">¡Solicitud Confirmada!</h3>
                                    <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
                                        Hemos agendado la revisión de <span className="text-white font-medium">{formData.website}</span>.
                                        <br /><br />
                                        Nuestro equipo analizará manualmente:
                                    </p>

                                    <div className="space-y-2 mb-6 text-left">
                                        <div className="flex items-center gap-3 text-sm text-zinc-400 bg-zinc-950/50 p-2.5 rounded border border-zinc-800">
                                            <span className="text-purple-400">⚡</span>
                                            <span>Performance y Core Web Vitals</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-zinc-400 bg-zinc-950/50 p-2.5 rounded border border-zinc-800">
                                            <span className="text-purple-400">💎</span>
                                            <span>Calidad de UI/UX y Conversión</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-zinc-400 bg-zinc-950/50 p-2.5 rounded border border-zinc-800">
                                            <span className="text-purple-400">🔍</span>
                                            <span>SEO Técnico y Accesibilidad</span>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-4">
                                        <p className="text-xs text-purple-200">
                                            Enviaremos el reporte detallado a <span className="font-mono text-white">{formData.email}</span> dentro de las próximas 24 horas.
                                        </p>
                                    </div>

                                    <button
                                        onClick={reset}
                                        className="text-sm text-zinc-500 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4"
                                    >
                                        Entendido, volver al sitio
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
