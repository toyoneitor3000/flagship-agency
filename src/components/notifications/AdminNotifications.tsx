'use client';

import { useSession } from 'next-auth/react';
import { NotificationProvider, NotificationToast } from '@/components/notifications';

interface AdminNotificationsProps {
    children: React.ReactNode;
}

export function AdminNotifications({ children }: AdminNotificationsProps) {
    const { data: session } = useSession();

    return (
        <NotificationProvider adminEmail={session?.user?.email || undefined}>
            {children}
            <NotificationToast />
        </NotificationProvider>
    );
}
