'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
    {
        title: 'Speedlight Culture',
        category: 'Comunidad & Lifestyle',
        description: 'Plataforma para entusiastas del motor con eventos y contenido exclusivo.',
        image: '/portfolio/slcultureicon.png',
        link: 'https://speedlightculture.com',
        color: 'from-orange-500 to-red-600'
    },
    {
        title: 'Pigmentos TKRS',
        category: 'E-commerce & Arte',
        description: 'Tienda en línea de stickers y arte urbano con diseño personalizado.',
        image: '/portfolio/pigmentoicon.png',
        link: 'https://pigmentostkrs.com',
        color: 'from-pink-500 to-rose-500'
    },
    {
        title: 'Victory Cars Detailing',
        category: 'Servicios Premium',
        description: 'Sitio corporativo para servicios de detailing y estética automotriz de lujo.',
        image: '/portfolio/victoryicon.png',
        link: 'https://victorycarsdetailing.com',
        color: 'from-blue-600 to-cyan-500'
    },
    {
        title: 'Speedlight Academy',
        category: 'Plataforma Educativa (LMS)',
        description: 'Academia digital para formación especializada con gestión de cursos.',
        image: '/portfolio/slacademyicon.png',
        link: 'https://speedlightacademy.com',
        color: 'from-violet-600 to-indigo-600'
    },
    {
        title: 'Financars',
        category: 'Fintech Automotriz',
        description: 'Soluciones de financiación y créditos para vehículos.',
        image: '/portfolio/financarsicon.png',
        link: 'https://financars.vercel.app/',
        color: 'from-emerald-500 to-green-600'
    },
    {
        title: 'Wrap Designer',
        category: 'Diseño & Branding',
        description: 'Portafolio minimalista para diseño de alta gama.',
        image: '/portfolio/wdesignericon.png',
        link: 'https://wrapdesigner.xyz',
        color: 'from-amber-500 to-orange-500'
    }
];

export const Portfolio = () => {
    return (
        <section className='py-32 bg-zinc-950' id='work'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-6'>
                    <div className='w-full md:w-auto text-center md:text-left'>
                        <span className='text-indigo-400 font-bold tracking-wider uppercase text-xs mb-2 block'>Proof of Concept</span>
                        <h2 className='text-3xl md:text-5xl font-bold text-white'>Brands_By_<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Purrpurr</span></h2>
                    </div>
                    <p className='text-zinc-400 max-w-sm text-sm text-center md:text-right w-full md:w-auto'>
                        Estas no son solo "webs de clientes". Son empresas exitosas creadas, diseñadas y programadas por nosotros.
                    </p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 max-w-5xl mx-auto'>
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='group flex flex-col items-center cursor-pointer'
                        >
                            {/* App Icon Shape */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                                className="w-32 md:w-48 mx-auto aspect-square rounded-[22%] relative overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_50px_-10px_rgba(109,40,217,0.3)] group-hover:scale-105 transition-all duration-300 z-10"
                            >
                                {/* Logo / Favicon Content - Full Fill */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        unoptimized
                                        className='object-cover drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500'
                                    />
                                </div>

                                {/* Click Ripple/Highlight Hint */}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
                            </motion.div>

                            {/* App Label (iOS Style) */}
                            <div className='mt-5 text-center flex flex-col items-center gap-3'>
                                <div className='space-y-1'>
                                    <h3 className='text-base md:text-lg font-bold text-zinc-100 group-hover:text-white transition-colors tracking-tight'>{project.title}</h3>
                                    <p className='text-xs text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors'>
                                        {project.category}
                                    </p>
                                </div>

                                {/* "GET" Button mimic */}
                                <div className='px-5 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-[10px] tracking-widest font-bold text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300 uppercase shadow-sm'>
                                    Visitar
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
