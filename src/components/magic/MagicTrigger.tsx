'use client';

import { useState, useEffect } from 'react';
import { useMagic } from './MagicContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, X } from 'lucide-react';

export const MagicTrigger = () => {
    const { isGodMode, toggleGodMode } = useMagic();
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Shortcut: Ctrl + Shift + M
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'm') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we just set the secret. The API will validate it on the first save attempt.
        // But for UX, we might want to check against a hash if we cared more.
        // For now, any non-empty string activates the UI mode.
        if (password.length > 0) {
            toggleGodMode(password);
            setIsOpen(false);
            alert('✨ Magic Mode Activated! Click on text to edit.');
        } else {
            setError(true);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-zinc-900 border border-indigo-500/50 p-6 rounded-2xl w-full max-w-sm shadow-2xl shadow-indigo-500/20"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Wand2 className="text-indigo-500" /> Cast Spell
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-zinc-400 mb-1">
                                    MAGIC WORD
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(false);
                                    }}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="Enter secret..."
                                    autoFocus
                                />
                            </div>

                            {error && <p className="text-red-500 text-xs">Spell failed.</p>}

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/25"
                            >
                                Activate Creator Mode
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {isGodMode && (
                <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
                    <div className="bg-indigo-600/20 border border-indigo-500/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-indigo-200 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        MAGIC ACTIVE
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};
