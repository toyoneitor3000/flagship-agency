/**
 * API: Get Cluster Metrics
 * GET /api/analytics/metrics
 * 
 * Returns real-time cluster metrics for the authenticated user
 */

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getClusterMetrics, formatBytes } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const metrics = await getClusterMetrics(session.user.id);

        // Format for frontend consumption
        return NextResponse.json({
            success: true,
            metrics: {
                storage: {
                    used: metrics.storage.used,
                    usedFormatted: formatBytes(metrics.storage.used),
                    total: metrics.storage.total,
                    totalFormatted: formatBytes(metrics.storage.total),
                    percentage: Math.round(metrics.storage.percentage * 100) / 100,
                },
                bandwidth: {
                    used: metrics.bandwidth.used,
                    usedFormatted: formatBytes(metrics.bandwidth.used),
                    total: metrics.bandwidth.total,
                    totalFormatted: formatBytes(metrics.bandwidth.total),
                    percentage: Math.round(metrics.bandwidth.percentage * 100) / 100,
                },
                performance: {
                    avgResponseTime: metrics.performance.avgResponseTime,
                    avgResponseTimeFormatted: `${metrics.performance.avgResponseTime}ms`,
                    cpuLoad: metrics.performance.cpuLoadEstimate,
                    cpuLoadFormatted: `${metrics.performance.cpuLoadEstimate}%`,
                },
                activity: {
                    pageViews: metrics.activity.pageViews,
                    uniqueVisitors: metrics.activity.uniqueVisitors,
                    apiCalls: metrics.activity.apiCalls,
                },
                period: {
                    start: metrics.period.start.toISOString(),
                    end: metrics.period.end.toISOString(),
                    label: `${metrics.period.start.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}`,
                }
            },
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('[Metrics API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch metrics' },
            { status: 500 }
        );
    }
}
