'use client';

import { motion } from 'framer-motion';
import { BadgeDollarSign, BrainCircuit, Code2, Rocket, Smartphone, Target, Trophy, Users } from 'lucide-react';
import FluidBackground from '@/components/creative/FluidBackground';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';
import Link from 'next/link';

export default function AcademyPage() {
    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 selection:bg-[#6D28D9] selection:text-white">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
                <FluidBackground
                    config={FLUID_PRESET_PURRPURR.config}
                    colors={FLUID_PRESET_PURRPURR.colors}
                    speed={0.002}
                    force={1.5}
                    blurStrength={100}
                    grainOpacity={0.15}
                    className="absolute z-0 opacity-60"
                />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-[#00FF9C]/20 bg-[#00FF9C]/5 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9C]"></span>
                            </span>
                            <span className="text-[#00FF9C] text-xs font-mono tracking-widest font-bold uppercase">Purrpurr Academy</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white overflow-visible mb-8">
                            CREA TU PROPIO
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9C] to-[#3B82F6]">IMPERIO DIGITAL</span>
                        </h1>

                        <p className="font-sans text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-12">
                            Si te dijera que puedes ganar <span className="text-[#00FF9C] font-bold">$3,000 USD al mes</span> creando tus propios sistemas y aplicaciones, sin saber programar y trabajando desde casa... <br />
                            <span className="italic opacity-80 text-base mt-2 block">¿Pensarías que es mentira?</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="#start" className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_40px_rgba(109,40,217,0.5)] flex items-center gap-2 group">
                                Ver el Método
                                <ArrowDownIcon className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* --- REAL RESULTS SECTION --- */}
            <section className="py-24 bg-zinc-950 relative border-t border-zinc-900" id="start">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">RESULTADOS <span className="text-[#6D28D9]">REALES</span></h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto font-mono text-sm">Estos no son "gurús". Son personas reales usando nuestro método.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ResultCard
                            name="Palestina"
                            project="Sistema de Bodas"
                            earnings="$3,000"
                            timeframe="1ª semana"
                            icon={<Users className="w-6 h-6 text-pink-400" />}
                        />
                        <ResultCard
                            name="Miguel"
                            project="Gestión de Inventario"
                            earnings="$4,000"
                            timeframe="1er mes"
                            icon={<Target className="w-6 h-6 text-blue-400" />}
                        />
                        <ResultCard
                            name="Vinicio"
                            project="Finanzas Personales"
                            earnings="$50,000"
                            timeframe="Total"
                            icon={<BadgeDollarSign className="w-6 h-6 text-[#00FF9C]" />}
                            highlight
                        />
                        <ResultCard
                            name="José"
                            project="App Entrenamientos"
                            earnings="$15,000"
                            timeframe="Mensual"
                            icon={<Trophy className="w-6 h-6 text-orange-400" />}
                        />
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-xl md:text-2xl font-display font-medium text-white">Y ninguno de ellos sabía programar.</p>
                    </div>
                </div>
            </section>


            {/* --- THE OPPORTUNITY --- */}
            <section className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 relative overflow-hidden">
                {/* Abstract shapes/glows */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#6D28D9]/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="space-y-8">
                                <div>
                                    <span className="text-[#a78bfa] font-mono text-xs tracking-wider uppercase mb-2 block">// La Nueva Era</span>
                                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                                        La IA cambió las <br /><span className="text-[#00FF9C]">reglas del juego</span>.
                                    </h2>
                                </div>

                                <p className="text-zinc-400 leading-relaxed text-lg">
                                    Sé lo que estás pensando: <span className="italic text-zinc-200">"Yo quiero ganar dinero online, pero no sé programar"</span>.
                                </p>
                                <p className="text-zinc-400 leading-relaxed text-lg">
                                    Hasta hace poco, tenías razón. Crear una app era caro, difícil y lento. Necesitabas años de estudio o miles de dólares. Por eso te quedaste viendo a otros construir negocios mientras tú seguías atrapado.
                                </p>
                                <div className="p-6 bg-zinc-800/50 border border-zinc-700/50 rounded-lg backdrop-blur-sm">
                                    <p className="text-white font-medium text-lg mb-2">💡 La Buena Noticia</p>
                                    <p className="text-zinc-400">
                                        Hoy, cualquier persona puede crear sistemas profesionales en días. <strong className="text-white">Un joven de 18 años facturó 7 Millones de dólares</strong> creando una app contadora de calorías. ¿Imaginas facturar solo el 1% de eso?
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <BrainCircuit className="w-24 h-24 text-[#6D28D9] mb-6 opacity-80" strokeWidth={1} />
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Zero Code</h3>
                                <p className="text-zinc-500 font-mono text-sm max-w-[200px]">Prompt → Sistema → Ventas</p>

                                <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow-xl flex items-center gap-3">
                                    <Rocket className="w-8 h-8 text-[#00FF9C]" />
                                    <div className="text-left">
                                        <div className="text-xs text-zinc-500 uppercase font-bold">Tiempo de Desarrollo</div>
                                        <div className="text-white font-mono font-bold">2 Días vs 6 Meses</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- BUSINESS MODEL --- */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">EL MODELO DE <span className="text-[#6D28D9] underline decoration-[#00FF9C]/50 decoration-4 underline-offset-4">RENTA RECURRENTE</span></h2>

                    <p className="text-xl text-zinc-300 leading-relaxed mb-12">
                        No necesitas crear el próximo Facebook. Los mejores sistemas son los simples.
                        <br />
                        <span className="text-zinc-500 text-base mt-4 block max-w-2xl mx-auto">
                            Un sistema de agendamiento para salones, control de stock para tiendas, recordatorios para gimnasios.
                        </span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureBox
                            title="Vende Soluciones"
                            desc="Deja de vender tu tiempo. Vende una herramienta que trabaja 24/7."
                            icon={<Smartphone className="w-8 h-8 text-[#a78bfa]" />}
                        />
                        <FeatureBox
                            title="Ingreso Recurrente"
                            desc="Tus clientes pagan mes a mes. Construyes estabilidad financiera."
                            icon={<BadgeDollarSign className="w-8 h-8 text-[#00FF9C]" />}
                        />
                        <FeatureBox
                            title="Libertad Total"
                            desc="El sistema trabaja mientras duermes, viajas o disfrutas tu vida."
                            icon={<Rocket className="w-8 h-8 text-blue-400" />}
                        />
                    </div>
                </div>
            </section>


            {/* --- CTA / PAULO BORGES --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#6D28D9] z-0">
                    <div className="absolute inset-0 bg-zinc-950 opacity-90 mix-blend-multiply"></div>
                    {/* Gradient splash */}
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#6D28D9] blur-[150px] opacity-40"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto bg-zinc-900/40 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-8 md:p-12">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-zinc-800 border-2 border-[#00FF9C] shrink-0">
                                {/* Placeholder for Paulo or Purrpurr Avatar if needed */}
                                <div className="w-full h-full flex items-center justify-center text-4xl">👨‍💻</div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Hola, soy Paulo Borges.</h3>
                                <p className="text-zinc-300 mb-4">
                                    Fui profesor de programación de más de 100,000 alumnos. Pero la IA me enseñó algo nuevo: <strong className="text-white">ya no necesitas programar.</strong>
                                </p>
                                <p className="text-zinc-400 text-sm">
                                    Me propuse crear sistemas completos sin código. En un día tenía un sistema online y clientes pagando en dólares. Compartí el método y los resultados fueron absurdos.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 pt-10 border-t border-zinc-700/50 text-center">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                                ¿Listo para crear tu <span className="text-[#00FF9C]">Sistema Lucrativo</span>?
                            </h2>
                            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                                Te enseñaré el direccionamiento correcto para pedirle a la IA lo que se convierte en apps que las personas pagan.
                            </p>

                            <button className="bg-[#00FF9C] hover:bg-[#00cc7d] text-zinc-950 px-10 py-5 rounded-sm font-bold tracking-widest uppercase transition-all duration-300 text-lg shadow-[0_0_20px_rgba(0,255,156,0.4)] hover:scale-105">
                                QUIERO ACCEDER AL MÉTODO
                            </button>
                            <p className="mt-4 text-xs font-mono text-zinc-600 uppercase tracking-widest">Plazas Limitadas • Acceso Inmediato</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

// --- SUBCOMPONENTS ---

function ResultCard({ name, project, earnings, timeframe, icon, highlight = false }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-6 rounded-xl border ${highlight ? 'bg-zinc-800/80 border-[#00FF9C]/50 shadow-[0_0_30px_rgba(0,255,156,0.1)]' : 'bg-zinc-900/50 border-zinc-800'} backdrop-blur-sm flex flex-col gap-4 text-left`}
        >
            <div className="flex justify-between items-start">
                <div className="p-2 bg-zinc-950 rounded-lg">{icon}</div>
                {highlight && <span className="px-2 py-0.5 bg-[#00FF9C]/20 text-[#00FF9C] text-[10px] uppercase font-bold rounded">Top</span>}
            </div>

            <div>
                <h4 className="text-white font-bold text-lg">{name}</h4>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">{project}</p>
                <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-mono font-bold ${highlight ? 'text-[#00FF9C]' : 'text-zinc-200'}`}>{earnings}</span>
                    <span className="text-zinc-600 text-xs">/ {timeframe}</span>
                </div>
            </div>
        </motion.div>
    )
}

function FeatureBox({ title, desc, icon }: any) {
    return (
        <div className="p-8 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-[#6D28D9]/50 transition-colors group text-left">
            <div className="mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h3 className="text-xl font-display font-bold text-white mb-3">{title}</h3>
            <p className="text-zinc-400 leading-relaxed">{desc}</p>
        </div>
    )
}

function ArrowDownIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
    )
}
