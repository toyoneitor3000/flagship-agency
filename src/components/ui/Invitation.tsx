'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, CheckCircle2, Loader2, Sparkles, ArrowRight, ArrowDown } from 'lucide-react';

export const Invitation = () => {
    const [step, setStep] = useState<'form' | 'processing' | 'confirmed'>('form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        notes: ''
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStep('processing');

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2500));
            setStep('confirmed');
        } catch (error) {
            console.error(error);
            setStep('confirmed');
        }
    };

    return (
        <section className="py-24 relative overflow-hidden bg-zinc-950 border-t border-zinc-900" id="invitation">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Copy & Value Prop */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            OPEN FOR NEW PROJECTS
                        </div>

                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Únete al futuro.
                            </span>
                        </h2>

                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            No te pedimos que imagines el potencial de tu negocio. Déjanos mostrártelo.
                            <br /><br />
                            Solicita una <strong className="text-white">previsualización gratuita</strong> y en 24 horas recibirás un prototipo funcional de cómo podría verse tu infraestructura digital modernizada.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 mt-1">
                                    <Terminal size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Análisis de Arquitectura</h4>
                                    <p className="text-sm text-zinc-500">Evaluamos tu stack actual y proponemos mejoras de rendimiento y escalabilidad.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 mt-1">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Prototipo UX/UI</h4>
                                    <p className="text-sm text-zinc-500">Un vistazo real a la experiencia de usuario que tus clientes merecen.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <a href="#philosophy" className="text-zinc-500 hover:text-white text-sm font-mono flex items-center gap-2 transition-colors group">
                                <span className="group-hover:underline decoration-zinc-500 underline-offset-4">¿Aún no estás seguro? Ver Portafolio</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl"></div>
                        <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl">

                            <AnimatePresence mode="wait">
                                {step === 'form' ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold text-white">Solicita tu Demo</h3>
                                            <span className="text-xs font-mono text-zinc-500">EST_TIME: 24H</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">NOMBRE_COMPLETO</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">EMAIL_CORPORATIVO</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                                    placeholder="john@company.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">SITIO_WEB_ACTUAL</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                                    placeholder="www.company.com"
                                                    value={formData.website}
                                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full mt-4 bg-white text-zinc-950 font-bold py-4 rounded-lg hover:bg-zinc-200 transition-all active:scale-[0.98] group"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                INICIAR PREVISUALIZACIÓN
                                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </button>

                                        <p className="text-[10px] text-zinc-600 text-center mt-4">
                                            Al enviar este formulario aceptas nuestra política de privacidad.
                                        </p>
                                    </motion.form>
                                ) : step === 'processing' ? (
                                    <motion.div
                                        key="processing"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-12 flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse"></div>
                                            <Loader2 className="w-16 h-16 text-indigo-400 animate-spin relative z-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Procesando Solicitud</h3>
                                            <p className="text-sm text-zinc-400">Analizando parámetros iniciales...</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="confirmed"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-8 flex flex-col items-center text-center"
                                    >
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                                            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">¡Recibido!</h3>
                                        <p className="text-zinc-400 mb-8 max-w-xs mx-auto">
                                            Tu solicitud ha entrado en nuestra cola de procesamiento. Recibirás tu previsualización en:
                                        </p>

                                        <div className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-xl text-white mb-8">
                                            &lt; 24:00:00
                                        </div>

                                        <p className="text-xs text-zinc-500">Revisa tu bandeja de entrada ({formData.email})</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Button */}
            <div className="flex justify-center mt-12 pb-8">
                <a
                    href="#cta"
                    className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors duration-300"
                >
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Misión Final</span>
                    <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                </a>
            </div>
        </section>
    );
};
