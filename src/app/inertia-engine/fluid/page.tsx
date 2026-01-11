'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/creative/SmoothScroll';
import CreativeCursor from '@/components/creative/CreativeCursor';
import Magnetic from '@/components/creative/Magnetic';
import FluidBackground from '@/components/creative/FluidBackground';
import { ArrowDown, Sliders, Activity, Palette, Droplets, Save } from 'lucide-react';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';
import { saveFluidConfig } from './actions';

export default function CreativeLabPage() {
    const [config, setConfig] = useState(FLUID_PRESET_PURRPURR.config);
    const [colors, setColors] = useState(FLUID_PRESET_PURRPURR.colors);
    const [blur, setBlur] = useState(FLUID_PRESET_PURRPURR.blurStrength);
    const [grain, setGrain] = useState(FLUID_PRESET_PURRPURR.grainOpacity);
    const [speed, setSpeed] = useState(FLUID_PRESET_PURRPURR.speed);
    const [force, setForce] = useState(FLUID_PRESET_PURRPURR.force);
    const [radius, setRadius] = useState(FLUID_PRESET_PURRPURR.interactionRadius);
    const [zoom, setZoom] = useState(FLUID_PRESET_PURRPURR.fluidZoom);
    const [blendThresholds, setBlendThresholds] = useState((FLUID_PRESET_PURRPURR as any).blendThresholds || { blend1: 0.1, blend2: 0.4, blend3: 0.7 });
    const [showControls, setShowControls] = useState(true);
    const [debug, setDebug] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

    const handleSave = async () => {
        setSaveStatus('saving');
        try {
            await saveFluidConfig({
                config,
                colors,
                blurStrength: blur,
                grainOpacity: grain,
                speed,
                force,
                interactionRadius: radius,
                fluidZoom: zoom,
                blendThresholds
            });
            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (error) {
            console.error(error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }
    };

    return (
        <SmoothScroll>
            <div className="min-h-[300vh] text-zinc-100 cursor-auto selection:bg-purple-500/30 relative">

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
                            className="absolute bottom-16 right-0 w-80 max-h-[calc(100vh-120px)] overflow-y-auto bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl shadow-2xl space-y-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-mono uppercase font-bold text-zinc-400">Physics Engine</h3>
                                <div className="h-2 w-2 rounded-full bg-[#00FF9C] animate-pulse" />
                            </div>

                            {/* PRESETS */}
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={saveStatus !== 'idle'}
                                    className={`col-span-2 px-3 py-3 rounded border font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed
                                        ${saveStatus === 'success' ? 'bg-green-500 border-green-500 text-black font-bold' : ''}
                                        ${saveStatus === 'error' ? 'bg-red-500 border-red-500 text-white' : ''}
                                        ${saveStatus === 'idle' || saveStatus === 'saving' ? 'bg-[#6D28D9] text-white border-[#6D28D9] hover:bg-[#5b21b6]' : ''}
                                    `}
                                >
                                    {saveStatus === 'idle' && <><Save className="w-4 h-4" /> AGREGAR A LANDING</>}
                                    {saveStatus === 'saving' && <><Activity className="w-4 h-4 animate-spin" /> GUARDANDO...</>}
                                    {saveStatus === 'success' && <div className="flex items-center gap-2">✨ ACTUALIZADO CON ÉXITO</div>}
                                    {saveStatus === 'error' && 'ERROR AL GUARDAR'}
                                </button>
                                <button
                                    onClick={() => {
                                        setColors({ color1: '#FF3D00', color2: '#001AFF', color3: '#00FFFF', color4: '#000000' });
                                        setConfig({ stiffness: 120, damping: 10, mass: 0.8 }); // Snappy & Bouncy
                                        setSpeed(0.5);
                                        setForce(2.5);
                                        setGrain(0.40);
                                        setBlur(100);
                                        setRadius(0.8);
                                        setZoom(1.0);
                                        setBlendThresholds({ blend1: 0.3, blend2: 0.5, blend3: 0.8 });
                                    }}
                                    className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded hover:border-[#FF3D00] text-[10px] uppercase font-mono transition-colors text-left"
                                >
                                    Preset: <span className="text-[#FF3D00] font-bold">Monopo (High Energy)</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setColors(FLUID_PRESET_PURRPURR.colors);
                                        setConfig(FLUID_PRESET_PURRPURR.config);
                                        setSpeed(0.2); // Explicit valid Speed
                                        setForce(4.0); // Explicit valid Force
                                        setGrain(FLUID_PRESET_PURRPURR.grainOpacity);
                                        setBlur(FLUID_PRESET_PURRPURR.blurStrength);
                                        setRadius(FLUID_PRESET_PURRPURR.interactionRadius);
                                        setZoom(FLUID_PRESET_PURRPURR.fluidZoom);
                                        setBlendThresholds((FLUID_PRESET_PURRPURR as any).blendThresholds || { blend1: 0.1, blend2: 0.4, blend3: 0.7 });
                                    }}
                                    className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded hover:border-[#6D28D9] text-[10px] uppercase font-mono transition-colors text-left"
                                >
                                    Reset <span className="text-[#6D28D9] font-bold">Purrpurr</span>
                                </button>
                            </div>

                            {/* Colors */}
                            <div className="space-y-3">
                                <label className="text-xs font-mono text-zinc-600 flex items-center gap-2"><Palette className="w-3 h-3" /> Fluid Colors</label>
                                <div className="flex gap-2">
                                    {['color1', 'color2', 'color3', 'color4'].map((c, i) => (
                                        <input
                                            key={c}
                                            type="color"
                                            value={colors[c as keyof typeof colors] || '#000000'}
                                            onChange={(e) => setColors(prev => ({ ...prev, [c]: e.target.value }))}
                                            className="h-8 w-full bg-transparent rounded cursor-pointer"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Color Mixing */}
                            <div className="space-y-3 pt-2 border-t border-zinc-800">
                                <label className="text-xs font-mono text-zinc-600 flex items-center gap-2"><Palette className="w-3 h-3" /> Color Mixing Proportions</label>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                                        <span>C1-C2 Mix ({blendThresholds.blend1.toFixed(2)})</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="1" step="0.05"
                                        value={blendThresholds.blend1}
                                        onChange={(e) => setBlendThresholds((prev: any) => ({ ...prev, blend1: Number(e.target.value) }))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />

                                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                                        <span>C2-C3 Mix ({blendThresholds.blend2.toFixed(2)})</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="1" step="0.05"
                                        value={blendThresholds.blend2}
                                        onChange={(e) => setBlendThresholds((prev: any) => ({ ...prev, blend2: Number(e.target.value) }))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />

                                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                                        <span>C3-C4 Mix ({blendThresholds.blend3.toFixed(2)})</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="1" step="0.05"
                                        value={blendThresholds.blend3}
                                        onChange={(e) => setBlendThresholds((prev: any) => ({ ...prev, blend3: Number(e.target.value) }))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                            </div>

                            {/* Physics */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2 text-white"><Activity className="w-3 h-3" /> Fluid Speed (Time)</span>
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
                                        <span className="flex items-center gap-2 text-white"><Activity className="w-3 h-3" /> Interaction Force</span>
                                        <span>{force.toFixed(2)}</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="10" step="0.1" value={force}
                                        onChange={(e) => setForce(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>

                                <div className="h-px bg-zinc-800 my-2" />

                                <div className="h-px bg-zinc-800 my-2" />

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2 text-white">Elasticity (Stiffness)</span>
                                        <span>{config.stiffness}</span>
                                    </div>
                                    <input
                                        type="range" min="10" max="300" value={config.stiffness}
                                        onChange={(e) => setConfig(prev => ({ ...prev, stiffness: Number(e.target.value) }))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2 text-white">Friction (Damping)</span>
                                        <span>{config.damping}</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="50" value={config.damping}
                                        onChange={(e) => setConfig(prev => ({ ...prev, damping: Number(e.target.value) }))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2 text-white">Viscosity (Mass)</span>
                                        <span>{config.mass}</span>
                                    </div>
                                    <input
                                        type="range" min="0.1" max="5.0" step="0.1" value={config.mass}
                                        onChange={(e) => setConfig(prev => ({ ...prev, mass: Number(e.target.value) }))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2 text-white">Interaction Radius</span>
                                        <span>{radius.toFixed(2)}</span>
                                    </div>
                                    <input
                                        type="range" min="0.1" max="2.0" step="0.05" value={radius}
                                        onChange={(e) => setRadius(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                            </div>

                            {/* Visuals */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2 text-white"><Droplets className="w-3 h-3" /> Fluid Zoom</span>
                                        <span>{zoom.toFixed(1)}x</span>
                                    </div>
                                    <input
                                        type="range" min="0.5" max="10.0" step="0.1" value={zoom}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
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
                                <div className="pt-4 border-t border-zinc-900">
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

                {/* PROTOTYPE WARNING */}

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

                {/* BIG TYPOGRAPHY SCROLL */}
                <section className="py-32 overflow-hidden">
                    {['INERTIA', 'VELOCITY', 'FRICTION', 'GRAVITY'].map((text, i) => (
                        <div key={i} className="border-t border-zinc-900 py-12 px-4 md:px-20 hover:bg-zinc-900/30 transition-colors hover-trigger" data-hover>
                            <h2 className="text-[8vw] leading-none font-bold text-zinc-800 hover:text-[#00FF9C] transition-colors hover:translate-x-10 duration-500 ease-out">
                                {text}
                            </h2>
                        </div>
                    ))}
                </section>

                {/* FOOTER */}
                <section className="h-[50vh] flex items-center justify-center bg-zinc-950 border-t border-zinc-900">
                    <div className="text-center">
                        <h3 className="text-2xl font-mono mb-4 text-[#6D28D9]">Ready for WebGL?</h3>
                        <button className="px-12 py-6 bg-white text-black font-bold rounded-full hover:scale-110 transition-transform hover-trigger" data-hover>
                            INITIATE_PHASE_2
                        </button>
                    </div>
                </section>

            </div>
        </SmoothScroll>
    );
}
