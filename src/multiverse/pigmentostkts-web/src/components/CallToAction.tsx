"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";

export default function CallToAction() {
    return (
        <section data-theme="dark" className="bg-brand-black py-24 relative overflow-hidden text-center border-t border-brand-yellow/10">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
                        ¿LISTO PARA <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">DESTACAR?</span>
                    </h2>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Ya sea para tu marca, tu moto o tu colección personal. <br className="hidden md:block" />
                        Calidad premium y atención que marca la diferencia.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            href="/cotizador"
                            className="w-full md:w-auto px-8 py-4 bg-brand-yellow text-brand-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,214,0,0.3)] flex items-center justify-center gap-2 group"
                        >
                            <span>Iniciar Proyecto</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href={PIGMENTO_DATA.contact.whatsappUrl}
                            target="_blank"
                            className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm"
                        >
                            <MessageCircle className="w-5 h-5 text-brand-yellow" />
                            <span>Hablar con un Humano</span>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
