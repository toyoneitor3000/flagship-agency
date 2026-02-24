import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminFilesClient from "./AdminFilesClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Archivos Subidos | Admin | Pigmento Stickers",
    description: "Panel de administración para ver archivos subidos por los usuarios",
};

export default async function AdminFilesPage() {
    const session = await auth();

    // Protect route: Ensure user is authenticated and is an ADMIN
    if (!session?.user?.email || session.user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-brand-gray pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Link
                                href="/dashboard"
                                className="flexItems-center justify-center bg-white p-2 text-gray-500 hover:text-brand-black hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 shadow-sm"
                                title="Volver al Panel"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-3xl font-bold text-brand-black tracking-tight">
                                Archivos Subidos
                            </h1>
                        </div>
                        <p className="text-gray-600 sm:ml-12">
                            Visualiza y descarga las referencias o diseños subidos por los clientes.
                        </p>
                    </div>
                </div>

                <AdminFilesClient />
            </div>
        </div>
    );
}
