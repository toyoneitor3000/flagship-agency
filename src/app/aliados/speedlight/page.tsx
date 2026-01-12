'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, ExternalLink, ShieldCheck, Car, ShoppingBag, Image as ImageIcon, Lock } from 'lucide-react';
import { useState } from 'react';

export default function SpeedlightPartnerPage() {
    const [copied, setCopied] = useState(false);
    const couponCode = "SPEEDLIGHT-30";

    const handleCopy = () => {
        navigator.clipboard.writeText(couponCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#00FF9C] selection:text-black">
            <Navbar />

            <main className="pt-24 pb-24 px-4 container mx-auto max-w-4xl relative">
                {/* Ambient Backlight */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#00FF9C]/10 to-transparent blur-[120px] pointer-events-none" />

                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-[#00FF9C]/10 border border-[#00FF9C]/20 px-4 py-1.5 rounded-full text-[#00FF9C] text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
                        Alianza Oficial
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
                        PURRPURR <span className="text-zinc-600 font-light">x</span> SPEEDLIGHT
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light">
                        El garaje digital para la cultura automotriz. <br />
                        <strong className="text-white">Potenciando a los creadores del motor en Colombia.</strong>
                    </p>
                </div>

                {/* About Speedlight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center hover:border-[#00FF9C]/30 transition-colors group">
                        <Car className="w-8 h-8 text-[#00FF9C] mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-1">Cultura</h3>
                        <p className="text-sm text-zinc-400">Un homenaje a la pasión automotriz, historias y proyectos.</p>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center hover:border-[#00FF9C]/30 transition-colors group">
                        <ShoppingBag className="w-8 h-8 text-[#00FF9C] mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-1">Marketplace</h3>
                        <p className="text-sm text-zinc-400">Compra y venta segura de partes y vehículos únicos.</p>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center text-center hover:border-[#00FF9C]/30 transition-colors group">
                        <ImageIcon className="w-8 h-8 text-[#00FF9C] mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white mb-1">Galería</h3>
                        <p className="text-sm text-zinc-400">Fotografía de alta resolución y cobertura de eventos.</p>
                    </div>
                </div>

                {/* Benefits Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF9C]/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <ShieldCheck className="text-[#00FF9C]" />
                                Beneficios de Comunidad
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="bg-[#00FF9C]/20 p-1 rounded-full text-[#00FF9C]">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="block text-white">30% de Descuento Inmediato</strong>
                                        <span className="text-sm text-zinc-400">En el setup de cualquier plan (Landing, Web, E-commerce).</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-[#00FF9C]/20 p-1 rounded-full text-[#00FF9C]">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="block text-white">Prioridad en Desarrollo</strong>
                                        <span className="text-sm text-zinc-400">Tu proyecto entra en la fila rápida de ejecución.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-[#00FF9C]/20 p-1 rounded-full text-[#00FF9C]">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="block text-white">Digitalización de Talleres</strong>
                                        <span className="text-sm text-zinc-400">Consultoría especializada para negocios del sector.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                            <span className="text-zinc-500 text-xs uppercase font-bold tracking-widest block mb-4 relative z-10">CÓDIGO DE ACTIVACIÓN</span>

                            <div className="relative z-10 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-4 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                                <div className="bg-zinc-800 p-3 rounded-full mb-2">
                                    <Lock className="w-6 h-6 text-zinc-400" />
                                </div>
                                <div className="flex gap-2 text-2xl font-mono font-bold text-zinc-600 tracking-wider select-none blur-[4px]">
                                    SPEEDLIGHT-30
                                </div>
                                <p className="text-xs text-zinc-400 font-medium">Solo visible para miembros</p>
                            </div>

                            <a
                                href="https://speedlightculture.com"
                                target="_blank"
                                className="w-full inline-flex items-center justify-center gap-2 bg-[#00FF9C] hover:bg-[#00dda0] text-zinc-950 font-bold py-3 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(0,255,156,0.2)] relative z-10"
                            >
                                Obtener mi Código en Speedlight
                                <ExternalLink className="w-4 h-4" />
                            </a>

                            <p className="text-zinc-500 text-xs mt-4 relative z-10">
                                Regístrate gratis y encuentra tu cupón en el dashboard o grupo oficial.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Steps */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-center font-bold text-xl mb-12">¿Cómo reclamar tu beneficio?</h3>

                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-0 before:h-full before:w-[2px] before:bg-zinc-800">
                        <div className="relative pl-16">
                            <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sm font-bold">1</span>
                            <h4 className="font-bold text-white mb-2">Verifica tu cuenta en Speedlight Culture</h4>
                            <p className="text-zinc-400 text-sm mb-4">Debes tener una cuenta activa en la plataforma de la comunidad.</p>
                            <a href="https://speedlightculture.com" target="_blank" className="inline-flex items-center gap-2 text-[#00FF9C] text-sm font-bold hover:underline">
                                Ir a Speedlight Culture <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="relative pl-16">
                            <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sm font-bold">2</span>
                            <h4 className="font-bold text-white mb-2">Configura tu Proyecto</h4>
                            <p className="text-zinc-400 text-sm">
                                Ve a nuestro <Link href="/#pricing" className="text-indigo-400 hover:text-indigo-300">Configurador de Precios</Link> y activa el switch "Comunidad Speedlight".
                            </p>
                        </div>

                        <div className="relative pl-16">
                            <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00FF9C] text-black flex items-center justify-center text-sm font-bold">3</span>
                            <h4 className="font-bold text-white mb-2">¡Listo!</h4>
                            <p className="text-zinc-400 text-sm">
                                El descuento del 30% se aplicará automáticamente a tu propuesta final.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
