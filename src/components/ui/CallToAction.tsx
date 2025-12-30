'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const CallToAction = () => {
    return (
        <section className='py-32 bg-zinc-950 relative overflow-hidden' id='cta' data-section-theme='dark'>
            {/* Background Gradients */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none' />

            <div className='container mx-auto px-4 relative z-10 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='max-w-4xl mx-auto'
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className='text-xs font-mono text-indigo-300 uppercase tracking-wider'>
                            Ready for Takeoff?
                        </span>
                    </div>

                    <h2 className='font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight'>
                        Deja de perder clientes por <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            tecnología obsoleta.
                        </span>
                    </h2>

                    <p className='text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed'>
                        Agenda una auditoría gratuita o inicia tu proyecto hoy mismo. Construyamos la infraestructura que tu negocio merece.
                    </p>

                    <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
                        <Link
                            href='/contact'
                            className='group relative px-8 py-4 bg-[#00FF9C] text-zinc-950 font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,156,0.3)]'
                        >
                            <span className="relative z-10 flex items-center gap-3 uppercase tracking-wider text-sm">
                                Iniciar Proyecto
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>

                        <Link
                            href='#pricing'
                            className='group px-8 py-4 rounded-full border border-zinc-800 text-zinc-300 font-bold text-sm uppercase tracking-wider hover:bg-zinc-900 hover:text-white transition-all'
                        >
                            Ver Planes
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
