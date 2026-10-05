'use client';

import Link from 'next/link';
import { Flame, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DinamitaPage() {
    const products = [
        {
            id: 'hoodie-dinamita-flame',
            name: 'Hoodie Oversize Flame Mood',
            price: '$160.000 COP',
            tag: 'Edición Limitada',
            description: 'Algodón rústico 450g con serigrafía inflable en pecho y espalda.',
        },
        {
            id: 'tee-acid-hibrido',
            name: 'T-Shirt Acid Wash Lab',
            price: '$95.000 COP',
            tag: 'Bestseller',
            description: 'Corte boxy con lavado ácido manual y gráfico vectorizado.',
        },
        {
            id: 'pants-cargo-utility',
            name: 'Cargo Pants Modular',
            price: '$210.000 COP',
            tag: 'Técnico',
            description: 'Ripstop impermeable con herrajes metálicos y bolsillos desmontables.',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
                <Link href="/hibrido" className="hover:text-white transition-colors">HÍBRIDO</Link>
                <span>/</span>
                <span className="text-pink-400 font-bold">DINAMITA MOOD</span>
            </nav>

            {/* Hero */}
            <div className="relative rounded-3xl bg-gradient-to-br from-pink-950/40 via-zinc-900 to-black border border-pink-500/30 p-8 sm:p-12 overflow-hidden mb-16">
                <div className="max-w-3xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-mono">
                        <Flame className="w-3.5 h-3.5 text-pink-400" />
                        <span>DIVISIÓN 03 • STREETWEAR EXPERIMENTAL</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
                        DINAMITA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400">
                            MOOD
                        </span>
                    </h1>

                    <p className="text-zinc-300 text-sm sm:text-base font-mono leading-relaxed">
                        Prendas concebidas bajo la tensión entre el streetwear urbano y la exploración textil de laboratorio. Siluetas sin género, telas de alto gramaje y confección local ética.
                    </p>
                </div>
            </div>

            {/* Lookbook / Product Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-pink-500/50 transition-all hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] group"
                    >
                        <div>
                            <div className="w-full h-64 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden mb-6">
                                <Flame className="w-16 h-16 text-pink-500/40 group-hover:scale-125 transition-transform duration-500" />
                                <span className="absolute top-3 right-3 text-[10px] font-mono bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full font-bold">
                                    {p.tag}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                            <p className="text-xs font-mono text-zinc-400 leading-relaxed mb-4">{p.description}</p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-lg font-bold font-mono text-pink-400">{p.price}</span>
                            <Link
                                href="/hibrido/marketplace"
                                className="p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
