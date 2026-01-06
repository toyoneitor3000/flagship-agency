'use client';

/**
 * ClusterStatus Component
 * Real-time server metrics display for the dashboard
 */

import React, { useEffect, useState } from 'react';
import { HardDrive, Cpu, Activity, Users, Eye, Zap, RefreshCw } from 'lucide-react';

interface ClusterMetrics {
    storage: {
        used: number;
        usedFormatted: string;
        total: number;
        totalFormatted: string;
        percentage: number;
    };
    bandwidth: {
        used: number;
        usedFormatted: string;
        total: number;
        totalFormatted: string;
        percentage: number;
    };
    performance: {
        avgResponseTime: number;
        avgResponseTimeFormatted: string;
        cpuLoad: number;
        cpuLoadFormatted: string;
    };
    activity: {
        pageViews: number;
        uniqueVisitors: number;
        apiCalls: number;
    };
    period: {
        start: string;
        end: string;
        label: string;
    };
}

export function ClusterStatus() {
    const [metrics, setMetrics] = useState<ClusterMetrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchMetrics = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/analytics/metrics');
            const data = await res.json();

            if (data.success) {
                setMetrics(data.metrics);
                setLastUpdated(new Date());
                setError(null);
            } else {
                setError(data.error || 'Failed to load metrics');
            }
        } catch (err) {
            setError('Connection error');
            console.error('[ClusterStatus] Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchMetrics, 30000);
        return () => clearInterval(interval);
    }, []);

    // Loading state
    if (loading && !metrics) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-24 bg-zinc-800/50 rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-zinc-800/50 rounded-lg" />
                    <div className="h-20 bg-zinc-800/50 rounded-lg" />
                </div>
            </div>
        );
    }

    // Error state with fallback
    if (error && !metrics) {
        return (
            <div className="text-center py-8">
                <p className="text-zinc-500 text-sm">{error}</p>
                <button
                    onClick={fetchMetrics}
                    className="mt-4 text-xs text-purple-400 hover:text-purple-300"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (!metrics) return null;

    // Status color based on load
    const getLoadColor = (percentage: number) => {
        if (percentage < 50) return 'from-emerald-500 to-cyan-500';
        if (percentage < 80) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-pink-500';
    };

    const getCpuColor = (load: number) => {
        if (load < 30) return 'text-emerald-400';
        if (load < 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="space-y-6">
            {/* Header with refresh */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-emerald-400" />
                    Cluster Status
                </h2>
                <button
                    onClick={fetchMetrics}
                    disabled={loading}
                    className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors disabled:opacity-50"
                    title="Actualizar métricas"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Storage Bar */}
            <div>
                <div className="flex justify-between text-xs mb-2 text-zinc-400">
                    <span>Almacenamiento SSD</span>
                    <span>{metrics.storage.usedFormatted} / {metrics.storage.totalFormatted}</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${getLoadColor(metrics.storage.percentage)} transition-all duration-500`}
                        style={{ width: `${Math.max(2, metrics.storage.percentage)}%` }}
                    />
                </div>
            </div>

            {/* Bandwidth Bar */}
            <div>
                <div className="flex justify-between text-xs mb-2 text-zinc-400">
                    <span>Bandwidth ({metrics.period.label})</span>
                    <span>{metrics.bandwidth.usedFormatted} / {metrics.bandwidth.totalFormatted}</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${getLoadColor(metrics.bandwidth.percentage)} transition-all duration-500`}
                        style={{ width: `${Math.max(2, metrics.bandwidth.percentage)}%` }}
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* CPU Load */}
                <div className="bg-zinc-950 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                        <Cpu className="w-3 h-3" />
                        CPU Load
                    </div>
                    <div className={`text-lg font-mono ${getCpuColor(metrics.performance.cpuLoad)}`}>
                        {metrics.performance.cpuLoadFormatted}
                    </div>
                </div>

                {/* Response Time */}
                <div className="bg-zinc-950 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                        <Zap className="w-3 h-3" />
                        Latencia
                    </div>
                    <div className="text-lg font-mono text-blue-400">
                        {metrics.performance.avgResponseTimeFormatted}
                    </div>
                </div>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-zinc-950/50 p-2 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1">
                        <Eye className="w-3 h-3" />
                    </div>
                    <div className="text-sm font-mono text-white">{metrics.activity.pageViews.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-600">Views</div>
                </div>
                <div className="bg-zinc-950/50 p-2 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1">
                        <Users className="w-3 h-3" />
                    </div>
                    <div className="text-sm font-mono text-white">{metrics.activity.uniqueVisitors.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-600">Visitors</div>
                </div>
                <div className="bg-zinc-950/50 p-2 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1 text-zinc-500 mb-1">
                        <Activity className="w-3 h-3" />
                    </div>
                    <div className="text-sm font-mono text-white">{metrics.activity.apiCalls.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-600">API Calls</div>
                </div>
            </div>

            {/* Last Updated */}
            {lastUpdated && (
                <div className="text-[10px] text-zinc-600 text-center">
                    Actualizado: {lastUpdated.toLocaleTimeString('es-ES')}
                </div>
            )}
        </div>
    );
}
