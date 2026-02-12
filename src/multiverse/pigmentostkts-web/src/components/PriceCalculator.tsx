"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Check, AlertCircle, Plus, Minus, Shield, CheckCircle2, Palette } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { uploadFiles } from "@/lib/uploadthing";

// Configuración de Materiales
interface MaterialPricing {
    sc_laminate: number;
    cc_laminate: number;
    hybrid_laminate?: number;
    sc_laminate_60?: number;
    cc_laminate_60?: number;
    hybrid_laminate_60?: number;
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
        sheetSize: { width: 99, height: 99 },
        pricing: { sc_laminate: 129900, cc_laminate: 134900, hybrid_laminate: 145000 },
        imageSrc: '/materials/blanco-brillante.png',
        finishOptions: true,
        requiresLaminate: true
    },
    {
        id: 'vinilo-transparente',
        name: 'Vinilo Transparente',
        description: 'Fondo invisible. Ideal para vidrio o superficies claras.',
        sheetSize: { width: 99, height: 99 },
        pricing: { sc_laminate: 129900, cc_laminate: 134900, hybrid_laminate: 145000 },
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
        pricing: { sc_laminate: 190900, cc_laminate: 195900, hybrid_laminate: 205000, sc_laminate_60: 149900, cc_laminate_60: 149900, hybrid_laminate_60: 149900 },
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
        pricing: { sc_laminate: 195000, cc_laminate: 200000, hybrid_laminate: 210000, sc_laminate_60: 149900, cc_laminate_60: 149900, hybrid_laminate_60: 149900 },
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
        pricing: { sc_laminate: 195000, cc_laminate: 200000, hybrid_laminate: 210000, sc_laminate_60: 149900, cc_laminate_60: 149900, hybrid_laminate_60: 149900 },
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
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_60: 149900, cc_laminate_60: 149900, hybrid_laminate_60: 149900 },
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
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_60: 149900, cc_laminate_60: 149900, hybrid_laminate_60: 149900 },
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
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_60: 149900, cc_laminate_60: 149900, hybrid_laminate_60: 149900 },
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
        pricing: { sc_laminate: 165000, cc_laminate: 170000, hybrid_laminate: 180000, sc_laminate_60: 149900, cc_laminate_60: 149900, hybrid_laminate_60: 149900 },
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
    const { addItem, toggleCart } = useCart();

    // States
    const [currentStep, setCurrentStep] = useState(0);
    const [hasDesign, setHasDesign] = useState<boolean | null>(null);
    const [projectType, setProjectType] = useState<'printed' | 'cut' | 'cubreplacas' | null>(null);

    // Cubreplacas States
    const [cubreplacasBase, setCubreplacasBase] = useState<'negro' | 'ppf' | 'fibra' | 'especial' | 'impreso'>('negro');
    const [cubreplacasFinish, setCubreplacasFinish] = useState<'brillante' | 'mate'>('mate');
    const [cubreplacasColor, setCubreplacasColor] = useState('#ff0000');

    // Sticker States
    const [material, setMaterial] = useState(MATERIALS_CONFIG[0]);
    const [materialWidth, setMaterialWidth] = useState<120 | 60>(120);
    const [laminate, setLaminate] = useState<'brillante' | 'mate' | null>('brillante');
    const [cutType, setCutType] = useState(CUT_TYPES[0]);
    const [widthCm, setWidthCm] = useState(5);
    const [heightCm, setHeightCm] = useState(5);
    const [sheetQuantity, setSheetQuantity] = useState(1);

    // Upload & Feedback
    const [isUploading, setIsUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    // Calculated Results
    const [stickersPerSheet, setStickersPerSheet] = useState(0);
    const [totalStickers, setTotalStickers] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [volumeDiscountPct, setVolumeDiscountPct] = useState(0);
    const [volumeDiscountedPrice, setVolumeDiscountedPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    // Hash Logic
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === '#cubreplacas') {
                setHasDesign(true);
                setProjectType('cubreplacas');
                setCurrentStep(1);
                const calculatorSection = document.getElementById('cotizador');
                if (calculatorSection) {
                    calculatorSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (window.location.hash === '#calculator') {
                // Reset flow
            }
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

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

        const activeSheetSize = (material.hasWidthOptions && materialWidth === 60 && material.alternativeSheetSize)
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
        const is60cm = material.hasWidthOptions && materialWidth === 60;
        const p = material.pricing;

        if (cutType.id === 'hybrid') {
            pricePerSheet = is60cm ? (p.hybrid_laminate_60 || 149900) : (p.hybrid_laminate || p.cc_laminate);
        } else if (cutType.id === 'sc') {
            pricePerSheet = is60cm ? (p.sc_laminate_60 || 149900) : p.sc_laminate;
        } else {
            pricePerSheet = is60cm ? (p.cc_laminate_60 || 149900) : p.cc_laminate;
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
            <section id="cotizador" className="w-full relative min-h-dvh flex flex-col justify-center bg-brand-black overflow-hidden py-8 md:py-16 scroll-mt-0">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10 w-full max-w-4xl">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                            Empecemos tu Cotización
                        </h2>
                        <div className="h-1 w-16 bg-brand-yellow mx-auto rounded-full shadow-[0_0_10px_rgba(230,194,0,0.5)]" />
                    </div>

                    <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative flex flex-col justify-center overflow-hidden min-h-[400px]">
                        <div className="space-y-4 sm:space-y-8 flex-grow flex flex-col justify-center">
                            {!hasDesign && hasDesign !== false && (
                                <div className="text-center space-y-4 sm:space-y-8">
                                    <h3 className="text-white font-bold text-lg sm:text-3xl">¿Tienes el diseño listo?</h3>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-6 max-w-2xl mx-auto w-full">
                                        <button onClick={() => setHasDesign(true)} className="p-4 sm:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow transition-all group">
                                            <Check className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-white group-hover:text-brand-yellow" />
                                            <span className="text-white font-black text-xs sm:text-2xl block">SÍ, LO TENGO</span>
                                        </button>
                                        <button onClick={() => setHasDesign(false)} className="p-4 sm:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500 transition-all group">
                                            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-white group-hover:text-blue-500" />
                                            <span className="text-white font-black text-xs sm:text-2xl block">NO LO TENGO</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {hasDesign === false && (
                                <div className="text-center space-y-6">
                                    <h3 className="text-white font-bold text-2xl">¡Te ayudamos a diseñar!</h3>
                                    <p className="text-gray-300">Servicio de Diseño desde $75,000 COP</p>
                                    <div className="flex gap-4 justify-center">
                                        <button onClick={() => setHasDesign(null)} className="text-gray-400 hover:text-white underline">Volver</button>
                                        <a href={`${PIGMENTO_DATA.contact.whatsappUrl}?text=Hola! Necesito diseño.`} target="_blank" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2">
                                            Solicitar Diseño <ArrowRight size={18} />
                                        </a>
                                    </div>
                                </div>
                            )}

                            {hasDesign === true && !projectType && (
                                <div className="text-center space-y-6">
                                    <h3 className="text-white font-bold text-2xl">¿Qué buscas hoy?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <button onClick={() => { setProjectType('printed'); setCurrentStep(1); }} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-yellow/10 hover:border-brand-yellow transition-all">
                                            <span className="text-white font-bold block mb-1">IMPRESOS FULL COLOR</span>
                                            <span className="text-xs text-gray-400">Illustraciones, fotos, logos</span>
                                        </button>
                                        <button onClick={() => { setProjectType('cut'); }} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500 transition-all">
                                            <span className="text-white font-bold block mb-1">VINILO DE CORTE</span>
                                            <span className="text-xs text-gray-400">Colores sólidos, troquelados</span>
                                        </button>
                                        <button onClick={() => { setProjectType('cubreplacas'); setCurrentStep(1); }} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500 transition-all">
                                            <span className="text-white font-bold block mb-1">CUBREPLACAS PREMIUM</span>
                                            <span className="text-xs text-gray-400">Protección y estilo</span>
                                        </button>
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
                    </div>
                </div>
            </section>
        );
    }

    const progress = (currentStep / 4) * 100;

    return (
        <section id="cotizador" className="w-full relative min-h-dvh flex flex-col justify-center bg-brand-black overflow-hidden py-8 md:py-16 scroll-mt-0">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        {projectType === 'cubreplacas' ? <>Cotiza tus <span className="text-red-500">Cubreplacas</span></> : <>Cotiza tus <span className="text-brand-yellow">Stickers</span></>}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <div className="bg-brand-black/50 backdrop-blur-md rounded-3xl border border-white/10 p-6 shadow-2xl relative">
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
                                            <div className="grid grid-cols-3 gap-4">
                                                {CUT_TYPES.map(c => (
                                                    <button key={c.id} onClick={() => setCutType(c)} className={`p-4 rounded-xl border ${cutType.id === c.id ? 'border-brand-yellow' : 'border-white/10'}`}>
                                                        <img src={c.imageSrc} alt={c.name} className="w-full h-20 object-contain mb-2" />
                                                        <span className="text-white font-bold text-xs">{c.name}</span>
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
                                            <div className="grid grid-cols-3 gap-2">
                                                {MATERIALS_CONFIG.map(m => (
                                                    <button key={m.id} onClick={() => setMaterial(m)} className={`p-2 rounded-xl border ${material.id === m.id ? 'border-brand-yellow' : 'border-white/10'}`}>
                                                        <img src={m.imageSrc} className="w-full h-16 object-cover mb-2 rounded" />
                                                        <span className="text-white text-[10px] block">{m.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                                        <h3 className="text-white font-bold text-lg mb-4">{projectType === 'cubreplacas' ? 'Carga de Logo' : 'Detalles'}</h3>

                                        {projectType === 'cubreplacas' ? (
                                            <div className="space-y-4">
                                                {fileUrl ? (
                                                    <div className="bg-green-500/10 border border-green-500 p-4 rounded-xl flex justify-between items-center">
                                                        <span className="text-white text-sm">{fileName}</span>
                                                        <button onClick={() => { setFileUrl(null); setFileName(null); }} className="text-red-500 text-xs">Cambiar</button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <button onClick={() => {
                                                            const input = document.createElement('input');
                                                            input.type = 'file';
                                                            input.onchange = async (e) => {
                                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                                if (file) {
                                                                    setIsUploading(true);
                                                                    const res = await uploadFiles("stickerUploader", { files: [file] });
                                                                    setFileUrl(res[0].url);
                                                                    setFileName(file.name);
                                                                    setIsUploading(false);
                                                                }
                                                            };
                                                            input.click();
                                                        }} className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200">
                                                            {isUploading ? 'Subiendo...' : 'SUBIR LOGO'}
                                                        </button>
                                                        <button onClick={() => { alert('Redirigiendo a diseño...'); window.location.href = '/#design'; }} className="text-gray-500 text-xs underline block mx-auto">No tengo logo</button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {/* Sticker Dimensions Logic omitted for brevity, keeping simple for fix */}
                                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                    <label className="text-white text-xs block mb-2">Medidas (cm)</label>
                                                    <div className="flex gap-4">
                                                        <input type="number" value={widthCm} onChange={e => setWidthCm(Number(e.target.value))} className="bg-black/50 border border-white/20 text-white p-2 rounded w-full" />
                                                        <span className="text-white self-center">x</span>
                                                        <input type="number" value={heightCm} onChange={e => setHeightCm(Number(e.target.value))} className="bg-black/50 border border-white/20 text-white p-2 rounded w-full" />
                                                    </div>
                                                </div>
                                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                    <label className="text-white text-xs block mb-2">Cantidad (Hojas)</label>
                                                    <div className="flex items-center gap-4">
                                                        <button onClick={() => setSheetQuantity(Math.max(1, sheetQuantity - 1))} className="text-white bg-white/10 p-2 rounded">-</button>
                                                        <span className="text-white font-bold text-xl">{sheetQuantity}</span>
                                                        <button onClick={() => setSheetQuantity(sheetQuantity + 1)} className="text-white bg-white/10 p-2 rounded">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {currentStep === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                                        <h3 className="text-white font-bold text-lg mb-4">Resumen Final</h3>
                                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                                            <p className="text-gray-400 text-sm mb-2">Total Estimado</p>
                                            <p className="text-4xl font-black text-brand-yellow">${totalPrice.toLocaleString()}</p>

                                            <Button onClick={() => {
                                                addItem({
                                                    id: Date.now(),
                                                    name: projectType === 'cubreplacas' ? 'Cubreplacas Custom' : `${material.name} (${cutType.name})`,
                                                    price: discountedPrice,
                                                    displayPrice: discountedPrice.toLocaleString(),
                                                    image: projectType === 'cubreplacas' ? '/brand/logo.png' : material.imageSrc,
                                                    category: projectType === 'cubreplacas' ? 'Cubreplacas' : 'Stickers',
                                                    description: projectType === 'cubreplacas' ? `${cubreplacasBase} / ${cubreplacasFinish}` : `${widthCm}x${heightCm}cm | ${sheetQuantity} hojas`,
                                                    features: projectType === 'cubreplacas' ? [`Base: ${cubreplacasBase}`, `Acabado: ${cubreplacasFinish}`] : [`Material: ${material.name}`, `Corte: ${cutType.name}`],
                                                    fileUrl: fileUrl || undefined
                                                });
                                                if (toggleCart) toggleCart();
                                            }} className="w-full mt-6 bg-brand-yellow text-black font-bold h-12 text-lg">
                                                AGREGAR AL CARRITO
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation */}
                            {currentStep > 0 && (
                                <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
                                    <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="text-gray-400 hover:text-white flex items-center gap-2">
                                        <ArrowRight className="rotate-180" size={16} /> Atrás
                                    </button>
                                    {currentStep < 4 && (
                                        <button onClick={() => setCurrentStep(currentStep + 1)} className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 flex items-center gap-2">
                                            Siguiente <ArrowRight size={16} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="hidden lg:block">
                        <div className="bg-white/5 rounded-3xl border border-white/10 p-6 sticky top-24">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Calculator size={20} /> Resumen</h3>
                            <div className="space-y-4 text-sm text-gray-300">
                                <div className="flex justify-between">
                                    <span>Proyecto:</span>
                                    <span className="text-white font-bold uppercase">{projectType || '---'}</span>
                                </div>
                                {projectType === 'cubreplacas' ? (
                                    <>
                                        <div className="flex justify-between">
                                            <span>Base:</span>
                                            <span className="text-white">{cubreplacasBase}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Acabado:</span>
                                            <span className="text-white">{cubreplacasFinish}</span>
                                        </div>
                                        <div className="flex justify-between pt-4 border-t border-white/10">
                                            <span>Precio:</span>
                                            <span className="text-brand-yellow font-bold text-lg">${totalPrice.toLocaleString()}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between">
                                            <span>Material:</span>
                                            <span className="text-white">{material.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Corte:</span>
                                            <span className="text-white">{cutType.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Cantidad:</span>
                                            <span className="text-white">{sheetQuantity} hojas</span>
                                        </div>
                                        <div className="flex justify-between pt-4 border-t border-white/10">
                                            <span>Total:</span>
                                            <span className="text-brand-yellow font-bold text-lg">${totalPrice.toLocaleString()}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
