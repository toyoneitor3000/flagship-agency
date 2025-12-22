'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to ensure scroll is re-enabled if component unmounts while menu is open
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-zinc-100/10 backdrop-blur-xl border-zinc-950/5 py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className='container mx-auto px-4 md:px-6 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src="/brand_logo.png"
            alt="Purrpurr Logo"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className='hidden md:flex items-center gap-8'>
          <Link href='#features' className='text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors font-mono'>
            [ Servicios ]
          </Link>
          <Link href='#pricing' className='text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors font-mono'>
            [ Precios ]
          </Link>
          <Link href='#about' className='text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors font-mono'>
            [ Nosotros ]
          </Link>
          <Link href='#contact' className='text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors font-mono'>
            [ Contacto ]
          </Link>
          <button className='px-5 py-2 rounded-sm bg-transparent text-[#6D28D9] font-mono text-[12px] font-bold border border-[#6D28D9] hover:border-[#00FF9C] hover:text-[#00FF9C] hover:bg-zinc-950 transition-all shadow-sm tracking-wider'>
            &lt; COTIZAR /&gt;
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className='md:hidden text-indigo-600 p-2 hover:bg-indigo-50 rounded-md transition-colors'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-indigo-600" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav - Terminal Style */}
      {/* Mobile Nav - Terminal Style Floating Window */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: '100%' }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: '100%' }}
          className='md:hidden fixed inset-x-4 top-[80px] bottom-8 z-40 flex flex-col'
        >
          <div className='flex-1 bg-zinc-950/98 backdrop-blur-2xl border border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative'>
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[2] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

            {/* Decorative Terminal Header */}
            <div className='flex items-center justify-between p-4 bg-zinc-900/50 border-b border-zinc-800'>
              <div className='flex items-center gap-2'>
                <div className='w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50' />
                <div className='w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50' />
                <div className='w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50' />
              </div>
              <span className='font-mono text-[10px] text-zinc-500 uppercase tracking-widest'>Secure Connection</span>
            </div>

            <div className='p-6 font-mono flex-1 flex flex-col justify-center relative z-10'>
              <div className='space-y-6'>
                <Link href='#features' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-green-500/50 text-xs'>[01]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Servicios</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-green-500 animate-pulse">_</span>
                </Link>
                <Link href='#pricing' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-purple-500/50 text-xs'>[02]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Precios</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-purple-500 animate-pulse">_</span>
                </Link>
                <Link href='#about' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-indigo-500/50 text-xs'>[03]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Nosotros</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-indigo-500 animate-pulse">_</span>
                </Link>
                <Link href='#contact' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-green-500/50 text-xs'>[04]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Contacto</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-green-500 animate-pulse">_</span>
                </Link>
              </div>
            </div>

            <div className='p-6 border-t border-zinc-800 bg-zinc-900/30'>
              <div className='flex items-center justify-between mb-4 text-[10px] uppercase tracking-wider font-mono text-zinc-500'>
                <span>Status: Ready</span>
                <span>Latency: 12ms</span>
              </div>
              <button className='w-full py-4 bg-green-500 text-zinc-950 font-bold font-mono text-sm uppercase tracking-widest hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(74,222,128,0.2)]'>
                &gt; INICIAR_PROYECTO
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
