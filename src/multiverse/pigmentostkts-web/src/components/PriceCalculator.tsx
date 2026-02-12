"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Check, AlertCircle, Plus, Minus } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { uploadFiles } from "@/lib/uploadthing";

// Helper to use uploadFiles if needed, or I'll just use the button.
// Actually, let's keep it simple.

// Configuración de Materiales (Precio fijo por pliego)
interface MaterialPricing {
    sc_laminate: number;       // Semi Corte con laminado (precio por pliego 120cm)
    cc_laminate: number;       // Corte Completo con laminado (precio por pliego 120cm)
    hybrid_laminate?: number;  // Semicorte + Corte Completo (precio por pliego 120cm)
    // Pricing for 60cm width (if hasWidthOptions is true)
    sc_laminate_60?: number;   // Semi Corte 60cm width
    cc_laminate_60?: number;   // Corte Completo 60cm width
    hybrid_laminate_60?: number; // Hybrid 60cm width
}

interface Material {
    id: string;
    name: string;
    description: string;
    sheetSize: { width: number; height: number };
    alternativeSheetSize?: { width: number; height: number }; // For materials with 60cm option
    pricing: MaterialPricing;
    imageSrc: string;
    finishOptions: boolean;    // Can choose matte/glossy laminate
    requiresLaminate: boolean; // Must have laminate (no "sin laminado" option)
    hasWidthOptions?: boolean; // Can choose between 60cm and 120cm width
}

