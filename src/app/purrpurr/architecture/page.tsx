import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ArchitectureClientPage from "./ArchitectureClientPage";
import { Lock } from "lucide-react";

export default async function ArchitecturePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/purrpurr/architecture");
    }

    // Role check based on auth.ts logic
    const userRole = (session.user as any).role;
    const userEmail = session.user.email;

    // Allow Admins only
    if (userRole !== 'admin') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white font-mono p-4 text-center selection:bg-red-900/30">
                <div className="p-4 bg-red-500/10 rounded-full mb-6 border border-red-500/20">
                    <Lock className="w-12 h-12 text-red-500" />
                </div>

                <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">ACCESO RESTRINGIDO</h1>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                    Has intentado acceder al <strong>Cuartel General de Arquitectura</strong>. Esta área está clasificada y restringida únicamente para la Dirección Ejecutiva (CEO).
                </p>

                <div className="bg-zinc-900/50 p-6 rounded-lg border border-red-900/30 text-left text-xs mb-8 w-full max-w-md backdrop-blur-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                        <span className="text-zinc-500">IDENTIDAD</span>
                        <span className="text-white font-medium">{userEmail}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                        <span className="text-zinc-500">RANGO</span>
                        <span className="text-white font-medium capitalize">{userRole || 'Operativo'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-500">ESTADO</span>
                        <span className="text-red-400 font-bold animate-pulse">DENEGADO</span>
                    </div>
                </div>

                <a
                    href="/purrpurr"
                    className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors"
                >
                    Volver al Lobby
                </a>
            </div>
        );
    }

    return <ArchitectureClientPage />;
}
