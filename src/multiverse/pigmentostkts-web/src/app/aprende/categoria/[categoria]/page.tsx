import React from 'react';
import { getAllPostsMeta } from '@/lib/mdx';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

const CATEGORY_MAP: Record<string, { title: string; description: string }> = {
    materiales: {
        title: 'Materiales y Acabados',
        description: 'Explora nuestros vinilos y laminados. Desde el impacto del holográfico hasta la elegancia del mate.',
    },
    cortes: {
        title: 'Tipos de Corte',
        description: 'Aprende las diferencias entre Kiss Cut, Die Cut y cómo elegir la presentación perfecta para tus stickers.',
    },
    diseno: {
        title: 'Guías de Diseño',
        description: 'Optimiza tus archivos de diseño. Secretos para una impresión perfecta, colores CMYK y márgenes.',
    },
};

// Generar Metadatos dinámicos
export function generateMetadata({ params }: { params: { categoria: string } }): Metadata {
    const catInfo = CATEGORY_MAP[params.categoria];
    if (!catInfo) return { title: 'Categoría no encontrada | Pigmento Stickers' };

    return {
        title: `${catInfo.title} | Wiki Pigmento`,
        description: catInfo.description,
    };
}

export default async function CategoryPage({ params }: { params: { categoria: string } }) {
    const catInfo = CATEGORY_MAP[params.categoria];

    if (!catInfo) {
        return notFound();
    }

    // Traemos todos los posts y filtramos por nuestro mapa de categorías
    // Esto dependerá de cómo tengas nombrada la 'category' en el frontmatter del MDX.
    // Por ejemplo, para "cortes" esperamos que el frontmatter diga category: "Tipos de Corte"
    const allPosts = await getAllPostsMeta();
    const categoryPosts = allPosts.filter(post =>
        post.category.toLowerCase().includes(catInfo.title.toLowerCase()) ||
        catInfo.title.toLowerCase().includes(post.category.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-brand-black text-white pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Back Link */}
                <Link
                    href="/aprende"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-brand-yellow transition-colors mb-8 uppercase font-bold text-sm tracking-wider"
                >
                    <ArrowLeft size={16} /> Volver a la Wiki
                </Link>

                {/* Header de Categoría */}
                <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl mb-12">
                    <span className="bg-brand-yellow text-brand-black px-4 py-1 rounded-full font-bold uppercase tracking-widest text-xs mb-6 inline-block">
                        Explorando Categoría
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black font-space tracking-tighter uppercase italic mb-4">
                        {catInfo.title}
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl">
                        {catInfo.description}
                    </p>
                </div>

                {/* Lista de Artículos */}
                <div className="space-y-4">
                    {categoryPosts.length === 0 ? (
                        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-6xl mb-4 block">🚧</span>
                            <h3 className="text-2xl font-bold mb-2">No hay artículos aquí (todavía)</h3>
                            <p className="text-white/50">Estamos redactando el mejor contenido para esta categoría. ¡Vuelve pronto!</p>
                        </div>
                    ) : (
                        categoryPosts.map((post) => (
                            <div key={post.slug} className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white/10 transition-colors">
                                <div>
                                    <h4 className="text-2xl font-bold group-hover:text-brand-yellow transition-colors">
                                        <Link href={`/aprende/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h4>
                                    <p className="text-white/60 mt-2 text-lg">
                                        {post.description}
                                    </p>
                                    <div className="mt-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                                        Publicado el {new Date(post.date).toLocaleDateString('es-CO')} • Por {post.author}
                                    </div>
                                </div>
                                <Link href={`/aprende/${post.slug}`} className="px-6 py-3 whitespace-nowrap bg-brand-yellow text-brand-black rounded-full font-bold text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all text-center">
                                    Leer Artículo
                                </Link>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
