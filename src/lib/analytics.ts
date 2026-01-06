/**
 * ANALYTICS ENGINE
 * Real-time tracking and metrics calculation for Purrpurr
 */

import { prisma } from './prisma';
import crypto from 'crypto';

// --- TYPES ---
export type EventType = 'PAGE_VIEW' | 'API_CALL' | 'ASSET_LOAD' | 'ERROR' | 'PROJECT_CREATE' | 'PROJECT_PUBLISH';

export interface TrackEventParams {
    eventType: EventType;
    projectId?: string;
    userId?: string;
    path?: string;
    userAgent?: string;
    ip?: string;
    referer?: string;
    responseTime?: number;
    bytesTransferred?: number;
}

// --- UTILITIES ---

/**
 * Hash IP address for privacy-compliant unique visitor tracking
 */
export function hashIP(ip: string): string {
    const salt = process.env.ANALYTICS_SALT || 'purrpurr-analytics-salt';
    return crypto.createHash('sha256').update(ip + salt).digest('hex').substring(0, 16);
}

/**
 * Calculate storage used by a project's architecture JSON
 */
export function calculateProjectStorage(architecture: string): number {
    // Size in bytes of the JSON string
    return Buffer.byteLength(architecture, 'utf8');
}

// --- TRACKING FUNCTIONS ---

/**
 * Track an analytics event
 */
export async function trackEvent(params: TrackEventParams): Promise<void> {
    try {
        await prisma.analytics.create({
            data: {
                eventType: params.eventType,
                projectId: params.projectId,
                userId: params.userId,
                path: params.path,
                userAgent: params.userAgent?.substring(0, 500), // Limit size
                ipHash: params.ip ? hashIP(params.ip) : null,
                referer: params.referer?.substring(0, 500),
                responseTime: params.responseTime,
                bytesTransferred: params.bytesTransferred || 0,
            }
        });
    } catch (error) {
        // Non-blocking: Log but don't throw
        console.error('[Analytics] Failed to track event:', error);
    }
}

// --- METRICS CALCULATION ---

export interface ClusterMetrics {
    storage: {
        used: number;      // Bytes
        total: number;     // Bytes (plan limit)
        percentage: number;
    };
    bandwidth: {
        used: number;      // Bytes this period
        total: number;     // Bytes (plan limit)
        percentage: number;
    };
    performance: {
        avgResponseTime: number;  // ms
        cpuLoadEstimate: number;  // Percentage (derived from response time)
    };
    activity: {
        pageViews: number;
        uniqueVisitors: number;
        apiCalls: number;
    };
    period: {
        start: Date;
        end: Date;
    };
}

// Plan limits
const PLAN_LIMITS = {
    FREE: {
        storage: 500 * 1024 * 1024,     // 500 MB
        bandwidth: 10 * 1024 * 1024 * 1024, // 10 GB/month
    },
    PRO: {
        storage: 5 * 1024 * 1024 * 1024,  // 5 GB
        bandwidth: 100 * 1024 * 1024 * 1024, // 100 GB/month
    },
    ENTERPRISE: {
        storage: 50 * 1024 * 1024 * 1024,  // 50 GB
        bandwidth: 1024 * 1024 * 1024 * 1024, // 1 TB/month
    }
};

/**
 * Calculate real cluster metrics for a user
 */
export async function getClusterMetrics(userId: string): Promise<ClusterMetrics> {
    // Get user with their projects and subscription
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            projects: true,
            subscription: true,
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    const plan = (user.subscription?.plan || 'FREE') as keyof typeof PLAN_LIMITS;
    const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;

    // Calculate real storage from project architectures
    let storageUsed = 0;
    for (const project of user.projects) {
        if (project.architecture) {
            storageUsed += calculateProjectStorage(project.architecture);
        }
        // Add estimated overhead for metadata (slug, name, integrations, etc.)
        storageUsed += 1024; // 1KB per project overhead
    }

    // Get period start (beginning of current month)
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get analytics data for current period
    const analyticsData = await prisma.analytics.aggregate({
        where: {
            userId: userId,
            createdAt: {
                gte: periodStart,
            }
        },
        _sum: {
            bytesTransferred: true,
            responseTime: true,
        },
        _count: {
            id: true,
        },
        _avg: {
            responseTime: true,
        }
    });

    // Get unique visitors count
    const uniqueVisitorsData = await prisma.analytics.groupBy({
        by: ['ipHash'],
        where: {
            userId: userId,
            eventType: 'PAGE_VIEW',
            createdAt: {
                gte: periodStart,
            },
            ipHash: {
                not: null,
            }
        },
    });

    // Get page views count
    const pageViewsCount = await prisma.analytics.count({
        where: {
            userId: userId,
            eventType: 'PAGE_VIEW',
            createdAt: {
                gte: periodStart,
            }
        }
    });

    // Get API calls count
    const apiCallsCount = await prisma.analytics.count({
        where: {
            userId: userId,
            eventType: 'API_CALL',
            createdAt: {
                gte: periodStart,
            }
        }
    });

    const bandwidthUsed = analyticsData._sum.bytesTransferred || 0;
    const avgResponseTime = Math.round(analyticsData._avg.responseTime || 0);

    // CPU Load Estimate based on response time
    // Under 100ms = low load, 100-300ms = medium, 300+ = high
    let cpuLoadEstimate = 5; // Base load
    if (avgResponseTime > 0) {
        cpuLoadEstimate = Math.min(95, Math.max(5, Math.round((avgResponseTime / 500) * 100)));
    }

    return {
        storage: {
            used: storageUsed,
            total: limits.storage,
            percentage: Math.min(100, (storageUsed / limits.storage) * 100),
        },
        bandwidth: {
            used: bandwidthUsed,
            total: limits.bandwidth,
            percentage: Math.min(100, (bandwidthUsed / limits.bandwidth) * 100),
        },
        performance: {
            avgResponseTime,
            cpuLoadEstimate,
        },
        activity: {
            pageViews: pageViewsCount,
            uniqueVisitors: uniqueVisitorsData.length,
            apiCalls: apiCallsCount,
        },
        period: {
            start: periodStart,
            end: now,
        }
    };
}

// --- HELPER: Format bytes for display ---
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
