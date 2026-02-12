'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PreloaderContextType {
    isPreloaderDone: boolean;
    setPreloaderDone: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
    isPreloaderDone: false,
    setPreloaderDone: () => { },
});

export function PreloaderProvider({ children }: { children: ReactNode }) {
    const [isPreloaderDone, setIsPreloaderDone] = useState(false);
    return (
        <PreloaderContext.Provider value={{
            isPreloaderDone,
            setPreloaderDone: () => setIsPreloaderDone(true)
        }}>
            {children}
        </PreloaderContext.Provider>
    );
}

export function usePreloader() {
    return useContext(PreloaderContext);
}
