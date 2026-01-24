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
    const [activePromo, setActivePromo] = useState<'fidelity' | 'standard'>('fidelity');

    useEffect(() => {
        const savedCode = localStorage.getItem('victory_coupon');
        if (savedCode) {
            setCouponCode(savedCode);
            if (savedCode === 'victory50') setActivePromo('fidelity');
            else if (savedCode.startsWith('VICTORY20')) setActivePromo('standard');
        } else if (searchParams.get('source') === 'qr') {
            generateCode('fidelity');
        }
    }, [searchParams]);

    const generateCode = (type: 'fidelity' | 'standard') => {
        setIsGenerating(true);
        setActivePromo(type);
        setTimeout(() => {
            let newCode = '';
            if (type === 'fidelity') {
                newCode = 'victory50';
            } else {
                const random = Math.random().toString(36).substring(2, 6).toUpperCase();
                newCode = `VICTORY20-${random}`;
            }
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
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 uppercase tracking-tighter">
                    Centro de <span className="text-brand-cyan text-glow">Promociones</span>
                </h1>
                <p className="text-slate-400 font-inter max-w-2xl mx-auto text-lg leading-relaxed">
                    Explora nuestras campañas vigentes y reclama tus beneficios exclusivos para llevar tu vehículo al siguiente nivel.
                </p>
            </div>

            {/* Promotions Hub */}
            <section className="max-w-6xl mx-auto mb-20">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Fidelity Promo Card */}
                    <div className={`relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden ${activePromo === 'fidelity' ? 'bg-brand-cyan/10 border-brand-cyan shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'bg-white/5 border-white/10 grayscale hover:grayscale-0'}`}
                        onClick={() => { setActivePromo('fidelity'); if (couponCode?.startsWith('VICTORY20')) setCouponCode(null); }}>
                        <div className="relative z-10">
                            <div className="bg-brand-cyan text-brand-dark-blue font-bold px-3 py-1 rounded-full text-[10px] w-fit mb-4">NUEVO</div>
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">PROMO FIDELIDAD</h3>
                            <p className="text-4xl font-black text-brand-cyan mb-4">50% OFF</p>
                            <p className="text-slate-400 text-sm mb-6">En el segundo vehículo por la compra de cualquier servicio (mismos servicios).</p>
                            {activePromo === 'fidelity' && couponCode === 'victory50' ? (
                                <div className="flex items-center gap-2 text-brand-cyan font-bold"><FaCheck /> ACTIVADO</div>
                            ) : (
                                <button className="text-brand-cyan font-orbitron text-xs tracking-widest hover:underline">SELECCIONAR</button>
                            )}
                        </div>
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
                            <FaTicketAlt size={160} className="rotate-12" />
                        </div>
                    </div>

                    {/* Standard Promo Card */}
                    <div className={`relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden ${activePromo === 'standard' ? 'bg-brand-cyan/10 border-brand-cyan shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'bg-white/5 border-white/10 grayscale hover:grayscale-0'}`}
                        onClick={() => { setActivePromo('standard'); if (couponCode === 'victory50') setCouponCode(null); }}>
                        <div className="relative z-10">
                            <div className="bg-slate-700 text-white font-bold px-3 py-1 rounded-full text-[10px] w-fit mb-4">VIGENTE</div>
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">BONO DE REGALO</h3>
                            <p className="text-4xl font-black text-brand-cyan mb-4">20% OFF</p>
                            <p className="text-slate-400 text-sm mb-6">En servicios seleccionados: PDR, Cerámicos, Interior y piezas de pintura.</p>
                            {activePromo === 'standard' && couponCode?.startsWith('VICTORY20') ? (
                                <div className="flex items-center gap-2 text-brand-cyan font-bold"><FaCheck /> ACTIVADO</div>
                            ) : (
                                <button className="text-brand-cyan font-orbitron text-xs tracking-widest hover:underline">SELECCIONAR</button>
                            )}
                        </div>
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
                            <FaStar size={160} className="rotate-12" />
                        </div>
                    </div>
                </div>

                {/* Active Coupon Detail */}
                <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-r from-brand-cyan/20 to-blue-500/20 backdrop-blur-2xl">
                    {!couponCode ? (
                        <div className="relative bg-brand-dark-blue/80 rounded-[2.2rem] p-12 text-center border border-white/10">
                            <h2 className="text-3xl font-orbitron font-bold text-white mb-4 uppercase">Activar Beneficio</h2>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                Has seleccionado la {activePromo === 'fidelity' ? 'Promoción de Fidelidad' : 'Promoción de Regalo'}. Haz clic abajo para generar tu código.
                            </p>
                            <button
                                onClick={() => generateCode(activePromo)}
                                disabled={isGenerating}
                                className="bg-brand-cyan text-brand-dark-blue font-orbitron font-bold py-4 px-12 rounded-full hover:bg-white transition-all duration-300 disabled:opacity-50 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                            >
                                {isGenerating ? 'GENERANDO...' : `OBTENER ${activePromo === 'fidelity' ? '50%' : '20%'} OFF`}
                            </button>
                        </div>
                    ) : (
                        <div className="relative bg-brand-dark-blue/80 rounded-[2.2rem] p-10 border border-white/10 overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                <div>
                                    <div className="flex items-center gap-3 text-brand-cyan mb-4">
                                        <FaCheck className="animate-pulse" />
                                        <span className="text-xs font-orbitron uppercase tracking-widest">Beneficio Activado</span>
                                    </div>
                                    <h2 className="text-3xl font-orbitron font-bold text-white mb-4 uppercase leading-tight">
                                        Tu código <span className="text-brand-cyan">Victoria</span>
                                    </h2>
                                    <div className="flex gap-2 mb-6">
                                        <div className="flex-grow bg-black/50 border border-brand-cyan/30 rounded-xl p-4 flex items-center justify-between">
                                            <span className="text-2xl font-mono font-bold text-brand-cyan tracking-widest">{couponCode}</span>
                                            <button onClick={copyToClipboard} className="text-slate-500 hover:text-brand-cyan transition-colors">
                                                {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 mb-6">
                                        <FaInfoCircle className="text-brand-cyan mt-1 shrink-0" />
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            Presenta este código al momento de tu agendamiento. {activePromo === 'fidelity' ? 'Válido para el mismo servicio en un segundo vehículo.' : 'Válido para servicios seleccionados.'}
                                        </p>
                                    </div>
                                    <button onClick={resetPromo} className="text-slate-500 text-[10px] hover:text-white transition-colors uppercase tracking-widest">Cambiar por otra promoción</button>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="scale-75 md:scale-90 origin-center">
                                        <div id="flyer-content">
                                            <PromoFlyer discount={activePromo === 'fidelity' ? "50%" : "20%"} promoTitle={activePromo === 'fidelity' ? "Promo Fidelidad" : "Bono de Regalo"} />
                                        </div>
                                    </div>
                                    <button onClick={downloadPDF} className="w-full bg-white/10 hover:bg-white text-white hover:text-brand-dark-blue border border-white/10 font-orbitron font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                                        DESCARGAR BONO PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Quoter Section */}
            <section className="mb-20">
                <div className="text-center mb-12">
                    <span className="text-brand-cyan font-orbitron text-xs uppercase tracking-[0.3em] mb-4 block">Calcula tu presupuesto</span>
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white uppercase tracking-tighter italic">
                        Cotizador Online
                    </h2>
                </div>
                <Quoter hasDiscount={!!couponCode} discountCode={couponCode || undefined} />
            </section>

            {/* Conditions Section */}
            <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-brand-mid-blue/30 backdrop-blur-md border border-white/5 p-8 rounded-2xl group hover:border-brand-cyan/30 transition-all">
                    <h3 className="text-brand-cyan font-orbitron text-lg mb-4 uppercase tracking-tighter">20% Descuento</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Aplicable en servicios de PDR (Paintless Dent Repair) y cualquier tratamiento cerámico de nuestra línea 2025.</p>
                </div>
                <div className="bg-brand-mid-blue/30 backdrop-blur-md border border-white/5 p-8 rounded-2xl group hover:border-brand-cyan/30 transition-all text-center border-b-2 border-b-brand-cyan/50">
                    <h3 className="text-brand-cyan font-orbitron text-lg mb-4 uppercase tracking-tighter">Vigencia 2025</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Válido para agendamientos realizados durante el mes en curso. No acumulable con otras promociones.</p>
                </div>
                <div className="bg-brand-mid-blue/30 backdrop-blur-md border border-white/5 p-8 rounded-2xl group hover:border-brand-cyan/30 transition-all text-right">
                    <h3 className="text-brand-cyan font-orbitron text-lg mb-4 uppercase tracking-tighter">Marcas Aliadas</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Trabajamos exclusivamente con Sylex, Gtechniq e IGL Coatings para garantizar resultados de nivel mundial.</p>
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
