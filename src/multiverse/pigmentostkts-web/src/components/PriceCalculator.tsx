"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Minus, Plus, ArrowRight } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";

const materials = [
    { id: "white", name: "Vinilo Blanco", pricePerM2: 75000 },
    { id: "transparent", name: "Transparente", pricePerM2: 75000 },
    { id: "holographic", name: "Tornasol/Holográfico", pricePerM2: 80850 },
    { id: "cut", name: "Vinilo de Corte", pricePerM2: 77500 },
];

const sizes = [
    { id: "small", name: "Pequeño", dimensions: "5x5 cm", area: 0.0025 },
    { id: "medium", name: "Mediano", dimensions: "10x10 cm", area: 0.01 },
    { id: "large", name: "Grande", dimensions: "15x15 cm", area: 0.0225 },
    { id: "xlarge", name: "Extra Grande", dimensions: "20x20 cm", area: 0.04 },
];

export default function PriceCalculator() {
    const [material, setMaterial] = useState(materials[0]);
    const [size, setSize] = useState(sizes[1]);
    const [quantity, setQuantity] = useState(50);

    const price = useMemo(() => {
        const basePrice = material.pricePerM2 * size.area * quantity;
        // Aplicar descuentos por cantidad
        let discount = 0;
        if (quantity >= 500) discount = 0.20;
        else if (quantity >= 100) discount = 0.10;
        else if (quantity >= 50) discount = 0.05;

        const finalPrice = basePrice * (1 - discount);
        const pricePerUnit = finalPrice / quantity;

        return { total: Math.round(finalPrice), perUnit: Math.round(pricePerUnit), discount: discount * 100 };
    }, [material, size, quantity]);

    const adjustQuantity = (delta: number) => {
        setQuantity(prev => Math.max(10, Math.min(1000, prev + delta)));
    };

    return (
        <section className="py-24 bg-brand-black">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-4 py-2 rounded-full mb-6">
                        <Calculator className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">Cotizador Rápido</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">CALCULA TU PRECIO</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Obtén un estimado instantáneo. Precios de referencia Speedlight Club.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10"
                    >
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Material Selection */}
                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
                                    Material
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {materials.map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setMaterial(m)}
                                            className={`p-4 rounded-xl text-left transition-all ${material.id === m.id
                                                ? "bg-brand-yellow text-black"
                                                : "bg-white/5 text-white hover:bg-white/10"
                                                }`}
                                        >
                                            <span className="font-bold block">{m.name}</span>
                                            <span className="text-sm opacity-70">${m.pricePerM2.toLocaleString()}/m²</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
                                    Tamaño
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {sizes.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setSize(s)}
                                            className={`p-4 rounded-xl text-left transition-all ${size.id === s.id
                                                ? "bg-brand-yellow text-black"
                                                : "bg-white/5 text-white hover:bg-white/10"
                                                }`}
                                        >
                                            <span className="font-bold block">{s.name}</span>
                                            <span className="text-sm opacity-70">{s.dimensions}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-10">
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
                                Cantidad
                            </label>
                            <div className="flex items-center justify-center gap-6 bg-white/5 rounded-2xl p-4">
                                <button
                                    onClick={() => adjustQuantity(-10)}
                                    className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <div className="text-center">
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(10, Math.min(1000, parseInt(e.target.value) || 10)))}
                                        className="w-24 text-4xl font-black text-white text-center bg-transparent border-none focus:outline-none"
                                    />
                                    <span className="block text-sm text-gray-500">unidades</span>
                                </div>
                                <button
                                    onClick={() => adjustQuantity(10)}
                                    className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Price Display */}
                        <div className="bg-gradient-to-r from-brand-yellow/20 to-yellow-500/10 rounded-2xl p-8 border border-brand-yellow/30">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    {price.discount > 0 && (
                                        <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                                            {price.discount}% DESCUENTO APLICADO
                                        </span>
                                    )}
                                    <div className="text-gray-400 text-sm mb-1">Precio estimado</div>
                                    <div className="text-5xl md:text-6xl font-black text-white">
                                        ${price.total.toLocaleString()}
                                        <span className="text-xl text-gray-400 font-normal ml-2">COP</span>
                                    </div>
                                    <div className="text-brand-yellow font-bold mt-2">
                                        ${price.perUnit.toLocaleString()} por unidad
                                    </div>
                                </div>
                                <a
                                    href={`${PIGMENTO_DATA.contact.whatsappUrl}?text=Hola! Quiero cotizar ${quantity} stickers de ${size.dimensions} en ${material.name}`}
                                    target="_blank"
                                    className="bg-brand-yellow hover:bg-white text-black font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-yellow-500/20"
                                >
                                    Confirmar Cotización <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <p className="text-center text-gray-500 text-sm mt-6">
                            * Precios de referencia. El precio final puede variar según el diseño y acabados especiales.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
