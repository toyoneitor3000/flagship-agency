'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const ThemeColorManager = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Define theme colors for specific routes
        const themeColors: Record<string, string> = {
            default: '#0f0033', // Dark Purple
            '/contact': '#f0ffcc', // Light Cream
            '/purrpurr-test': '#f0ffcc', // Labs might be light (adjust if needed)
            // Add other light routes here
        };

        // Determine target color
        // Check for exact match or potentially startsWith if we have sub-sections
        const targetColor = themeColors[pathname] || themeColors.default;

        // Update the meta tag
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', targetColor);
        } else {
            // Create if it doesn't exist (though layout usually has it)
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = targetColor;
            document.head.appendChild(meta);
        }

    }, [pathname]);

    return null;
};
