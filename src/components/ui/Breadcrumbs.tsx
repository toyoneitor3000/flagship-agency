'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Breadcrumbs = ({ className }: { className?: string }) => {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(Boolean);

    // Hide on deployed site pages (/sites/[slug])
    const isSiteViewPage = pathname.startsWith('/sites/') && pathname !== '/sites/';
    if (isSiteViewPage) return null;

    if (paths.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-2 font-mono text-xs md:text-sm", className)}>
            <Link
                href="/"
                className="text-zinc-500 hover:text-green-400 transition-colors flex items-center"
            >
                <Home className="w-3 h-3 md:w-4 md:h-4" />
            </Link>

            {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join('/')}`;
                const isLast = index === paths.length - 1;

                // Capitalize first letter and replace hyphens with spaces
                const label = path
                    .replace(/-/g, ' ')
                    .replace(/^\w/, (c) => c.toUpperCase());

                return (
                    <React.Fragment key={path}>
                        <ChevronRight className="w-3 h-3 text-zinc-600" />

                        {isLast ? (
                            <span className="text-green-500 font-semibold" aria-current="page">
                                {label}
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                {label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};
