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
    <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div
            className="absolute inset-0 opacity-10"
            style={{
                background: `radial-gradient(circle at center, ${identity.brand.colors.primary}, transparent 70%)`
            }}
        />
        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`text-6xl md:text-9xl font-bold tracking-tighter mb-6 relative z-10 ${identity.brand.typography === 'SERIF' ? 'font-serif' : 'font-sans'}`}
        >
            {content.title}
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl opacity-70 max-w-2xl mx-auto relative z-10 leading-relaxed"
        >
            {content.subtitle}
        </motion.p>
    </section>
);

const AuthoritySection = ({ content }: { content: any }) => (
    <section className="py-20 border-t border-purple-500/10 bg-[#1a0b40]/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-12">{content.headline}</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {content.logos.map((logo: string, i: number) => (
                    <div key={i} className="text-xl font-bold font-serif italic text-zinc-300">{logo}</div>
                ))}
            </div>
        </div>
    </section>
);

const ValuePropSection = ({ content }: { content: any }) => (
    <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light mb-24 max-w-2xl">{content.headline}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-24">
                {content.cards.map((card: any, i: number) => (
                    <div key={i} className="group">
                        <div className="w-12 h-[1px] bg-white/20 mb-8 group-hover:w-full transition-all duration-500" />
                        <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const DemoSection = ({ content }: { content: any }) => (
    <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
            <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">{content.headline}</h2>
        </div>

        {/* Mock Gallery Grid */}
        <div className="flex gap-4 overflow-x-auto pb-8 snap-x">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="shrink-0 w-[80vw] md:w-[600px] h-[400px] bg-[#1a0b40] rounded-lg border border-purple-500/10 flex items-center justify-center relative group snap-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex items-end">
                        <span className="font-mono text-xs">PROJECT_0{i}.JPG</span>
                    </div>
                    <span className="text-zinc-700 font-mono">PLACEHOLDER_IMG_{i}</span>
                </div>
            ))}
        </div>
    </section>
);

const PricingSection = ({ content }: { content: any }) => (
    <section className="py-32 px-6 bg-[#1a0b40]/30 border-y border-purple-500/10">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-center text-3xl md:text-5xl font-bold mb-20">{content.headline}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.plans.map((plan: any, i: number) => (
                    <div key={i} className={`p-8 rounded-2xl border ${i === 1 ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30'} transition-all flex flex-col`}>
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-4xl font-light mb-8">{plan.price}</div>
                        <ul className="space-y-4 mb-12 flex-1">
                            {plan.features.map((feat: string, j: number) => (
                                <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide ${i === 1 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white text-white hover:text-black'} transition-colors`}>
                            SELECCIONAR
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const FAQSection = ({ content }: { content: any }) => (
    <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-12">{content.headline}</h2>
        <div className="space-y-8">
            {content.items.map((item: any, i: number) => (
                <div key={i} className="border-b border-white/10 pb-8">
                    <h3 className="text-lg font-medium mb-3">{item.q}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{item.a}</p>
                </div>
            ))}
        </div>
    </section>
);

const ContactSection = ({ content }: { content: any }) => (
    <section className="py-32 px-8 bg-[#0f0033] border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">¿Listo para empezar?</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-lg mx-auto">
                Tu proyecto {content.location && `en ${content.location}`} merece destacar. Escríbenos hoy.
            </p>
            {content.whatsapp && (
                <a
                    href={`https://wa.me/${content.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(37,211,102,0.3)]"
                >
                    Chat en WhatsApp
                </a>
            )}
        </div>
    </section>
);

// --- ARCHETYPES COLOR MAPPING (Fallback for existing projects) ---
const ARCHETYPE_COLORS: Record<string, { color1: string; color2: string; color3: string; color4: string }> = {
    'CREATOR': { color1: '#000000', color2: '#18181b', color3: '#ef4444', color4: '#000000' },
    'BOUTIQUE': { color1: '#000000', color2: '#18181b', color3: '#d4af37', color4: '#000000' },
    'PROFESSIONAL': { color1: '#000000', color2: '#18181b', color3: '#3b82f6', color4: '#000000' },
    'STARTUP': { color1: '#000000', color2: '#18181b', color3: '#8b5cf6', color4: '#000000' },
    'GASTRO': { color1: '#000000', color2: '#18181b', color3: '#f97316', color4: '#000000' },
    'REAL_ESTATE': { color1: '#000000', color2: '#18181b', color3: '#10b981', color4: '#000000' },
    'HEALTH': { color1: '#000000', color2: '#18181b', color3: '#06b6d4', color4: '#000000' },
    'AUTO': { color1: '#000000', color2: '#18181b', color3: '#eab308', color4: '#000000' },
};

const DEFAULT_THEME = { color1: '#000000', color2: '#18181b', color3: '#6D28D9', color4: '#000000' };

// --- THE ENGINE CORE ---

export function RenderEngine({ buildId, slug, architecture }: { buildId: string; slug: string; architecture: ProjectDNA }) {

    // 1. Theme Configuration
    // Get theme colors from architecture, or fallback to category-based colors, or default
    const themeColors = architecture.identity.brand.themeColors
        || ARCHETYPE_COLORS[architecture.identity.category]
        || DEFAULT_THEME;

    return (
        <main className="bg-black text-white min-h-screen selection:bg-purple-500/30 font-sans relative overflow-x-hidden">
            {/* SEO Metadata Override */}
            <title>{architecture.identity.seo.title}</title>
            <meta name="description" content={architecture.identity.seo.description} />

            {/* FluidBackground - Same as Studio */}
            <div className="fixed inset-0 z-0">
                <FluidBackground
                    config={{ ...FLUID_PRESET_PURRPURR.config, stiffness: 60 }}
                    colors={themeColors}
                    speed={0.005}
                    force={1.0}
                    className="w-full h-full"
                />
                {/* Overlay for legibility */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            </div>

            {/* Global Navbar - Synced with Studio */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center border-b border-white/10">
                <span className="font-bold text-xl tracking-tighter">{architecture.identity.name}</span>
                <div className="hidden md:flex gap-6 text-sm font-medium opacity-70">
                    <span className="cursor-pointer hover:opacity-100 transition-opacity">Inicio</span>
                    <span className="cursor-pointer hover:opacity-100 transition-opacity">Nosotros</span>
                    <span className="cursor-pointer hover:opacity-100 transition-opacity">Proyectos</span>
                    <span className="cursor-pointer hover:opacity-100 transition-opacity">Contacto</span>
                </div>
            </nav>

            <div className="flex flex-col relative z-10">
                {architecture.sections.map((section, index) => {
                    switch (section.type) {
                        case 'HERO': return <HeroSection key={section.id} content={section.content} identity={architecture.identity} />;
                        case 'AUTHORITY': return <AuthoritySection key={section.id} content={section.content} />;
                        case 'VALUE_PROP': return <ValuePropSection key={section.id} content={section.content} />;
                        case 'DEMO': return <DemoSection key={section.id} content={section.content} />;
                        case 'PRICING': return <PricingSection key={section.id} content={section.content} />;
                        case 'FAQ': return <FAQSection key={section.id} content={section.content} />;
                        case 'CONTACT': return <ContactSection key={section.id} content={section.content} />;
                        default:
                            return (
                                <div key={section.id} className="p-12 border border-dashed border-zinc-800 text-zinc-600 font-mono text-center">
                                    [MODULE '{section.type}' NOT COMPILED]
                                </div>
                            );
                    }
                })}
            </div>

            {/* Subscription Banner (The "Checkout" logic is now embedded here) */}
            <div className="fixed bottom-0 w-full bg-purple-900/90 backdrop-blur-md text-white px-6 py-4 z-50 flex items-center justify-between border-t border-purple-500/30">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded text-purple-200">PREVIEW MODE</span>
                    <span className="text-sm font-medium">Esta web aún no es pública. Suscríbete para publicarla en tu dominio.</span>
                </div>
                <div className="flex gap-2">
                    <a
                        href={`/studio?slug=${slug}`}
                        className="bg-purple-800 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-purple-700 transition-colors border border-purple-600"
                    >
                        ❖️ Editar
                    </a>
                    <button className="bg-white text-purple-950 px-6 py-2 rounded-lg font-bold text-sm hover:bg-purple-100 transition-colors">
                        Activar Sitio
                    </button>
                </div>
            </div>
        </main>
    );
}