const MATERIALS_CONFIG: Material[] = [
    {
        id: 'vinilo-blanco',
        name: 'Vinilo Blanco',
        description: 'El estándar para stickers. Base blanca pura.',
        sheetSize: { width: 99, height: 99 },
        pricing: {
            sc_laminate: 129900,   // +10k
            cc_laminate: 134900,   // +10k
            hybrid_laminate: 145000 // +10k
        },
        imageSrc: '/materials/blanco-brillante.png',
        finishOptions: true,
        requiresLaminate: true  // All materials now require laminate
    },
    {
        id: 'vinilo-transparente',
        name: 'Vinilo Transparente',
        description: 'Fondo invisible. Ideal para vidrio o superficies claras.',
        sheetSize: { width: 99, height: 99 },
        pricing: {
            sc_laminate: 129900,   // +10k
            cc_laminate: 134900,   // +10k
            hybrid_laminate: 145000 // +10k
        },
        imageSrc: '/materials/transparente-brillante.png',
        finishOptions: true,
        requiresLaminate: true
    },
    {
        id: 'tornasol',
        name: 'Tornasol',
        description: 'Efecto iridiscente que cambia de color según la luz.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: {
            sc_laminate: 190900,   // +10k
            cc_laminate: 195900,   // +10k
            hybrid_laminate: 205000, // +10k
            sc_laminate_60: 149900,
            cc_laminate_60: 149900,
            hybrid_laminate_60: 149900
        },
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
        pricing: {
            sc_laminate: 195000,   // +10k
            cc_laminate: 200000,   // +10k
            hybrid_laminate: 210000, // +10k
            sc_laminate_60: 149900,
            cc_laminate_60: 149900,
            hybrid_laminate_60: 149900
        },
        imageSrc: '/materials/metalizado-dorado.png',
        finishOptions: true,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'metalizado-plateado',
        name: 'Vinilo Metalizado Plateado',
        description: 'Acabado espejo plateado cromado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: {
            sc_laminate: 195000,   // +10k
            cc_laminate: 200000,   // +10k
            hybrid_laminate: 210000, // +10k
            sc_laminate_60: 149900,
            cc_laminate_60: 149900,
            hybrid_laminate_60: 149900
        },
        imageSrc: '/materials/metalizado-plateado.png',
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
        pricing: {
            sc_laminate: 165000,   // +10k
            cc_laminate: 170000,   // +10k
            hybrid_laminate: 180000, // +10k
            sc_laminate_60: 149900,
            cc_laminate_60: 149900,
            hybrid_laminate_60: 149900
        },
        imageSrc: '/materials/blanco-holografico.png',
        finishOptions: false,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'escarchado',
        name: 'Escarchado (Glitter)',
        description: 'Textura con partículas brillantes. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: {
            sc_laminate: 165000,   // +10k
            cc_laminate: 170000,   // +10k
            hybrid_laminate: 180000, // +10k
            sc_laminate_60: 149900,
            cc_laminate_60: 149900,
            hybrid_laminate_60: 149900
        },
        imageSrc: '/materials/escarchado.png',
        finishOptions: false,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'canvas',
        name: 'Vinilo Canvas',
        description: 'Textura tipo lienzo artístico. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: {
            sc_laminate: 165000,   // +10k
            cc_laminate: 170000,   // +10k
            hybrid_laminate: 180000, // +10k
            sc_laminate_60: 149900,
            cc_laminate_60: 149900,
            hybrid_laminate_60: 149900
        },
        imageSrc: '/materials/canvas.png',
        finishOptions: false,
        requiresLaminate: true,
        hasWidthOptions: true
    },
    {
        id: 'ojo-gato',
        name: 'Ojo de Gato',
        description: 'Efecto reflectante especial. Solo con laminado.',
        sheetSize: { width: 120, height: 100 },
        alternativeSheetSize: { width: 60, height: 100 },
        pricing: {
            sc_laminate: 165000,   // +10k
            cc_laminate: 170000,   // +10k
            hybrid_laminate: 180000, // +10k
            sc_laminate_60: 149900,
            cc_laminate_60: 149900,
            hybrid_laminate_60: 149900
        },
        imageSrc: '/materials/ojo-gato.png',
        finishOptions: false,
        requiresLaminate: true,
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

interface CustomStickerOrder {
    materialId: string;
    materialName: string;
    cutTypeId: string;
    width: number;
    height: number;
    quantity: number;
    laminate: string | null;
    price: number;
    fileUrl?: string;
}

export default function PriceCalculator() {
    const { addItem, toggleCart } = useCart();
    // State for Stepper
    // Step 0: Initial Decisions (Design & Type)
    // Step 1: Cut Type
    // Step 2: Material
    // Step 3: Dimensions/Qty
    // Step 4: Final
    const [currentStep, setCurrentStep] = useState(0); // Start at 0 for initial questions

    // Initial Decisions State
    const [hasDesign, setHasDesign] = useState<boolean | null>(null);
    const [projectType, setProjectType] = useState<'printed' | 'cut' | null>(null);

    // Selections
    const [material, setMaterial] = useState(MATERIALS_CONFIG[0]);
    const [materialWidth, setMaterialWidth] = useState<120 | 60>(120); // For materials with width options
    const [laminate, setLaminate] = useState<'brillante' | 'mate' | null>('brillante'); // Default to brillante since all materials require laminate
    const [cutType, setCutType] = useState(CUT_TYPES[0]);
    const [widthCm, setWidthCm] = useState(5);
    const [heightCm, setHeightCm] = useState(5);
    const [sheetQuantity, setSheetQuantity] = useState(1);
    const [organizationMode, setOrganizationMode] = useState<'manual' | 'auto' | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    // Calculated Results
    const [stickersPerSheet, setStickersPerSheet] = useState(0);
    const [totalStickers, setTotalStickers] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [volumeDiscountPct, setVolumeDiscountPct] = useState(0);
    const [volumeDiscountedPrice, setVolumeDiscountedPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    // Calculation Effect
    useEffect(() => {
        // Determine which sheet size to use
        const activeSheetSize = (material.hasWidthOptions && materialWidth === 60 && material.alternativeSheetSize)
            ? material.alternativeSheetSize
            : material.sheetSize;

        const safeSheetWidth = activeSheetSize.width - 2;
        const safeSheetHeight = activeSheetSize.height - 2;
        const stickerFullWidth = widthCm + 0.5;
        const stickerFullHeight = heightCm + 0.5;

        const cols = Math.floor(safeSheetWidth / stickerFullWidth);
        const rows = Math.floor(safeSheetHeight / stickerFullHeight);
        const countNormal = Math.max(0, cols * rows);

        // Rotated
        const colsRot = Math.floor(safeSheetWidth / stickerFullHeight);
        const rowsRot = Math.floor(safeSheetHeight / stickerFullWidth);
        const countRotated = Math.max(0, colsRot * rowsRot);

        const bestCount = Math.max(countNormal, countRotated);


        setStickersPerSheet(bestCount);
        const totalStickerCount = bestCount * sheetQuantity;
        setTotalStickers(totalStickerCount);

        // Determine price per sheet based on cut type and width
        let pricePerSheet = 0;
        const is60cm = material.hasWidthOptions && materialWidth === 60;

        if (cutType.id === 'hybrid') {
            // Hybrid cut (Semicorte + Corte Completo) - Premium option
            pricePerSheet = is60cm
                ? (material.pricing.hybrid_laminate_60 || 149900)
                : (material.pricing.hybrid_laminate || material.pricing.cc_laminate);
        } else if (cutType.id === 'sc') {
            // Semi Corte
            pricePerSheet = is60cm
                ? (material.pricing.sc_laminate_60 || 149900)
                : material.pricing.sc_laminate;
        } else {
            // Corte Completo (cc)
            pricePerSheet = is60cm
                ? (material.pricing.cc_laminate_60 || 149900)
                : material.pricing.cc_laminate;
        }

        const calculatedPrice = pricePerSheet * sheetQuantity;
        setTotalPrice(calculatedPrice);

        // Volume Discount Calculation
        let vDiscount = 0;
        if (sheetQuantity >= 50) vDiscount = 0.30;
        else if (sheetQuantity >= 20) vDiscount = 0.20;
        else if (sheetQuantity >= 10) vDiscount = 0.10;
        else if (sheetQuantity >= 5) vDiscount = 0.05;

        setVolumeDiscountPct(vDiscount);
        const vPrice = Math.round(calculatedPrice * (1 - vDiscount));
        setVolumeDiscountedPrice(vPrice);

        // Final Price
        setDiscountedPrice(vPrice);
    }, [widthCm, heightCm, sheetQuantity, material, materialWidth, cutType, laminate]);

    // If we are in initial decision phase (currentStep === 0 or waiting for design/project type)
    if (currentStep === 0) {
        return (
            <section id="cotizador" className="w-full relative min-h-[calc(100dvh-46px)] flex flex-col justify-center bg-brand-black overflow-hidden py-8 md:py-16 scroll-mt-0">
                {/* Background Texture & Glows */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 w-full max-w-4xl">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                            Empecemos tu Cotización
                        </h2>
                        <div className="h-1 w-16 bg-brand-yellow mx-auto rounded-full shadow-[0_0_10px_rgba(230,194,0,0.5)]" />
                    </div>

                    <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative flex flex-col justify-center overflow-hidden">
                        {/* Subtle inner glow */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4 sm:space-y-8 flex-grow flex flex-col justify-center"
                            >
                                {!hasDesign && hasDesign !== false && (
                                    <div className="text-center space-y-4 sm:space-y-8">
                                        <h3 className="text-white font-bold text-lg sm:text-3xl">¿Tienes el diseño listo?</h3>

                                        <div className="grid grid-cols-2 gap-2 sm:gap-6 max-w-2xl mx-auto w-full">
                                            <button
                                                onClick={() => setHasDesign(true)}
                                                className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow hover:scale-105 transition-all group duration-300 relative overflow-hidden"
                                            >
                                                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 sm:mb-6 group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                                    <Check className="w-6 h-6 sm:w-10 sm:h-10" />
                                                </div>
                                                <span className="text-white font-black text-xs sm:text-2xl block mb-1">SÍ, LO TENGO</span>
                                                <span className="text-[10px] sm:text-sm text-gray-400 group-hover:text-gray-200 leading-tight">Archivo listo para imprimir</span>
                                            </button>

                                            <button
                                                onClick={() => setHasDesign(false)}
                                                className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500 hover:scale-105 transition-all group duration-300 relative overflow-hidden"
                                            >
                                                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 sm:mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                    <Calculator className="w-6 h-6 sm:w-10 sm:h-10" />
                                                </div>
                                                <span className="text-white font-black text-xs sm:text-2xl block mb-1">NO LO TENGO</span>
                                                <span className="text-[10px] sm:text-sm text-gray-400 group-hover:text-gray-200 leading-tight">Necesito ayuda de diseño</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {hasDesign === false && (
                                    <div className="text-center space-y-8">
                                        <div className="w-24 h-24 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                            <Calculator size={48} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-3xl mb-4">Servicio de Diseño Profesional</h3>
                                            <p className="text-gray-300 max-w-lg mx-auto text-lg leading-relaxed">
                                                Nuestro equipo creativo puede diseñar tus stickers desde cero. Cuéntanos tu idea y la haremos realidad.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 max-w-sm mx-auto backdrop-blur-sm">
                                            <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Desde</p>
                                            <p className="text-4xl font-black text-white">$75,000 COP</p>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
                                            <button onClick={() => setHasDesign(null)} className="text-gray-400 hover:text-white underline text-sm px-6 py-3">
                                                Atrás
                                            </button>
                                            <a
                                                href={`${PIGMENTO_DATA.contact.whatsappUrl}?text = Hola! No tengo diseño y necesito ayuda para crear mis stickers.`}
                                                target="_blank"
                                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20 text-lg"
                                            >
                                                Solicitar Diseño <ArrowRight size={20} />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {hasDesign === true && !projectType && (
                                    <div className="text-center space-y-8">
                                        <h3 className="text-white font-bold text-2xl md:text-3xl">Elige tu tipo de Sticker</h3>

                                        <div className="grid grid-cols-2 gap-2 sm:gap-6 max-w-3xl mx-auto w-full">
                                            <button
                                                onClick={() => { setProjectType('printed'); setCurrentStep(1); }}
                                                className="p-3 sm:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow hover:scale-105 transition-all group text-left relative overflow-hidden h-[180px] sm:h-[300px] flex flex-col justify-end"
                                            >
                                                <img src="/project-types/printed-stickers.png" alt="Printed Stickers" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:opacity-60 transition-opacity" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-[1]" />

                                                <div className="relative z-10">
                                                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-brand-yellow text-black flex items-center justify-center mb-2 sm:mb-4 font-bold">
                                                        <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                                                    </div>
                                                    <span className="text-white font-black text-xs sm:text-2xl block mb-0.5 sm:mb-2 uppercase leading-tight">IMPRESOS FULL COLOR</span>
                                                    <p className="hidden sm:block text-sm text-gray-300 leading-relaxed">
                                                        Vinilo adhesivo impreso en alta resolución. Ideales para ilustraciones, fotos y logotipos complejos.
                                                    </p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setProjectType('cut');
                                                }}
                                                className="p-3 sm:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500 hover:scale-105 transition-all group text-left relative overflow-hidden h-[180px] sm:h-[300px] flex flex-col justify-end"
                                            >
                                                <img src="/project-types/cut-vinyl.png" alt="Cut Vinyl" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:opacity-60 transition-opacity" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-[1]" />

                                                <div className="relative z-10">
                                                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-purple-500 text-white flex items-center justify-center mb-2 sm:mb-4 font-bold">
                                                        <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                                                    </div>
                                                    <span className="text-white font-black text-xs sm:text-2xl block mb-0.5 sm:mb-2 uppercase leading-tight">VINILO DE CORTE</span>
                                                    <p className="hidden sm:block text-sm text-gray-300 leading-relaxed">
                                                        Colores sólidos troquelados sin impresión. Perfectos para textos, señalización y logos vectoriales simples.
                                                    </p>
                                                </div>
                                            </button>
                                        </div>

                                        {projectType === 'cut' && (
                                            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-200 text-sm max-w-md mx-auto">
                                                Opción en construcción. Por favor contáctanos para cotizar Vinilo de Corte.
                                                <a href={PIGMENTO_DATA.contact.whatsappUrl} target="_blank" className="block mt-2 font-bold underline">Contactar por WhatsApp</a>
                                                <button onClick={() => setProjectType(null)} className="block mt-4 text-xs opacity-60 hover:opacity-100 mx-auto">Volver a elegir</button>
                                            </div>
                                        )}

                                        <button onClick={() => setHasDesign(null)} className="text-gray-500 hover:text-white text-sm mt-4">
                                            Volver
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        );
    }

    // Main Calculator Wizard (Printed Flow)
    const progress = (currentStep / 4) * 100;

    return (
        <section id="cotizador" className="w-full relative min-h-[calc(100dvh-46px)] flex flex-col justify-center bg-brand-black overflow-hidden py-8 md:py-16 scroll-mt-0">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                {/* Header Compacto */}
                <div className="text-center mb-2 md:mb-12">
                    <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-1 md:mb-4">
                        Cotiza tus <span className="text-brand-yellow">Stickers</span>
                    </h2>
                    <p className="hidden sm:block text-gray-400 text-sm max-w-xl mx-auto">
                        Personaliza cada detalle. Desde el corte hasta el material.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-xl mx-auto h-1 bg-white/10 rounded-full mb-3 md:mb-6 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}% ` }}
                        className="h-full bg-brand-yellow transition-all duration-500"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN: WIZARD */}
                    <div className="lg:col-span-2">
                        <div className="bg-brand-black/50 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 p-3 md:p-6 shadow-2xl relative flex flex-col justify-between">

                            <AnimatePresence mode="wait">
                                {/* STEP 0: INITIAL DECISIONS */}
                                {currentStep === 0 && (
                                    <motion.div
                                        key="step0"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4 flex-grow flex flex-col justify-center min-h-0 md:min-h-[400px]"
                                    >
                                        {!hasDesign && hasDesign !== false && (
                                            <div className="text-center space-y-6">
                                                <h3 className="text-white font-bold text-2xl md:text-3xl">¿Tienes el diseño listo?</h3>
                                                <p className="text-gray-400 max-w-md mx-auto">Para imprimir tus stickers necesitamos el archivo en alta calidad.</p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto w-full">
                                                    <button
                                                        onClick={() => setHasDesign(true)}
                                                        className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow hover:scale-105 transition-all group"
                                                    >
                                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                                            <Check size={24} />
                                                        </div>
                                                        <span className="text-white font-bold text-lg block mb-1">Sí, tengo el archivo</span>
                                                        <span className="text-xs text-gray-500">Vector o Imagen HQ</span>
                                                    </button>

                                                    <button
                                                        onClick={() => setHasDesign(false)}
                                                        className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500 hover:scale-105 transition-all group"
                                                    >
                                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                            <Calculator size={24} />
                                                        </div>
                                                        <span className="text-white font-bold text-lg block mb-1">No, necesito diseño</span>
                                                        <span className="text-xs text-gray-500">Servicio de Diseño</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {hasDesign === false && (
                                            <div className="text-center space-y-6">
                                                <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mx-auto mb-2">
                                                    <Calculator size={32} />
                                                </div>
                                                <h3 className="text-white font-bold text-2xl">¡Te ayudamos a diseñar!</h3>
                                                <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
                                                    Contamos con un equipo de diseñadores profesionales listos para crear tus stickers desde cero.
                                                </p>
                                                <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-sm mx-auto">
                                                    <p className="text-sm text-gray-400 mb-2">Servicio de Diseño desde</p>
                                                    <p className="text-3xl font-black text-white">$75,000</p>
                                                </div>
                                                <div className="flex gap-4 justify-center pt-2">
                                                    <button onClick={() => setHasDesign(null)} className="text-gray-400 hover:text-white underline text-sm">Volver</button>
                                                    <a
                                                        href={`${PIGMENTO_DATA.contact.whatsappUrl}?text = Hola! No tengo diseño y necesito ayuda para crear mis stickers.`}
                                                        target="_blank"
                                                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
                                                    >
                                                        Solicitar Diseño <ArrowRight size={18} />
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {hasDesign === true && !projectType && (
                                            <div className="text-center space-y-6">
                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                    <button onClick={() => setHasDesign(null)} className="text-xs text-gray-500 hover:text-white flex items-center gap-1">
                                                        <ArrowRight className="rotate-180" size={12} /> Volver
                                                    </button>
                                                </div>
                                                <h3 className="text-white font-bold text-2xl md:text-3xl">¿Qué tipo de stickers buscas?</h3>
                                                <p className="text-gray-400 max-w-md mx-auto">El proceso de fabricación cambia según el tipo.</p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto w-full">
                                                    <button
                                                        onClick={() => { setProjectType('printed'); setCurrentStep(1); }}
                                                        className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow hover:scale-105 transition-all group text-left relative overflow-hidden"
                                                    >
                                                        <div className="relative z-10">
                                                            <div className="w-10 h-10 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center mb-4">
                                                                <Check size={20} />
                                                            </div>
                                                            <span className="text-white font-bold text-xl block mb-2">Stickers Impresos</span>
                                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                                Impresión digital full color sobre vinilo. Ideales para ilustraciones, fotos, logos con degradados.
                                                            </p>
                                                        </div>
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setProjectType('cut');
                                                            // setCurrentStep(1); // TODO: Direct to Cut Flow when ready
                                                        }}
                                                        className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500 hover:scale-105 transition-all group text-left relative overflow-hidden"
                                                    >
                                                        <div className="relative z-10">
                                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mb-4">
                                                                <Calculator size={20} />
                                                            </div>
                                                            <span className="text-white font-bold text-xl block mb-2">Vinilo de Corte</span>
                                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                                Colores sólidos troquelados (sin impresión). Ideales para textos, señalización, logos simples.
                                                            </p>
                                                        </div>
                                                    </button>
                                                </div>

                                                {/* Placeholder for Cut Flow */}
                                                {projectType === 'cut' && (
                                                    <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-200 text-sm">
                                                        Opción en construcción. Por favor contáctanos para cotizar Vinilo de Corte.
                                                        <a href={PIGMENTO_DATA.contact.whatsappUrl} target="_blank" className="block mt-2 font-bold underline">Contactar por WhatsApp</a>
                                                        <button onClick={() => setProjectType(null)} className="block mt-4 text-xs opacity-60 hover:opacity-100 mx-auto">Volver a elegir</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4 flex-grow"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-3">
                                            <div>
                                                <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight">Tipo de Corte</h3>
                                                <p className="text-[10px] text-gray-500 font-bold">PASO 1/4</p>
                                            </div>
                                            <div className="hidden sm:block text-xs text-gray-500 max-w-[200px] text-right">
                                                ¿Cómo quieres recibir tus stickers?
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                                            {CUT_TYPES.map((c) => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => setCutType(c)}
                                                    className={`relative h-[160px] sm:h-64 rounded-xl sm:rounded-2xl text-left border transition-all overflow-hidden group flex flex-col justify-end p-2.5 sm:p-4 ${cutType.id === c.id ? 'border-brand-yellow ring-2 ring-brand-yellow/50' : 'border-white/10 hover:border-white/40'}`}
                                                >
                                                    {/* Background Image */}
                                                    <div className="absolute inset-0 z-0">
                                                        <img
                                                            src={c.imageSrc}
                                                            alt={c.name}
                                                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${cutType.id === c.id ? 'scale-105' : 'scale-100 opacity-40 sm:opacity-60 group-hover:opacity-80'}`}
                                                        />
                                                        <div className={`absolute inset-0 bg-gradient-to-t via-black/40 to-transparent ${cutType.id === c.id ? 'from-brand-black/95' : 'from-black/95'}`} />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="relative z-10 w-full">
                                                        <div className="flex justify-between items-center mb-0.5">
                                                            <span className={`font-black text-[10px] sm:text-lg block leading-tight ${cutType.id === c.id ? 'text-brand-yellow' : 'text-white'}`}>{c.name}</span>
                                                            {cutType.id === c.id && <div className="bg-brand-yellow text-black rounded-full p-0.5 sm:p-1 scale-75 sm:scale-100"><Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" strokeWidth={3} /></div>}
                                                        </div>
                                                        <p className={`text-[8px] sm:text-xs leading-tight sm:leading-relaxed line-clamp-2 ${cutType.id === c.id ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                                            {c.description}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4 flex-grow"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-3">
                                            <div>
                                                <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight">Material Base</h3>
                                                <p className="text-[10px] text-gray-500 font-bold">PASO 2/4</p>
                                            </div>
                                            <div className="hidden sm:block text-xs text-gray-500 max-w-[200px] text-right">
                                                Elige el sustrato. El acabado se elige después.
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pb-0">
                                            {MATERIALS_CONFIG.map((m) => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => setMaterial(m)}
                                                    className={`w-full p-2 rounded-xl text-left border transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[105px] sm:h-[115px] ${material.id === m.id ? 'border-brand-yellow shadow-[0_0_15px_rgba(230,194,0,0.4)] ring-1 ring-brand-yellow' : 'border-white/10 hover:border-white/40'}`}
                                                >
                                                    {/* Background Image */}
                                                    <div className="absolute inset-0 z-0">
                                                        <img
                                                            src={m.imageSrc}
                                                            alt={m.name}
                                                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${material.id === m.id ? 'scale-110' : 'scale-100 opacity-40 sm:opacity-60 group-hover:opacity-80'}`}
                                                        />
                                                        <div className={`absolute inset-0 bg-gradient-to-t via-black/40 to-black/20 ${material.id === m.id ? 'from-brand-black/95' : 'from-black/95'}`} />
                                                    </div>

                                                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-start mb-0.5">
                                                                <span className={`font-black text-[10px] sm:text-xs block leading-tight pr-4 ${material.id === m.id ? 'text-brand-yellow' : 'text-white'}`}>{m.name}</span>
                                                                {material.id === m.id && <div className="bg-brand-yellow text-black rounded-full p-0.5 scale-75"><Check size={10} strokeWidth={3} /></div>}
                                                            </div>
                                                            <span className="text-[8px] sm:text-[9px] font-mono px-1 py-0 rounded inline-block bg-black/60 text-gray-300 backdrop-blur-sm border border-white/10 mb-1">
                                                                {m.sheetSize.width}x{m.sheetSize.height}cm
                                                            </span>
                                                            <p className={`text-[8px] sm:text-[9px] leading-tight line-clamp-2 opacity-90 ${material.id === m.id ? 'text-gray-200' : 'text-gray-400'}`}>
                                                                {m.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        {material.hasWidthOptions && (
                                            <div className="mt-6 bg-white/5 p-4 rounded-2xl border border-white/10">
                                                <label className="block text-sm font-bold text-brand-yellow mb-2 uppercase tracking-wider">
                                                    Ancho del Material
                                                </label>
                                                <p className="text-xs text-gray-400 mb-3">Este material está disponible en dos anchos.</p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => setMaterialWidth(120)}
                                                        className={`p-3 rounded-xl border text-center transition-all ${materialWidth === 120 ? 'bg-white text-black border-white font-bold' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                                                    >
                                                        120cm × 100cm
                                                    </button>
                                                    <button
                                                        onClick={() => setMaterialWidth(60)}
                                                        className={`p-3 rounded-xl border text-center transition-all ${materialWidth === 60 ? 'bg-white text-black border-white font-bold' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                                                    >
                                                        60cm × 100cm
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4 flex-grow"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-3">
                                            <div>
                                                <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight">Detalles Finales</h3>
                                                <p className="text-[10px] text-gray-500 font-bold">PASO 3/4</p>
                                            </div>
                                            <div className="hidden sm:block text-xs text-gray-500 max-w-[200px] text-right">
                                                Acabado, medidas y cantidad.
                                            </div>
                                        </div>

                                        <div className="mb-4 bg-white/5 p-3 rounded-xl border border-white/10">
                                            <label className="block text-[10px] font-black text-brand-yellow mb-2 uppercase tracking-wider">
                                                Acabado / Laminado
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    onClick={() => setLaminate('brillante')}
                                                    className={`p-2 rounded-lg border text-center transition-all text-sm ${laminate === 'brillante' ? 'bg-white text-black border-white font-bold' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                                                >
                                                    Brillante
                                                </button>
                                                <button
                                                    onClick={() => setLaminate('mate')}
                                                    className={`p-2 rounded-lg border text-center transition-all text-sm ${laminate === 'mate' ? 'bg-white text-black border-white font-bold' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                                                >
                                                    Mate
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 p-3 rounded-xl border border-white/10 grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[10px] font-black text-white mb-2 ml-1 uppercase">ANCHO (CM)</label>
                                                <div className="flex items-center gap-1 bg-black/30 p-1 rounded-lg border border-white/10">
                                                    <button onClick={() => setWidthCm(Math.max(1, widthCm - 1))} className="p-1 hover:bg-white/10 rounded-lg text-white transition-colors h-8 w-8 flex items-center justify-center">
                                                        <Minus size={14} />
                                                    </button>
                                                    <input type="number" value={widthCm} onChange={(e) => setWidthCm(Number(e.target.value))}
                                                        className="w-full bg-transparent border-none text-white font-black text-lg focus:outline-none transition-colors text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                                    <button onClick={() => setWidthCm(widthCm + 1)} className="p-1 hover:bg-white/10 rounded-lg text-white transition-colors h-8 w-8 flex items-center justify-center">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-white mb-2 ml-1 uppercase">ALTO (CM)</label>
                                                <div className="flex items-center gap-1 bg-black/30 p-1 rounded-lg border border-white/10">
                                                    <button onClick={() => setHeightCm(Math.max(1, heightCm - 1))} className="p-1 hover:bg-white/10 rounded-lg text-white transition-colors h-8 w-8 flex items-center justify-center">
                                                        <Minus size={14} />
                                                    </button>
                                                    <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))}
                                                        className="w-full bg-transparent border-none text-white font-black text-lg focus:outline-none transition-colors text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                                    <button onClick={() => setHeightCm(heightCm + 1)} className="p-1 hover:bg-white/10 rounded-lg text-white transition-colors h-8 w-8 flex items-center justify-center">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                            <div className="flex justify-between items-center mb-2 ml-1">
                                                <label className="block text-[10px] font-black text-white uppercase tracking-wider">Cantidad de Metros de Vinilo</label>
                                                {volumeDiscountPct > 0 && (
                                                    <span className="text-[10px] bg-brand-yellow text-black px-2 py-0.5 rounded-full font-black animate-pulse flex items-center gap-1">
                                                        <Check size={10} strokeWidth={4} /> -{(volumeDiscountPct * 100).toFixed(0)}% DCTO
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between gap-2 bg-black/30 p-1.5 rounded-lg border border-white/10">
                                                <button onClick={() => setSheetQuantity(Math.max(1, sheetQuantity - 1))} className="p-1 px-3 hover:bg-white/10 rounded-lg text-white transition-colors flex items-center"><ArrowRight className="rotate-180" size={16} /></button>
                                                <span className="text-2xl font-black text-white w-12 text-center tabular-nums">{sheetQuantity}</span>
                                                <button onClick={() => setSheetQuantity(sheetQuantity + 1)} className="p-1 px-3 hover:bg-white/10 rounded-lg text-white transition-colors"><ArrowRight size={16} /></button>
                                            </div>

                                            {/* Incentive Message */}
                                            {sheetQuantity < 50 && (
                                                <div className="mt-2 text-center">
                                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tight">
                                                        {sheetQuantity < 5 ? (
                                                            <>Pide <span className="text-brand-yellow">{5 - sheetQuantity}m más</span> y ahorra un <span className="text-brand-yellow">5%</span></>
                                                        ) : sheetQuantity < 10 ? (
                                                            <>Pide <span className="text-brand-yellow">{10 - sheetQuantity}m más</span> y ahorra un <span className="text-brand-yellow">10%</span></>
                                                        ) : sheetQuantity < 20 ? (
                                                            <>Pide <span className="text-brand-yellow">{20 - sheetQuantity}m más</span> y ahorra un <span className="text-brand-yellow">20%</span></>
                                                        ) : (
                                                            <>Pide <span className="text-brand-yellow">{50 - sheetQuantity}m más</span> y ahorra un <span className="text-brand-yellow">30%</span></>
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Validation Alert for Measurements */}
                                        {((cutType.id === 'cc' && (widthCm < 4 || heightCm < 4)) ||
                                            (cutType.id === 'sc' && (widthCm < 2 || heightCm < 2))) && (
                                                <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl flex items-start gap-3 animate-pulse">
                                                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                                                    <div className="text-xs text-red-200 leading-snug">
                                                        <span className="font-bold block text-red-500 mb-0.5">TAMAÑO MÍNIMO</span>
                                                        El {cutType.name.toLowerCase()} requiere un tamaño mínimo de **{cutType.id === 'cc' ? '4cm x 4cm' : '2cm x 2cm'}** para garantizar calidad.
                                                    </div>
                                                </div>
                                            )}
                                    </motion.div>
                                )}

                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4 flex-grow"
                                    >
                                        <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-3">
                                            <div>
                                                <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight">Finalizar</h3>
                                                <p className="text-[10px] text-gray-500 font-bold">PASO 4/4</p>
                                            </div>
                                            <div className="hidden sm:block text-xs text-gray-500 max-w-[200px] text-right">
                                                Organización y descuento.
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-[10px] font-black text-brand-yellow uppercase tracking-widest mb-3">
                                                Carga tu Diseño (PDF, AI, PSD, JPG, PNG)
                                            </label>

                                            <div
                                                className={`relative border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center gap-3 ${fileUrl ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-brand-yellow/30 bg-white/5'}`}
                                            >
                                                {isUploading ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
                                                        <p className="text-xs text-gray-400 font-bold uppercase">Subiendo Archivo...</p>
                                                    </div>
                                                ) : fileUrl ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="bg-green-500 text-black rounded-full p-2 scale-125 mb-1"><Check size={20} strokeWidth={3} /></div>
                                                        <p className="text-sm font-black text-white uppercase tracking-tight">{fileName}</p>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setFileUrl(null); setFileName(null); }}
                                                            className="text-[10px] text-red-500 font-bold hover:underline"
                                                        >
                                                            ELIMINAR Y CAMBIAR
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-brand-yellow transition-colors">
                                                            <Plus size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-white uppercase tracking-tight">Haz clic o arrastra tu archivo</p>
                                                            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">Nuestro servidor lo procesará inmediatamente</p>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            onChange={async (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    try {
                                                                        setIsUploading(true);

                                                                        const [res] = await uploadFiles("stickerUploader", {
                                                                            files: [file],
                                                                        });

                                                                        if (res) {
                                                                            setFileUrl(res.url);
                                                                            setFileName(res.name);
                                                                        }
                                                                    } catch (err: any) {
                                                                        console.error('Upload error details:', err);
                                                                        alert(`No se pudo subir el archivo: ${err.message}. Intenta con uno más pequeño o en otro formato.`);
                                                                    } finally {
                                                                        setIsUploading(false);
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation ButtonsContainer - Compacted */}
                            {currentStep > 0 && (
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                                    {currentStep > 1 ? (
                                        <button
                                            onClick={() => setCurrentStep(currentStep - 1)}
                                            className="text-gray-400 hover:text-white font-bold flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-sm"
                                        >
                                            <ArrowRight className="rotate-180" size={16} /> Atrás
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => { setCurrentStep(0); setProjectType(null); }}
                                            className="text-gray-400 hover:text-white font-bold flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-sm"
                                        >
                                            <ArrowRight className="rotate-180" size={16} /> Inicio
                                        </button>
                                    )}

                                    {currentStep < 4 ? (
                                        <button
                                            onClick={() => setCurrentStep(currentStep + 1)}
                                            disabled={
                                                (currentStep === 3 && material.finishOptions && !laminate) ||
                                                (currentStep === 3 && cutType.id === 'cc' && (widthCm < 4 || heightCm < 4)) ||
                                                (currentStep === 3 && cutType.id === 'sc' && (widthCm < 2 || heightCm < 2))
                                            }
                                            className={`bg-white text-black hover:bg-gray-200 font-bold px-5 py-2 rounded-xl flex items-center gap-2 transition-all text-sm ${(currentStep === 3 && material.finishOptions && !laminate) || (currentStep === 3 && cutType.id === 'cc' && (widthCm < 4 || heightCm < 4)) || (currentStep === 3 && cutType.id === 'sc' && (widthCm < 2 || heightCm < 2)) ? 'opacity-50 cursor-not-allowed' : ''} `}
                                        >
                                            Siguiente <ArrowRight size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                const customItem = {
                                                    id: Date.now(),
                                                    name: `STK PERSONALIZADO: ${material.name}`,
                                                    price: discountedPrice / sheetQuantity,
                                                    displayPrice: (discountedPrice / sheetQuantity).toLocaleString(),
                                                    image: material.imageSrc,
                                                    category: 'Personalizado',
                                                    description: `${cutType.name} | ${widthCm}x${heightCm}cm | ${laminate || 'Sin'} acabado`,
                                                    quantity: sheetQuantity,
                                                    fileUrl: fileUrl || undefined,
                                                    fileName: fileName || undefined,
                                                    features: [
                                                        `Material: ${material.name}`,
                                                        `Corte: ${cutType.name}`,
                                                        `Medidas: ${widthCm}x${heightCm}cm`,
                                                        `Acabado: ${laminate || 'N/A'}`
                                                    ]
                                                };
                                                addItem(customItem);
                                                toggleCart();
                                            }}
                                            disabled={!fileUrl}
                                            className={`bg-brand-yellow hover:bg-brand-yellow/90 text-black font-black px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20 text-sm ${(!fileUrl) ? 'opacity-50 pointer-events-none' : ''}`}
                                        >
                                            AGREGAR AL CARRITO <ArrowRight size={18} />
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                    {/* RIGHT COLUMN: STICKY SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-brand-black/50 rounded-3xl p-6 border border-white/10 sticky top-24 h-fit backdrop-blur-md">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Calculator className="text-brand-yellow" size={20} />
                                Resumen
                            </h4>

                            <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-gray-400 text-sm">Rendimiento:</span>
                                    <span className="text-brand-yellow font-black text-lg">
                                        {currentStep >= 3 ? `~${stickersPerSheet} stickers` : <span className="text-gray-600 text-base">---</span>}
                                    </span>
                                </div>
                                <div className="text-right text-[10px] text-gray-500">por metro de vinilo</div>

                                <div className="h-px bg-white/10 my-3"></div>

                                <div className="flex justify-between items-center">
                                    <span className="text-white text-sm font-bold">Total ({sheetQuantity} {sheetQuantity === 1 ? 'metro' : 'metros'})</span>
                                    <span className="text-white font-black text-xl">
                                        {currentStep >= 3 ? `~${totalStickers} stickers` : <span className="text-gray-600 text-base">---</span>}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Material:</span>
                                    <span className="text-white font-medium text-right max-w-[150px] truncate leading-tight">
                                        {currentStep >= 2 ? (
                                            <>
                                                {material.name}
                                                <span className="block text-[10px] text-brand-yellow capitalize">
                                                    Laminado {laminate}
                                                </span>
                                                {material.hasWidthOptions && (
                                                    <span className="block text-[10px] text-gray-400">
                                                        Ancho: {materialWidth}cm
                                                    </span>
                                                )}
                                            </>
                                        ) : <span className="text-gray-600 italic">Por elegir...</span>}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Corte:</span>
                                    <span className="text-white font-medium">{cutType.name}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Tamaño:</span>
                                    <span className="text-white font-medium">
                                        {currentStep >= 3 ? `${widthCm} x ${heightCm} cm` : <span className="text-gray-600 italic">Por definir...</span>}
                                    </span>
                                </div>
                                {organizationMode && (
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Modo:</span>
                                        <span className="text-brand-yellow font-medium">{organizationMode === 'manual' ? 'Manual' : 'Auto'}</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex justify-between items-baseline mb-3">
                                    <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">Total Estimado</span>
                                    <div className="text-right">
                                        {currentStep >= 2 ? (
                                            discountedPrice < totalPrice ? (
                                                <>
                                                    <span className="block text-[10px] line-through text-gray-600 decoration-red-500/50 mb-0.5">${totalPrice.toLocaleString()}</span>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-3xl font-black text-brand-yellow leading-tight">${discountedPrice.toLocaleString()}</span>
                                                        {volumeDiscountPct > 0 && (
                                                            <span className="text-[9px] text-brand-yellow font-bold uppercase tracking-tighter">
                                                                ¡Viste? Ahorraste un {(volumeDiscountPct * 100).toFixed(0)}%
                                                            </span>
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-3xl font-black text-white">${totalPrice.toLocaleString()}</span>
                                            )
                                        ) : (
                                            <span className="text-3xl font-black text-gray-700">$0</span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-500 leading-tight">
                                    {currentStep >= 2
                                        ? "*El precio final puede variar según especificaciones exactas del archivo."
                                        : "El precio se calculará al elegir el material."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section >
    );
}
