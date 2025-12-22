'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper for conditional classes
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export type GuideMode = 'floating' | 'contextual' | 'intro' | 'error' | 'tour';

interface PurrpurrGuideProps {
    tip: string;
    mode?: GuideMode;
    isVisible?: boolean; // Useful for error mode trigger
    onNext?: () => void; // For tour mode
    cta?: {
        label: string;
        onClick: () => void;
    };
}

export const PurrpurrGuide = ({ tip, mode = 'contextual', isVisible = true, onNext, cta }: PurrpurrGuideProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasIntroShown, setHasIntroShown] = useState(false);

    // Auto-show for intro mode
    useEffect(() => {
        if (mode === 'intro' && !hasIntroShown) {
            setIsOpen(true);
            const timer = setTimeout(() => {
                setIsOpen(false);
                setHasIntroShown(true);
            }, 5000); // 5 seconds display
            return () => clearTimeout(timer);
        }
    }, [mode, hasIntroShown]);

    // Error mode trigger
    useEffect(() => {
        if (mode === 'error') {
            setIsOpen(isVisible);
        }
    }, [mode, isVisible]);

    // Styling configurations based on mode
    const getPositionClasses = () => {
        switch (mode) {
            case 'floating':
                return "fixed bottom-8 right-8 z-[100]";
            case 'intro':
                return "fixed top-20 left-1/2 -translate-x-1/2 z-[100]";
            case 'contextual':
            case 'error':
            case 'tour':
            default:
                return "relative inline-block z-40 group";
        }
    };

    const getButtonClasses = () => {
        const base = "relative flex items-center justify-center backdrop-blur-sm transition-all shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] z-50";
        if (mode === 'error') return cn(base, "w-16 h-16 rounded-full bg-red-950/90 border-2 border-red-500 hover:border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)]");
        return cn(base, "w-20 h-20 bg-zinc-950 rounded-full border-2 border-purple-500 hover:border-purple-400");
    };

    return (
        <div className={getPositionClasses()}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setIsOpen(!isOpen)}
                className={getButtonClasses()}
            >
                <div className="relative w-16 h-16">
                    <Image
                        src="/assets/purrpurr/guide.gif"
                        alt="Purrpurr Guide"
                        fill
                        unoptimized
                        className={cn(
                            "object-contain scale-125 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]",
                            mode === 'error' && "grayscale sepia hue-rotate-[320deg] saturate-200" // Red tint for error
                        )}
                    />
                </div>
                {/* Ping effect */}
                <div className={cn(
                    "absolute inset-0 rounded-full border opacity-0 animate-ping",
                    mode === 'error' ? "border-red-400" : "border-purple-400"
                )}></div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className={cn(
                            "absolute w-72 bg-zinc-900/95 border p-4 rounded-xl shadow-xl backdrop-blur-md z-[60]",
                            mode === 'floating' && "bottom-full mb-4 right-0",
                            mode === 'intro' && "top-full mt-4 left-1/2 -translate-x-1/2",
                            (mode === 'contextual' || mode === 'error' || mode === 'tour') && "bottom-full mb-4 left-1/2 -translate-x-1/2",
                            mode === 'error' ? "border-red-500/50" : "border-purple-500/50"
                        )}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className={cn("w-2 h-2 rounded-full animate-pulse", mode === 'error' ? "bg-red-500" : "bg-emerald-500")}></div>
                            <div className={cn("text-xs font-mono uppercase tracking-wider", mode === 'error' ? "text-red-300" : "text-purple-300")}>
                                {mode === 'error' ? 'SYSTEM_ALERT' : 'Purrpurr_AI'}
                            </div>
                        </div>

                        <p className="text-sm text-zinc-100 leading-relaxed mb-3 font-medium">{tip}</p>

                        {/* CTA Button */}
                        {cta && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    cta.onClick();
                                }}
                                className="w-full mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold py-2 px-3 rounded shadow-lg shadow-purple-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
                            >
                                <span>{cta.label}</span>
                                <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                            </button>
                        )}

                        {mode === 'tour' && onNext && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onNext(); }}
                                className="w-full mt-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1 rounded transition-colors"
                            >
                                Next Step &rarr;
                            </button>
                        )}

                        {/* Arrow */}
                        <div className={cn(
                            "absolute w-3 h-3 bg-zinc-900 border-b border-r transform rotate-45",
                            mode === 'floating' && "bottom-[-6px] right-8",
                            mode === 'intro' && "top-[-6px] left-1/2 -translate-x-1/2 rotate-[225deg]", // Arrow on top for intro
                            (mode === 'contextual' || mode === 'error' || mode === 'tour') && "bottom-[-6px] left-1/2 -translate-x-1/2",
                            mode === 'error' ? "border-red-500/50" : "border-purple-500/50"
                        )}></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
