'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

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
    const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if user is admin
    useEffect(() => {
        // List of admin emails
        const adminEmails = ['camilotoloza1136@gmail.com', 'purrpurrdev@gmail.com', 'purpuregamechanger@gmail.com'];
        setIsAdmin(adminEmail ? adminEmails.includes(adminEmail) : false);
    }, [adminEmail]);

    // Play notification sound
    const playNotificationSound = useCallback(() => {
        try {
            // Create a simple beep using Web Audio API
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);

            // Second beep
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
        } catch (e) {
            console.log('Could not play notification sound:', e);
        }
    }, []);

    // Fetch new leads
    const fetchLeads = useCallback(async () => {
        if (!isAdmin) return;

        try {
            const res = await fetch('/api/demo/leads?status=pending');

            // Defensive check: ensure response is JSON
            if (!res.ok) {
                const text = await res.text();
                console.error(`[NotificationProvider] API Error (${res.status} ${res.statusText}): Expected JSON but got ${res.headers.get('content-type')}. URL: ${res.url}. Preview: ${text.substring(0, 100)}`);
                return;
            }

            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text();
                console.error(`[NotificationProvider] Format Error: Expected JSON but got ${contentType || 'unknown'}. URL: ${res.url}. Status: ${res.status}. Preview: ${text.substring(0, 100)}`);
                return;
            }

            const data = await res.json();

            if (data.success) {
                setTotalPending(data.metrics?.pending || 0);

                // Find truly new leads (not seen before)
                const pendingLeads = data.demos || [];
                const newUnseenLeads = pendingLeads.filter(
                    (lead: DemoLead) => !seenIds.has(lead.id)
                );

                // If there are new leads we haven't notified about
                if (newUnseenLeads.length > 0 && lastChecked !== null) {
                    // Check if any are actually new (created after last check)
                    const recentLeads = newUnseenLeads.filter((lead: DemoLead) => {
                        const leadTime = new Date(lead.createdAt).getTime();
                        const checkTime = lastChecked.getTime();
                        return leadTime > checkTime - 60000; // Within last minute
                    });

                    if (recentLeads.length > 0) {
                        setNewLeads(recentLeads);
                        playNotificationSound();
                    }
                }

                setLastChecked(new Date());
            }
        } catch (error) {
            console.error('Error fetching leads for notifications:', error);
        }
    }, [isAdmin, seenIds, lastChecked, playNotificationSound]);

    // Poll for new leads
    useEffect(() => {
        if (!isAdmin) return;

        // Initial fetch
        fetchLeads();

        // Poll every 10 seconds
        const interval = setInterval(fetchLeads, 10000);

        return () => clearInterval(interval);
    }, [isAdmin, fetchLeads]);

    const markAsSeen = useCallback((id: string) => {
        setSeenIds(prev => new Set([...prev, id]));
        setNewLeads(prev => prev.filter(lead => lead.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        const allIds = newLeads.map(lead => lead.id);
        setSeenIds(prev => new Set([...prev, ...allIds]));
        setNewLeads([]);
    }, [newLeads]);

    return (
        <NotificationContext.Provider value={{ newLeads, totalPending, lastChecked, markAsSeen, clearAll }}>
            {children}
        </NotificationContext.Provider>
    );
}
