
import { CockpitDashboard } from '@/components/magic/CockpitDashboard';
import { getMagicContent } from '@/lib/magic-server';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cockpit | Purrpurr Control',
    description: 'System Administration',
    robots: {
        index: false,
        follow: false,
    }
};

export default async function CockpitPage() {
    // Ensure we fetch fresh content on load
    const initialContent = await getMagicContent();

    return (
        <CockpitDashboard />
    );
}

// Ensure the page is not statically generated so authentication works correctly and content is fresh
export const dynamic = 'force-dynamic';
