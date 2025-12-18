'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden pt-20 selection:bg-green-500/30 selection:text-green-200'>

      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40'>
        <div className='absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[120px]' />
        <div className='absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px]' />
      </div>

      <div className='container mx-auto px-4 text-center z-10 relative'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal Badge */}
          <div className="flex justify-center mb-6">
            <span className='font-mono text-xs md:text-sm text-green-500 bg-zinc-900/50 border border-green-500/30 px-3 py-1 rounded-sm backdrop-blur-md'>
              <span className="text-zinc-500">root@purrpurr:~$</span> init_sequence.sh
            </span>
          </div>

          <h1 className='font-mono text-4xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight'>
            Construimos <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x'>Imperios Digitales</span><br />
            <span className="text-green-400">&gt;</span> No Solo Código<span className="animate-blink text-green-400">_</span>
          </h1>

          <p className='font-mono text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed custom-kerning'>
            Deja de buscar freelancers. Contrata un equipo de ingeniería de élite para lanzar tu visión al mercado.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-6 font-mono text-sm'>
            {/* Cyber Button 1 */}
            <Link href='/contact' className='group relative px-6 py-3 bg-green-500 text-black font-bold uppercase tracking-wider hover:bg-green-400 transition-all clip-path-polygon'>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                [ Iniciar Proyecto ]
              </span>
            </Link>

            {/* Cyber Button 2 */}
            <Link href='#work' className='group px-6 py-3 border border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all uppercase tracking-wider'>
              &lt; Ver Portafolio /&gt;
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
