'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
    {
        title: 'Speedlight Culture',
        category: 'Comunidad & Lifestyle',
        description: 'Plataforma para entusiastas del motor con eventos y contenido exclusivo.',
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://www.speedlightculture.com',
        link: 'https://www.speedlightculture.com',
        color: 'from-orange-500 to-red-600'
    },
    {
        title: 'Pigmentos TKRS',
        category: 'E-commerce & Arte',
        description: 'Tienda en línea de stickers y arte urbano con diseño personalizado.',
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://www.pigmentostkrs.com',
        link: 'https://www.pigmentostkrs.com',
        color: 'from-pink-500 to-rose-500'
    },
    {
        title: 'Victory Cars Detailing',
        category: 'Servicios Premium',
        description: 'Sitio corporativo para servicios de detailing y estética automotriz de lujo.',
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://victorycarsdetailing.com',
        link: 'https://victorycarsdetailing.com',
        color: 'from-blue-600 to-cyan-500'
    },
    {
        title: 'Speedlight Academy',
        category: 'Plataforma Educativa (LMS)',
        description: 'Academia digital para formación especializada con gestión de cursos.',
        image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://speedlightacademy.com',
        link: 'https://speedlightacademy.com',
        color: 'from-violet-600 to-indigo-600'
    }
];

export const Portfolio = () => {
    return (
        <section className='py-32 bg-zinc-950' id='work'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-6'>
                    <div className='w-full md:w-auto text-center md:text-left'>
                        <span className='text-indigo-400 font-bold tracking-wider uppercase text-xs mb-2 block'>Resultados Reales</span>
                        <h2 className='text-3xl md:text-5xl font-bold text-white'>Nuestros Proyectos</h2>
                    </div>
                    <p className='text-zinc-400 max-w-sm text-sm text-center md:text-right w-full md:w-auto'>
                        No vendemos humo. Aquí hay proyectos reales funcionando y generando valor para nuestros clientes ahora mismo.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='group relative rounded-3xl overflow-hidden cursor-pointer block bg-zinc-900 hover:bg-zinc-800 transition-colors'
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col md:block"
                            >
                                {/* Image Container */}
                                <div className="relative w-full aspect-video md:aspect-video md:absolute md:inset-0 transition-opacity opacity-90 group-hover:opacity-60">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        unoptimized
                                        className='object-cover object-top transition-transform duration-700 group-hover:scale-105'
                                    />
                                    {/* Dark gradient overlay - only visible on desktop/overlay mode */}
                                    <div className='hidden md:block absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 transition-opacity' />
                                </div>

                                {/* Content Container */}
                                <div className='relative p-6 md:absolute md:bottom-0 md:left-0 md:w-full md:p-8 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300'>
                                    <div className={`w-12 h-1 mb-4 rounded-full bg-gradient-to-r ${project.color}`} />
                                    <p className='text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2'>{project.category}</p>
                                    <h3 className='text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors'>{project.title}</h3>
                                    <p className='text-zinc-300 text-sm max-w-md line-clamp-2 md:line-clamp-none'>
                                        {project.description}
                                    </p>
                                </div>

                                <div className='hidden md:flex absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 border border-white/20'>
                                    <ArrowUpRight className='text-white w-5 h-5' />
                                </div>
                            </motion.div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
