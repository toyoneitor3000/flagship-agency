import Link from "next/link";
import {
    CreditCard,
    Globe,
    Settings,
    Terminal,
    Users,
    ArrowRight,
    BookOpen
} from "lucide-react";
import { NotificationList } from "@/components/notifications/NotificationList";
import { ClusterStatus } from "@/components/dashboard/ClusterStatus";
import { ProjectManager } from "@/components/dashboard/ProjectManager";
import { ServiceManager } from "@/components/dashboard/ServiceManager";
import { User, Project, Domain, Subscription, CreativeTask } from "@prisma/client";

interface ClientDashboardProps {
    user: User & {
        projects: Project[];
        domains: Domain[];
        subscription: Subscription | null;
        creativeTasks: CreativeTask[];
    };
}

export function ClientDashboard({ user }: ClientDashboardProps) {
    return (
        <div className="min-h-screen text-white font-sans selection:bg-purple-500/30">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-[#0f0033]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <Terminal className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold tracking-tight text-lg">Purrpurr Console</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <NotificationList />
                        <Link
                            href="/manual"
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span className="hidden sm:inline">Manual de Usuario</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                        Bienvenido al Puente de Mando, {user.name?.split(' ')[0] || 'Viajero'}.
                    </h1>
                    <p className="text-zinc-400 max-w-2xl">
                        Administra tu flota digital, recursos de servidor y expansiones desde un solo lugar.
                    </p>
                </header>

                {/* ONBOARDING WELCOME BANNER (Only for new users with 0 projects) */}
                {user.projects.length === 0 && (
                    <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-indigo-500/30 transition-colors" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    <span className="text-3xl">👋</span> ¡Bienvenido a bordo!
                                </h2>
                                <p className="text-zinc-300 max-w-xl text-lg">
                                    Tu infraestructura está lista. Antes de comenzar a crear proyectos, te recomendamos leer nuestro
                                    <strong> Manual de Abordo</strong> para entender cómo operamos.
                                </p>
                            </div>

                            <Link
                                href="/manual"
                                className="shrink-0 bg-white text-indigo-950 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-indigo-900/20 flex items-center gap-2"
                            >
                                <BookOpen className="w-5 h-5" />
                                Leer Manual
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* COLUMN 1: PROJECTS & DOMAINS (Takes 2 cols) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* PROJECTS SECTION - Con gestión completa */}
                        <ProjectManager initialProjects={user.projects.map(p => ({
                            ...p,
                            createdAt: p.createdAt.toISOString(),
                            updatedAt: p.updatedAt.toISOString()
                        }))} />

                        {/* SERVICE MANAGEMENT SECTION */}
                        <ServiceManager initialTasks={user.creativeTasks.map(t => ({
                            ...t,
                            createdAt: t.createdAt.toISOString(),
                            updatedAt: t.updatedAt.toISOString()
                        }))} />


                        {/* DOMAINS SECTION */}
                        <section className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 relative">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-blue-400" />
                                    Dominios
                                </h2>
                                <button className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                                    Validar Nuevo
                                </button>
                            </div>

                            {user.domains.length === 0 ? (
                                <div className="flex items-center gap-4 text-zinc-500 text-sm bg-zinc-950/30 p-4 rounded-xl border border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                                        <Globe className="w-5 h-5 text-zinc-700" />
                                    </div>
                                    <div>
                                        <p>No hay dominios vinculados.</p>
                                        <p className="text-xs opacity-60">Conecta tu propio dominio para profesionalizar tu marca.</p>
                                    </div>
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {user.domains.map(domain => (
                                        <li key={domain.id} className="flex items-center justify-between bg-zinc-950 p-3 rounded-lg border border-white/5">
                                            <span className="font-mono text-zinc-300">{domain.name}</span>
                                            <span className="text-xs text-yellow-500">{domain.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </div>

                    {/* COLUMN 2: SERVER & ACCOUNT (Takes 1 col) */}
                    <div className="space-y-8">

                        {/* SERVER STATUS - REAL METRICS */}
                        <section className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
                            <ClusterStatus />
                        </section>

                        {/* SUBSCRIPTION */}
                        <section className="bg-gradient-to-b from-zinc-900/40 to-black border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-pink-400" />
                                Suscripción
                            </h2>

                            <div className="bg-zinc-950 p-4 rounded-xl border border-pink-500/20 mb-4">
                                <div className="text-xs text-zinc-500 mb-1">Plan Actual</div>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                                        {user.subscription?.plan || 'Free Tier'}
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-zinc-900 rounded border border-white/10">Active</span>
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-sm font-medium">
                                Gestionar Facturación
                            </button>
                        </section>

                        {/* CONFIG */}
                        <section className="p-2 space-y-1">
                            <Link href="/settings" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors p-2">
                                <Settings className="w-5 h-5" />
                                <span>Configuraciones de Cuenta</span>
                            </Link>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
