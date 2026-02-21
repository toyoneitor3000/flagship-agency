"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Check, AlertCircle, Plus, Minus, Shield, CheckCircle2, Palette, Scissors, Sparkles, Briefcase, Zap, Info } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { uploadFiles } from "@/lib/uploadthing";

// Configuración de Materiales
interface MaterialPricing {
    sc_laminate: number;
    cc_laminate: number;
    hybrid_laminate?: number;
    sc_laminate_alt?: number;
    cc_laminate_alt?: number;
    hybrid_laminate_alt?: number;
}

interface Material {
    id: string;
    name: string;
    description: string;
    sheetSize: { width: number; height: number };
    alternativeSheetSize?: { width: number; height: number };
    pricing: MaterialPricing;
    imageSrc: string;
    finishOptions: boolean;
    requiresLaminate: boolean;
    hasWidthOptions?: boolean;
}

const MATERIALS_CONFIG: Material[] = [
    {
        id: 'vinilo-blanco',
        name: 'Vinilo Blanco',
        description: 'El estándar para stickers. Base blanca pura.',
        sheetSize: { width: 100, height: 100 },
        alternativeSheetSize: { width: 50, height: 100 },
        pricing: { sc_laminate: 129900, cc_laminate: 134900, hybrid_laminate: 145000, sc_laminate_alt: 69900, cc_laminate_alt: 74900, hybrid_laminate_alt: 79900 },
        imageSrc: '/materials/blanco-brillante.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'vinilo-transparente',
        name: 'Vinilo Transparente',
        description: 'Fondo invisible. Ideal para vidrio o superficies claras.',
        sheetSize: { width: 100, height: 100 },
        alternativeSheetSize: { width: 50, height: 100 },
        pricing: { sc_laminate: 129900, cc_laminate: 134900, hybrid_laminate: 145000, sc_laminate_alt: 69900, cc_laminate_alt: 74900, hybrid_laminate_alt: 79900 },
        imageSrc: '/materials/transparente-brillante.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'tornasol',
        name: 'Tornasol',
        description: 'Efecto iridiscente que cambia de color según la luz.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 280000, cc_laminate: 290000, hybrid_laminate: 300000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/tornasol.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'metalizado-dorado',
        name: 'Vinilo Metalizado Dorado',
        description: 'Acabado espejo dorado brillante. Lujo y distinción.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 280000, cc_laminate: 290000, hybrid_laminate: 300000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/metalizado-dorado.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'metalizado-plateado-espejo',
        name: 'Vinilo Metalizado Plateado Espejo',
        description: 'Acabado espejo plateado cromado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 280000, cc_laminate: 290000, hybrid_laminate: 300000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/metalizado-cromo.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'plateado-cepillado',
        name: 'Plateado Cepillado Brush',
        description: 'Acabado cepillado con textura metálica.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 280000, cc_laminate: 290000, hybrid_laminate: 300000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/metalizado-brush.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'blanco-holografico',
        name: 'Blanco Holográfico',
        description: 'Base blanca con destellos holográficos. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/blanco-holografico.png',
        finishOptions: false,
        requiresLaminate: false,
        hasWidthOptions: true
    },
    {
        id: 'escarchado',
        name: 'Escarchado (Glitter)',
        description: 'Textura con partículas brillantes. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/escarchado.png',
        finishOptions: false,
        requiresLaminate: false,
        hasWidthOptions: true
    },
    {
        id: 'canvas',
        name: 'Vinilo Canvas',
        description: 'Textura tipo lienzo artístico. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_alt: 149900, cc_laminate_alt: 149900, hybrid_laminate_alt: 149900 },
        imageSrc: '/materials/canvas.png',
        finishOptions: false,
        requiresLaminate: false,
        hasWidthOptions: true
    }
];

const CUT_TYPES = [
    {
        id: 'sc',
        name: 'Semi Corte (SC)',
        description: 'Solo se corta la capa de vinilo, dejando el papel respaldo intacto. Se entregan en planillas (hojas) o rollos.',
        imageSrc: '/cut-types/kiss-cut.png'
    },
    {
        id: 'cc',
        name: 'Corte Completo (CC)',
        description: 'Cada sticker se corta individualmente con la forma exacta del diseño. Ideal para regalar o vender sueltos.',
        imageSrc: '/cut-types/die-cut.png'
    },
    {
        id: 'hybrid',
        name: 'Semicorte + Corte Completo',
        description: 'El sticker tiene un corte superficial para despegar fácil, pero también se corta individualmente el respaldo. Lo mejor de ambos mundos.',
        imageSrc: '/cut-types/die-kiss-cut.png'
    }
];

