'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from './Breadcrumbs';

interface MainWrapperProps {
    children: React.ReactNode;
}

/**
 * Smart main wrapper that adjusts its styling based on the current route.
 * For deployed sites (/sites/[slug]), it removes padding and breadcrumbs container.
 */
export const MainWrapper = ({ children }: MainWrapperProps) => {
    const pathname = usePathname();

    // Check if we're viewing a deployed site
    const isSiteViewPage = pathname.startsWith('/sites/') && pathname !== '/sites/';

    if (isSiteViewPage) {
        // Clean layout for deployed sites - no padding, no breadcrumbs container
        return (
            <main className="flex-grow">
                {children}
            </main>
        );
    }

    // Standard layout for purrpurr.dev pages
    const isHomePage = pathname === '/';
    const isLabPage = pathname.startsWith('/lab');

    const paths = pathname.split('/').filter(Boolean);
    const hasPath = paths.length > 0;

    return (
        <main className="flex-grow">
            {hasPath && (
                <div className="fixed top-14 left-0 right-0 z-[90] bg-zinc-950/10 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                    <div className="container mx-auto px-4 py-2 md:px-6">
                        <Breadcrumbs />
                    </div>
                </div>
            )}
            <div className={hasPath ? "pt-24" : ""}>
                {children}
            </div>
        </main>
    );
};
