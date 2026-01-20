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
    tip?: string;
    mode?: GuideMode;
    isVisible?: boolean; // Useful for error mode trigger
    onNext?: () => void; // For tour mode
    cta?: {
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'whatsapp';
    } | {
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'whatsapp';
    }[];
    className?: string; // Allow custom positioning overrides
}


import { usePurrpurr } from './PurrpurrContext';

export const PurrpurrGuide = ({ tip, mode = 'contextual', isVisible = true, onNext, cta, className }: PurrpurrGuideProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasIntroShown, setHasIntroShown] = useState(false);

    // Connect to Brain
    const { role, message: contextMessage } = usePurrpurr();

    // Logic: Props > Context > Default
    const displayTip = tip || contextMessage;

    // Map Roles to Labels
    const getRoleLabel = () => {
        if (mode === 'error') return 'SYSTEM_ALERT';

        switch (role) {
            case 'engineer': return 'TELEMETRY_OPS';
            case 'critic': return 'DESIGN_GUARD';
            case 'muse': return 'CREATIVE_CORE';
            case 'guardian': return 'SYSTEM_DEFENSE';
            case 'concierge':
            default: return 'Purrpurr';
        }
    };

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
                // Override standard intro to bottom-right as requested by user preference, 
                // but keep the logic flexible if we want center later.
                // For now, let's keep it consistent with the "floating" feeling if it serves as a guide.
                return "fixed bottom-8 right-8 z-[100]";
            case 'contextual':
            case 'error':
            case 'tour':
            default:
                return "relative inline-block z-40 group";
        }
    };

    const getButtonClasses = () => {
        const base = "relative flex items-center justify-center transition-transform z-50";
        if (mode === 'error') return cn(base, "w-16 h-16 rounded-full bg-red-950/90 border-2 border-red-500 hover:border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)] backdrop-blur-sm");
        return cn(base, "w-auto h-auto");
    };

    return (
        <div className={cn(getPositionClasses(), className)}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setIsOpen(!isOpen)}
                className={getButtonClasses()}
            >
                <motion.div
                    className="relative w-20 h-24"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src="/assets/purrpurr/guide.png"
                        alt="Purrpurr Guide"
                        fill
                        unoptimized
                        className={cn(
                            "object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]",
                            mode === 'error' && "grayscale sepia hue-rotate-[320deg] saturate-200"
                        )}
                    />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className={cn(
                            "absolute w-72 bg-zinc-900/95 border p-4 rounded-xl shadow-xl backdrop-blur-md z-[60]",
                            mode === 'floating' || mode === 'intro'
                                ? "bottom-full mb-4 right-0" // Always pop up above the float
                                : "bottom-full mb-4 left-1/2 -translate-x-1/2",


                            mode === 'error' ? "border-red-500/50" : "border-purple-500/50"
                        )}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className={cn("w-2 h-2 rounded-full animate-pulse", mode === 'error' ? "bg-red-500" : "bg-emerald-500")}></div>
                            <div className={cn("text-xs font-mono uppercase tracking-wider", mode === 'error' ? "text-red-300" : "text-purple-300")}>
                                {getRoleLabel()}
                            </div>
                        </div>

                        <p className="text-sm text-zinc-100 leading-relaxed mb-3 font-medium">{displayTip}</p>

                        {/* CTA Buttons */}
                        {cta && (
                            <div className="space-y-2">
                                {(Array.isArray(cta) ? cta : [cta]).map((btn, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsOpen(false);
                                            btn.onClick();
                                        }}
                                        className={cn(
                                            "w-full text-white text-xs font-bold py-2 px-3 rounded shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group/btn",
                                            btn.variant === 'whatsapp'
                                                ? "bg-[#25D366] hover:bg-[#20BD5A] shadow-[#25D366]/20"
                                                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-900/20"
                                        )}
                                    >
                                        <span>{btn.label}</span>
                                        <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                                    </button>
                                ))}
                            </div>
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
                            mode === 'floating' || mode === 'intro'
                                ? "bottom-[-6px] right-8"
                                : "bottom-[-6px] left-1/2 -translate-x-1/2",
                            mode === 'error' ? "border-red-500/50" : "border-purple-500/50"
                        )}></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
