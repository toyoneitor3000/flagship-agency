
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const bodyText = await req.text();
        const headersList = await headers();
        const signature = headersList.get("x-hub-signature-256");
        const event = headersList.get("x-github-event");

        // Validar firma si existe el secreto configurado (Recomendado)
        const secret = process.env.GITHUB_WEBHOOK_SECRET;
        if (secret && signature) {
            const hmac = crypto.createHmac("sha256", secret);
            const digest = Buffer.from("sha256=" + hmac.update(bodyText).digest("hex"), "utf8");
            const checksum = Buffer.from(signature, "utf8");

            if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
                return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
            }
        }

        // Manejar evento de Push
        if (event === "push") {
            const payload = JSON.parse(bodyText);
            const commits = payload.commits || [];

            if (commits.length > 0) {
                // Tomamos el último commit que suele ser el más relevante o descriptivo del push
                const latestCommit = commits[commits.length - 1];
                const message = latestCommit.message;
                const url = latestCommit.url;
                const author = latestCommit.author?.name || "Purrpurr Dev";
                const timestamp = latestCommit.timestamp;

                // Evitar notificaciones de commits de merge automáticos si se desea
                if (message.includes("Merge pull request") || message.includes("Merge branch")) {
                    // Opcional: saltar merges
                }

                // Buscar SOLO administradores para aprobar la notificación
                const admins = await prisma.user.findMany({
                    where: { role: 'admin' },
                    select: { id: true }
                });

                if (admins.length > 0) {
                    await prisma.notification.createMany({
                        data: admins.map(user => ({
                            userId: user.id,
                            title: 'Nuevo Commit en GitHub',
                            message: `Commit pendiente de revisión: ${message}`,
                            type: 'ADMIN_REVIEW_UPDATE',
                            link: url, // Link to GitHub for checking details
                            read: false,
                        }))
                    });
                }

                console.log(`[Webhook] Notified ${admins.length} admins about commit: ${message.substring(0, 50)}...`);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
