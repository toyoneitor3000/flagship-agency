import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    CreditCard,
    Globe,
    Settings,
    Terminal,
    Users,
    ArrowRight
} from "lucide-react";
import { ClusterStatus } from "@/components/dashboard/ClusterStatus";
import { ProjectManager } from "@/components/dashboard/ProjectManager";
import { AnalyticsTracker } from "@/hooks/useAnalytics";
import { LeadsNotificationBadge } from "@/components/dashboard/LeadsNotificationBadge";


export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            projects: true,
            domains: true,
            subscription: true,
        }
    });

    if (!user) {
        return <div className="min-h-screen bg-[#0f0033] text-white flex items-center justify-center">User not found in database.</div>;
    }

    // Real metrics are now fetched client-side by ClusterStatus component

    return (
        <div className="min-h-screen bg-[#0f0033] text-white font-sans selection:bg-purple-500/30">
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
                        <LeadsNotificationBadge />
                        <span className="text-sm text-zinc-400 hidden sm:block">{user.email}</span>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                            {user.image && <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />}
                        </div>
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
                            <Link href="/dashboard/leads" className="flex items-center justify-between gap-3 text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition-colors p-3 rounded-lg border border-purple-500/20">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5" />
                                    <span className="font-medium">Gestión de Leads</span>
                                </div>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/settings" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors p-2">
                                <Settings className="w-5 h-5" />
                                <span>Configuraciones de Cuenta</span>
                            </Link>
                            {/* 
                            We can use a server-component friendly logout form. 
                            Since we are in a server component (async page), we can't use onClick directly on a button unless it's a client component.
                            Or we can use a <form action={async () => { 'use server'; await signOut(); }}>
                        */}
                        </section>
                    </div>
                </div>
            </main>

            {/* Analytics Tracking */}
            <AnalyticsTracker />
        </div>
    );
}
