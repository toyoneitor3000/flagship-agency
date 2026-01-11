'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Droplets, Wind, ArrowRight } from 'lucide-react';

export default function InertiaEngineIndexPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans relative selection:bg-purple-500/30" data-section-theme='dark'>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-32">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                        <span className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase">Lab_01 / Physics</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                        Inertia Engine
                    </h1>
                    <p className="text-zinc-400 text-lg font-mono max-w-2xl">
                        &gt; Motor de física para fondos dinámicos. Selecciona un módulo para experimentar con diferentes sistemas de partículas y movimiento.
                    </p>
                </motion.div>

                {/* Engine Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* FLUID ENGINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/creative-test/fluid"
                            className="group block relative bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]"
                        >
                            {/* Preview Background */}
                            <div className="h-48 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-cyan-500/30 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Droplets className="w-20 h-20 text-blue-400/50 group-hover:scale-125 transition-transform duration-700" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">Fluid Dynamics</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
                                    Fluid Background
                                </h2>
                                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                                    Simulación de fluidos con WebGL. Partículas que reaccionan al cursor con física de inercia, fricción y elasticidad configurables.
                                </p>
                                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-blue-400 transition-colors">
                                    <span>Iniciar Simulación</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* TEXTILE ENGINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            href="/creative-test/aerodynamics"
                            className="group block relative bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(147,51,234,0.15)]"
                        >
                            {/* Preview Background */}
                            <div className="h-48 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-amber-500/20 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Wind className="w-20 h-20 text-purple-400/50 group-hover:scale-125 transition-transform duration-700" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                                    <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest">Textile Engine</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
                                    Texture Factory
                                </h2>
                                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                                    Fábrica de texturas y viento. Controla dinámica de telas, física textil, ondas, turbulencia, flujo orgánico e iluminación.
                                </p>
                                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-purple-400 transition-colors">
                                    <span>Abrir Fábrica</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                </div>

            </div>
        </div>
    );
}
