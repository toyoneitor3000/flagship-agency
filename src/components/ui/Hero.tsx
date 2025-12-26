'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, Terminal } from 'lucide-react';
import Link from 'next/link';
// import FluidBackground from '@/components/creative/FluidBackground'; // Static import removed
import dynamic from 'next/dynamic';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';
import { MagicText } from '@/components/magic/MagicText';

const FluidBackground = dynamic(() => import('@/components/creative/FluidBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-zinc-950" />
});

export const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20 selection:bg-[#8f69ff]/30 selection:text-[#0f0033] touch-none' data-section-theme='light'>

      {/* --- FLUID BACKGROUND --- */}
      <FluidBackground
        config={FLUID_PRESET_PURRPURR.config}
        colors={FLUID_PRESET_PURRPURR.colors}
        speed={FLUID_PRESET_PURRPURR.speed}
        force={FLUID_PRESET_PURRPURR.force}
        blurStrength={FLUID_PRESET_PURRPURR.blurStrength}
        grainOpacity={FLUID_PRESET_PURRPURR.grainOpacity}
        interactionRadius={FLUID_PRESET_PURRPURR.interactionRadius}
        fluidZoom={FLUID_PRESET_PURRPURR.fluidZoom}
        blendThresholds={FLUID_PRESET_PURRPURR.blendThresholds}
        className="absolute top-0 left-0 w-full h-full"
      />

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
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />
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
              fontSize: 'clamp(3rem, 7vw, 9rem)',
              letterSpacing: '-0.04em',
              lineHeight: '0.95',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span className="relative z-20 text-white mix-blend-exclusion" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3)) drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}>
              <MagicText id="hero.title_1_v2" defaultText="HACEMOS WEBS" /><br />
              {/* Prevent weird wrap of the dot */}
              <span className="inline-flex items-center whitespace-nowrap align-middle">
                <MagicText id="hero.title_2_v2" defaultText="QUE VENDEN." />
                {/* Typing Cursor / Caret - Flex aligned */}
                <span className="text-[#00FF9C] drop-shadow-[0_0_10px_rgba(0,255,156,0.8)] animate-[pulse_1s_steps(2)_infinite] ml-1">_</span>
              </span>
            </span>
          </h1>

          {/* Description - Clean Text, No Box (Cols 3-10) */}
          <div className="col-span-4 md:col-start-3 md:col-span-8 flex justify-center z-10 pointer-events-none">
            <div className="max-w-3xl mx-auto text-center px-4">
              <p className='font-mono text-white leading-relaxed tracking-wide font-medium drop-shadow-md'
                style={{ fontSize: 'clamp(1rem, 1.25vw, 1.5rem)' }}>
                <span className="text-[#a78bfa] font-bold">&gt; </span>
                <MagicText id="hero.description_v2" defaultText="Y las hacemos jodidamente bien. Sin trucos, solo diseño estratégico y código sólido que convierte visitas en dinero." />
              </p>
            </div>
          </div>

          {/* Buttons - Central Action Block (Cols 4-9) - Compact Hierarchy */}
          <div className='col-span-4 md:col-start-4 md:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full'>

            {/* CTA 1: Primary - Button shape, not Bar */}
            <Link href='/contact' className='group relative min-w-[200px] w-auto px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 pointer-events-auto shadow-[0_0_30px_rgba(109,40,217,0.3)] hover:shadow-[0_0_50px_rgba(109,40,217,0.5)]'>
              <div className="absolute inset-0 bg-[#6D28D9]" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-3 font-bold text-sm tracking-[0.15em] text-white uppercase">
                INICIAR MOTOR
                <span className="text-[#00FF9C] transition-transform group-hover:translate-x-1">&gt;</span>
              </span>
            </Link>

            {/* CTA 2: Secondary - Minimalist Ghost */}
            <Link href='#work' className='group relative min-w-[180px] w-auto px-6 py-4 rounded-full overflow-hidden transition-all duration-300 hover:text-white pointer-events-auto'>
              {/* Subtle border instead of block */}
              <div className="absolute inset-0 border border-white/20 group-hover:bg-white/10 rounded-full transition-all" />
              <span className="relative z-10 flex items-center justify-center gap-2 font-medium text-sm tracking-[0.15em] text-zinc-100 uppercase transition-colors">
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

      {/* Decorative Grid Floor */}
    </section >
  );
};
