'use client';

import { motion } from 'framer-motion';
import { Bot, Terminal, Eye, Zap, Shield, Sparkles, Building2 } from 'lucide-react';
import { PurrpurrGuide } from '@/components/purrpurr/PurrpurrGuide';
import Link from 'next/link';

export default function PurrpurrEcosystemPage() {
    return (
        <div className="min-h-screen bg-[#0f0524] text-white font-sans selection:bg-purple-500/30">

            <main className="relative">
                {/* Global Background (Alive & Vibrant) */}
                <div className="fixed inset-0 z-0 pointer-events-none bg-[#0f0524]" />
                <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] bg-[url('/grid.svg')] bg-[size:100px_100px] mix-blend-overlay" />

                <div className="container mx-auto px-4 relative z-10">

                    {/* Hero Section - Immersive Violet */}
                    <section className="relative pt-32 pb-48 flex flex-col items-center justify-center text-center overflow-hidden" data-section-theme="dark">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-purple-600/20 blur-[150px] -z-10 rounded-full" />

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="text-7xl md:text-9xl font-black tracking-tighter mb-8"
                        >
                            <span className="text-white drop-shadow-[0_0_50px_rgba(168,85,247,0.3)]">PURRPURR</span>
                            <span className="block text-2xl md:text-3xl text-purple-400 font-mono font-normal mt-6 tracking-[0.5em] uppercase opacity-80">
                                Native Architecture
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl md:text-3xl text-purple-100/60 max-w-4xl mx-auto leading-relaxed font-light"
                        >
                            Un ecosistema determinista diseñado para la gestión de estados globales y coordinación contextual en entornos de alta complejidad.
                        </motion.p>
                    </section>
                </div>

                {/* Laboratory Origin Section - Vibrant Purple Gradient */}
                <section className="relative py-48 bg-[#1e0a3d] border-y border-white/10" data-section-theme="dark">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-24 items-center">
                                <div className="space-y-12">
                                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-purple-300 uppercase tracking-[0.4em] backdrop-blur-md">
                                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                                        Development Roots
                                    </div>
                                    <h2 className="text-6xl md:text-8xl font-black font-display leading-[0.85] tracking-tighter">
                                        Nacida como <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500">Purrpurr Dev</span>
                                    </h2>
                                    <p className="text-purple-100/50 text-2xl leading-relaxed font-light">
                                        Purrpurr no es una herramienta externa; es el tejido conectivo desarrollado internamente para garantizar la coherencia absoluta.
                                    </p>

                                    <div className="flex items-center gap-10 pt-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-purple-400/60 uppercase font-mono tracking-widest mb-2 font-bold">Estatus</span>
                                            <span className="text-emerald-400 font-black font-mono text-lg tracking-widest">NATIVE_SYNC</span>
                                        </div>
                                        <div className="w-px h-12 bg-white/10" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-purple-400/60 uppercase font-mono tracking-widest mb-2 font-bold">Origen</span>
                                            <span className="text-white font-black font-mono text-lg tracking-widest">LAB_01</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -inset-20 bg-purple-500/30 blur-[120px] rounded-full opacity-60" />
                                    <div className="relative p-12 bg-white/10 border border-white/20 rounded-[4rem] backdrop-blur-3xl shadow-2xl space-y-10">
                                        <div className="space-y-6 font-mono text-base text-purple-200">
                                            <div className="flex items-center gap-5">
                                                <div className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                                                <span>Protocols_Initializing_01...</span>
                                            </div>
                                            <div className="flex items-center gap-5 text-purple-300/80">
                                                <div className="w-3 h-3 rounded-full bg-purple-500/40" />
                                                <span>Identity_Master_Loaded...</span>
                                            </div>
                                        </div>
                                        <div className="pt-10 border-t border-white/10">
                                            <p className="text-xl leading-relaxed text-purple-100/60 italic font-light">
                                                "Sin dependencias externas. Sin límites de ejecución. La arquitectura es el lenguaje mismo."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DNA & Features Section - Deep Emerald/Teal Horizon */}
                <section className="relative py-48 bg-[#0a1f1a]" data-section-theme="dark">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent)]" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-3 gap-12">
                                <FeatureCard
                                    icon={<Zap className="w-6 h-6 text-purple-400" />}
                                    title="Eficiencia"
                                    description="Cada línea de código está optimizada para la velocidad absoluta."
                                />
                                <FeatureCard
                                    icon={<Shield className="w-6 h-6 text-emerald-400" />}
                                    title="Seguridad"
                                    description="Arquitectura cerrada y determinista que protege la integridad."
                                />
                                <FeatureCard
                                    icon={<Building2 className="w-6 h-6 text-blue-400" />}
                                    title="Estructura"
                                    description="Diseñada para escalar la complejidad operativa del Multiverso."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ecosystem Section - Saturated Navy/Indigo Theme */}
                <section className="relative py-48 bg-[#161452] border-t border-white/10" data-section-theme="dark">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent)] pointer-events-none" />
                    <div className="container mx-auto px-6 relative z-10">

                        {/* Ecosystem Roles & Divisions */}
                        <div className="text-center mb-32">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">Ecosistema Purrpurr</h2>
                            <p className="text-purple-300/40 font-mono text-sm tracking-[0.4em] uppercase font-bold">Estructura Universal del Multiverso</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                            <Link href="/purrpurr/dev" className="block h-full group">
                                <RoleCard
                                    icon={<Building2 className="w-6 h-6 text-purple-400" />}
                                    title="Purrpurr Dev"
                                    subtitle="Identidad & Estrategia"
                                    description="El origen de todo. Creación de marca, pulido de ideas, naming y arquitectura de marca absoluta."
                                    color="border-zinc-800 group-hover:border-purple-500/30"
                                />
                            </Link>
                            <Link href="/purrpurr/dev" className="block h-full group">
                                <RoleCard
                                    icon={<Bot className="w-6 h-6 text-blue-400" />}
                                    title="Purrpurr.dev"
                                    subtitle="Desarrollo Nativo"
                                    description="Ingeniería pura para la web, aplicaciones y sistemas de alta complejidad técnica."
                                    color="border-zinc-800 hover:border-blue-500/30"
                                />
                            </Link>
                            <Link href="/services" className="block h-full group">
                                <RoleCard
                                    icon={<Zap className="w-6 h-6 text-yellow-400" />}
                                    title="Purrpurr Services"
                                    subtitle="Soluciones"
                                    description="Implementación de infraestructuras digitales personalizadas para empresas líderes."
                                    color="border-zinc-800 hover:border-yellow-500/30"
                                />
                            </Link>
                            <Link href="/guardian" className="block h-full group">
                                <RoleCard
                                    icon={<Shield className="w-6 h-6 text-red-500" />}
                                    title="PU Guardian"
                                    subtitle="Protección & Depuración"
                                    description="Sistemas de seguridad avanzada y estabilidad de sistemas en entornos críticos."
                                    color="border-zinc-800 hover:border-red-500/30"
                                />
                            </Link>
                            <Link href="/purrpurr/academy" className="block h-full group">
                                <RoleCard
                                    icon={<Eye className="w-6 h-6 text-emerald-400" />}
                                    title="Purrpurr Academy"
                                    subtitle="Mentoría"
                                    description="Transferencia de conocimiento y formación técnica en arquitectura determinista."
                                    color="border-zinc-800 hover:border-emerald-500/30"
                                />
                            </Link>
                            <Link href="/purrpurr/labs" className="block h-full group">
                                <RoleCard
                                    icon={<Sparkles className="w-6 h-6 text-pink-400" />}
                                    title="Purrpurr Labs"
                                    subtitle="Investigación"
                                    description="El laboratorio donde nacen nuevas ideas y se experimenta con el futuro digital."
                                    color="border-zinc-800 hover:border-pink-500/30"
                                />
                            </Link>
                            <Link href="/wiki" className="block h-full group">
                                <RoleCard
                                    icon={<Terminal className="w-6 h-6 text-zinc-400" />}
                                    title="Purrpurr Wiki"
                                    subtitle="Documentación"
                                    description="Repositorio central de conocimiento técnico y guías maestras del ecosistema."
                                    color="border-zinc-800 hover:border-zinc-500/30"
                                />
                            </Link>
                            <Link href="/news" className="block h-full group">
                                <RoleCard
                                    icon={<Zap className="w-6 h-6 text-orange-400" />}
                                    title="PU News"
                                    subtitle="Actualizaciones"
                                    description="Noticias, lanzamientos y estados del Multiverso en tiempo real."
                                    color="border-zinc-800 hover:border-orange-500/30"
                                />
                            </Link>
                            <Link href="/demo" className="block h-full group">
                                <RoleCard
                                    icon={<Bot className="w-6 h-6 text-white" />}
                                    title="Demo"
                                    subtitle="Instancia"
                                    description="Entorno seguro para probar y experimentar con las capacidades del sistema."
                                    color="border-zinc-800 hover:border-white/30"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>


            <PurrpurrGuide
                mode="floating"
                tip="Documentación técnica del sistema Purrpurr."
            />
        </div>
    );
}


