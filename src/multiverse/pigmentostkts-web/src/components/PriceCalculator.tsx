"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Check, AlertCircle, Plus, Minus, Shield, CheckCircle2, Palette, Scissors, Sparkles, Briefcase, Zap, Info } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { uploadFiles } from "@/lib/uploadthing";

import { MATERIALS_CONFIG, CUT_TYPES, Material, MaterialPricing } from "@/lib/materials-config";


interface PriceCalculatorProps {
    initialProjectType?: 'printed' | 'cut' | 'cubreplacas' | null;
    initialStep?: number;
    initialHasDesign?: boolean | null;
}

export default function PriceCalculator({
    initialProjectType = null,
    initialStep = 0,
    initialHasDesign = null
}: PriceCalculatorProps = {}) {
    const { addItem, toggleCart } = useCart();

    // States
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [hasDesign, setHasDesign] = useState<boolean | null>(initialHasDesign);
    const [projectType, setProjectType] = useState<'printed' | 'cut' | 'cubreplacas' | null>(initialProjectType);
    const [designDescription, setDesignDescription] = useState("");
    const [designTier, setDesignTier] = useState<'sticker' | 'vector' | 'logo_basic' | 'logo_pro'>('sticker');

    // Cubreplacas States
    const [cubreplacasVehicle, setCubreplacasVehicle] = useState<'carro' | 'moto'>('moto');
    const [cubreplacasBase, setCubreplacasBase] = useState<'negro' | 'ppf' | 'fibra' | 'especial' | 'impreso'>('negro');
    const [cubreplacasFinish, setCubreplacasFinish] = useState<'brillante' | 'mate'>('mate');
    const [cubreplacasColor, setCubreplacasColor] = useState('#ff0000');
    const [includeHelmetSticker, setIncludeHelmetSticker] = useState(false);
    const [cubreplacasQuantity, setCubreplacasQuantity] = useState(1);

    // Sticker States
    const [material, setMaterial] = useState(MATERIALS_CONFIG[0]);
    const [materialWidth, setMaterialWidth] = useState<number>(50);
    const [laminate, setLaminate] = useState<'brillante' | 'mate' | null>('brillante');
    const [cutType, setCutType] = useState(CUT_TYPES[0]);
    const [widthCm, setWidthCm] = useState(5);
    const [heightCm, setHeightCm] = useState(5);
    const [sheetQuantity, setSheetQuantity] = useState(1);

    // Upload & Feedback
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    // Calculated Results
    const [stickersPerSheet, setStickersPerSheet] = useState(0);
    const [totalStickers, setTotalStickers] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [volumeDiscountPct, setVolumeDiscountPct] = useState(0);
    const [volumeDiscountedPrice, setVolumeDiscountedPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    // Hash & Step Scroll Logic
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === '#cubreplacas') {
                setProjectType('cubreplacas');
                const calculatorSection = document.getElementById('cotizador');
                if (calculatorSection) {
                    calculatorSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (window.location.hash === '#cotizar-diseno') {
                setHasDesign(false); // Mode: No Design (Service)
                setProjectType(null);
                const calculatorSection = document.getElementById('cotizador');
                if (calculatorSection) {
                    calculatorSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (window.location.hash.startsWith('#design-')) {
                const tier = window.location.hash.replace('#design-', '') as 'sticker' | 'vector' | 'logo_basic' | 'logo_pro';
                if (['sticker', 'vector', 'logo_basic', 'logo_pro'].includes(tier)) {
                    setHasDesign(false);
                    setProjectType(null);
                    setDesignTier(tier);
                    setCurrentStep(0);
                    const calculatorSection = document.getElementById('cotizador');
                    if (calculatorSection) {
                        calculatorSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } else if (window.location.hash === '#calculator' || window.location.hash === '#cotizador') {
                // Reset to initial state for generic links
                setHasDesign(null);
                setProjectType(null);
                setCurrentStep(0);
                const calculatorSection = document.getElementById('cotizador');
                if (calculatorSection) {
                    calculatorSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        // Note: Section positioning is handled by useFullPageScroll hook.
        // No internal auto-scroll needed here.

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Enforce min size when cut type changes
    useEffect(() => {
        const minSize = cutType.id === 'sc' ? 2 : 3;
        if (widthCm < minSize) setWidthCm(minSize);
        if (heightCm < minSize) setHeightCm(minSize);
    }, [cutType]);

    // Update default width when material changes
    useEffect(() => {
        if (material.hasWidthOptions && material.alternativeSheetSize) {
            setMaterialWidth(material.alternativeSheetSize.width);
        }
    }, [material]);

    // Price Calculation
    useEffect(() => {
        if (projectType === 'cubreplacas') {
            let unitPrice = 55000;
            if (cubreplacasQuantity >= 12) unitPrice = 15000;
            else if (cubreplacasQuantity >= 10) unitPrice = 25000;
            else if (cubreplacasQuantity >= 6) unitPrice = 35000;
            else if (cubreplacasQuantity >= 3) unitPrice = 45000;

            let extraSurcharges = 0;
            if (cubreplacasBase === 'ppf') extraSurcharges += 40000;
            if (cubreplacasBase === 'fibra') extraSurcharges += 20000;
            if (includeHelmetSticker) extraSurcharges += 10000;

            const finalUnitPrice = unitPrice + extraSurcharges;
            const calculatedTotal = finalUnitPrice * cubreplacasQuantity;

            setTotalPrice(55000 * cubreplacasQuantity); // Base reference for "normal" price
            setDiscountedPrice(calculatedTotal);
            setVolumeDiscountedPrice(calculatedTotal);
            setVolumeDiscountPct((55000 * cubreplacasQuantity - calculatedTotal) / (55000 * cubreplacasQuantity));

            setTotalStickers(cubreplacasQuantity);
            setStickersPerSheet(0);
            return;
        }

        const activeSheetSize = (material.hasWidthOptions && materialWidth === material.alternativeSheetSize?.width && material.alternativeSheetSize)
            ? material.alternativeSheetSize
            : material.sheetSize;

        const safeSheetWidth = activeSheetSize.width - 2;
        const safeSheetHeight = activeSheetSize.height - 2;
        const stickerFullWidth = widthCm + 0.5;
        const stickerFullHeight = heightCm + 0.5;

        // Normal layout
        const countNormal = Math.max(0, Math.floor(safeSheetWidth / stickerFullWidth) * Math.floor(safeSheetHeight / stickerFullHeight));
        // Rotated layout
        const countRotated = Math.max(0, Math.floor(safeSheetWidth / stickerFullHeight) * Math.floor(safeSheetHeight / stickerFullWidth));
        const bestCount = Math.max(countNormal, countRotated);

        setStickersPerSheet(bestCount);
        setTotalStickers(bestCount * sheetQuantity);

        let pricePerSheet = 0;
        const isAltSize = material.hasWidthOptions && materialWidth === material.alternativeSheetSize?.width;
        const p = material.pricing;

        if (cutType.id === 'hybrid') {
            pricePerSheet = isAltSize ? (p.hybrid_laminate_alt || 149900) : (p.hybrid_laminate || p.cc_laminate);
        } else if (cutType.id === 'sc') {
            pricePerSheet = isAltSize ? (p.sc_laminate_alt || 149900) : p.sc_laminate;
        } else {
            pricePerSheet = isAltSize ? (p.cc_laminate_alt || 149900) : p.cc_laminate;
        }

        const calculatedPrice = pricePerSheet * sheetQuantity;
        setTotalPrice(calculatedPrice);

        let vDiscount = 0;
        if (sheetQuantity >= 50) vDiscount = 0.30;
        else if (sheetQuantity >= 20) vDiscount = 0.20;
        else if (sheetQuantity >= 10) vDiscount = 0.10;
        else if (sheetQuantity >= 5) vDiscount = 0.05;

        setVolumeDiscountPct(vDiscount);
        const vPrice = Math.round(calculatedPrice * (1 - vDiscount));
        setVolumeDiscountedPrice(vPrice);
        setDiscountedPrice(vPrice);
    }, [widthCm, heightCm, sheetQuantity, material, materialWidth, cutType, laminate, projectType, cubreplacasBase, cubreplacasFinish, includeHelmetSticker, cubreplacasQuantity]);

    // Initial Screen (Step 0)
    if (currentStep === 0) {
        return (
            <section id="cotizador" className="w-full h-full relative flex flex-col justify-center items-center bg-transparent overflow-hidden px-4">
                {/* Background moved to parent page */}

                <div className="w-full max-w-5xl relative z-10 flex flex-col h-full justify-center max-h-[90dvh]">
                    <div className="text-center mb-4 md:mb-8 shrink-0">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
                            Empecemos tu Cotización
                        </h2>
                        <div className="h-1 w-16 bg-brand-yellow mx-auto rounded-full shadow-[0_0_10px_rgba(230,194,0,0.5)]" />
                    </div>

                    <div className="bg-[#1a1a1a]/90 backdrop-blur-xl rounded-[2rem] border border-white/5 p-4 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative flex flex-col justify-center overflow-auto max-h-full shrink-1">
                        <div className="space-y-4 flex-grow flex flex-col justify-center">
                            {hasDesign === null && (
                                <div className="text-center space-y-4 sm:space-y-8">
                                    <h3 className="text-white font-bold text-lg sm:text-3xl">¿Tienes el diseño listo?</h3>
                                    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-w-2xl mx-auto w-full">
                                        <button onClick={() => setHasDesign(true)} className="p-4 sm:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow transition-all group aspect-square flex flex-col items-center justify-center w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)]">
                                            <Check className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-white group-hover:text-brand-yellow" />
                                            <span className="text-white font-black text-xs sm:text-2xl block">SÍ, LO TENGO</span>
                                        </button>
                                        <button onClick={() => setHasDesign(false)} className="p-4 sm:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500 transition-all group aspect-square flex flex-col items-center justify-center w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)]">
                                            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-white group-hover:text-blue-500" />
                                            <span className="text-white font-black text-xs sm:text-2xl block">NO LO TENGO</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {hasDesign === false && (
                                <div className="space-y-2 animate-in fade-in zoom-in duration-300 w-full">
                                    <div className="text-center space-y-1">
                                        <h3 className="text-white font-bold text-xl sm:text-2xl">Estudio de Diseño</h3>
                                        <p className="text-gray-400 text-xs max-w-lg mx-auto">
                                            Elige el nivel de intervención que necesita tu marca.
                                        </p>
                                    </div>

                                    {/* Design Tiers */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-5xl mx-auto">
                                        {/* Tier 1: Idea (Sticker) */}
                                        <button
                                            onClick={() => setDesignTier('sticker')}
                                            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group h-full flex flex-col justify-between ${designTier === 'sticker' ? 'border-pink-500 bg-pink-500/10 ring-1 ring-pink-500' : 'border-white/10 bg-white/5 hover:border-pink-500/30'}`}
                                        >
                                            <div className="relative z-10 w-full">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className={`p-1.5 rounded-lg ${designTier === 'sticker' ? 'bg-pink-500 text-white' : 'bg-white/10 text-white'}`}>
                                                        <Sparkles size={14} />
                                                    </div>
                                                    <span className="text-xs font-black text-pink-400">$35k</span>
                                                </div>
                                                <h4 className="text-white font-bold text-xs mb-1 line-clamp-1">Sticker</h4>
                                                <p className="text-gray-400 text-[9px] leading-tight line-clamp-2">
                                                    Ideas simples. Personajes, frases.
                                                </p>
                                            </div>
                                        </button>

                                        {/* Tier 2: Vector (Fix) */}
                                        <button
                                            onClick={() => setDesignTier('vector')}
                                            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group h-full flex flex-col justify-between ${designTier === 'vector' ? 'border-brand-yellow bg-brand-yellow/10 ring-1 ring-brand-yellow' : 'border-white/10 bg-white/5 hover:border-brand-yellow/30'}`}
                                        >
                                            <div className="relative z-10 w-full">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className={`p-1.5 rounded-lg ${designTier === 'vector' ? 'bg-brand-yellow text-black' : 'bg-white/10 text-white'}`}>
                                                        <Scissors size={14} />
                                                    </div>
                                                    <span className="text-xs font-black text-brand-yellow">$75k</span>
                                                </div>
                                                <h4 className="text-white font-bold text-xs mb-1 line-clamp-1">Vectorizar</h4>
                                                <p className="text-gray-400 text-[9px] leading-tight line-clamp-2">
                                                    Digitalizar bocetos o logos.
                                                </p>
                                            </div>
                                        </button>

                                        {/* Tier 3: Logo Basic */}
                                        <button
                                            onClick={() => setDesignTier('logo_basic')}
                                            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group h-full flex flex-col justify-between ${designTier === 'logo_basic' ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500' : 'border-white/10 bg-white/5 hover:border-blue-500/30'}`}
                                        >
                                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg">PYME</div>
                                            <div className="relative z-10 w-full">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className={`p-1.5 rounded-lg ${designTier === 'logo_basic' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white'}`}>
                                                        <Zap size={14} />
                                                    </div>
                                                    <span className="text-xs font-black text-blue-400">$250k</span>
                                                </div>
                                                <h4 className="text-white font-bold text-xs mb-1 line-clamp-1">Logo Sencillo</h4>
                                                <p className="text-gray-400 text-[9px] leading-tight line-clamp-2">
                                                    Propuesta tipográfica simple.
                                                </p>
                                            </div>
                                        </button>

                                        {/* Tier 4: Logo Pro */}
                                        <button
                                            onClick={() => setDesignTier('logo_pro')}
                                            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group h-full flex flex-col justify-between ${designTier === 'logo_pro' ? 'border-purple-600 bg-purple-600/10 ring-1 ring-purple-600' : 'border-white/10 bg-white/5 hover:border-purple-600/30'}`}
                                        >
                                            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg">EMPRESA</div>
                                            <div className="relative z-10 w-full">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className={`p-1.5 rounded-lg ${designTier === 'logo_pro' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white'}`}>
                                                        <Briefcase size={14} />
                                                    </div>
                                                    <span className="text-xs font-black text-purple-400">$650k</span>
                                                </div>
                                                <h4 className="text-white font-bold text-xs mb-1 line-clamp-1">Logo Pro</h4>
                                                <p className="text-gray-400 text-[9px] leading-tight line-clamp-2">
                                                    Identidad visual completa.
                                                </p>
                                            </div>
                                        </button>
                                    </div>

                                    <div className="max-w-2xl mx-auto mt-2 bg-white/5 p-3 rounded-2xl border border-white/5 animate-in slide-in-from-bottom-4 duration-500">

                                        {/* Features List */}
                                        <div className="mb-3 bg-black/30 p-3 rounded-lg border border-white/5">
                                            <h5 className="text-white font-bold text-xs mb-2 flex items-center">
                                                <Info size={14} className="mr-1.5 text-brand-yellow" />
                                                Lo que incluye:
                                            </h5>
                                            <ul className="space-y-1.5">
                                                {designTier === 'sticker' && (
                                                    <>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-pink-500 shrink-0" /> Diseño de 1 personaje/frase.</li>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-pink-500 shrink-0" /> Estilo caricatura/texto.</li>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-pink-500 shrink-0" /> Entrega PNG HR (No vector).</li>
                                                    </>
                                                )}
                                                {designTier === 'vector' && (
                                                    <>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-brand-yellow shrink-0" /> Redibujado manual (No auto).</li>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-brand-yellow shrink-0" /> Ajuste color Impresión.</li>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-brand-yellow shrink-0" /> Editable (.AI / .PDF).</li>
                                                    </>
                                                )}
                                                {designTier === 'logo_basic' && (
                                                    <>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-blue-400 shrink-0" /> 2 Propuestas de diseño.</li>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-blue-400 shrink-0" /> Concepto Único.</li>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-blue-400 shrink-0" /> Vectores + PNG.</li>
                                                    </>
                                                )}
                                                {designTier === 'logo_pro' && (
                                                    <>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-purple-400 shrink-0" /> Logo Maestro + Variantes.</li>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-purple-400 shrink-0" /> 3 Visualizaciones (Mockups).</li>
                                                        <li className="text-[10px] text-gray-300 flex items-start"><Check size={12} className="mr-1.5 mt-0.5 text-purple-400 shrink-0" /> Kit Completo y Editables.</li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="text-left space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                                {designTier === 'sticker' ? 'Describe tu idea' :
                                                    designTier === 'vector' ? 'Instrucciones' :
                                                        'Nombre y Rubro'}
                                            </label>
                                            <textarea
                                                value={designDescription}
                                                onChange={(e) => setDesignDescription(e.target.value)}
                                                placeholder={
                                                    designTier === 'sticker' ? "Ej: Quiero un gato gordo comiendo pizza, estilo cartoon..." :
                                                        designTier === 'vector' ? "Ej: Redibujar este logo, cambiar el rojo por azul..." :
                                                            "Ej: 'Burger King', venta de hamburguesas. Queremos vernos premium y rústicos..."
                                                }
                                                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 min-h-[60px] resize-none text-xs transition-all"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 mt-3">
                                            <Button
                                                onClick={() => {
                                                    let price = 55000;
                                                    let name = "Vectorización";
                                                    let desc = "Ajuste técnico";
                                                    let features: string[] = [];

                                                    if (designTier === 'sticker') {
                                                        price = 35000;
                                                        name = "Diseño de Sticker (Idea Simple)";
                                                        desc = designDescription || "Diseño de personaje o idea simple";
                                                        features = ["1 Personaje/Frase", "Entrega PNG", "Uso Personal"];
                                                    } else if (designTier === 'vector') {
                                                        price = 75000;
                                                        name = "Servicio de Vectorización / Arreglo";
                                                        desc = designDescription || "Vectorización técnica de logo/imagen";
                                                        features = ["Redibujado Manual", "Vectores .AI/.PDF", "Ajuste Color"];
                                                    } else if (designTier === 'logo_basic') {
                                                        price = 250000;
                                                        name = "Diseño de Logo Sencillo";
                                                        desc = designDescription || "Propuesta de logo simple para emprendimiento";
                                                        features = ["2 Propuestas", "Concepto Único", "Vectores + PNG"];
                                                    } else if (designTier === 'logo_pro') {
                                                        price = 650000;
                                                        name = "Diseño de Logo Empresarial";
                                                        desc = designDescription || "Identidad Corporativa Completa";
                                                        features = ["Logo Maestro + Variantes", "3 Visualizaciones", "Kit Completo (BN/Neg/Pos)"];
                                                    }

                                                    addItem({
                                                        id: 900000 + price,
                                                        name: name,
                                                        price: price,
                                                        displayPrice: `$${price.toLocaleString()}`,
                                                        image: "/project-types/printed-stickers.png",
                                                        category: "Servicios",
                                                        description: desc,
                                                        features: features,
                                                    });
                                                    toggleCart();
                                                }}
                                                className={`w-full text-white h-10 text-xs sm:text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-lg 
                                                    ${designTier === 'logo_pro' ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20' :
                                                        designTier === 'logo_basic' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' :
                                                            designTier === 'sticker' ? 'bg-pink-600 hover:bg-pink-500 shadow-pink-500/20' :
                                                                'bg-brand-yellow text-black hover:bg-white shadow-brand-yellow/20'}`}
                                            >
                                                {designTier === 'logo_pro' ? `CONTRATAR - $${(650000).toLocaleString()}` :
                                                    designTier === 'logo_basic' ? `CONTRATAR - $${(250000).toLocaleString()}` :
                                                        designTier === 'sticker' ? `CONTRATAR - $${(35000).toLocaleString()}` :
                                                            `AGREGAR - $${(75000).toLocaleString()}`} <Plus className="ml-2 w-4 h-4" />
                                            </Button>

                                            <button onClick={() => setHasDesign(null)} className="text-gray-500 hover:text-white text-[10px] underline decoration-white/30 underline-offset-4 mx-auto pb-1">
                                                Volver
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {hasDesign === true && !projectType && (
                                <div className="text-center space-y-4">
                                    <h3 className="text-white font-bold text-lg sm:text-2xl">¿Qué buscas hoy?</h3>
                                    <div className="flex flex-wrap justify-center gap-3 sm:grid sm:grid-cols-3 sm:gap-6 max-w-4xl mx-auto w-full">
                                        {[
                                            {
                                                id: 'printed' as const,
                                                name: 'IMPRESOS FULL COLOR',
                                                desc: 'Ilustraciones, fotos, logos',
                                                img: '/project-types/printed-stickers.png',
                                                color: 'from-yellow-600/30 to-yellow-900/70',
                                                border: 'hover:border-brand-yellow',
                                                step: 1
                                            },
                                            {
                                                id: 'cut' as const,
                                                name: 'VINILO DE CORTE',
                                                desc: 'Colores sólidos, troquelados',
                                                img: '/project-types/cut-vinyl.png',
                                                color: 'from-purple-600/30 to-purple-900/70',
                                                border: 'hover:border-purple-500',
                                                step: null
                                            },
                                            {
                                                id: 'cubreplacas' as const,
                                                name: 'CUBREPLACAS PREMIUM',
                                                desc: 'Protección y estilo',
                                                img: '/project-types/cubreplacas.png',
                                                color: 'from-red-600/30 to-red-900/70',
                                                border: 'hover:border-red-500',
                                                step: 1
                                            }
                                        ].map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    if (option.id === 'cut') {
                                                        setProjectType('cut');
                                                    } else {
                                                        setProjectType(option.id);
                                                        setCurrentStep(option.step!);
                                                    }
                                                }}
                                                className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 ${option.border} transition-all duration-300 group w-[calc(50%-0.5rem)] sm:w-full aspect-square flex flex-col items-center justify-center p-3 sm:p-4`}
                                            >
                                                <img
                                                    src={option.img}
                                                    alt={option.name}
                                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-b ${option.color}`} />
                                                <div className="relative z-10 flex flex-col items-center text-center px-2">
                                                    <span className="text-white font-black text-base sm:text-base tracking-tighter leading-none italic uppercase mb-1">{option.name}</span>
                                                    <span className="text-white/70 text-[11px] sm:text-[10px] font-medium tracking-wide leading-tight">{option.desc}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    {projectType === 'cut' && (
                                        <div className="text-purple-200 bg-purple-500/10 p-4 rounded-lg">
                                            Opción en construcción. Contáctanos por WhatsApp.
                                            <button onClick={() => setProjectType(null)} className="block mt-2 text-xs underline">Volver</button>
                                        </div>
                                    )}
                                    <button onClick={() => setHasDesign(null)} className="text-gray-500 hover:text-white text-sm mt-4">Volver</button>
                                </div>
                            )}
                        </div>
                    </div >
                </div >
            </section >
        );
    }

    const maxSteps = projectType === 'cubreplacas' ? 2 : 3;
    const displayStep = projectType === 'cubreplacas' && currentStep === 3 ? 2 : currentStep;
    const progress = (displayStep / maxSteps) * 100;

    return (
        <section id="cotizador" className="w-full min-h-screen relative flex flex-col bg-transparent">
            <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-8 relative z-10 flex flex-col min-h-full pt-2 md:pt-4 pb-2">
                {/* Progress Bar */}
                <div className="w-full max-w-4xl mx-auto mb-2 shrink-0">
                    <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[10px] font-black text-brand-yellow uppercase tracking-widest italic">Paso {displayStep} de {maxSteps}</span>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="bg-brand-yellow h-full shadow-[0_0_10px_rgba(230,194,0,0.5)]"
                        />
                    </div>
                </div>

                <div className="text-center mb-2 shrink-0">
                    <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter mb-0.5 leading-none">
                        {projectType === 'cubreplacas' ? <>Cotiza tus <span className="text-brand-yellow italic">Cubreplacas</span></> : <>Cotiza tus <span className="text-brand-yellow italic">Stickers</span></>}
                    </h2>
                    <p className="text-gray-400 text-[10px] md:text-xs font-medium max-w-2xl mx-auto uppercase tracking-wider hidden sm:block">
                        Personaliza tu pedido paso a paso para obtener un presupuesto exacto.
                    </p>
                </div>

                <div className={`grid grid-cols-1 ${currentStep === 3 ? 'lg:grid-cols-2 max-w-2xl' : 'lg:grid-cols-4 max-w-7xl'} mx-auto gap-4 items-start flex-grow min-h-0 pb-6 w-full`}>
                    {/* Main Content Area */}
                    <div className={`${(!projectType || (projectType !== 'cubreplacas' && currentStep < 2)) ? 'lg:col-span-4' : (currentStep === 3 ? '' : 'lg:col-span-3')} order-1 h-auto flex flex-col`}>
                        <div className="bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-5 rounded-[2rem] border border-white/10 shadow-2xl relative h-auto">
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                                        <h3 className="text-white font-black text-lg md:text-xl mb-2 tracking-tight uppercase italic">{projectType === 'cubreplacas' ? 'Fondo del Cubreplacas' : 'Tipo de Corte'}</h3>

                                        {projectType === 'cubreplacas' ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                                                {/* Column 1: Preview */}
                                                <div className="lg:sticky lg:top-0">
                                                    <div
                                                        className="w-full aspect-square relative rounded-2xl overflow-hidden border border-brand-yellow/20 shadow-2xl cursor-crosshair group"
                                                        onMouseMove={(e) => {
                                                            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                                                            const x = ((e.clientX - left) / width) * 100;
                                                            const y = ((e.clientY - top) / height) * 100;
                                                            const img = e.currentTarget.querySelector('img');
                                                            if (img) img.style.transformOrigin = `${x}% ${y}%`;
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            const img = e.currentTarget.querySelector('img');
                                                            if (img) img.style.transformOrigin = 'center';
                                                        }}
                                                    >
                                                        <img
                                                            src="/project-types/cubreplacas.png"
                                                            alt="Cubreplacas Premium"
                                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[2.5]"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none group-hover:opacity-40 transition-opacity duration-300" />

                                                        {/* Overlaid Info */}
                                                        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2 transition-opacity duration-300 group-hover:opacity-20 pointer-events-none text-left">
                                                            <div>
                                                                <p className="text-brand-yellow text-[9px] font-black uppercase tracking-widest mb-0.5 drop-shadow-md">Edición Boutique</p>
                                                                <h3 className="text-white text-lg font-black leading-none drop-shadow-lg italic uppercase">Protección y Estilo</h3>
                                                            </div>
                                                            <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-lg">
                                                                <p className="text-white text-[10px] font-bold mb-1.5 flex items-center gap-2"><Info size={12} className="text-brand-yellow" /> Tu Kit Incluye:</p>
                                                                <div className="space-y-1">
                                                                    <p className="text-gray-200 text-[9px] leading-tight flex items-start"><Check className="w-3 h-3 text-brand-yellow mr-1.5 shrink-0" /> Par de cubreplacas (Delantera y Trasera)</p>
                                                                    <p className="text-gray-200 text-[9px] leading-tight flex items-start"><Check className="w-3 h-3 text-brand-yellow mr-1.5 shrink-0" /> Set de microganchitos de instalación</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Column 2: Vehicle & Quantity */}
                                                <div className="space-y-4">
                                                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                                                        <h4 className="text-white font-black text-[10px] uppercase tracking-tighter mb-2 opacity-50 italic">Vehículo</h4>
                                                        <div className="flex bg-black/40 p-1.5 rounded-lg border border-white/10 w-full">
                                                            <button
                                                                onClick={() => setCubreplacasVehicle('moto')}
                                                                className={`flex-1 py-1.5 text-[10px] font-black tracking-widest rounded-md transition-all ${cubreplacasVehicle === 'moto' ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/20' : 'text-gray-500 hover:text-white'}`}
                                                            >
                                                                MOTO
                                                            </button>
                                                            <button
                                                                onClick={() => setCubreplacasVehicle('carro')}
                                                                className={`flex-1 py-1.5 text-[10px] font-black tracking-widest rounded-md transition-all ${cubreplacasVehicle === 'carro' ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/20' : 'text-gray-500 hover:text-white'}`}
                                                            >
                                                                CARRO
                                                            </button>
                                                        </div>

                                                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 pt-3 border-t border-white/10">
                                                            <span className="opacity-60 uppercase text-[9px]">Std Size:</span>
                                                            <span className="text-brand-yellow/80">{cubreplacasVehicle === 'moto' ? '23.5 x 10.5 cm' : '33 x 16 cm'}</span>
                                                        </div>

                                                        {cubreplacasVehicle === 'moto' && (
                                                            <div className="bg-brand-yellow/5 border border-brand-yellow/20 p-2.5 rounded-xl flex items-center gap-3 mt-1 hover:bg-brand-yellow/10 transition-colors cursor-pointer" onClick={() => setIncludeHelmetSticker(!includeHelmetSticker)}>
                                                                <div className="relative flex items-center h-5">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="helmet-sticker-mini"
                                                                        checked={includeHelmetSticker}
                                                                        onChange={(e) => setIncludeHelmetSticker(e.target.checked)}
                                                                        className="w-4 h-4 rounded text-brand-yellow focus:ring-brand-yellow bg-black/50 cursor-pointer border-white/20"
                                                                    />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <label htmlFor="helmet-sticker-mini" className="text-white font-black text-[11px] cursor-pointer block leading-none mb-0.5">
                                                                        STEICKER CASCO <span className="text-brand-yellow/80 ml-1">+$10k</span>
                                                                    </label>
                                                                    <p className="text-gray-500 text-[8px] leading-tight uppercase font-bold opacity-60">Norma Arial / Reflectivo</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                                                        <h4 className="text-white font-black text-[10px] uppercase tracking-tighter opacity-50 italic">Cantidad</h4>
                                                        <div className="flex items-center justify-between gap-3 bg-black/40 p-1.5 rounded-lg border border-white/10 w-full">
                                                            <button onClick={() => setCubreplacasQuantity(Math.max(1, cubreplacasQuantity - 1))} className="text-white bg-white/5 hover:bg-brand-yellow hover:text-black w-9 h-9 rounded-lg flex items-center justify-center font-black transition-all text-lg border border-white/5">-</button>
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-white font-black text-xl leading-none">{cubreplacasQuantity}</span>
                                                                <span className="text-gray-500 text-[8px] font-black uppercase mt-0.5 tracking-widest opacity-60">Kits</span>
                                                            </div>
                                                            <button onClick={() => setCubreplacasQuantity(cubreplacasQuantity + 1)} className="text-white bg-white/5 hover:bg-brand-yellow hover:text-black w-9 h-9 rounded-lg flex items-center justify-center font-black transition-all text-lg border border-white/5">+</button>
                                                        </div>
                                                        <div className="bg-brand-yellow/5 border border-brand-yellow/15 p-2 rounded-lg">
                                                            <p className="text-brand-yellow text-[9px] text-center font-black uppercase tracking-tight">
                                                                {cubreplacasQuantity >= 12 ? '🔥 ¡PRECIO MAYORISTA: $15k / u!' :
                                                                    cubreplacasQuantity >= 10 ? '✨ ¡$25k / u!' :
                                                                        cubreplacasQuantity >= 6 ? '🚀 ¡$35k / u!' :
                                                                            cubreplacasQuantity >= 3 ? '⚡ ¡$45k / u!' :
                                                                                'Lleva 3+ para descuento'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Column 3: Base Selection */}
                                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                                                    <h4 className="text-white font-black text-[10px] uppercase tracking-tighter mb-4 opacity-50 italic">Acabado Base</h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {[
                                                            { id: 'negro', name: 'NEGRO MATE', color: '#1a1a1a', extra: 0 },
                                                            { id: 'ppf', name: 'PPF GLOSS', color: '#000000', extra: 40000 },
                                                            { id: 'fibra', name: 'FIBRA 3D', color: '#2a2a2a', extra: 20000 },
                                                            { id: 'impreso', name: 'FULL COLOR', color: '#ffffff', extra: 0 },
                                                            { id: 'especial', name: 'ESPECIAL', color: cubreplacasColor, extra: 0 },
                                                        ].map((bg) => (
                                                            <button
                                                                key={bg.id}
                                                                onClick={() => setCubreplacasBase(bg.id as any)}
                                                                className={`p-3 rounded-xl border-2 flex flex-col items-center text-center transition-all duration-300 group/base ${cubreplacasBase === bg.id ? 'border-brand-yellow bg-brand-yellow/10 shadow-[0_0_15px_rgba(230,194,0,0.05)]' : 'border-white/5 bg-black/20 hover:border-white/10'}`}
                                                            >
                                                                <div className="w-9 h-9 rounded-full mb-2 border-2 border-white/10 shadow-lg transition-transform group-hover/base:scale-105" style={{ backgroundColor: bg.id === 'fibra' ? '#111' : bg.color }} />
                                                                <span className="text-white font-black block text-[8px] tracking-tight leading-none mb-1 uppercase">{bg.name}</span>
                                                                {bg.extra > 0 && <span className="text-[8px] font-black text-brand-yellow bg-black/30 px-1.5 py-0.5 rounded border border-brand-yellow/15 mt-1">+$ {(bg.extra / 1000)}k</span>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    {cubreplacasBase === 'especial' && (
                                                        <div className="mt-3 bg-black/40 border border-white/5 p-2 rounded-lg space-y-2 animate-in fade-in slide-in-from-top-1">
                                                            <input type="color" value={cubreplacasColor} onChange={(e) => setCubreplacasColor(e.target.value)} className="w-full h-6 rounded cursor-pointer bg-transparent border-0 p-0" />
                                                            <input type="text" value={cubreplacasColor} onChange={(e) => setCubreplacasColor(e.target.value)} className="w-full bg-transparent text-white font-mono text-[10px] uppercase text-center outline-none" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap justify-center gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                                {CUT_TYPES.map(c => (
                                                    <button
                                                        key={c.id}
                                                        onClick={() => setCutType(c)}
                                                        className={`relative overflow-hidden rounded-[1.25rem] border transition-all duration-300 group w-[calc(50%-0.5rem)] sm:w-full aspect-square sm:aspect-[4/3] flex flex-col items-center justify-end p-3 sm:p-4 pb-4 sm:pb-5 text-center ${cutType.id === c.id ? 'border-brand-yellow ring-2 ring-brand-yellow/20' : 'border-white/10 hover:border-white/30'}`}
                                                    >
                                                        {/* Background Image */}
                                                        <img
                                                            src={c.imageSrc}
                                                            alt={c.name}
                                                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                                                        />
                                                        {/* Gradient Overlay */}
                                                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/30 to-brand-black/80`} />

                                                        {/* Content */}
                                                        <div className="relative z-10 w-full px-2">
                                                            <div className={`w-7 h-7 mx-auto mb-2 rounded-full flex items-center justify-center bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 group-hover:bg-brand-yellow group-hover:text-black transition-colors duration-300`}>
                                                                <CheckCircle2 size={14} />
                                                            </div>
                                                            <span className="text-white font-black text-sm sm:text-[13px] tracking-tighter italic uppercase block leading-tight">{c.name}</span>
                                                            <p className="text-white/60 text-[11px] sm:text-xs leading-snug font-medium tracking-wide mt-1.5">{c.description}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                                        <h3 className="text-white font-bold text-lg mb-4">{projectType === 'cubreplacas' ? 'Acabado' : 'Material'}</h3>

                                        {projectType === 'cubreplacas' ? (
                                            <div className="flex items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10">
                                                <p className="text-gray-400 text-sm italic">Procesando configuración...</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-1 space-y-4">
                                                    {material.hasWidthOptions && (
                                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 bg-white/5 rounded-xl border border-brand-yellow/20 animate-in fade-in slide-in-from-top-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-7 h-7 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                                                                    <Palette size={16} />
                                                                </div>
                                                                <div className="text-left leading-none">
                                                                    <span className="text-white font-bold block text-xs italic">ANCHO DISPONIBLE</span>
                                                                    <span className="text-gray-500 text-[9px]">Elige la medida del material</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex p-0.5 bg-black/40 rounded-lg border border-white/5">
                                                                <button
                                                                    onClick={() => setMaterialWidth(material.alternativeSheetSize?.width || 60)}
                                                                    className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest transition-all ${materialWidth === (material.alternativeSheetSize?.width || 60) ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/20' : 'text-gray-500 hover:text-white'}`}
                                                                >
                                                                    {material.alternativeSheetSize?.width || 60}CM
                                                                </button>
                                                                <button
                                                                    onClick={() => setMaterialWidth(material.sheetSize.width)}
                                                                    className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest transition-all ${materialWidth === material.sheetSize.width ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/20' : 'text-gray-500 hover:text-white'}`}
                                                                >
                                                                    {material.sheetSize.width}CM
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                        {MATERIALS_CONFIG.map(m => (
                                                            <button
                                                                key={m.id}
                                                                onClick={() => setMaterial(m)}
                                                                className={`relative overflow-hidden rounded-[1.25rem] border transition-all duration-300 group w-full aspect-[4/3] sm:aspect-[3/2] flex flex-col items-center justify-end p-2 sm:p-3 pb-3 sm:pb-4 text-center ${material.id === m.id ? 'border-brand-yellow ring-2 ring-brand-yellow/20' : 'border-white/10 hover:border-white/30'}`}
                                                            >
                                                                <img
                                                                    src={m.imageSrc}
                                                                    alt={m.name}
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                                                                />
                                                                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/30 to-brand-black/80`} />
                                                                <div className="relative z-10 w-full px-2">
                                                                    <div className={`w-7 h-7 mx-auto mb-2 rounded-full flex items-center justify-center bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 group-hover:bg-brand-yellow group-hover:text-black transition-colors duration-300`}>
                                                                        <CheckCircle2 size={14} />
                                                                    </div>
                                                                    <span className="text-white font-black text-sm sm:text-[13px] tracking-tighter italic uppercase block leading-tight">{m.name}</span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Large Preview Panel */}
                                                <div className="hidden md:flex w-72 flex-col gap-3 sticky top-0">
                                                    <div
                                                        className="group relative w-full aspect-square rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl cursor-crosshair"
                                                        onMouseMove={(e) => {
                                                            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                                                            const x = ((e.clientX - left) / width) * 100;
                                                            const y = ((e.clientY - top) / height) * 100;
                                                            const img = e.currentTarget.querySelector('img');
                                                            if (img) img.style.transformOrigin = `${x}% ${y}%`;
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            const img = e.currentTarget.querySelector('img');
                                                            if (img) img.style.transformOrigin = 'center';
                                                        }}
                                                    >
                                                        <img
                                                            src={material.imageSrc}
                                                            alt={material.name}
                                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[2]"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-50" />
                                                        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none transition-transform duration-300 group-hover:translate-y-2 group-hover:opacity-0">
                                                            <h4 className="text-white font-black text-xl italic uppercase tracking-tighter leading-tight drop-shadow-md mb-2">{material.name}</h4>
                                                            <p className="text-white/80 text-xs font-medium leading-snug drop-shadow-md">{material.description}</p>
                                                        </div>
                                                        {/* Optional hint on hover */}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                        </div>
                                                    </div>

                                                    {material.hasWidthOptions ? (
                                                        <div className="bg-brand-yellow/10 border border-brand-yellow/30 p-3 rounded-xl flex items-start gap-2 text-brand-yellow animate-in fade-in slide-in-from-bottom-2">
                                                            <Info size={16} className="shrink-0 mt-0.5" />
                                                            <p className="text-[10px] leading-tight font-medium">Este material está disponible en dos anchos. Te recomendamos 120cm para mayor eficiencia, o 60cm si tu diseño encaja mejor en medidas pequeñas.</p>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-start gap-2 text-gray-300 animate-in fade-in slide-in-from-bottom-2">
                                                            <Info size={16} className="shrink-0 mt-0.5" />
                                                            <p className="text-[10px] leading-tight font-medium">Este material tiene un ancho fijo estándar. El sistema calculará la mejor forma de organizar tus stickers en la hoja para aprovechar al máximo el espacio.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
                                        <h3 className="text-white font-bold text-base mb-2">{projectType === 'cubreplacas' ? 'Carga de Logo' : 'Detalles'}</h3>

                                        {projectType === 'cubreplacas' ? (
                                            <div className="space-y-3">
                                                {fileUrl ? (
                                                    <div className="bg-green-500/10 border border-green-500 p-3 rounded-lg flex justify-between items-center">
                                                        <span className="text-white text-xs truncate mr-2">{fileName}</span>
                                                        <button onClick={() => { setFileUrl(null); setFileName(null); }} className="text-red-500 text-[10px] font-bold tracking-wider shrink-0 uppercase">Cambiar</button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {isUploading ? (
                                                            <div className="space-y-1.5">
                                                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                                                    <div className="bg-brand-yellow h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                                                </div>
                                                                <p className="text-gray-400 text-[10px] text-center">{uploadProgress}% subido</p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => {
                                                                    const input = document.createElement('input');
                                                                    input.type = 'file';
                                                                    input.onchange = async (e) => {
                                                                        const file = (e.target as HTMLInputElement).files?.[0];
                                                                        if (file) {
                                                                            setIsUploading(true);
                                                                            setUploadProgress(0);
                                                                            const res = await uploadFiles("stickerUploader", { files: [file], onUploadProgress: ({ progress }) => setUploadProgress(progress) });
                                                                            setFileUrl(res[0].url);
                                                                            setFileName(file.name);
                                                                            setIsUploading(false);
                                                                            setUploadProgress(0);
                                                                        }
                                                                    };
                                                                    input.click();
                                                                }} className="w-full py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                                                                    SUBIR LOGO
                                                                </button>
                                                                <button onClick={() => {
                                                                    setHasDesign(false);
                                                                    setProjectType(null);
                                                                    setCurrentStep(0);
                                                                }} className="text-gray-500 text-[10px] hover:text-white transition-colors underline block mx-auto">No tengo logo, necesito diseño</button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {/* Upload de diseño */}
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                                    <label className="text-white text-[10px] block mb-1">Diseño</label>
                                                    {fileUrl ? (
                                                        <div className="bg-green-500/10 border border-green-500 p-3 rounded-lg flex justify-between items-center">
                                                            <span className="text-white text-xs truncate">{fileName}</span>
                                                            <button onClick={() => { setFileUrl(null); setFileName(null); }} className="text-red-500 text-xs ml-2 shrink-0">Cambiar</button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-1">
                                                            {isUploading ? (
                                                                <div className="space-y-2">
                                                                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                                                                        <div className="bg-brand-yellow h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                                                    </div>
                                                                    <p className="text-gray-400 text-[10px] text-center">{uploadProgress}% subido</p>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <button onClick={() => {
                                                                        const input = document.createElement('input');
                                                                        input.type = 'file';
                                                                        input.onchange = async (e) => {
                                                                            const file = (e.target as HTMLInputElement).files?.[0];
                                                                            if (file) {
                                                                                setIsUploading(true);
                                                                                setUploadProgress(0);
                                                                                const res = await uploadFiles("stickerUploader", { files: [file], onUploadProgress: ({ progress }) => setUploadProgress(progress) });
                                                                                setFileUrl(res[0].url);
                                                                                setFileName(file.name);
                                                                                setIsUploading(false);
                                                                                setUploadProgress(0);
                                                                            }
                                                                        };
                                                                        input.click();
                                                                    }} className="w-full py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 text-xs">
                                                                        SUBIR DISEÑO
                                                                    </button>
                                                                    <button onClick={() => {
                                                                        setHasDesign(false);
                                                                        setProjectType(null);
                                                                        setCurrentStep(0);
                                                                    }} className="text-gray-500 text-[10px] underline block mx-auto">No tengo diseño</button>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                {material.requiresLaminate && (
                                                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                                        <label className="text-white text-[10px] block mb-1">Laminado</label>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => setLaminate('brillante')} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${laminate === 'brillante' ? 'bg-brand-yellow text-black' : 'bg-white/10 text-gray-400 hover:text-white'}`}>
                                                                Brillante
                                                            </button>
                                                            <button onClick={() => setLaminate('mate')} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${laminate === 'mate' ? 'bg-brand-yellow text-black' : 'bg-white/10 text-gray-400 hover:text-white'}`}>
                                                                Mate
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                                    <label className="text-white text-[10px] block mb-1">Medidas (cm) <span className="text-gray-500 font-normal">— mín. {cutType.id === 'sc' ? '2x2' : '3x3'}</span></label>
                                                    <div className="flex gap-3">
                                                        <input type="number" min={cutType.id === 'sc' ? 2 : 3} value={widthCm} onChange={e => setWidthCm(Math.max(cutType.id === 'sc' ? 2 : 3, Number(e.target.value)))} className="bg-black/50 border border-white/20 text-white p-1.5 text-sm rounded w-full" />
                                                        <span className="text-white self-center text-xs">x</span>
                                                        <input type="number" min={cutType.id === 'sc' ? 2 : 3} value={heightCm} onChange={e => setHeightCm(Math.max(cutType.id === 'sc' ? 2 : 3, Number(e.target.value)))} className="bg-black/50 border border-white/20 text-white p-1.5 text-sm rounded w-full" />
                                                    </div>
                                                </div>
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                                    <label className="text-white text-[10px] block mb-1">Cantidad (Hojas)</label>
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => setSheetQuantity(Math.max(1, sheetQuantity - 1))} className="text-white bg-white/10 p-1.5 rounded text-xs">-</button>
                                                        <span className="text-white font-bold text-lg">{sheetQuantity}</span>
                                                        <button onClick={() => setSheetQuantity(sheetQuantity + 1)} className="text-white bg-white/10 p-1.5 rounded text-xs">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}


                            </AnimatePresence>

                            {/* Navigation */}
                            {currentStep > 0 && (
                                <div className="flex justify-between mt-4 pt-3 border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            if (projectType === 'cubreplacas' && currentStep === 3) {
                                                setCurrentStep(1);
                                            } else {
                                                setCurrentStep(Math.max(0, currentStep - 1));
                                            }
                                        }}
                                        className="text-gray-400 hover:text-white flex items-center gap-1.5 text-xs sm:text-sm"
                                    >
                                        <ArrowRight className="rotate-180" size={14} /> Atrás
                                    </button>
                                    {currentStep < 3 && (
                                        <button
                                            onClick={() => {
                                                if (projectType === 'cubreplacas' && currentStep === 1) {
                                                    setCurrentStep(3);
                                                } else {
                                                    setCurrentStep(currentStep + 1);
                                                }
                                            }}
                                            className="bg-white text-black px-4 py-1.5 rounded-lg font-bold hover:bg-gray-200 flex items-center gap-1.5 text-xs sm:text-sm"
                                        >
                                            Siguiente <ArrowRight size={14} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Summary - Only visible after initial selections */}
                    {projectType && (projectType === 'cubreplacas' || currentStep >= 2) && (
                        <div className="lg:col-span-1 h-full order-2">
                            <div className={`bg-zinc-900/50 backdrop-blur-sm p-4 rounded-2xl border border-white/10 h-auto max-h-full ${currentStep !== 3 ? 'sticky top-32' : ''}`}>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white">
                                        <Calculator size={14} />
                                    </div>
                                    <h3 className="text-white font-bold text-sm">Resumen</h3>
                                </div>

                                <div className="space-y-2 text-[11px] text-gray-400">
                                    <div className="flex justify-between">
                                        <span>Proyecto:</span>
                                        <span className="text-white font-bold uppercase">{projectType}</span>
                                    </div>

                                    {projectType === 'cubreplacas' ? (
                                        <>
                                            <div className="flex justify-between">
                                                <span>Base:</span>
                                                <span className="text-white font-bold">{cubreplacasBase}</span>
                                            </div>
                                            {includeHelmetSticker && (
                                                <div className="flex justify-between text-brand-yellow mt-1">
                                                    <span>Sticker Casco:</span>
                                                    <span className="font-bold">Sí</span>
                                                </div>
                                            )}
                                            {cubreplacasQuantity > 1 && (
                                                <div className="flex justify-between text-white mt-1">
                                                    <span>Cantidad:</span>
                                                    <span className="font-bold">{cubreplacasQuantity} kits</span>
                                                </div>
                                            )}
                                            {volumeDiscountPct > 0 && (
                                                <div className="flex justify-between text-green-400 mt-1">
                                                    <span>Descuento por volumen:</span>
                                                    <span className="font-bold">-{Math.round(volumeDiscountPct * 100)}%</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between pt-4 border-t border-white/10">
                                                <span>Total:</span>
                                                <span className="text-brand-yellow font-bold text-lg">${discountedPrice.toLocaleString()}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between">
                                                <span>Material:</span>
                                                <span className={currentStep >= 2 ? "text-white font-bold" : "text-gray-500 italic"}>
                                                    {currentStep >= 2 ? `${material.name} (${materialWidth}x${material.sheetSize.height}cm)` : 'Pendiente'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Corte:</span>
                                                <span className={currentStep >= 1 ? "text-white font-bold" : "text-gray-500 italic"}>
                                                    {currentStep >= 1 ? cutType.name : 'Pendiente'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Acabado:</span>
                                                <span className={currentStep >= 3 ? "text-white font-bold" : "text-gray-500 italic"}>
                                                    {currentStep >= 3 ? (material.requiresLaminate ? (laminate === 'brillante' ? 'Brillante' : 'Mate') : 'Incluido') : 'Pendiente'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Medidas:</span>
                                                <span className={currentStep >= 3 ? "text-white font-bold" : "text-gray-500 italic"}>
                                                    {currentStep >= 3 ? `${widthCm} x ${heightCm} cm` : 'Pendiente'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Cantidad:</span>
                                                <span className={currentStep >= 3 ? "text-white font-bold" : "text-gray-500 italic"}>
                                                    {currentStep >= 3 ? `${sheetQuantity} hojas` : 'Pendiente'}
                                                </span>
                                            </div>
                                            {currentStep >= 3 && (
                                                <div className="flex justify-between">
                                                    <span>Stickers (aprox.):</span>
                                                    <span className="text-white font-bold">~{totalStickers}</span>
                                                </div>
                                            )}
                                            {currentStep >= 2 && (
                                                <div className="flex justify-between pt-4 border-t border-white/10 mt-2">
                                                    <span className="text-xs uppercase font-bold tracking-widest text-gray-500">Total aprox:</span>
                                                    <span className="text-brand-yellow font-black text-xl">${discountedPrice.toLocaleString()}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                {currentStep >= 3 && (
                                    <Button onClick={() => {
                                        let featuresPayload = projectType === 'cubreplacas'
                                            ? [`Base: ${cubreplacasBase}`]
                                            : [`Material: ${material.name}`, `Corte: ${cutType.name}`];

                                        if (projectType === 'cubreplacas') {
                                            if (includeHelmetSticker) {
                                                featuresPayload.push('Incluye Sticker Reflectivo Casco');
                                            }
                                            if (cubreplacasQuantity > 1) {
                                                featuresPayload.push(`Cantidad: ${cubreplacasQuantity} kits (Precio total con descuento)`);
                                            }
                                        }

                                        addItem({
                                            id: Date.now(),
                                            name: projectType === 'cubreplacas' ? (cubreplacasQuantity > 1 ? `Cubreplacas Custom (x${cubreplacasQuantity})` : 'Cubreplacas Custom') : `${material.name} (${materialWidth}x${material.sheetSize.height}cm)`,
                                            price: discountedPrice,
                                            displayPrice: discountedPrice.toLocaleString(),
                                            image: projectType === 'cubreplacas' ? '/brand/logo.png' : material.imageSrc,
                                            category: projectType === 'cubreplacas' ? 'Cubreplacas' : 'Stickers',
                                            description: projectType === 'cubreplacas' ? `${cubreplacasBase}` : `${cutType.name} | ${widthCm}x${heightCm}cm | ${sheetQuantity} hojas`,
                                            features: featuresPayload,
                                            fileUrl: fileUrl || undefined
                                        });
                                        if (toggleCart) toggleCart();
                                    }} className="w-full mt-4 bg-brand-yellow text-black font-bold h-10 text-sm hover:bg-yellow-400 transition-colors">
                                        AGREGAR AL CARRITO
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section >
    );
}
