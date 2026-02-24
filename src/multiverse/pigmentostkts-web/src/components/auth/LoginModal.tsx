"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useEffect, useState } from "react";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop — animated independently so backdrop-filter composites correctly */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-md"
                    />

                    {/* Modal Container — z-10 to sit above the backdrop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors border border-gray-200"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        {/* Left Panel - Branding (Hidden on mobile) */}
                        <div className="hidden md:flex relative w-1/2 bg-brand-black flex-col justify-between p-12 overflow-hidden shrink-0">
                            {/* Background decorative elements */}
                            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-yellow/10 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

                            {/* Micro-grid pattern overlay */}
                            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />

                            {/* Logo top left */}
                            <div className="relative z-10">
                                <div className="inline-block">
                                    <Image
                                        src="/brand/logo.png"
                                        alt="Pigmento Stickers"
                                        width={160}
                                        height={60}
                                        className="w-auto h-12 object-contain"
                                    />
                                </div>
                            </div>

                            {/* Hero Copy */}
                            <div className="relative z-10 max-w-xl mt-12 mb-auto">
                                <h1 className="text-3xl lg:text-5xl font-black text-white font-space leading-[1.1] tracking-tight">
                                    Crea, imprime y <span className="text-brand-yellow relative inline-block">destaca.<svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-yellow/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg></span>
                                </h1>
                                <p className="mt-4 text-sm lg:text-base text-gray-400 font-medium max-w-sm leading-relaxed">
                                    Accede a tu panel premium para gestionar pedidos, revisar tus archivos de diseño y retomar tu carrito al instante.
                                </p>
                            </div>

                            {/* Footer/Testimonial Area */}
                            <div className="relative z-10 border-t border-white/10 pt-6 mt-8 flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    <div className="w-8 h-8 rounded-full border-2 border-brand-black bg-gray-600 overflow-hidden"><Image src="https://placehold.co/100x100/png?text=1" width={32} height={32} alt="User" /></div>
                                    <div className="w-8 h-8 rounded-full border-2 border-brand-black bg-gray-500 overflow-hidden"><Image src="https://placehold.co/100x100/png?text=2" width={32} height={32} alt="User" /></div>
                                    <div className="w-8 h-8 rounded-full border-2 border-brand-black bg-brand-yellow flex items-center justify-center text-[8px] font-black text-black">
                                        +1k
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-white/60">Únete a la comunidad</p>
                            </div>
                        </div>

                        {/* Right Panel - Login Form */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 relative bg-gray-50/50 overflow-y-auto">

                            {/* Mobile Logo */}
                            <div className="md:hidden mb-10 w-full flex justify-center">
                                <Image src="/brand/logo.png" alt="Pigmento" width={140} height={45} className="w-auto h-10" />
                            </div>

                            <div className="w-full max-w-[360px]">
                                <div className="mb-8 text-center md:text-left">
                                    <h2 className="text-2xl font-black text-brand-black font-space tracking-tight mb-2">Bienvenido</h2>
                                    <p className="text-gray-500 font-medium text-sm">
                                        Inicia sesión o regístrate en segundos usando Google. No perderás el progreso de tu compra actual.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-8">
                                    <GoogleSignInButton />
                                </div>

                                <div className="text-center text-[10px] text-gray-400 font-medium max-w-[280px] mx-auto">
                                    Al continuar, aceptas nuestros{' '}
                                    <Link href="/politicas" className="underline hover:text-brand-black transition-colors">Términos</Link> y{' '}
                                    <Link href="/privacidad" className="underline hover:text-brand-black transition-colors">Privacidad</Link>.
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
