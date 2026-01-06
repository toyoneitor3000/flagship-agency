'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check, Zap, Copy, ExternalLink, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ProjectData {
    category: string;
    name: string;
    logoUrl: string;
    fontStyle: string;
    description: string;
    location: string;
    whatsapp: string;
    complexity: string;
}

export const CheckoutBar = ({ isVisible, projectData, editingSlug }: { isVisible: boolean; projectData: ProjectData; editingSlug?: string }) => {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [projectUrl, setProjectUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleDeploy = async () => {
        setStatus('processing');

        try {
            // 1. Send data to the Core (Backend)
            // Include editingSlug to tell the API to UPDATE instead of CREATE
            const response = await fetch('/api/purrpurr/deploy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...projectData, editingSlug })
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');

                // GENERATE LINK: Automatically detects localhost vs production
                const baseUrl = window.location.origin;
                const link = `${baseUrl}/sites/${data.projectSlug}`;
                setProjectUrl(link);

                // Allow user to see the success state before redirecting (or offering options)
            } else {
                console.error("Deploy failed", data.error);
                setStatus('idle'); // Allow retry
                alert("Error al guardar el proyecto. Intenta de nuevo.");
            }

        } catch (error) {
            console.error("Network error", error);
            setStatus('idle');
        }
    };

    const copyToClipboard = () => {
        if (projectUrl) {
            navigator.clipboard.writeText(projectUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const openProject = () => {
        if (projectUrl) {
            window.open(projectUrl, '_blank');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center pointer-events-none"
                >
                    <div className="pointer-events-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-2 pl-4 flex items-center gap-6 max-w-xl w-full ring-1 ring-white/10">

                        {/* Status/Price Section */}
                        <div className="flex flex-col">
                            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Status</span>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-sm font-bold ${status === 'success' ? 'text-emerald-400' : 'text-zinc-200'}`}>
                                    {status === 'success' ? 'READY TO LAUNCH' : 'DRAFT MODE'}
                                </span>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-zinc-800" />

                        {status !== 'success' ? (
                            <button
                                onClick={handleDeploy}
                                disabled={status !== 'idle'}
                                className="flex-grow group relative overflow-hidden rounded-xl bg-white text-black font-bold text-sm h-12 flex items-center justify-center transition-all hover:bg-zinc-200 disabled:opacity-90 disabled:cursor-wait"
                            >
                                <AnimatePresence mode='wait'>
                                    {status === 'idle' && (
                                        <motion.div
                                            key="idle"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <span>GENERATE PREVIEW LINK</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </motion.div>
                                    )}
                                    {status === 'processing' && (
                                        <motion.div
                                            key="processing"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Zap className="w-4 h-4 animate-spin text-purple-600 fill-current" />
                                            <span>COMPILING ASSETS...</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        ) : (
                            <div className="flex-grow flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className="flex-1 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors relative overflow-hidden"
                                >
                                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                    <span>{copied ? 'COPIED!' : 'COPY LINK'}</span>
                                </button>
                                <button
                                    onClick={openProject}
                                    className="flex-[2] bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>OPEN PROJECT</span>
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