function FeatureCard({ icon, title, description }: any) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="p-12 bg-white/5 border border-white/10 rounded-[3rem] group hover:bg-white/[0.12] transition-all duration-700 backdrop-blur-3xl shadow-2xl"
        >
            <div className="w-16 h-16 rounded-3xl bg-purple-500/20 flex items-center justify-center mb-10 border border-purple-500/20 group-hover:scale-110 transition-all shadow-lg shadow-purple-950/20">
                {icon}
            </div>
            <h3 className="text-3xl font-black text-white mb-6 group-hover:text-purple-300 transition-colors tracking-tight">
                {title}
            </h3>
            <p className="text-purple-100/60 text-lg leading-relaxed font-light">
                {description}
            </p>
        </motion.div>
    );
}

function RoleCard({ icon, title, subtitle, description, color }: any) {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className={`bg-white/5 border ${color} p-12 rounded-[3.5rem] transition-all h-full backdrop-blur-3xl shadow-2xl hover:bg-white/[0.15] flex flex-col border-white/10 cursor-pointer relative overflow-hidden group/card`}
        >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover/card:opacity-40 transition-opacity">
                <Zap className="w-5 h-5 text-purple-300" />
            </div>

            <div className="mb-10 bg-purple-500/20 w-20 h-20 rounded-3xl flex items-center justify-center border border-purple-500/20 shadow-lg shadow-purple-950/20 group-hover/card:scale-110 transition-transform">
                <div className="scale-125">{icon}</div>
            </div>

            <h3 className="text-3xl font-black text-white mb-3 tracking-tighter group-hover/card:text-purple-200 transition-colors">{title}</h3>
            <p className="text-xs font-mono text-purple-400 mb-8 uppercase tracking-[0.4em] font-black opacity-90">{subtitle}</p>

            <p className="text-purple-100/60 text-lg leading-relaxed font-light flex-grow">
                {description}
            </p>

            <div className="mt-10 flex items-center gap-2 text-purple-400 group-hover/card:gap-4 transition-all duration-300">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-opacity">Explorar</span>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse group-hover/card:scale-125" />
            </div>
        </motion.div>
    );
}
