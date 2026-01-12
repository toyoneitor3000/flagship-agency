'use client';

import { Navbar } from '@/components/ui/Navbar';
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
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500 selection:text-white">
            <Navbar />

            <main className="pt-32 pb-24 px-4 container mx-auto max-w-6xl relative">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                        Aliados & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Ecosistema</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl font-light">
                        Una red de proyectos de alto impacto. Ser parte de la comunidad de nuestros aliados desbloquea beneficios exclusivos en Flagship.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PARTNERS.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group p-1 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all ${partner.status === 'active' ? 'hover:scale-[1.02]' : 'opacity-70 grayscale'}`}
                        >
                            <div className="bg-zinc-900/90 h-full rounded-[1.3rem] p-6 flex flex-col items-start relative overflow-hidden backdrop-blur-xl">
                                {/* Glow Effect */}
                                {partner.status === 'active' && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--partner-color)] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ '--partner-color': partner.color } as any} />
                                )}

                                <div className="flex justify-between items-start w-full mb-6 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl border border-zinc-700 shadow-lg">
                                        {partner.logo}
                                    </div>
                                    {partner.status === 'active' && (
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                                            <ShieldCheck className="w-3 h-3 text-[#00FF9C]" />
                                            Verificado
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-2xl font-bold mb-2 relative z-10 font-display">{partner.name}</h3>
                                <p className="text-zinc-500 text-sm mb-6 flex-grow relative z-10 border-b border-white/5 pb-4 w-full">
                                    {partner.description}
                                </p>

                                <div className="w-full relative z-10">
                                    <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-2"> BENEFICIO </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-white mb-6">
                                        <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        {partner.benefit}
                                    </div>

                                    {partner.status === 'active' ? (
                                        <Link
                                            href={partner.link}
                                            className="w-full py-3 rounded-xl bg-white text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                                        >
                                            Ver Detalles
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    ) : (
                                        <button disabled className="w-full py-3 rounded-xl bg-zinc-800/50 text-zinc-500 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                                            <Lock className="w-4 h-4" />
                                            Próximamente
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Bottom */}
                <div className="mt-24 text-center border-t border-white/5 pt-12">
                    <h3 className="text-2xl font-bold mb-4">¿Tienes una comunidad?</h3>
                    <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                        Únete a nuestra red de aliados y ofrece beneficios exclusivos a tus miembros mientras potencias tu infraestructura digital.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-bold">
                        Solicitar Alianza <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>
        </div>
    );
}
