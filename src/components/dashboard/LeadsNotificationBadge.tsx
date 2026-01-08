'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useSession } from 'next-auth/react';

// Admin emails that can see notifications
const ADMIN_EMAILS = ['purrpurrdev@gmail.com', 'camilotoloza1136@gmail.com'];

export function LeadsNotificationBadge() {
    const { data: session, status } = useSession();
    const [newLeads, setNewLeads] = useState(0);
    const [totalPending, setTotalPending] = useState(0);

    const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

    useEffect(() => {
        if (!isAdmin) return;

        const fetchNewLeads = async () => {
            try {
                const res = await fetch('/api/demo/leads');
                const data = await res.json();
                if (data.success) {
                    setNewLeads(data.newLeads || 0);
                    setTotalPending(data.metrics?.pending || 0);
                }
            } catch (error) {
                console.error('Error fetching leads count:', error);
            }
        };

        fetchNewLeads();

        // Poll every 30 seconds for new leads
        const interval = setInterval(fetchNewLeads, 30000);
        return () => clearInterval(interval);
    }, [isAdmin]);

    // Don't render if not admin or still loading session
    if (status === 'loading' || !isAdmin) {
        return null;
    }

    return (
        <Link
            href="/dashboard/leads"
            className="relative p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/10 transition-colors group"
            title={`${totalPending} solicitudes pendientes`}
        >
            <Bell className={`w-5 h-5 ${newLeads > 0 ? 'text-purple-400' : 'text-zinc-400'} group-hover:text-white transition-colors`} />
            {totalPending > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-5 h-5 px-1 ${newLeads > 0 ? 'bg-purple-600 animate-pulse' : 'bg-zinc-600'} text-white text-xs font-bold rounded-full flex items-center justify-center`}>
                    {totalPending > 99 ? '99+' : totalPending}
                </span>
            )}
        </Link>
    );
}
