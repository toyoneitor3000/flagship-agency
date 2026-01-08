'use client';

import { motion } from 'framer-motion';
import { Rocket, Clock, CheckCircle2, ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
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

const benefits = [
    { icon: Clock, text: 'Entrega en 48 horas', subtext: 'Lo que otros tardan semanas' },
    { icon: Zap, text: 'Arquitectura real', subtext: 'No plantillas genéricas' },
    { icon: Star, text: '100% gratis', subtext: 'Sin compromiso alguno' },
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
        <div className="min-h-screen bg-[#0f0033] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8f69ff]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#709600]/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8f69ff05_1px,transparent_1px),linear-gradient(to_bottom,#8f69ff05_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            {/* Purrpurr Guide - Gatito flotante */}
            <PurrpurrGuide
                mode="floating"
                tip="¿Tienes dudas? Escríbenos por WhatsApp y te ayudamos a elegir el plan perfecto para tu negocio."
                cta={{
                    label: 'Hablar por WhatsApp',
                    onClick: () => window.open('https://wa.me/573209544587?text=Hola%2C%20tengo%20dudas%20sobre%20las%20demos', '_blank'),
                    variant: 'whatsapp'
                }}
            />

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#8f69ff] transition-colors mb-8 text-sm font-mono group"
                >
                    <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Volver al inicio
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
                    {/* Left Column - Copy */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#709600]/20 border border-[#709600]/30 text-[#709600] text-sm font-bold mb-6"
                        >
                            <Sparkles className="w-4 h-4" />
                            Demo gratis y sin compromiso
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0ffcc] mb-6 leading-tight"
                        >
                            Ve cómo se vería{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8f69ff] to-[#b196ff]">
                                tu web
                            </span>{' '}
                            en 48 horas
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-[#f0ffcc]/70 mb-4 max-w-xl mx-auto lg:mx-0"
                        >
                            Desarrollamos desde landing pages hasta ecosistemas digitales completos.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="text-sm text-[#f0ffcc]/50 mb-8 max-w-xl mx-auto lg:mx-0 font-mono"
                        >
                            Proyectos desde $500K COP hasta $16,000 USD
                        </motion.p>

                        {/* Benefits */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-3 gap-4 mb-8"
                        >
                            {benefits.map((benefit, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#8f69ff]/10 border border-[#8f69ff]/20 mb-2">
                                        <benefit.icon className="w-5 h-5 text-[#8f69ff]" />
                                    </div>
                                    <p className="text-sm font-bold text-[#f0ffcc]">{benefit.text}</p>
                                    <p className="text-xs text-[#f0ffcc]/50">{benefit.subtext}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Value prop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center lg:justify-start gap-2 text-sm text-[#f0ffcc]/60"
                        >
                            <Zap className="w-4 h-4 text-[#709600]" />
                            <span>Velocidad de startup, complejidad de agencia</span>
                        </motion.div>
                    </div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#8f69ff] to-[#709600] rounded-2xl blur-lg opacity-20" />

                        {/* Form Card */}
                        <div className="relative bg-[#1a0b40]/80 backdrop-blur-xl border border-[#8f69ff]/20 rounded-2xl p-6 md:p-8 shadow-2xl">
                            {isSuccess ? (
                                /* Success State - Invite to Register */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-20 h-20 bg-[#709600]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#709600]/30">
                                        <CheckCircle2 className="w-10 h-10 text-[#709600]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#f0ffcc] mb-3">¡Solicitud Recibida!</h2>
                                    <p className="text-[#f0ffcc]/70 mb-6">
                                        Ya estamos trabajando en tu demo personalizada. Te contactaremos por WhatsApp en las próximas 48 horas.
                                    </p>

                                    {/* Divider */}
                                    <div className="flex items-center gap-4 my-6">
                                        <div className="flex-1 h-px bg-[#8f69ff]/20" />
                                        <span className="text-xs text-[#f0ffcc]/40 font-mono">SIGUIENTE PASO</span>
                                        <div className="flex-1 h-px bg-[#8f69ff]/20" />
                                    </div>

                                    {/* Account Benefits */}
                                    <div className="bg-[#0f0033]/50 border border-[#8f69ff]/10 rounded-xl p-5 mb-6 text-left">
                                        <h3 className="text-sm font-bold text-[#f0ffcc] mb-3 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[#8f69ff]" />
                                            Crea tu cuenta para:
                                        </h3>
                                        <ul className="space-y-2 text-sm text-[#f0ffcc]/70">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-[#709600] mt-0.5 flex-shrink-0" />
                                                <span>Ver el estado de tu proyecto en tiempo real</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-[#709600] mt-0.5 flex-shrink-0" />
                                                <span>Personalizar colores, textos y secciones</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-[#709600] mt-0.5 flex-shrink-0" />
                                                <span>Conectar tu dominio cuando estés listo</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-[#709600] mt-0.5 flex-shrink-0" />
                                                <span>Publicar tu sitio con un clic</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="space-y-3">
                                        <Link
                                            href="/api/auth/signin"
                                            className="w-full bg-gradient-to-r from-[#8f69ff] to-[#6d42e5] hover:from-[#9d7aff] hover:to-[#7d52f5] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#8f69ff]/25"
                                        >
                                            <Rocket className="w-5 h-5" />
                                            Crear mi Cuenta Gratis
                                        </Link>
                                        <p className="text-xs text-[#f0ffcc]/40">
                                            ¿Ya tienes cuenta? <Link href="/api/auth/signin" className="text-[#8f69ff] hover:underline">Inicia sesión</Link>
                                        </p>
                                    </div>

                                    {/* Skip Option */}
                                    <p className="mt-6 text-xs text-[#f0ffcc]/30">
                                        También te enviaremos el link por WhatsApp cuando tu demo esté lista
                                    </p>
                                </motion.div>
                            ) : (
                                /* Form */
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg bg-[#8f69ff]/20">
                                            <Rocket className="w-5 h-5 text-[#8f69ff]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-[#f0ffcc]">Solicita tu Demo</h2>
                                            <p className="text-sm text-[#f0ffcc]/60">Campos obligatorios marcados con *</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#f0ffcc]/80 mb-2">
                                                Tu nombre o empresa *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ej: Tu Negocio S.A.S"
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full bg-[#0f0033]/50 border border-[#8f69ff]/20 rounded-lg px-4 py-3 text-[#f0ffcc] placeholder:text-[#f0ffcc]/30 focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff]/50 transition-all"
                                            />
                                        </div>

                                        {/* WhatsApp */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#f0ffcc]/80 mb-2">
                                                Tu WhatsApp *
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0ffcc]/50">+57</span>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="300 123 4567"
                                                    value={formState.whatsapp}
                                                    onChange={(e) =>
                                                        setFormState({ ...formState, whatsapp: formatWhatsApp(e.target.value) })
                                                    }
                                                    className="w-full bg-[#0f0033]/50 border border-[#8f69ff]/20 rounded-lg pl-14 pr-4 py-3 text-[#f0ffcc] placeholder:text-[#f0ffcc]/30 focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff]/50 transition-all"
                                                />
                                            </div>
                                            <p className="text-xs text-[#f0ffcc]/40 mt-1">Te enviaremos el demo por aquí</p>
                                        </div>

                                        {/* Instagram (optional) */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#f0ffcc]/80 mb-2">
                                                Instagram del negocio <span className="text-[#f0ffcc]/40">(opcional)</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0ffcc]/50">@</span>
                                                <input
                                                    type="text"
                                                    placeholder="tunegocio"
                                                    value={formState.instagram}
                                                    onChange={(e) =>
                                                        setFormState({ ...formState, instagram: e.target.value.replace('@', '') })
                                                    }
                                                    className="w-full bg-[#0f0033]/50 border border-[#8f69ff]/20 rounded-lg pl-10 pr-4 py-3 text-[#f0ffcc] placeholder:text-[#f0ffcc]/30 focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff]/50 transition-all"
                                                />
                                            </div>
                                            <p className="text-xs text-[#f0ffcc]/40 mt-1">Lo usamos para personalizar tu demo</p>
                                        </div>

                                        {/* Industry */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#f0ffcc]/80 mb-2">
                                                Industria *
                                            </label>
                                            <select
                                                required
                                                value={formState.industry}
                                                onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                                                className="w-full bg-[#0f0033]/50 border border-[#8f69ff]/20 rounded-lg px-4 py-3 text-[#f0ffcc] focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff]/50 transition-all cursor-pointer appearance-none"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238f69ff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 12px center',
                                                    backgroundSize: '20px',
                                                }}
                                            >
                                                <option value="" disabled className="text-zinc-500">
                                                    Selecciona tu industria
                                                </option>
                                                {industries.map((ind) => (
                                                    <option key={ind.value} value={ind.value} className="bg-[#1a0b40]">
                                                        {ind.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Message/Prompt */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#f0ffcc]/80 mb-2">
                                                ¿Qué tienes en mente? <span className="text-[#f0ffcc]/40">(opcional pero ayuda mucho)</span>
                                            </label>
                                            <textarea
                                                placeholder="Ej: Quiero una web elegante para mostrar mis trabajos y que los clientes puedan agendar citas..."
                                                value={formState.message}
                                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                rows={3}
                                                className="w-full bg-[#0f0033]/50 border border-[#8f69ff]/20 rounded-lg px-4 py-3 text-[#f0ffcc] placeholder:text-[#f0ffcc]/30 focus:outline-none focus:border-[#8f69ff] focus:ring-1 focus:ring-[#8f69ff]/50 transition-all resize-none"
                                            />
                                            <p className="text-xs text-[#f0ffcc]/40 mt-1">Cuéntanos tu visión para personalizar mejor tu demo</p>
                                        </div>

                                        {/* Error Message */}
                                        {error && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-[#8f69ff] to-[#6d42e5] hover:from-[#9d7aff] hover:to-[#7d52f5] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#8f69ff]/25 disabled:opacity-70 disabled:cursor-not-allowed group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    Quiero mi Demo Gratis
                                                </>
                                            )}
                                        </button>

                                        {/* Trust Text */}
                                        <p className="text-center text-xs text-[#f0ffcc]/40">
                                            🔒 Tus datos están seguros. No spam, solo tu demo.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute -top-4 -right-4 w-12 h-12 bg-[#709600]/20 rounded-lg border border-[#709600]/30 flex items-center justify-center"
                        >
                            <Star className="w-6 h-6 text-[#709600]" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
