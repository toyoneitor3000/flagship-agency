'use client';

import { motion } from 'framer-motion';
import { Building2, Sparkles, Zap, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PurrpurrFlagshipPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-purple-500/30">

            <main className="relative">
                {/* Global Background Decor */}
                <div className="fixed inset-0 z-0 pointer-events-none bg-[#020202]" />
                <div className="fixed inset-0 z-0 pointer-events-none opacity-10 bg-[url('/grid.svg')] bg-[size:64px_64px]" />

                <div className="container mx-auto px-4 relative z-10">

                    {/* Hero Section */}
                    <section className="relative pt-32 pb-40 flex flex-col items-center justify-center text-center overflow-hidden" data-section-theme="dark">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/10 blur-[120px] -z-10 rounded-full" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 mb-8 backdrop-blur-xl shadow-2xl"
                        >
                            <Building2 className="w-10 h-10 text-purple-400" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.85]"
                        >
                            PURRPURR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600 italic pr-6 inline-block">FLAGSHIP</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-3xl text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed"
                        >
                            Donde la idea se convierte en identidad. El núcleo creativo que define el alma del Multiverso.
                        </motion.p>
                    </section>

                </div>

                {/* The Origin Narrative Section - Contrast Background */}
                <section className="relative py-40 bg-zinc-900/40 border-y border-white/5" data-section-theme="dark">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-20 items-center">
                                <div className="space-y-8">
                                    <span className="text-xs font-mono text-purple-500 uppercase tracking-[0.4em] font-bold block">// La Semilla Original</span>
                                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                                        El Naming que <br />
                                        <span className="text-purple-400">definió una era.</span>
                                    </h2>
                                    <p className="text-zinc-400 text-xl leading-relaxed font-light">
                                        Purrpurr fue el nombre que elegimos con total determinación. Una identidad diseñada para proyectar la precisión, el ritmo y la elegancia que definen nuestra ingeniería. Somos líderes porque cada decisión que tomamos es estratégica y absoluta.
                                    </p>
                                    <div className="flex items-center gap-6 pt-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Establecido</span>
                                            <span className="text-white font-bold font-mono">2024</span>
                                        </div>
                                        <div className="w-px h-10 bg-zinc-800" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Enfoque</span>
                                            <span className="text-white font-bold font-mono">BEYOND BRANDING</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -inset-10 bg-purple-500/20 blur-[100px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                                    <div className="aspect-square bg-black/60 border border-white/10 rounded-[3rem] flex items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                        <span className="text-[12rem] font-bold text-white/5 font-display select-none group-hover:text-purple-500/10 transition-all duration-700 scale-90 group-hover:scale-100">PF</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 relative z-10 pt-40">

                    {/* Services of Flagship */}
                    <section className="mb-40" data-section-theme="dark">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl font-bold tracking-tight mb-4">Capacidades de Agencia</h2>
                            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Protocolos de Ejecución Superior</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { title: "Naming", icon: <Sparkles className="w-6 h-6" />, desc: "Identidades verbales deterministas que resuenan en el Multiverso." },
                                { title: "Visual ID", icon: <Eye className="w-6 h-6" />, desc: "Sistemas visuales de alta gama con precisión de ingeniería." },
                                { title: "Narrativa", icon: <Building2 className="w-6 h-6" />, desc: "Historias de autoridad que construyen legados digitales." },
                                { title: "Estrategia", icon: <Shield className="w-6 h-6" />, desc: "Posicionamiento absoluto y arquitectura de mercado." }
                            ].map((service, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-10 bg-zinc-900/40 border border-white/10 rounded-[2.5rem] hover:bg-zinc-900/60 transition-all border-b-4 hover:border-b-purple-500 group shadow-xl backdrop-blur-sm"
                                >
                                    <div className="mb-6 text-purple-400 group-hover:scale-110 transition-transform">{service.icon}</div>
                                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed font-light">{service.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Call to Action Section - Immersive Gradient */}
                    <section className="relative text-center py-40 mb-20 rounded-[4rem] overflow-hidden group" data-section-theme="dark">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 to-black z-0" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:32px_32px] opacity-10" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                        <div className="relative z-10 max-w-4xl mx-auto px-6">
                            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter">¿Listo para definir <br />tu propia era?</h2>
                            <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                Únete a la arquitectura que está redefiniendo el estándar digital. Tu marca merece ser la Flagship de su industria.
                            </p>
                            <Link
                                href="#invitation"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(147,51,234,0.3)] group"
                            >
                                Hablemos de tu Marca
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </section>

                </div>
            </main>

        </div>
    );
}

function Eye({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
        </svg>
    )
}
