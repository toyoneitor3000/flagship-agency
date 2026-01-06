'use client';

import React, { useState } from 'react';
import { useMagic } from '@/components/magic/MagicContext';
import { Lock, Unlock, Zap, Save, ChevronRight, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const CockpitDashboard = () => {
    const { isGodMode, toggleGodMode, content, updateContent, magicWord } = useMagic();
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState(false);

    // --- LOGIN SCREEN ---
    if (!isGodMode) {
        const handleLogin = (e: React.FormEvent) => {
            e.preventDefault();
            const success = toggleGodMode(passwordInput);
            if (!success) { // logic in context trusts client currently, but if we had validation:
                setError(true);
            }
            // In current context logic, it always returns true/void, but let's assume valid flow
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 font-mono">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

                    <div className="flex flex-col items-center gap-6 mb-8">
                        <div className="p-4 bg-zinc-950 rounded-full border border-zinc-800 shadow-inner">
                            <Lock className="w-8 h-8 text-zinc-500" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-white tracking-wider mb-2">ACCESS CONTROL</h1>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest">Restricted Area // Authorized Personnel Only</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="relative group">
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="ENTER MAGIC WORD"
                                className="w-full bg-zinc-950 text-center text-white p-4 rounded-lg border border-zinc-800 outline-none focus:border-indigo-500 transition-all font-bold tracking-widest placeholder:text-zinc-700 hover:border-zinc-700"
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide group"
                        >
                            <Unlock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Initialize Cockpit
                        </button>
                    </form>

                    {error && (
                        <p className="text-red-500 text-xs text-center mt-4 font-bold flex items-center justify-center gap-2">
                            <AlertCircle size={12} />
                            ACCESS DENIED
                        </p>
                    )}
                </motion.div>
            </div>
        );
    }

    // --- DASHBOARD SCREEN ---
    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-500/10 p-2 rounded text-indigo-400">
                            <Zap size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight">Purrpurr Cockpit</h1>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">System Online</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">
                            KEY: {magicWord.substring(0, 4)}...
                        </span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left: Navigation / Meta */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Architecture</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                                Correct your course. The content defined here propagates instantly across the entire edge network.
                            </p>

                            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
                                    <CheckCircle size={12} className="text-indigo-500" />
                                    SYNC STATUS
                                </h3>
                                <div className="space-y-2">
                                    <div className="h-1 w-full bg-zinc-800 rounded overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-full" />
                                    </div>
                                    <p className="text-[10px] text-zinc-500 font-mono text-right">ALL SYSTEMS OPERATIONAL</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-lg p-6">
                            <h3 className="text-indigo-400 font-bold mb-2">Pro Tip</h3>
                            <p className="text-sm text-indigo-200/60">
                                You can use HTML tags like &lt;br/&gt; or &lt;span&gt; in text fields for advanced formatting.
                            </p>
                        </div>
                    </div>

                    {/* Right: The Editor */}
                    <div className="lg:col-span-2 space-y-8 pb-20">
                        <ContentEditorRoot data={content} updateContent={updateContent} />
                    </div>
                </div>
            </main>
        </div>
    );
};

// Recursive Component for JSON Editing
const ContentEditorRoot = ({ data, updateContent }: { data: any, updateContent: any }) => {
    // We assume the root is an object. We iterate its keys.
    return (
        <div className="space-y-8">
            {Object.keys(data).map((key) => (
                <SectionNode
                    key={key}
                    label={key}
                    value={data[key]}
                    path={key}
                    updateContent={updateContent}
                />
            ))}
        </div>
    );
};

const SectionNode = ({ label, value, path, updateContent, level = 0 }: any) => {
    const isObject = typeof value === 'object' && value !== null && !Array.isArray(value); // content.json is simpler, mostly objects or strings
    const [isOpen, setIsOpen] = useState(true);

    if (isObject) {
        return (
            <div className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                level === 0 ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-950/50 border-zinc-800/50 mt-4 ml-4"
            )}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <span className={cn(
                            "font-mono text-xs uppercase tracking-widest px-2 py-1 rounded",
                            level === 0 ? "bg-indigo-500/20 text-indigo-300" : "bg-zinc-800 text-zinc-400"
                        )}>
                            {label}
                        </span>
                        <div className="h-px w-8 bg-zinc-800" />
                    </div>
                    {isOpen ? <ChevronDown size={16} className="text-zinc-500" /> : <ChevronRight size={16} className="text-zinc-500" />}
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-zinc-800/50"
                        >
                            <div className="p-4 space-y-4">
                                {Object.keys(value).map((childKey) => (
                                    <SectionNode
                                        key={childKey}
                                        label={childKey}
                                        value={value[childKey]}
                                        path={`${path}.${childKey}`}
                                        updateContent={updateContent}
                                        level={level + 1}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Leaf Node (String/Number)
    return (
        <FieldEditor label={label} value={value} path={path} updateContent={updateContent} />
    );
};

const FieldEditor = ({ label, value, path, updateContent }: any) => {
    const [localValue, setLocalValue] = useState(value);
    const [isDirty, setIsDirty] = useState(false);
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    // Sync if remote changes (and we aren't editing? Actually simple sync is safer for now)
    // But basic controlled input pattern:
    // If we want to allow typing without jitter, we keep local state.

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLocalValue(e.target.value);
        setIsDirty(true);
        setStatus('idle');
    };

    const handleBlur = () => {
        if (isDirty) {
            save();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            save();
        }
    };

    const save = async () => {
        if (!isDirty) return;
        setStatus('saving');
        await updateContent(path, localValue); // updateContent handles API and context update
        setStatus('saved');
        setIsDirty(false);
        setTimeout(() => setStatus('idle'), 2000);
    };

    const isLongText = typeof localValue === 'string' && localValue.length > 50;

    return (
        <div className="group relative">
            <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
                    {label}
                </label>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-zinc-700 font-mono">{path}</span>
                </div>
            </div>

            <div className="relative">
                {isLongText ? (
                    <textarea
                        value={localValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all min-h-[100px] resize-y font-mono"
                    />
                ) : (
                    <input
                        type="text"
                        value={localValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 focus:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all font-mono"
                    />
                )}

                {/* Status Indicator */}
                <div className="absolute bottom-3 right-3 pointer-events-none">
                    {status === 'saving' && <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />}
                    {status === 'saved' && <CheckCircle size={14} className="text-green-500" />}
                    {status === 'idle' && isDirty && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                </div>
            </div>
        </div>
    );
};
