'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Monitor, Smartphone, Maximize2, Layers, Sun, Palette, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePurrpurrLab } from '@/hooks/usePurrpurrLab';

// --- WALLPAPER PRESETS (Legacy) ---
const wallpapers = [
    {
        id: 'clean-paper',
        name: 'Clean Paper',
        className: 'bg-zinc-50 border-zinc-200',
        code: `<div className="bg-zinc-50" />`
    },
    {
        id: 'dark-matter',
        name: 'Dark Matter',
        className: 'bg-zinc-950 border-zinc-900',
        code: `<div className="bg-zinc-950" />`
    },
    {
        id: 'subtle-grid',
        name: 'Subtle Grid',
        className: 'bg-zinc-50 border-zinc-200',
        children: (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        ),
        code: `bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]`
    },
    {
        id: 'cyber-grid',
        name: 'Cyber Grid',
        className: 'bg-zinc-950 border-zinc-900',
        children: (
            <>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]" />
            </>
        ),
        code: `/* Cyber Grid with Glow */`
    },
    // ... Additional presets can stay or be removed as needed
];

// --- BRAND PALETTE ---
const mainPalette = [
    { name: 'Pure White', hex: '#FFFFFF', class: 'bg-white' },
    { name: 'Zinc 50', hex: '#FAFAFA', class: 'bg-zinc-50' },
    { name: 'Zinc 100', hex: '#F4F4F5', class: 'bg-zinc-100' },
    { name: 'Zinc 200', hex: '#E4E4E7', class: 'bg-zinc-200' },
    { name: 'Zinc 800', hex: '#27272A', class: 'bg-zinc-800' },
    { name: 'Zinc 900', hex: '#18181B', class: 'bg-zinc-900' },
    { name: 'Zinc 950', hex: '#09090B', class: 'bg-zinc-950' },
    { name: 'Pure Black', hex: '#000000', class: 'bg-black' },
    { name: 'Brand Purple', hex: '#6D28D9', class: 'bg-purple-600' },
    { name: 'Neon Green', hex: '#00FF9C', class: 'bg-[#00FF9C]' },
    { name: 'Mint', hex: '#A7F3D0', class: 'bg-emerald-200' },
    { name: 'Deep Blue', hex: '#1E3A8A', class: 'bg-blue-900' },
    { name: 'Hot Pink', hex: '#DB2777', class: 'bg-pink-600' },
    { name: 'Orange', hex: '#EA580C', class: 'bg-orange-600' },
    { name: 'Yellow', hex: '#CA8A04', class: 'bg-yellow-600' },
];

// --- HELPER FUNCTIONS ---
const getContrastTheme = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? 'light' : 'dark';
};

const hexToHsv = (hex: string) => {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) h = 0;
    else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
};

