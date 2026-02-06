import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        // Solo administradores pueden cambiar el estado
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const body = await req.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json({ error: 'Estado requerido' }, { status: 400 });
        }

        const order = await prisma.order.update({
            where: { id: params.id },
            data: { status }
        });

        return NextResponse.json({ success: true, order });

    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
