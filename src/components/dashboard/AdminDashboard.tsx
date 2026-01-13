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
        <div className="min-h-screen text-white font-sans selection:bg-purple-500/30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1a0b2e] via-[#0f0033] to-black">
            {/* Navbar */}
            <nav className="border-b border-white/5 bg-[#0f0033]/50 backdrop-blur-xl sticky top-0 z-50 supports-[backdrop-filter]:bg-[#0f0033]/20">
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
                    <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 tracking-tight">
                        Hola, Administrador.
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl font-light">
                        Visión global de operaciones y ventas del sistema.
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
                            <section className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Workflow className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Herramientas</h2>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-4 bg-black/20 border border-white/5 rounded-2xl hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 cursor-pointer group">
                                        <div className="font-semibold text-blue-300 group-hover:text-blue-200 transition-colors mb-1">Crear Demo</div>
                                        <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors">Generador de prototipos para clientes.</div>
                                    </div>
                                    <Link href="/news" className="p-4 bg-black/20 border border-white/5 rounded-2xl hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300 cursor-pointer group block text-left">
                                        <div className="font-semibold text-pink-300 group-hover:text-pink-200 transition-colors mb-1">Ver Pu News</div>
                                        <div className="text-sm text-white/40 group-hover:text-white/60 transition-colors">Ver historial público de noticias.</div>
                                    </Link>
                                </div>

                            </section>

                            {/* SERVER STATUS */}
                            <section className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-500/10 rounded-lg">
                                        <Server className="w-5 h-5 text-green-400" />
                                    </div>
                                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Infraestructura</h2>
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
