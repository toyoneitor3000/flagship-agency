'use client';

import { motion } from 'framer-motion';
import { Search, Server, Globe, Cpu, LayoutTemplate, Database, Bot, ShoppingCart, ShieldCheck, Activity, Layers, Code2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { wikiDatabase, WikiTerm } from '@/lib/wiki-terminology';

// Categorías de iconos para dar variedad visual
const categories = {
    infra: <Server className="w-5 h-5 text-indigo-400" />,
    web: <Globe className="w-5 h-5 text-emerald-400" />,
    tech: <Cpu className="w-5 h-5 text-purple-400" />,
    ui: <LayoutTemplate className="w-5 h-5 text-pink-400" />,
    data: <Database className="w-5 h-5 text-blue-400" />,
    ai: <Bot className="w-5 h-5 text-amber-400" />,
    commerce: <ShoppingCart className="w-5 h-5 text-orange-400" />,
    security: <ShieldCheck className="w-5 h-5 text-red-400" />,
    biz: <Activity className="w-5 h-5 text-cyan-400" />
};

export default function WikiPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTerms = wikiDatabase.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.def.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-4 md:px-8">

            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-12 text-center">
                <Link href="/#pricing" className="inline-flex items-center text-zinc-500 hover:text-indigo-400 mb-6 text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Planes
                </Link>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
                    Wiki <span className="text-indigo-500">Purrpurr</span>
                </h1>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Diccionario técnico para humanos. Entiende exactamente qué estás contratando sin tecnicismos confusos.
                </p>
            </div>

            {/* SEARCH */}
            <div className="max-w-xl mx-auto mb-16 relative">
                <div className="relative group">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-zinc-900/80 border border-zinc-800 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-colors shadow-xl">
                        <Search className="w-5 h-5 text-zinc-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Buscar término (ej. Hosting, API, SEO)..."
                            className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder:text-zinc-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTerms.map((item, idx) => (
                    <motion.div
                        key={item.term}
                        id={item.slug.toLowerCase()} // ANCHOR FOR DEEP LINKING
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group relative bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 hover:bg-zinc-900/80 hover:border-indigo-500/30 transition-all hover:shadow-2xl hover:shadow-indigo-900/20 target:ring-2 target:ring-indigo-500 target:bg-zinc-900/90"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:border-indigo-500/30 group-hover:scale-110 transition-all duration-300">
                                {item.iconType ? categories[item.iconType] : categories.web}
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-600 bg-zinc-950/50 px-2 py-1 rounded border border-zinc-800/50 group-hover:text-zinc-400 transition-colors">
                                {item.category}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-indigo-300 transition-colors">
                            {item.term}
                        </h3>

                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            {item.def}
                        </p>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/50 transition-all duration-500" />
                    </motion.div>
                ))}
            </div>

            {/* EMPTY STATE */}
            {filteredTerms.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-zinc-500 text-lg">No encontramos el término "{searchTerm}"</p>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="mt-4 text-indigo-400 hover:text-indigo-300 underline text-sm"
                    >
                        Ver todos los términos
                    </button>
                </div>
            )}

            {/* FOOTER CTA */}
            <div className="mt-24 text-center">
                <p className="text-zinc-500 text-sm mb-4">¿Te quedó alguna duda?</p>
                <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-zinc-100 text-zinc-950 rounded-xl font-bold hover:bg-white hover:scale-105 transition-all">
                    Preguntar a un Humano
                </Link>
            </div>

        </div>
    );
}
