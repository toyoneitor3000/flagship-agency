'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagicText } from '@/components/magic/MagicText';
import { LivingAIEntity } from '@/components/ui/LivingAIEntity';

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -320]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);

  return (
    <section ref={ref} data-section-theme="dark" className="relative w-full h-screen min-h-[800px] flex items-center overflow-hidden bg-[#050011]">

      {/* Living AI Entity - Procedural Real-Time WebGL Shader (Wind-Molded, Siri-like living bot) */}
      <LivingAIEntity interactive={true} intensity={1.0} showStatusIndicator={false} />

      {/* Content - Left Aligned, Vertically Centered */}
      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          className='max-w-4xl'
          style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        >
          {/* Eyebrow */}
          <motion.div
            className="mb-6 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="font-mono text-sm md:text-base tracking-widest text-[#a882ff] uppercase font-bold drop-shadow-[0_0_12px_rgba(168,130,255,0.4)]">
              purrpurr.dev — Software Empresarial
            </span>
          </motion.div>

          {/* Title - Left Aligned */}
          <motion.h1
            className='font-unbounded font-semibold tracking-tight text-white mb-8'
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.05',
              textShadow: '0 0 35px rgba(168, 130, 255, 0.35), 0 4px 16px rgba(0,0,0,0.9)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              <MagicText id="hero.title_1_v16" defaultText="Control Total" />
            </span>
            <br />
            <span className="text-[#a882ff] drop-shadow-[0_0_25px_rgba(168,130,255,0.5)]">
              <MagicText id="hero.title_2_v16" defaultText="De Tu Operación" />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p
              className='font-medium text-white/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
              style={{
                fontSize: 'clamp(1.125rem, 1.5vw, 1.35rem)',
                letterSpacing: '0.01em',
              }}
            >
              <MagicText
                id="hero.description_v17"
                defaultText="El sistema operativo completo para tu empresa. Una sola plataforma que reemplaza Excel, WhatsApp y todos los sistemas desconectados que usas hoy."
              />
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Grid - Subtle */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #8f69ff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

    </section>
  );
};
