'use client';

import { useEffect } from 'react';
import { fontMap, fontVariableNames } from '@/lib/fonts';

export const TypographyInjector = () => {
    useEffect(() => {
        const applySystemFonts = () => {
            // Read from LocalStorage
            const displayFont = localStorage.getItem('purrpurr_sys_display');
            const h1Font = localStorage.getItem('purrpurr_sys_h1'); // Not fully mapped yet, could map to generic Header variable
            const pFont = localStorage.getItem('purrpurr_sys_p');

            // Read Custom Metrics from LocalStorage
            const displayTracking = localStorage.getItem('purrpurr_sys_display_tracking');
            const displayLeading = localStorage.getItem('purrpurr_sys_display_leading');

            const target = document.body;

            // ... Font Family Logic ...

            // Apply Display Metrics
            if (displayTracking) {
                target.style.setProperty('--display-tracking', `${displayTracking}em`);
            }
            if (displayLeading) {
                target.style.setProperty('--display-leading', displayLeading);
            }

            // Apply Font Families (Existing Logic)
            const selectedDisplay = displayFont || 'Space Grotesk';
            const selectedP = pFont || 'Inter';

            if (fontVariableNames[selectedDisplay]) {
                target.style.setProperty('--font-space', `var(${fontVariableNames[selectedDisplay]})`);
            }
            if (fontVariableNames[selectedP]) {
                target.style.setProperty('--font-sans', `var(${fontVariableNames[selectedP]})`);
            }
        };

        // Apply on mount
        applySystemFonts();

        // Listen for storage events
        window.addEventListener('storage', applySystemFonts);
        // Listen for custom event
        window.addEventListener('purrpurr-sys-update', applySystemFonts);

        return () => {
            window.removeEventListener('storage', applySystemFonts);
            window.removeEventListener('purrpurr-sys-update', applySystemFonts);
        };
    }, []);

    return null;
};
