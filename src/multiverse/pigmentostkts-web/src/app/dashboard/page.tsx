import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { OrderHistory } from "@/components/dashboard/OrderHistory";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const isAdmin = session.user.role === "ADMIN";

  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : {
      user: {
        email: session.user.email,
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-brand-gray pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-black tracking-tight">
              {isAdmin ? "Panel de Administración" : "Mi Cuenta"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isAdmin ? "Gestionando todos los pedidos de la plataforma" : `Bienvenido de vuelta, ${session.user.name || "Usuario"}`}
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-brand-black hover:text-brand-yellow transition-colors"
          >
            ← Volver a la tienda
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-brand-black">Historial de Pedidos</h2>
          </div>
          <OrderHistory orders={orders} isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
}