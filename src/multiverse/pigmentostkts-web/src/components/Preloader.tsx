'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const { setPreloaderDone } = usePreloader();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        let progressValue = 0;
        let pageLoaded = false;

        // Detectar si la página ya cargó
        const checkLoaded = () => {
            if (document.readyState === 'complete') {
                pageLoaded = true;
            }
        };
        checkLoaded();
        window.addEventListener('load', () => { pageLoaded = true; });

        // Progreso real: sube rápido hasta 70%, luego espera a que la página
        // realmente cargue para llegar a 100%
        const interval = setInterval(() => {
            if (progressValue < 70) {
                // Fase 1: subir rápido hasta 70% (recursos base)
                progressValue = Math.min(progressValue + 3, 70);
            } else if (!pageLoaded && progressValue < 90) {
                // Fase 2: subir lento hasta 90% mientras espera carga real
                progressValue = Math.min(progressValue + 0.5, 90);
            } else if (pageLoaded) {
                // Fase 3: página cargada → completar rápido a 100%
                progressValue = Math.min(progressValue + 5, 100);
            }

            setProgress(Math.round(progressValue));

            if (progressValue >= 100) {
                clearInterval(interval);
                // Pequeña pausa antes de cerrar para que se vea el 100%
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = '';

                    if (!window.location.hash) {
                        window.scrollTo(0, 0);
                    } else {
                        // Re-trigger hash scroll after preloader
                        const id = window.location.hash.substring(1);
                        const element = document.getElementById(id);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }

                    setPreloaderDone();
                }, 300);
            }
        }, 30);

        return () => {
            document.body.style.overflow = '';
            clearInterval(interval);
        };
    }, []);

    const containerExit = {
        initial: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        exit: {
            opacity: 0,
            scale: 1.5,
            filter: 'blur(12px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    variants={containerExit}
                    initial="initial"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                    style={{
                        background: 'radial-gradient(ellipse at center, #FFE44D 0%, #E6C200 40%, #B89B00 80%, #8A7400 100%)'
                    }}
                >
                    {/* CSS-only keyframe styles */}
                    <style jsx>{`
                        @keyframes pulseGlow {
                            0%, 100% { opacity: 0.3; transform: scale(0.9); }
                            50% { opacity: 0.6; transform: scale(1.15); }
                        }
                        @keyframes spinSlow {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        @keyframes spinReverse {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(-360deg); }
                        }
                        @keyframes shimmer {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(300%); }
                        }
                        .glow-pulse {
                            animation: pulseGlow 4s ease-in-out infinite;
                        }
                        .ring-spin {
                            animation: spinSlow 25s linear infinite;
                        }
                        .ring-spin-reverse {
                            animation: spinReverse 35s linear infinite;
                        }
                        .bar-shimmer {
                            animation: shimmer 1.5s ease-in-out infinite;
                        }
                    `}</style>

                    {/* ───── Efecto de Luz Central ───── */}
                    <div
                        className="absolute z-0 glow-pulse"
                        style={{
                            width: '120vw',
                            height: '120vh',
                            background: 'radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, transparent 50%)',
                        }}
                    />

                    {/* ───── Anillos de Luz ───── */}
                    <div
                        className="absolute z-0 rounded-full ring-spin"
                        style={{
                            width: '70vmin',
                            height: '70vmin',
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: '0 0 60px 10px rgba(255,255,255,0.05), inset 0 0 60px 10px rgba(255,255,255,0.05)',
                        }}
                    />
                    <div
                        className="absolute z-0 rounded-full ring-spin-reverse"
                        style={{
                            width: '100vmin',
                            height: '100vmin',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 0 40px 5px rgba(255,255,255,0.03)',
                        }}
                    />

                    {/* ───── CONTENIDO CENTRAL ───── */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-8">

                        {/* Logo con Glow */}
                        <motion.div
                            animate={{
                                scale: [1, 1.03, 1],
                                filter: [
                                    'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                                    'drop-shadow(0 0 40px rgba(255,255,255,0.6))',
                                    'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                                ]
                            }}
                            transition={{
                                duration: 2.5,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                            className="relative w-72 h-36 md:w-[420px] md:h-52"
                        >
                            <Image
                                src="/brand/logo.png"
                                alt="Pigmento Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* ───── BARRA DE CARGA ───── */}
                        <div className="w-56 md:w-72 flex flex-col items-center gap-3">
                            {/* Track */}
                            <div className="w-full h-[3px] bg-black/20 rounded-full overflow-hidden relative">
                                {/* Fill */}
                                <div
                                    className="h-full rounded-full relative"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, #121212 0%, #333 50%, #121212 100%)',
                                        transition: 'width 0.1s linear',
                                    }}
                                >
                                    {/* Shimmer */}
                                    <div
                                        className="absolute inset-0 bar-shimmer"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                                            width: '50%',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Porcentaje */}
                            <span
                                className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/70"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                {progress}%
                            </span>
                        </div>
                    </div>

                    {/* ───── Sombra Inferior ───── */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-40 z-5 pointer-events-none"
                        style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
