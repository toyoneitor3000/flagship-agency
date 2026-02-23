import { getPostBySlug, getAllPostsMeta } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

// Para generar SEO dinámico por cada post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return { title: 'Post no encontrado | Pigmento Stickers' };
    }

    return {
        title: `${post.meta.title} | Wiki Pigmento`,
        description: post.meta.description,
        openGraph: {
            title: post.meta.title,
            description: post.meta.description,
            type: 'article',
            publishedTime: post.meta.date,
            authors: [post.meta.author],
        },
    };
}

// Genera rutas estáticas para rendimiento extremo
export async function generateStaticParams() {
    const posts = await getAllPostsMeta();
    return posts.map(post => ({
        slug: post.slug,
    }));
}

// Customizamos los componentes de la página (Listas, Header, Link)
// Para que se vean como Pigmento Stickers (Dark theme) y no simple texto
const components = {
    h1: (props: any) => <h1 className="text-3xl md:text-5xl font-black font-space italic uppercase mb-8 text-brand-yellow" {...props} />,
    h2: (props: any) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6" {...props} />,
    h3: (props: any) => <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-white/90" {...props} />,
    p: (props: any) => <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside text-base md:text-lg text-white/80 space-y-2 mb-6 ml-4" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside text-base md:text-lg text-white/80 space-y-2 mb-6 ml-4" {...props} />,
    strong: (props: any) => <strong className="font-bold text-white uppercase tracking-tight" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-brand-yellow bg-white/5 p-4 md:p-6 rounded-r-lg italic my-8 text-white/90 text-lg md:text-xl font-medium" {...props} />,
    img: (props: any) => (
        <span className="flex flex-col items-center my-10 md:my-14 mx-auto max-w-[90%] md:max-w-3xl relative">
            {/* Usamos etiqueta img nativa estilizada porque los paths md vienen dinámicos */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                className="w-full h-auto object-cover rounded-2xl border border-white/10 shadow-2xl"
                loading="lazy"
                {...props}
                alt={props.alt || 'Imagen referencial Pigmento'}
            />
            {props.alt && (
                <span className="block text-center text-sm text-white/50 mt-4 px-4 italic leading-relaxed">
                    {props.alt}
                </span>
            )}
        </span>
    ),
    a: (props: any) => {
        // Si enlaza al exterior o a nosotros mismos
        return (
            <a
                className="text-brand-yellow hover:text-white underline underline-offset-4 decoration-white/30 transition-colors"
                {...props}
            />
        );
    }
};

export default async function WikiArticlePage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    return (
        <article className="min-h-screen bg-brand-black text-white pb-16 relative">

            {/* Cinematic Edge-to-Edge Cover Image */}
            {post.meta.coverImage && (
                <div className="absolute top-0 left-0 w-full h-[50vh] md:h-[60vh] min-h-[400px] z-0 overflow-hidden">
                    <Image
                        src={post.meta.coverImage}
                        alt={`Portada para ${post.meta.title}`}
                        fill
                        className="object-cover object-center opacity-80"
                        priority
                    />
                    {/* Fades para estilo Netflix: abajo (hacia brand-black), izquierda y un tinte tenue general */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/40 to-transparent"></div>
                </div>
            )}

            {/* Content Container */}
            <div className="container mx-auto px-4 max-w-4xl relative z-10 pt-32">

                {/* Back Link */}
                <Link
                    href="/aprende"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-brand-yellow transition-colors mb-12 uppercase font-bold text-xs tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                >
                    <ArrowLeft size={16} /> Volver a la Wiki
                </Link>

                {/* Text Header */}
                <header className="mb-12 pb-8 relative z-10">
                    <div className="flex items-center gap-3 text-brand-yellow text-sm font-bold uppercase tracking-wider mb-6">
                        <span className="bg-brand-yellow/20 px-4 py-1.5 rounded-full border border-brand-yellow/30 backdrop-blur-md text-white">
                            {post.meta.category}
                        </span>
                        <span className="text-white/40">•</span>
                        <time className="text-white/80 font-mono tracking-tight">{new Date(post.meta.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-space tracking-tighter uppercase italic leading-none mb-6 drop-shadow-2xl text-shadow-lg">
                        {post.meta.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 !leading-relaxed border-l-4 border-brand-yellow pl-4 py-2 mb-4 max-w-3xl drop-shadow-xl">
                        {post.meta.description}
                    </p>
                </header>

                {/* Separator rule after header to ground the content */}
                <hr className="border-white/10 mb-12 shadow-sm" />

                {/* Content Box (Markdown Parseado) */}
                <div className="prose prose-invert max-w-none">
                    {/*
            Aquí MDXRemote hace la magia: convierte el string en componentes React
            Además, le inyectamos los `components` mapeados a estilos Tailwind (Pigmento Theme)
          */}
                    <MDXRemote source={post.content} components={components} />
                </div>

                {/* Autor / CTA Final */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 p-8 rounded-2xl">
                    <div>
                        <h4 className="text-2xl font-bold font-space uppercase italic">Escrito por {post.meta.author}</h4>
                        <p className="text-white/60 mt-2">¿Te quedó alguna duda sobre este tema técnico?</p>
                    </div>
                    <Link
                        href="/#calculator"
                        className="whitespace-nowrap bg-brand-yellow text-brand-black px-8 py-4 rounded-xl font-bold uppercase tracking-tighter hover:bg-white hover:scale-105 active:scale-95 transition-all text-lg"
                    >
                        Ir a Cotizar
                    </Link>
                </div>

            </div>
        </article>
    );
}
