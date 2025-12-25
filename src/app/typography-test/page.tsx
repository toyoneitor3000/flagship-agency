'use client';

import {
    inter, roboto, openSans, montserrat, poppins, raleway, oswald, spaceGrotesk, syne, unbounded,
    playfairDisplay, merriweather, lora, ptSerif, cinzel, libreBaskerville, cormorantGaramond,
    bebasNeue, anton, abrilFatface, righteous, bangers, monoton, pressStart2P,
    dancingScript, caveat, satisfy, permanentMarker, indieFlower,
    robotoMono, spaceMono, jetBrainsMono, firaCode, inconsolata
} from '@/lib/fonts';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// --- DATA STRUCTURE ---

const categories = [
    {
        id: 'sans',
        label: 'Sans Serif',
        description: 'Modernas, legibles, limpias. Ideales para UI y textos técnicos.',
        fonts: [
            { name: 'Inter', font: inter }, { name: 'Roboto', font: roboto }, { name: 'Open Sans', font: openSans },
            { name: 'Montserrat', font: montserrat }, { name: 'Poppins', font: poppins }, { name: 'Raleway', font: raleway },
            { name: 'Oswald', font: oswald }, { name: 'Space Grotesk', font: spaceGrotesk }, { name: 'Syne', font: syne },
            { name: 'Unbounded', font: unbounded }
        ]
    },
    {
        id: 'serif',
        label: 'Serif',
        description: 'Clásicas, confiables, elegantes.',
        fonts: [
            { name: 'Playfair Display', font: playfairDisplay }, { name: 'Merriweather', font: merriweather },
            { name: 'Lora', font: lora }, { name: 'PT Serif', font: ptSerif }, { name: 'Cinzel', font: cinzel },
            { name: 'Libre Baskerville', font: libreBaskerville }, { name: 'Cormorant Garamond', font: cormorantGaramond }
        ]
    },
    {
        id: 'display',
        label: 'Display',
        description: 'Impactantes y únicas.',
        fonts: [
            { name: 'Bebas Neue', font: bebasNeue }, { name: 'Anton', font: anton }, { name: 'Abril Fatface', font: abrilFatface },
            { name: 'Righteous', font: righteous }, { name: 'Bangers', font: bangers }, { name: 'Monoton', font: monoton },
            { name: 'Press Start 2P', font: pressStart2P }
        ]
    },
    {
        id: 'script',
        label: 'Script / Hand',
        description: 'Manuscritas y personales.',
        fonts: [
            { name: 'Dancing Script', font: dancingScript }, { name: 'Caveat', font: caveat },
            { name: 'Satisfy', font: satisfy }, { name: 'Permanent Marker', font: permanentMarker },
            { name: 'Indie Flower', font: indieFlower }
        ]
    },
    {
        id: 'mono',
        label: 'Monospace',
        description: 'Estilo código y técnico.',
        fonts: [
            { name: 'Roboto Mono', font: robotoMono }, { name: 'Space Mono', font: spaceMono },
            { name: 'JetBrains Mono', font: jetBrainsMono }, { name: 'Fira Code', font: firaCode },
            { name: 'Inconsolata', font: inconsolata }
        ]
    }
];

