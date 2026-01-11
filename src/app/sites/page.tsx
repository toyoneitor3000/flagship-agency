import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Globe, Rocket, ArrowRight, Plus } from 'lucide-react';

// Force dynamic rendering to avoid prerender errors when DB tables don't exist yet
export const dynamic = 'force-dynamic';

export default async function SitesIndexPage() {

    // Fetch some recent public sites (optional, could do this later)
    // For now just a landing page
    const recentProjects = await prisma.project.findMany({
        where: { status: 'PUBLISHED' },
        take: 6,
        orderBy: { updatedAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-[#0f0033] text-white pt-24 px-6">
            <div className="max-w-4xl mx-auto text-center">

                {/* Header */}
                <div className="mb-12">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                        <Globe className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
                        Purrpurr Sites
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                        Explora los sitios desplegados en nuestra plataforma o crea el tuyo propio en minutos.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Link
                        href="/studio"
                        className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        <Plus className="w-4 h-4" />
                        Crear Mi Sitio
                    </Link>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 bg-zinc-900 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors"
                    >
                        <Rocket className="w-4 h-4" />
                        Ir al Dashboard
                    </Link>
                </div>

                {/* Recent Sites Grid */}
                {recentProjects.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-6 text-left flex items-center gap-2">
                            <span className="text-purple-400">▸</span>
                            Sitios Recientes
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/sites/${project.slug}`}
                                    className="group bg-zinc-900/50 border border-white/5 rounded-xl p-4 text-left hover:border-purple-500/50 transition-all"
                                >
                                    <div className="h-24 bg-zinc-950 rounded-lg mb-3 flex items-center justify-center text-zinc-700 font-mono text-xs">
                                        [ PREVIEW ]
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-zinc-200 group-hover:text-white">{project.name}</span>
                                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <div className="text-xs text-zinc-600 mt-1 font-mono">/sites/{project.slug}</div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {recentProjects.length === 0 && (
                    <div className="bg-zinc-900/30 border border-dashed border-white/10 rounded-2xl p-12">
                        <p className="text-zinc-500 mb-4">Aún no hay sitios publicados en la plataforma.</p>
                        <p className="text-sm text-zinc-600">Sé el primero en crear y publicar tu sitio.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
