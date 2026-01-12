'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/creative/SmoothScroll';
import CreativeCursor from '@/components/creative/CreativeCursor';
import Magnetic from '@/components/creative/Magnetic';
import FluidBackground from '@/components/creative/FluidBackground';
import { ArrowDown, Sliders, Activity, Palette, Droplets, Save, Plus, Trash2, MousePointerClick } from 'lucide-react';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';
import { saveFluidConfig, saveFluidPresets, getUserFluidConfig, getUserFluidPresets, type FluidPreset } from './actions';

import { useRouter } from 'next/navigation';

export default function CreativeLabPage() {
    const router = useRouter();

    // -- STATE --
    // We use individual states to control the sliders easily, but we could group them.
    const [config, setConfig] = useState(FLUID_PRESET_PURRPURR.config);
    const [colors, setColors] = useState(FLUID_PRESET_PURRPURR.colors);
    const [blur, setBlur] = useState(FLUID_PRESET_PURRPURR.blurStrength);
    const [grain, setGrain] = useState(FLUID_PRESET_PURRPURR.grainOpacity);
    const [speed, setSpeed] = useState(FLUID_PRESET_PURRPURR.speed);
    const [force, setForce] = useState(FLUID_PRESET_PURRPURR.force);
    const [radius, setRadius] = useState(FLUID_PRESET_PURRPURR.interactionRadius);
    const [zoom, setZoom] = useState(FLUID_PRESET_PURRPURR.fluidZoom);
    const [blendThresholds, setBlendThresholds] = useState((FLUID_PRESET_PURRPURR as any).blendThresholds || { blend1: 0.1, blend2: 0.4, blend3: 0.7 });

    const [buttonPalette, setButtonPalette] = useState(FLUID_PRESET_PURRPURR.buttonPalette || { primary: '#6366f1', accent: '#00FF9C', text: '#000000' });

    const [userPresets, setUserPresets] = useState<FluidPreset[]>([]);

    const [showControls, setShowControls] = useState(true);
    const [debug, setDebug] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [presetStatus, setPresetStatus] = useState<'idle' | 'saving'>('idle');

    // -- LOAD DATA ON MOUNT --
    useEffect(() => {
        async function init() {
            try {
                // 1. Load Last Active Configuration
                const savedConfig = await getUserFluidConfig();
                if (savedConfig) {
                    applyConfig(savedConfig);
                }

                // 2. Load User Presets
                const presets = await getUserFluidPresets();
                if (presets) {
                    setUserPresets(presets);
                }
            } catch (e) {
                console.error("Failed to load lab data", e);
            }
        }
        init();
    }, []);

    const applyConfig = (data: any) => {
        if (data.config) setConfig(data.config);
        if (data.colors) setColors(data.colors);
        if (data.blurStrength !== undefined) setBlur(data.blurStrength);
        if (data.grainOpacity !== undefined) setGrain(data.grainOpacity);
        if (data.speed !== undefined) setSpeed(data.speed);
        if (data.force !== undefined) setForce(data.force);
        if (data.interactionRadius !== undefined) setRadius(data.interactionRadius);
        if (data.fluidZoom !== undefined) setZoom(data.fluidZoom);
        if (data.blendThresholds) setBlendThresholds(data.blendThresholds);
        if (data.buttonPalette) setButtonPalette(data.buttonPalette);
    };

    const getCurrentState = () => ({
        config,
        colors,
        blurStrength: blur,
        grainOpacity: grain,
        speed,
        force,
        interactionRadius: radius,
        fluidZoom: zoom,
        blendThresholds,
        buttonPalette
    });

    const handleSaveToLanding = async () => {
        setSaveStatus('saving');
        try {
            await saveFluidConfig(getCurrentState());
            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 2000);
            router.refresh(); // Refresh to update layouts
        } catch (error) {
            console.error(error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }
    };

    const saveToPresetSlot = async (index: number) => {
        setPresetStatus('saving');
        const newPresets = [...userPresets];

        // Define new preset
        const preset: FluidPreset = {
            id: `slot-${index}-${Date.now()}`,
            name: `Preset ${index + 1}`,
            data: getCurrentState(),
            timestamp: Date.now()
        };

        // Ensure array has size
        while (newPresets.length <= index) {
            newPresets.push({} as any); // Fill gaps if any (though we usually map fixed slots)
        }

        newPresets[index] = preset;
        setUserPresets(newPresets);

        // Persist
        await saveFluidPresets(newPresets.filter(p => p && p.id)); // Remove empty gaps if any
        setPresetStatus('idle');
    };

    const loadPreset = (preset: FluidPreset) => {
        if (!preset || !preset.data) return;
        applyConfig(preset.data);
    };

    return (
        <SmoothScroll>
            {/* FORCE MIN-HEIGHT TO ALLOW SCROLLING */}
            {/* Added pt-24 to prevent content from loading under the navbar */}
            <div className="min-h-[300vh] pt-24 text-zinc-100 cursor-auto selection:bg-purple-500/30 relative">

                <CreativeCursor />
                <FluidBackground
                    config={config}
                    colors={colors}
                    speed={speed}
                    force={force}
                    blurStrength={blur}
                    grainOpacity={grain}
                    interactionRadius={radius}
                    fluidZoom={zoom}
                    blendThresholds={blendThresholds}
                    buttonPalette={buttonPalette}
                    debug={debug}
                />

                {/* PHYSICS CONTROL PANEL */}
                <div className="fixed bottom-8 right-8 z-[9990] flex flex-col items-end pointer-events-auto">
                    <button
                        onClick={() => setShowControls(!showControls)}
                        className="h-14 w-14 bg-[#00FF9C] text-black border-2 border-white rounded-full flex items-center justify-center transition-all shadow-[0_0_30px_rgba(0,255,156,0.3)] hover:scale-110 hover:shadow-[0_0_50px_rgba(0,255,156,0.5)]"
                    >
                        <Sliders className="w-6 h-6" />
                    </button>

                    {showControls && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            // Changed bg-zinc-950/80 backdrop-blur-xl to solid bg-zinc-950 to ensure neutral tone
                            className="absolute bottom-16 right-0 w-80 max-h-[calc(100vh-120px)] overflow-y-auto bg-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-2xl space-y-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-mono uppercase font-bold text-zinc-400">Physics Engine</h3>
                                <div className="h-2 w-2 rounded-full bg-[#00FF9C] animate-pulse" />
                            </div>

                            {/* GLOBAL SAVE ACTION */}
                            <button
                                onClick={handleSaveToLanding}
                                disabled={saveStatus !== 'idle'}
                                className={`w-full px-3 py-3 rounded border font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed
                                    ${saveStatus === 'success' ? 'bg-green-500 border-green-500 text-black font-bold' : ''}
                                    ${saveStatus === 'error' ? 'bg-red-500 border-red-500 text-white' : ''}
                                    ${saveStatus === 'idle' || saveStatus === 'saving' ? 'bg-[#6D28D9] text-white border-[#6D28D9] hover:bg-[#5b21b6]' : ''}
                                `}
                            >
                                {saveStatus === 'idle' && <><Save className="w-4 h-4" /> AGREGAR A LANDING</>}
                                {saveStatus === 'saving' && <><Activity className="w-4 h-4 animate-spin" /> EXPORTANDO...</>}
                                {saveStatus === 'success' && <div className="flex items-center gap-2">✨ ASIGNADO</div>}
                                {saveStatus === 'error' && 'ERROR'}
                            </button>

                            <div className="h-px bg-zinc-800" />

                            {/* PRESETS GRID (CUSTOM) */}
                            <div className="space-y-3">
                                <label className="text-xs font-mono text-zinc-600 flex items-center gap-2">
                                    <Save className="w-3 h-3" /> Custom Presets
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[0, 1, 2, 3].map((index) => {
                                        const preset = userPresets[index];
                                        const hasData = preset && preset.id;

                                        return (
                                            <div key={index} className="relative group/preset">
                                                <button
                                                    onClick={() => hasData ? loadPreset(preset) : saveToPresetSlot(index)}
                                                    className={`w-full aspect-square rounded-lg border flex flex-col items-center justify-center transition-all overflow-hidden relative
                                                        ${hasData
                                                            ? 'bg-zinc-900 border-zinc-700 hover:border-[#00FF9C] hover:cursor-pointer'
                                                            : 'bg-zinc-950/50 border-dashed border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
                                                        }
                                                    `}
                                                    title={hasData ? preset.name : "Save current state"}
                                                >
                                                    {hasData ? (
                                                        <div className="w-full h-full p-2 flex flex-col items-center justify-center">
                                                            {/* Mini Preview using colors */}
                                                            <div className="flex gap-0.5 mb-1">
                                                                <div className="w-2 h-2 rounded-full" style={{ background: preset.data?.colors?.color1 }} />
                                                                <div className="w-2 h-2 rounded-full" style={{ background: preset.data?.colors?.color2 }} />
                                                            </div>
                                                            <span className="text-[8px] font-mono text-zinc-500 uppercase">{index + 1}</span>
                                                        </div>
                                                    ) : (
                                                        <Plus className="w-4 h-4 text-zinc-600 group-hover/preset:text-zinc-400" />
                                                    )}
                                                </button>

                                                {/* Overwrite / Save Context Menu on Hover (Simplified) */}
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/preset:opacity-100 transition-opacity pointer-events-none group-hover/preset:pointer-events-auto">
                                                    {hasData && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); saveToPresetSlot(index); }}
                                                            className="bg-black/90 text-[8px] text-white px-2 py-1 rounded whitespace-nowrap hover:bg-red-500"
                                                        >
                                                            Overwrite
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-[9px] text-zinc-600 font-mono text-center">Click empty slot to save. Hover to overwrite.</p>
                            </div>

                            <div className="h-px bg-zinc-800" />

                            {/* COLORS & PALETTE */}
                            <div className="space-y-4">
                                <label className="text-xs font-mono text-zinc-600 flex items-center gap-2"><Palette className="w-3 h-3" /> Fluid Colors</label>
                                <div className="flex gap-2">
                                    {['color1', 'color2', 'color3', 'color4'].map((c) => (
                                        <div key={c} className="group relative">
                                            <input
                                                type="color"
                                                value={colors[c as keyof typeof colors] || '#000000'}
                                                onChange={(e) => setColors(prev => ({ ...prev, [c]: e.target.value }))}
                                                className="w-8 h-8 rounded-full cursor-pointer bg-transparent overflow-hidden"
                                                style={{ padding: 0, border: 'none' }} // Hack for color input
                                            />
                                            {/* Custom wrapper view could be added here for nicer look */}
                                        </div>
                                    ))}
                                </div>

                                {/* BUTTON PALETTE */}
                                <div className="pt-2 border-t border-zinc-900">
                                    <label className="text-xs font-mono text-zinc-600 flex items-center gap-2 mb-2">
                                        <MousePointerClick className="w-3 h-3" /> UI Button Palette
                                    </label>
                                    <div className="grid grid-cols-2 gap-4 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800">
                                        <div>
                                            <label className="text-[9px] uppercase text-zinc-500 block mb-1">Primary (Links)</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={buttonPalette.primary}
                                                    onChange={(e) => setButtonPalette(prev => ({ ...prev, primary: e.target.value }))}
                                                    className="w-6 h-6 rounded bg-transparent cursor-pointer"
                                                />
                                                <span className="text-[10px] font-mono text-zinc-400">{buttonPalette.primary}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase text-zinc-500 block mb-1">Accent (Action)</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={buttonPalette.accent}
                                                    onChange={(e) => setButtonPalette(prev => ({ ...prev, accent: e.target.value }))}
                                                    className="w-6 h-6 rounded bg-transparent cursor-pointer"
                                                />
                                                <span className="text-[10px] font-mono text-zinc-400">{buttonPalette.accent}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PHYSICS */}
                            <div className="space-y-4 pt-4 border-t border-zinc-800">
                                <h4 className="text-xs font-mono text-zinc-600 uppercase font-bold">Dynamics</h4>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="text-white">Flow Speed</span>
                                        <span>{speed.toFixed(2)}</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="2" step="0.01" value={speed}
                                        onChange={(e) => setSpeed(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="text-white">Force</span>
                                        <span>{force.toFixed(2)}</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="10" step="0.1" value={force}
                                        onChange={(e) => setForce(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                {/* Advanced Toggles removed for cleaner UI as per default, but code is below */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="text-white">Fluid Zoom</span>
                                        <span>{zoom.toFixed(1)}x</span>
                                    </div>
                                    <input
                                        type="range" min="0.5" max="10.0" step="0.1" value={zoom}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                            </div>

                            {/* VISUALS */}
                            <div className="space-y-4 pt-4 border-t border-zinc-800">
                                <h4 className="text-xs font-mono text-zinc-600 uppercase font-bold">Visuals</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2 text-white"><Droplets className="w-3 h-3" /> Blur Strength</span>
                                        <span>{blur}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="200" value={blur}
                                        onChange={(e) => setBlur(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className=" text-white">Film Grain</span>
                                        <span>{(grain * 100).toFixed(0)}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="0.5" step="0.01" value={grain}
                                        onChange={(e) => setGrain(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                <div className="pt-2">
                                    <label className="flex items-center justify-between text-xs font-mono text-zinc-400 cursor-pointer group">
                                        <span className="group-hover:text-white transition-colors uppercase">Debug Wireframe</span>
                                        <input
                                            type="checkbox"
                                            checked={debug}
                                            onChange={(e) => setDebug(e.target.checked)}
                                            className="accent-[#FF3D00] h-4 w-4 rounded bg-zinc-800 border-zinc-700"
                                        />
                                    </label>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </div>

                {/* HERO SECTION */}
                <section className="h-screen flex items-center justify-center relative flex-col">
                    <h1 className="text-[12vw] font-bold leading-none tracking-tighter mix-blend-difference hover-trigger" data-hover>
                        PHYSICS
                    </h1>
                    <p className="font-mono text-zinc-500 mt-8 text-sm uppercase tracking-[0.5em]">
                        Interia • Velocity • WebGL
                    </p>

                    <motion.div
                        className="absolute bottom-12 flex flex-col items-center gap-2 mix-blend-difference"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span className="text-[10px] font-mono uppercase">Scroll to feel the weight</span>
                        <ArrowDown className="w-4 h-4" />
                    </motion.div>
                </section>

                {/* INTERACTIVE GRID */}
                <section className="min-h-screen py-32 px-4 md:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

                        <div className="space-y-8 p-8 bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl shadow-2xl">
                            <h2 className="text-4xl font-bold font-mono">// MAGNETIC_OBJECTS</h2>
                            <p className="text-zinc-500 max-w-md text-lg leading-relaxed">
                                The cursor isn't just a pointer; it's a physical object in the DOM.
                                Using GSAP's `quickSetter` and linear interpolation, we simulate mass and drag.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {['Button A', 'Button B', 'Magnetic', 'Hover Me'].map((label, i) => (
                                    <Magnetic key={i}>
                                        <button
                                            className="px-8 py-4 border border-zinc-800 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-zinc-100 hover:text-black transition-colors hover-trigger"
                                            data-hover
                                        >
                                            {label}
                                        </button>
                                    </Magnetic>
                                ))}
                            </div>
                            <p className="text-zinc-600 text-xs font-mono pt-4">Try moving your cursor near the buttons.</p>
                        </div>

                        <div className="relative aspect-square border border-zinc-900 bg-zinc-900/20 rounded-3xl overflow-hidden flex items-center justify-center group hover-trigger">
                            <Magnetic>
                                <div className="text-center cursor-pointer p-10">
                                    <div className="text-6xl mb-4 group-hover:scale-150 transition-transform duration-700">●</div>
                                    <p className="font-mono text-xs text-zinc-600 uppercase">Interactive Zone</p>
                                </div>
                            </Magnetic>
                        </div>

                    </div>
                </section>

            </div>
        </SmoothScroll>
    );
}
