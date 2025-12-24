'use client';

import {
    // Sans Serif
    Inter, Roboto, Open_Sans, Montserrat, Poppins, Raleway, Oswald, Space_Grotesk, Syne, Unbounded,

    // Serif
    Playfair_Display, Merriweather, Lora, PT_Serif, Cinzel, Libre_Baskerville, Cormorant_Garamond,

    // Display
    Bebas_Neue, Anton, Abril_Fatface, Righteous, Bangers, Monoton, Press_Start_2P,

    // Handwriting
    Dancing_Script, Caveat, Satisfy, Permanent_Marker, Indie_Flower,

    // Monospace
    Roboto_Mono, Space_Mono, JetBrains_Mono, Fira_Code, Inconsolata
} from 'next/font/google';

import { useState } from 'react';

// --- INITIALIZE FONTS (Curated Selection) ---

// Sans Serif
const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const raleway = Raleway({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const syne = Syne({ subsets: ['latin'] });
const unbounded = Unbounded({ subsets: ['latin'] });

// Serif
const playfairDisplay = Playfair_Display({ subsets: ['latin'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'] });
const lora = Lora({ subsets: ['latin'] });
const ptSerif = PT_Serif({ subsets: ['latin'], weight: ['400', '700'] });
const cinzel = Cinzel({ subsets: ['latin'] });
const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] });
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'] });

// Display
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });
const anton = Anton({ subsets: ['latin'], weight: ['400'] });
const abrilFatface = Abril_Fatface({ subsets: ['latin'], weight: ['400'] });
const righteous = Righteous({ subsets: ['latin'], weight: ['400'] });
const bangers = Bangers({ subsets: ['latin'], weight: ['400'] });
const monoton = Monoton({ subsets: ['latin'], weight: ['400'] });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: ['400'] });

// Handwriting
const dancingScript = Dancing_Script({ subsets: ['latin'] });
const caveat = Caveat({ subsets: ['latin'] });
const satisfy = Satisfy({ subsets: ['latin'], weight: ['400'] });
const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: ['400'] });
const indieFlower = Indie_Flower({ subsets: ['latin'], weight: ['400'] });

// Monospace
const robotoMono = Roboto_Mono({ subsets: ['latin'] });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'] });
const inconsolata = Inconsolata({ subsets: ['latin'] });

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

    const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

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

                            {/* Action Button */}
                            <button className='absolute bottom-8 right-8 w-10 h-10 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110'>
                                <span className='text-xl'>+</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
