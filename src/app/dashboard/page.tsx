import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const session = await auth();
    console.log("___ DASHBOARD DEBUG ___");
    console.log("Session Email:", session?.user?.email);
    console.log("Session User ID:", session?.user?.id);
    console.log("_______________________");

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

    // Role check - safe cast until Prisma Client is regenerated
    const userRole = (user as any).role || 'user';
    const isAdmin = userRole === 'admin';

    // Temporary override for dev if role field doesn't exist in DB yet
    // const isAdmin = user.email === 'your-admin-email@example.com'; 

    if (isAdmin) {
        return <AdminDashboard user={user} />;
    }

    return <ClientDashboard user={user} />;
}
