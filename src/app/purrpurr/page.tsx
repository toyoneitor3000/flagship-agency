'use client';

import { motion } from 'framer-motion';
import { Bot, Terminal, Eye, Zap, Shield, Sparkles, Building2 } from 'lucide-react';
import { PurrpurrGuide } from '@/components/purrpurr/PurrpurrGuide';
import { PurrpurrGlitch } from '@/components/purrpurr/PurrpurrGlitch';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function PurrpurrEcosystemPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-purple-500/30">
            <Navbar />

            <main className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Decor */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">

                    {/* Header Section */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center justify-center mb-6"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-20 animate-pulse" />
                                <PurrpurrGlitch />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400">
                                PURRPURR
                            </span>
                            <span className="block text-2xl md:text-3xl text-zinc-500 font-mono font-normal mt-2 tracking-widest uppercase">
                                Native Intelligence Architecture
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed"
                        >
                            Más que un chatbot. Un sistema determinista diseñado para simular consciencia y adaptarse contextualemente a cada entorno del laboratorio.
                        </motion.p>
                    </div>

                    {/* Philosophy Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-32 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3 font-display">
                                <Terminal className="w-8 h-8 text-purple-500" />
                                Inteligencia Nativa
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                A diferencia de los modelos LLM genéricos que "alucinan", Purrpurr opera bajo una arquitectura de <strong>Inteligencia Nativa</strong>. Utiliza lógica determinista, matemáticas avanzadas y análisis del DOM en tiempo real.
                            </p>
                            <div className="p-6 bg-zinc-900/50 border border-purple-500/20 rounded-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-bold select-none text-purple-500">AI</div>
                                <p className="relative z-10 text-purple-200 font-medium text-lg italic">
                                    "El laboratorio no alquila inteligencia, la genera."
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-square md:aspect-video bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto animate-pulse shadow-[0_0_15px_#10b981]" />
                                    <div className="font-mono text-xs text-emerald-500 tracking-[0.2em]">SYSTEM_ONLINE</div>
                                    <div className="font-mono text-zinc-500 text-xs">
                                        CPU: 12% <br />
                                        MEM: 430MB <br />
                                        LATENCY: 12ms
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Engineering DNA / About Us Section */}
                    <div className="mb-32 max-w-6xl mx-auto border-t border-zinc-900 pt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="font-mono text-purple-500 text-xs tracking-[0.3em] uppercase mb-4 block">
                                Engineering DNA
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-display">
                                Más que Código: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Mecánica Digital</span>
                            </h2>
                            <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed mb-12">
                                Un auto de carreras no es rápido por casualidad; es rápido porque cada pieza tiene un propósito.
                                En <span className="text-white font-semibold">Flagship Agency</span>, aplicamos esta misma lógica al software y a la inteligencia de Purrpurr.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
                                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                    Propósito
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    No agregamos nada que no mejore el rendimiento, la seguridad o la experiencia de manejo del usuario.
                                </p>
                            </div>
                            <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
                                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-emerald-400" />
                                    Esencialismo
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed font-mono italic">
                                    "La perfección no se alcanza cuando no hay nada más que añadir, sino cuando no hay nada más que quitar."
                                </p>
                            </div>
                            <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
                                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                    Visión
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    No solo escribimos software, entendemos tu negocio. Creamos la infraestructura que ordena tu operación.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Roles Grid */}
                    <div className="max-w-7xl mx-auto mb-32">
                        <h2 className="text-3xl font-bold text-center mb-16">Roles del Sistema</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Concierge */}
                            <RoleCard
                                icon={<Bot className="w-8 h-8 text-blue-400" />}
                                title="System Nexus"
                                subtitle="Concierge & Navegación"
                                description="Gestiona el estado global y guía al usuario a través de los diferentes laboratorios."
                                location="Dashboard Principal"
                                color="border-blue-500/20 hover:border-blue-500/50"
                            />

                            {/* Engineer */}
                            <RoleCard
                                icon={<Zap className="w-8 h-8 text-yellow-400" />}
                                title="Telemetry Engineer"
                                subtitle="Rendimiento & Física"
                                description="Monitorea FPS, uso de memoria WebGL y optimiza simulaciones en tiempo real."
                                location="Inertia Engine"
                                color="border-yellow-500/20 hover:border-yellow-500/50"
                            />

                            {/* Critic */}
                            <RoleCard
                                icon={<Eye className="w-8 h-8 text-emerald-400" />}
                                title="Design Critic"
                                subtitle="Accesibilidad & Tipografía"
                                description="Analiza el contraste, legibilidad y jerarquía visual de los elementos en pantalla."
                                location="Typo Lab"
                                color="border-emerald-500/20 hover:border-emerald-500/50"
                            />

                            {/* Muse */}
                            <RoleCard
                                icon={<Sparkles className="w-8 h-8 text-pink-400" />}
                                title="Creative Muse"
                                subtitle="Inspiración Generativa"
                                description="Genera paletas de colores, patrones de ruido y composiciones visuales aleatorias."
                                location="Visual Lab"
                                color="border-pink-500/20 hover:border-pink-500/50"
                            />

                            {/* Guardian */}
                            <RoleCard
                                icon={<Shield className="w-8 h-8 text-red-500" />}
                                title="System Guardian"
                                subtitle="Protección & Depuración"
                                description="Intercepta errores críticos y los traduce a lenguaje humano para facilitar la corrección."
                                location="Global System"
                                color="border-red-500/20 hover:border-red-500/50"
                            />
                        </div>
                    </div>

                    {/* Integration CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center bg-gradient-to-br from-zinc-900 to-black border border-purple-500/30 p-12 rounded-3xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                        <h2 className="text-3xl font-bold mb-6">Experimenta la Arquitectura</h2>
                        <p className="text-zinc-400 mb-8">
                            Purrpurr está activo en todos los laboratorios. Visita el Dashboard para verlo en acción.
                        </p>
                        <a
                            href="/lab"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                        >
                            Entrar al Laboratorio <Bot className="w-5 h-5" />
                        </a>
                        <a
                            href="/purrpurr/architecture"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all hover:scale-105 border border-white/10 ml-4"
                        >
                            Ver Arquitectura <Building2 className="w-5 h-5" />
                        </a>
                    </motion.div>

                </div>
            </main>

            <Footer />

            {/* Demo Instance */}
            <PurrpurrGuide
                mode="floating"
                tip="Estás visualizando mi documentación técnica. Aquí se define mi comportamiento en cada entorno."
            />
        </div>
    );
}

function RoleCard({ icon, title, subtitle, description, location, color }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`bg-zinc-900/40 backdrop-blur-sm border ${color} p-8 rounded-2xl transition-all group`}
        >
            <div className="mb-6 bg-zinc-950/50 w-16 h-16 rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                {icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-xs font-mono text-purple-400 mb-4 uppercase tracking-wider">{subtitle}</p>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 h-20">
                {description}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 border-t border-white/5 pt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                {location}
            </div>
        </motion.div>
    );
}
