import { prisma } from "@/lib/prisma";
import { Calendar, Tag, ChevronRight, Terminal, Zap, Info } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const changelogModel = (prisma as any).changelog || (prisma as any).Changelog;
    const changelogs = changelogModel ? await changelogModel.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
    }) : [];


    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30">
            {/* Global Background */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[#020202]" />
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[url('/grid.svg')] bg-[size:64px_64px]" />

            <main className="relative z-10 max-w-5xl mx-auto px-6 py-40">
                <header className="mb-32 text-center relative" data-section-theme="dark">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-purple-600/10 blur-[120px] -z-10 rounded-full" />
                    <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent tracking-tighter leading-[0.85]">
                        Pu News
                    </h1>
                    <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                        Explora las últimas mejoras y evoluciones técnicas del ecosistema Purrpurr.
                    </p>
                </header>

                <div className="space-y-24">
                    {/* ARTÍCULO EDITORIAL PRINCIPAL (FEATURED ESSAY) */}
                    <article className="relative group mb-20">
                        <div className="absolute -top-6 left-6 z-20 flex items-center gap-2">
                            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.25em] shadow-xl">
                                Reportaje Especial • Ensayo de Portada
                            </span>
                        </div>

                        <div className="relative z-10 p-8 sm:p-14 rounded-[2.5rem] bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-amber-500/20 shadow-2xl shadow-amber-500/5 hover:border-amber-500/40 transition-all duration-500 backdrop-blur-xl">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono text-zinc-500">
                                <div className="flex items-center gap-3">
                                    <span className="text-zinc-300 font-bold">Por Camilo Toloza</span>
                                    <span>•</span>
                                    <span>Septiembre 2026</span>
                                    <span>•</span>
                                    <span className="text-amber-400">8 min de lectura</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-zinc-600 bg-white/5 px-3 py-1 rounded-full">
                                    The Purrpurr Dispatch
                                </span>
                            </div>

                            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white mb-6 leading-tight tracking-tight group-hover:text-amber-200 transition-colors">
                                El Mito de los 30 Segundos y el Verdadero &ldquo;Nivel IA&rdquo;
                            </h2>

                            <p className="font-serif italic text-zinc-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl">
                                Por qué las empresas que pretenden dominar su mercado no se construyen con un prompt descartable de 30 segundos, sino con un sistema operativo digital con arquitectura transaccional e ingeniería propia.
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-4 text-xs text-zinc-400 font-sans">
                                    <span className="flex items-center gap-1 text-emerald-400">
                                        <Zap className="w-3.5 h-3.5" /> Next.js & Cloud
                                    </span>
                                    <span>•</span>
                                    <span>Wompi & DIAN</span>
                                    <span>•</span>
                                    <span>Economía de Plataformas</span>
                                </div>

                                <Link 
                                    href="/news/mas-alla-del-nivel-ia" 
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all hover:scale-105 shadow-lg cursor-pointer"
                                >
                                    <span>Leer Ensayo Completo</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </article>
                    {changelogs.length === 0 ? (
                        <div className="text-center py-32 border border-white/5 rounded-[3rem] bg-zinc-900/40 backdrop-blur-xl border-dashed">
                            <Info className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                            <p className="text-zinc-500 text-xl font-light">No hay actualizaciones publicadas en este momento.</p>
                        </div>
                    ) : (
                        changelogs.map((item: any, index: number) => (
                            <article key={item.id} className="relative group">
                                {index === 0 && (
                                    <div className="absolute -top-12 left-0 flex items-center gap-2">
                                        <div className="flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] shadow-2xl">
                                            <Zap className="w-3.5 h-3.5 fill-current" />
                                            Última Evolución
                                        </div>
                                    </div>
                                )}

                                <div className={`relative z-10 p-10 sm:p-16 rounded-[3rem] border transition-all duration-700 backdrop-blur-md
                                    ${index === 0
                                        ? 'bg-zinc-900/60 border-purple-500/20 shadow-2xl shadow-purple-500/5'
                                        : 'bg-zinc-900/30 border-white/5 hover:border-white/10'
                                    }
                                `}>
                                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-12">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/5 rounded-2xl text-zinc-500 text-[11px] font-mono tracking-widest uppercase">
                                                <Calendar className="w-4 h-4" />
                                                {item.publishedAt?.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-4 py-2 rounded-2xl bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] border border-purple-500/20">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>

                                        {item.githubCommitHash && (
                                            <div className="text-[10px] text-zinc-600 font-mono bg-white/5 px-4 py-2 rounded-2xl border border-white/5 uppercase tracking-tighter">
                                                DNA_BLOCK: <span className="text-zinc-400 font-bold">{item.githubCommitHash.substring(0, 7)}</span>
                                            </div>
                                        )}
                                    </header>

                                    <h2 className={`text-4xl sm:text-6xl font-black mb-10 leading-[0.9] tracking-tighter
                                        ${index === 0 ? 'text-white' : 'text-zinc-300 group-hover:text-white transition-colors'}
                                    `}>
                                        {item.title}
                                    </h2>

                                    <div className="text-zinc-400 text-xl leading-relaxed mb-12 whitespace-pre-wrap font-light border-l-2 border-white/5 pl-8">
                                        {item.description}
                                    </div>

                                    {item.technicalDetails && (
                                        <div className="bg-black/60 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 overflow-hidden relative shadow-inner">
                                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                                <Terminal className="w-40 h-40 text-white" />
                                            </div>
                                            <div className="flex items-center gap-3 mb-6 text-zinc-600">
                                                <Terminal className="w-5 h-5 text-purple-500/50" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Technical Specification</span>
                                            </div>
                                            <pre className="text-xs text-zinc-500 font-mono overflow-x-auto leading-relaxed scrollbar-hide">
                                                {item.technicalDetails}
                                            </pre>
                                        </div>
                                    )}

                                    <div className="pt-10 border-t border-white/5 flex items-center justify-between mt-12">
                                        <Link href={`#${item.id}`} className="flex items-center gap-3 text-purple-500 font-black text-[10px] uppercase tracking-[0.3em] hover:text-purple-400 transition-all hover:gap-5">
                                            Detalles de implementación <ChevronRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
