'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-zinc-800 py-3' : 'bg-transparent py-5'
      )}
    >
      <div className='container mx-auto px-4 md:px-6 flex items-center justify-between'>
        <Link href='/' className='text-2xl font-bold tracking-tighter text-white'>
          FLAGSHIP<span className='text-indigo-500'>.</span>
        </Link>

        <nav className='hidden md:flex items-center gap-8'>
          {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className='text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors'
            >
              {item}
            </Link>
          ))}
          <button className='px-5 py-2 rounded-full bg-white text-zinc-950 font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300 text-sm'>
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className='md:hidden text-white'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className='md:hidden bg-zinc-950 border-b border-zinc-800'
        >
           <div className='flex flex-col gap-4 p-6'>
              {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className='text-lg font-medium text-zinc-300 hover:text-indigo-400'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
           </div>
        </motion.div>
      )}
    </motion.header>
  );
};
