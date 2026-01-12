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

    return (
        <main className="flex-grow">
            {!isHomePage && (
                <div className="container mx-auto px-4 pt-16 pb-2 md:px-6">
                    <Breadcrumbs />
                </div>
            )}
            {children}
        </main>
    );
};
