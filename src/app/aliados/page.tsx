'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const PARTNERS = [
    {
        id: 'speedlight',
        name: 'Speedlight Culture',
        category: 'Automotive & Lifestyle',
        description: 'El garaje digital para la cultura automotriz en Colombia. Marketplace, Galería y Eventos.',
        logo: '🏎️', // Placeholder for logo
        color: '#00FF9C',
        link: '/aliados/speedlight',
        benefit: '30% OFF en Servicios',
        status: 'active'
    },
    // Placeholder for future portfolio projects
    {
        id: 'portfolio-1',
        name: 'Próximamente',
        category: 'Tech & SaaS',
        description: 'Nuevo aliado estratégico uniéndose a la red de beneficios.',
        logo: '🔒',
        color: '#6366f1', // Indigo
        link: '#',
        benefit: 'Beneficio Secreto',
        status: 'coming-soon'
    },
    {
        id: 'portfolio-2',
        name: 'Próximamente',
        category: 'E-Commerce',
        description: 'Expandiendo el ecosistema comercial.',
        logo: '🔒',
        color: '#ec4899', // Pink
        link: '#',
        benefit: 'Beneficio Secreto',
        status: 'coming-soon'
    }
];

export default function PartnersPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30">
            {/* Global Background */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[#020202]" />
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[url('/grid.svg')] bg-[size:64px_64px]" />

            <main className="relative z-10 pt-40 pb-24 px-6 container mx-auto max-w-6xl">
                <header className="mb-24 text-center relative" data-section-theme="dark">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-purple-600/10 blur-[120px] -z-10 rounded-full" />
                    <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent tracking-tighter leading-[0.85]">
                        Aliados
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Una red de proyectos de alto impacto. Ser parte de la comunidad de nuestros aliados desbloquea beneficios exclusivos.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PARTNERS.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group p-[1px] rounded-[2.5rem] transition-all duration-500 ${partner.status === 'active' ? 'hover:scale-[1.02]' : 'opacity-60 grayscale'}`}
                            style={{
                                background: partner.status === 'active'
                                    ? `linear-gradient(135deg, ${partner.color}40, transparent)`
                                    : 'white/5'
                            }}
                        >
                            <div className="bg-zinc-900/80 h-full rounded-[2.4rem] p-10 flex flex-col items-start relative overflow-hidden backdrop-blur-xl shadow-2xl">
                                {/* Dynamic Glow */}
                                {partner.status === 'active' && (
                                    <div
                                        className="absolute -top-20 -right-20 w-64 h-64 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                                        style={{ backgroundColor: partner.color }}
                                    />
                                )}

                                <div className="flex justify-between items-start w-full mb-10 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-black/50 flex items-center justify-center text-3xl border border-white/5 shadow-inner">
                                        {partner.logo}
                                    </div>
                                    {partner.status === 'active' && (
                                        <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            Verificado
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-3xl font-bold mb-3 relative z-10 tracking-tight">{partner.name}</h3>
                                <p className="text-zinc-500 text-sm mb-10 flex-grow relative z-10 font-light leading-relaxed">
                                    {partner.description}
                                </p>

                                <div className="w-full relative z-10 space-y-8">
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <div className="text-[9px] uppercase font-black text-zinc-600 tracking-[0.3em] mb-2"> BENEFICIO_ACTIVO </div>
                                        <div className="flex items-center gap-2 text-base font-bold text-white">
                                            <Zap className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                                            {partner.benefit}
                                        </div>
                                    </div>

                                    {partner.status === 'active' ? (
                                        <Link
                                            href={partner.link}
                                            className="w-full py-4 rounded-2xl bg-white text-zinc-950 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        >
                                            Explorar Alianza
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    ) : (
                                        <div className="w-full py-4 rounded-2xl bg-white/5 text-zinc-600 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 border border-white/5">
                                            <Lock className="w-4 h-4" />
                                            Próximamente
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Bottom - Enhanced */}
                <section className="relative mt-40 text-center py-24 rounded-[3rem] overflow-hidden group" data-section-theme="dark">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent z-0" />
                    <div className="relative z-10 max-w-2xl mx-auto px-6">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">¿Tienes una comunidad?</h3>
                        <p className="text-zinc-400 text-lg mb-10 font-light leading-relaxed">
                            Únete a nuestra red de aliados y ofrece beneficios exclusivos a tus miembros mientras potencias tu infraestructura digital con tecnología native.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
                        >
                            Solicitar Alianza
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
