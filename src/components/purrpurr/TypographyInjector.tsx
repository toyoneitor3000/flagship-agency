'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fontVariableNames } from '@/lib/fonts';
import { DEFAULT_TYPOGRAPHY_SETTINGS } from '@/config/typography';

export const TypographyInjector = () => {
    const pathname = usePathname();

    const applySystemFonts = () => {
        // Read Configuration
        const displayFont = localStorage.getItem('purrpurr_sys_display') || DEFAULT_TYPOGRAPHY_SETTINGS.displayFont;
        const pFont = localStorage.getItem('purrpurr_sys_p') || DEFAULT_TYPOGRAPHY_SETTINGS.pFont;
        const displayTracking = localStorage.getItem('purrpurr_sys_display_tracking') || DEFAULT_TYPOGRAPHY_SETTINGS.displayTracking;
        const displayLeading = localStorage.getItem('purrpurr_sys_display_leading') || DEFAULT_TYPOGRAPHY_SETTINGS.displayLeading;

        // Resolve CSS Variables
        const displayVarName = fontVariableNames[displayFont] || '--font-space-grotesk';
        const pVarName = fontVariableNames[pFont] || '--font-inter';

        const displayVar = `var(${displayVarName})`;
        const pVar = `var(${pVarName})`;

        // Target Elements
        const root = document.documentElement;
        const body = document.body;

        // Helper to set important styles
        const setStyle = (property: string, value: string) => {
            root.style.setProperty(property, value, 'important');
            body.style.setProperty(property, value, 'important');
        };

        // 1. Override Global Typography Variables
        setStyle('--font-space', displayVar);
        setStyle('--font-sans', pVar);
        setStyle('--purrpurr-display', displayVar);
        setStyle('--purrpurr-sans', pVar);

        // 2. Metrics (Tracking / Leading)
        if (displayTracking) {
            setStyle('--display-tracking', `${displayTracking}em`);
        }
        if (displayLeading) {
            setStyle('--display-leading', displayLeading);
        }

        // 3. Force Class Overrides (Manually injecting style for classes that keys off variables)
        // Since we can't easily override .className styles via inline styles on the ELEMENT (unless we put it on every element),
        // we keep ONE style tag for the class-based overrides, but we make it very specific.
        let styleEl = document.getElementById('purrpurr-class-overrides');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'purrpurr-class-overrides';
            document.head.appendChild(styleEl);
        }

        styleEl.textContent = `
            .font-display {
                font-family: var(--purrpurr-display) !important;
                letter-spacing: var(--display-tracking) !important;
                line-height: var(--display-leading) !important;
            }
            .font-sans, body {
                font-family: var(--purrpurr-sans) !important;
            }
        `;

        console.log('Purrpurr Injector: Applied', { displayFont, pFont });
    };

    useEffect(() => {
        // Apply immediately
        applySystemFonts();

        // Listeners
        window.addEventListener('storage', applySystemFonts);
        window.addEventListener('purrpurr-sys-update', applySystemFonts);

        return () => {
            window.removeEventListener('storage', applySystemFonts);
            window.removeEventListener('purrpurr-sys-update', applySystemFonts);
        };
    }, [pathname]);

    return null;
};
