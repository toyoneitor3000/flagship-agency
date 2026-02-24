"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function elevateToAdmin(formData: FormData) {
    const password = formData.get("password") as string;
    // Basic hardcoded master password for now, could be moved to .env in the future
    const MASTER_PASSWORD = process.env.ADMIN_SECRET_PASSWORD || "PigmentoAdmin2024";

    if (!password || password !== MASTER_PASSWORD) {
        return { error: "Contraseña incorrecta." };
    }

    const session = await auth();

    if (!session?.user?.id) {
        return { error: "Debes iniciar sesión con tu cuenta normal primero." };
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { role: "ADMIN" },
        });

        revalidatePath("/dashboard");
    } catch (err) {
        console.error("Error elevating to admin:", err);
        return { error: "Hubo un problema actualizando los permisos." };
    }

    // Redirect on success
    redirect("/dashboard");
}
