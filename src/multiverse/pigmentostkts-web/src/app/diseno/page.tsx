"use client";

import { FadeIn } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

const STUDIO_URL = "https://www.instagram.com/pigmento.stkrs";

const DESIGN_CONFIG = {
    sticker: {
        id: 'sticker',
        label: 'Stickers',
        title: 'Stickers Artísticos',
        price: '35,000',
        badge: 'Para Colección',
        description: 'Tu idea, personaje o meme favorito, listo para imprimir con la mejor calidad del mercado.',
        image: "/images/design/stickers.png",
        showcaseImage: "/images/design/stickers_alt.png",
        colorClass: 'text-pink-500',
        borderColor: 'border-pink-500',
        ringColor: 'ring-pink-500/20',
        href: "/diseno-stickers"
    },
    vector: {
        id: 'vector',
        label: 'Vectorizar',
        title: 'Vectorización',
        price: '75,000',
        badge: 'Solución Técnica',
        description: 'Recuperamos la calidad de tus archivos. Ideal para impresiones de gran formato.',
        image: "/images/design/vector.png",
        showcaseImage: "/images/design/vector.png",
        colorClass: 'text-brand-yellow',
        borderColor: 'border-brand-yellow',
        ringColor: 'ring-brand-yellow/20',
        href: "https://wa.me/573160535247?text=Hola!%20Me%20interesa%20el%20servicio%20de%20Vectorización."
    },
    logo_basic: {
        id: 'logo_basic',
        label: 'Logo Simple',
        title: 'Logotipo Esencial',
        price: '250,000',
        badge: 'Solución Emprendedor',
        description: 'Empieza con el pie derecho. Un logo profesional y versátil para tus redes y productos.',
        image: "/images/design/logo_basic.png",
        showcaseImage: "/images/design/logo_basic_alt.png",
        colorClass: 'text-blue-500',
        borderColor: 'border-blue-500',
        ringColor: 'ring-blue-500/20',
        href: "https://wa.me/573160535247?text=Hola!%20Me%20interesa%20el%20servicio%20de%20Logotipo%20Esencial."
    },
    logo_pro: {
        id: 'logo_pro',
        label: 'Identidad Pro',
        title: 'Branding Completo',
        price: '650,000',
        badge: 'Solución Empresarial',
        description: 'La imagen que tu empresa merece. Manual de marca, aplicaciones y todo lo necesario para escalar.',
        image: "/images/design/logo_pro.png",
        showcaseImage: "/images/design/logo_pro_alt.png",
        colorClass: 'text-purple-600',
        borderColor: 'border-purple-600',
        ringColor: 'ring-purple-600/20',
        href: "https://wa.me/573160535247?text=Hola!%20Me%20interesa%20el%20servicio%20de%20Branding%20Completo."
    }
} as const;

type DesignKey = keyof typeof DESIGN_CONFIG;
const DESIGN_KEYS = Object.keys(DESIGN_CONFIG) as DesignKey[];

