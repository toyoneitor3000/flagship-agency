'use client';

import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import {
    Download,
    ShieldCheck,
    Clock,
    Award,
    Sparkle,
    CheckCircle2,
    Palette
} from 'lucide-react';

export default function WrapPromoGraphic() {
    const graphicRef = useRef<HTMLDivElement>(null);

    const downloadImage = () => {
        if (graphicRef.current === null) return;
        toPng(graphicRef.current, { cacheBust: true, pixelRatio: 3 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'victory-m4-g80-promo.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('Error generando la imagen', err);
            });
    };

    return (
        <div className="flex flex-col items-center gap-10 p-6 md:p-12 bg-[#020202] min-h-screen text-white font-sans selection:bg-brand-cyan/20">
            {/* STUDIO HEADER */}
            <div className="text-center max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full text-brand-cyan text-[10px] font-orbitron tracking-[0.4em] uppercase font-black">
                    VICTORY DESIGN LAB • G80 EDITION
                </div>
                <h1 className="text-4xl font-orbitron font-black italic tracking-tighter uppercase leading-none">
                    PREMIUM <span className="text-brand-cyan">MARKETING</span> ASSET
                </h1>
                <p className="text-brand-slate text-xs font-light tracking-[0.2em] uppercase opacity-60">
                    Typography: Ultra-High Tracking • Photorealism: Studio Grade
                </p>
            </div>

            {/* PIEZA GRÁFICA (1080x1350 - Instagram Portrait) */}
            <div className="relative group">
                <div className="absolute -inset-2 bg-brand-cyan/10 blur-[100px] opacity-20"></div>

                <div
                    ref={graphicRef}
                    className="relative w-[1080px] h-[1350px] overflow-hidden bg-black shadow-[0_0_150px_rgba(0,0,0,1)]"
                    style={{ transform: 'scale(0.5)', transformOrigin: 'top center', marginBottom: '-675px' }}
                >
                    {/* BACKGROUND LAYER: M4 G80 VISUAL CONTEXT */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/promo-car.png"
                            alt="BMW M4 G80 Satin Purple Context"
                            className="w-full h-full object-cover brightness-[0.4] contrast-[1.2] scale-105"
                        />

                        {/* Cinematic Overlays & Color Grading */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-black/80"></div>
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/90 to-transparent"></div>
                    </div>

                    {/* CONTENT OVERLAY CONTAINER */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-between p-24">

                        {/* TOP: BRANDING & SERIES */}
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col items-start translate-x-[-10px]">
                                <h2 className="text-8xl font-orbitron font-black tracking-tighter leading-[0.8] italic">
                                    VICTORY <br />
                                    <span className="text-brand-cyan drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">CARS</span>
                                </h2>
                                <p className="font-style-script text-7xl text-white/90 -mt-8 ml-2 italic select-none drop-shadow-2xl">Detailing</p>
                            </div>

                            <div className="flex flex-col items-end gap-4 pt-4">
                                <div className="px-10 py-4 border-2 border-brand-cyan/40 bg-black/60 backdrop-blur-3xl rounded-sm">
                                    <span className="font-orbitron text-white text-2xl tracking-[0.5em] font-black uppercase italic">M4 G80 SERIES</span>
                                </div>
                                <span className="font-orbitron text-brand-slate text-sm tracking-[1em] uppercase font-light mr-2">BOGOTÁ • COL</span>
                            </div>
                        </div>

                        {/* MIDDLE: THE DOMINANT HOOK (PREMIUM TYPO) */}
                        <div className="relative text-center mt-[-80px]">
                            <div className="flex flex-col items-center">
                                <span className="text-brand-cyan font-orbitron text-3xl tracking-[0.8em] font-black uppercase mb-10 drop-shadow-lg scale-90">
                                    ¿ABURRIDO DEL COLOR DE TU AUTO?
                                </span>

                                <h3 className="text-[170px] font-orbitron font-black leading-[0.8] tracking-[-0.05em] italic text-white filter drop-shadow-[0_30px_70px_rgba(0,0,0,1)] uppercase">
                                    ¡SÉ <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-brand-cyan-hover">ÚNICO</span>!
                                </h3>

                                <div className="mt-16 inline-flex items-center gap-10 px-16 py-6 bg-brand-cyan text-brand-dark-blue rounded-sm shadow-[0_0_80px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform duration-500">
                                    <Palette className="w-12 h-12" />
                                    <span className="text-5xl font-orbitron font-black tracking-[0.2em] uppercase italic">FORRADO COMPLETO</span>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM: SPECS, PRICING & SOCIALS */}
                        <div className="space-y-24">
                            {/* FEATURE CARDS */}
                            <div className="grid grid-cols-3 gap-12">
                                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-2xl flex flex-col items-center text-center group/card transition-all hover:bg-brand-cyan/5 hover:border-brand-cyan/30">
                                    <ShieldCheck className="w-16 h-16 text-brand-cyan mb-8" />
                                    <h4 className="font-orbitron font-black text-xl tracking-[0.3em] text-white mb-2">GARANTÍA</h4>
                                    <p className="text-brand-cyan text-2xl font-black italic tracking-widest uppercase">2 AÑOS TOTAL</p>
                                </div>

                                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-2xl flex flex-col items-center text-center group/card transition-all hover:bg-brand-cyan/5 hover:border-brand-cyan/30">
                                    <Clock className="w-16 h-16 text-brand-cyan mb-8" />
                                    <h4 className="font-orbitron font-black text-xl tracking-[0.3em] text-white mb-2">ENTREGA</h4>
                                    <p className="text-brand-cyan text-2xl font-black italic tracking-widest uppercase">3-5 DÍAS</p>
                                </div>

                                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-2xl flex flex-col items-center text-center group/card transition-all hover:bg-brand-cyan/5 hover:border-brand-cyan/30">
                                    <Award className="w-16 h-16 text-brand-cyan mb-8" />
                                    <h4 className="font-orbitron font-black text-xl tracking-[0.3em] text-white mb-2">MATERIAL</h4>
                                    <p className="text-brand-cyan text-2xl font-black italic tracking-widest uppercase">CAST PREMIUM</p>
                                </div>
                            </div>

                            {/* PRICE, CALL TO ACTION & HANDLE */}
                            <div className="flex justify-between items-end bg-black/40 backdrop-blur-3xl p-16 rounded-[40px] border border-white/5">
                                <div className="flex flex-col items-start gap-6">
                                    <div className="flex items-center gap-6 text-brand-cyan bg-brand-cyan/10 px-8 py-3 rounded-full border border-brand-cyan/20">
                                        <Sparkle className="w-12 h-12 animate-pulse" />
                                        <span className="text-3xl font-orbitron font-black tracking-[0.4em] uppercase italic">AGENDA HOY</span>
                                    </div>
                                    <p className="text-7xl font-sans font-black text-white tracking-[0.05em] drop-shadow-lg">@VICTORYCARSDETAILING</p>
                                </div>

                                <div className="flex flex-col items-end text-right relative">
                                    <div className="bg-brand-cyan text-brand-dark-blue font-orbitron font-black px-12 py-4 text-4xl absolute -top-16 right-0 skew-x-[-15deg] shadow-2xl z-20">
                                        DESDE:
                                    </div>
                                    <div className="text-[190px] font-black tracking-tighter text-white font-sans leading-none flex items-start drop-shadow-[0_0_80px_rgba(6,182,212,0.4)]">
                                        <span className="text-7xl mt-8 mr-2 text-brand-cyan font-orbitron">$</span>
                                        5’000<span className="text-8xl mt-8 text-brand-cyan font-orbitron">.000</span>
                                    </div>

                                    {/* COLOR DOTS (RARE FINISHES) */}
                                    <div className="flex gap-6 mt-4 mr-6">
                                        <span className="text-brand-slate font-orbitron text-xl tracking-[0.8em] mr-8 uppercase py-3">SATIN FINISH:</span>
                                        <div className="w-10 h-10 rounded-full bg-[#4B0082] border-2 border-white ring-4 ring-black" title="Satin Midnight Purple"></div>
                                        <div className="w-10 h-10 rounded-full bg-[#004d40] border-2 border-white/20" title="Satin Emerald Green"></div>
                                        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border-2 border-white/20" title="Matte Black"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* VIGNETTE & GRAIN LAYER */}
                    <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_600px_rgba(0,0,0,0.98)]"></div>
                    <div className="absolute inset-0 z-20 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                </div>
            </div>

            {/* DOWNLOAD & SHARE */}
            <div className="flex flex-col items-center gap-8 mt-10 mb-24">
                <button
                    onClick={downloadImage}
                    className="group relative flex items-center gap-8 px-20 py-10 bg-brand-cyan hover:bg-white text-brand-dark-blue font-black rounded-sm transition-all duration-500 transform hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(6,182,212,0.5)] active:scale-95"
                >
                    <Download className="w-10 h-10 relative z-10" />
                    <span className="relative z-10 font-orbitron tracking-[0.3em] text-3xl uppercase font-black italic">GENERAR PIEZA 8K (PNG)</span>
                </button>

                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-4 text-brand-slate/60 text-[11px] font-orbitron tracking-[0.6em] uppercase">
                        <CheckCircle2 className="w-5 h-5 text-brand-cyan" />
                        G80 M4 Marketing Engine • Strictly Confidential
                    </div>
                </div>
            </div>
        </div>
    );
}
