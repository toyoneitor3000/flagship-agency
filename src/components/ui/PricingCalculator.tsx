'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Calculator, Sparkles, Clock, Smartphone, Database, ShoppingBag, Box } from 'lucide-react';

// PRECIOS BASE (SETUP)
const BASE_PLANS = [
    { id: 'landing', name: 'Landing Page', setup: 550000, annual: 350000, icon: Sparkles, desc: 'Una sola página de alto impacto.' },
    { id: 'web', name: 'Sitio Web Pro', setup: 1200000, annual: 1440000, icon: Box, desc: 'Multi-página con CMS (Panel Admin incluido).' },
    { id: 'store', name: 'E-Commerce', setup: 3800000, annual: 2800000, icon: ShoppingBag, desc: 'Tienda Completa (Gestión Total).' },
    { id: 'system', name: 'Web App / Sistema', setup: 8500000, annual: 4500000, icon: Database, desc: 'Software a medida con usuarios y datos.' },
    { id: 'venture', name: 'Venture (Startup)', setup: 25000000, annual: 0, icon: RocketIcon, desc: 'Producto digital desde cero (MVP).' }
];

// ADD-ONS (SETUP EXTRA)
const ADDONS = [
    { id: 'auth', name: 'Portal de Usuarios', price: 600000, icon: Database, desc: 'Registro y Perfiles Públicos' },
    { id: 'app', name: 'App Stores (PWA)', price: 1200000, icon: Smartphone, desc: 'iOS & Android' },
    { id: 'shop', name: 'Pasarela de Pagos', price: 350000, icon: ShoppingBag, desc: 'Recibe dinero' },
    { id: '3d', name: 'Experiencia 3D', price: 900000, icon: Box, desc: 'WebGL inmersivo' },
];

// NIVELES DE SOPORTE (RECURRENTE MENSUAL)
const SUPPORT_TIERS = [
    {
        id: 'basic',
        name: 'Solo Infraestructura',
        monthly: 0,
        desc: 'Solo pagas lo técnico anual. Los cambios se cobran por hora ($120k).',
        highlight: false
    },
    {
        id: 'active',
        name: 'Soporte Activo',
        monthly: 350000,
        desc: 'Incluye 4 horas de cambios al mes. Ideal para mantener tu web fresca.',
        highlight: true,
        tag: 'Recomendado'
    },
    {
        id: 'partner',
        name: 'Growth Partner',
        monthly: 1200000,
        desc: '20 horas de desarrollo al mes. Somos tu departamento de IT.',
        highlight: false
    }
];

function RocketIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    )
}

