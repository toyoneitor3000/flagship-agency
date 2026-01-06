'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { UserMenu } from '@/components/auth/UserMenu';

export const Navbar = () => {
  // Scroll detection removed as requested for consistent sizing
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light'); // 'light' = Light Background (needs dark text)
  const pathname = usePathname();
  const router = useRouter();

  // Hide navbar on deployed site pages (/sites/[slug])
  // Check if we're on /sites/something (but not just /sites)
  const isSiteViewPage = pathname.startsWith('/sites/') && pathname !== '/sites/';

  if (isSiteViewPage) {
    return null;
  }


  // Theme Detection Logic
  useEffect(() => {
    const handleScrollTheme = () => {
      // Check what's under the navbar (approx 40px from top of viewport)
      const scanLine = 40;

      const sections = document.querySelectorAll('[data-section-theme]');
      let foundTheme: 'light' | 'dark' | null = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Check if the scanline falls within this section's vertical bounds
        if (rect.top <= scanLine && rect.bottom >= scanLine) {
          const theme = section.getAttribute('data-section-theme');
          if (theme === 'light' || theme === 'dark') {
            foundTheme = theme;
          }
          break; // Found the active section
        }
      }

      if (foundTheme) {
        setNavTheme(foundTheme);
      }
    };

    // Run on scroll
    window.addEventListener('scroll', handleScrollTheme);
    window.addEventListener('resize', handleScrollTheme);

    // Run immediately to set initial state
    handleScrollTheme();

    // Polling fallback: Check frequently for the first second after route change
    // This fixes issues where the DOM isn't fully ready immediately after navigation
    const intervalId = setInterval(handleScrollTheme, 50);
    const timeoutId = setTimeout(() => clearInterval(intervalId), 1000);

    return () => {
      window.removeEventListener('scroll', handleScrollTheme);
      window.removeEventListener('resize', handleScrollTheme);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [pathname]); // Re-bind and re-check on route change

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Derived styles based on theme
  const textColorClass = navTheme === 'light' ? 'text-[#022C22]' : 'text-zinc-100'; // Dark text on light bg, Light text on dark bg
  const hoverColorClass = navTheme === 'light' ? 'hover:text-[#6D28D9]' : 'hover:text-[#00FF9C]';
  const buttonBorderClass = navTheme === 'light' ? 'border-[#6D28D9] text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white' : 'border-zinc-100 text-zinc-100 hover:border-[#00FF9C] hover:text-[#00FF9C] hover:bg-zinc-950';



  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          'fixed top-0 w-full z-[100] transition-all duration-300 border-b flex items-center',
          'h-12', // Reduced height
          // Liquid Glass properties
          'bg-white/5 dark:bg-zinc-950/10', // Extremely transparent
          'backdrop-blur-xl backdrop-saturate-150', // Heavy blur + saturation
          'border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' // Subtle border and shadow
        )
        }>
        <div className='container mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-12 gap-4 items-center'>
          <div className="col-span-1 lg:col-span-3 flex justify-start items-center gap-2">
            {/* Mobile Back Button - Only visible on mobile/tablet AND when not on home */}
            {pathname !== '/' && (
              <button
                onClick={() => router.back()}
                className={cn(
                  "lg:hidden p-2 -ml-2 rounded-full transition-colors flex items-center justify-center",
                  navTheme === 'light' ? 'text-[#022C22] hover:bg-zinc-100' : 'text-zinc-100 hover:bg-zinc-800'
                )}
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <Link href='/' className='flex items-center gap-2'>
              <Image
                src="/brand_logo.png"
                alt="Purrpurr Logo"
                width={160}
                height={40}
                className={cn(
                  "h-10 w-auto object-contain transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]",
                  // Optional: Invert logo brightness if needed for dark mode, 
                  // but assuming brand logo works on both or we might need a white version.
                  // If navTheme is dark (dark bg), we might want to ensure logo is visible.
                  // For now keeping it standard.
                )}
                priority
              />
            </Link>
          </div>

          <div className="col-span-1 lg:col-span-9 flex justify-end items-center gap-4">
            <nav className='hidden lg:flex items-center gap-8'>
              <Link href='#features' className={cn('text-sm font-semibold transition-colors font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]', textColorClass, hoverColorClass)}>
                [ Servicios ]
              </Link>
              <Link href='/purrpurr-test' className={cn('text-sm font-semibold transition-colors font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]', textColorClass, hoverColorClass)}>
                [ Purrpurr Labs ]
              </Link>
              <Link href='/academy' className={cn('text-sm font-semibold transition-colors font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]', textColorClass, hoverColorClass)}>
                [ Academy ]
              </Link>
              <Link href='#philosophy' className={cn('text-sm font-semibold transition-colors font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]', textColorClass, hoverColorClass)}>
                [ Nosotros ]
              </Link>
              <Link href='#invitation' className={cn('text-sm font-semibold transition-colors font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]', textColorClass, hoverColorClass)}>
                [ Contacto ]
              </Link>
              <button className={cn(
                'px-5 py-2 rounded-sm bg-transparent font-mono text-[12px] font-bold border transition-all shadow-sm tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
                buttonBorderClass
              )}>
                &lt; COTIZAR /&gt;
              </button>
              <UserMenu />
            </nav>

            <div className="lg:hidden flex items-center gap-2">
              <UserMenu iconOnly={true} />
              <button
                className={cn(
                  'p-2 rounded-md transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
                  navTheme === 'light' ? 'text-[#6D28D9] hover:bg-purple-50' : 'text-zinc-100 hover:bg-white/10'
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

      </motion.header>

      {/* Mobile Nav - Terminal Style - Moved outside header to avoid transform stacking context issues */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: '100%' }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: '100%' }}
          className='lg:hidden fixed inset-x-4 top-[90px] bottom-8 z-[110] flex flex-col'
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
                <Link href='#features' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-green-500/50 text-xs'>[01]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Servicios</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-green-500 animate-pulse">_</span>
                </Link>
                <Link href='/purrpurr-test' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-purple-500/50 text-xs'>[02]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Purrpurr Labs</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-purple-500 animate-pulse">_</span>
                </Link>
                <Link href='/academy' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-pink-500/50 text-xs'>[03]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Academy</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-pink-500 animate-pulse">_</span>
                </Link>
                <Link href='#pricing' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-yellow-500/50 text-xs'>[04]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Precios</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-yellow-500 animate-pulse">_</span>
                </Link>
                <Link href='#philosophy' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-indigo-500/50 text-xs'>[05]</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">./Nosotros</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 text-indigo-500 animate-pulse">_</span>
                </Link>
                <Link href='#invitation' className='flex items-center gap-4 text-zinc-400 hover:text-green-400 group p-2 hover:bg-zinc-900/50 rounded-lg transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' onClick={() => setIsMobileMenuOpen(false)}>
                  <span className='text-green-500/50 text-xs'>[06]</span>
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
    </>
  );
};
