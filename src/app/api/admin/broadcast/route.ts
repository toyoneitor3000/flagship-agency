
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();

        // 1. Validar Admin
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true }
        });

        if (currentUser?.role !== 'admin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { message, link } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // 2. Obtener todos los usuarios
        const users = await prisma.user.findMany({
            select: { id: true }
        });

        // 3. Crear notificación masiva
        if (users.length > 0) {
            await prisma.notification.createMany({
                data: users.map(user => ({
                    userId: user.id,
                    title: 'Actualización de Sistema',
                    message: message,
                    type: 'SYSTEM_UPDATE',
                    link: link || null,
                    read: false,
                }))
            });
        }

        return NextResponse.json({
            success: true,
            count: users.length
        });

    } catch (error) {
        console.error("Broadcast error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