const hsvToHex = (h: number, s: number, v: number) => {
    let r, g, b;
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s / 100) / 100;
    const q = v * (1 - f * s / 100) / 100;
    const t = v * (1 - (1 - f) * s / 100) / 100;
    const val = v / 100;

    switch (i % 6) {
        case 0: r = val; g = t; b = p; break;
        case 1: r = q; g = val; b = p; break;
        case 2: r = p; g = val; b = t; break;
        case 3: r = p; g = q; b = val; break;
        case 4: r = t; g = p; b = val; break;
        case 5: r = val; g = p; b = q; break;
        default: r = 0; g = 0; b = 0;
    }

    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export default function WallpaperTestPage() {
    const [activeWallpaper, setActiveWallpaper] = useState<{ id: string, name: string, className: string, code: string, children?: React.ReactNode } | null>(wallpapers[0]);

    // --- PURRPURR LAB: Live data from database ---
    const { palettes, effects: dbEffects, patterns, loading: labLoading } = usePurrpurrLab();

    // PRIMARY COLOR STATE
    const [customColor, setCustomColor] = useState('#6D28D9');
    const [hsv, setHsv] = useState({ h: 263, s: 82, v: 85 });

    // SECONDARY COLOR STATE (CONTRAST)
    const [secondaryColor, setSecondaryColor] = useState('#00FF9C');
    const [secondaryHsv, setSecondaryHsv] = useState({ h: 157, s: 100, v: 100 });

    // EDITOR MODE: PRIMARY vs SECONDARY
    const [activeColorLayer, setActiveColorLayer] = useState<'primary' | 'secondary'>('primary');

    const [isDraggingSB, setIsDraggingSB] = useState(false);
    const [isDraggingHue, setIsDraggingHue] = useState(false);

    const [copied, setCopied] = useState('');
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // Scroll Detection for Navbar Sync
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // UI Effects State
    const [effects, setEffects] = useState({
        grid: false,
        dots: false,
        scanlines: false,
        mesh: false,
        ambient: false,
        scanner: false,
        pulse: false,
        noise: false,
        vignette: false,
        blur: false
    });

    // Theme Logic
    const isCustomMode = !activeWallpaper;
    const currentTheme = isCustomMode ? getContrastTheme(customColor) : (activeWallpaper?.id === 'clean-paper' ? 'light' : 'dark');
    const sectionTheme = currentTheme;

    // HELPER: SET COLOR BASED ON LAYER
    const updateActiveColor = (newHex: string, newHsv: { h: number, s: number, v: number }) => {
        if (activeColorLayer === 'primary') {
            setCustomColor(newHex);
            setHsv(newHsv);
        } else {
            setSecondaryColor(newHex);
            setSecondaryHsv(newHsv);
        }
        setActiveWallpaper(null);
    };

    // Handle Hex Input Change
    const handleHexChange = (hex: string) => {
        if (activeColorLayer === 'primary') setCustomColor(hex);
        else setSecondaryColor(hex);

        if (/^#[0-9A-F]{6}$/i.test(hex)) {
            const newHsv = hexToHsv(hex);
            if (activeColorLayer === 'primary') setHsv(newHsv);
            else setSecondaryHsv(newHsv);
        }
        setActiveWallpaper(null);
    };

    // Handle Palette Click
    const handlePaletteClick = (hex: string) => {
        const newHsv = hexToHsv(hex);
        updateActiveColor(hex, newHsv);
    };

    // --- PICKER INTERACTION ---
    const handleSBChange = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
        const rect = (document.getElementById('sb-box') as HTMLDivElement).getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Clamp
        if (x < 0) x = 0; if (x > rect.width) x = rect.width;
        if (y < 0) y = 0; if (y > rect.height) y = rect.height;

        const s = Math.round((x / rect.width) * 100);
        const v = Math.round(100 - (y / rect.height) * 100);

        const currentActiveHsv = activeColorLayer === 'primary' ? hsv : secondaryHsv;
        const newHsv = { ...currentActiveHsv, s, v };

        updateActiveColor(hsvToHex(newHsv.h, newHsv.s, newHsv.v), newHsv);
    };

    const handleHueChange = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
        const rect = (document.getElementById('hue-slider') as HTMLDivElement).getBoundingClientRect();
        let y = e.clientY - rect.top;

        // Clamp
        if (y < 0) y = 0; if (y > rect.height) y = rect.height;

        const h = Math.round((y / rect.height) * 360);
        const currentActiveHsv = activeColorLayer === 'primary' ? hsv : secondaryHsv;
        const newHsv = { ...currentActiveHsv, h: h === 360 ? 0 : h };

        updateActiveColor(hsvToHex(newHsv.h, newHsv.s, newHsv.v), newHsv);
    };

    const copyToClipboard = (text: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(''), 2000);
    };

    const [patternScale, setPatternScale] = useState(50);
    const [patternMode, setPatternMode] = useState<'solid' | 'spotlight' | 'aurora' | 'velvet' | 'cyber' | 'proton' | 'molten' | 'data' | 'nebula' | 'vortex' | 'net'>('spotlight');

    const toggleEffect = (effect: keyof typeof effects) => {
        setEffects(prev => ({ ...prev, [effect]: !prev[effect] }));
    };

    // --- DYNAMIC BACKGROUND ENGINE ---
    const getBackgroundStyle = () => {
        if (!isCustomMode) return {};

        const h1 = hsv.h; const s1 = hsv.s; const v1 = hsv.v;
        const h2 = secondaryHsv.h; const s2 = secondaryHsv.s; const v2 = secondaryHsv.v;

        switch (patternMode) {
            case 'solid':
                return { backgroundColor: customColor };
            case 'spotlight':
                return {
                    backgroundColor: customColor,
                    backgroundImage: `radial-gradient(circle at 50% 0%, hsl(${h1}, ${s1}%, ${Math.min(100, v1 + 20)}%) 0%, hsl(${h1}, ${s1}%, ${Math.max(0, v1 - 30)}%) 100%)`
                };
            case 'aurora': // Mixed Primary and Secondary
                return {
                    backgroundColor: `hsl(${h1}, ${s1}%, ${Math.max(0, v1 - 40)}%)`,
                    backgroundImage: `
                        radial-gradient(at 0% 0%, hsl(${h2}, ${s2}%, ${v2}%) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, hsl(${h2}, ${s2}%, ${v2}%) 0px, transparent 50%),
                        radial-gradient(at 50% 100%, hsl(${h1}, ${s1}%, ${v1}%) 0px, transparent 50%)
                    `
                };
            case 'velvet':
                return {
                    backgroundColor: `hsl(${h1}, ${s1}%, ${Math.max(0, v1 - 50)}%)`,
                    backgroundImage: `radial-gradient(circle at 50% 50%, hsl(${h1}, ${s1}%, ${v1}%) 0%, transparent 80%)`
                };
            case 'cyber':
                const cyberScale = Math.max(20, patternScale);
                return {
                    backgroundColor: `hsl(${h1}, ${s1}%, 5%)`, // Dark base
                    backgroundImage: `
                        linear-gradient(0deg, transparent 24%, rgba(${parseInt(secondaryColor.slice(1, 3), 16)}, ${parseInt(secondaryColor.slice(3, 5), 16)}, ${parseInt(secondaryColor.slice(5, 7), 16)}, .1) 25%, transparent 26%), 
                        linear-gradient(90deg, transparent 24%, rgba(${parseInt(secondaryColor.slice(1, 3), 16)}, ${parseInt(secondaryColor.slice(3, 5), 16)}, ${parseInt(secondaryColor.slice(5, 7), 16)}, .1) 25%, transparent 26%),
                        radial-gradient(circle at 50% 0%, hsl(${h1}, 100%, 50%) 0%, transparent 60%)
                    `,
                    backgroundSize: `${cyberScale}px ${cyberScale}px, ${cyberScale}px ${cyberScale}px, 100% 100%`
                };
            case 'proton': // Conflict / Split
                return {
                    backgroundColor: customColor,
                    backgroundImage: `linear-gradient(${135 + (patternScale - 50)}deg, ${customColor} 0%, ${secondaryColor} 100%)`
                };
            case 'molten': // Liquid mix
                const moltenSize = Math.max(30, patternScale);
                return {
                    backgroundColor: customColor,
                    backgroundImage: `
                        radial-gradient(circle at 20% 80%, ${secondaryColor}, transparent ${moltenSize}%),
                        radial-gradient(circle at 80% 20%, ${secondaryColor}, transparent ${moltenSize}%),
                        radial-gradient(circle at 50% 50%, ${customColor}, transparent 60%)
                    `
                }
            case 'data': // Matrix-like
                const dataScale = Math.max(20, patternScale);
                return {
                    backgroundColor: '#000',
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)),
                        repeating-linear-gradient(0deg, transparent, transparent 2px, ${secondaryColor} 2px, ${secondaryColor} 4px),
                        repeating-linear-gradient(90deg, transparent, transparent ${dataScale}px, ${customColor} ${dataScale}px, ${customColor} ${dataScale + 1}px)
                    `,
                    backgroundSize: `100% 4px, 100% 4px, ${dataScale + 1}px 100%`
                };
            case 'nebula': // Deep Space mix
                return {
                    backgroundColor: '#050505',
                    backgroundImage: `
                        radial-gradient(circle at 50% 50%, transparent 0%, #000 100%),
                        radial-gradient(circle at 80% 0%, ${secondaryColor} 0%, transparent 50%),
                        radial-gradient(circle at 20% 100%, ${customColor} 0%, transparent 50%),
                        radial-gradient(circle at 0% 0%, ${customColor} 0%, transparent 30%)
                     `
                };
            case 'vortex':
                return {
                    backgroundColor: customColor,
                    backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, ${customColor} 0deg, ${secondaryColor} ${Math.max(10, patternScale / 2)}deg, ${customColor} ${Math.max(20, patternScale)}deg)`
                };
            case 'net':
                const netScale = Math.max(20, patternScale);
                return {
                    backgroundColor: customColor,
                    backgroundImage: `
                        linear-gradient(45deg, ${secondaryColor} 25%, transparent 25%, transparent 75%, ${secondaryColor} 75%, ${secondaryColor}),
                        linear-gradient(45deg, ${secondaryColor} 25%, transparent 25%, transparent 75%, ${secondaryColor} 75%, ${secondaryColor})
                    `,
                    backgroundPosition: `0 0, ${netScale / 2}px ${netScale / 2}px`,
                    backgroundSize: `${netScale}px ${netScale}px`
                };

            default:
                return { backgroundColor: customColor };
        }
    };

    return (
        <div
            className={cn(
                "min-h-screen transition-all duration-700 flex flex-col relative",
                isCustomMode ? "" : activeWallpaper?.className
            )}
            style={getBackgroundStyle()}
            data-section-theme={sectionTheme}
            // Global Mouse Up to stop dragging
            onMouseUp={() => { setIsDraggingSB(false); setIsDraggingHue(false); }}
            onMouseMove={(e) => {
                if (isDraggingSB) handleSBChange(e as any);
                if (isDraggingHue) handleHueChange(e as any);
            }}
        >
            {activeWallpaper?.children}

            {/* Same Overlay Effects Logic (Preserved) */}
            {effects.grid && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
            )}
            {effects.dots && (
                <div className="absolute inset-0 bg-[radial-gradient(#80808025_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0" />
            )}
            {effects.scanlines && (
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)50%,rgba(0,0,0,0.1)50%,rgba(0,0,0,0.1))] bg-[size:100%_4px] pointer-events-none z-0" />
            )}
            {effects.mesh && (
                <div className="absolute inset-0 bg-[radial-gradient(at_top_left,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(at_bottom_right,rgba(0,0,0,0.2)_0%,transparent_50%)] pointer-events-none z-0" />
            )}

            {/* DYNAMIC LAYERS */}
            {effects.ambient && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[120px] mix-blend-overlay"
                        style={{ backgroundColor: secondaryColor }}
                    />
                    <motion.div
                        animate={{
                            x: [0, -100, 0],
                            y: [0, -50, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] mix-blend-overlay"
                        style={{ backgroundColor: customColor }}
                    />
                </div>
            )}
            {effects.scanner && (
                <motion.div
                    initial={{ top: '-10%' }}
                    animate={{ top: '110%' }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none z-0 mix-blend-overlay"
                />
            )}
            {effects.pulse && (
                <motion.div
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white pointer-events-none z-0 mix-blend-overlay"
                />
            )}
            {effects.vignette && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-0" />
            )}
            {effects.blur && (
                <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none z-0" />
            )}
            {effects.noise && (
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
            )}

            {/* Lab Status Bar */}
            <div className={cn(
                'fixed left-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100/5 transition-all duration-300',
                isScrolled ? 'top-[40px] md:top-[45px]' : 'top-[80px]'
            )}>
                <div className='max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-[10px] md:text-xs font-mono tracking-widest uppercase text-zinc-500'>
                    <div className='flex items-center gap-4'>
                        <span className='text-purple-500'>// PURRPURR_LABS</span>
                        <div className='h-3 w-px bg-zinc-800' />
                        <nav className='flex items-center gap-4'>
                            <a href="/typography-test" className='hover:text-purple-400 transition-colors'>01_TYPOGRAPHY</a>
                            <a href="/purrpurr-test" className='hover:text-purple-400 transition-colors'>02_COMPONENTS</a>
                            <a href="/purrpurr-test/slow" className='hover:text-purple-400 transition-colors'>03_1_LOADER</a>
                            <span className='text-zinc-100 cursor-default'>04_WALLPAPERS</span>
                            <a href="/creative-test" className='hover:text-purple-400 transition-colors'>05_CREATIVE</a>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={cn("flex-grow pt-32 px-4 transition-opacity duration-500 relative z-10", isPreviewMode ? "opacity-0 pointer-events-none" : "opacity-100")}>
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <div>
                            <h1 className={cn("text-5xl md:text-7xl font-bold mb-4 tracking-tight transition-colors duration-500", sectionTheme === 'light' ? "text-zinc-900" : "text-white")}>
                                Wallpaper<span className="text-purple-500">.Lab</span>
                            </h1>
                            <p className={cn("text-lg max-w-2xl font-light", sectionTheme === 'light' ? "text-zinc-600" : "text-zinc-400")}>
                                Advanced generative background engine.
                            </p>
                        </div>

                        {/* Global Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsPreviewMode(true)}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-900/20"
                            >
                                <Maximize2 className="w-4 h-4" />
                                Full Screen
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* LEFT: The Studio (Color & Controls) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className={cn(
                                "p-6 rounded-3xl border backdrop-blur-xl space-y-6 sticky top-32",
                                sectionTheme === 'light' ? "bg-white/80 border-zinc-200" : "bg-black/60 border-zinc-800"
                            )}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Palette className="w-5 h-5 text-purple-500" />
                                        <h2 className={cn("text-lg font-bold", sectionTheme === 'light' ? "text-zinc-900" : "text-white")}>Color Engine</h2>
                                    </div>
                                    <div className="flex bg-black/20 p-1 rounded-lg">
                                        <button
                                            onClick={() => setActiveColorLayer('primary')}
                                            className={cn("px-3 py-1 rounded text-xs font-bold transition-all", activeColorLayer === 'primary' ? "bg-white text-black shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
                                        >
                                            Pri
                                        </button>
                                        <button
                                            onClick={() => setActiveColorLayer('secondary')}
                                            className={cn("px-3 py-1 rounded text-xs font-bold transition-all", activeColorLayer === 'secondary' ? "bg-white text-black shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
                                        >
                                            Sec
                                        </button>
                                    </div>
                                </div>

                                {/* PICKER */}
                                <div className="flex gap-4 h-48 select-none">
                                    <div
                                        id="sb-box"
                                        className="flex-grow h-full rounded-2xl relative cursor-crosshair overflow-hidden shadow-inner border border-white/10 group bg-black"
                                        style={{
                                            backgroundColor: `hsl(${activeColorLayer === 'primary' ? hsv.h : secondaryHsv.h}, 100%, 50%)`,
                                            backgroundImage: 'linear-gradient(to top, #000, transparent), linear-gradient(to right, #FFF, transparent)'
                                        }}
                                        onMouseDown={(e) => { setIsDraggingSB(true); handleSBChange(e); }}
                                    >
                                        <div className="absolute w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-sm" style={{
                                            left: `${activeColorLayer === 'primary' ? hsv.s : secondaryHsv.s}%`,
                                            top: `${100 - (activeColorLayer === 'primary' ? hsv.v : secondaryHsv.v)}%`
                                        }} />
                                    </div>
                                    <div
                                        id="hue-slider"
                                        className="w-10 h-full rounded-2xl relative cursor-pointer overflow-hidden shadow-inner border border-white/10"
                                        style={{ background: 'linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                                        onMouseDown={(e) => { setIsDraggingHue(true); handleHueChange(e); }}
                                    >
                                        <div className="absolute w-full h-2 bg-white border border-black/10 translate-y-[-50%] pointer-events-none" style={{ top: `${((activeColorLayer === 'primary' ? hsv.h : secondaryHsv.h) / 360) * 100}%` }} />
                                    </div>
                                </div>

                                {/* INPUTS & PALETTE */}
                                <div className="space-y-4">
                                    <div className={cn("p-3 rounded-xl border flex items-center justify-between", sectionTheme === 'light' ? "bg-zinc-50 border-zinc-200" : "bg-zinc-900/50 border-zinc-700")}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full shadow-inner border border-white/10" style={{ backgroundColor: activeColorLayer === 'primary' ? customColor : secondaryColor }} />
                                            <input
                                                type="text"
                                                value={(activeColorLayer === 'primary' ? customColor : secondaryColor).toUpperCase()}
                                                onChange={(e) => handleHexChange(e.target.value)}
                                                maxLength={7}
                                                className={cn("bg-transparent font-mono font-bold text-lg outline-none w-24 uppercase", sectionTheme === 'light' ? "text-zinc-900" : "text-white")}
                                            />
                                        </div>
                                        <button onClick={() => copyToClipboard(activeColorLayer === 'primary' ? customColor : secondaryColor)} className="text-zinc-400 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                                    </div>

                                    {/* Color Palette - FROM DATABASE */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {labLoading ? (
                                            <div className="col-span-4 flex justify-center py-4">
                                                <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                                            </div>
                                        ) : palettes.length > 0 ? (
                                            // Use palettes from Purrpurr Lab DB
                                            palettes.map((palette) => (
                                                <button
                                                    key={palette.id}
                                                    onClick={() => handlePaletteClick(palette.primary)}
                                                    className="group p-2 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all bg-white/5"
                                                    title={palette.name}
                                                >
                                                    <div className="flex gap-0.5 mb-1 justify-center">
                                                        <div className="w-3 h-3 rounded-full" style={{ background: palette.primary }} />
                                                        <div className="w-3 h-3 rounded-full" style={{ background: palette.accent }} />
                                                    </div>
                                                    <span className="text-[8px] font-mono text-zinc-500 group-hover:text-white block text-center truncate">
                                                        {palette.name}
                                                    </span>
                                                </button>
                                            ))
                                        ) : (
                                            // Fallback to local palette
                                            mainPalette.slice(0, 8).map((color) => (
                                                <button
                                                    key={color.name}
                                                    onClick={() => handlePaletteClick(color.hex)}
                                                    className={cn("aspect-square rounded-full border border-white/10 hover:scale-110 transition-transform", color.class)}
                                                    title={color.name}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* PATTERN SETTINGS */}
                                <div>
                                    <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2"><Sun className="w-3 h-3" /> Pattern Scale</h3>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={patternScale}
                                        onChange={(e) => setPatternScale(Number(e.target.value))}
                                        className="w-full accent-purple-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                                        <span>Fine</span>
                                        <span>{patternScale}%</span>
                                        <span>Coarse</span>
                                    </div>
                                </div>

                                {/* EFFECTS CONTROL - FROM DATABASE */}
                                <div>
                                    <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2"><Layers className="w-3 h-3" /> FX Layers</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(dbEffects.length > 0 ? dbEffects : [
                                            { id: 'grid', slug: 'grid', name: 'Grid' }, { id: 'dots', slug: 'dots', name: 'Dots' },
                                            { id: 'scanlines', slug: 'scanlines', name: 'Scanline' }, { id: 'mesh', slug: 'mesh', name: 'Mesh' },
                                            { id: 'ambient', slug: 'ambient', name: 'Ambient' }, { id: 'scanner', slug: 'scanner', name: 'Scanner' },
                                            { id: 'pulse', slug: 'pulse', name: 'Pulse' }, { id: 'noise', slug: 'noise', name: 'Noise' },
                                            { id: 'vignette', slug: 'vignette', name: 'Vignette' }, { id: 'blur', slug: 'blur', name: 'Blur' }
                                        ]).map((effect) => (
                                            <button
                                                key={effect.id}
                                                onClick={() => toggleEffect(effect.slug as any)}
                                                className={cn(
                                                    "px-2 py-1.5 rounded-md text-[10px] font-bold uppercase border transition-all",
                                                    effects[effect.slug as keyof typeof effects]
                                                        ? "bg-purple-500 text-white border-purple-500"
                                                        : "bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500"
                                                )}
                                            >
                                                {effect.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT: The Gallery (Generators) */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* GENERATIVE PATTERNS */}
                            <div>
                                <h3 className={cn("text-xs font-mono uppercase tracking-widest mb-6 font-bold flex items-center gap-2", sectionTheme === 'light' ? "text-zinc-500" : "text-zinc-500")}>
                                    <Sun className="w-4 h-4" /> Generative Patterns
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['solid', 'spotlight', 'aurora', 'velvet', 'cyber', 'proton', 'molten', 'data', 'nebula', 'vortex', 'net'].map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => { setPatternMode(mode as any); setActiveWallpaper(null); }}
                                            className={cn(
                                                "relative h-40 rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.02] text-left group",
                                                patternMode === mode && isCustomMode
                                                    ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                                                    : "border-transparent hover:border-zinc-500/50"
                                            )}
                                        >
                                            {/* Preview functionality simulated inline */}
                                            <div className="absolute inset-0" style={
                                                (function () {
                                                    const h1 = hsv.h; const s1 = hsv.s; const v1 = hsv.v;
                                                    const h2 = secondaryHsv.h; const s2 = secondaryHsv.s; const v2 = secondaryHsv.v;

                                                    // Simple hex parsing for gradients
                                                    const secR = parseInt(secondaryColor.slice(1, 3), 16);
                                                    const secG = parseInt(secondaryColor.slice(3, 5), 16);
                                                    const secB = parseInt(secondaryColor.slice(5, 7), 16);

                                                    const scale = patternScale; // Use current scale for preview

                                                    if (mode === 'solid') return { backgroundColor: customColor };
                                                    if (mode === 'spotlight') return { backgroundColor: customColor, backgroundImage: `radial-gradient(circle at 50% 0%, hsl(${h1}, ${Math.min(100, s1 - 20)}%, ${Math.min(100, v1 + 20)}%) 0%, hsl(${h1}, ${s1}%, ${Math.max(0, v1 - 20)}%) 100%)` };
                                                    if (mode === 'aurora') return { backgroundColor: `hsl(${h1}, ${s1}%, ${Math.max(0, v1 - 40)}%)`, backgroundImage: `radial-gradient(at 0% 0%, hsl(${h2}, ${s2}%, ${v2}%) 0px, transparent 50%), radial-gradient(at 100% 0%, hsl(${h2}, ${s2}%, ${v2}%) 0px, transparent 50%), radial-gradient(at 50% 100%, hsl(${h1}, ${s1}%, ${v1}%) 0px, transparent 50%)` };
                                                    if (mode === 'velvet') return { backgroundColor: `hsl(${h1}, ${s1}%, ${Math.max(0, v1 - 50)}%)`, backgroundImage: `radial-gradient(circle at 50% 50%, hsl(${h1}, ${s1}%, ${v1}%) 0%, transparent 80%)` };
                                                    if (mode === 'cyber') { const s = Math.max(20, scale); return { backgroundColor: `hsl(${h1}, ${s1}%, 5%)`, backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(${secR},${secG},${secB},.1) 25%, transparent 26%), linear-gradient(90deg, transparent 24%, rgba(${secR},${secG},${secB},.1) 25%, transparent 26%), radial-gradient(circle at 50% 0%, hsl(${h1}, 100%, 50%) 0%, transparent 60%)`, backgroundSize: `${s}px ${s}px, ${s}px ${s}px, 100% 100%` }; }
                                                    if (mode === 'proton') return { backgroundColor: customColor, backgroundImage: `linear-gradient(${135 + (scale - 50)}deg, ${customColor} 0%, ${secondaryColor} 100%)` };
                                                    if (mode === 'molten') { const s = Math.max(30, scale); return { backgroundColor: customColor, backgroundImage: `radial-gradient(circle at 20% 80%, ${secondaryColor}, transparent ${s}%), radial-gradient(circle at 80% 20%, ${secondaryColor}, transparent ${s}%), radial-gradient(circle at 50% 50%, ${customColor}, transparent 60%)` }; }
                                                    if (mode === 'data') { const s = Math.max(20, scale); return { backgroundColor: '#000', backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), repeating-linear-gradient(0deg, transparent, transparent 2px, ${secondaryColor} 2px, ${secondaryColor} 4px), repeating-linear-gradient(90deg, transparent, transparent ${s}px, ${customColor} ${s}px, ${customColor} ${s + 1}px)`, backgroundSize: `100% 4px, 100% 4px, ${s + 1}px 100%` }; }
                                                    if (mode === 'nebula') return { backgroundColor: '#050505', backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0%, #000 100%), radial-gradient(circle at 80% 0%, ${secondaryColor} 0%, transparent 50%), radial-gradient(circle at 20% 100%, ${customColor} 0%, transparent 50%), radial-gradient(circle at 0% 0%, ${customColor} 0%, transparent 30%)` };
                                                    if (mode === 'vortex') return { backgroundColor: customColor, backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, ${customColor} 0deg, ${secondaryColor} ${Math.max(10, scale / 2)}deg, ${customColor} ${Math.max(20, scale)}deg)` };
                                                    if (mode === 'net') { const s = Math.max(20, scale); return { backgroundColor: customColor, backgroundImage: `linear-gradient(45deg, ${secondaryColor} 25%, transparent 25%, transparent 75%, ${secondaryColor} 75%, ${secondaryColor}), linear-gradient(45deg, ${secondaryColor} 25%, transparent 25%, transparent 75%, ${secondaryColor} 75%, ${secondaryColor})`, backgroundPosition: `0 0, ${s / 2}px ${s / 2}px`, backgroundSize: `${s}px ${s}px` }; }
                                                    return {};
                                                })()
                                            } />

                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors p-6 flex flex-col justify-end">
                                                <h4 className="text-white font-bold text-xl capitalize">{mode}</h4>
                                                <p className="text-white/60 text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Activate Generator</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>



                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
