'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FluidBackground from '@/components/creative/FluidBackground';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';

// --- TYPE DEFINITIONS ---
// This should match the "Blueprint" strict structure
type ThemeColors = {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
};

type ProjectDNA = {
    identity: {
        name: string;
        category: string;
        seo: { title: string; description: string };
        brand: {
            colors: { primary: string; secondary: string };
            typography: string;
            themeColors?: ThemeColors;
        };
    };
    ui: { theme: string; layout: string };
    sections: Array<{
        id: string;
        type: 'HERO' | 'AUTHORITY' | 'VALUE_PROP' | 'DEMO' | 'PRICING' | 'FAQ' | 'CONTACT';
        content: any;
    }>;
};

// --- COMPONENT FACTORY (THE "BLOCKS") ---

const HeroSection = ({ content, identity }: { content: any; identity: any }) => (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-black">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
        >
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`text-6xl md:text-9xl font-light tracking-widest mb-8 relative z-10 text-white uppercase`}
            >
                {content.title}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-sm md:text-lg text-zinc-400 tracking-[0.3em] font-light max-w-2xl mx-auto relative z-10 uppercase"
            >
                {content.subtitle}
            </motion.p>
        </motion.div>
    </section>
);

const AuthoritySection = ({ content }: { content: any }) => (
    <section className="py-20 border-y border-white/5 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
                {(content.logos || []).map((logo: string, i: number) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="text-sm font-light text-white tracking-[0.2em] uppercase">{logo}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ValuePropSection = ({ content }: { content: any }) => (
    <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-24 max-w-2xl border-l border-white/20 pl-8 uppercase tracking-widest">
                {content.headline}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {(content.cards || []).map((card: any, i: number) => (
                    <div key={i} className="group">
                        <div className="text-[10px] font-light text-zinc-600 mb-6 tracking-widest uppercase">0{i + 1} —</div>
                        <h3 className="text-lg font-normal mb-4 text-white uppercase tracking-widest">{card.title}</h3>
                        <p className="text-zinc-500 leading-relaxed text-sm font-light tracking-wide">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const DemoSection = ({ content }: { content: any }) => (
    <section className="py-24 px-4 bg-black border-y border-white/5 font-sans">
        <div className="max-w-6xl mx-auto mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <h2 className="text-zinc-500 text-[10px] mb-2 tracking-[0.5em] uppercase">Selección de Obra</h2>
                <p className="text-4xl font-light text-white tracking-tighter uppercase leading-none">Catálogo del Evento</p>
            </div>
            <div className="text-right border-b border-white/10 pb-2">
                <span className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-widest">Resumen de Galería</span>
                <div className="text-lg font-light text-white uppercase tracking-widest">Carrito Vacío</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
            {content.images?.map((img: string, i: number) => (
                <div key={i} className="relative group aspect-[4/3] bg-zinc-950 overflow-hidden">
                    <img src={img} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000" alt="Car" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                    {/* Minimal Selection UI */}
                    <div className="absolute top-6 right-6">
                        <button className="w-10 h-10 border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <span className="text-xs font-light">Elegir</span>
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-zinc-400 tracking-[0.4em] uppercase">Obra Ref. {i + 1}</span>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const PricingSection = ({ content }: { content: any }) => (
    <section className="py-32 px-6 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-[10px] text-zinc-600 mb-16 uppercase tracking-[0.6em] font-light">Estrategia de Activación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* PLAN CORTO PLAZO: DIY - EL ANSÍOSO */}
                <div className="p-10 bg-black border border-white/5 hover:border-white/30 transition-all flex flex-col items-center text-center">
                    <h3 className="text-xs font-light text-zinc-400 mb-2 uppercase tracking-[0.3em]">Acceso Laboratorio</h3>
                    <div className="text-3xl font-light text-white mb-2 tracking-widest">$45 USD<span className="text-[10px] text-zinc-500 font-mono">/mes</span></div>
                    <p className="text-[9px] text-zinc-600 mb-8 uppercase tracking-widest font-mono">Control total inmediato</p>
                    <ul className="space-y-4 mb-12 flex-1">
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Uso del Lab Purrpurr 24/7</li>
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Cambios en tiempo real</li>
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Soporte por Ticket</li>
                    </ul>
                    <a href="/checkout?plan=diy" className="w-full py-4 text-[10px] font-medium uppercase tracking-[0.4em] transition-all border border-white/10 text-white hover:bg-white hover:text-black">
                        Suscribirme
                    </a>
                </div>

                {/* PLAN MEDIANO PLAZO: ESTÁTICO - EL PRÁCTICO */}
                <div className="p-10 bg-black border border-white/5 hover:border-white/30 transition-all flex flex-col items-center text-center">
                    <h3 className="text-xs font-light text-zinc-400 mb-2 uppercase tracking-[0.3em]">Anual Estándar</h3>
                    <div className="text-3xl font-light text-white mb-2 tracking-widest">$350 USD<span className="text-[10px] text-zinc-500 font-mono">/año</span></div>
                    <p className="text-[9px] text-zinc-600 mb-8 uppercase tracking-widest font-mono">Un solo pago, sin enredos</p>
                    <ul className="space-y-4 mb-12 flex-1">
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Desarrollo por nosotros</li>
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Sitio Estático Profesional</li>
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Renovación anual simple</li>
                    </ul>
                    <a href="/checkout?plan=static" className="w-full py-4 text-[10px] font-medium uppercase tracking-[0.4em] transition-all border border-white/10 text-white hover:bg-white hover:text-black">
                        Pago Único
                    </a>
                </div>

                {/* PLAN LARGO PLAZO: PARTNER - EL IMPERIO */}
                <div className="p-10 bg-black border border-white/20 hover:border-white/50 transition-all flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-4 right-[-35px] bg-white text-black text-[8px] font-bold py-1 px-10 rotate-45 uppercase tracking-widest">Enterprise</div>
                    <h3 className="text-xs font-light text-zinc-400 mb-2 uppercase tracking-[0.3em]">Socio Estratégico</h3>
                    <div className="text-3xl font-light text-white mb-2 tracking-widest">$16k<span className="text-[10px] text-zinc-500 font-mono">/año</span></div>
                    <p className="text-[9px] text-zinc-600 mb-8 uppercase tracking-widest font-mono">Crecimiento y Escala</p>
                    <ul className="space-y-4 mb-12 flex-1">
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Ingeniería Dedicada</li>
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Sistemas a Medida</li>
                        <li className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Partnership 24/7</li>
                    </ul>
                    <a href="/checkout?plan=enterprise" className="w-full py-4 text-[10px] font-medium uppercase tracking-[0.4em] transition-all bg-white text-black hover:bg-zinc-200">
                        Contactar Socio
                    </a>
                </div>
            </div>
        </div>
    </section>
);

const ContactSection = ({ content }: { content: any }) => (
    <section className="py-40 px-8 bg-black relative flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-light mb-12 tracking-[0.2em] text-white uppercase leading-none">Hablemos</h2>
            {content.whatsapp && (
                <a
                    href={`https://wa.me/${content.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block border border-white/20 px-12 py-6 text-xs font-light tracking-[0.5em] text-white hover:bg-white hover:text-black transition-all uppercase"
                >
                    Contacto Directo
                </a>
            )}
        </div>
    </section>
);

// --- ARCHETYPES COLOR MAPPING (Fallback for existing projects) ---
const ARCHETYPE_COLORS: Record<string, { color1: string; color2: string; color3: string; color4: string }> = {
    'CREATOR': { color1: '#000000', color2: '#080808', color3: '#111111', color4: '#000000' },
};

const DEFAULT_THEME = { color1: '#000000', color2: '#080808', color3: '#111111', color4: '#000000' };

// --- THE ENGINE CORE ---

export function RenderEngine({ buildId, slug, architecture }: { buildId: string; slug: string; architecture: ProjectDNA }) {

    // 1. Theme Configuration
    const themeColors = architecture?.identity?.brand?.themeColors
        || (architecture?.identity?.category ? ARCHETYPE_COLORS[architecture.identity.category] : null)
        || DEFAULT_THEME;

    return (
        <main className="bg-black text-white min-h-screen selection:bg-white/10 font-sans relative overflow-x-hidden">
            {/* SEO Metadata Override */}
            <title>{architecture?.identity?.seo?.title || 'Project'}</title>
            <meta name="description" content={architecture?.identity?.seo?.description || ''} />

            {/* Clean Static Background */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/pipelow_clean_bg.png"
                    className="w-full h-full object-cover opacity-30"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            </div>

            {/* Global Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center bg-black/20 backdrop-blur-md ">
                <span className="font-light text-xl tracking-[0.4em] text-white uppercase">{architecture?.identity?.name || 'Project'}</span>
                <div className="hidden md:flex gap-12 text-[9px] font-medium tracking-[0.5em] text-zinc-500 uppercase">
                    <span className="cursor-pointer hover:text-white transition-colors">Galería</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Servicios</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Contacto</span>
                </div>
            </nav>

            <div className="flex flex-col relative z-10 pt-20">
                {architecture.sections?.map((section) => {
                    switch (section.type) {
                        case 'HERO': return <HeroSection key={section.id} content={section.content} identity={architecture.identity} />;
                        case 'AUTHORITY': return <AuthoritySection key={section.id} content={section.content} />;
                        case 'VALUE_PROP': return <ValuePropSection key={section.id} content={section.content} />;
                        case 'DEMO': return <DemoSection key={section.id} content={section.content} />;
                        case 'PRICING': return <PricingSection key={section.id} content={section.content} />;
                        case 'CONTACT': return <ContactSection key={section.id} content={section.content} />;
                        default: return null;
                    }
                })}
            </div>
        </main>
    );
}
