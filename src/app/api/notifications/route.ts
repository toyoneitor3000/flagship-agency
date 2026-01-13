
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // SYSTEM NOTIFICATION CHECK: Welcome Manual
        const hasWelcomeNotification = notifications.some(n => n.type === 'SYSTEM_WELCOME');

        if (!hasWelcomeNotification) {
            const welcomeNotification = await prisma.notification.create({
                data: {
                    userId: session.user.id,
                    title: 'Bienvenido a Purrpurr',
                    message: 'Comienza tu viaje explorando el Manual de Abordo. Aquí encontrarás todo lo que necesitas saber.',
                    type: 'SYSTEM_WELCOME',
                    link: '/manual',
                    read: false,
                }
            });
            // Add to the list to return immediately
            notifications.unshift(welcomeNotification);
        }

        return NextResponse.json({ success: true, notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { notificationIds } = await req.json();

        if (!notificationIds || !Array.isArray(notificationIds)) {
            return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
        }

        await prisma.notification.updateMany({
            where: {
                id: { in: notificationIds },
                userId: session.user.id,
            },
            data: {
                read: true,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await prisma.notification.deleteMany({
            where: {
                userId: session.user.id,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting notifications:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
