'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();

  // Hide footer on deployed site pages (/sites/[slug])
  const isSiteViewPage = pathname.startsWith('/sites/') && pathname !== '/sites/';
  if (isSiteViewPage) return null;

  return (
    <footer className='border-t border-zinc-900 py-12 font-mono' data-section-theme='dark'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500'>

          {/* Brand & Rights */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-bold text-zinc-300">PURRPURR DEVELOPMENT</p>
            <p className="text-xs text-zinc-500 mb-2">Una creación de <Link href="/lab" className="text-zinc-400 hover:text-emerald-500 transition-colors">Purrpurr Lab</Link></p>
            <p className="text-zinc-700 text-[10px]">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <div className="relative flex items-center justify-center w-2 h-2">
              <div className="absolute w-full h-full bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Disponibilidad: Alta</span>
          </div>

          {/* Links */}
          <div className='flex items-center gap-6'>
            <div className="flex gap-4 border-r border-zinc-800 pr-6 mr-2">
              <Link href='https://github.com' target="_blank" className='hover:text-zinc-300 transition-colors'><Github className="w-4 h-4" /></Link>
              <Link href='https://linkedin.com' target="_blank" className='hover:text-zinc-300 transition-colors'><Linkedin className="w-4 h-4" /></Link>
              <Link href='https://twitter.com' target="_blank" className='hover:text-zinc-300 transition-colors'><Twitter className="w-4 h-4" /></Link>
            </div>
            <div className="flex gap-6 text-[10px] uppercase tracking-wider">
              <Link href='/privacy' className='hover:text-zinc-300 transition-colors'>Política de Privacidad</Link>
              <Link href='/terms' className='hover:text-zinc-300 transition-colors'>Términos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};