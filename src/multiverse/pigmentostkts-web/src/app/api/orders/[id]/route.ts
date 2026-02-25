import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!order) {
            return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        // Solo administradores pueden cambiar el estado
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const body = await req.json();
        const { status, trackingNumber, trackingUrl, adminNotes, progressPhotos } = body;
        const { id } = await params;

        // Construir datos de actualización dinámicamente
        const updateData: any = {};
        if (status !== undefined) updateData.status = status;
        if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
        if (trackingUrl !== undefined) updateData.trackingUrl = trackingUrl;
        if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
        if (progressPhotos !== undefined) updateData.progressPhotos = progressPhotos;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: 'No hay datos para actualizar' }, { status: 400 });
        }

        const order = await prisma.order.update({
            where: { id },
            data: updateData,
            include: {
                items: true,
                user: true,
            },
        });

        return NextResponse.json({ success: true, order });

    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
