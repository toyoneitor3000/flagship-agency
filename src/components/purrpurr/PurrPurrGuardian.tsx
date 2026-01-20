'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { usePurrpurr } from './PurrpurrContext';
import { X, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const PurrPurrGuardian = () => {
    const { status } = useSession();
    const pathname = usePathname();
    const { message } = usePurrpurr();
    const [isVisible, setIsVisible] = useState(false);
    const [isMandatory, setIsMandatory] = useState(false);

    // Páginas obligatorias (Laboratorio y Academia)
    const mandatoryPages = ['/inertia-engine/fluid', '/lab', '/academy'];

    useEffect(() => {
        if (status === 'authenticated') {
            setIsVisible(false);
            return;
        }

        const isPageMandatory = mandatoryPages.some(page => pathname.includes(page));
        setIsMandatory(isPageMandatory);

        if (isPageMandatory) {
            // En laboratorio/academia aparece inmediato y obligatorio
            setIsVisible(true);
        } else {
            // En el resto de páginas (Landing, Demo, Noticias...) aparece a los 30s y es cerrable
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 30000); // 30 segundos
            return () => clearTimeout(timer);
        }
    }, [status, pathname]);

    const handleGoogleLogin = () => {
        signIn('google');
    };

    const handleClose = () => {
        if (!isMandatory) {
            setIsVisible(false);
        }
    };

    if (status === 'loading' || status === 'authenticated' || !isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop - Blur más intenso si es obligatorio */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className={`absolute inset-0 bg-black/60 backdrop-blur-xl ${isMandatory ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />

                {/* Contenedor Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-zinc-950 border border-purple-500/30 rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                    {/* Botón de Cerrar (Solo si no es obligatorio) */}
                    {!isMandatory && (
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}

                    <div className="p-8 md:p-12 flex flex-col items-center text-center">
                        {/* Avatar Guardian */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="relative w-56 h-56 mb-6"
                        >
                            <div className="absolute inset-0 bg-purple-500/20 blur-[4rem] rounded-full" />
                            <Image
                                src="/assets/purrpurr/watcher.png"
                                alt="PurrPurrGuardian"
                                fill
                                className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                                unoptimized
                            />
                        </motion.div>

                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-[0.3em]">PurrPurr_Guardian</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                            {isMandatory ? 'ACCESO RESTRINGIDO' : '¡QUÉ CHIMBA QUE ESTÉS ACÁ!'}
                        </h2>

                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                            {isMandatory
                                ? 'Este nivel de la arquitectura requiere autorización universal. Inicia sesión para continuar.'
                                : 'Estás en la sede tierra de Purrpurr. Estás a un solo paso de entrar al edificio y acceder a toda una arquitectura universal.'
                            }
                        </p>

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 py-4 px-8 rounded-full text-sm font-bold font-mono transition-all active:scale-95 group shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-4"
                        >
                            <Image src="https://www.google.com/favicon.ico" width={20} height={20} alt="Google" />
                            ENTRAR AL EDIFICIO
                        </button>

                        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                            {isMandatory ? 'AUTENTICACIÓN REQUERIDA' : 'CONEXIÓN SEGURA • GOOGLE AUTH'}
                        </p>
                    </div>

                    {/* Efecto Decorativo Inferior */}
                    <div className="h-2 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20" />
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
