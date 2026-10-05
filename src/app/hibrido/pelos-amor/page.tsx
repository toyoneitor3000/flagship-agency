'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModelViewer3D } from '@/components/hibrido/ModelViewer3D';
import { Heart, Sparkles, ShoppingBag, ShieldCheck, RefreshCw, Star, Check } from 'lucide-react';

export default function PelosAmorPage() {
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
                <Link href="/hibrido" className="hover:text-white transition-colors">HÍBRIDO</Link>
                <span>/</span>
                <span className="text-purple-400 font-bold">- PELOS + AMOR</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* 3D Visualizer Column */}
                <div className="lg:col-span-7 space-y-4">
                    <ModelViewer3D
                        productName="El Gomunator • Pro Edition"
                        accentColor="#8b5cf6"
                    />
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 flex items-center justify-between">
                        <span>💡 Haz clic y arrastra para rotar en 360°. Usa scroll para zoom.</span>
                        <span className="text-purple-400 font-bold">Shader WebGL Activo</span>
                    </div>
                </div>

                {/* Product Info & Purchase Column */}
                <div className="lg:col-span-5 space-y-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono mb-3">
                            <Heart className="w-3 h-3 text-pink-400" />
                            <span>Línea Oficial: - pelos + amor</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
                            El Gomunator
                        </h1>
                        <p className="text-sm font-mono text-zinc-400 mt-2">
                            El eliminador definitivo de pelos y pelusas con adherencia estática permanente.
                        </p>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                        </div>
                        <span className="text-xs font-mono text-zinc-300 font-bold">5.0 (148 reseñas verificadas)</span>
                    </div>

                    {/* Pricing */}
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-baseline justify-between">
                        <div>
                            <span className="text-3xl font-black font-mono text-white">$65.000 COP</span>
                            <span className="text-xs text-zinc-500 line-through ml-2 font-mono">$85.000 COP</span>
                        </div>
                        <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-1 rounded-md font-bold">
                            AHORRA 23%
                        </span>
                    </div>

                    {/* Features Bullet List */}
                    <div className="space-y-3 border-y border-white/10 py-6 text-sm text-zinc-300 font-mono">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <span><strong>Polímero lavable:</strong> Se reactiva con agua fría y jabón suave. Secado en 2 minutos.</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <RefreshCw className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                            <span><strong>Sostenibilidad radical:</strong> Reemplaza más de 200 rollos de papel adhesivo desechable.</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                            <span><strong>Superficies:</strong> Muebles, ropa oscura, tapicería automotriz, sábanas y camas de mascotas.</span>
                        </div>
                    </div>

                    {/* Purchase Controls */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-white/20 rounded-full bg-white/5">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                                >
                                    -
                                </button>
                                <span className="font-mono text-sm px-2 font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 py-4 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                                    addedToCart
                                        ? 'bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]'
                                }`}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        <span>¡AÑADIDO AL CARRITO!</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        <span>AÑADIR AL CARRITO</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <Link
                            href="/hibrido/marketplace"
                            className="w-full block text-center py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-zinc-300 transition-colors"
                        >
                            Ver Otros Productos del Laboratorio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
