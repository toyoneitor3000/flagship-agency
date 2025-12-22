'use client';
import { motion } from 'framer-motion';

export const DesignPhilosophy = () => {
    return (
        <section className='py-20 bg-zinc-950 border-t border-zinc-900'>
            <div className='container mx-auto px-4 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className='font-mono text-indigo-500 text-xs tracking-[0.2em] uppercase mb-4 block'>
                        Engineering DNA
                    </span>
                    <h2 className='text-3xl md:text-4xl font-bold text-white mb-8'>
                        Más que Código: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Mecánica Digital</span>
                    </h2>
                    <p className='text-zinc-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-8'>
                        Un auto de carreras no es rápido por casualidad; es rápido porque cada pieza tiene un propósito.
                        Aplicamos la misma lógica al software: no agregamos nada que no mejore el rendimiento, la seguridad o la experiencia de manejo del usuario.
                    </p>
                    <p className='text-zinc-500 max-w-2xl mx-auto text-xs md:text-sm font-mono'>
                        &quot;La perfección no se alcanza cuando no hay nada más que añadir, sino cuando no hay nada más que quitar.&quot;
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
