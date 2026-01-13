'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const projects = [
    {
        title: 'Speedlight Culture',
        category: 'Lifestyle',
        description: 'Plataforma para entusiastas del motor.',
        role: 'Creamos un ecosistema digital para la cultura automotriz, integrando flujos de noticias, eventos y una experiencia de usuario inmersiva que conecta a miles de entusiastas.',
        image: '/portfolio/slcultureicon.png',
        link: 'https://speedlightculture.com',
        color: 'from-orange-500 to-red-600'
    },
    {
        title: 'Pigmentos TKRS',
        category: 'E-commerce',
        description: 'Tienda de stickers y arte urbano.',
        role: 'Desarrollamos una plataforma de e-commerce centrada en el diseño visual, optimizando el túnel de venta para productos de arte urbano con una interfaz rápida y minimalista.',
        image: '/portfolio/pigmentoicon.png',
        link: 'https://pigmentostkrs.com',
        color: 'from-pink-500 to-rose-500'
    },
    {
        title: 'Victory Cars',
        category: 'Detailing',
        description: 'Detailing y estética automotriz.',
        role: 'Construimos la presencia digital de alto nivel para servicios de estética automotriz, enfocándonos en la conversión de leads mediante una presentación visual impecable.',
        image: '/portfolio/victoryicon.png',
        link: 'https://victorycarsdetailing.com',
        color: 'from-blue-600 to-cyan-500'
    },
    {
        title: 'Speedlight Academy',
        category: 'Education',
        description: 'Academia digital especializada.',
        role: 'Implementamos una infraestructura educativa robusta para la formación técnica, con sistemas de gestión de contenido especializados para el aprendizaje moderno.',
        image: '/portfolio/slacademyicon.png',
        link: 'https://speedlightacademy.com',
        color: 'from-violet-600 to-indigo-600'
    },
    {
        title: 'Financars',
        category: 'Fintech',
        description: 'Soluciones de financiación.',
        role: 'Diseñamos una interfaz clara y confiable para procesos financieros complejos, permitiendo a los usuarios calcular y solicitar créditos de manera intuitiva.',
        image: '/portfolio/financarsicon.png',
        link: 'https://financars.vercel.app/',
        color: 'from-emerald-500 to-green-600'
    },
    {
        title: 'Wrap Designer',
        category: 'Design',
        description: 'Portafolio de diseño de alta gama.',
        role: 'Elevamos el estándar visual de la marca mediante un portafolio digital que actúa como una vitrina de lujo, proyectando la calidad del trabajo físico al mundo digital.',
        image: '/portfolio/wdesignericon.png',
        link: 'https://wrapdesigner.xyz',
        color: 'from-amber-500 to-orange-500'
    }
];

export const Portfolio = () => {
    const [activeProject, setActiveProject] = useState(projects[0]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <section className='py-20 overflow-hidden' id='portfolio' data-section-theme='dark'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-12'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className='font-mono text-indigo-500 text-[10px] tracking-[0.2em] uppercase mb-3 block'>
                            Engineering DNA
                        </span>
                        <h2 className='font-display text-3xl md:text-4xl font-bold text-white mb-6'>
                            Más que Código: <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Mecánica Digital</span>
                        </h2>
                        <p className='text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8'>
                            Nuestro portafolio no es una colección de "sitios", es una trayectoria de ingeniería aplicada.
                            Cada proyecto es un <strong>mundo propio</strong> donde hemos diseñado infraestructuras robustas,
                            interfaces de alto impacto y sistemas que escalan. Construimos la mecánica digital que permite a los negocios operar con libertad total.
                        </p>
                    </motion.div>
                </div>

                <div className='flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24 max-w-5xl mx-auto'>
                    {/* LEFT COLUMN: App Grid (iOS Style) */}
                    <div className='w-full lg:w-auto flex flex-col items-center lg:items-end'>
                        <div className="grid grid-cols-4 gap-x-6 gap-y-8 p-4">
                            {projects.map((project, index) => {
                                const isActive = activeProject.title === project.title;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                                        onClick={() => {
                                            if (activeProject.title !== project.title) {
                                                setActiveProject(project);
                                                setIsLoading(true);
                                            }
                                        }}
                                        className="group cursor-pointer flex flex-col items-center gap-2"
                                    >
                                        {/* App Icon */}
                                        <div className={`relative w-[68px] h-[68px] md:w-[72px] md:h-[72px] rounded-[18px] transition-all duration-300 ${isActive
                                            ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-950 scale-105 shadow-lg shadow-indigo-500/20'
                                            : 'hover:scale-105 hover:opacity-90'
                                            }`}>
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover rounded-[18px]"
                                                unoptimized
                                            />
                                            {/* Pressed Effect Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 rounded-[18px] transition-colors" />
                                        </div>

                                        {/* App Title */}
                                        <span className={`text-[10px] md:text-[11px] font-medium text-center leading-tight max-w-[70px] transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                                            }`}>
                                            {project.title}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Project Details (Dynamic) */}
                        <motion.div
                            key={activeProject.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mt-12 w-full bg-zinc-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeProject.color} animate-pulse`} />
                                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">{activeProject.category}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{activeProject.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {activeProject.role}
                            </p>
                        </motion.div>

                        {/* Helper Text */}
                        <p className="hidden lg:block mt-6 text-[10px] text-zinc-600 font-mono text-center lg:text-right max-w-[250px]">
                            Selecciona una aplicación para interactuar con la versión en vivo.
                        </p>
                    </div>

                    {/* RIGHT COLUMN: Phone Visualizer */}
                    <div className='w-full lg:w-1/2 flex justify-center lg:justify-start lg:sticky lg:top-24'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-[280px] h-[580px] md:w-[300px] md:h-[620px] bg-zinc-950 rounded-[3rem] border-[6px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/10"
                        >
                            {/* Phone Notch Removed per user request */}


                            {/* Screen Content */}
                            <div className="w-full h-full bg-zinc-900 relative">
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={activeProject.link}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full h-full"
                                    >
                                        <iframe
                                            src={activeProject.link}
                                            className="w-[166.67%] h-[166.67%] border-0 origin-top-left scale-[0.6]"
                                            onLoad={() => setIsLoading(false)}
                                            title="Live Preview"
                                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                        />

                                        {/* Loading Overlay */}
                                        {isLoading && (
                                            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center z-10">
                                                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}

                                        {/* Visit Button Overlay */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <a
                                                href={activeProject.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-lg whitespace-nowrap"
                                            >
                                                Abrir en nueva pestaña <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Down Button */}
                <div className="flex justify-center mt-16 lg:mt-24">
                    <a
                        href="#pricing"
                        className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors duration-300"
                    >
                        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Siguiente Nivel</span>
                        <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                            <ArrowDown className="w-4 h-4 animate-bounce" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};
