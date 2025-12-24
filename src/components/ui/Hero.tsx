'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, Terminal } from 'lucide-react';
import Link from 'next/link';
import FluidBackground from '@/components/creative/FluidBackground';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';

export const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20 selection:bg-[#8f69ff]/30 selection:text-[#0f0033]' data-section-theme='light'>

      {/* --- FLUID BACKGROUND --- */}
      <FluidBackground
        config={FLUID_PRESET_PURRPURR.config}
        colors={FLUID_PRESET_PURRPURR.colors}
        speed={FLUID_PRESET_PURRPURR.speed}
        force={FLUID_PRESET_PURRPURR.force}
        blurStrength={FLUID_PRESET_PURRPURR.blurStrength}
        grainOpacity={FLUID_PRESET_PURRPURR.grainOpacity}
        className="absolute z-0"
      />


      <div className='container mx-auto px-4 text-center z-10 relative'>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge - Brand Purple Anchor */}
          <div className="flex justify-center mb-8">
            <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/20 border border-[#6D28D9]/30 backdrop-blur-sm'>
              <div className="relative flex items-center justify-center w-2 h-2">
                <div className="absolute w-full h-full bg-[#a78bfa] rounded-full animate-ping opacity-75"></div>
                <div className="relative w-1.5 h-1.5 rounded-full bg-[#a78bfa]"></div>
              </div>
              <span className='font-mono text-[10px] font-medium tracking-[0.2em] text-[#a78bfa] uppercase'>
                SYSTEM_STATUS: ONLINE
              </span>
            </div>
          </div>

          {/* H1 - Display Font - Heavy & Character */}
          <h1 className='font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1] max-w-5xl mx-auto text-white drop-shadow-sm uppercase'>
            ARQUITECTURA DIGITAL<br />
            <span className="text-[#a78bfa]">DE ALTO RENDIMIENTO</span>
            <span className="inline-block align-baseline ml-2 w-2 h-2 rounded-full bg-[#00FF9C]"></span>
          </h1>

          {/* P - High Contrast & Clean */}
          <p className='font-mono text-sm md:text-base text-zinc-300 max-w-2xl mx-auto mb-20 leading-relaxed tracking-wide font-medium'>
            <span className="text-[#a78bfa] font-bold">&gt; </span> No vendemos código. Diseñamos <span className="font-bold text-[#a78bfa]">sistemas de experiencia</span>.<br className="hidden md:block" />
            <span className="text-[#a78bfa] font-bold">&gt; </span> Ingeniería de precisión para marcas que no pueden permitirse fallar.
          </p>

          {/* Buttons Container - Balanced */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-6 mb-32 relative z-20 pb-12 w-full max-w-lg mx-auto'>

            {/* CTA 1: Power Color Button */}
            <Link href='/contact' className='flex-1 w-full sm:w-auto group relative px-8 py-4 bg-[#6D28D9] text-white font-bold text-xs tracking-[0.15em] uppercase overflow-hidden rounded-sm shadow-none hover:shadow-[0_0_30px_rgba(109,40,217,0.4)] transition-all duration-300 text-center'>
              <span className="relative z-10 flex items-center justify-center gap-3">
                INICIAR MOTOR
                <span className="text-[#00FF9C] font-bold">&gt;</span>
              </span>
            </Link>

            {/* CTA 2: Secondary Legible */}
            <Link href='#work' className='flex-1 w-full sm:w-auto px-6 py-4 rounded-sm border-2 border-[#a78bfa]/30 bg-transparent text-[#a78bfa] font-bold text-xs tracking-[0.15em] uppercase hover:bg-[#a78bfa]/10 hover:border-[#a78bfa] transition-all duration-300 flex items-center justify-center gap-2 text-center'>
              VER_PORTAFOLIO
            </Link>
          </div>

          {/* Scroll Guide - Replaced */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 hidden xl:flex flex-col items-center gap-4 opacity-60">
            <div className="h-24 w-[1px] bg-[#a78bfa]/30"></div>
            <span className="text-[10px] font-mono text-[#a78bfa] uppercase [writing-mode:vertical-rl] tracking-widest">
              System_Architecture_Below
            </span>
            <div className="h-24 w-[1px] bg-[#a78bfa]/30"></div>
          </div>

        </motion.div>
      </div>

      {/* Decorative Grid Floor */}
    </section>
  );
};
