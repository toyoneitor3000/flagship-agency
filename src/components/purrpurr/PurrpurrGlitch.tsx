'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export const PurrpurrGlitch = () => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        // Random glitch effect loop
        const triggerGlitch = () => {
            setIsGlitching(true);
            // Glitch duration random between 100ms and 400ms
            const duration = 100 + Math.random() * 300;

            setTimeout(() => {
                setIsGlitching(false);
                // Schedule next glitch between 5s and 15s
                const nextDelay = 5000 + Math.random() * 10000;
                setTimeout(triggerGlitch, nextDelay);
            }, duration);
        };

        // Start initial timer
        const timer = setTimeout(triggerGlitch, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-8 h-8 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-help" title="System Monitor">
            {/* Base Image */}
            <div className={`relative w-full h-full ${isGlitching ? 'invisible' : 'visible'}`}>
                <Image
                    src="/assets/purrpurr/watcher.png"
                    alt="Purrpurr Watcher"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Glitch Overlay */}
            {isGlitching && (
                <div className="absolute inset-0 w-full h-full">
                    {/* Red Channel Shift */}
                    <div className="absolute inset-0 translate-x-[2px] opacity-70 mix-blend-screen animate-pulse">
                        <Image
                            src="/assets/purrpurr/watcher.png"
                            alt="Purrpurr Watcher Glitch Red"
                            fill
                            className="object-contain grayscale sepia hue-rotate-[-50deg] saturate-200"
                        />
                    </div>
                    {/* Blue Channel Shift */}
                    <div className="absolute inset-0 -translate-x-[2px] opacity-70 mix-blend-screen animate-pulse animation-delay-75">
                        <Image
                            src="/assets/purrpurr/watcher.png"
                            alt="Purrpurr Watcher Glitch Blue"
                            fill
                            className="object-contain grayscale sepia hue-rotate-[180deg] saturate-200"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
