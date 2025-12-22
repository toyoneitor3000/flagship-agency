'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, Terminal } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center bg-[#F8FAF8] overflow-hidden pt-20 selection:bg-[#6D28D9]/20 selection:text-[#6D28D9]'>

      {/* --- LAYER 0: FRONTEND SURFACE --- */}
      {/* Concept: Technical Paper / Clean / Premium */}

      {/* Subtle Grid - Minimal Visibility (Reduced Opacity to 2-3%) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-[0.03]" />

      {/* Ambient Light - Very Subtle Top Shine */}
      <div className='absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/80 rounded-full blur-[100px] pointer-events-none' />

      <div className='container mx-auto px-4 text-center z-10 relative'>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge - Brand Purple Anchor */}
          <div className="flex justify-center mb-8">
            <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/5 border border-[#6D28D9]/20 backdrop-blur-sm'>
              <div className="relative flex items-center justify-center w-2 h-2">
                <div className="absolute w-full h-full bg-[#6D28D9] rounded-full animate-ping opacity-75"></div>
                <div className="relative w-1.5 h-1.5 rounded-full bg-[#6D28D9]"></div>
              </div>
              <span className='font-mono text-[10px] font-medium tracking-[0.2em] text-[#6D28D9] uppercase'>
                SYSTEM_STATUS: ONLINE
              </span>
            </div>
          </div>

          {/* H1 - Display Font - Heavy & Character */}
          <h1 className='font-display text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1] max-w-5xl mx-auto text-[#022C22] drop-shadow-sm uppercase'>
            ARQUITECTURA DIGITAL<br />
            <span className="text-[#6D28D9]">DE ALTO RENDIMIENTO</span>
            <span className="inline-block align-baseline ml-2 w-2 h-2 rounded-full bg-[#15803D]"></span>
          </h1>

          {/* P - High Contrast & Clean */}
          <p className='font-mono text-sm md:text-base text-[#1A1523] max-w-2xl mx-auto mb-20 leading-relaxed tracking-wide font-medium'>
            <span className="text-[#6D28D9] font-bold">&gt; </span> No vendemos código. Diseñamos <span className="font-bold text-[#6D28D9]">sistemas de experiencia</span>.<br className="hidden md:block" />
            <span className="text-[#6D28D9] font-bold">&gt; </span> Ingeniería de precisión para marcas que no pueden permitirse fallar.
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
            <Link href='#work' className='flex-1 w-full sm:w-auto px-6 py-4 rounded-sm border-2 border-[#6D28D9]/10 bg-transparent text-[#6D28D9] font-bold text-xs tracking-[0.15em] uppercase hover:bg-[#6D28D9]/5 hover:border-[#6D28D9] transition-all duration-300 flex items-center justify-center gap-2 text-center'>
              VER_PORTAFOLIO
            </Link>
          </div>

          {/* Scroll Guide - Replaced */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 hidden xl:flex flex-col items-center gap-4 opacity-60">
            <div className="h-24 w-[1px] bg-[#6D28D9]/30"></div>
            <span className="text-[10px] font-mono text-[#6D28D9] uppercase [writing-mode:vertical-rl] tracking-widest">
              System_Architecture_Below
            </span>
            <div className="h-24 w-[1px] bg-[#6D28D9]/30"></div>
          </div>

        </motion.div>
      </div>

      {/* Decorative Grid Floor */}
    </section>
  );
};
