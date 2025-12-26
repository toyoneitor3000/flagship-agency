'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type MagicContextType = {
    isGodMode: boolean;
    toggleGodMode: (secret: string) => boolean;
    content: any;
    updateContent: (key: string, value: string) => Promise<void>;
    magicWord: string;
};

const MagicContext = createContext<MagicContextType | undefined>(undefined);

export const MagicProvider = ({ children, initialContent }: { children: React.ReactNode; initialContent: any }) => {
    const [isGodMode, setIsGodMode] = useState(false);
    const [content, setContent] = useState(initialContent || {});
    const [magicWord, setMagicWord] = useState('');

    // Check storage on mount - DISABLED to hide UI
    // useEffect(() => {
    //     const storedSecret = localStorage.getItem('magic_secret');
    //     if (storedSecret) {
    //         setMagicWord(storedSecret);
    //         setIsGodMode(true);
    //     }
    // }, []);

    const toggleGodMode = (secret: string) => {
        // In a real app we would verify this against an API, but for now we trust the client logic 
        // and let the API reject the save if the secret is wrong.
        localStorage.setItem('magic_secret', secret);
        setMagicWord(secret);
        setIsGodMode(true);
        return true;
    };

    const updateContent = async (key: string, value: string) => {
        // 1. Optimistic update
        const keys = key.split('.');
        setContent((prev: any) => {
            const next = { ...prev };
            let current = next;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return next;
        });

        // 2. API Call
        try {
            const res = await fetch('/api/magic/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-magic-word': magicWord
                },
                body: JSON.stringify({ key, value })
            });

            if (!res.ok) {
                console.error('Failed to save magic content');
                // Revert? (Complex, skipping for prototype)
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <MagicContext.Provider value={{ isGodMode, toggleGodMode, content, updateContent, magicWord }}>
            {children}
        </MagicContext.Provider>
    );
};

export const useMagic = () => {
    const context = useContext(MagicContext);
    if (!context) throw new Error('useMagic must be used within a MagicProvider');
    return context;
};
