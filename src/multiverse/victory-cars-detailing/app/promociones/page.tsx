'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PromoFlyer from '../components/PromoFlyer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Quoter from '../components/Quoter';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { FaTicketAlt, FaCopy, FaCheck, FaInfoCircle, FaStar } from 'react-icons/fa';

function PromotionsContent() {
    const searchParams = useSearchParams();
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const savedCode = localStorage.getItem('victory_coupon');
        if (savedCode && savedCode.startsWith('VICTORY20')) {
            setCouponCode(savedCode);
        } else if (searchParams.get('source') === 'qr') {
            // Desde QR físico, generar código de 20%
            generateCode();
        }
    }, [searchParams]);

    const generateCode = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const random = Math.random().toString(36).substring(2, 6).toUpperCase();
            const newCode = `VICTORY20-${random}`;
            setCouponCode(newCode);
            localStorage.setItem('victory_coupon', newCode);
            setIsGenerating(false);
        }, 800);
    };

    const resetPromo = () => {
        setCouponCode(null);
        localStorage.removeItem('victory_coupon');
    };

    const copyToClipboard = () => {
        if (!couponCode) return;
        navigator.clipboard.writeText(couponCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadPDF = async () => {
        const element = document.getElementById('flyer-content');
        if (!element) return;
        try {
            await new Promise(r => setTimeout(r, 800));
            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 3,
                skipFonts: false,
                cacheBust: true,
                backgroundColor: '#020617',
            });
            const width = element.offsetWidth;
            const height = element.offsetHeight;
            const pdf = new jsPDF({
                orientation: width > height ? 'l' : 'p',
                unit: 'px',
                format: [width, height],
                hotfixes: ['px_scaling'],
            });
            pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'SLOW');
            pdf.save(`Bono-VictoryCars-${couponCode || '2025'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF.');
        }
    };

    return (
        <main className="flex-grow pt-24 pb-12 px-4">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-7xl font-orbitron font-black text-white mb-6 uppercase tracking-tighter">
                    Personaliza tu <span className="text-brand-cyan text-glow">Cotización</span>
                </h1>
                <p className="text-white/80 font-inter max-w-2xl mx-auto text-lg md:text-xl leading-relaxed italic">
                    Selecciona los servicios de élite para tu vehículo y obtén un presupuesto instantáneo.
                    Si tienes un código de beneficio, podrás aplicarlo directamente al final.
                </p>
            </div>

            {/* Banner Promo 50% - Solo visible hasta el 28 de febrero 2026 */}
            {new Date() < new Date('2026-02-28T23:59:59') && (
                <section className="mb-8 max-w-4xl mx-auto">
                    <a
                        href="https://www.instagram.com/victorycars_paintdetailing/reel/DT-42y_iaX7/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full group relative overflow-hidden bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 backdrop-blur-md border-2 border-amber-400/50 rounded-3xl p-6 md:p-8 text-center hover:border-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <span className="text-3xl">🔥</span>
                                <h2 className="text-xl md:text-2xl font-orbitron font-black text-white uppercase tracking-tight">
                                    ¿Buscas el <span className="text-amber-400">50% OFF</span> en el segundo vehículo?
                                </h2>
                            </div>
                            <p className="text-white/80 text-sm md:text-base mb-3 max-w-xl mx-auto">
                                ¡Sigue vigente! Encuentra el código en nuestra publicación de Instagram.
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="inline-flex items-center gap-2 text-amber-400 font-orbitron text-sm uppercase tracking-wider group-hover:scale-105 transition-transform">
                                    📲 Ver en Instagram
                                </span>
                                <span className="text-white/50 text-xs">• Válido hasta 28 Feb 2026</span>
                            </div>
                        </div>
                    </a>
                </section>
            )}

            {/* Banner de Bono 20% */}
            <section className="mb-12 max-w-4xl mx-auto">
                {!couponCode ? (
                    <button
                        onClick={() => generateCode()}
                        disabled={isGenerating}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-600/30 via-brand-cyan/30 to-emerald-600/30 backdrop-blur-md border-2 border-emerald-400/50 rounded-3xl p-8 md:p-10 text-center hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <span className="text-4xl">🎁</span>
                                <h2 className="text-2xl md:text-3xl font-orbitron font-black text-white uppercase tracking-tight">
                                    Bono <span className="text-emerald-400">20% OFF</span>
                                </h2>
                            </div>
                            <p className="text-white/80 text-sm md:text-base mb-4 max-w-xl mx-auto">
                                ¡Haz clic aquí para generar tu código exclusivo! Úsalo tú mismo o regálalo a alguien especial.
                            </p>
                            <span className="inline-flex items-center gap-2 text-emerald-400 font-orbitron text-sm uppercase tracking-wider group-hover:scale-105 transition-transform">
                                <FaTicketAlt /> {isGenerating ? 'Generando...' : 'Obtener mi código gratis'}
                            </span>
                        </div>
                    </button>
                ) : couponCode.startsWith('VICTORY20') ? (
                    <div className="bg-gradient-to-r from-emerald-600/20 via-brand-cyan/20 to-emerald-600/20 backdrop-blur-md border-2 border-emerald-400/50 rounded-3xl p-8 md:p-10 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-4xl">🎉</span>
                            <h2 className="text-2xl md:text-3xl font-orbitron font-black text-white uppercase tracking-tight">
                                ¡Tu Bono está Listo!
                            </h2>
                        </div>
                        <p className="text-white/70 text-sm mb-6">
                            Copia este código y pégalo en el cotizador para aplicar tu <span className="text-emerald-400 font-bold">20% de descuento</span>
                        </p>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="bg-black/50 border-2 border-emerald-400 rounded-xl px-8 py-4">
                                <span className="font-mono text-2xl md:text-3xl font-black text-emerald-400 tracking-widest">{couponCode}</span>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="bg-emerald-500/20 border border-emerald-400 text-emerald-400 p-4 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                            >
                                {copied ? <FaCheck size={20} /> : <FaCopy size={20} />}
                            </button>
                        </div>
                        <p className="text-white/50 text-xs italic">
                            💡 Tip: También puedes compartir este código con amigos o familiares
                        </p>
                        <button
                            onClick={resetPromo}
                            className="mt-4 text-white/40 text-xs underline hover:text-white/70 transition-colors"
                        >
                            Generar un código nuevo
                        </button>
                    </div>
                ) : null}
            </section>

            {/* Quoter Section - THE MAIN FOCUS */}
            <section className="mb-24">
                <Quoter />
            </section>

            {/* Information Section for Clarity */}
            <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-brand-mid-blue/20 backdrop-blur-md border border-white/5 p-10 rounded-3xl group hover:border-brand-cyan/30 transition-all">
                    <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center text-brand-cyan mb-6">
                        <FaStar size={24} />
                    </div>
                    <h3 className="text-white font-orbitron text-xl mb-4 uppercase tracking-tighter font-bold">Garantía Victory</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Nuestros tratamientos cerámicos cuentan con garantía real de hasta 5 años y mantenimientos programados.</p>
                </div>
                <div className="bg-brand-mid-blue/20 backdrop-blur-md border border-white/10 p-10 rounded-3xl group hover:border-brand-cyan/30 transition-all border-b-4 border-b-brand-cyan/50">
                    <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center text-brand-cyan mb-6">
                        <FaTicketAlt size={24} />
                    </div>
                    <h3 className="text-white font-orbitron text-xl mb-4 uppercase tracking-tighter font-bold">Obtén tu Beneficio</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                        Genera tu código de 20% de descuento haciendo clic en el banner de arriba. También puedes obtener bonos físicos en el taller o promociones especiales siguiéndonos en Instagram.
                    </p>
                </div>
                <div className="bg-brand-mid-blue/20 backdrop-blur-md border border-white/5 p-10 rounded-3xl group hover:border-brand-cyan/30 transition-all">
                    <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center text-brand-cyan mb-6">
                        <FaInfoCircle size={24} />
                    </div>
                    <h3 className="text-white font-orbitron text-xl mb-4 uppercase tracking-tighter font-bold">Peritaje Físico</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Toda cotización digital está sujeta a la revisión técnica presencial de tu vehículo para confirmar el estado de la pintura.</p>
                </div>
            </section>
        </main>
    );
}

export default function PromocionesPage() {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Header />
            <Suspense fallback={<div className="flex-grow flex items-center justify-center text-white font-orbitron">Cargando beneficios...</div>}>
                <PromotionsContent />
            </Suspense>
            <Footer />
            <style jsx global>{`
                .text-glow {
                    text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
                }
            `}</style>
        </div>
    );
}
