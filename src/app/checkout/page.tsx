'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PLANS = {
    'diy': { name: 'Acceso Laboratorio (DIY)', price: '$45', period: 'mes', total: '$45' },
    'static': { name: 'Anual Estándar (Static)', price: '$350', period: 'año', total: '$350' },
    'enterprise': { name: 'Growth & Partnership', price: '$16,000', period: 'año', total: '$16,000' }
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const planId = searchParams.get('plan') as keyof typeof PLANS || 'static';
    const plan = PLANS[planId] || PLANS.static;

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePayment = () => {
        setLoading(true);
        // Simulación de procesamiento de pago
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full bg-zinc-900 border border-white/10 p-12 text-center rounded-3xl"
                >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-10 h-10 text-black" />
                    </div>
                    <h1 className="text-3xl font-light text-white mb-4 uppercase tracking-[0.2em]">Pago Exitoso</h1>
                    <p className="text-zinc-500 text-sm mb-12 uppercase tracking-widest leading-relaxed">
                        Tu cuenta ha sido activada. Tu "Llave Maestra" ha sido enviada a tu correo institucional.
                    </p>
                    <Link
                        href="/studio"
                        className="inline-block w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all font-sans"
                    >
                        Entrar al Laboratorio
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/10">
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Left: Summary */}
                <div className="flex flex-col justify-center">
                    <Link href="/" className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest mb-12 hover:text-white transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Volver
                    </Link>
                    <span className="text-[10px] text-zinc-600 uppercase tracking-[0.5em] mb-4">Finalizar Compra</span>
                    <h1 className="text-5xl md:text-7xl font-light mb-8 uppercase tracking-widest leading-tight">Activa tu Poder.</h1>

                    <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl mb-12">
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                            <div>
                                <h2 className="text-sm font-light text-zinc-400 uppercase tracking-[0.2em] mb-1">{plan.name}</h2>
                                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{planId === 'diy' ? 'Suscripción Mensual' : 'Suscripción Anual'}</p>
                            </div>
                            <div className="text-2xl font-light">{plan.price}</div>
                        </div>
                        <div className="flex justify-between items-center text-xl tracking-widest uppercase font-light">
                            <span>Total</span>
                            <span className="text-white">{plan.total} <span className="text-xs text-zinc-500">USD</span></span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-zinc-500">
                            <ShieldCheck className="w-5 h-5 text-zinc-700" />
                            <span className="text-[10px] uppercase tracking-widest">Encriptación de Grado Bancario</span>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-500">
                            <Zap className="w-5 h-5 text-zinc-700" />
                            <span className="text-[10px] uppercase tracking-widest">Activación Instantánea</span>
                        </div>
                    </div>
                </div>

                {/* Right: Payment Method */}
                <div className="flex flex-col justify-center bg-zinc-900/30 p-12 border border-white/5 rounded-[3rem]">
                    <div className="mb-12">
                        <h3 className="text-xs text-zinc-400 uppercase tracking-[0.4em] mb-8">Método de Pago</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <button className="flex items-center justify-between p-6 border border-white/20 bg-white/5 rounded-2xl hover:border-white transition-all group">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="w-6 h-6 text-zinc-500 group-hover:text-white" />
                                    <span className="text-[10px] uppercase tracking-widest">Tarjeta de Crédito / Débito</span>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-6 h-4 bg-zinc-800 rounded-sm" />
                                    <div className="w-6 h-4 bg-zinc-800 rounded-sm" />
                                </div>
                            </button>
                            <button className="flex items-center justify-between p-6 border border-white/5 bg-zinc-950/50 rounded-2xl opacity-50 cursor-not-allowed">
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 flex items-center justify-center text-[8px] font-bold border border-zinc-800 rounded-full">PSE</div>
                                    <span className="text-[10px] uppercase tracking-widest">PSE / Nequi (Próximamente)</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full py-6 bg-white text-black font-bold text-xs uppercase tracking-[0.5em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-4"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                'Procesar Pago'
                            )}
                        </button>
                        <p className="text-center text-[9px] text-zinc-600 uppercase tracking-widest leading-relaxed">
                            Al proceder, aceptas los términos de servicio del Laboratorio Purrpurr. <br />
                            Tu suscripción se renovará automáticamente al final del periodo.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-widest text-xs">Cargando Terminal...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
