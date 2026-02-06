import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        const body = await req.json();
        const {
            materialId,
            materialName,
            cutTypeId,
            cutTypeName,
            width,
            height,
            quantity,
            laminate,
            price,
            fileUrl,
            fileName
        } = body;

        // Validaciones básicas
        if (!materialId || !width || !height || !quantity || !fileUrl) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // Crear la orden en la base de datos
        const order = await prisma.order.create({
            data: {
                userId: session?.user?.id || null, // Permitir pedidos invitados o de usuarios logueados
                amount: Math.round(price),
                status: 'PENDING',
                items: {
                    create: {
                        quantity: quantity,
                        price: Math.round(price / quantity), // Precio unitario aproximado
                        fileUrl: fileUrl,
                        metadata: JSON.stringify({
                            materialName,
                            cutTypeName,
                            dimensions: `${width}cm x ${height}cm`,
                            laminate,
                            fileName
                        })
                    }
                }
            },
            include: {
                items: true
            }
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            message: 'Orden creada exitosamente'
        });

    } catch (error) {
        console.error('Error creating sticker order:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
