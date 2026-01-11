'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PurrpurrGuide } from '@/components/purrpurr/PurrpurrGuide';
import { PurrpurrSuccess } from '@/components/purrpurr/PurrpurrSuccess';
import FluidBackground from '@/components/creative/FluidBackground';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';
import { Cockpit } from '@/components/purrpurr/Cockpit';
import Link from 'next/link';
import {
    Activity, AlertTriangle, Play, CheckCircle,
    Wind, Type, Layers, User, Command, Share2
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

            {/* --- HERO COVER SECTION --- */}
            <header className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">

                {/* 1. BACKGROUND LAYER (Luxury Animated Background) */}
                <div className="absolute inset-0 z-0 bg-zinc-950 overflow-hidden">
                    <motion.div
                        initial={{ scale: 1, x: 0, y: 0 }}
                        animate={{
                            scale: [1, 1.08, 1.04, 1.1, 1],
                            x: [0, -15, 10, -10, 0],
                            y: [0, -10, 15, -5, 0]
                        }}
                        transition={{
                            duration: 25,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        className="absolute inset-[-10%] opacity-50 bg-cover bg-center bg-no-repeat grayscale-[0.2]"
                        style={{ backgroundImage: 'url("/images/luxury-bg.png")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950 z-10" />
                    <div className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[1px] z-5" />
                </div>

                {/* 2. HERO CONTENT LAYER */}
                <div className="relative z-20 container mx-auto px-4 w-full h-full flex flex-col justify-center items-center text-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Status Tag */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="font-mono text-xs text-emerald-500 tracking-[0.2em] uppercase font-bold">System_Online</span>
                        </div>

                        {/* Title - Laboratory Identity */}
                        <div className="relative flex flex-col items-start text-left">
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] uppercase">
                                PURRPURR
                            </h1>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-400 uppercase leading-[0.9]">
                                LABS
                            </h2>
                        </div>

                        {/* Description - What is the Laboratory */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="mt-8 max-w-2xl"
                        >
                            <p className="text-zinc-300 text-sm md:text-base font-mono opacity-90 leading-relaxed border-l-2 border-purple-500 pl-4">
                                &gt; El núcleo experimental de Purrpurr. Aquí testeamos física de interfaces, sistemas tipográficos, agentes de identidad y motores generativos antes de desplegarlos en producción.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-20">
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </header>

            {/* --- MAIN CONTENT DASHBOARD --- */}
            <div className="container mx-auto px-4 py-12 relative z-30">

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
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-40">

                    {(activeTab === 'all' || activeTab === 'systems') && (
                        <>
                            <Link href="/inertia-engine" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(109,40,217,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><Wind className="w-6 h-6 text-purple-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                            <h3 className="font-mono text-[10px] text-purple-400 uppercase tracking-widest">Lab_01 / Physics</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Inertia Engine</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                            {'>'} High-performance fluid dynamics and WebGL particle systems.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-purple-300 transition-colors uppercase tracking-wider">
                                        <span>Initialize_Simulation</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>

                            <Link href="/typography-test" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><Type className="w-6 h-6 text-emerald-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <h3 className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Lab_02 / Type</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Typography</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                            {'>'} Curated typeface catalog and optical readability tests.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-emerald-300 transition-colors uppercase tracking-wider">
                                        <span>View_Catalog</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>

                            <Link href="/wallpaper-test" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><Layers className="w-6 h-6 text-blue-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            <h3 className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">Lab_03 / Visuals</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Wallpapers</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                            {'>'} Generative background patterns and noise textures.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-blue-300 transition-colors uppercase tracking-wider">
                                        <span>Open_Generator</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>

                            <Link href="/labs/identity" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(236,72,153,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><User className="w-6 h-6 text-pink-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                                            <h3 className="font-mono text-[10px] text-pink-400 uppercase tracking-widest">Lab_04 / Identity</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Identity Agents</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                            {'>'} Loaders, Guides, Investigators, and Micro-interactions.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-pink-300 transition-colors uppercase tracking-wider">
                                        <span>Meet_The_Team</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>

                            <Link href="/labs/social-labs" className="md:col-span-6 lg:col-span-4 group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity"><Share2 className="w-6 h-6 text-indigo-400" /></div>
                                <div className="p-8 h-full flex flex-col justify-between min-h-[280px]">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            <h3 className="font-mono text-[10px] text-indigo-400 uppercase tracking-widest">Lab_05 / Social</h3>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">Social Labs</h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                            {'>'} Generación autónoma de contenido y análisis de tendencias.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 group-hover:text-indigo-300 transition-colors uppercase tracking-wider">
                                        <span>Enter_Laboratory</span> <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        </>
                    )}
                </div>

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

            <PurrpurrGuide
                mode="intro"
                className="!fixed !bottom-8 !right-8 !top-auto !left-auto !translate-x-0"
            />

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
