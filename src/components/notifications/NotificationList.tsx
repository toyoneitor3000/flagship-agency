import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
    const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const toggleOpen = () => {
        if (!isOpen && buttonRef.current) {
            // Update position before opening
            setButtonRect(buttonRef.current.getBoundingClientRect());
        }
        setIsOpen(!isOpen);
    };

    // Update rect on resize/scroll if open
    useEffect(() => {
        if (!isOpen) return;

        const updatePos = () => {
            if (buttonRef.current) {
                setButtonRect(buttonRef.current.getBoundingClientRect());
            }
        };

        window.addEventListener('scroll', updatePos);
        window.addEventListener('resize', updatePos);

        return () => {
            window.removeEventListener('scroll', updatePos);
            window.removeEventListener('resize', updatePos);
        };
    }, [isOpen]);

    return (
        <>
            <div className="relative" ref={containerRef}>
                <button
                    ref={buttonRef}
                    onClick={toggleOpen}
                    className={`relative p-2 transition-all duration-300 rounded-full hover:bg-white/5 z-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] opacity-80 hover:opacity-100 ${iconColorClass || 'text-zinc-400 hover:text-white'} ${className || ''}`}
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-gradient-to-r from-red-500 to-orange-600 rounded-full text-[9px] flex items-center justify-center text-white font-bold shadow-sm">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {isOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[99999] isolate">
                    {/* INVISIBLE Overlay - just to catch clicks outside, NO BLUR here */}
                    <div
                        className="absolute inset-0 bg-transparent"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* MENU CONTAINER - Centered and Wide */}
                    <div
                        className="fixed left-1/2 top-[60px] -translate-x-1/2 w-[90vw] max-w-2xl rounded-2xl border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
                        style={{
                            // Premium Local Blur
                            // Background color handled by children for split effect
                            backdropFilter: 'blur(32px) saturate(200%)',
                            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                        }}
                    >
                        {/* Header with Close Button */}
                        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-zinc-950/50 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-white text-sm tracking-wide">Notificaciones</h3>
                                {unreadCount > 0 && (
                                    <span className="px-1.5 py-0.5 rounded-md bg-red-500/20 border border-red-500/30 text-[10px] font-bold text-red-400">
                                        {unreadCount} NARROW
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={() => markRead(notifications.filter(n => !n.read).map(n => n.id))}
                                        className="text-[10px] uppercase tracking-wider font-mono text-zinc-400 hover:text-white transition-colors"
                                    >
                                        Leído
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[75vh] overflow-y-auto scrollbar-thin bg-zinc-950/70">
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
                                                    {n.type === 'SYSTEM_WELCOME' && <span className="text-[10px] bg-zinc-500/10 text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-500/20 font-mono">SYSTEM</span>}
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
                </div>,
                document.body
            )}
        </>
    );
}
