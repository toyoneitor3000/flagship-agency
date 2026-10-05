'use client';

import Link from 'next/link';
import { Recycle, ArrowRight, CheckCircle2, Coins, Leaf, PackageOpen } from 'lucide-react';

export default function PlasticoFinalFelizPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
                <Link href="/hibrido" className="hover:text-white transition-colors">HÍBRIDO</Link>
                <span>/</span>
                <span className="text-emerald-400 font-bold">PLÁSTICO CON FINAL FELIZ</span>
            </nav>

            {/* Hero */}
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-black border border-emerald-500/30 p-8 sm:p-12 overflow-hidden mb-16">
                <div className="max-w-3xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
                        <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>DIVISIÓN 02 • ECONOMÍA CIRCULAR</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                        Plástico con <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Final Feliz
                        </span>
                    </h1>

                    <p className="text-zinc-300 text-sm sm:text-base font-mono leading-relaxed">
                        Transformamos residuos plásticos post-consumo en objetos utilitarios y piezas de diseño coleccionables. El plástico no es basura: es materia prima esperando su nueva vida.
                    </p>
                </div>
            </div>

            {/* Banco de Reciclaje Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-zinc-950/60 border border-white/10 rounded-3xl p-8 space-y-4">
                    <Coins className="w-8 h-8 text-emerald-400" />
                    <h3 className="text-xl font-bold">1. Banco de Reciclaje</h3>
                    <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                        Trae tus tapas, botellas y plásticos clasificados (HDPE, PP, PET) a nuestros puntos de recolección y acumula créditos para el marketplace.
                    </p>
                </div>

                <div className="bg-zinc-950/60 border border-white/10 rounded-3xl p-8 space-y-4">
                    <Leaf className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-xl font-bold">2. Trituración & Termofusión</h3>
                    <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                        En nuestro taller experimental trituramos por color y prensamos a temperatura controlada, creando vetas marmoladas únicas e irrepetibles.
                    </p>
                </div>

                <div className="bg-zinc-950/60 border border-white/10 rounded-3xl p-8 space-y-4">
                    <PackageOpen className="w-8 h-8 text-pink-400" />
                    <h3 className="text-xl font-bold">3. Nueva Vida Útil</h3>
                    <p className="text-sm font-mono text-zinc-400 leading-relaxed">
                        Piezas duraderas, macetas, mobiliario auxiliar, joyería contemporánea y accesorios que nunca volverán a contaminar un océano.
                    </p>
                </div>
            </section>

            {/* Call to Action */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="text-xl font-bold">¿Tienes plástico para reciclar o proyectos a medida?</h4>
                    <p className="text-sm text-zinc-400 font-mono mt-1">Conecta con el laboratorio para activaciones corporativas o entrega comunitaria.</p>
                </div>
                <Link
                    href="/hibrido/marketplace"
                    className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0"
                >
                    Ver Catálogo Upcycling
                </Link>
            </div>
        </div>
    );
}
