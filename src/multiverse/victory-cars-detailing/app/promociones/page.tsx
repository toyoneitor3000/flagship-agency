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
    const [inputCode, setInputCode] = useState('');
    const [codeError, setCodeError] = useState(false);

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
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-7xl font-orbitron font-black text-white mb-6 uppercase tracking-tighter">
                    Personaliza tu <span className="text-brand-cyan text-glow">Cotización</span>
                </h1>
                <p className="text-white/80 font-inter max-w-2xl mx-auto text-lg md:text-xl leading-relaxed italic">
                    Selecciona los servicios de élite para tu vehículo y obtén un presupuesto instantáneo.
                    Si tienes un código de beneficio, podrás aplicarlo directamente al final.
                </p>
            </div>

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
                        Consigue códigos exclusivos en nuestro **Instagram**, mediante **bonos físicos** entregados en el taller o escaneando nuestros **códigos QR** publicitarios. Prueba con `VICTORY50` para activar el 50% OFF.
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
