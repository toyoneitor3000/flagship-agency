'use client';

import { motion } from 'framer-motion';
import { Rocket, Clock, CheckCircle2, ArrowRight, Sparkles, Zap, Shield, ChevronRight, Lock } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PurrpurrGuide } from '@/components/purrpurr/PurrpurrGuide';

const industries = [
    { value: 'automotriz', label: '🚗 Automotriz / Taller' },
    { value: 'salud', label: '🏥 Salud / Médico' },
    { value: 'restaurante', label: '🍽️ Restaurante / Bar' },
    { value: 'hotel', label: '🏨 Hotel / Hospedaje' },
    { value: 'arquitectura', label: '🏗️ Arquitectura / Diseño' },
    { value: 'muebles', label: '🪑 Muebles / Decoración' },
    { value: 'fitness', label: '💪 Fitness / Gym' },
    { value: 'ecommerce', label: '🛒 E-commerce / Tienda' },
    { value: 'servicios', label: '💼 Servicios Profesionales' },
    { value: 'otro', label: '✨ Otro' },
];

export default function DemoPage() {
    const [formState, setFormState] = useState({
        name: '',
        whatsapp: '',
        instagram: '',
        industry: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
            } else {
                setError(data.message || 'Algo salió mal. Intenta de nuevo.');
            }
        } catch {
            setError('Error de conexión. Intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatWhatsApp = (value: string) => {
        // Remove non-digits
        const digits = value.replace(/\D/g, '');
        return digits;
    };

    return (
        <div className="min-h-screen bg-[#0a011f] relative overflow-hidden selection:bg-[#8f69ff]/30">
            {/* Premium Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8f69ff]/10 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 animate-pulse opacity-50" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#709600]/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
            </div>

            {/* Purrpurr Guide */}
            <PurrpurrGuide
                mode="floating"
                tip="¿No sabes qué necesitas? Escríbeme y te asesoro gratis."
                cta={{
                    label: 'Asesoría por WhatsApp',
                    onClick: () => window.open('https://wa.me/573209544587?text=Hola%2C%20quiero%20asesoria%20sobre%20mi%20web', '_blank'),
                    variant: 'whatsapp'
                }}
            />

            <div className="relative z-10 container mx-auto px-4 pt-4 pb-20 md:pb-32">

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-7xl mx-auto pt-8">
                    {/* Left Column - Copy */}
                    <div className="text-center lg:text-left">
                        {/* No Badge */}

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight"
                        >
                            De la idea a la <br className="hidden md:block" />
                            <span className="relative whitespace-nowrap">
                                <span className="absolute -inset-1 bg-gradient-to-r from-[#8f69ff] to-[#6d42e5] blur-2xl opacity-30" />
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#b196ff] via-[#8f69ff] to-[#6d42e5]">
                                    realidad
                                </span>
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-12 space-y-6"
                        >
                            <p className="text-lg text-zinc-300 leading-relaxed font-light">
                                <strong className="text-white font-medium">Arquitectura Digital de Alto Nivel.</strong> Construimos un prototipo funcional de tu visión para que valides la calidad de nuestra ingeniería antes de invertir.
                            </p>

                            {/* Process Steps - Professional Tone */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-[#8f69ff]/10 flex items-center justify-center flex-shrink-0 border border-[#8f69ff]/20">
                                        <Sparkles className="w-5 h-5 text-[#8f69ff]" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-sm font-bold text-white">1. Solicitud de Acceso</h3>
                                        <p className="text-xs text-zinc-400">Cuéntanos tu visión. Analizamos la viabilidad técnica.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-[#8f69ff]/10 flex items-center justify-center flex-shrink-0 border border-[#8f69ff]/20">
                                        <Rocket className="w-5 h-5 text-[#8f69ff]" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-sm font-bold text-white">2. Ingeniería & Prototipado</h3>
                                        <p className="text-xs text-zinc-400">Desarrollamos una versión funcional en 48 horas.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-[#8f69ff]/10 flex items-center justify-center flex-shrink-0 border border-[#8f69ff]/20">
                                        <CheckCircle2 className="w-5 h-5 text-[#8f69ff]" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-sm font-bold text-white">3. Decisión de Lanzamiento</h3>
                                        <p className="text-xs text-zinc-400">Recibes el prototipo + propuesta comercial. Tú decides el siguiente paso.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glow Behind Form */}
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-[#8f69ff] to-[#709600] rounded-[24px] blur-2xl opacity-20" />

                        {/* Form Card */}
                        <div className="relative bg-[#0f0033]/90 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl overflow-hidden ring-1 ring-white/5">

                            {/* Decorative grid inside card */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

                            {isSuccess ? (
                                /* Success State */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8 relative z-10"
                                >
                                    <div className="w-24 h-24 bg-gradient-to-tr from-[#709600]/20 to-[#ccff00]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#709600]/30 shadow-[0_0_30px_-5px_rgba(112,150,0,0.3)]">
                                        <CheckCircle2 className="w-12 h-12 text-[#ccff00]" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-white mb-4">Solicitud Recibida</h2>
                                    <p className="text-zinc-300 mb-8 max-w-sm mx-auto">
                                        Tu proyecto ha entrado en nuestra cola de análisis. Uno de nuestros arquitectos digitales te contactará brevemente.
                                    </p>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left">
                                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                            <Sparkles className="w-4 h-4 text-[#8f69ff]" />
                                            Siguientes pasos
                                        </h3>
                                        <ul className="space-y-3">
                                            {[
                                                'Análisis de viabilidad (1-2 horas)',
                                                'Contacto inicial vía WhatsApp',
                                                'Definición de alcance del prototipo',
                                                'Inicio de construcción'
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                                    <div className="w-5 h-5 rounded-full bg-[#8f69ff]/20 flex items-center justify-center flex-shrink-0 text-[#8f69ff] text-xs font-bold">
                                                        {i + 1}
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link
                                        href="/api/auth/signin"
                                        className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Rocket className="w-5 h-5" />
                                        Crear cuenta de seguimiento
                                    </Link>
                                </motion.div>
                            ) : (
                                /* Form Content */
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div>
                                            <h2 className="text-2xl font-display font-bold text-white mb-1">Solicitar Prototipo</h2>
                                            <p className="text-sm text-zinc-400">Arquitectura preliminar sin costo.</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-[#8f69ff]/10 border border-[#8f69ff]/20">
                                            <Sparkles className="w-6 h-6 text-[#8f69ff]" />
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Name */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
                                                Nombre / Empresa
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ej: Startup Increíble"
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full bg-[#1a0b40]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff] transition-all"
                                            />
                                        </div>

                                        {/* WhatsApp */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
                                                WhatsApp de Contacto
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono group-focus-within:text-[#8f69ff] transition-colors">+57</div>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="300 123 4567"
                                                    value={formState.whatsapp}
                                                    onChange={(e) =>
                                                        setFormState({ ...formState, whatsapp: formatWhatsApp(e.target.value) })
                                                    }
                                                    className="w-full bg-[#1a0b40]/50 border border-white/10 rounded-xl pl-14 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff] transition-all font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Industry */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
                                                    Industria
                                                </label>
                                                <select
                                                    required
                                                    value={formState.industry}
                                                    onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                                                    className="w-full bg-[#1a0b40]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff] transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled className="text-zinc-500">Seleccionar...</option>
                                                    {industries.map((ind) => (
                                                        <option key={ind.value} value={ind.value} className="bg-[#1a0b40]">
                                                            {ind.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Instagram */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
                                                    Instagram
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">@</span>
                                                    <input
                                                        type="text"
                                                        placeholder="usuario"
                                                        value={formState.instagram}
                                                        onChange={(e) =>
                                                            setFormState({ ...formState, instagram: e.target.value.replace('@', '') })
                                                        }
                                                        className="w-full bg-[#1a0b40]/50 border border-white/10 rounded-xl pl-8 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff] transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">
                                                Tu Visión (Opcional)
                                            </label>
                                            <textarea
                                                placeholder="Descríbenos brevemente tu proyecto soñado..."
                                                value={formState.message}
                                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                rows={3}
                                                className="w-full bg-[#1a0b40]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff] transition-all resize-none"
                                            />
                                        </div>

                                        {/* Error */}
                                        {error && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                {error}
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-[#8f69ff] to-[#6d42e5] hover:from-[#9d7aff] hover:to-[#7d52f5] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(143,105,255,0.5)] hover:shadow-[0_0_30px_-5px_rgba(143,105,255,0.7)] group relative overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Procesando...
                                                    </>
                                                ) : (
                                                    <>
                                                        Solicitar Prototipo
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </span>
                                        </button>

                                        {/* Transparency Notice */}
                                        <div className="mt-6 pt-4 border-t border-white/10">
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    <Zap className="w-4 h-4 text-[#ccff00]" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs text-white font-bold">Claridad ante todo:</p>
                                                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                                                        Junto con tu prototipo, recibirás una <span className="text-white">propuesta comercial detallada</span> para su publicación y desarrollo completo. Si prefieres conocer nuestros precios estándar antes, <Link href="/#pricing" target="_blank" className="text-zinc-200 underline hover:text-white transition-colors">puedes verlos aquí</Link>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