export default function PriceCalculator() {
    const { addItem, toggleCart } = useCart();

    // States
    const [currentStep, setCurrentStep] = useState(0);
    const [hasDesign, setHasDesign] = useState<boolean | null>(null);
    const [projectType, setProjectType] = useState<'printed' | 'cut' | 'cubreplacas' | null>(null);
    const [designDescription, setDesignDescription] = useState("");
    const [designTier, setDesignTier] = useState<'sticker' | 'vector' | 'logo_basic' | 'logo_pro'>('sticker');

    // Cubreplacas States
    const [cubreplacasBase, setCubreplacasBase] = useState<'negro' | 'ppf' | 'fibra' | 'especial' | 'impreso'>('negro');
    const [cubreplacasFinish, setCubreplacasFinish] = useState<'brillante' | 'mate'>('mate');
    const [cubreplacasColor, setCubreplacasColor] = useState('#ff0000');

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
            let price = 55000;
            if (cubreplacasBase === 'fibra') price += 20000;
            if (cubreplacasBase === 'ppf') price += 40000;
            if (cubreplacasBase === 'fibra' && cubreplacasFinish === 'mate') {
                price += 10000;
            }
            setTotalPrice(price);
            setDiscountedPrice(price);
            setVolumeDiscountedPrice(price);
            setVolumeDiscountPct(0);
            setTotalStickers(1);
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
    }, [widthCm, heightCm, sheetQuantity, material, materialWidth, cutType, laminate, projectType, cubreplacasBase, cubreplacasFinish]);

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
                            {!hasDesign && hasDesign !== false && (
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

    const progress = (currentStep / 3) * 100;

    return (
        <section id="cotizador" className="w-full h-full relative flex flex-col bg-transparent overflow-hidden">
            <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-8 relative z-10 flex flex-col h-full pt-4 md:pt-6 pb-2">
                {/* Progress Bar */}
                <div className="w-full max-w-4xl mx-auto mb-4 shrink-0">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-brand-yellow uppercase tracking-widest italic">Paso {currentStep} de 3</span>
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

                <div className="text-center mb-4 shrink-0">
                    <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter mb-1 leading-none">
                        {projectType === 'cubreplacas' ? <>Cotiza tus <span className="text-red-500 italic">Cubreplacas</span></> : <>Cotiza tus <span className="text-brand-yellow italic">Stickers</span></>}
                    </h2>
                    <p className="text-gray-400 text-[10px] md:text-xs font-medium max-w-2xl mx-auto uppercase tracking-wider hidden sm:block">
                        Personaliza tu pedido paso a paso para obtener un presupuesto exacto.
                    </p>
                </div>

                <div className={`grid grid-cols-1 ${currentStep === 3 ? 'lg:grid-cols-2 max-w-2xl mx-auto' : 'lg:grid-cols-4'} gap-4 md:gap-6 items-start flex-grow min-h-0`}>
                    {/* Main Content Area */}
                    <div className={`${(!projectType || (projectType !== 'cubreplacas' && currentStep < 2)) ? 'lg:col-span-4' : (currentStep === 3 ? '' : 'lg:col-span-3')} order-1 h-full flex flex-col`}>
                        <div className="bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-y-auto h-auto max-h-full scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                                        <h3 className="text-white font-bold text-lg mb-4">{projectType === 'cubreplacas' ? 'Fondo del Cubreplacas' : 'Tipo de Corte'}</h3>

                                        {projectType === 'cubreplacas' ? (
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { id: 'negro', name: 'Negro (Vinilo)', desc: 'Base sólida', color: '#1a1a1a', extra: 0 },
                                                    { id: 'ppf', name: 'PPF (Protección)', desc: 'Alto brillo', color: '#000000', extra: 40000 },
                                                    { id: 'fibra', name: 'Fibra de Carbono', desc: 'Textura 3D', color: '#2a2a2a', extra: 20000 },
                                                    { id: 'impreso', name: 'Impreso Full Color', desc: 'Diseños complejos', color: '#ffffff', extra: 0 },
                                                    { id: 'especial', name: 'Color Especial', desc: 'Personalizado', color: cubreplacasColor, extra: 0 },
                                                ].map((bg) => (
                                                    <button key={bg.id} onClick={() => setCubreplacasBase(bg.id as any)} className={`p-4 rounded-xl border text-left ${cubreplacasBase === bg.id ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-white/5'}`}>
                                                        <div className="w-6 h-6 rounded mb-2" style={{ backgroundColor: bg.id === 'fibra' ? '#111' : bg.color }} />
                                                        <span className="text-white font-bold block">{bg.name}</span>
                                                        {bg.extra > 0 && <span className="text-xs text-red-500">+${bg.extra.toLocaleString()}</span>}
                                                    </button>
                                                ))}
                                                {cubreplacasBase === 'especial' && (
                                                    <input type="color" value={cubreplacasColor} onChange={(e) => setCubreplacasColor(e.target.value)} className="w-full h-10 rounded" />
                                                )}
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
                                            <div className="grid grid-cols-2 gap-4">
                                                <button onClick={() => setCubreplacasFinish('mate')} disabled={cubreplacasBase === 'ppf'} className={`p-6 rounded-xl border ${cubreplacasFinish === 'mate' ? 'border-red-500 bg-red-500/10' : 'border-white/10'} ${cubreplacasBase === 'ppf' ? 'opacity-50' : ''}`}>
                                                    <span className="text-white font-bold">MATE</span>
                                                    {cubreplacasBase === 'fibra' && <span className="block text-xs text-red-400">+$10,000</span>}
                                                </button>
                                                <button onClick={() => setCubreplacasFinish('brillante')} className={`p-6 rounded-xl border ${cubreplacasFinish === 'brillante' ? 'border-red-500 bg-red-500/10' : 'border-white/10'}`}>
                                                    <span className="text-white font-bold">BRILLANTE</span>
                                                </button>
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
                                            <div className="space-y-4">
                                                {fileUrl ? (
                                                    <div className="bg-green-500/10 border border-green-500 p-4 rounded-xl flex justify-between items-center">
                                                        <span className="text-white text-sm">{fileName}</span>
                                                        <button onClick={() => { setFileUrl(null); setFileName(null); }} className="text-red-500 text-xs">Cambiar</button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {isUploading ? (
                                                            <div className="space-y-2">
                                                                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                                                    <div className="bg-brand-yellow h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                                                </div>
                                                                <p className="text-gray-400 text-xs text-center">{uploadProgress}% subido</p>
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
                                                                }} className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200">
                                                                    SUBIR LOGO
                                                                </button>
                                                                <button onClick={() => {
                                                                    setHasDesign(false);
                                                                    setProjectType(null);
                                                                    setCurrentStep(0);
                                                                }} className="text-gray-500 text-xs underline block mx-auto">No tengo logo</button>
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
                                    <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="text-gray-400 hover:text-white flex items-center gap-1.5 text-xs sm:text-sm">
                                        <ArrowRight className="rotate-180" size={14} /> Atrás
                                    </button>
                                    {currentStep < 3 && (
                                        <button onClick={() => setCurrentStep(currentStep + 1)} className="bg-white text-black px-4 py-1.5 rounded-lg font-bold hover:bg-gray-200 flex items-center gap-1.5 text-xs sm:text-sm">
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
                                            <div className="flex justify-between">
                                                <span>Acabado:</span>
                                                <span className="text-white font-bold">{cubreplacasFinish}</span>
                                            </div>
                                            <div className="flex justify-between pt-4 border-t border-white/10">
                                                <span>Total:</span>
                                                <span className="text-brand-yellow font-bold text-lg">${totalPrice.toLocaleString()}</span>
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
                                                    <span className="text-brand-yellow font-black text-xl">${totalPrice.toLocaleString()}</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                {currentStep >= 3 && (
                                    <Button onClick={() => {
                                        addItem({
                                            id: Date.now(),
                                            name: projectType === 'cubreplacas' ? 'Cubreplacas Custom' : `${material.name} (${materialWidth}x${material.sheetSize.height}cm)`,
                                            price: discountedPrice,
                                            displayPrice: discountedPrice.toLocaleString(),
                                            image: projectType === 'cubreplacas' ? '/brand/logo.png' : material.imageSrc,
                                            category: projectType === 'cubreplacas' ? 'Cubreplacas' : 'Stickers',
                                            description: projectType === 'cubreplacas' ? `${cubreplacasBase} / ${cubreplacasFinish}` : `${cutType.name} | ${widthCm}x${heightCm}cm | ${sheetQuantity} hojas`,
                                            features: projectType === 'cubreplacas' ? [`Base: ${cubreplacasBase}`, `Acabado: ${cubreplacasFinish}`] : [`Material: ${material.name}`, `Corte: ${cutType.name}`],
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
        </section>
    );
}
