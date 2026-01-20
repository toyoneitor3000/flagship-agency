'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, Terminal, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import FluidBackground from '@/components/creative/FluidBackground'; // Static import removed
import dynamic from 'next/dynamic';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';
import { MagicText } from '@/components/magic/MagicText';

// Local FluidBackground import removed to use global UserFluidBackground


export const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // Desktop Scroll Trigger
    const handleScroll = (e: WheelEvent) => {
      // Only trigger if we are at the top and scrolling down
      if (window.scrollY < 100 && e.deltaY > 20) {
        // Prevent default only if we really want to hijack, 
        // but often better to just let it happen naturally if native scroll is enabled.
        // For "locking" feel, we might want: e.preventDefault(); scrollToFeatures();
        // But user said "no podemos hacer scroll" implying maybe overflow hidden?
        // Let's assume we just want to help the user down.
        scrollToFeatures();
      }
    };

    // Mobile Swipe Trigger
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (window.scrollY < 50 && touchStartY - touchEndY > 50) { // Swipe Up (scrolling down)
        scrollToFeatures();
      }
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20 selection:bg-[#8f69ff]/30 selection:text-[#0f0033] touch-none' data-section-theme='light'>



      {/* 3. Invisible Contrast Box (Reduced Opacity) - KEEPING AS SECONDARY LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,transparent_60%)] blur-3xl opacity-60" />
      </div>

      {/* 4. DESIGNER UI: 3D PERSPECTIVE GRID FLOOR (The "Cyber Floor") */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-[-20%] left-[-50%] right-[-50%] h-[80vh] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
          style={{
            transform: 'perspective(1000px) rotateX(60deg)',
          }}
        />
        {/* Floor Shadow Gradient (Smooth Transition) */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
      </div>


      <div className='container mx-auto px-4 relative pointer-events-none h-full flex flex-col justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-4 md:grid-cols-12 gap-x-4 gap-y-8 md:gap-y-10 items-center"
        >
          {/* Badge - Focused Center (Cols 5-8) */}
          <div className="col-span-4 md:col-start-5 md:col-span-4 flex justify-center">
            <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-[#6D28D9]/50 backdrop-blur-md shadow-lg'>
              <div className="relative flex items-center justify-center w-2 h-2">
                <div className="absolute w-full h-full bg-[#a78bfa] rounded-full animate-ping opacity-75"></div>
                <div className="relative w-1.5 h-1.5 rounded-full bg-[#a78bfa]"></div>
              </div>
              <span className='font-mono text-[10px] font-bold tracking-[0.2em] text-white uppercase'>
                SYSTEM_STATUS: ONLINE
              </span>
            </div>
          </div>

          {/* H1 - Wide Impact (Cols 1-12 or 2-11) */}
          <h1
            className='col-span-4 md:col-span-12 relative font-display font-bold text-center transition-all duration-300 w-full z-20 mb-4 pointer-events-none'
            style={{
              fontSize: 'clamp(2rem, 6vw, 8rem)',
              letterSpacing: '-0.04em',
              lineHeight: '0.95',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span className="relative z-20 text-white mix-blend-exclusion" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3)) drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}>
              <MagicText id="hero.title_1_v11" defaultText="ESTRATEGIA" /><br />
              {/* Prevent weird wrap of the dot */}
              <span className="whitespace-nowrap">
                <MagicText id="hero.title_2_v11" defaultText="HECHA CÓDIGO." />
              </span>
            </span>
          </h1>

          {/* Description - Clean Text, No Box (Cols 3-10) -> now (Cols 2-11) */}
          <div className="col-span-4 md:col-start-2 md:col-span-10 flex justify-center z-10 pointer-events-none">
            <div className="max-w-3xl mx-auto text-center px-4">
              <p className='font-mono text-white leading-relaxed tracking-wide font-medium drop-shadow-md'
                style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.5rem)' }}>
                <span className="text-[#a78bfa] font-bold">&gt; </span>
                <MagicText id="hero.description_v11" defaultText="No solo escribimos software, entendemos tu negocio. Creamos la infraestructura digital que ordena tu operación y te devuelve el control." />
              </p>
            </div>
          </div>

          {/* Buttons - Central Action Block (Cols 4-9) -> now (Cols 3-10) */}
          <div className='col-span-4 md:col-start-3 md:col-span-8 flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full'>

            {/* CTA 1: Primary - Demo Request */}
            <Link href='/demo' className='group relative w-[240px] sm:w-[280px] h-[56px] sm:h-[70px] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 pointer-events-auto shadow-[0_0_30px_rgba(109,40,217,0.3)] hover:shadow-[0_0_50px_rgba(109,40,217,0.5)] flex items-center justify-center'>
              <div className="absolute inset-0 bg-[#6D28D9]" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Animated Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[30px] bg-white/30 skew-x-12 opacity-0 group-hover:animate-shine" />

              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="flex items-center gap-3 font-mono font-bold text-sm tracking-widest text-white uppercase whitespace-nowrap">
                  <Rocket className="w-4 h-4" />
                  OBTENER DEMO
                </span>
                <span className="text-[9px] text-zinc-300 tracking-wider font-mono mt-1 opacity-80 group-hover:text-emerald-300 transition-colors">
                  GRATIS • 48 HORAS • SIN COMPROMISO
                </span>
              </div>
            </Link>

            {/* CTA 2: Secondary - Minimalist Ghost */}
            <Link href='#philosophy' className='group relative w-[220px] sm:w-[250px] h-[56px] sm:h-[70px] rounded-full overflow-hidden transition-all duration-300 hover:text-white pointer-events-auto flex items-center justify-center'>
              {/* Subtle border instead of block */}
              <div className="absolute inset-0 border border-white/20 group-hover:bg-white/10 rounded-full transition-all" />
              <span className="relative z-10 flex items-center justify-center gap-2 font-mono font-medium text-sm tracking-wider text-zinc-100 uppercase transition-colors whitespace-nowrap">
                VER_PORTAFOLIO
              </span>
            </Link>
          </div>




          {/* Side Indicators - Decorative (Absolute, not grid) mostly visuals */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 opacity-60 pointer-events-none">
            <div className="h-24 w-[1px] bg-[#a78bfa]/30"></div>
            <span className="text-[10px] font-mono text-[#a78bfa] uppercase [writing-mode:vertical-rl] tracking-widest">
              System_Architecture_Below
            </span>
            <div className="h-24 w-[1px] bg-[#a78bfa]/30"></div>
          </div>

        </motion.div>
      </div>

      {/* Navigation Trigger - Integrated Terminal Style (Moved to Root for correct Viewport Positioning) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto w-full">
        <button
          onClick={scrollToFeatures}
          className="group flex flex-col items-center gap-2 py-2 w-full transition-all duration-500 focus:outline-none"
          aria-label="Scroll to Infrastructure"
        >
          {/* Terminal Line */}
          <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-400 group-hover:text-zinc-100 transition-colors uppercase bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 group-hover:border-[#00FF9C]/30 group-hover:shadow-[0_0_20px_rgba(0,255,156,0.1)]">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9C] animate-pulse" />
              <span className="text-zinc-300">SYSTEM_READY</span>
            </span>
            <span className="text-zinc-600">//</span>
            <span className="text-[#00FF9C] font-semibold transition-all duration-500">
              ACCESS_INFRASTRUCTURE
            </span>
          </div>

          {/* Minimal Chevron - Animated */}
          <div className="flex flex-col items-center -space-y-1.5 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
            <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-[#00FF9C] group-hover:translate-y-1 transition-all duration-500 delay-75" />
            <ChevronDown className="w-4 h-4 text-zinc-600 group-hover:text-[#00FF9C]/50 group-hover:translate-y-2 transition-all duration-500" />
          </div>
        </button>
      </div>

      {/* Decorative Grid Floor */}
    </section >
  );
};
