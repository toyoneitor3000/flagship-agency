'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ModelViewer3D } from '@/components/hibrido/ModelViewer3D';
import { ArrowRight, Sparkles, Heart, Recycle, Flame, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function HibridoHomePage() {
    return (
        <div className="w-full relative overflow-hidden">
            {/* Ambient Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
                <div className="absolute top-10 left-1/4 w-[500px] h-[400px] bg-[#52388d]/30 rounded-full blur-[140px]" />
                <div className="absolute top-40 right-1/4 w-[400px] h-[350px] bg-pink-600/20 rounded-full blur-[130px]" />
                <div className="absolute top-96 left-1/3 w-[600px] h-[300px] bg-cyan-600/15 rounded-full blur-[160px]" />
            </div>

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300 mb-8 backdrop-blur-sm">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        <span>ECOSISTEMA MULTIPÁGINA & MARKETPLACE 3D</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] max-w-5xl">
                        SIEMPRE HAY UNA FORMA{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
                            SOSTENIBLE
                        </span>{' '}
                        DE HACER LAS COSAS
                    </h1>

                    <p className="mt-8 text-base sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
                        Bienvenido al universo de <strong className="text-white">Híbrido</strong>. Diseñamos objetos inteligentes, ropa con carácter y soluciones circulares para quienes no encajan en lo convencional.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/hibrido/marketplace"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Explorar Marketplace</span>
                        </Link>
                        <Link
                            href="/hibrido/pelos-amor"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#52388d]/40 border border-[#52388d] text-white font-bold text-sm hover:bg-[#52388d]/70 transition-all hover:scale-105"
                        >
                            <span>Conocer El Gomunator 3D</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* THE THREE CORE DIVISIONS (PORTALS) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-xs font-mono tracking-widest uppercase text-purple-400 mb-2">
                        [ LAS TRES DIVISIONES DEL LABORATORIO ]
                    </h2>
                    <p className="text-3xl font-bold">Un Ecosistema, Tres Mundos</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand 1: Menos Pelos + Amor */}
                    <Link
                        href="/hibrido/pelos-amor"
                        className="group relative bg-zinc-950/60 border border-purple-500/30 rounded-3xl p-8 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col justify-between min-h-[380px]"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity">
                            <Heart className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                                División 01 / Mascotas
                            </span>
                            <h3 className="text-2xl font-bold mt-6 mb-3 text-white group-hover:text-purple-300 transition-colors">
                                - pelos + amor
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                Convivencia en armonía con tus peludos. Hogar sin pelos gracias a la tecnología del <strong>Gomunator</strong> con modelado 3D interactivo.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mt-8">
                            <span>Ingresar a Pelitos</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Brand 2: Plástico con Final Feliz */}
                    <Link
                        href="/hibrido/plastico-final-feliz"
                        className="group relative bg-zinc-950/60 border border-emerald-500/30 rounded-3xl p-8 hover:border-emerald-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col justify-between min-h-[380px]"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity">
                            <Recycle className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                                División 02 / Upcycling
                            </span>
                            <h3 className="text-2xl font-bold mt-6 mb-3 text-white group-hover:text-emerald-300 transition-colors">
                                Plástico con final feliz
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                Transformación de desechos plásticos en objetos de diseño y piezas coleccionables. Banco de reciclaje comunitario y economía circular.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mt-8">
                            <span>Conocer Banco de Reciclaje</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Brand 3: Dinamita Mood */}
                    <Link
                        href="/hibrido/dinamita"
                        className="group relative bg-zinc-950/60 border border-pink-500/30 rounded-3xl p-8 hover:border-pink-500 transition-all duration-300 hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] flex flex-col justify-between min-h-[380px]"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity">
                            <Flame className="w-8 h-8 text-pink-400" />
                        </div>
                        <div>
                            <span className="text-[10px] font-mono uppercase bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/30">
                                División 03 / Moda Streetwear
                            </span>
                            <h3 className="text-2xl font-bold mt-6 mb-3 text-white group-hover:text-pink-300 transition-colors">
                                Dinamita
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                Línea textil y prendas de vestir con actitud experimental, cortes oversize e identidad visual disruptiva. <strong>Dinamita Mood</strong>.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-pink-400 uppercase tracking-wider mt-8">
                            <span>Ver Lookbook Dinamita</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            </section>

            {/* 3D SPOTLIGHT SECTION - EL GOMUNATOR */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-white/10 rounded-3xl p-8 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono">
                                <span>MODELADO 3D EN TIEMPO REAL</span>
                            </div>
                            <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white">
                                El Gomunator
                            </h2>
                            <p className="text-zinc-300 text-sm leading-relaxed font-mono">
                                El producto revolucionario de <strong>- pelos + amor</strong>. Remueve pelos y pelusas de cualquier superficie sin generar residuos de cinta adhesiva. Rota e inspecciona el modelo en 360° con controles táctiles o mouse.
                            </p>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Material de silicona de grado aeroespacial lavable</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Reutilizable de por vida: Cero plástico desechable</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Geometría ergonómica con nervaduras de tracción</span>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center gap-4">
                                <Link
                                    href="/hibrido/pelos-amor"
                                    className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                                >
                                    Ver Ficha Técnica Completa
                                </Link>
                                <span className="text-xl font-bold font-mono text-emerald-400">$65.000 COP</span>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <ModelViewer3D
                                productName="Gomunator Standard Edition"
                                accentColor="#52388d"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