export default function TypographyCatalog() {
    const [activeTab, setActiveTab] = useState('sans');
    const [assignments, setAssignments] = useState<{
        display: { name: string, className: string } | null;
        h1: { name: string, className: string } | null;
        h2: { name: string, className: string } | null;
        p: { name: string, className: string } | null;
    }>({
        display: { name: 'Righteous', className: righteous.className },
        h1: null,
        h2: null,
        p: null
    });
    const [showSystem, setShowSystem] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [deployStatus, setDeployStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // Metrics State
    const [metrics, setMetrics] = useState({
        displayTracking: -0.08,
        displayLeading: 0.85
    });

    const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

    const assignFont = (role: 'display' | 'h1' | 'h2' | 'p', font: { name: string, className: string }) => {
        setAssignments(prev => ({ ...prev, [role]: font }));
        setActiveMenu(null);
        setShowSystem(true);
    };

    const applyToSystem = () => {
        setDeployStatus('saving');

        if (assignments.display) localStorage.setItem('purrpurr_sys_display', assignments.display.name);
        if (assignments.h1) localStorage.setItem('purrpurr_sys_h1', assignments.h1.name);
        if (assignments.h2) localStorage.setItem('purrpurr_sys_h2', assignments.h2.name);
        if (assignments.p) localStorage.setItem('purrpurr_sys_p', assignments.p.name);

        // Save Metrics
        localStorage.setItem('purrpurr_sys_display_tracking', metrics.displayTracking.toString());
        localStorage.setItem('purrpurr_sys_display_leading', metrics.displayLeading.toString());

        // Simulate Deployment & Notify
        setTimeout(() => {
            window.dispatchEvent(new Event('purrpurr-sys-update'));
            setDeployStatus('success');

            setTimeout(() => {
                setDeployStatus('idle');
            }, 2000);
        }, 600);
    };

    const roles = [
        { id: 'display', label: 'Display Header', desc: 'Architecture Digital' },
        { id: 'h1', label: 'Title 1', desc: 'Page Headings' },
        { id: 'h2', label: 'Title 2', desc: 'Section Sections' },
        { id: 'p', label: 'Paragraph', desc: 'Body Text & Content' },
    ] as const;

    return (
        <div className='min-h-screen bg-zinc-950 text-zinc-100 pt-20 selection:bg-purple-500/30' data-section-theme='dark'>

            {/* Lab Status Bar (Netflix Code Style) */}
            <div className='fixed top-[70px] left-0 w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100/5'>
                <div className='max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-[10px] md:text-xs font-mono tracking-widest uppercase text-zinc-500'>
                    <div className='flex items-center gap-4'>
                        <span className='text-purple-500'>// PURRPURR_LABS</span>
                        <div className='h-3 w-px bg-zinc-800' />
                        <nav className='flex items-center gap-4'>
                            <span className='text-zinc-100 cursor-default'>01_TYPOGRAPHY</span>
                            <a href="/purrpurr-test" className='hover:text-purple-400 transition-colors'>02_COMPONENTS</a>
                            <a href="/purrpurr-test/slow" className='hover:text-purple-400 transition-colors'>03_1_LOADER</a>
                            <a href="/wallpaper-test" className='hover:text-purple-400 transition-colors'>04_WALLPAPERS</a>
                        </nav>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                        <span>SYSTEM_ONLINE</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className='max-w-7xl mx-auto px-4 py-12 mt-8'>

                {/* Hero Title */}
                <div className='mb-16'>
                    <h1 className='text-5xl md:text-7xl font-bold mb-6 tracking-tight'>
                        <span className='bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent'>Typo</span>
                        <span className='text-purple-600'>.Graphy</span>
                    </h1>
                    <p className='text-zinc-400 max-w-xl text-lg font-light leading-relaxed'>
                        The definitive collection of typefaces for the digital elite.
                        Engineered for readability, impact, and aesthetic superiority.
                    </p>
                </div>

                {/* Category Navigation (Netflix Tabs) */}
                <div className='sticky top-[110px] z-30 bg-zinc-950/90 backdrop-blur pb-8 mb-8 pt-4 border-b border-zinc-100/5'>
                    <div className='flex gap-2 overflow-x-auto no-scrollbar'>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all border ${activeTab === cat.id
                                    ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-[0_0_20px_rgba(240,255,204,0.2)]'
                                    : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-100'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className='mt-6 text-xs font-mono text-purple-400 flex items-center gap-2'>
                        <span className='text-lg'>&raquo;</span>
                        {activeCategory.description}
                    </div>
                </div>

                {/* Grid Showcase */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {activeCategory.fonts.map((item, index) => (
                        <div key={index} className='group relative p-8 rounded-xl bg-zinc-900/50 border border-zinc-100/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(109,40,217,0.1)] overflow-hidden'>

                            {/* Background Noise/Gradient on Hover */}
                            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                            {/* Font Header */}
                            <div className='relative flex items-center justify-between mb-8'>
                                <div className='flex items-center gap-3'>
                                    <span className='font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2 py-1 rounded'>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className='font-mono text-sm text-zinc-400 uppercase tracking-wider group-hover:text-zinc-100 transition-colors'>
                                        {item.name}
                                    </h3>
                                </div>
                                <div className='flex gap-1'>
                                    <div className='w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-purple-500 transition-colors' />
                                    <div className='w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-purple-500 transition-colors delay-75' />
                                    <div className='w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-purple-500 transition-colors delay-100' />
                                </div>
                            </div>

                            {/* Font Showcase */}
                            <div className={`${item.font.className} relative`}>
                                <h2 className='text-5xl md:text-6xl text-zinc-100 mb-4 leading-[0.9] tracking-tight group-hover:translate-x-1 transition-transform duration-300'>
                                    Architecture<br />
                                    <span className='text-zinc-600 group-hover:text-purple-400 transition-colors'>Digital</span>
                                </h2>

                                <p className='text-zinc-500 text-lg leading-relaxed mb-8 max-w-md group-hover:text-zinc-300 transition-colors'>
                                    Engineered primarily for maximum impact and readability in high-performance interfaces.
                                </p>

                                {/* Character Set */}
                                <div className='p-4 bg-zinc-950/40 rounded border border-zinc-100/5 font-mono text-[10px] text-zinc-600 tracking-[0.2em] leading-loose group-hover:border-zinc-100/10 group-hover:text-zinc-500 transition-colors'>
                                    ABCDEFGHIJKLM<br />
                                    NOPQRSTUVWXYZ<br />
                                    0123456789 &lt;/&gt;
                                </div>
                            </div>

                            {/* Action Button & Menu */}
                            <div className='absolute bottom-8 right-8 z-20'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenu(activeMenu === item.name ? null : item.name);
                                    }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${activeMenu === item.name
                                        ? 'bg-purple-500 text-white opacity-100 translate-y-0 rotate-45'
                                        : 'bg-zinc-100 text-zinc-950 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                                        }`}
                                >
                                    <span className='text-xl'>+</span>
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {activeMenu === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            className='absolute bottom-full right-0 mb-4 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden'
                                        >
                                            <div className='px-3 py-2 bg-zinc-950 border-b border-zinc-800'>
                                                <span className='text-[10px] font-mono text-zinc-500 uppercase block'>Assign to System</span>
                                            </div>
                                            <div className='p-1'>
                                                {roles.map(role => (
                                                    <button
                                                        key={role.id}
                                                        onClick={() => assignFont(role.id, { name: item.name, className: item.font.className })}
                                                        className='w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors flex items-center justify-between group/btn'
                                                    >
                                                        <span>{role.label}</span>
                                                        {assignments[role.id]?.name === item.name && (
                                                            <span className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Floating Toggle (When Hidden) */}
            {!showSystem && (
                <button
                    onClick={() => setShowSystem(true)}
                    className='fixed bottom-6 right-6 z-40 bg-zinc-900 border border-zinc-700 text-purple-400 px-4 py-2 rounded-full font-mono text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2'
                >
                    <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                    OPEN_SYSTEM_MONITOR
                </button>
            )}

            {/* System Monitor / Preview Panel */}
            <AnimatePresence>
                {showSystem && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        className='fixed bottom-0 left-0 w-full z-50 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]'
                    >
                        <div className='max-w-7xl mx-auto p-6'>
                            <div className='flex items-center justify-between mb-6 border-b border-zinc-800 pb-4'>
                                <h3 className='font-mono text-sm text-purple-400 tracking-widest uppercase flex items-center gap-2'>
                                    <span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
                                    System_Typography_Monitor
                                </h3>
                                <button
                                    onClick={() => setShowSystem(false)}
                                    className='text-zinc-500 hover:text-zinc-100 font-mono text-xs'
                                >
                                    [ CLOSE_MONITOR ]
                                </button>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
                                {/* Display Preview with Controls */}
                                <div className='space-y-4 col-span-1 md:col-span-2 relative group/preview'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2'>
                                            // DISPLAY_ROLE
                                            {assignments.display && <span className='text-purple-400 ml-2'>[{assignments.display.name}]</span>}
                                        </span>

                                        {/* Metrics Controls (Visible on Hover/Focus) */}
                                        <div className='flex gap-4 opacity-100 transition-opacity'>
                                            <div className='flex flex-col gap-1 w-24'>
                                                <label className='text-[8px] font-mono text-zinc-600 uppercase'>TRACKING: {metrics.displayTracking}em</label>
                                                <input
                                                    type="range"
                                                    min="-0.2" max="0.5" step="0.01"
                                                    value={metrics.displayTracking}
                                                    onChange={(e) => setMetrics(prev => ({ ...prev, displayTracking: parseFloat(e.target.value) }))}
                                                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:rounded-full"
                                                />
                                            </div>
                                            <div className='flex flex-col gap-1 w-24'>
                                                <label className='text-[8px] font-mono text-zinc-600 uppercase'>LEADING: {metrics.displayLeading}</label>
                                                <input
                                                    type="range"
                                                    min="0.5" max="2.0" step="0.05"
                                                    value={metrics.displayLeading}
                                                    onChange={(e) => setMetrics(prev => ({ ...prev, displayLeading: parseFloat(e.target.value) }))}
                                                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {assignments.display ? (
                                        <div
                                            className={`${assignments.display.className} text-4xl md:text-5xl text-zinc-100 transition-all duration-200`}
                                            style={{
                                                letterSpacing: `${metrics.displayTracking}em`,
                                                lineHeight: metrics.displayLeading
                                            }}
                                        >
                                            Architecture<br />Digital
                                        </div>
                                    ) : (
                                        <span className='text-zinc-700 font-mono text-xs'>[ NO_ASSIGNMENT ]</span>
                                    )}
                                </div>

                                {/* H1 Preview */}
                                <div className='space-y-2'>
                                    <span className='text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2'>
                                        // TITLE_01_ROLE
                                        {assignments.h1 && <span className='text-purple-400 ml-2'>[{assignments.h1.name}]</span>}
                                    </span>
                                    {assignments.h1 ? (
                                        <div className={`${assignments.h1.className} text-2xl text-zinc-200 font-bold`}>
                                            The Rapid Fox<br />Jumps Over.
                                        </div>
                                    ) : (
                                        <span className='text-zinc-700 font-mono text-xs'>[ NO_ASSIGNMENT ]</span>
                                    )}
                                </div>

                                {/* H2 Preview */}
                                <div className='space-y-2'>
                                    <span className='text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2'>
                                        // TITLE_02_ROLE
                                        {assignments.h2 && <span className='text-purple-400 ml-2'>[{assignments.h2.name}]</span>}
                                    </span>
                                    {assignments.h2 ? (
                                        <div className={`${assignments.h2.className} text-xl text-zinc-300`}>
                                            Engineered aesthetic superiority.
                                        </div>
                                    ) : (
                                        <span className='text-zinc-700 font-mono text-xs'>[ NO_ASSIGNMENT ]</span>
                                    )}
                                </div>

                                {/* Paragraph Preview */}
                                <div className='space-y-2'>
                                    <span className='text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2'>
                                        // BODY_ROLE
                                        {assignments.p && <span className='text-purple-400 ml-2'>[{assignments.p.name}]</span>}
                                    </span>
                                    {assignments.p ? (
                                        <div className={`${assignments.p.className} text-sm text-zinc-400 leading-relaxed`}>
                                            The definitive collection of typefaces for the digital elite.
                                            Designed for readability and impact.
                                        </div>
                                    ) : (
                                        <span className='text-zinc-700 font-mono text-xs'>[ NO_ASSIGNMENT ]</span>
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center justify-between mt-8 pt-6 border-t border-zinc-900'>
                                <div className='font-mono text-[10px] text-zinc-600'>
                                    STATUS: <span className='text-emerald-500'>READY_TO_DEPLOY</span>
                                </div>
                                <button
                                    onClick={applyToSystem}
                                    disabled={deployStatus !== 'idle'}
                                    className={`px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center gap-2
                                        ${deployStatus === 'success' ? 'bg-emerald-500 text-zinc-950 scale-105' : 'bg-purple-600 hover:bg-purple-500 text-white'}
                                        ${deployStatus === 'saving' ? 'opacity-80 cursor-wait' : ''}
                                    `}
                                >
                                    {deployStatus === 'idle' && 'APPLY_TO_SYSTEM >'}
                                    {deployStatus === 'saving' && (
                                        <>
                                            <span className='w-2 h-2 rounded-full border-2 border-white/30 border-t-white animate-spin' />
                                            DEPLOYING...
                                        </>
                                    )}
                                    {deployStatus === 'success' && 'SYSTEM_DEPLOYED_Ok'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
