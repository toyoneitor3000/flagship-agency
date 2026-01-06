'use client';

/**
 * Analytics Tracker Hook
 * Automatically tracks page views and provides manual tracking functions
 */

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface TrackEventOptions {
    eventType: 'PAGE_VIEW' | 'API_CALL' | 'ASSET_LOAD' | 'ERROR' | 'PROJECT_CREATE' | 'PROJECT_PUBLISH';
    projectSlug?: string;
    path?: string;
    bytesTransferred?: number;
    metadata?: Record<string, unknown>;
}

// Non-blocking analytics tracking
async function sendTrackingEvent(options: TrackEventOptions): Promise<void> {
    try {
        // Use sendBeacon if available for non-blocking requests
        const payload = JSON.stringify({
            eventType: options.eventType,
            projectSlug: options.projectSlug,
            path: options.path || window.location.pathname,
            referer: document.referrer,
            bytesTransferred: options.bytesTransferred || 0,
            metadata: options.metadata,
            timestamp: new Date().toISOString(),
        });

        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/analytics/track', payload);
        } else {
            // Fallback to fetch
            fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true, // Allow request to complete even if page unloads
            }).catch(() => { }); // Silently fail
        }
    } catch {
        // Non-blocking: silently fail
    }
}

/**
 * Hook for automatic page view tracking
 */
export function usePageViewTracker(projectSlug?: string) {
    const pathname = usePathname();

    useEffect(() => {
        // Skip tracking for internal/admin routes
        if (pathname?.startsWith('/api') || pathname?.includes('_next')) {
            return;
        }

        // Track page view
        sendTrackingEvent({
            eventType: 'PAGE_VIEW',
            projectSlug,
            path: pathname || undefined,
        });
    }, [pathname, projectSlug]);
}

/**
 * Hook for manual event tracking
 */
export function useAnalytics() {
    const trackEvent = useCallback((options: Omit<TrackEventOptions, 'path'> & { path?: string }) => {
        sendTrackingEvent({
            ...options,
            path: options.path || window.location.pathname,
        });
    }, []);

    const trackError = useCallback((error: Error, context?: Record<string, unknown>) => {
        sendTrackingEvent({
            eventType: 'ERROR',
            metadata: {
                message: error.message,
                stack: error.stack?.substring(0, 500),
                ...context,
            },
        });
    }, []);

    const trackProjectCreated = useCallback((projectSlug: string) => {
        sendTrackingEvent({
            eventType: 'PROJECT_CREATE',
            projectSlug,
        });
    }, []);

    const trackProjectPublished = useCallback((projectSlug: string) => {
        sendTrackingEvent({
            eventType: 'PROJECT_PUBLISH',
            projectSlug,
        });
    }, []);

    return {
        trackEvent,
        trackError,
        trackProjectCreated,
        trackProjectPublished,
    };
}

/**
 * Standalone tracker component for automatic page views
 * Add to layout or specific pages
 */
export function AnalyticsTracker({ projectSlug }: { projectSlug?: string }) {
    usePageViewTracker(projectSlug);
    return null; // Invisible component
}
