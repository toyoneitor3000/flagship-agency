import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { DashboardClient } from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  let session;
  try {
    session = await auth();
  } catch (e) {
    console.error("[Dashboard] auth() failed:", e);
    redirect("/?login=true");
  }

  if (!session?.user?.email) {
    redirect("/?login=true");
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

  return <DashboardClient session={session} orders={orders} isAdmin={isAdmin} />;
}