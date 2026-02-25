"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Único correo autorizado para ser administrador
const AUTHORIZED_ADMIN_EMAIL = "camilotoloza1136@gmail.com";

export async function elevateToAdmin(formData: FormData) {
    const password = formData.get("password") as string;
    const MASTER_PASSWORD = process.env.ADMIN_SECRET_PASSWORD || "PigmentoAdmin2024";

    if (!password || password !== MASTER_PASSWORD) {
        return { error: "Contraseña incorrecta." };
    }

    const session = await auth();

    if (!session?.user?.id) {
        return { error: "Debes iniciar sesión con tu cuenta normal primero." };
    }

    // Solo el correo autorizado puede ser admin
    if (session.user.email !== AUTHORIZED_ADMIN_EMAIL) {
        return { error: "No autorizado. Esta cuenta no puede ser administrador." };
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

