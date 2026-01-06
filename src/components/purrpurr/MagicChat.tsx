'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2, MessageSquare, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generateDesignFromInput } from '@/lib/mock-ai';

interface MagicChatProps {
    onUpdate?: (theme?: any) => void;
}

export const MagicChat = ({ onUpdate }: MagicChatProps) => {
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const router = useRouter();

    // Debounce timer
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // AI Logic (Moved out of submit for reuse)
    const generateBluePrint = (text: string) => {
        // Use the Universal Generative Engine instead of hardcoded keywords
        const result = generateDesignFromInput(text);

        if (!result) return { updates: {}, theme: null };

        return result;
    };

    const handleRealTimeUpdate = async (value: string) => {
        if (!value.trim()) {
            setResponse(null); // Clear response if input is empty
            setIsGenerating(false);
            return;
        }

        setIsGenerating(true);
        const { updates, theme } = generateBluePrint(value);

        // 1. Immediate Client-Side Preview (Fast)
        if (theme && onUpdate) onUpdate(theme);

        // 2. Persist to Server (Debounced checks passed, now execute)
        if (updates && Object.keys(updates).length > 0) {
            try {
                // Parallelize requests for speed
                const promises = Object.entries(updates).map(([k, v]) =>
                    fetch('/api/magic/update', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key: k, value: v })
                    })
                );
                await Promise.all(promises);

                // Refresh content to ensure sync
                if (onUpdate) onUpdate(theme);
                router.refresh();
                setResponse("LIVE_PREVIEW_ACTIVE");
            } catch (e) {
                console.error(e);
                setResponse("Connection interrupted. Try again.");
            }
        }
        setIsGenerating(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInput(val);

        // Clear previous timer
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Set new timer (600ms debounce for natural feel)
        debounceRef.current = setTimeout(() => {
            handleRealTimeUpdate(val);
        }, 600);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Force immediate update on Enter
        if (debounceRef.current) clearTimeout(debounceRef.current);
        handleRealTimeUpdate(input);
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative z-50">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-zinc-950/90 border border-zinc-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                    <div className="pl-4 pr-2">
                        <div className="p-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
                            <Terminal className="w-4 h-4 text-purple-400" />
                        </div>
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type to visualize... (e.g. 'Eco Friendly Plant Shop')"
                        className="flex-grow bg-transparent border-none text-white placeholder-zinc-500 focus:outline-none focus:ring-0 font-mono text-sm py-3 px-2"
                    />
                    <div className="pr-4">
                        {isGenerating ? (
                            <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
                        ) : (
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                        )}
                    </div>
                </div>
            </form>

            <AnimatePresence>
                {response === "LIVE_PREVIEW_ACTIVE" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 text-center"
                    >
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
                            <Sparkles className="w-3 h-3 text-purple-500" />
                            AI RENDERING LIVE...
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
