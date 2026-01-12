import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const ADMIN_EMAILS = [
    'camilotoloza1136@gmail.com',
    'toyoneitor3000@gmail.com',
    'camilo.toloza@purrpurr.dev' // Just in case
];

export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    // @ts-ignore
    const userRole = session.user.role;

    const isAdmin = userRole === 'admin' || ADMIN_EMAILS.includes(userEmail);

    if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden", details: `User ${userEmail} with role ${userRole} is not admin` }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { title, description, technicalDetails, githubCommitHash, type, isPublished } = body;

        const models = prisma as any;
        const changelogModel = models.changelog || models.Changelog || models.changeLog;

        if (!changelogModel) {
            const available = Object.keys(prisma).filter(k => !k.startsWith('$')).join(', ');
            throw new Error(`Model 'changelog' not found in Prisma client. Available models: ${available}`);
        }


        const changelog = await changelogModel.create({
            data: {
                title,
                description: description || "Sin descripción",
                technicalDetails,
                githubCommitHash,
                type: type || "UPDATE",
                isPublished: !!isPublished,
                publishedAt: isPublished ? new Date() : null,
            },
        });


        // Also create a global notification for everyone
        try {
            const users = await prisma.user.findMany({ select: { id: true } });
            // Using a loop instead of createMany as it's more reliable across different Prisma/SQLite setups
            const notificationModel = (prisma as any).notification || (prisma as any).Notification;
            if (notificationModel) {
                for (const u of users) {
                    await notificationModel.create({
                        data: {
                            userId: u.id,
                            title: "Nueva Actualización: " + title,
                            message: description?.substring(0, 100) + "...",
                            type: "INFO",
                            link: "/news",
                        }
                    });
                }
            }

        } catch (notifError) {
            console.error("Failed to create notifications:", notifError);
        }


        return NextResponse.json(changelog);
    } catch (error) {
        console.error("Changelog creation error:", error);
        return NextResponse.json({ error: "Failed to create changelog", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function GET() {
    try {
        const changelogModel = (prisma as any).changelog || (prisma as any).Changelog;
        if (!changelogModel) return NextResponse.json([]);

        const changelogs = await changelogModel.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(changelogs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch changelogs" }, { status: 500 });
    }
}

