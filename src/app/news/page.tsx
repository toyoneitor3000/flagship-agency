import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
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
        <div className="min-h-screen bg-[#0f0033] text-white selection:bg-purple-500/30">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <header className="mb-20 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/20 blur-[100px] -z-10" />
                    <h1 className="text-6xl font-black mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent tracking-tight">
                        Pu News
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto font-medium leading-relaxed">
                        Explora las últimas mejoras y evoluciones técnicas del ecosistema Purrpurr.
                    </p>
                </header>

                <div className="space-y-16">
                    {changelogs.length === 0 ? (
                        <div className="text-center py-24 border border-white/5 rounded-[2.5rem] bg-white/5 backdrop-blur-sm border-dashed">
                            <Info className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500 font-medium">No hay actualizaciones publicadas en este momento.</p>
                        </div>
                    ) : (
                        changelogs.map((item: any, index: number) => (
                            <article key={item.id} className="relative group">
                                {index === 0 && (
                                    <div className="absolute -top-12 left-0 flex items-center gap-2">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-400 uppercase tracking-[0.2em] shadow-lg shadow-green-500/5">
                                            <Zap className="w-3 h-3 fill-current" />
                                            Versión más actual
                                        </div>
                                    </div>
                                )}

                                <div className={`relative z-10 p-8 sm:p-12 rounded-[2.5rem] border transition-all duration-500
                                    ${index === 0
                                        ? 'bg-gradient-to-br from-white/10 to-transparent border-white/10 shadow-2xl shadow-purple-500/5'
                                        : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                    }
                                `}>
                                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/5 rounded-xl text-zinc-400 text-[11px] font-mono">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {item.publishedAt?.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>

                                        {item.githubCommitHash && (
                                            <div className="text-[10px] text-zinc-600 font-mono bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 uppercase tracking-tighter">
                                                Build: <span className="text-zinc-400">{item.githubCommitHash.substring(0, 7)}</span>
                                            </div>
                                        )}
                                    </header>

                                    <h2 className={`text-3xl sm:text-4xl font-black mb-8 leading-tight tracking-tight
                                        ${index === 0 ? 'text-white' : 'text-zinc-200 group-hover:text-white transition-colors'}
                                    `}>
                                        {item.title}
                                    </h2>

                                    <div className="text-zinc-400 text-lg leading-relaxed mb-10 whitespace-pre-wrap font-medium">
                                        {item.description}
                                    </div>

                                    {item.technicalDetails && (
                                        <div className="bg-black/60 border border-white/5 rounded-3xl p-6 sm:p-8 overflow-hidden relative">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Terminal className="w-24 h-24 text-white" />
                                            </div>
                                            <div className="flex items-center gap-3 mb-4 text-zinc-500">
                                                <Terminal className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Technical Specification</span>
                                            </div>
                                            <pre className="text-xs text-zinc-500 font-mono overflow-x-auto leading-relaxed scrollbar-hide">
                                                {item.technicalDetails}
                                            </pre>
                                        </div>
                                    )}

                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between mt-10">
                                        <Link href={`#${item.id}`} className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest hover:text-purple-300 transition-colors">
                                            Detalles de implementación <ChevronRight className="w-4 h-4 translate-y-[0.5px]" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
