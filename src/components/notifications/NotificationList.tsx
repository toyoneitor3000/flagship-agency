'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    type: string;
    createdAt: string;
    link?: string;
}

export function NotificationList({ className, iconColorClass }: { className?: string; iconColorClass?: string }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            const data = await res.json();
            if (data.success) {
                setNotifications(data.notifications);
            }
        } catch (e) {
            console.error('Error fetching notifications:', e);
        } finally {
            setLoading(false);
        }
    };

    const markRead = async (ids: string[]) => {
        if (ids.length === 0) return;

        try {
            // Optimistic update
            setNotifications(prev => prev.map(n =>
                ids.includes(n.id) ? { ...n, read: true } : n
            ));

            await fetch('/api/notifications', {
                method: 'PATCH',
                body: JSON.stringify({ notificationIds: ids }),
            });
        } catch (e) {
            console.error('Error marking notifications as read:', e);
            // Revert on error if needed, but low risk for read status
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 transition-all duration-300 rounded-full hover:bg-white/5 z-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] opacity-80 hover:opacity-100 ${iconColorClass || 'text-zinc-400 hover:text-white'} ${className || ''}`}
                aria-label="Notifications"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-[9px] flex items-center justify-center text-white font-bold shadow-sm">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute -right-2 mt-2 w-[340px] sm:w-96 bg-[#030014]/90 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] overflow-hidden ring-1 ring-white/5 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-xl">
                        <h3 className="font-semibold text-white text-sm tracking-wide">Notificaciones</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={() => markRead(notifications.filter(n => !n.read).map(n => n.id))}
                                className="text-[10px] uppercase tracking-wider font-mono text-purple-300 hover:text-white transition-colors"
                            >
                                Marcar todo leido
                            </button>
                        )}
                    </div>

                    <div className="max-h-[28rem] overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500 text-sm">Cargando...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
                                <Bell size={24} className="opacity-20" />
                                <p>No tienes notificaciones</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {notifications.map(n => (
                                    <div
                                        key={n.id}
                                        className={`p-4 transition-all duration-300 cursor-pointer group ${!n.read ? 'bg-white/5 hover:bg-white/10' : 'hover:bg-white/5'}`}
                                        onClick={() => {
                                            if (!n.read) markRead([n.id]);
                                            if (n.link) window.location.href = n.link;
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-1 gap-2">
                                            <span className={`text-sm font-medium leading-tight ${!n.read ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                {n.title}
                                            </span>
                                            <span className="text-[10px] text-gray-600 whitespace-nowrap pt-0.5">
                                                {new Date(n.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className={`text-xs ${!n.read ? 'text-gray-300' : 'text-gray-500'} mb-2 line-clamp-3`}>
                                            {n.message}
                                        </p>
                                        {(n.link || n.type !== 'INFO') && (
                                            <div className="flex items-center gap-2 mt-2">
                                                {n.type === 'SUCCESS' && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">SUCCESS</span>}
                                                {n.type === 'WARNING' && <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-mono">WARNING</span>}
                                                {n.type === 'ERROR' && <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20 font-mono">ERROR</span>}
                                                {n.type === 'SYSTEM_WELCOME' && <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20 font-mono">SYSTEM</span>}
                                                {n.type === 'SYSTEM_UPDATE' && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 font-mono flex items-center gap-1">UPDATE <span className="animate-pulse">●</span></span>}

                                                {n.link && (
                                                    <span className="text-xs text-cyan-400 hover:text-cyan-300 font-medium ml-auto flex items-center gap-1 group-hover:underline">
                                                        Ver detalles &rarr;
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