// Sub-component to prevent AnimatePresence sync issues
function ShowcaseContent({ type }: { type: DesignKey }) {
    const data = DESIGN_CONFIG[type];
    const isExternal = data.href.startsWith('http');

    return (
        <motion.div
            key={type}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 z-10"
        >
            <a
                href={data.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="block w-full h-full relative group/image overflow-hidden focus:outline-none"
            >
                <img
                    src={data.showcaseImage}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                    alt={data.title}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-brand-yellow text-brand-black p-5 rounded-full shadow-2xl scale-75 group-hover/image:scale-100 transition-transform duration-500 font-black uppercase tracking-widest text-sm flex items-center gap-3">
                        <ArrowRight size={24} />
                    </div>
                </div>
            </a>

            {/* Cinematic Overlay Text */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/95 to-transparent p-6 md:p-12 flex items-end pointer-events-none">
                <div className="max-w-2xl">
                    <span className={`text-xs md:text-sm font-black tracking-[0.3em] uppercase mb-2 md:mb-4 block ${data.colorClass}`}>
                        {data.badge}
                    </span>
                    <h3 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-2 md:mb-4 leading-none">
                        {data.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-xl font-medium max-w-xl mb-8 hidden md:block leading-relaxed">
                        {data.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pointer-events-auto">
                        <a
                            href={data.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-3 bg-brand-yellow text-brand-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.1em] transition-all hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,214,0,0.4)] group"
                        >
                            <span>{type === 'sticker' ? 'EMPEZAR DISEÑO' : 'SOLICITAR COTIZACIÓN'}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href={STUDIO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all group"
                        >
                            <ExternalLink size={16} />
                            <span>VER PORTAFOLIO</span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function DesignPage() {
    const [activeDesign, setActiveDesign] = React.useState<DesignKey>('logo_pro');
    const [isHovering, setIsHovering] = React.useState(false);
    const [hasInteracted, setHasInteracted] = React.useState(false);

    // Auto-rotate logic
    React.useEffect(() => {
        if (isHovering || hasInteracted) return;

        const interval = setInterval(() => {
            setActiveDesign(prev => {
                const idx = DESIGN_KEYS.indexOf(prev);
                return DESIGN_KEYS[(idx + 1) % DESIGN_KEYS.length];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovering, hasInteracted]);

    const handleSelect = (id: DesignKey) => {
        setActiveDesign(id);
        setHasInteracted(true);
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
                                    <a
                                        href={STUDIO_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3 inline-block hover:underline"
                                    >
                                        Pigmento Studio <ExternalLink size={10} className="inline ml-1" />
                                    </a>
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
                                {DESIGN_KEYS.map((key) => {
                                    const item = DESIGN_CONFIG[key];
                                    const isActive = activeDesign === key;
                                    const isExternal = item.href.startsWith('http');

                                    const CardContent = (
                                        <div
                                            onMouseEnter={() => !hasInteracted && setActiveDesign(key)}
                                            className={`group relative aspect-[16/10] rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 ${isActive ? `${item.borderColor} ring-2 ${item.ringColor} scale-[1.02]` : 'border-white/10 hover:border-brand-yellow/50'}`}
                                        >
                                            <img
                                                src={item.image}
                                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
                                                alt={item.title}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 p-5 font-black tracking-widest uppercase w-full">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <span className={`text-[10px] block mb-1 ${item.colorClass}`}>{item.label}</span>
                                                        <h4 className="text-white text-xl">${item.price}</h4>
                                                    </div>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-brand-yellow text-brand-black' : 'bg-white/10 text-white'}`}>
                                                        <ArrowRight size={16} className={isActive ? "" : "-rotate-45"} />
                                                    </div>
                                                </div>

                                                <div className={`mt-3 overflow-hidden transition-all duration-300 ${isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-[9px] text-white font-bold border border-white/10">
                                                        COTIZAR AHORA
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );

                                    return isExternal ? (
                                        <a key={key} href={item.href} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
                                            {CardContent}
                                        </a>
                                    ) : (
                                        <Link key={key} href={item.href} className="block focus:outline-none">
                                            {CardContent}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Visual - Dynamic Showcase (60%) */}
                        <div className="w-full xl:w-[60%] relative h-[500px] xl:h-[750px] flex items-center justify-center">
                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-[#050505]">
                                <AnimatePresence mode="popLayout">
                                    <ShowcaseContent key={activeDesign} type={activeDesign} />
                                </AnimatePresence>

                                {/* Active Indicator Dots */}
                                <div className="absolute top-12 right-12 flex flex-col gap-3 z-20">
                                    {DESIGN_KEYS.map((t) => {
                                        const isActive = activeDesign === t;
                                        return (
                                            <button
                                                key={t}
                                                onClick={() => handleSelect(t)}
                                                className="group flex items-center gap-3 justify-end pointer-events-auto"
                                            >
                                                <span className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-white opacity-100' : 'text-white opacity-0 group-hover:opacity-50'}`}>
                                                    {t.replace('_', ' ')}
                                                </span>
                                                <div className={`w-1.5 rounded-full transition-all duration-500 ${isActive ? 'bg-white h-12' : 'bg-white/20 h-2 group-hover:h-4'}`} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
