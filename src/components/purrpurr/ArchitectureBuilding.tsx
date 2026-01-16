'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, Palette, Layout,
    BookOpen, Beaker, Sparkles, Layers,
    Building2, Server
} from 'lucide-react';



import dynamic from 'next/dynamic';
import { BUILDING_LEVELS } from '@/data/purrpurr-architecture';

const Building3D = dynamic(() => import('./Building3D').then(mod => mod.Building3D), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[600px] flex items-center justify-center bg-zinc-950">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-zinc-500 text-sm">Loading 3D Model...</span>
            </div>
        </div>
    )
});
export function ArchitectureBuilding() {
    const [growthLevel, setGrowthLevel] = useState(100);
    const [is3D, setIs3D] = useState(true); // Default to 3D as per request intent

    // Calculate which floors are unlocked based on growth
    const milestones = BUILDING_LEVELS.filter(l => l.level >= 0).map(l => ({
        threshold: l.threshold,
        name: l.name
    }));

    const currentMilestone = milestones.findLast(m => growthLevel >= m.threshold)?.name || "Initiation";

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-12 min-h-screen flex flex-col md:flex-row gap-16 items-start justify-center bg-zinc-950">

            {/* Control Panel */}
            <div className="w-full md:w-64 bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl border border-zinc-800/50 md:sticky md:top-24 z-50">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        Purrpurr<span className="text-purple-500">HQ</span>
                    </h2>
                    <p className="text-zinc-500 mt-1 text-xs">
                        Structure Control
                    </p>
                </div>

                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Evolution</span>
                            <span className="text-xs font-mono font-bold text-purple-400">{growthLevel}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={growthLevel}
                            onChange={(e) => setGrowthLevel(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                        />
                    </div>

                    <button
                        onClick={() => setIs3D(!is3D)}
                        className="w-full py-2 bg-zinc-900 border border-zinc-700 text-zinc-400 rounded-lg font-medium text-xs hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
                    >
                        <Building2 className="w-3 h-3" />
                        {is3D ? 'View Schematic' : 'View 3D Model'}
                    </button>
                </div>
            </div>

            {/* Vision Area */}
            <div className="flex-1 flex justify-center min-h-[600px] items-center">
                {is3D ? (
                    <div className="w-full h-full animate-in fade-in duration-700">
                        <Building3D
                            growthLevel={growthLevel}
                            setGrowthLevel={setGrowthLevel}
                            selectedFloor={null}
                            setSelectedFloor={() => { }}
                        />
                    </div>
                ) : (
                    <div className="relative flex flex-col-reverse items-center w-full max-w-xs mx-auto pb-32">
                        {/* Vertical Structural Pillar (Left side spine) */}
                        <div className={`absolute left-0 bottom-0 w-2 bg-zinc-800 h-full border-r border-black/50 z-20 ${growthLevel < 15 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`} />
                        {/* Vertical Structural Pillar (Right side spine) */}
                        <div className={`absolute right-0 bottom-0 w-2 bg-zinc-800 h-full border-l border-black/50 z-20 ${growthLevel < 15 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`} />

                        {/* LEVEL 0: FOUNDATION */}
                        <BuildingFloor
                            level={0}
                            title="Foundation"
                            icon={<Briefcase className="w-4 h-4 text-emerald-500" />}
                            color="bg-zinc-900"
                            isBottom
                            show={true}
                        />

                        {/* LEVEL 1: ACADEMY */}
                        <BuildingFloor
                            level={1}
                            title="Academy"
                            icon={<BookOpen className="w-4 h-4 text-yellow-500" />}
                            color="bg-zinc-900"
                            show={growthLevel >= 15}
                        />

                        {/* LEVEL 2: DESIGN */}
                        <BuildingFloor
                            level={2}
                            title="Design Studio"
                            icon={<Palette className="w-4 h-4 text-pink-500" />}
                            color="bg-zinc-900"
                            show={growthLevel >= 30}
                        />

                        {/* LEVEL 3: FRONTEND */}
                        <BuildingFloor
                            level={3}
                            title="Frontend"
                            icon={<Layout className="w-4 h-4 text-sky-500" />}
                            color="bg-zinc-900"
                            show={growthLevel >= 45}
                        />

                        {/* LEVEL 4: BACKEND */}
                        <BuildingFloor
                            level={4}
                            title="Backend"
                            icon={<Server className="w-4 h-4 text-blue-500" />}
                            color="bg-zinc-900"
                            show={growthLevel >= 60}
                        />

                        {/* LEVEL 5: THE LAB (Central Tech Hub - Glowing) */}
                        <BuildingFloor
                            level={5}
                            title="The Lab"
                            icon={<Beaker className="w-4 h-4 text-purple-400" />}
                            color="bg-zinc-800"
                            show={growthLevel >= 75}
                            isLab
                        />

                        {/* LEVEL 6: CLOUD ECOSYSTEM */}
                        <AnimatePresence>
                            {growthLevel >= 85 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`w-full z-10 relative border-x border-zinc-800 bg-zinc-900 group`}
                                >
                                    <div className="h-24 p-4 flex flex-col justify-center border-t border-zinc-800 border-b relative overflow-hidden">
                                        {/* Windows Pattern */}
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent " />
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            {[1, 2, 3].map(i => <div key={i} className="w-0.5 h-0.5 bg-indigo-500 rounded-full animate-pulse" />)}
                                        </div>
                                        <div className="flex items-center gap-2 mb-2 z-10">
                                            <Layers className="w-4 h-4 text-indigo-400" />
                                            <span className="text-xs font-bold text-zinc-200">Ecosystem</span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-1 z-10">
                                            {/* Tiny server/client boxes */}
                                            {['SL', 'PG', 'FC', '+'].map((c, i) => (
                                                <div key={i} className={`
                                                    h-6 border rounded flex items-center justify-center text-[8px] font-mono
                                                    ${c === '+' ? 'border-dashed border-zinc-700 text-zinc-600' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400 cursor-pointer transition-colors'}
                                                `}>
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* LEVEL 7: VISION (The Crown) */}
                        <BuildingFloor
                            level={7}
                            title="Vision"
                            icon={<Sparkles className="w-4 h-4 text-white" />}
                            color="bg-zinc-900"
                            show={growthLevel >= 95}
                            isTop
                        />
                    </div>
                )}
            </div>
        </div>
    );
}



function BuildingFloor({ level, title, icon, color, isBottom, isTop, isLab, show, isIsometric }: any) {
    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            className={`
                w-full relative z-10 bg-zinc-950
                border-x border-zinc-800
                ${isTop ? 'rounded-t-2xl border-t border-b-0 mt-1' : ''}
                ${isBottom ? 'rounded-b-sm border-b-2 border-zinc-700' : ''}
                ${!isTop && !isBottom ? 'border-b border-zinc-900' : ''}
                ${isLab ? 'z-20 my-[-1px]' : ''}
            `}
            style={{ zIndex: 20 - level }}
        >
            <div className={`
                relative h-16 w-full ${color}
                ${isTop ? 'rounded-t-2xl' : ''}
                ${isBottom ? 'rounded-b-sm' : ''}
                ${isLab ? 'bg-zinc-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-y border-purple-500/30' : ''}
                flex items-center px-6 gap-4
                group transition-colors hover:bg-zinc-800
            `}>

                {/* Building Windows (Left Side) */}
                {!isTop && <div className="absolute left-2 top-3 bottom-3 w-1 flex flex-col justify-between opacity-20">
                    {[...Array(4)].map((_, i) => <div key={i} className="w-full h-1 bg-white rounded-full" />)}
                </div>}

                {/* Content */}
                <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${isLab ? 'bg-purple-500/10 text-purple-400' : 'bg-black/20 border border-white/5'}
                `}>
                    {icon}
                </div>

                <div className="flex flex-col">
                    <span className={`text-sm font-bold tracking-wide ${isLab ? 'text-purple-100' : 'text-zinc-300'}`}>
                        {title}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-600">Level 0{level}</span>
                </div>

                {/* Building Status Light */}
                <div className="ml-auto w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]" />

                {/* 3D Sides */}
                {isIsometric && (
                    <div className={`
                        absolute top-0 -left-[8px] h-full w-[8px]
                        ${isLab ? 'bg-purple-900/20' : 'bg-zinc-800'}
                        border-l border-b border-white/5
                        origin-right skew-y-[45deg] brightness-50
                    `} />
                )}
            </div>

            {/* Crown Antenna (Only for Top) */}
            {isTop && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-t from-zinc-500 to-transparent opacity-50" />
            )}
        </motion.div>
    );
}
