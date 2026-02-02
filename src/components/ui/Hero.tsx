'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MagicText } from '@/components/magic/MagicText';
import { UserFluidBackground } from '@/components/purrpurr/UserFluidBackground';

export const Hero = () => {
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const bgOpacity = useTransform(scrollY, [0, 400], [0.15, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -100]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0a0015] via-[#1a0033] to-[#0f0028]'>

      {/* Fluid Background with Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        <UserFluidBackground />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0015]/50 pointer-events-none" />

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
            <span className="font-mono text-xs md:text-sm tracking-widest text-[#8f69ff] uppercase opacity-80">
              purrpurr.dev — Software Empresarial
            </span>
          </motion.div>

          {/* Title - Left Aligned */}
          <motion.h1
            className='font-light tracking-tight text-white mb-8'
            style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              letterSpacing: '-0.03em',
              lineHeight: '0.95',
              textShadow: '0 0 40px rgba(143, 105, 255, 0.2)',
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
              className='font-light text-zinc-300 leading-relaxed'
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
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
