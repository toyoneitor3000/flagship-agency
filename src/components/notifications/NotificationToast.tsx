'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Phone, Instagram, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';
import { useNotifications } from './NotificationProvider';

export function NotificationToast() {
    const { newLeads, markAsSeen, clearAll } = useNotifications();
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-expand when new leads arrive
    useEffect(() => {
        if (newLeads.length > 0) {
            setIsExpanded(true);
        }
    }, [newLeads]);

    if (newLeads.length === 0) return null;

    const latestLead = newLeads[0];
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

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -100, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -100, x: '-50%' }}
                className="fixed top-4 left-1/2 z-[100] w-full max-w-md px-4"
            >
                <div className="bg-gradient-to-r from-purple-900/95 to-indigo-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                                <Bell className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">
                                    🚀 ¡Nueva Solicitud de Demo!
                                </h3>
                                <p className="text-xs text-purple-300">
                                    {newLeads.length > 1 ? `+${newLeads.length - 1} más` : 'Hace unos segundos'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                clearAll();
                                setIsExpanded(false);
                            }}
                            className="p-2 text-white/60 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Lead Info */}
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="p-4 space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-white text-lg">{latestLead.name}</p>
                                    <p className="text-sm text-purple-300">
                                        {INDUSTRY_LABELS[latestLead.industry] || latestLead.industry}
                                    </p>
                                </div>
                            </div>

                            {latestLead.message && (
                                <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                                    <p className="text-xs text-purple-400 mb-1">Lo que quiere:</p>
                                    <p className="text-sm text-white/90 line-clamp-2">
                                        &quot;{latestLead.message}&quot;
                                    </p>
                                </div>
                            )}

                            {/* Quick Actions */}
                            <div className="flex gap-2">
                                <a
                                    href={`https://wa.me/${latestLead.whatsapp}?text=Hola%20${encodeURIComponent(latestLead.name)}%2C%20soy%20de%20Purrpurr.%20Recibimos%20tu%20solicitud%20de%20demo%20%F0%9F%9A%80`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => markAsSeen(latestLead.id)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    WhatsApp
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                {latestLead.instagram && (
                                    <a
                                        href={`https://instagram.com/${latestLead.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 font-medium py-3 px-4 rounded-xl transition-colors border border-pink-500/30"
                                    >
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                )}
                            </div>

                            {/* View All Link */}
                            <Link
                                href="/dashboard/leads"
                                onClick={clearAll}
                                className="flex items-center justify-center gap-2 text-sm text-purple-300 hover:text-white transition-colors py-2"
                            >
                                <Users className="w-4 h-4" />
                                Ver todos los leads
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
