import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { LeadsManager } from "@/components/dashboard/LeadsManager";
import { AnalyticsTracker } from "@/hooks/useAnalytics";

export default async function LeadsPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    return (
        <div className="min-h-screen bg-[#0f0033] text-white font-sans selection:bg-purple-500/30">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-[#0f0033]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <div className="h-6 w-px bg-white/10" />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold tracking-tight text-lg">Gestión de Leads</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-zinc-400 hidden sm:block">{session.user.email}</span>
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                            {session.user.image && (
                                <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                        Solicitudes de Demo
                    </h1>
                    <p className="text-zinc-400 max-w-2xl">
                        Gestiona las solicitudes que llegan desde purrpurr.app/demo. Actualiza estados, agrega notas y contacta directamente por WhatsApp.
                    </p>
                </header>

                {/* Leads Management */}
                <LeadsManager />
            </main>

            {/* Analytics Tracking */}
            <AnalyticsTracker />
        </div>
    );
}
