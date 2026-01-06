/**
 * API: Analytics Tracking Endpoint
 * POST /api/analytics/track
 * 
 * Receives tracking events from the client or middleware
 */

import { NextRequest, NextResponse } from 'next/server';
import { trackEvent, EventType } from '@/lib/analytics';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const body = await request.json();

        const {
            eventType,
            projectSlug,
            path,
            referer,
            bytesTransferred = 0,
        } = body;

        // Validate event type
        const validEventTypes: EventType[] = ['PAGE_VIEW', 'API_CALL', 'ASSET_LOAD', 'ERROR', 'PROJECT_CREATE', 'PROJECT_PUBLISH'];
        if (!validEventTypes.includes(eventType)) {
            return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
        }

        // Get project and user info if projectSlug provided
        let projectId: string | undefined;
        let userId: string | undefined;

        if (projectSlug) {
            const project = await prisma.project.findUnique({
                where: { slug: projectSlug },
                select: { id: true, userId: true }
            });
            if (project) {
                projectId = project.id;
                userId = project.userId;
            }
        }

        // Extract client info
        const userAgent = request.headers.get('user-agent') || undefined;
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            '127.0.0.1';
        const refererHeader = referer || request.headers.get('referer') || undefined;

        const responseTime = Date.now() - startTime;

        // Track the event
        await trackEvent({
            eventType,
            projectId,
            userId,
            path,
            userAgent,
            ip,
            referer: refererHeader,
            responseTime,
            bytesTransferred,
        });

        return NextResponse.json({
            success: true,
            tracked: {
                eventType,
                projectId,
                responseTime,
            }
        });

    } catch (error) {
        console.error('[Analytics API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to track event' },
            { status: 500 }
        );
    }
}

// GET endpoint for testing/health check
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'Analytics tracking endpoint is operational',
        timestamp: new Date().toISOString(),
    });
}
