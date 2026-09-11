'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';

interface DemoLead {
    id: string;
    name: string;
    whatsapp: string;
    instagram: string | null;
    industry: string;
    message: string | null;
    createdAt: string;
}

interface NotificationContextType {
    newLeads: DemoLead[];
    totalPending: number;
    lastChecked: Date | null;
    markAsSeen: (id: string) => void;
    clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
}

interface NotificationProviderProps {
    children: ReactNode;
    adminEmail?: string;
}

export function NotificationProvider({ children, adminEmail }: NotificationProviderProps) {
    const [newLeads, setNewLeads] = useState<DemoLead[]>([]);
    const [totalPending, setTotalPending] = useState(0);
    const [lastChecked, setLastChecked] = useState<Date | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const lastCheckedRef = useRef<Date | null>(null);
    const seenIdsRef = useRef<Set<string>>(new Set());

    // Check if user is admin
    useEffect(() => {
        const adminEmails = ['camilotoloza1136@gmail.com', 'purrpurrdev@gmail.com', 'purpuregamechanger@gmail.com'];
        setIsAdmin(adminEmail ? adminEmails.includes(adminEmail) : false);
    }, [adminEmail]);

    // Play notification sound
    const playNotificationSound = useCallback(() => {
        try {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (!AudioContextClass) return;
            const audioContext = new AudioContextClass();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);

            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.value = 1000;
                osc2.type = 'sine';
                gain2.gain.value = 0.3;
                osc2.start();
                osc2.stop(audioContext.currentTime + 0.15);
            }, 200);
        } catch {
            // Audio context not allowed or failed
        }
    }, []);

    // Fetch new leads
    const fetchLeads = useCallback(async () => {
        if (!isAdmin) return;

        try {
            const res = await fetch('/api/demo/leads?status=pending');

            // Defensive check: if unauthenticated or error, exit gracefully without triggering Next.js dev overlay
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    setIsAdmin(false);
                }
                return;
            }

            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                return;
            }

            const data = await res.json();

            if (data.success) {
                setTotalPending(data.metrics?.pending || 0);

                const pendingLeads = data.demos || [];
                const newUnseenLeads = pendingLeads.filter(
                    (lead: DemoLead) => !seenIdsRef.current.has(lead.id)
                );

                if (newUnseenLeads.length > 0 && lastCheckedRef.current !== null) {
                    const recentLeads = newUnseenLeads.filter((lead: DemoLead) => {
                        const leadTime = new Date(lead.createdAt).getTime();
                        const checkTime = lastCheckedRef.current!.getTime();
                        return leadTime > checkTime - 60000;
                    });

                    if (recentLeads.length > 0) {
                        setNewLeads(recentLeads);
                        playNotificationSound();
                    }
                }

                const now = new Date();
                lastCheckedRef.current = now;
                setLastChecked(now);
            }
        } catch {
            // Silently ignore network failures or page transitions
        }
    }, [isAdmin, playNotificationSound]);

    // Poll for new leads every 20 seconds
    useEffect(() => {
        if (!isAdmin) return;

        fetchLeads();
        const interval = setInterval(fetchLeads, 20000);

        return () => clearInterval(interval);
    }, [isAdmin, fetchLeads]);

    const markAsSeen = useCallback((id: string) => {
        seenIdsRef.current.add(id);
        setNewLeads(prev => prev.filter(lead => lead.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        newLeads.forEach(lead => seenIdsRef.current.add(lead.id));
        setNewLeads([]);
    }, [newLeads]);

    return (
        <NotificationContext.Provider value={{ newLeads, totalPending, lastChecked, markAsSeen, clearAll }}>
            {children}
        </NotificationContext.Provider>
    );
}
