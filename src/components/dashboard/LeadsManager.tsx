'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Users,
    MessageSquare,
    Send,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    MoreVertical,
    X,
    Save,
    Loader2,
    TrendingUp,
    Inbox,
    Phone,
    Instagram,
    Filter,
    RefreshCw,
    Sparkles
} from 'lucide-react';

interface DemoRequest {
    id: string;
    name: string;
    whatsapp: string;
    instagram: string | null;
    industry: string;
    message: string | null;
    status: string;
    notes: string | null;
    source: string;
    createdAt: string;
    updatedAt: string;
}

interface Metrics {
    total: number;
    pending: number;
    contacted: number;
    demoSent: number;
    converted: number;
    rejected: number;
    conversionRate: number;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
    pending: { label: 'Pendiente', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', icon: Clock },
    contacted: { label: 'Contactado', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30', icon: MessageSquare },
    demo_sent: { label: 'Demo Enviada', color: 'text-purple-400 bg-purple-400/10 border-purple-400/30', icon: Send },
    converted: { label: 'Cerrado', color: 'text-green-400 bg-green-400/10 border-green-400/30', icon: CheckCircle2 },
    rejected: { label: 'Descartado', color: 'text-red-400 bg-red-400/10 border-red-400/30', icon: XCircle },
};

const INDUSTRY_LABELS: Record<string, string> = {
    automotriz: '🚗 Automotriz',
    salud: '🏥 Salud',
    restaurante: '🍽️ Restaurante',
    hotel: '🏨 Hotel',
    arquitectura: '🏗️ Arquitectura',
    muebles: '🪑 Muebles',
    fitness: '💪 Fitness',
    ecommerce: '🛒 E-commerce',
    servicios: '💼 Servicios',
    otro: '✨ Otro',
};

function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
}

export function LeadsManager() {
    const [demos, setDemos] = useState<DemoRequest[]>([]);
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [newLeads, setNewLeads] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedDemo, setSelectedDemo] = useState<DemoRequest | null>(null);
    const [editingNotes, setEditingNotes] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/demo/leads?status=${filter}`);
            const data = await res.json();
            if (data.success) {
                setDemos(data.demos);
                setMetrics(data.metrics);
                setNewLeads(data.newLeads);
            }
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const updateStatus = async (id: string, newStatus: string) => {
        setSaving(true);
        try {
            const res = await fetch('/api/demo/leads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                setDemos(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
                if (selectedDemo?.id === id) {
                    setSelectedDemo({ ...selectedDemo, status: newStatus });
                }
                fetchLeads(); // Refresh metrics
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setSaving(false);
        }
    };

    const saveNotes = async () => {
        if (!selectedDemo) return;
        setSaving(true);
        try {
            const res = await fetch('/api/demo/leads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedDemo.id, notes: editingNotes }),
            });
            const data = await res.json();
            if (data.success) {
                setDemos(prev => prev.map(d => d.id === selectedDemo.id ? { ...d, notes: editingNotes } : d));
                setSelectedDemo({ ...selectedDemo, notes: editingNotes });
            }
        } catch (error) {
            console.error('Error saving notes:', error);
        } finally {
            setSaving(false);
        }
    };

    const openDetailModal = (demo: DemoRequest) => {
        setSelectedDemo(demo);
        setEditingNotes(demo.notes || '');
    };

    return (
        <div className="space-y-6">
            {/* Metrics Cards */}
            {metrics && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1">
                            <Inbox className="w-3 h-3" />
                            Total
                        </div>
                        <div className="text-2xl font-bold text-white">{metrics.total}</div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-yellow-400 text-xs mb-1">
                            <Clock className="w-3 h-3" />
                            Pendientes
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">
                            {metrics.pending}
                            {newLeads > 0 && (
                                <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full animate-pulse">
                                    +{newLeads} nuevos
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-blue-400 text-xs mb-1">
                            <MessageSquare className="w-3 h-3" />
                            Contactados
                        </div>
                        <div className="text-2xl font-bold text-blue-400">{metrics.contacted}</div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-purple-400 text-xs mb-1">
                            <Send className="w-3 h-3" />
                            Demos
                        </div>
                        <div className="text-2xl font-bold text-purple-400">{metrics.demoSent}</div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-green-400 text-xs mb-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Cerrados
                        </div>
                        <div className="text-2xl font-bold text-green-400">{metrics.converted}</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/10 to-green-500/10 border border-purple-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-purple-300 text-xs mb-1">
                            <TrendingUp className="w-3 h-3" />
                            Conversión
                        </div>
                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-400">
                            {metrics.conversionRate}%
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-zinc-500" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-zinc-900/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value="all">Todos</option>
                        <option value="pending">🟡 Pendientes</option>
                        <option value="contacted">🔵 Contactados</option>
                        <option value="demo_sent">🟣 Demo Enviada</option>
                        <option value="converted">🟢 Cerrados</option>
                        <option value="rejected">🔴 Descartados</option>
                    </select>
                </div>

                <button
                    onClick={fetchLeads}
                    disabled={loading}
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                </button>
            </div>

            {/* Leads List */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Solicitudes de Demo
                    </h2>
                    {newLeads > 0 && (
                        <span className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            {newLeads} nuevos hoy
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="p-12 text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
                        <p className="text-zinc-500">Cargando leads...</p>
                    </div>
                ) : demos.length === 0 ? (
                    <div className="p-12 text-center">
                        <Inbox className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                        <p className="text-zinc-500">No hay solicitudes de demo todavía</p>
                        <p className="text-zinc-600 text-sm mt-1">Cuando alguien complete el formulario en purrpurr.app/demo, aparecerá aquí</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-white/5">
                        {demos.map((demo) => {
                            const statusConfig = STATUS_CONFIG[demo.status] || STATUS_CONFIG.pending;
                            const StatusIcon = statusConfig.icon;

                            return (
                                <li
                                    key={demo.id}
                                    onClick={() => openDetailModal(demo)}
                                    className="p-4 hover:bg-white/5 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-white truncate">{demo.name}</h3>
                                                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${statusConfig.color}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {statusConfig.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-zinc-500">
                                                <span>{INDUSTRY_LABELS[demo.industry] || demo.industry}</span>
                                                <span className="text-zinc-600">•</span>
                                                <span>{getRelativeTime(demo.createdAt)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`https://wa.me/${demo.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors"
                                                title="Abrir WhatsApp"
                                            >
                                                <Phone className="w-4 h-4" />
                                            </a>
                                            {demo.instagram && (
                                                <a
                                                    href={`https://instagram.com/${demo.instagram}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="p-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 rounded-lg transition-colors"
                                                    title="Ver Instagram"
                                                >
                                                    <Instagram className="w-4 h-4" />
                                                </a>
                                            )}
                                            <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {demo.message && (
                                        <p className="mt-2 text-sm text-zinc-400 line-clamp-2 bg-zinc-950/50 p-2 rounded-lg border border-white/5">
                                            &quot;{demo.message}&quot;
                                        </p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* Detail Modal */}
            {selectedDemo && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">{selectedDemo.name}</h2>
                                <p className="text-sm text-zinc-500">{INDUSTRY_LABELS[selectedDemo.industry]}</p>
                            </div>
                            <button
                                onClick={() => setSelectedDemo(null)}
                                className="p-2 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Status Selector */}
                            <div>
                                <label className="text-sm text-zinc-500 mb-2 block">Estado</label>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                                        const Icon = config.icon;
                                        const isActive = selectedDemo.status === key;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => updateStatus(selectedDemo.id, key)}
                                                disabled={saving}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${isActive
                                                        ? config.color + ' font-medium'
                                                        : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {config.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href={`https://wa.me/${selectedDemo.whatsapp}?text=Hola%20${encodeURIComponent(selectedDemo.name)}%2C%20soy%20de%20Purrpurr.%20Recibimos%20tu%20solicitud%20de%20demo%20%F0%9F%9A%80`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <div>
                                        <div className="text-xs text-green-500/70">WhatsApp</div>
                                        <div className="font-mono">+{selectedDemo.whatsapp}</div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 ml-auto" />
                                </a>

                                {selectedDemo.instagram ? (
                                    <a
                                        href={`https://instagram.com/${selectedDemo.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 rounded-xl text-pink-400 transition-colors"
                                    >
                                        <Instagram className="w-5 h-5" />
                                        <div>
                                            <div className="text-xs text-pink-500/70">Instagram</div>
                                            <div>@{selectedDemo.instagram}</div>
                                        </div>
                                        <ExternalLink className="w-4 h-4 ml-auto" />
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-3 p-4 bg-zinc-800/50 border border-white/5 rounded-xl text-zinc-600">
                                        <Instagram className="w-5 h-5" />
                                        <span className="text-sm">Sin Instagram</span>
                                    </div>
                                )}
                            </div>

                            {/* What they want */}
                            {selectedDemo.message && (
                                <div>
                                    <label className="text-sm text-zinc-500 mb-2 block">Lo que quiere el cliente</label>
                                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-200">
                                        &quot;{selectedDemo.message}&quot;
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            <div>
                                <label className="text-sm text-zinc-500 mb-2 block">Notas internas</label>
                                <textarea
                                    value={editingNotes}
                                    onChange={(e) => setEditingNotes(e.target.value)}
                                    placeholder="Agrega notas sobre este lead..."
                                    rows={3}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 resize-none"
                                />
                                {editingNotes !== (selectedDemo.notes || '') && (
                                    <button
                                        onClick={saveNotes}
                                        disabled={saving}
                                        className="mt-2 flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm transition-colors"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Guardar notas
                                    </button>
                                )}
                            </div>

                            {/* Metadata */}
                            <div className="pt-4 border-t border-white/10 text-xs text-zinc-600 space-y-1">
                                <p>ID: {selectedDemo.id}</p>
                                <p>Fuente: {selectedDemo.source}</p>
                                <p>Creado: {new Date(selectedDemo.createdAt).toLocaleString('es-CO')}</p>
                                <p>Actualizado: {new Date(selectedDemo.updatedAt).toLocaleString('es-CO')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
