import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

// GET /api/demo/leads - List all demo requests with stats
export async function GET(request: Request) {
    console.log(`[API] GET /api/demo/leads called at ${new Date().toISOString()}`);
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user?.email) {
            console.warn('[API] Unauthorized access attempt to /api/demo/leads');
            return NextResponse.json(
                { success: false, message: 'No autorizado' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');

        console.log(`[API] Fetching leads with status: ${status || 'all'}, limit: ${limit}`);

        // Build where clause
        const where = status && status !== 'all' ? { status } : {};

        // Fetch demo requests and all demos for metrics in parallel
        const [demos, allDemos] = await Promise.all([
            prisma.demoRequest.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                take: limit,
            }),
            prisma.demoRequest.findMany()
        ]);

        // Calculate metrics
        const metrics = {
            total: allDemos.length,
            pending: allDemos.filter(d => d.status === 'pending').length,
            contacted: allDemos.filter(d => d.status === 'contacted').length,
            demoSent: allDemos.filter(d => d.status === 'demo_sent').length,
            converted: allDemos.filter(d => d.status === 'converted').length,
            rejected: allDemos.filter(d => d.status === 'rejected').length,
            conversionRate: allDemos.length > 0
                ? Math.round((allDemos.filter(d => d.status === 'converted').length / allDemos.length) * 100)
                : 0,
        };

        // Get count of new leads (pending, less than 24h old)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const newLeads = allDemos.filter(
            d => d.status === 'pending' && new Date(d.createdAt) > oneDayAgo
        ).length;

        console.log(`[API] Successfully fetched ${demos.length} demos. Total pending: ${metrics.pending}`);

        return NextResponse.json({
            success: true,
            demos,
            metrics,
            newLeads,
        });
    } catch (error) {
        console.error('[API] Error fetching demo requests:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Error interno',
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

// PATCH /api/demo/leads - Update a demo request status
export async function PATCH(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, message: 'No autorizado' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { id, status, notes } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'ID requerido' },
                { status: 400 }
            );
        }

        const validStatuses = ['pending', 'contacted', 'demo_sent', 'converted', 'rejected'];
        if (status && !validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: 'Estado inválido' },
                { status: 400 }
            );
        }

        const updateData: Record<string, string> = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const updated = await prisma.demoRequest.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            demo: updated,
        });
    } catch (error) {
        console.error('Error updating demo request:', error);
        return NextResponse.json(
            { success: false, message: 'Error interno' },
            { status: 500 }
        );
    }
}

// DELETE /api/demo/leads - Delete a demo request
export async function DELETE(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, message: 'No autorizado' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'ID requerido' },
                { status: 400 }
            );
        }

        await prisma.demoRequest.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: 'Solicitud eliminada',
        });
    } catch (error) {
        console.error('Error deleting demo request:', error);
        return NextResponse.json(
            { success: false, message: 'Error interno' },
            { status: 500 }
        );
    }
}
