'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, Zap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Datos de los planes (Deberían venir de una config centralizada, pero por ahora replicate)
const PLANS_DB = {
    'semilla-monthly': { name: 'Plan Semilla (Mensual)', price: 19900, currency: 'COP' },
    'semilla-annual': { name: 'Plan Semilla (Anual)', price: 180000, currency: 'COP' }, // 15k * 12
    'despegue-monthly': { name: 'Plan Despegue (Mensual)', price: 149000, currency: 'COP' },
    'despegue-annual': { name: 'Plan Despegue (Anual)', price: 1440000, currency: 'COP' }, // 120k * 12
    'imperio': { name: 'Núcleo Corporativo', price: 0, currency: 'COP', isQuote: true },
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const planParam = searchParams.get('plan') || 'semilla-monthly';
    // Simple logic to map params to keys if needed, for now assumes direct match or exact strings
    // Let's normalize generic params from pricing page

    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Map generic params like 'diy' to specific default
        let key = planParam;
        if (planParam === 'diy') key = 'semilla-monthly';
        if (planParam === 'static') key = 'despegue-monthly'; // old name mapping
        if (planParam === 'managed') key = 'despegue-monthly';
        if (planParam === 'enterprise') key = 'imperio';

        setSelectedPlan(PLANS_DB[key as keyof typeof PLANS_DB] || PLANS_DB['semilla-monthly']);
    }, [planParam]);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Aquí iría la integración real con Wompi
        setTimeout(() => {
            alert('Modo Simulación: Redirigiendo a Pasarela Wompi...');
            setLoading(false);
        }, 1500);
    };

    if (!selectedPlan) return <div>Cargando...</div>;

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">

            {/* Columna Izquierda: Resumen de Orden (Estilo Recibo) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-[#00FF9C]" />

                <Link href="/#pricing" className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Volver
                </Link>

                <div className="max-w-md mx-auto w-full">
                    <div className="mb-8">
                        <span className="text-[#00FF9C] font-mono text-xs tracking-widest uppercase">Resumen de Compra</span>
                        <h1 className="text-3xl md:text-4xl font-display font-bold mt-2">Tu acceso a la Elite.</h1>
                    </div>

                    <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-6">
                        <div className="flex justify-between items-start pb-6 border-b border-zinc-900">
                            <div>
                                <h3 className="font-bold text-lg text-white">{selectedPlan.name}</h3>
                                <p className="text-zinc-400 text-sm">Suscripción recurrente</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold font-mono">
                                    {selectedPlan.isQuote ? 'COTIZAR' : `$${selectedPlan.price.toLocaleString('es-CO')}`}
                                </p>
                                <p className="text-xs text-zinc-500">{selectedPlan.currency}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-zinc-300">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                <span>Infraestructura Serverless Incluida</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-300">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                <span>Dashboard de Control Inmediato</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-300">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                <span>Soporte Wompi (Nequi, PSE, Tarjetas)</span>
                            </div>
                        </div>

                        {!selectedPlan.isQuote && (
                            <div className="pt-4 flex justify-between items-center font-bold text-lg">
                                <span>Total a Pagar hoy:</span>
                                <span className="text-[#00FF9C]">${selectedPlan.price.toLocaleString('es-CO')}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex items-center gap-4 text-xs text-zinc-500">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pagos encriptados de extremo a extremo.</span>
                    </div>
                </div>
            </motion.div>

            {/* Columna Derecha: Formulario (Datos del Lead) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center"
            >
                <div className="max-w-md mx-auto w-full space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Datos de Facturación</h2>
                        <p className="text-zinc-400 text-sm">Crea tu cuenta Purrpurr para gestionar tu suscripción.</p>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Nombre</label>
                                <input required type="text" placeholder="John" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Apellido</label>
                                <input required type="text" placeholder="Doe" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Email Corporativo</label>
                            <input required type="email" placeholder="ceo@empresa.com" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">WhatsApp (Importante para Soporte)</label>
                            <input required type="tel" placeholder="+57 300 ..." className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>

                        <div className="pt-4">
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Procesando...</span>
                                ) : (
                                    <>
                                        {selectedPlan.isQuote ? 'Solicitar Cotización' : 'Pagar con Wompi / PSE / Nequi'}
                                        <Zap className="w-4 h-4 fill-white" />
                                    </>
                                )}
                            </button>
                            <p className="text-center text-[10px] text-zinc-600 mt-4">
                                Al continuar, aceptas nuestros términos de servicio y política de privacidad.
                                Tus pagos son procesados seguramente por Wompi Colombia.
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Cargando Checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