export const PricingCalculator = () => {
    const [selectedBase, setSelectedBase] = useState(BASE_PLANS[0]);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [selectedSupport, setSelectedSupport] = useState(SUPPORT_TIERS[0]);
    const [isSpeedlite, setIsSpeedlite] = useState(false);

    const toggleAddon = (id: string) => {
        if (selectedAddons.includes(id)) {
            setSelectedAddons(selectedAddons.filter(a => a !== id));
        } else {
            setSelectedAddons([...selectedAddons, id]);
        }
    };

    // CÁLCULOS
    const addonsTotal = ADDONS.filter(a => selectedAddons.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
    const setupTotal = selectedBase.setup + addonsTotal;
    const annualTotal = selectedBase.annual; // Hosting Base
    const monthlyTotal = selectedSupport.monthly; // Retainer

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-zinc-950 border border-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 backdrop-blur-sm relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

            <div className="p-6 md:p-8 border-b border-white/5 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="font-display text-2xl font-bold text-white flex items-center gap-3">
                        <Calculator className="w-6 h-6 text-indigo-400" />
                        Configurador de Proyecto
                    </h3>
                    <p className="text-zinc-400 text-sm mt-2">Arma tu plan a medida. Elige la base, agrega funciones y decide tu nivel de soporte.</p>
                </div>

                {/* SPEEDLIGHT TOGGLE */}
                <div className="flex flex-col items-end gap-1">
                    <div
                        onClick={() => setIsSpeedlite(!isSpeedlite)}
                        className={`cursor-pointer group flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 ${isSpeedlite ? 'bg-[#00FF9C]/10 border-[#00FF9C]' : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'}`}
                    >
                        <div className="flex flex-col items-end">
                            <span className={`text-xs font-bold uppercase tracking-wider ${isSpeedlite ? 'text-[#00FF9C]' : 'text-zinc-400'}`}>Comunidad Speedlight</span>
                            <span className="text-[9px] text-zinc-500">{isSpeedlite ? '30% Descuento Aplicado' : 'Activar Beneficio'}</span>
                        </div>
                        <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${isSpeedlite ? 'bg-[#00FF9C]' : 'bg-zinc-700'}`}>
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-zinc-950 shadow transition-transform duration-300 ${isSpeedlite ? 'left-6' : 'left-1'}`} />
                        </div>
                    </div>
                    <a href="/aliados/speedlight" className="text-[10px] text-indigo-400 hover:text-[#00FF9C] flex items-center gap-1 transition-colors">
                        <Info className="w-3 h-3" />
                        ¿Cómo funciona?
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* COLUMNA 1 & 2: CONTROLES */}
                <div className="lg:col-span-2 p-6 md:p-8 space-y-10">

                    {/* PASO 1: BASE */}
                    <section>
                        <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">1</span>
                            Elige el Punto de Partida
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {BASE_PLANS.map((plan) => (
                                <button
                                    key={plan.id}
                                    onClick={() => setSelectedBase(plan)}
                                    className={`relative p-4 rounded-xl border text-left transition-all duration-300 group ${selectedBase.id === plan.id
                                        ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                                        : 'bg-zinc-900/40 border-white/5 hover:border-indigo-500/30 hover:bg-zinc-800/40'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${selectedBase.id === plan.id ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                                            <plan.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm">{plan.name}</div>
                                            <div className="text-[10px] text-zinc-400 leading-tight mt-1">{plan.desc}</div>
                                            <div className="mt-2 text-xs font-mono">
                                                {isSpeedlite ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-zinc-500 line-through decoration-red-500/50">{formatMoney(plan.setup)}</span>
                                                        <span className="text-[#00FF9C] font-bold">{formatMoney(plan.setup * 0.7)}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-indigo-300">{formatMoney(plan.setup)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* PASO 2: ADD-ONS */}
                    <section>
                        <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">2</span>
                            Agrega Superpoderes
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {ADDONS.map((addon) => (
                                <button
                                    key={addon.id}
                                    onClick={() => toggleAddon(addon.id)}
                                    className={`p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${selectedAddons.includes(addon.id)
                                        ? 'bg-indigo-600/20 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                                        : 'bg-zinc-900/20 border-white/5 hover:border-indigo-500/30'
                                        }`}
                                >
                                    {selectedAddons.includes(addon.id) && (
                                        <div className="absolute top-2 right-2 text-indigo-400">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                    <addon.icon className={`w-5 h-5 mb-2 ${selectedAddons.includes(addon.id) ? 'text-indigo-400' : 'text-zinc-500'}`} />
                                    <div className="font-bold text-zinc-200 text-xs mb-0.5">{addon.name}</div>
                                    <div className="text-[10px] text-zinc-500 text-xs font-mono">
                                        {isSpeedlite ? (
                                            <span className="flex gap-1">
                                                <span className="line-through opacity-50">+{formatMoney(addon.price)}</span>
                                                <span className="text-[#00FF9C]">+{formatMoney(addon.price * 0.7)}</span>
                                            </span>
                                        ) : (
                                            <span>+{formatMoney(addon.price)}</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* PASO 3: SOPORTE */}
                    <section>
                        <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#00FF9C]/20 text-[#00FF9C] flex items-center justify-center text-xs">3</span>
                            Nivel de Acompañamiento
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {SUPPORT_TIERS.map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setSelectedSupport(tier)}
                                    className={`relative p-4 rounded-xl border text-left transition-all duration-300 ${selectedSupport.id === tier.id
                                        ? 'bg-[#00FF9C]/10 border-[#00FF9C] shadow-[0_0_20px_rgba(0,255,156,0.1)]'
                                        : 'bg-zinc-900/40 border-white/5 hover:border-[#00FF9C]/30'
                                        }`}
                                >
                                    {tier.highlight && (
                                        <span className="absolute -top-2.5 left-4 bg-[#00FF9C] text-zinc-950 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                            {tier.tag}
                                        </span>
                                    )}
                                    <div className={`font-bold text-sm ${selectedSupport.id === tier.id ? 'text-white' : 'text-zinc-300'}`}>{tier.name}</div>
                                    <div className="text-[10px] text-zinc-400 mt-1 min-h-[2.5em] leading-relaxed">{tier.desc}</div>
                                    <div className={`mt-3 text-lg font-bold tracking-tight ${selectedSupport.id === tier.id ? 'text-[#00FF9C]' : 'text-zinc-500'}`}>
                                        {tier.monthly === 0 ? 'Sin Mensualidad' : (
                                            isSpeedlite ? (
                                                <div className="flex flex-col items-start leading-none gap-1">
                                                    <span className="text-xs text-zinc-600 line-through">{formatMoney(tier.monthly)}</span>
                                                    <span>{formatMoney(tier.monthly * 0.7)}/mes</span>
                                                </div>
                                            ) : (
                                                formatMoney(tier.monthly) + '/mes'
                                            )
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                </div>

                {/* COLUMNA 3: RESUMEN (Sticky) */}
                <div className="bg-zinc-950/80 border-l border-white/5 p-6 md:p-8 flex flex-col justify-between relative z-10 backdrop-blur-xl">
                    <div>
                        <h4 className="font-display text-xl font-bold text-white mb-6">Resumen de Inversión</h4>

                        {/* SETUP SUMMARY */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Base {selectedBase.name}</span>
                                <span className="text-white font-mono">{formatMoney(selectedBase.setup)}</span>
                            </div>
                            {selectedAddons.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-zinc-800/50">
                                    {ADDONS.filter(a => selectedAddons.includes(a.id)).map(addon => (
                                        <div key={addon.id} className="flex justify-between items-center text-xs text-indigo-300">
                                            <span>+ {addon.name}</span>
                                            <span className="font-mono">{formatMoney(addon.price)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
                                <div>
                                    <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Total Construcción</div>
                                    <div className="flex flex-col">
                                        {isSpeedlite && (
                                            <span className="text-lg text-zinc-500 line-through font-mono decoration-red-500/50">{formatMoney(setupTotal)}</span>
                                        )}
                                        <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 tracking-tighter">
                                            {formatMoney(isSpeedlite ? setupTotal * 0.7 : setupTotal)}
                                        </div>
                                    </div>
                                    <div className="text-zinc-500 text-[10px] items-center mt-1">
                                        Pago Único {isSpeedlite && <span className="text-[#00FF9C] ml-1 font-bold">• Ahorras {formatMoney(setupTotal * 0.3)}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RECURRENTE SUMMARY */}
                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50 space-y-4">
                            <div>
                                <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">Costos Recurrentes</div>

                                {/* Mensualidad */}
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-zinc-300 text-xs">Soporte ({selectedSupport.name})</span>
                                    <div className="text-right">
                                        {isSpeedlite && selectedSupport.monthly > 0 && (
                                            <div className="text-[10px] text-zinc-600 line-through font-mono">{formatMoney(selectedSupport.monthly)}</div>
                                        )}
                                        <span className={`text-sm font-bold font-mono ${selectedSupport.monthly > 0 ? 'text-[#00FF9C]' : 'text-zinc-500'}`}>
                                            {selectedSupport.monthly === 0
                                                ? 'On-Demand'
                                                : formatMoney(isSpeedlite ? selectedSupport.monthly * 0.7 : selectedSupport.monthly) + '/mes'
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* Anualidad */}
                                <div className="flex justify-between items-center pt-2 border-t border-zinc-800/50">
                                    <div className="flex flex-col">
                                        <span className="text-zinc-300 text-xs">Infraestructura Base</span>
                                        <span className="text-[9px] text-zinc-500">(Hosting, Dominios, SSL)</span>
                                    </div>
                                    <div className="text-right">
                                        {isSpeedlite && (
                                            <div className="text-[10px] text-zinc-600 line-through font-mono">{formatMoney(annualTotal)}</div>
                                        )}
                                        <span className="text-sm font-bold text-zinc-300 font-mono">
                                            {formatMoney(isSpeedlite ? annualTotal * 0.7 : annualTotal)}/año
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <button className="w-full bg-[#00FF9C] text-zinc-950 hover:bg-[#00dda0] py-4 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)] flex items-center justify-center gap-2 uppercase tracking-wide">
                            {isSpeedlite ? 'Reclamar Oferta Speedlight' : 'Iniciar Proyecto'}
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        {isSpeedlite && (
                            <p className="text-center text-[10px] text-zinc-500">
                                Requisito: Cuenta verificada en <a href="https://speedlightculture.com" target="_blank" rel="noopener noreferrer" className="text-[#00FF9C] underline hover:text-[#00dda0]">speedlightculture.com</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple Arrow Right Component to avoid import issues if lucide version varies
function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
