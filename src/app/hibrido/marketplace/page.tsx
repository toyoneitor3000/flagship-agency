'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, X, Check, CreditCard, Sparkles, Heart, Recycle, Flame, ArrowRight } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    division: 'pelos' | 'plastico' | 'dinamita';
    divisionLabel: string;
    price: number;
    description: string;
    has3D?: boolean;
}

const CATALOG: Product[] = [
    {
        id: 'gomunator-pro',
        name: 'El Gomunator • Pro Edition',
        division: 'pelos',
        divisionLabel: '- pelos + amor',
        price: 65000,
        description: 'Removedor de pelos lavable y reutilizable con polímero estático de por vida.',
        has3D: true,
    },
    {
        id: 'maceta-termofusion',
        name: 'Maceta Marmolada Upcycling',
        division: 'plastico',
        divisionLabel: 'Plástico con final feliz',
        price: 45000,
        description: 'Hecha con 120 tapas recicladas termofusionadas a presión.',
    },
    {
        id: 'bandeja-vaciabolsillos',
        name: 'Bandeja Orgánica Modular',
        division: 'plastico',
        divisionLabel: 'Plástico con final feliz',
        price: 38000,
        description: 'Pieza de diseño para llaves y accesorios con vetas únicas de color.',
    },
    {
        id: 'hoodie-flame',
        name: 'Hoodie Oversize Flame Mood',
        division: 'dinamita',
        divisionLabel: 'Dinamita',
        price: 160000,
        description: 'Algodón rústico 450g con serigrafía puff de alta resistencia.',
    },
    {
        id: 'tshirt-acid',
        name: 'T-Shirt Acid Wash Lab',
        division: 'dinamita',
        divisionLabel: 'Dinamita',
        price: 95000,
        description: 'Corte boxy oversize con lavado ácido artesanal.',
    },
];

export default function MarketplacePage() {
    const [selectedDivision, setSelectedDivision] = useState<'all' | 'pelos' | 'plastico' | 'dinamita'>('all');
    const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutDone, setCheckoutDone] = useState(false);

    const filtered = selectedDivision === 'all'
        ? CATALOG
        : CATALOG.filter((p) => p.division === selectedDivision);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { product, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.product.id !== id));
    };

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);

    const handleSimulatePayment = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setCheckoutDone(true);
            setCart([]);
            setTimeout(() => {
                setCheckoutDone(false);
                setIsCartOpen(false);
            }, 3000);
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-widest">
                        [ MARKETPLACE & E-COMMERCE HÍBRIDO ]
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
                        Catálogo Oficial
                    </h1>
                </div>

                {/* Cart Toggle Button */}
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 font-mono text-sm transition-all"
                >
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>Carrito ({cart.reduce((a, b) => a + b.qty, 0)})</span>
                    {cart.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
                    )}
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10 font-mono text-xs">
                {[
                    { id: 'all', label: 'Todos los Productos' },
                    { id: 'pelos', label: '- Pelos + Amor (Gomunator 3D)' },
                    { id: 'plastico', label: 'Plástico con Final Feliz' },
                    { id: 'dinamita', label: 'Dinamita Mood' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedDivision(tab.id as any)}
                        className={`px-5 py-2.5 rounded-full border transition-all uppercase tracking-wider ${
                            selectedDivision === tab.id
                                ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((product) => (
                    <div
                        key={product.id}
                        className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group"
                    >
                        <div>
                            <div className="w-full h-56 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden mb-6">
                                {product.division === 'pelos' && (
                                    <Heart className="w-16 h-16 text-purple-500/40 group-hover:scale-110 transition-transform duration-300" />
                                )}
                                {product.division === 'plastico' && (
                                    <Recycle className="w-16 h-16 text-emerald-500/40 group-hover:scale-110 transition-transform duration-300" />
                                )}
                                {product.division === 'dinamita' && (
                                    <Flame className="w-16 h-16 text-pink-500/40 group-hover:scale-110 transition-transform duration-300" />
                                )}

                                {product.has3D && (
                                    <Link
                                        href="/hibrido/pelos-amor"
                                        className="absolute top-3 right-3 text-[10px] font-mono bg-purple-500/30 text-purple-200 border border-purple-500/50 px-2.5 py-1 rounded-full font-bold hover:bg-purple-500/50 transition-colors flex items-center gap-1"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        <span>Ver en 3D</span>
                                    </Link>
                                )}
                            </div>

                            <span className="text-[10px] font-mono uppercase bg-white/5 text-zinc-400 px-2.5 py-0.5 rounded-full border border-white/10">
                                {product.divisionLabel}
                            </span>
                            <h3 className="text-xl font-bold text-white mt-3 mb-2">{product.name}</h3>
                            <p className="text-xs font-mono text-zinc-400 leading-relaxed mb-4">{product.description}</p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-lg font-bold font-mono text-emerald-400">
                                ${product.price.toLocaleString('es-CO')} COP
                            </span>
                            <button
                                onClick={() => addToCart(product)}
                                className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Añadir</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Shopping Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-md h-full bg-zinc-950 border-l border-white/10 p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.9)]">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                                <h3 className="text-lg font-bold font-mono flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-purple-400" />
                                    <span>TU CARRITO</span>
                                </h3>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {cart.length === 0 ? (
                                <p className="text-sm font-mono text-zinc-500 text-center py-12">
                                    Tu carrito está vacío. Agrega productos de cualquiera de las tres líneas.
                                </p>
                            ) : (
                                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                    {cart.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs font-mono"
                                        >
                                            <div className="flex-1">
                                                <p className="font-bold text-white text-sm truncate">{item.product.name}</p>
                                                <p className="text-zinc-400 mt-0.5">
                                                    {item.qty} x ${item.product.price.toLocaleString('es-CO')} COP
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="border-t border-white/10 pt-6 space-y-4">
                                <div className="flex items-center justify-between font-mono">
                                    <span className="text-zinc-400 text-sm">Total Estimado:</span>
                                    <span className="text-2xl font-black text-emerald-400">
                                        ${subtotal.toLocaleString('es-CO')} COP
                                    </span>
                                </div>

                                <button
                                    onClick={handleSimulatePayment}
                                    disabled={isCheckingOut}
                                    className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-500 hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)] disabled:opacity-50"
                                >
                                    {isCheckingOut ? (
                                        <span>Procesando pasarela Wompi / Bold...</span>
                                    ) : checkoutDone ? (
                                        <span className="flex items-center gap-2 text-black font-extrabold">
                                            <Check className="w-5 h-5 text-black" /> ¡PAGO EXITOSO!
                                        </span>
                                    ) : (
                                        <>
                                            <CreditCard className="w-4 h-4" />
                                            <span>PROCEDER AL PAGO (PSE / TARJETA / NEQUI)</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
