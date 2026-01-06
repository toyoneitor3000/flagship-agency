'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Cpu, Eye, Zap, Terminal, Activity, AlertTriangle,
    CheckCircle, Play, Fingerprint, User, MessageSquare
} from 'lucide-react';

import { PurrpurrGuide } from '@/components/purrpurr/PurrpurrGuide';
import { PurrpurrSuccess } from '@/components/purrpurr/PurrpurrSuccess';
import { PurrpurrGlitch } from '@/components/purrpurr/PurrpurrGlitch';
import { PurrpurrLoader } from '@/components/purrpurr/PurrpurrLoader';
import { PurrpurrInvestigator } from '@/components/purrpurr/PurrpurrInvestigator';
import FluidBackground from '@/components/creative/FluidBackground';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';

export default function IdentityAgentsPage() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorTrigger, setErrorTrigger] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans relative overflow-hidden selection:bg-purple-500/30" data-section-theme='dark'>

            {/* ATMOSPHERE */}
            <FluidBackground
                config={{ ...FLUID_PRESET_PURRPURR.config, stiffness: 20 }}
                colors={{ color1: '#1e1b4b', color2: '#09090b', color3: '#4c1d95' }}
                speed={0.001}
                force={1}
                className="absolute z-0 opacity-50"
            />

            {/* STATUS BAR */}
            <div className='fixed top-[70px] left-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100/5'>
                <div className='max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-[10px] md:text-xs font-mono tracking-widest uppercase text-zinc-500'>
                    <div className='flex items-center gap-4'>
                        <span className='text-purple-500'>// PURRPURR_LABS</span>
                        <div className='h-3 w-px bg-zinc-800' />
                        <nav className='flex items-center gap-4'>
                            <Link href="/purrpurr-test" className='text-zinc-100 hover:text-purple-400 transition-colors'>&lt; RETURN_ROOT</Link>
                            <span className='text-zinc-600'>|</span>
                            <span className='text-purple-400 cursor-default'>04_IDENTITY_AGENTS</span>
                        </nav>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span>AGENTS_ACTIVE</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 space-y-20">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                            Identity<span className="text-purple-500">.Agents</span>
                        </h1>
                        <p className="text-zinc-400 max-w-xl text-lg font-light">
                            Autonomous micro-interactions and brand personification modules.
                            These agents handle system feedback, loading states, and user guidance.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowSuccess(true)}
                            className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-full flex items-center gap-2 hover:bg-zinc-800 transition-colors"
                        >
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono font-bold">TEST_SUCCESS</span>
                        </button>
                    </div>
                </div>

                {/* 1. CORE AGENTS */}
                <section>
                    <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <User className="w-4 h-4" /> Core_Personnel
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* LOADER */}
                        <div className="bg-zinc-900/40 backdrop-blur border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group">
                            <div className="p-6 h-64 flex flex-col items-center justify-center relative bg-black/20">
                                <PurrpurrLoader />
                                <div className="absolute bottom-4 text-[10px] font-mono text-zinc-600 animate-pulse">PROCESSING_DATA...</div>
                            </div>
                            <div className="p-6 border-t border-white/5 bg-zinc-950/30">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-white">The Loader</h3>
                                    <Cpu className="w-4 h-4 text-purple-500" />
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    Endless runner state. Handles perceived wait times with kinetic energy.
                                </p>
                                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center bg-purple-900/5 -mx-6 -mb-6 p-4">
                                    <span className="text-[10px] font-mono text-zinc-500">REF: SYS_LOAD_01</span>
                                    <Link href="/purrpurr-test/slow" className="text-xs text-purple-400 hover:text-white flex items-center gap-1">
                                        STRESS_TEST <Play className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* INVESTIGATOR */}
                        <div className="bg-zinc-900/40 backdrop-blur border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group">
                            <div className="p-6 h-64 flex flex-col items-center justify-center relative bg-black/20">
                                <div className="scale-75">
                                    <PurrpurrInvestigator />
                                </div>
                            </div>
                            <div className="p-6 border-t border-white/5 bg-zinc-950/30">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-white">The Agent</h3>
                                    <Eye className="w-4 h-4 text-blue-500" />
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    Specialist in missing content (404) and empty search results.
                                </p>
                            </div>
                        </div>

                        {/* GLITCH */}
                        <div className="bg-zinc-900/40 backdrop-blur border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all group">
                            <div className="p-6 h-64 flex flex-col items-center justify-center relative bg-black/20">
                                <PurrpurrGlitch />
                                <span className="mt-8 font-mono text-xs text-zinc-600 tracking-widest">SYSTEM_ERROR</span>
                            </div>
                            <div className="p-6 border-t border-white/5 bg-zinc-950/30">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-white">The Glitch</h3>
                                    <Zap className="w-4 h-4 text-emerald-500" />
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    Visual distortion for technical branding and error states.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 2. GUIDE INTERACTION */}
                <section>
                    <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Interaction_Models
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Contextual */}
                        <div className="bg-zinc-900/20 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20"><Terminal className="w-12 h-12" /></div>
                            <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 font-bold mb-8">Contextual Guidance</h3>

                            <div className="flex items-center gap-4">
                                <div className="h-10 w-32 bg-zinc-800 rounded animate-pulse" />
                                <PurrpurrGuide mode="contextual" tip="Pointing out key features." />
                            </div>
                        </div>

                        {/* Tour */}
                        <div className="bg-zinc-900/20 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20"><Fingerprint className="w-12 h-12" /></div>
                            <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 font-bold mb-8">Onboarding Tour</h3>

                            <div className="flex items-center gap-4">
                                <span className="font-mono text-xs text-zinc-500">Step 3/5</span>
                                <PurrpurrGuide mode="tour" tip="Click to proceed." />
                            </div>
                        </div>

                        {/* Error Trigger */}
                        <div className="bg-zinc-900/20 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20"><AlertTriangle className="w-12 h-12 text-red-500" /></div>
                            <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400 font-bold mb-8">Critical Error</h3>

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setErrorTrigger(!errorTrigger)}
                                    className="px-4 py-2 text-xs font-mono border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition-colors"
                                >
                                    SIMULATE_FAILURE
                                </button>
                                <PurrpurrGuide mode="error" isVisible={errorTrigger} tip="Connection lost!" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* MODALS */}
                <AnimatePresence>
                    {showSuccess && (
                        <PurrpurrSuccess
                            message="Integration successful. Agent ready."
                            onDismiss={() => setShowSuccess(false)}
                        />
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
