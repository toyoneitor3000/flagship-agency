import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Terminal } from "lucide-react";

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user) redirect("/api/auth/signin");

    return (
        <div className="min-h-screen bg-[#0f0033] text-white pt-24 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 border-b border-white/10 pb-6 flex items-center gap-4">
                    <div className="p-3 bg-zinc-800/50 rounded-xl">
                        <Terminal className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Configuración</h1>
                        <p className="text-zinc-400">Ajustes del sistema y preferencias.</p>
                    </div>
                </header>
                <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 mb-8">
                    <p className="text-zinc-500 font-mono">System Configuration Module... [WIP]</p>
                </div>
            </div>
        </div>
    );
}
