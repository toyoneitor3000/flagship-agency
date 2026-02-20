"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";

export default function DesignPage() {
    const [activeDesign, setActiveDesign] = React.useState('logo_pro');
    const [isHovering, setIsHovering] = React.useState(false);

    // Auto-rotate on mobile or when not hovering
    React.useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => {
            const states = ['sticker', 'vector', 'logo_basic', 'logo_pro'];
            setActiveDesign(prev => {
                const idx = states.indexOf(prev);
                return states[(idx + 1) % states.length];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovering]);

    const designImages = {
        sticker: "/images/design/stickers_alt.png",
        vector: "/images/design/vector.png",
        logo_basic: "/images/design/logo_basic_alt.png",
        logo_pro: "/images/design/logo_pro_alt.png"
    };

    return (
        <main className="min-h-screen bg-brand-black relative overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 py-12 relative z-10">
                <FadeIn>
                    <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-24">

                        {/* Left Content - Control Grid (40%) */}
                        <div
                            className="w-full xl:w-[40%] space-y-8"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <div className="space-y-4">
                                <div>
                                    <span className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Pigmento Studio</span>
                                    <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tight">
                                        MARCA LA<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">DIFERENCIA.</span>
                                    </h1>
                                </div>

                                <p className="text-lg text-gray-400 max-w-lg leading-relaxed border-l-4 border-brand-yellow/20 pl-6">
                                    Tu marca es tu activo más valioso. Construye una identidad visual que venda por ti.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Sticker */}
                                <div
                                    onMouseEnter={() => setActiveDesign('sticker')}
                                    className={`block group relative aspect-[16/10] rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 ${activeDesign === 'sticker' ? 'border-brand-yellow ring-2 ring-brand-yellow/20 scale-[1.02]' : 'border-white/10 hover:border-brand-yellow/50'}`}
                                >
                                    <img src="/images/design/stickers.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt="Design Stickers" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-5 font-black tracking-widest uppercase w-full">
                                        <span className="text-[10px] text-pink-500 block mb-1">Stickers</span>
                                        <h4 className="text-white text-xl">$35,000</h4>
                                        <div className="mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                            <p className="text-[10px] text-gray-300 flex items-center gap-1"><span className="w-1 h-1 bg-pink-500 rounded-full"></span> 1 Personaje/Idea</p>
                                            <p className="text-[10px] text-gray-300 flex items-center gap-1"><span className="w-1 h-1 bg-pink-500 rounded-full"></span> Entrega PNG/PDF</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vector */}
                                <div
                                    onMouseEnter={() => setActiveDesign('vector')}
                                    className={`block group relative aspect-[16/10] rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 ${activeDesign === 'vector' ? 'border-brand-yellow ring-2 ring-brand-yellow/20 scale-[1.02]' : 'border-white/10 hover:border-brand-yellow/50'}`}
                                >
                                    <img src="/images/design/vector.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt="Design Vector" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-5 font-black tracking-widest uppercase w-full">
                                        <span className="text-[10px] text-brand-yellow block mb-1">Vectorizar</span>
                                        <h4 className="text-white text-xl">$75,000</h4>
                                        <div className="mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                            <p className="text-[10px] text-gray-300 flex items-center gap-1"><span className="w-1 h-1 bg-brand-yellow rounded-full"></span> Redibujado Manual</p>
                                            <p className="text-[10px] text-gray-300 flex items-center gap-1"><span className="w-1 h-1 bg-brand-yellow rounded-full"></span> Vectores .AI/.PDF</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Logo Basic */}
                                <div
                                    onMouseEnter={() => setActiveDesign('logo_basic')}
                                    className={`block group relative aspect-[16/10] rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 ${activeDesign === 'logo_basic' ? 'border-blue-500 ring-2 ring-blue-500/20 scale-[1.02]' : 'border-white/10 hover:border-brand-yellow/50'}`}
                                >
                                    <img src="/images/design/logo_basic.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt="Design Logo Basic" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-5 font-black tracking-widest uppercase w-full">
                                        <span className="text-[10px] text-blue-500 block mb-1">Logo Simple</span>
                                        <h4 className="text-white text-xl">$250,000</h4>
                                        <div className="mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                            <p className="text-[10px] text-gray-300 flex items-center gap-1"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> Concepto Único</p>
                                            <p className="text-[10px] text-gray-300 flex items-center gap-1"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> Vectores Finales</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Logo Pro */}
                                <div
                                    onMouseEnter={() => setActiveDesign('logo_pro')}
                                    className={`block group relative aspect-[16/10] rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 ${activeDesign === 'logo_pro' ? 'border-purple-600 ring-2 ring-purple-600/20 scale-[1.02]' : 'border-white/10 hover:border-brand-yellow/50'}`}
                                >
                                    <img src="/images/design/logo_pro.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt="Design Logo Pro" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-5 font-black tracking-widest uppercase w-full">
                                        <span className="text-[10px] text-purple-600 block mb-1">Identidad Pro</span>
                                        <h4 className="text-white text-xl">$650,000</h4>
                                        <div className="mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                            <p className="text-[10px] text-gray-300 flex items-center gap-1"><span className="w-1 h-1 bg-purple-600 rounded-full"></span> 3 Visualizaciones</p>
                                            <p className="text-[10px] text-gray-300 flex items-center gap-1"><span className="w-1 h-1 bg-purple-600 rounded-full"></span> Kit de Archivos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual - Dynamic Showcase (60%) */}
                        <div className="w-full xl:w-[60%] relative h-[500px] xl:h-[750px] flex items-center justify-center">
                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-[#050505]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDesign}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        className="absolute inset-0"
                                    >
                                        <img
                                            src={designImages[activeDesign as keyof typeof designImages]}
                                            className="w-full h-full object-cover"
                                            alt="Design Preview"
                                        />

                                        {/* Cinematic Overlay Text */}
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-12 flex items-end">
                                            <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3, duration: 0.5 }}
                                                className="max-w-2xl"
                                            >
                                                <span className={`text-sm font-black tracking-[0.3em] uppercase mb-4 block ${activeDesign === 'logo_pro' ? 'text-purple-500' :
                                                    activeDesign === 'logo_basic' ? 'text-blue-500' :
                                                        activeDesign === 'sticker' ? 'text-pink-500' : 'text-brand-yellow'
                                                    }`}>
                                                    {activeDesign === 'logo_pro' ? 'Solución Empresarial' :
                                                        activeDesign === 'logo_basic' ? 'Solución Emprendedor' :
                                                            activeDesign === 'sticker' ? 'Para Colección' : 'Solución Técnica'}
                                                </span>
                                                <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
                                                    {activeDesign === 'logo_pro' ? 'Branding Completo' :
                                                        activeDesign === 'logo_basic' ? 'Logotipo Esencial' :
                                                            activeDesign === 'sticker' ? 'Stickers Artísticos' : 'Vectorización'}
                                                </h3>
                                                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl">
                                                    {activeDesign === 'logo_pro' ? 'La imagen que tu empresa merece. Manual de marca, aplicaciones y todo lo necesario para escalar.' :
                                                        activeDesign === 'logo_basic' ? 'Empieza con el pie derecho. Un logo profesional y versátil para tus redes y productos.' :
                                                            activeDesign === 'sticker' ? 'Tu idea, personaje o meme favorito, listo para imprimir con la mejor calidad del mercado.' : 'Recuperamos la calidad de tus archivos. Ideal para impresiones de gran formato.'}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Active Indicator Dots */}
                                <div className="absolute top-12 right-12 flex flex-col gap-3 z-20">
                                    {['sticker', 'vector', 'logo_basic', 'logo_pro'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setActiveDesign(t)}
                                            className={`group flex items-center gap-3 justify-end`}
                                        >
                                            <span className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeDesign === t ? 'text-white opacity-100' : 'text-white opacity-0 group-hover:opacity-50'}`}>
                                                {t.replace('_', ' ')}
                                            </span>
                                            <div className={`w-1.5 rounded-full transition-all duration-500 ${activeDesign === t ? 'bg-white h-12' : 'bg-white/20 h-2 group-hover:h-4'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
