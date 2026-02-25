import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request) {
    try {
        // Obtener sesión de forma resiliente
        let userId: string | null = null;
        try {
            const session = await auth();
            userId = session?.user?.id || null;
        } catch (authError) {
            console.log('[POST /api/orders] Auth failed, proceeding as guest:', authError);
        }

        const body = await req.json();
        const {
            items,
            totalAmount,
            shippingName,
            shippingAddress,
            shippingCity,
            deliveryMethod,
            contactPhone,
            contactEmail,
            coupon,
            discount,
        } = body;

        // Validaciones básicas
        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No hay items en el pedido' }, { status: 400 });
        }

        if (!shippingName || !shippingAddress) {
            return NextResponse.json({ error: 'Faltan datos de envío' }, { status: 400 });
        }

        console.log('[POST /api/orders] Creating order for userId:', userId || 'guest', '| Items:', items.length);

        const order = await prisma.order.create({
            data: {
                userId,
                amount: Math.round(totalAmount),
                status: 'PENDING',
                shippingName,
                shippingAddress,
                shippingCity: shippingCity || null,
                contactPhone: contactPhone || null,
                contactEmail: contactEmail || null,
                deliveryMethod: deliveryMethod || null,
                items: {
                    create: items.map((item: any) => ({
                        quantity: item.quantity,
                        price: Math.round(item.price),
                        fileUrl: item.fileUrl || null,
                        metadata: JSON.stringify({
                            name: item.name,
                            category: item.category || 'General',
                            description: item.description || '',
                            features: item.features || [],
                            coupon: coupon || null,
                            discount: discount || 0,
                        }),
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        console.log('[POST /api/orders] Order created:', order.id);

        return NextResponse.json({
            success: true,
            orderId: order.id,
            message: 'Pedido creado exitosamente',
        });
    } catch (error: any) {
        console.error('[POST /api/orders] Error creating order:', error?.message || error);
        return NextResponse.json(
            { error: 'Error interno del servidor', details: error?.message },
            { status: 500 }
        );
    }
}
