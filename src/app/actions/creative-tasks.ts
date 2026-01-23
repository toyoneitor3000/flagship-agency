"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCreativeTask(formData: {
    title: string;
    description: string;
    priority: string;
    type: string;
}) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) throw new Error("User not found");

    const task = await prisma.creativeTask.create({
        data: {
            userId: user.id,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            type: formData.type,
            status: "PENDING"
        }
    });

    revalidatePath("/dashboard");
    return task;
}

export async function updateCreativeTaskStatus(taskId: string, status: string) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    // En un entorno real, verificaríamos si el usuario es admin
    // Por ahora, asumimos que el admin llama a esto

    const task = await prisma.creativeTask.update({
        where: { id: taskId },
        data: { status }
    });

    revalidatePath("/dashboard");
    return task;
}

export async function getMyCreativeTasks() {
    const session = await auth();
    if (!session?.user?.email) return [];

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) return [];

    return await prisma.creativeTask.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
    });
}
