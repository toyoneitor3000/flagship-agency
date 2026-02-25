import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, role } = session.user as { id: string, role?: string };

        // Si es ADMIN, obtenemos también las notificaciones con userId = null
        const whereClause = role === "ADMIN"
            ? { OR: [{ userId: id }, { userId: null }] }
            : { userId: id };

        const notifications = await prisma.notification.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            take: 50, // Limitamos a las últimas 50
        });

        return NextResponse.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: userId, role } = session.user as { id: string, role?: string };
        const { action, notificationId } = await req.json();

        if (action === "mark_all_read") {
            const whereClause = role === "ADMIN"
                ? { OR: [{ userId }, { userId: null }], isRead: false }
                : { userId, isRead: false };

            await prisma.notification.updateMany({
                where: whereClause,
                data: { isRead: true },
            });

            return NextResponse.json({ success: true });
        }

        if (action === "mark_read" && notificationId) {
            // Verificar que la notificacion le pertenece al usuario o es admin
            const notification = await prisma.notification.findUnique({
                where: { id: notificationId }
            });

            if (!notification) {
                return NextResponse.json({ error: "Not found" }, { status: 404 });
            }

            if (notification.userId !== userId && role !== "ADMIN") {
                return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
            }

            await prisma.notification.update({
                where: { id: notificationId },
                data: { isRead: true },
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json(
            { error: "Failed to update notifications" },
            { status: 500 }
        );
    }
}
