'use client';

import { motion } from 'framer-motion';
import { Bot, Share2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { AgentOrchestrator } from '@/components/labs/social-agents/AgentOrchestrator';
import { TerminalFeed } from '@/components/labs/social-agents/TerminalFeed';
import { CampaignPipeline } from '@/components/labs/social-agents/CampaignPipeline';

export default function SocialLabsPage() {
    return (
        <div className="min-h-screen bg-[#0f0033] text-white pt-4 pb-12 px-4 md:px-8 selection:bg-[#8f69ff]/30">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Status Line */}
                <div className="flex justify-end pt-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-zinc-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        SOCIAL_LAB_CONNECTED
                    </div>
                </div>

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-[#8f69ff]/20 border border-[#8f69ff]/40 shadow-[0_0_20px_rgba(143,105,255,0.2)]">
                                <Bot className="w-8 h-8 text-[#8f69ff]" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
                                SOCIAL_<span className="text-[#8f69ff]">LABS</span>
                            </h1>
                        </div>
                        <p className="text-zinc-400 font-mono text-sm md:text-lg max-w-2xl leading-relaxed">
                            Laboratorio de ingeniería social y orquestación de campañas.
                            <span className="text-white"> Estrategia ejecutada pieza a pieza.</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest">SYSTEM_STABLE</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 bg-white/5 px-3 py-1 rounded-md border border-white/5">
                            VERSION: 1.2.0_ORCHESTRATOR
                        </div>
                    </div>
                </header>

                {/* Main Interface Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Status & Feed Sidebar */}
                    <aside className="lg:col-span-4 flex flex-col gap-8">
                        <div className="flex-1 min-h-[400px]">
                            <AgentOrchestrator />
                        </div>
                        <div className="flex-1 min-h-[400px]">
                            <TerminalFeed />
                        </div>
                    </aside>

                    {/* Development & Output Area */}
                    <main className="lg:col-span-8 space-y-8 flex flex-col">

                        {/* Featured Generation Preview */}
                        <section className="relative group rounded-3xl overflow-hidden border border-white/10 bg-zinc-950/80 shadow-2xl flex-shrink-0">
                            <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
                                <Image
                                    src="/assets/purrpurr_labs_social_agents_hero.png"
                                    alt="Social Labs Visual"
                                    fill
                                    className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0033] via-[#0f0033]/40 to-transparent" />

                                {/* Visual UI Overlays */}
                                <div className="absolute top-6 left-6 flex gap-3">
                                    <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-mono text-zinc-300">
                                        ZOOM: 1.2X
                                    </div>
                                    <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-mono text-zinc-300">
                                        FOCAL: 35MM
                                    </div>
                                </div>

                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-[#8f69ff] text-[10px] font-black rounded-sm uppercase tracking-tighter">FEATURED_ASSET</span>
                                            <span className="text-[11px] text-zinc-400 font-mono tracking-widest bg-black/40 px-3 py-1 rounded-sm border border-white/5">PX_ID_982_STRATEGY</span>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl md:text-5xl font-display font-bold text-white leading-none">
                                                ESTRATEGIA HECHA CÓDIGO:<br />
                                                <span className="text-[#8f69ff]">Q1_LAUNCH_REVEAL</span>
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-6 pt-2">
                                            <div className="flex items-center gap-2.5 text-sm text-zinc-300 font-mono bg-white/5 px-4 py-2 rounded-xl">
                                                <Share2 className="w-4 h-4 text-[#00FF9C]" /> Instagram, LinkedIn, X
                                            </div>
                                            <div className="flex items-center gap-2.5 text-sm text-zinc-300 font-mono bg-white/5 px-4 py-2 rounded-xl">
                                                <ImageIcon className="w-4 h-4 text-[#8f69ff]" /> 1080x1350px (Dynamic)
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Interaction Bar */}
                            <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="text-[10px] font-mono text-zinc-400 hover:text-white transition-colors">RAW_PROMPT</button>
                                    <button className="text-[10px] font-mono text-zinc-400 hover:text-white transition-colors">METADATA</button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bot className="w-3 h-3 text-[#00FF9C]" />
                                    <span className="text-[10px] font-mono text-emerald-500 uppercase">Procesado en Laboratorio Social</span>
                                </div>
                            </div>
                        </section>

                        {/* Campaign Pipeline Section */}
                        <section className="flex-1">
                            <CampaignPipeline />
                        </section>
                    </main>

                </div>

                {/* Global Action Footer */}
                <footer className="flex flex-col items-center gap-8 py-12 border-t border-white/5">
                    <div className="text-center space-y-2">
                        <h4 className="font-display font-bold text-xl uppercase tracking-widest text-[#a78bfa]">¿LISTO PARA ESCALAR?</h4>
                        <p className="text-zinc-500 font-mono text-xs">Instruye al orquestador para generar la siguiente iteración de contenido.</p>
                    </div>
                    <button className="group relative px-10 py-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8f69ff]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <div className="relative z-10 flex items-center gap-4">
                            <span className="font-mono text-sm font-black tracking-[0.3em] text-white">
                                INSTRUIR_AL_ORQUESTADOR
                            </span>
                            <Bot className="w-5 h-5 text-[#8f69ff] group-hover:rotate-12 transition-transform" />
                        </div>
                    </button>
                    <div className="flex gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
                        <span>Latency: 24ms</span>
                        <span>Uptime: 99.9%</span>
                        <span>Agents_Online: 04</span>
                    </div>
                </footer>

            </div>
        </div>
    );
}
