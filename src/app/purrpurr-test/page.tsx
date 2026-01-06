'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PurrpurrGuide } from '@/components/purrpurr/PurrpurrGuide';
import { PurrpurrSuccess } from '@/components/purrpurr/PurrpurrSuccess';
import FluidBackground from '@/components/creative/FluidBackground';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';
import { Cockpit } from '@/components/purrpurr/Cockpit';
import { MagicChat } from '@/components/purrpurr/MagicChat';
import { CheckoutBar } from '@/components/purrpurr/CheckoutBar';
import Link from 'next/link';
import {
    Activity, AlertTriangle, Play, CheckCircle,
    Wind, Type, Layers, User, Command
} from 'lucide-react';

import { usePurrpurr } from '@/components/purrpurr/PurrpurrContext';

export default function PurrpurrTestPage() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorTrigger, setErrorTrigger] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [content, setContent] = useState<any>(null);
    const [activeTheme, setActiveTheme] = useState<any>(null);

    // --- CONNECT TO NEXUS BRAIN ---
    const { setMessage, setMood } = usePurrpurr();

    const fetchContent = async (themeOverride?: any) => {
        if (themeOverride) {
            setActiveTheme(themeOverride);
        }
        try {
            const res = await fetch('/api/magic/content');
            const data = await res.json();
            setContent(data);
        } catch (e) {
            console.error("Failed to sync matrix", e);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    // React to Tab Changes
    useEffect(() => {
        if (activeTab === 'systems') {
            setMessage('Accessing Module Directory. 4 Systems Available.');
            setMood('thinking');
        } else if (activeTab === 'cockpit') {
            setMessage('AUTHENTICATING... ADMIN ACCESS GRANTED.');
            setMood('glitch');
        } else {
            setMessage('Dashboard Overview loaded.');
            setMood('happy');
        }
    }, [activeTab]);

    // Dynamic Content or Fallbacks
    const heroTitle = content?.hero?.title_1 || "Purrpurr";
    const heroDesc = content?.hero?.description || "Exploring the boundaries of UI physics, typography, and generative motion.";
    const heroPre = content?.hero?.title_2_pre || ".Labs";
    const heroPost = content?.hero?.title_2_post || "";

    // Visual logic
    const bgColors = activeTheme || {
        color1: '#27272a',
        color2: '#4c1d95',
        color3: '#18181b',
        color4: '#000000'
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans relative selection:bg-purple-500/30" data-section-theme='dark'>

            {/* --- HERO COVER SECTION (NETFLIX STYLE) --- */}
            <header className="relative w-full h-[55vh] flex items-end overflow-hidden border-b border-white/5">

                {/* 1. BACKGROUND LAYER (Restricted area for performance) */}
                <div className="absolute inset-0 z-0">
                    <FluidBackground
                        config={{ ...FLUID_PRESET_PURRPURR.config, stiffness: 40 }}
                        colors={bgColors}
                        speed={0.002}
                        force={1.5}
                        className="absolute w-full h-full"
                    />
                    {/* Gradient Fade to blend with content below - Adjusted for blend mode visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent z-10" />
                </div>

                {/* 2. HERO CONTENT LAYER */}
                <div className="relative z-20 container mx-auto px-4 pb-12 w-full h-full flex flex-col justify-end">
                    <div className="max-w-4xl mix-blend-difference mb-12">
                        {/* Status Tag */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="font-mono text-xs text-emerald-500 tracking-[0.2em] uppercase font-bold">System_Online</span>
                        </div>

                        {/* Massive Title */}
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
                            {heroTitle}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-400">
                                {heroPost ? ` ${heroPost}` : '.Labs'}
                            </span>
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Description */}
                            <p className="text-zinc-300 text-sm md:text-base font-mono opacity-90 leading-relaxed border-l-2 border-purple-500 pl-4 h-full flex items-center">
                                &gt; {heroDesc}
                            </p>

                            {/* CHAT INTERFACE - THE NEW ENTRY POINT */}
                            <div className="w-full">
                                <MagicChat onUpdate={fetchContent} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT DASHBOARD --- */}
            <div className="container mx-auto px-4 py-8 relative z-30">

                {/* NAVIGATION TABS */}
                <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-4">
                    <div className="flex gap-2 font-mono text-xs overflow-x-auto no-scrollbar">
                        {['all', 'systems', 'cockpit'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full border transition-all uppercase tracking-wider whitespace-nowrap text-[10px] font-bold ${activeTab === tab
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                    : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
                                    }`}
                            >
                                {tab === 'cockpit' ? 'COMMAND_CENTER' : tab}
                            </button>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${activeTab === 'cockpit' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`}></span>
                            {activeTab === 'cockpit' ? 'WRITE_ACCESS_GRANTED' : 'READ_ONLY_MODE'}
                        </span>
                    </div>
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-40">

                    {/* --- SYSTEMS --- */}
                    {(activeTab === 'all' || activeTab === 'systems') && (
                        <>
                            {/* PHYSICS ENGINE */}
                            <Link href="/creative-test" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(109,40,217,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><Wind className="w-6 h-6 text-purple-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                            <h3 className="font-mono text-[10px] text-purple-400 uppercase tracking-widest">Lab_01 / Physics</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Inertia Engine</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            High-performance fluid dynamics, magnetic cursors, and WebGL particle systems.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-purple-300 transition-colors uppercase tracking-wider">
                                        <span>Initialize_Simulation</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>

                            {/* TYPOGRAPHY */}
                            <Link href="/typography-test" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><Type className="w-6 h-6 text-emerald-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <h3 className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Lab_02 / Type</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Typography</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            Curated typeface catalog, scaling metrics, and optical readability tests.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-emerald-300 transition-colors uppercase tracking-wider">
                                        <span>View_Catalog</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>

                            {/* WALLPAPERS */}
                            <Link href="/wallpaper-test" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><Layers className="w-6 h-6 text-blue-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            <h3 className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">Lab_03 / Visuals</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Wallpapers</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            Generative background patterns, color logic, and noise textures.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-blue-300 transition-colors uppercase tracking-wider">
                                        <span>Open_Generator</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>

                            {/* IDENTITY AGENTS */}
                            <Link href="/purrpurr-test/identity" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(236,72,153,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><User className="w-6 h-6 text-pink-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                                            <h3 className="font-mono text-[10px] text-pink-400 uppercase tracking-widest">Lab_04 / Identity</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Identity Agents</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            The Purrpurr family: Loaders, Guides, Investigators, and Micro-interactions.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-pink-300 transition-colors uppercase tracking-wider">
                                        <span>Meet_The_Team</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        </>
                    )}

                </div>

                {/* --- COCKPIT --- */}
                {activeTab === 'cockpit' && (
                    <div className="col-span-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Cockpit />
                        </motion.div>
                    </div>
                )}

            </div>

            {/* INTRO GUIDE (Fleeting) - Moved to bottom to not block hero interaction if any */}
            <PurrpurrGuide
                mode="intro"
                className="!fixed !bottom-8 !right-8 !top-auto !left-auto !translate-x-0"
            />

            {/* CHECKOUT BAR - Appears when content is generated */}
            <CheckoutBar isVisible={!!content && content?.hero && JSON.stringify(content.hero) !== '{}'} />

            {/* GLOBAL SUCCESS MODAL */}
            <AnimatePresence>
                {showSuccess && (
                    <PurrpurrSuccess
                        message="Configuration saved to neural network."
                        onDismiss={() => setShowSuccess(false)}
                    />
                )}
            </AnimatePresence>

        </div>
    );
}
