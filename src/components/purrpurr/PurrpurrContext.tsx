'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// --- TYPES ---
export type PurrpurrRole = 'concierge' | 'engineer' | 'critic' | 'muse' | 'guardian';
export type PurrpurrMood = 'happy' | 'thinking' | 'worried' | 'glitch' | 'sleeping';

interface PurrpurrState {
    role: PurrpurrRole;
    mood: PurrpurrMood;
    message: string;
    isVisible: boolean;
    setMood: (mood: PurrpurrMood) => void;
    setMessage: (msg: string) => void;
}

// --- CONTEXT ---
const PurrpurrContext = createContext<PurrpurrState | undefined>(undefined);

// --- PROVIDER ---
export const PurrpurrProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // Internal State
    const [role, setRole] = useState<PurrpurrRole>('concierge');
    const [mood, setMood] = useState<PurrpurrMood>('happy');
    const [message, setMessage] = useState<string>('System initialized.');
    const [isVisible, setIsVisible] = useState<boolean>(true);

    // --- BRAIN: Context Awareness Logic ---
    useEffect(() => {
        // Reset state on navigation
        handleNavigation(pathname);
    }, [pathname]);

    // --- IDLE SYSTEMS (The "Ghost" in the Machine) ---
    // Make the Nexus (Concierge) feel alive by cycling statuses when idle
    useEffect(() => {
        if (role !== 'concierge') return;

        const statuses = [
            'System operational. Explorando el Portafolio.',
            'Analizando Mecánica Digital: Red de alto rendimiento.',
            '¿Sabías que cada proyecto es un mundo optimizado?',
            'Transformando legado en infraestructura moderna.',
            'Monitoreando conversiones y flujos de usuario...',
            'Ingeniería DNA: Precisión en cada línea de código.',
            'Preparando previsualización gratuita de 24 horas.'
        ];

        let index = 0;
        const interval = setInterval(() => {
            // Only cycle if mood is 'sleeping' or 'happy' (idle states)
            if (mood === 'happy' || mood === 'sleeping') {
                index = (index + 1) % statuses.length;
                setMessage(statuses[index]);
            }
        }, 8000); // Change every 8 seconds

        return () => clearInterval(interval);
    }, [role, mood]);

    const handleNavigation = (path: string) => {
        // 1. Determine Role based on Path
        if (path === '/purrpurr-test') {
            setRole('concierge');
            setMessage('Purrpurr.Labs Nexus. Select a module to begin.');
            setMood('happy');
        }
        else if (path === '/inertia-engine') {
            setRole('engineer');
            setMessage('Physics Engine loaded. Monitoring particle density...');
            setMood('thinking');
        }
        else if (path === '/typography-test') {
            setRole('critic');
            setMessage('Analyzing font legibility and contrast ratios.');
            setMood('thinking');
        }
        else if (path === '/wallpaper-test') {
            setRole('muse');
            setMessage('Generative canvas ready. Awaiting creative input.');
            setMood('happy');
        }
        else if (path.includes('/academy')) {
            setRole('concierge');
            setMessage('Welcome to the Academy. Ready to learn?');
            setMood('happy');
        }
        else {
            // Default / Home
            setRole('concierge');
            setMessage('Purrpurr System online.');
            setMood('sleeping');
        }
    };

    const value = {
        role,
        mood,
        message,
        isVisible,
        setMood,
        setMessage,
    };

    return (
        <PurrpurrContext.Provider value={value}>
            {children}
            {/* 
                We can optionally mount a Global Guide here if we want it persistent across all pages,
                or leave it to manual placement in pages.
                For now, we just provide the "Brain".
            */}
        </PurrpurrContext.Provider>
    );
};

// --- HOOK ---
export const usePurrpurr = () => {
    const context = useContext(PurrpurrContext);
    if (context === undefined) {
        throw new Error('usePurrpurr must be used within a PurrpurrProvider');
    }
    return context;
};
