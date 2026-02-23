"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import ParallaxGrid from "@/components/ui/ParallaxGrid";

export default function ProductShowcase() {
    return (
        <section id="packs" data-theme="light" className="snap-start h-[100dvh] md:h-screen flex flex-col justify-center bg-brand-yellow relative overflow-hidden pt-24 md:pt-32">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
                <ParallaxGrid />
            </div>
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/5 to-transparent opacity-5 z-0"></div>

            <div className="container mx-auto px-4 relative z-10 h-full md:max-h-[900px] flex flex-col justify-center">

                {/* Header Section */}
                <FadeIn>
                    <div className="text-center mb-8">
                        <div className="flex justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-brand-black fill-brand-black" />
                            ))}
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-black tracking-tighter leading-none mb-3">
                            TOP <span className="text-white drop-shadow-md">SELLERS</span>
                        </h2>

                        <p className="text-base md:text-lg text-brand-black/70 max-w-xl mx-auto leading-tight font-medium">
                            Los favoritos de la comunidad. Calidad probada, estilo inigualable.
                        </p>
                    </div>
                </FadeIn>

                {/* Content Grid - 3 Columns */}
                <div className="flex flex-row md:grid md:grid-cols-3 gap-6 md:gap-4 max-w-7xl mx-auto w-full md:h-[500px] overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 md:pt-0 pb-8 md:pb-0 -mx-4 px-4 md:mx-auto md:px-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* 1. CUBREPLACAS (Left) */}
                    <FadeIn delay={0.1} className="h-full min-w-[85vw] md:min-w-0 snap-center">
                        <div className="bg-white backdrop-blur-xl border-4 border-brand-black h-full rounded-[1.5rem] p-6 overflow-hidden relative group transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-brand-black/10 hover:shadow-2xl flex flex-col">
                            <div className="absolute top-4 right-4">
                                <span className="bg-brand-black text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                    #1 Ventas
                                </span>
                            </div>

                            <div className="z-10 relative flex-1 flex flex-col justify-between">
                                <div>
                                    <ShieldCheck className="w-10 h-10 text-brand-black mb-4" />
                                    <h3 className="text-3xl font-black text-brand-black uppercase italic tracking-tighter leading-none mb-2">
                                        Cubreplacas <br /><span className="text-brand-black/40">PRO</span>
                                    </h3>
                                    <p className="text-gray-600 font-medium text-sm leading-relaxed mb-4">
                                        El estándar de la industria. Sin ruido, ajuste perfecto.
                                    </p>
                                    <div className="space-y-1 mb-4">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                                            <div className="w-1 h-1 bg-brand-yellow rounded-full"></div> Cancelación de ruido
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                                            <div className="w-1 h-1 bg-brand-yellow rounded-full"></div> Material Premium
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-3 border-t border-brand-black/10 pt-4">
                                        <span className="text-[10px] text-brand-black/60 font-black uppercase">Par desde</span>
                                        <span className="text-xl font-black text-brand-black">$55.000</span>
                                    </div>
                                    <Link href="/cotizador" className="block w-full py-3 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-yellow hover:text-black transition-colors uppercase tracking-wide text-[10px] text-center shadow-lg">
                                        Comprar Ahora
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* 2. PERSONALIZADOS (Middle - New) */}
                    <FadeIn delay={0.2} className="h-full min-w-[85vw] md:min-w-0 snap-center">
                        <div className="bg-brand-black/90 backdrop-blur-xl border border-white/10 h-full rounded-[1.5rem] p-6 overflow-hidden relative group transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-brand-black/20 flex flex-col">
                            {/* Background Image/Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-transparent opacity-20"></div>

                            <div className="absolute top-4 right-4">
                                <span className="bg-brand-yellow text-brand-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                    Diseño
                                </span>
                            </div>

                            <div className="z-10 relative flex-1 flex flex-col justify-between">
                                <div>
                                    <Star className="w-10 h-10 text-brand-yellow mb-4" />
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">
                                        Stickers <br /><span className="text-brand-yellow">Custom</span>
                                    </h3>
                                    <p className="text-gray-400 font-medium text-sm leading-relaxed mb-4">
                                        Tu idea, nuestros materiales. Calidad de exportación.
                                    </p>
                                    <div className="space-y-1 mb-4">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                            <div className="w-1 h-1 bg-brand-yellow rounded-full"></div> Cualquier forma
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                            <div className="w-1 h-1 bg-brand-yellow rounded-full"></div> Laminado UV
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-3 border-t border-white/10 pt-4">
                                        <span className="text-[10px] text-gray-500 font-black uppercase">50 Unidades</span>
                                        <span className="text-xl font-black text-brand-yellow">$98.000</span>
                                    </div>
                                    <Link href="/cotizador" className="block w-full py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-brand-yellow hover:text-black transition-all uppercase tracking-wide text-[10px] text-center">
                                        Cotizar Diseño
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* 3. MEGA PACKS (Right) */}
                    <FadeIn delay={0.3} className="h-full min-w-[85vw] md:min-w-0 snap-center">
                        <div className="bg-white/10 backdrop-blur-md border border-brand-black/10 h-full rounded-[1.5rem] p-6 overflow-hidden relative group transition-all duration-300 hover:scale-[1.02] shadow-xl hover:bg-white/20 flex flex-col">
                            <div className="absolute top-4 right-4">
                                <span className="bg-black/5 text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                    Ahorro
                                </span>
                            </div>

                            <div className="z-10 relative flex-1 flex flex-col justify-between">
                                <div>
                                    <Zap className="w-10 h-10 text-black mb-4" />
                                    <h3 className="text-3xl font-black text-brand-black uppercase italic tracking-tighter leading-none mb-2">
                                        Mega <br />Packs
                                    </h3>
                                    <p className="text-brand-black/70 font-medium text-sm leading-relaxed mb-4">
                                        Para revendedores y coleccionistas serios.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {PIGMENTO_DATA.pricing.megaPacks.slice(0, 3).map((pack) => (
                                        <div key={pack.name} className="flex justify-between items-center bg-white/40 p-2 rounded-lg border border-black/5 hover:bg-white/60 transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase">{pack.name}</span>
                                                <span className="text-[9px] text-gray-600">{pack.qty} stickers</span>
                                            </div>
                                            <span className="text-sm font-bold text-black">${(pack.price / 1000).toFixed(0)}k</span>
                                        </div>
                                    ))}

                                    <Link href="/packs" className="block w-full py-3 mt-4 bg-transparent border-2 border-brand-black text-brand-black font-bold rounded-xl hover:bg-brand-black hover:text-white transition-colors uppercase tracking-wide text-[10px] text-center">
                                        Ver Packs
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                </div>

                {/* Main CTA */}
                <FadeIn delay={0.4} className="mt-12 flex justify-center pb-8">
                    <Link href="/cotizador" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-black text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-1">
                        <span className="relative z-10 font-black uppercase tracking-widest text-sm">Explorar todo el Arsenal</span>
                        <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
