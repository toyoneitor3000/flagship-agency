"use client";

import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type Notification = {
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    link?: string | null;
    createdAt: string;
};

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/notifications");
            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();

        // Polling every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markAsRead = async (id: string) => {
        try {
            await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "mark_read", notificationId: id }),
            });
            // Update local state
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, isRead: true } : n)
            );
        } catch { }
    };

    const markAllRead = async () => {
        try {
            await fetch("/api/notifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "mark_all_read" }),
            });
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch { }
    };

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.isRead) {
            markAsRead(notification.id);
        }
        setIsOpen(false);
        if (notification.link) {
            router.push(notification.link);
        }
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 hover:text-brand-yellow focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-2 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow font-bold text-[8px] items-center justify-center text-black">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80 max-h-[85vh] overflow-hidden flex flex-col bg-[#111] border border-white/10 text-white" align="end" forceMount>
                <div className="flex items-center justify-between px-2 py-3 border-b border-white/10">
                    <DropdownMenuLabel className="font-bold text-sm">Notificaciones</DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                markAllRead();
                            }}
                            className="text-xs text-brand-yellow hover:text-yellow-400 font-medium px-2 py-1 rounded-md hover:bg-brand-yellow/10 transition-colors flex items-center gap-1"
                        >
                            <Check className="h-3 w-3" />
                            Marcar leídas
                        </button>
                    )}
                </div>

                <div className="overflow-y-auto flex-1 p-1">
                    {notifications.length === 0 ? (
                        <div className="py-8 text-center text-white/50 text-sm flex flex-col items-center">
                            <Bell className="h-8 w-8 text-white/20 mb-2" />
                            <span>No tienes notificaciones</span>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`flex flex-col items-start p-3 my-1 rounded-xl cursor-pointer transition-colors outline-none focus:bg-white/5 ${notification.isRead ? "opacity-60" : "bg-white/5 border border-white/5"
                                    }`}
                            >
                                <div className="flex w-full justify-between items-start mb-1">
                                    <span className={`text-sm font-semibold flex items-center gap-2 ${notification.isRead ? "text-white/80" : "text-brand-yellow"}`}>
                                        {!notification.isRead && <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />}
                                        {notification.title}
                                    </span>
                                    <span className="text-[10px] text-white/40 whitespace-nowrap ml-2">
                                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: es })}
                                    </span>
                                </div>
                                <p className={`text-xs mt-1 leading-snug w-full whitespace-normal break-words ${notification.isRead ? "text-white/50" : "text-white/80"}`}>
                                    {notification.message}
                                </p>
                            </DropdownMenuItem>
                        ))
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
