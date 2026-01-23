import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    try {
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
                creativeTasks: {
                    orderBy: { createdAt: 'desc' }
                },
            }
        });

        if (!user) {
            return (
                <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                    <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
                    <p className="text-zinc-500 max-w-md">Tu cuenta no está registrada en el ecosistema. Por favor, solicita acceso.</p>
                </div>
            );
        }

        // Role check
        const userRole = (user as any).role || 'user';
        const isAdmin = userRole === 'admin' || user.email === 'camilotoloza1136@gmail.com';

        if (isAdmin) {
            const allTasks = await prisma.creativeTask.findMany({
                include: { user: true },
                orderBy: { createdAt: 'desc' }
            });
            return <AdminDashboard user={user} allTasks={allTasks} />;
        }

        return <ClientDashboard user={user} />;
    } catch (error: any) {
        // If it's a redirect error, rethrow it so Next.js can handle it
        if (error.digest?.includes('NEXT_REDIRECT')) {
            throw error;
        }

        console.error("Dashboard Error:", error);
        return (
            <div className="min-h-screen bg-[#0a001a] text-red-400 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                    <span className="text-2xl">⚠️</span>
                </div>
                <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Error de Sincronización</h1>
                <p className="text-zinc-500 mb-6 text-sm max-w-sm">
                    No pudimos conectar con tu perfil de comando. Esto puede deberse a un problema de base de datos o sesión.
                </p>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-[10px] font-mono text-left max-w-2xl overflow-auto w-full">
                    {error.message || "Unknown Runtime Error"}
                </div>
            </div>
        );
    }
}
