import { User } from "@prisma/client";
import { LeadsManager } from "@/components/dashboard/LeadsManager";
import { UserManager } from "@/components/dashboard/UserManager";
import { ClusterStatus } from "@/components/dashboard/ClusterStatus";
import { GithubHistory } from "@/components/dashboard/GithubHistory";
import { NotificationList } from "@/components/notifications/NotificationList";
import { Lock, Server, Workflow } from "lucide-react";
import Link from "next/link";



interface AdminDashboardProps {
    user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
    return (
        <div className="min-h-screen text-white font-sans selection:bg-purple-500/30">
            {/* Navbar */}
            <nav className="border-b border-purple-900/40 bg-[#0f0033]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-900/50 border border-purple-500/50 rounded-lg flex items-center justify-center">
                            <Lock className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="font-bold tracking-tight text-lg text-purple-300">Admin Console</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <NotificationList />
                        <div className="text-sm text-purple-400/60 font-mono">
                            {user.email}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2 text-white">
                        Hola, Administrador.
                    </h1>
                    <p className="text-zinc-400">
                        Visión global de operaciones y ventas.
                    </p>
                </header>

                <div className="space-y-12">
                    {/* LEADS SECTION */}
                    <section>
                        <LeadsManager />
                    </section>

                    {/* USERS SECTION */}
                    <section>
                        <UserManager />
                    </section>

                    {/* THREE COLUMN GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* GITHUB HISTORY - Span 2 columns */}
                        <div className="lg:col-span-2">
                            <GithubHistory />
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="space-y-8">
                            {/* WORKFLOWS / TOOLS */}
                            <section className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Workflow className="w-5 h-5 text-blue-400" />
                                    <h2 className="text-xl font-semibold">Herramientas</h2>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 bg-zinc-950 border border-white/5 rounded-xl hover:border-blue-500/30 transition-colors cursor-pointer group">
                                        <div className="font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">Crear Demo</div>
                                        <div className="text-sm text-zinc-500">Generador de prototipos para clientes.</div>
                                    </div>
                                    <Link href="/news" className="p-4 bg-zinc-950 border border-white/5 rounded-xl hover:border-pink-500/30 transition-colors cursor-pointer group block text-left">
                                        <div className="font-semibold text-pink-400 group-hover:text-pink-300 transition-colors">Ver Pu News</div>
                                        <div className="text-sm text-zinc-500">Ver historial público de noticias.</div>
                                    </Link>
                                </div>

                            </section>

                            {/* SERVER STATUS */}
                            <section className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Server className="w-5 h-5 text-green-400" />
                                    <h2 className="text-xl font-semibold">Infraestructura</h2>
                                </div>
                                <ClusterStatus />
                            </section>

                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
