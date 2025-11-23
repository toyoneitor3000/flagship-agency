'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden pt-20'>
      {/* Background Effects */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 opacity-50' />
      
      <div className='container mx-auto px-4 text-center z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className='inline-block py-1 px-3 rounded-full bg-zinc-900 border border-zinc-800 text-indigo-400 text-xs font-medium mb-6 tracking-wider uppercase'>
            Elite Development Agency
          </span>
          
          <h1 className='text-5xl md:text-8xl font-bold text-white tracking-tight mb-8'>
            We Build <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Digital Empires</span><br />
            Not Just Code.
          </h1>
          
          <p className='text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed'>
            Stop looking for freelancers. Hire a full-stack engineering team to deploy your scale-ready application in weeks, not months.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Link href='/contact' className='w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20'>
              Start Your Project
              <ArrowRight className='w-5 h-5' />
            </Link>
            <Link href='#work' className='w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-2'>
              View Our Work
              <Code2 className='w-5 h-5 text-zinc-400' />
            </Link>
          </div>
          
          {/* Social Proof Mini */}
          <div className='mt-16 pt-8 border-t border-zinc-900 flex flex-col items-center gap-4'>
             <p className='text-zinc-500 text-sm'>Trusted by founders from Y Combinator, Techstars & 500 Startups</p>
             <div className='flex gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500'>
                {/* Logos placeholders for credibility */}
                <div className='h-8 w-24 bg-zinc-800/50 rounded animate-pulse' />
                <div className='h-8 w-24 bg-zinc-800/50 rounded animate-pulse' />
                <div className='h-8 w-24 bg-zinc-800/50 rounded animate-pulse' />
                <div className='h-8 w-24 bg-zinc-800/50 rounded animate-pulse' />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
