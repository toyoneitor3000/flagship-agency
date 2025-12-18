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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-black/0',
        isScrolled ? 'bg-zinc-100/20 backdrop-blur-2xl border-black/5 py-3 shadow-sm' : 'bg-transparent py-5'
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
          <Link href='#features' className='text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors'>
            Servicios
          </Link>
          <Link href='#pricing' className='text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors'>
            Precios
          </Link>
          <Link href='#about' className='text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors'>
            Nosotros
          </Link>
          <Link href='#contact' className='text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors'>
            Contacto
          </Link>
          <button className='px-5 py-2 rounded-full bg-zinc-950 text-white font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 text-sm shadow-md'>
            Cotizar Proyecto
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className='md:hidden text-zinc-950'
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
          className='md:hidden bg-zinc-100 border-b border-zinc-200'
        >
          <div className='flex flex-col gap-4 p-6'>
            <Link href='#features' className='text-lg font-medium text-zinc-600 hover:text-indigo-600' onClick={() => setIsMobileMenuOpen(false)}>
              Servicios
            </Link>
            <Link href='#pricing' className='text-lg font-medium text-zinc-600 hover:text-indigo-600' onClick={() => setIsMobileMenuOpen(false)}>
              Precios
            </Link>
            <Link href='#about' className='text-lg font-medium text-zinc-600 hover:text-indigo-600' onClick={() => setIsMobileMenuOpen(false)}>
              Nosotros
            </Link>
            <Link href='#contact' className='text-lg font-medium text-zinc-600 hover:text-indigo-600' onClick={() => setIsMobileMenuOpen(false)}>
              Contacto
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
