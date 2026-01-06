import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User as UserIcon } from "lucide-react";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) redirect("/api/auth/signin");

    return (
        <div className="min-h-screen bg-[#0f0033] text-white pt-24 px-6">
            <div className="max-w-xl mx-auto text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-purple-500/30">
                    {session.user.image && <img src={session.user.image} alt={session.user.name || ''} className="w-full h-full object-cover" />}
                </div>
                <h1 className="text-3xl font-bold mb-2">{session.user.name}</h1>
                <p className="text-zinc-400 font-mono mb-8">{session.user.email}</p>

                <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-8 text-left">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-purple-400" />
                        Datos de la Cuenta
                    </h3>
                    <div className="space-y-4 text-sm text-zinc-300">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-zinc-500">ID Usuario</span>
                            <span className="font-mono">{session.user.id || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-zinc-500">Email</span>
                            <span>{session.user.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
