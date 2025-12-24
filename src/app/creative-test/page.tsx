'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/creative/SmoothScroll';
import CreativeCursor from '@/components/creative/CreativeCursor';
import Magnetic from '@/components/creative/Magnetic';
import FluidBackground from '@/components/creative/FluidBackground';
import { ArrowDown, Sliders, Activity, Palette, Droplets } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';

export default function CreativeLabPage() {
    const [config, setConfig] = useState({ stiffness: 50, damping: 20, mass: 1 });
    const [colors, setColors] = useState({ color1: '#6D28D9', color2: '#00FF9C', color3: '#3B82F6' });
    const [blur, setBlur] = useState(120);
    const [grain, setGrain] = useState(0.14);
    const [speed, setSpeed] = useState(0.005);
    const [force, setForce] = useState(2.0);
    const [showControls, setShowControls] = useState(true);
    const [debug, setDebug] = useState(false);

    return (
        <SmoothScroll>
            <div className="min-h-[300vh] text-zinc-100 cursor-auto selection:bg-purple-500/30 relative">

                <CreativeCursor />
                <FluidBackground config={config} colors={colors} speed={speed} force={force} blurStrength={blur} grainOpacity={grain} debug={debug} />

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
                            className="absolute bottom-16 right-0 w-80 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl shadow-2xl space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-mono uppercase font-bold text-zinc-400">Physics Engine</h3>
                                <div className="h-2 w-2 rounded-full bg-[#00FF9C] animate-pulse" />
                            </div>

                            {/* PRESETS */}
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        setColors({ color1: '#FF3D00', color2: '#001AFF', color3: '#00FFFF' });
                                        setConfig({ stiffness: 50, damping: 25, mass: 1 });
                                        setSpeed(0.2);
                                        setForce(2.0);
                                        setGrain(0.18);
                                        setBlur(140);
                                    }}
                                    className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded hover:border-[#FF3D00] text-[10px] uppercase font-mono transition-colors text-left"
                                >
                                    Running on <span className="text-[#FF3D00] font-bold">Monopo</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setColors({ color1: '#6D28D9', color2: '#00FF9C', color3: '#3B82F6' });
                                        setConfig({ stiffness: 50, damping: 20, mass: 1 });
                                        setSpeed(0.005);
                                        setForce(2.0);
                                        setGrain(0.14);
                                        setBlur(120);
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
                                    {['color1', 'color2', 'color3'].map((c, i) => (
                                        <input
                                            key={c}
                                            type="color"
                                            value={colors[c as keyof typeof colors]}
                                            onChange={(e) => setColors(prev => ({ ...prev, [c]: e.target.value }))}
                                            className="h-8 w-full bg-transparent rounded cursor-pointer"
                                        />
                                    ))}
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
                                        type="range" min="0" max="1" step="0.01" value={speed}
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
                                        type="range" min="0" max="2" step="0.05" value={force}
                                        onChange={(e) => setForce(Number(e.target.value))}
                                        className="w-full accent-[#00FF9C] h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>

                                <div className="h-px bg-zinc-800 my-2" />

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2">Mouse Lag (Damping)</span>
                                        <span>{config.damping}</span>
                                    </div>
                                    <input
                                        type="range" min="5" max="100" value={config.damping}
                                        onChange={(e) => setConfig(prev => ({ ...prev, damping: Number(e.target.value) }))}
                                        className="w-full accent-zinc-500 h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span>Mouse Responsiveness</span>
                                        <span>{config.stiffness}</span>
                                    </div>
                                    <input
                                        type="range" min="10" max="200" value={config.stiffness}
                                        onChange={(e) => setConfig(prev => ({ ...prev, stiffness: Number(e.target.value) }))}
                                        className="w-full accent-zinc-500 h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                            </div>

                            {/* Visuals */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span className="flex items-center gap-2"><Droplets className="w-3 h-3" /> Blur Strength</span>
                                        <span>{blur}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="200" value={blur}
                                        onChange={(e) => setBlur(Number(e.target.value))}
                                        className="w-full accent-blue-500 h-1 bg-zinc-800 rounded appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                                        <span>Film Grain</span>
                                        <span>{(grain * 100).toFixed(0)}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="0.5" step="0.01" value={grain}
                                        onChange={(e) => setGrain(Number(e.target.value))}
                                        className="w-full accent-zinc-500 h-1 bg-zinc-800 rounded appearance-none"
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
                {/* NAVBAR */}
                <Navbar />

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

                        <div className="space-y-8">
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
