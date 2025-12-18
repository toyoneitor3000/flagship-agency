'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, Terminal } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center bg-zinc-100 overflow-hidden pt-20 selection:bg-indigo-500/30 selection:text-indigo-900'>

      {/* --- DIGITAL EMPIRE BACKGROUND --- */}
      {/* Darker grid for light background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f00330a_1px,transparent_1px),linear-gradient(to_bottom,#0f00330a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Dynamic Glows - Darker to stand out on light */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]' />
        <div className='absolute bottom-[0%] left-[20%] w-[600px] h-[400px] bg-green-500/10 rounded-full blur-[100px] animate-pulse' />
      </div>

      <div className='container mx-auto px-4 text-center z-10 relative'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal Badge */}
          <div className="flex justify-center mb-8">
            <div className='flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-zinc-200 backdrop-blur-md shadow-lg shadow-indigo-500/5 group cursor-default hover:border-indigo-500/50 transition-colors'>
              <Terminal className='w-4 h-4 text-indigo-600 animate-pulse' />
              <span className='font-mono text-xs md:text-sm text-zinc-600'>
                <span className="text-purple-600 font-bold">root@purrpurr</span>:<span className="text-zinc-500">~</span>$ ./deploy_empire.sh
              </span>
            </div>
          </div>

          <h1 className='font-mono text-5xl md:text-8xl font-bold text-zinc-950 tracking-tighter mb-8 leading-none'>
            CODE <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-shine bg-[length:200%_auto]'>EMPIRE</span><br />
            <span className="text-4xl md:text-7xl opacity-80 decoration-green-500/30 underline decoration-2 underline-offset-8 text-zinc-800">BUILDERS</span><span className="animate-blink text-green-600">_</span>
          </h1>

          <p className='font-mono text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-12 leading-relaxed'>
            // Sistema de desarrollo de alta ingeniería. <br className="hidden md:block" />
            <span className="text-indigo-600 font-medium">Transformamos código complejo en dominancia de mercado.</span>
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-6 font-mono text-sm'>
            {/* Cyber Button 1 (Primary) */}
            <Link href='/contact' className='group relative px-8 py-4 bg-zinc-950 text-white font-bold uppercase tracking-widest overflow-hidden border border-zinc-950 hover:border-indigo-500 transition-colors shadow-[0_5px_15px_rgba(15,0,51,0.2)]'>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
              <span className="relative z-10 flex items-center gap-3">
                <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-green-400 transition-colors" />
                [ INICIAR_PROTOCOLO ]
              </span>
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-indigo-500 group-hover:border-green-500 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-indigo-500 group-hover:border-green-500 transition-colors" />
            </Link>

            {/* Cyber Button 2 (Secondary) */}
            <Link href='#work' className='group relative px-8 py-4 bg-transparent text-zinc-600 font-bold uppercase tracking-widest hover:text-zinc-950 transition-colors'>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-300 group-hover:bg-purple-600 transition-colors" />
              <span className="relative flex items-center gap-2">
                &lt; EXPLORAR_DATA /&gt;
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

        </motion.div>
      </div>

      {/* Decorative Grid Floor (Optional for depth) */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/0 to-transparent pointer-events-none z-10" />
    </section>
  );
};
