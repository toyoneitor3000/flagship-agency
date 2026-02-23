import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPostsMeta } from '@/lib/mdx';

export const metadata: Metadata = {
    title: 'Aprende | Wiki de Stickers',
    description: 'Descubre todo sobre la impresión de stickers, materiales, cortes, laminados y técnicas de diseño.',
};

const DUMMY_CATEGORIES = [
    {
        title: 'Materiales y Acabados',
        description: 'Conoce la diferencia entre vinilo blanco, transparente, holográfico, mate y brillante.',
        icon: '✨',
        link: '/aprende/categoria/materiales',
    },
    {
        title: 'Tipos de Corte',
        description: 'Aprende qué es el corte completo (Die Cut), medio corte (Kiss Cut) y los pliegos (hojas).',
        icon: '✂️',
        link: '/aprende/categoria/cortes',
    },
    {
        title: 'Guías de Diseño',
        description: 'Aprende a preparar tus archivos, sangrados, CMYK y más para impresión de alta calidad.',
        icon: '🎨',
        link: '/aprende/categoria/diseno',
    },
];

export default async function AprendeIndex() {
    const posts = await getAllPostsMeta();

    return (
        <div className="min-h-screen bg-brand-black text-white pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black font-space tracking-tighter uppercase italic mb-4">
                        Wiki <span className="text-brand-yellow">Pigmento</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                        La enciclopedia definitiva sobre stickers, calcomanías, vinilos y diseño para impresión. Aprende todo lo que necesitas para que tu marca destaque.
                    </p>
                </div>

                {/* Categorías Principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {DUMMY_CATEGORIES.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={cat.link}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-yellow/50 transition-all duration-300 group flex flex-col items-start"
                        >
                            <span className="text-4xl mb-4">{cat.icon}</span>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-yellow transition-colors">{cat.title}</h3>
                            <p className="text-white/60 mb-6 flex-grow">{cat.description}</p>
                            <span className="text-brand-yellow font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                                Explorar <span>→</span>
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Muestra de Artículos Recientes */}
                <div>
                    <h2 className="text-3xl font-bold mb-8">Artículos Recientes</h2>
                    <div className="space-y-4">
                        {posts.length === 0 ? (
                            <p className="text-white/50 italic">No hay artículos publicados aún. Pronto subiremos la enciclopedia magna.</p>
                        ) : (
                            posts.map((post) => (
                                <div key={post.slug} className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-xl font-bold hover:text-brand-yellow cursor-pointer transition-colors">
                                            <Link href={`/aprende/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h4>
                                        <p className="text-white/50 text-sm mt-2">
                                            {post.description}
                                        </p>
                                        <div className="flex gap-2 text-xs mt-3 uppercase tracking-wider font-bold">
                                            <span className="bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 px-2 py-0.5 rounded-full">{post.category}</span>
                                            <span className="text-white/40">{new Date(post.date).toLocaleDateString('es-CO')}</span>
                                        </div>
                                    </div>
                                    <Link href={`/aprende/${post.slug}`} className="px-5 py-2 whitespace-nowrap bg-white/10 hover:bg-white/20 rounded-full font-bold text-sm transition-colors w-fit">
                                        Leer artículo
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
