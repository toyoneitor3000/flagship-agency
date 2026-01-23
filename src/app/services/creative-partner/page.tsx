"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Infinity,
    ShieldCheck,
    ArrowRight,
    Check,
    Rocket,
    Layers,
    MessageSquare,
    MousePointerClick,
    Users
} from 'lucide-react';
import Link from 'next/link';

export default function CreativePartnerPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
                    >
                        <Zap className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold tracking-widest uppercase text-indigo-300">Socio Creativo / Modelo 2026</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-8"
                    >
                        Ejecución <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-emerald-400">
                            Sin Límites
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                    >
                        Transformamos la figura del &quot;Junior&quot; en una terminal de ingeniería creativa.
                        Un solo pago mensual, pedidos ilimitados, velocidad de software.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/checkout?plan=partner"
                            className="w-full sm:w-auto px-8 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 group"
                        >
                            Reservar Cupo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-5 bg-zinc-900 border border-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                        >
                            Ver Portafolio
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-24 bg-zinc-950/50 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                                <Infinity className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold">Pedidos Ilimitados</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                No cuentes horas ni piezas. Envía todas tus solicitudes a tu canal dedicado y nosotros las ejecutamos una a una.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                                <Zap className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold">Entrega Veloz</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Recibe tus diseños, ediciones de video o actualizaciones de código en un promedio de 48 horas. Sin fricción.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                                <ShieldCheck className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold">Costo Fijo</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Olvida las nóminas, impuestos y beneficios. Un solo pago recurrente, deducible como servicio, con calidad de élite.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PORTAL PREVIEW */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 block">Operación Fluida</span>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-8">
                                Tu propio Centro <br />
                                <span className="text-zinc-500">de Mando</span>
                            </h2>
                            <ul className="space-y-6">
                                {[
                                    { icon: MousePointerClick, title: "Un Click", desc: "Solicita tareas desde tu dashboard privado." },
                                    { icon: MessageSquare, title: "Chat Directo", desc: "Comunicación sin correos interminables." },
                                    { icon: Layers, title: "Historio de Activos", desc: "Todos tus entregables organizados para siempre." },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                            <item.icon className="w-5 h-5 text-zinc-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white uppercase text-sm tracking-wide">{item.title}</h4>
                                            <p className="text-zinc-500 text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-4 overflow-hidden shadow-2xl">
                                <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-white/5 aspect-video flex items-center justify-center">
                                    <div className="space-y-2 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto" />
                                        <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">Visualizando Dashboard...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING CARD */}
            <section className="py-32 bg-zinc-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-16">Acceso a la Infraestructura</h2>

                    <div className="max-w-xl mx-auto p-12 bg-white/5 border border-indigo-500/50 rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                            <Rocket className="w-64 h-64 text-white" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black italic uppercase mb-2">Partner Creativo</h3>
                            <p className="text-zinc-400 text-sm mb-8">El motor de ejecución para marcas libres.</p>

                            <div className="mb-12">
                                <span className="text-6xl font-black tracking-tighter">$1.200.000</span>
                                <span className="text-zinc-500 text-sm ml-2">/ Mes</span>
                            </div>

                            <ul className="text-left space-y-4 mb-12">
                                {[
                                    "Pedidos Ilimitados",
                                    "Diseño, Video & Web",
                                    "Dashboard Privado",
                                    "Entrega en < 48h",
                                    "Cancelas cuando quieras"
                                ].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                        <Check className="w-4 h-4 text-indigo-400" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/20 active:scale-95">
                                Empezar Suscripción
                            </button>
                            <p className="mt-6 text-[10px] text-zinc-600 font-medium uppercase tracking-[0.2em]">Pocas plazas disponibles por mes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FOOTER */}
            <footer className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-zinc-500 mb-8 max-w-lg mx-auto leading-relaxed">
                        Este modelo no es para todos. Es para marcas que valoran la velocidad y la calidad de ingeniería pura por sobre la burocracia corporativa.
                    </p>
                    <div className="flex items-center justify-center gap-8">
                        <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Inicio</Link>
                        <Link href="/dashboard" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Portal</Link>
                        <Link href="/manual" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Metodología</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
