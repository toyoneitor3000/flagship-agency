'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PurrpurrLoader } from '@/components/purrpurr/PurrpurrLoader';

export const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Force a minimum loading time to show the branding and prevent flashing
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds minimum boot time

        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) return <div className="fixed inset-0 z-[9999] bg-zinc-950" />; // Return static black screen for SSR

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center pointer-events-none"
                >
                    <div className="scale-150">
                        <PurrpurrLoader />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
