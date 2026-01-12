import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Terminal } from "lucide-react";

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user) redirect("/api/auth/signin");

    return (
        <div className="min-h-screen bg-[#0f0033] text-white pt-4 px-6 md:px-12 mb-20">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-800/50 rounded-xl border border-white/5 shadow-lg shadow-purple-500/10">
                            <Terminal className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Configuración</h1>
                            <p className="text-zinc-400">Gestiona tu perfil y preferencias del sistema.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar / Navigation (Optional or just Info) */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-zinc-800 mb-4 overflow-hidden border-4 border-indigo-500/20">
                                    {session.user.image ? (
                                        <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-500">
                                            <span className="text-2xl font-bold">{session.user.name?.[0]?.toUpperCase()}</span>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-white">{session.user.name}</h2>
                                <p className="text-sm text-zinc-400 mb-4">{session.user.email}</p>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    Cuenta Activa
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Profile Details */}
                        <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                                Información Personal
                            </h3>
                            <div className="grid gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1.5">Nombre Completo</label>
                                        <div className="w-full bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-zinc-300">
                                            {session.user.name}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1.5">Correo Electrónico</label>
                                        <div className="w-full bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-zinc-300 flex items-center justify-between">
                                            <span>{session.user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preferences (Mock) */}
                        <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                                Preferencias
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-zinc-950/30 rounded-xl border border-white/5">
                                    <div>
                                        <div className="font-medium text-white mb-0.5">Notificaciones por correo</div>
                                        <div className="text-sm text-zinc-400">Recibe actualizaciones sobre tus proyectos.</div>
                                    </div>
                                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-zinc-950/30 rounded-xl border border-white/5">
                                    <div>
                                        <div className="font-medium text-white mb-0.5">Modo Oscuro</div>
                                        <div className="text-sm text-zinc-400">Ajusta la apariencia del sistema.</div>
                                    </div>
                                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
                                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-red-500/5 backdrop-blur-sm border border-red-500/10 rounded-2xl p-6">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-red-200">
                                <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                                Zona de Peligro
                            </h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white mb-0.5">Cerrar Sesión</div>
                                    <div className="text-sm text-zinc-400">Finaliza tu sesión actual en este dispositivo.</div>
                                </div>
                                <form action={async () => {
                                    "use server"
                                    await import("@/auth").then(mod => mod.signOut())
                                }}>
                                    <button type="submit" className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm font-medium transition-colors">
                                        Cerrar Sesión
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
