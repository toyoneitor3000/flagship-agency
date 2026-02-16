'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagicText } from '@/components/magic/MagicText';


export const Hero = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -100]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className='relative min-h-[100dvh] flex items-center overflow-hidden bg-[#0f0033]'>
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {isMobile === true ? (
            /* High Quality Mobile Hero (user requested hero-bg.webp) */
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/hero-bg.webp"
              className="w-full h-full object-cover"
            >
              <source src="/assets/vertical-bg.mp4" type="video/mp4" />
              <source src="/assets/vertical-bg.webm" type="video/webm" />
            </video>
          ) : isMobile === false ? (
            /* Video for Desktop - High Quality */
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/purrpurr_labs_hub_portal.png"
              className="w-full h-full object-cover"
            >
              <source src="/assets/copy_BCA36671-AD77-4CA4-ABF8-82B1492F4BCC.MOV" />
            </video>
          ) : (
            /* Initial state matching theme color */
            <div className="w-full h-full bg-[#0f0033]" />
          )}

          {/* Horizontal Gradient: 85% -> 20% Opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0033]/85 to-[#0f0033]/30" />
        </div>
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
