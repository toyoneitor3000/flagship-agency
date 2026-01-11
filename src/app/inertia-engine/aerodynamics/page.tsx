'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Upload, RotateCcw, Layers, Sun, Palette, Zap } from 'lucide-react';
import Link from 'next/link';

// Configuration - using LAYERS approach instead of ugly SVG distortion
const DEFAULT_CONFIG = {
    // LAYER MOVEMENT
    layer1Speed: 25,          // Primary layer cycle duration
    layer2Speed: 35,          // Secondary layer (slower = parallax effect)
    layer3Speed: 45,          // Third layer (even slower)

    // SCALE & DRIFT
    scaleRange: 0.12,         // How much zoom (0.1 = 10% zoom in/out)
    driftRange: 30,           // How far layers drift (px)

    // LAYER OPACITY
    layer1Opacity: 0.7,
    layer2Opacity: 0.3,
    layer3Opacity: 0.15,

    // VISUAL FILTERS
    blur: 0,
    grayscale: 0.1,
    saturation: 1.2,
    contrast: 1.1,
    brightness: 1.0,
    hueRotate: 0,

    // BLEND MODES
    layer2Blend: 'overlay',
    layer3Blend: 'soft-light',

    // OVERLAY
    overlayColor: '#6D28D9',
    overlayOpacity: 0.12,
};

// Presets with smooth, premium looks
const PRESETS = {
    silk: {
        name: 'Seda Premium',
        layer1Speed: 25, layer2Speed: 35, layer3Speed: 45,
        scaleRange: 0.08, driftRange: 20,
        layer1Opacity: 0.6, layer2Opacity: 0.25, layer3Opacity: 0.12,
        blur: 0, grayscale: 0.15, saturation: 1.1, contrast: 1.1, brightness: 1.0, hueRotate: 0,
        layer2Blend: 'overlay', layer3Blend: 'soft-light',
        overlayColor: '#6D28D9', overlayOpacity: 0.12,
    },
    dramatic: {
        name: 'Dramático',
        layer1Speed: 15, layer2Speed: 22, layer3Speed: 30,
        scaleRange: 0.2, driftRange: 60,
        layer1Opacity: 0.85, layer2Opacity: 0.4, layer3Opacity: 0.2,
        blur: 0, grayscale: 0, saturation: 1.5, contrast: 1.3, brightness: 1.1, hueRotate: 0,
        layer2Blend: 'hard-light', layer3Blend: 'overlay',
        overlayColor: '#dc2626', overlayOpacity: 0.08,
    },
    dreamy: {
        name: 'Onírico',
        layer1Speed: 40, layer2Speed: 55, layer3Speed: 70,
        scaleRange: 0.1, driftRange: 25,
        layer1Opacity: 0.5, layer2Opacity: 0.35, layer3Opacity: 0.25,
        blur: 3, grayscale: 0.2, saturation: 1.2, contrast: 0.95, brightness: 1.05, hueRotate: 15,
        layer2Blend: 'screen', layer3Blend: 'overlay',
        overlayColor: '#7c3aed', overlayOpacity: 0.2,
    },
    minimal: {
        name: 'Minimalista',
        layer1Speed: 50, layer2Speed: 70, layer3Speed: 90,
        scaleRange: 0.05, driftRange: 12,
        layer1Opacity: 0.4, layer2Opacity: 0.15, layer3Opacity: 0.08,
        blur: 1, grayscale: 0.4, saturation: 0.8, contrast: 1.0, brightness: 0.95, hueRotate: 0,
        layer2Blend: 'overlay', layer3Blend: 'soft-light',
        overlayColor: '#18181b', overlayOpacity: 0.3,
    },
    vibrant: {
        name: 'Vibrante',
        layer1Speed: 18, layer2Speed: 25, layer3Speed: 35,
        scaleRange: 0.15, driftRange: 45,
        layer1Opacity: 0.9, layer2Opacity: 0.45, layer3Opacity: 0.25,
        blur: 0, grayscale: 0, saturation: 2.0, contrast: 1.2, brightness: 1.15, hueRotate: 0,
        layer2Blend: 'color-dodge', layer3Blend: 'overlay',
        overlayColor: '#f97316', overlayOpacity: 0.05,
    },
};

const BLEND_MODES = ['normal', 'overlay', 'soft-light', 'hard-light', 'multiply', 'screen', 'color-dodge', 'color-burn', 'difference', 'exclusion'];

