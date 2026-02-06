"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Check, AlertCircle } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { Button } from "@/components/ui/button";

// Configuración de Materiales (Precio fijo por pliego)
interface MaterialPricing {
    sc_laminate: number;       // Semi Corte con laminado (precio por pliego)
    cc_laminate: number;       // Corte Completo con laminado (precio por pliego)
    hybrid_laminate?: number;  // Semicorte + Corte Completo (precio por pliego)
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
            sc_laminate: 119900,
            cc_laminate: 124900,
            hybrid_laminate: 135000
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
            sc_laminate: 119900,
            cc_laminate: 124900,
            hybrid_laminate: 135000
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
            sc_laminate: 180900,
            cc_laminate: 185900,
            hybrid_laminate: 195000
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
            sc_laminate: 185000,
            cc_laminate: 190000,
            hybrid_laminate: 200000
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
            sc_laminate: 185000,
            cc_laminate: 190000,
            hybrid_laminate: 200000
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
            sc_laminate: 155000,
            cc_laminate: 160000,
            hybrid_laminate: 170000
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
            sc_laminate: 155000,
            cc_laminate: 160000,
            hybrid_laminate: 170000
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
            sc_laminate: 155000,
            cc_laminate: 160000,
            hybrid_laminate: 170000
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
            sc_laminate: 155000,
            cc_laminate: 160000,
            hybrid_laminate: 170000
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

export default function PriceCalculator() {
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
    const [coupon, setCoupon] = useState("");

    // Calculated Results
    const [stickersPerSheet, setStickersPerSheet] = useState(0);
    const [totalStickers, setTotalStickers] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
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

        // Determine price per sheet based on cut type
        let pricePerSheet = 0;

        if (cutType.id === 'hybrid') {
            // Hybrid cut (Semicorte + Corte Completo) - Premium option
            pricePerSheet = material.pricing.hybrid_laminate || material.pricing.cc_laminate;
        } else if (cutType.id === 'sc') {
            // Semi Corte
            pricePerSheet = material.pricing.sc_laminate;
        } else {
            // Corte Completo (cc)
            pricePerSheet = material.pricing.cc_laminate;
        }

        const calculatedPrice = pricePerSheet * sheetQuantity;
        setTotalPrice(calculatedPrice);

        // Coupon discount (10% off)
        if (coupon.trim().length > 0) {
            setDiscountedPrice(Math.round(calculatedPrice * 0.9));
        } else {
            setDiscountedPrice(0);
        }
    }, [widthCm, heightCm, sheetQuantity, material, cutType, laminate, coupon]);

    // If we are in initial decision phase (currentStep === 0 or waiting for design/project type)
    if (currentStep === 0) {
        return (
            <section id="cotizador" className="w-full relative min-h-screen flex flex-col justify-center bg-brand-black overflow-hidden py-8 md:py-12 scroll-mt-0">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-yellow/5 blurred-circle rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 blurred-circle rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 w-full max-w-4xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                            Empecemos tu Cotización
                        </h2>
                        <div className="h-1 w-20 bg-brand-yellow mx-auto rounded-full" />
                    </div>

                    <div className="bg-brand-black/50 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl relative min-h-[500px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8 flex-grow flex flex-col justify-center"
                            >
                                {!hasDesign && hasDesign !== false && (
                                    <div className="text-center space-y-8">
                                        <h3 className="text-white font-bold text-2xl md:text-3xl">¿Tienes el diseño listo?</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                                            <button
                                                onClick={() => setHasDesign(true)}
                                                className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow hover:scale-105 transition-all group duration-300"
                                            >
                                                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                                    <Check size={40} />
                                                </div>
                                                <span className="text-white font-black text-2xl block mb-2">SÍ, LO TENGO</span>
                                                <span className="text-sm text-gray-400 group-hover:text-gray-200">Archivo listo para imprimir</span>
                                            </button>

                                            <button
                                                onClick={() => setHasDesign(false)}
                                                className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500 hover:scale-105 transition-all group duration-300"
                                            >
                                                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                    <Calculator size={40} />
                                                </div>
                                                <span className="text-white font-black text-2xl block mb-2">NO LO TENGO</span>
                                                <span className="text-sm text-gray-400 group-hover:text-gray-200">Necesito servicio de diseño</span>
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
                                                href={`${PIGMENTO_DATA.contact.whatsappUrl}?text=Hola! No tengo diseño y necesito ayuda para crear mis stickers.`}
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

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
                                            <button
                                                onClick={() => { setProjectType('printed'); setCurrentStep(1); }}
                                                className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow hover:scale-105 transition-all group text-left relative overflow-hidden h-[300px] flex flex-col justify-end"
                                            >
                                                <img src="/project-types/printed-stickers.png" alt="Printed Stickers" className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 group-hover:opacity-80 transition-opacity" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-[1]" />
                                                {/* Placeholder Image Overlay could go here */}

                                                <div className="relative z-10">
                                                    <div className="w-12 h-12 rounded-full bg-brand-yellow text-black flex items-center justify-center mb-4 font-bold">
                                                        <Check size={24} />
                                                    </div>
                                                    <span className="text-white font-black text-2xl block mb-2 uppercase">Impresos Full Color</span>
                                                    <p className="text-sm text-gray-300 leading-relaxed">
                                                        Vinilo adhesivo impreso en alta resolución. Ideales para ilustraciones, fotos y logotipos complejos.
                                                    </p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setProjectType('cut');
                                                    // setCurrentStep(1); 
                                                }}
                                                className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500 hover:scale-105 transition-all group text-left relative overflow-hidden h-[300px] flex flex-col justify-end"
                                            >
                                                <img src="/project-types/cut-vinyl.png" alt="Cut Vinyl" className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 group-hover:opacity-80 transition-opacity" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-[1]" />

                                                <div className="relative z-10">
                                                    <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center mb-4 font-bold">
                                                        <Calculator size={24} />
                                                    </div>
                                                    <span className="text-white font-black text-2xl block mb-2 uppercase">Vinilo de Corte</span>
                                                    <p className="text-sm text-gray-300 leading-relaxed">
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
        <section id="cotizador" className="w-full relative min-h-screen flex flex-col justify-center bg-brand-black overflow-hidden py-8 md:py-12 scroll-mt-0">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-yellow/5 blurred-circle rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 blurred-circle rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                {/* Header Compacto */}
                <div className="text-center mb-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
                        Cotiza tus <span className="text-brand-yellow">Stickers</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto">
                        Personaliza cada detalle. Desde el corte hasta el material.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-xl mx-auto h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-brand-yellow transition-all duration-500"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT COLUMN: WIZARD */}
                    <div className="lg:col-span-2">
                        <div className="bg-brand-black/50 backdrop-blur-md rounded-3xl border border-white/10 p-5 md:p-6 shadow-2xl relative flex flex-col justify-between">

                            <AnimatePresence mode="wait">
                                {/* STEP 0: INITIAL DECISIONS */}
                                {currentStep === 0 && (
                                    <motion.div
                                        key="step0"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6 flex-grow flex flex-col justify-center min-h-[400px]"
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
                                                        href={`${PIGMENTO_DATA.contact.whatsappUrl}?text=Hola! No tengo diseño y necesito ayuda para crear mis stickers.`}
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
                                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                                            <div>
                                                <h3 className="text-white font-bold text-lg">Tipo de Corte</h3>
                                                <p className="text-xs text-gray-400">Paso 1/4</p>
                                            </div>
                                            <div className="text-xs text-gray-500 max-w-[200px] text-right">
                                                ¿Cómo quieres recibir tus stickers?
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {CUT_TYPES.map((c) => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => setCutType(c)}
                                                    className={`relative h-64 rounded-2xl text-left border transition-all overflow-hidden group flex flex-col justify-end p-4 ${cutType.id === c.id ? 'border-brand-yellow ring-2 ring-brand-yellow/50' : 'border-white/10 hover:border-white/40'}`}
                                                >
                                                    {/* Background Image */}
                                                    <div className="absolute inset-0 z-0">
                                                        <img
                                                            src={c.imageSrc}
                                                            alt={c.name}
                                                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${cutType.id === c.id ? 'scale-105' : 'scale-100 opacity-60 group-hover:opacity-80'}`}
                                                        />
                                                        <div className={`absolute inset-0 bg-gradient-to-t via-black/50 to-transparent ${cutType.id === c.id ? 'from-brand-black/90' : 'from-black/90'}`} />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="relative z-10">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className={`font-bold text-lg block ${cutType.id === c.id ? 'text-brand-yellow' : 'text-white'}`}>{c.name}</span>
                                                            {cutType.id === c.id && <div className="bg-brand-yellow text-black rounded-full p-1"><Check size={14} strokeWidth={3} /></div>}
                                                        </div>
                                                        <p className={`text-xs leading-relaxed ${cutType.id === c.id ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'}`}>
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
                                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                                            <div>
                                                <h3 className="text-white font-bold text-lg">Material Base</h3>
                                                <p className="text-xs text-gray-400">Paso 2/4</p>
                                            </div>
                                            <div className="text-xs text-gray-500 max-w-[200px] text-right">
                                                Elige el sustrato. El acabado se elige después.
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pb-0">
                                            {MATERIALS_CONFIG.map((m) => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => setMaterial(m)}
                                                    className={`w-full p-2.5 rounded-xl text-left border transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[100px] ${material.id === m.id ? 'border-brand-yellow shadow-[0_0_15px_rgba(230,194,0,0.4)] ring-1 ring-brand-yellow' : 'border-white/10 hover:border-white/40'}`}
                                                >
                                                    {/* Background Image */}
                                                    <div className="absolute inset-0 z-0">
                                                        <img
                                                            src={m.imageSrc}
                                                            alt={m.name}
                                                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${material.id === m.id ? 'scale-110' : 'scale-100 opacity-60 group-hover:opacity-80'}`}
                                                        />
                                                        <div className={`absolute inset-0 bg-gradient-to-t via-black/50 to-black/30 ${material.id === m.id ? 'from-brand-black/90' : 'from-black/80'}`} />
                                                    </div>

                                                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-start mb-0.5">
                                                                <span className={`font-bold text-xs block leading-tight pr-4 ${material.id === m.id ? 'text-brand-yellow' : 'text-white'}`}>{m.name}</span>
                                                                {material.id === m.id && <div className="bg-brand-yellow text-black rounded-full p-0.5 scale-75"><Check size={10} strokeWidth={3} /></div>}
                                                            </div>
                                                            <span className="text-[9px] font-mono px-1 py-0 rounded inline-block bg-black/40 text-gray-300 backdrop-blur-sm border border-white/10">
                                                                {m.sheetSize.width}x{m.sheetSize.height}cm
                                                            </span>
                                                        </div>
                                                        <p className={`text-[9px] leading-tight line-clamp-1 opacity-80 ${material.id === m.id ? 'text-gray-200' : 'text-gray-400'}`}>
                                                            {m.description}
                                                        </p>
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
                                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                                            <div>
                                                <h3 className="text-white font-bold text-lg">Detalles Finales</h3>
                                                <p className="text-xs text-gray-400">Paso 3/4</p>
                                            </div>
                                            <div className="text-xs text-gray-500 max-w-[200px] text-right">
                                                Acabado, medidas y cantidad.
                                            </div>
                                        </div>

                                        {/* LAMINATE SELECTION (Always Required) */}
                                        <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <label className="block text-sm font-bold text-brand-yellow mb-2 uppercase tracking-wider">
                                                Acabado / Laminado
                                            </label>
                                            <p className="text-xs text-gray-400 mb-3">Todos nuestros stickers incluyen laminado para mayor durabilidad.</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={() => setLaminate('brillante')}
                                                    className={`p-3 rounded-xl border text-center transition-all ${laminate === 'brillante' ? 'bg-white text-black border-white font-bold' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                                                >
                                                    Brillante (Glossy)
                                                </button>
                                                <button
                                                    onClick={() => setLaminate('mate')}
                                                    className={`p-3 rounded-xl border text-center transition-all ${laminate === 'mate' ? 'bg-white text-black border-white font-bold' : 'border-white/20 text-gray-400 hover:border-white/50'}`}
                                                >
                                                    Mate (Matte)
                                                </button>
                                            </div>
                                        </div>

                                        {/* DIMENSIONS */}
                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                            <label className="block text-sm font-bold text-white mb-4">Medidas del Sticker (cm)</label>
                                            <div className="flex gap-4 items-center">
                                                <div className="flex-1">
                                                    <span className="text-xs text-gray-500 mb-1 block">Ancho</span>
                                                    <input type="number" value={widthCm} onChange={(e) => setWidthCm(Number(e.target.value))}
                                                        className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white font-bold text-xl focus:border-brand-yellow outline-none transition-colors text-center" />
                                                </div>
                                                <span className="text-gray-500 pt-5 text-xl">x</span>
                                                <div className="flex-1">
                                                    <span className="text-xs text-gray-500 mb-1 block">Alto</span>
                                                    <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))}
                                                        className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white font-bold text-xl focus:border-brand-yellow outline-none transition-colors text-center" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* SHEET QUANTITY */}
                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                            <label className="block text-sm font-bold text-white mb-4">Cantidad de Láminas</label>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3 bg-black/30 p-2 rounded-xl border border-white/10">
                                                    <button onClick={() => setSheetQuantity(Math.max(1, sheetQuantity - 1))} className="p-3 hover:bg-white/10 rounded-lg text-white transition-colors gap-2 flex items-center"><ArrowRight className="rotate-180" size={20} /></button>
                                                    <span className="text-3xl font-black text-white w-16 text-center tabular-nums">{sheetQuantity}</span>
                                                    <button onClick={() => setSheetQuantity(sheetQuantity + 1)} className="p-3 hover:bg-white/10 rounded-lg text-white transition-colors"><ArrowRight size={20} /></button>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-400">Área útil por lámina</div>
                                                    <div className="font-mono text-brand-yellow">{material.sheetSize.width}x{material.sheetSize.height}cm</div>
                                                </div>
                                            </div>
                                        </div>
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
                                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                                            <div>
                                                <h3 className="text-white font-bold text-lg">Finalizar</h3>
                                                <p className="text-xs text-gray-400">Paso 4/4</p>
                                            </div>
                                            <div className="text-xs text-gray-500 max-w-[200px] text-right">
                                                Organización y descuento.
                                            </div>
                                        </div>

                                        {/* ORGANIZACION ARCHIVOS */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Organización del Archivo</label>
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => setOrganizationMode('manual')}
                                                    className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between group ${organizationMode === 'manual' ? 'border-brand-yellow bg-brand-yellow/10 text-brand-yellow' : 'border-white/10 hover:border-white/30 text-gray-300'}`}
                                                >
                                                    <div>
                                                        <span className="font-bold block text-base">Quiero organizar mi Canvas (Manual)</span>
                                                        <span className="text-xs opacity-70">Yo acomodo los stickers en el área.</span>
                                                    </div>
                                                    {organizationMode === 'manual' && <Check size={20} />}
                                                </button>
                                                <button
                                                    onClick={() => setOrganizationMode('auto')}
                                                    className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between group ${organizationMode === 'auto' ? 'border-brand-yellow bg-brand-yellow/10 text-brand-yellow' : 'border-white/10 hover:border-white/30 text-gray-300'}`}
                                                >
                                                    <div>
                                                        <span className="font-bold block text-base">Que Pigmento lo organice (Auto)</span>
                                                        <span className="text-xs opacity-70">Envío mi archivo y ustedes lo distribuyen.</span>
                                                    </div>
                                                    {organizationMode === 'auto' && <Check size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* CUPON DESCUENTO */}
                                        <div className="mb-6">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">¿Tienes un cupón?</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={coupon}
                                                    onChange={(e) => setCoupon(e.target.value)}
                                                    placeholder="Ingresa código de descuento"
                                                    className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:border-brand-yellow outline-none transition-all"
                                                />
                                                {coupon && <div className="absolute right-3 top-3 text-green-500"><Check size={20} /></div>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation ButtonsContainer - Compacted */}
                            {currentStep > 0 && (
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
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
                                            disabled={currentStep === 3 && material.finishOptions && !laminate}
                                            className={`bg-white text-black hover:bg-gray-200 font-bold px-5 py-2 rounded-xl flex items-center gap-2 transition-all text-sm ${currentStep === 3 && material.finishOptions && !laminate ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            Siguiente <ArrowRight size={16} />
                                        </button>
                                    ) : (
                                        <a
                                            href={`${PIGMENTO_DATA.contact.whatsappUrl}?text=Hola! Quiero ${sheetQuantity} láminas de ${material.name} ${laminate ? `(Acabado ${laminate})` : ''} (${material.sheetSize.width}x{material.sheetSize.height}cm). Stickers de ${widthCm}x${heightCm}cm. Corte: ${cutType.name}. Modo: ${organizationMode === 'manual' ? 'Manual' : 'Ustedes organizan'}. ${coupon ? `Cupón: ${coupon}` : ''}`}
                                            target="_blank"
                                            className={`bg-brand-yellow hover:bg-brand-yellow/90 text-black font-black px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20 text-sm ${!organizationMode ? 'opacity-50 pointer-events-none' : ''}`}
                                        >
                                            Enviar a Producción <ArrowRight size={18} />
                                        </a>
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
                                <div className="text-right text-[10px] text-gray-500">por lámina</div>

                                <div className="h-px bg-white/10 my-3"></div>

                                <div className="flex justify-between items-center">
                                    <span className="text-white text-sm font-bold">Total ({sheetQuantity} láminas)</span>
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
                                            discountedPrice > 0 ? (
                                                <>
                                                    <span className="block text-xs line-through text-gray-600 decoration-red-500">${totalPrice.toLocaleString()}</span>
                                                    <span className="text-3xl font-black text-brand-yellow">${discountedPrice.toLocaleString()}</span>
                                                </>
                                            ) : (
                                                <span className="text-3xl font-black text-white">${totalPrice.toLocaleString()}</span>
                                            )
                                        ) : (
                                            <span className="text-3xl font-black text-gray-700">---</span>
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
