'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagicText } from '@/components/magic/MagicText';

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[800px] flex items-center overflow-hidden bg-[#050011]">

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f0033]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0033]/85 to-[#0f0033]/30" />
      </div>

      {/* Content - Left Aligned, Vertically Centered */}
      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          className='max-w-4xl'
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Eyebrow */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="font-mono text-sm md:text-base tracking-widest text-[#8f69ff] uppercase font-bold">
              purrpurr.dev — Software Empresarial
            </span>
          </motion.div>

          {/* Title - Left Aligned */}
          <motion.h1
            className='font-unbounded font-medium tracking-tight text-white mb-8'
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.05',
              textShadow: '0 0 20px rgba(143, 105, 255, 0.2)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <MagicText id="hero.title_1_v16" defaultText="Control Total" /><br />
            <span className="text-[#8f69ff]">
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
              className='font-medium text-zinc-100 leading-relaxed'
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