export default function TextileEnginePage() {
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [imageUrl, setImageUrl] = useState('/images/luxury-bg.png');
    const [showControls, setShowControls] = useState(true);
    const [customImage, setCustomImage] = useState<string | null>(null);
    const [animKey, setAnimKey] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCustomImage(url);
            setImageUrl(url);
        }
    };

    const applyPreset = (presetKey: keyof typeof PRESETS) => {
        setConfig(prev => ({ ...prev, ...PRESETS[presetKey] }));
        setAnimKey(prev => prev + 1);
    };

    const resetConfig = () => {
        setConfig(DEFAULT_CONFIG);
        setImageUrl('/images/luxury-bg.png');
        setCustomImage(null);
        setAnimKey(prev => prev + 1);
    };

    const baseFilter = `blur(${config.blur}px) grayscale(${config.grayscale}) saturate(${config.saturation}) contrast(${config.contrast}) brightness(${config.brightness}) hue-rotate(${config.hueRotate}deg)`;

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans relative selection:bg-purple-500/30 overflow-hidden">

            {/* MULTI-LAYER ANIMATED BACKGROUND - No ugly SVG distortion */}
            <div className="fixed inset-0 z-0 bg-zinc-950 overflow-hidden">

                {/* LAYER 3 - Deepest, slowest (creates depth) */}
                <motion.div
                    key={`l3-${animKey}`}
                    animate={{
                        scale: [1 + config.scaleRange, 1, 1 + config.scaleRange * 0.7, 1 + config.scaleRange],
                        x: [config.driftRange, -config.driftRange * 0.5, config.driftRange * 0.8, config.driftRange],
                        y: [-config.driftRange * 0.6, config.driftRange * 0.4, -config.driftRange * 0.3, -config.driftRange * 0.6],
                    }}
                    transition={{ duration: config.layer3Speed, ease: "easeInOut", repeat: Infinity }}
                    className="absolute inset-[-20%] bg-cover bg-center bg-no-repeat will-change-transform"
                    style={{
                        backgroundImage: `url("${imageUrl}")`,
                        opacity: config.layer3Opacity,
                        filter: `${baseFilter} blur(${config.blur + 4}px)`,
                        mixBlendMode: config.layer3Blend as any,
                    }}
                />

                {/* LAYER 2 - Middle layer */}
                <motion.div
                    key={`l2-${animKey}`}
                    animate={{
                        scale: [1, 1 + config.scaleRange * 0.8, 1 + config.scaleRange * 0.4, 1],
                        x: [-config.driftRange * 0.7, config.driftRange * 0.6, -config.driftRange * 0.4, -config.driftRange * 0.7],
                        y: [config.driftRange * 0.5, -config.driftRange * 0.3, config.driftRange * 0.6, config.driftRange * 0.5],
                    }}
                    transition={{ duration: config.layer2Speed, ease: "easeInOut", repeat: Infinity }}
                    className="absolute inset-[-15%] bg-cover bg-center bg-no-repeat will-change-transform"
                    style={{
                        backgroundImage: `url("${imageUrl}")`,
                        opacity: config.layer2Opacity,
                        filter: `${baseFilter} blur(${config.blur + 2}px)`,
                        mixBlendMode: config.layer2Blend as any,
                    }}
                />

                {/* LAYER 1 - Primary layer (most visible) */}
                <motion.div
                    key={`l1-${animKey}`}
                    animate={{
                        scale: [1, 1 + config.scaleRange, 1 + config.scaleRange * 0.5, 1],
                        x: [0, config.driftRange * 0.4, -config.driftRange * 0.3, 0],
                        y: [0, -config.driftRange * 0.25, config.driftRange * 0.35, 0],
                    }}
                    transition={{ duration: config.layer1Speed, ease: "easeInOut", repeat: Infinity }}
                    className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat will-change-transform"
                    style={{
                        backgroundImage: `url("${imageUrl}")`,
                        opacity: config.layer1Opacity,
                        filter: baseFilter,
                    }}
                />

                {/* Color overlay */}
                <div
                    className="absolute inset-0 z-5 pointer-events-none"
                    style={{ backgroundColor: config.overlayColor, opacity: config.overlayOpacity }}
                />

                {/* Bottom gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950 z-10 pointer-events-none" />
            </div>

            {/* CONTENT */}
            <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Layers className="w-6 h-6 text-purple-400" />
                        <span className="font-mono text-xs text-purple-400 tracking-[0.2em] uppercase">Textile Engine</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">TEXTURE FACTORY</h1>
                    <p className="text-zinc-400 text-lg font-mono">&gt; Capas múltiples con parallax. Sin distorsión pixelada.</p>
                </motion.div>
                <Link href="/inertia-engine" className="mt-12 px-6 py-3 border border-zinc-700 rounded-full font-mono text-xs uppercase tracking-wider hover:border-purple-500 hover:text-purple-400 transition-colors">
                    ← Volver a Inertia Engine
                </Link>
            </div>

            {/* CONTROL PANEL */}
            <div className="fixed bottom-8 right-8 z-[9990] flex flex-col items-end">
                <button onClick={() => setShowControls(!showControls)} className="h-14 w-14 bg-purple-600 text-white border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:scale-110 transition-transform">
                    <Sliders className="w-6 h-6" />
                </button>

                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute bottom-16 right-0 w-80 max-h-[80vh] overflow-y-auto bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 p-5 rounded-3xl shadow-2xl space-y-4"
                    >
                        <div className="flex justify-between items-center sticky top-0 bg-zinc-950/95 py-2 z-10 border-b border-zinc-800 -mt-1 pb-3">
                            <h3 className="text-sm font-mono uppercase font-bold text-white">Texture Factory</h3>
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        </div>

                        {/* PRESETS */}
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest flex items-center gap-2"><Zap className="w-3 h-3" /> Presets</span>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(PRESETS).map(([key, preset]) => (
                                    <button key={key} onClick={() => applyPreset(key as keyof typeof PRESETS)} className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-[10px] font-mono text-zinc-300 hover:border-purple-500 hover:text-white transition-colors text-left">
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="pt-3 border-t border-zinc-800">
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            <button onClick={() => fileInputRef.current?.click()} className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono hover:border-purple-500 transition-colors flex items-center justify-center gap-2">
                                <Upload className="w-3 h-3" /> {customImage ? 'Cambiar Textura' : 'Subir Textura'}
                            </button>
                        </div>

                        {/* === LAYER SPEEDS === */}
                        <div className="space-y-3 pt-3 border-t border-zinc-800">
                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2"><Layers className="w-3 h-3" /> Velocidad de Capas</span>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Capa Principal</span><span>{config.layer1Speed}s</span></div>
                                <input type="range" min="5" max="60" step="1" value={config.layer1Speed} onChange={(e) => setConfig(prev => ({ ...prev, layer1Speed: Number(e.target.value) }))} className="w-full accent-cyan-500 h-1.5 bg-zinc-800 rounded" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Capa Media</span><span>{config.layer2Speed}s</span></div>
                                <input type="range" min="10" max="80" step="1" value={config.layer2Speed} onChange={(e) => setConfig(prev => ({ ...prev, layer2Speed: Number(e.target.value) }))} className="w-full accent-cyan-500 h-1.5 bg-zinc-800 rounded" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Capa Profunda</span><span>{config.layer3Speed}s</span></div>
                                <input type="range" min="15" max="100" step="1" value={config.layer3Speed} onChange={(e) => setConfig(prev => ({ ...prev, layer3Speed: Number(e.target.value) }))} className="w-full accent-cyan-500 h-1.5 bg-zinc-800 rounded" />
                            </div>
                        </div>

                        {/* === MOVEMENT === */}
                        <div className="space-y-3 pt-3 border-t border-zinc-800">
                            <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest flex items-center gap-2"><Zap className="w-3 h-3" /> Movimiento</span>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Rango de Zoom</span><span>{(config.scaleRange * 100).toFixed(0)}%</span></div>
                                <input type="range" min="0.02" max="0.4" step="0.02" value={config.scaleRange} onChange={(e) => setConfig(prev => ({ ...prev, scaleRange: Number(e.target.value) }))} className="w-full accent-pink-500 h-1.5 bg-zinc-800 rounded" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Rango de Drift</span><span>±{config.driftRange}px</span></div>
                                <input type="range" min="5" max="100" step="5" value={config.driftRange} onChange={(e) => setConfig(prev => ({ ...prev, driftRange: Number(e.target.value) }))} className="w-full accent-pink-500 h-1.5 bg-zinc-800 rounded" />
                            </div>
                        </div>

                        {/* === LAYER OPACITY === */}
                        <div className="space-y-3 pt-3 border-t border-zinc-800">
                            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2"><Layers className="w-3 h-3" /> Opacidad de Capas</span>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Capa Principal</span><span>{(config.layer1Opacity * 100).toFixed(0)}%</span></div>
                                <input type="range" min="0.1" max="1" step="0.05" value={config.layer1Opacity} onChange={(e) => setConfig(prev => ({ ...prev, layer1Opacity: Number(e.target.value) }))} className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Capa Media</span><span>{(config.layer2Opacity * 100).toFixed(0)}%</span></div>
                                <input type="range" min="0" max="0.8" step="0.05" value={config.layer2Opacity} onChange={(e) => setConfig(prev => ({ ...prev, layer2Opacity: Number(e.target.value) }))} className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Capa Profunda</span><span>{(config.layer3Opacity * 100).toFixed(0)}%</span></div>
                                <input type="range" min="0" max="0.5" step="0.02" value={config.layer3Opacity} onChange={(e) => setConfig(prev => ({ ...prev, layer3Opacity: Number(e.target.value) }))} className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded" />
                            </div>
                        </div>

                        {/* === BLEND MODES === */}
                        <div className="space-y-3 pt-3 border-t border-zinc-800">
                            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">Modos de Mezcla</span>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Capa Media</span></div>
                                <select value={config.layer2Blend} onChange={(e) => setConfig(prev => ({ ...prev, layer2Blend: e.target.value }))} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-zinc-300">
                                    {BLEND_MODES.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Capa Profunda</span></div>
                                <select value={config.layer3Blend} onChange={(e) => setConfig(prev => ({ ...prev, layer3Blend: e.target.value }))} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-zinc-300">
                                    {BLEND_MODES.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* === VISUAL FILTERS === */}
                        <div className="space-y-3 pt-3 border-t border-zinc-800">
                            <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest flex items-center gap-2"><Sun className="w-3 h-3" /> Filtros</span>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Blur</span><span>{config.blur}px</span></div>
                                <input type="range" min="0" max="10" step="0.5" value={config.blur} onChange={(e) => setConfig(prev => ({ ...prev, blur: Number(e.target.value) }))} className="w-full accent-yellow-500 h-1.5 bg-zinc-800 rounded" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Saturación</span><span>{(config.saturation * 100).toFixed(0)}%</span></div>
                                <input type="range" min="0" max="2.5" step="0.1" value={config.saturation} onChange={(e) => setConfig(prev => ({ ...prev, saturation: Number(e.target.value) }))} className="w-full accent-yellow-500 h-1.5 bg-zinc-800 rounded" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Contraste</span><span>{(config.contrast * 100).toFixed(0)}%</span></div>
                                <input type="range" min="0.5" max="2" step="0.05" value={config.contrast} onChange={(e) => setConfig(prev => ({ ...prev, contrast: Number(e.target.value) }))} className="w-full accent-yellow-500 h-1.5 bg-zinc-800 rounded" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Hue Rotate</span><span>{config.hueRotate}°</span></div>
                                <input type="range" min="0" max="360" step="10" value={config.hueRotate} onChange={(e) => setConfig(prev => ({ ...prev, hueRotate: Number(e.target.value) }))} className="w-full accent-yellow-500 h-1.5 bg-zinc-800 rounded" />
                            </div>
                        </div>

                        {/* === COLOR OVERLAY === */}
                        <div className="space-y-3 pt-3 border-t border-zinc-800">
                            <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3" /> Color Overlay</span>
                            <div className="flex gap-3 items-center">
                                <input type="color" value={config.overlayColor} onChange={(e) => setConfig(prev => ({ ...prev, overlayColor: e.target.value }))} className="h-10 w-14 bg-transparent rounded cursor-pointer border border-zinc-700" />
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Opacidad</span><span>{(config.overlayOpacity * 100).toFixed(0)}%</span></div>
                                    <input type="range" min="0" max="0.5" step="0.01" value={config.overlayOpacity} onChange={(e) => setConfig(prev => ({ ...prev, overlayOpacity: Number(e.target.value) }))} className="w-full accent-violet-500 h-1.5 bg-zinc-800 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Reset */}
                        <button onClick={resetConfig} className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono uppercase tracking-wider hover:border-red-500 hover:text-red-400 transition-colors flex items-center justify-center gap-2 mt-2">
                            <RotateCcw className="w-4 h-4" /> Restaurar
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
