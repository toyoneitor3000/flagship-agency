"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Paintbrush, Upload, X, Loader2, Zap, Check, Image as ImageIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function StickerDesignApp() {
    const { addItem, isCartOpen, toggleCart } = useCart();

    // Form state
    const [idea, setIdea] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Wizard state
    const [[page, direction], setPage] = useState([0, 0]);
    const step = page;

    const navigateStep = (newStep: number) => {
        setPage([newStep, newStep > page ? 1 : -1]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            if (selected.size > 5 * 1024 * 1024) {
                alert("La imagen debe ser menor a 5MB.");
                return;
            }
            setFile(selected);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(selected);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setImagePreview(null);
    };

    const handleAddToCart = async () => {
        if (!idea.trim()) return;

        setIsUploading(true);
        try {
            let fileUrl = "";
            let fileName = "";

            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    fileUrl = data.fileUrl;
                    fileName = data.fileName;
                }
            }

            const orderInstructions = `[NUEVO PEDIDO DE DISEÑO]
Concepto: ${idea}
Restricciones de Estilo: Arte vectorial, colores planos y limpios, trazo/contorno blanco grueso, aislado en fondo gris sólido, adaptable para corte completo o troquelado, alto contraste, tipografía vibrante (si aplica).
Referencia visual: ${fileUrl ? `Utilizar la sujeto y composición básica de esta referencia: https://pigmentostckrs.com${fileUrl}` : 'No se subió referencia, depender puramente del concepto.'}
`;

            const designItem = {
                id: Date.now(),
                name: "Diseño Artístico Personalizado",
                price: 35000,
                displayPrice: "$35.000",
                image: imagePreview || "/images/design/stickers_alt.png",
                category: "Servicio Premium",
                description: `Idea: ${idea}`,
                features: [
                    "Propuesta Creativa Inicial",
                    "Diseño 100% Original",
                    "Archivos para Imprimir (.PDF, .PNG)"
                ],
                fileUrl: orderInstructions,
                fileName: "instrucciones_diseno.txt"
            };

            addItem(designItem, 1);
            navigateStep(4); // Success step

            // Only toggle if cart isn't already open ( addItem opens it but if we want to delay we check )
            setTimeout(() => {
                if (!isCartOpen) {
                    toggleCart();
                }
            }, 1500);

        } catch (error) {
            alert("Hubo un error. Por favor, intenta de nuevo.");
        } finally {
            setIsUploading(false);
        }
    };

    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0, scale: 0.95 }),
        center: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: (direction: number) => ({ x: direction < 0 ? 40 : -40, opacity: 0, scale: 0.95, transition: { type: "spring", stiffness: 300, damping: 30 } })
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <motion.div key="step-0" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
                        <span className="bg-pink-500/10 text-pink-500 border border-pink-500/20 px-4 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase">
                            Servicio Premium
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
                            CREA TU <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-brand-yellow">DISEÑO.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed">
                            Guiados por ti, ilustrados por nosotros. Convierte cualquier idea en un diseño exclusivo listo para impresión de alta gama.
                        </p>
                        <div className="flex flex-col w-full max-w-sm gap-4 pt-4">
                            <button onClick={() => navigateStep(1)} className="flex items-center justify-center gap-3 bg-brand-yellow text-brand-black w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-yellow/20">
                                <Paintbrush size={20} /> Empezar Proceso <ArrowRight size={18} />
                            </button>
                            <Link href="/cotizador" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors py-2">
                                Solo necesito impresión
                            </Link>
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div key="step-1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">LA IDEA</h2>
                            <p className="text-gray-400 font-medium">Cuéntanos detalladamente qué quieres crear.</p>
                        </div>
                        <textarea
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder="Ej. Quiero un gato samurai con una espada de neón rosa, estilo cyberpunk vectorial..."
                            className="w-full bg-black/50 border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all min-h-[220px] text-lg resize-none shadow-inner"
                        />
                        <div className="flex gap-4">
                            <button onClick={() => navigateStep(0)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10">Atrás</button>
                            <button onClick={() => navigateStep(2)} disabled={!idea.trim()} className="flex-[2] bg-brand-yellow text-black font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-lg shadow-brand-yellow/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 hover:bg-white hover:scale-105">Siguiente <ArrowRight size={18} /></button>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key="step-2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">REFERENCIA <span className="text-pink-500 text-sm normal-case block mt-2">(Opcional)</span></h2>
                            <p className="text-gray-400 font-medium">Sube un boceto, foto o estilo que te guste.</p>
                        </div>

                        {!imagePreview ? (
                            <div className="relative border-2 border-dashed border-white/10 rounded-3xl hover:border-brand-yellow/50 hover:bg-white/5 transition-all group overflow-hidden h-[320px]">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                <div className="flex flex-col items-center justify-center h-full pointer-events-none">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-yellow/20 transition-all shadow-xl">
                                        <Upload className="w-10 h-10 text-gray-400 group-hover:text-brand-yellow transition-colors" />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-brand-yellow transition-colors">Toca para subir imagen</span>
                                    <span className="text-[10px] text-gray-600 mt-2 font-bold uppercase tracking-widest">Máximo 5MB</span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl h-[320px]">
                                <img src={imagePreview} alt="Reference Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                    <button onClick={handleRemoveFile} className="bg-red-500 text-white p-5 rounded-full transition-transform hover:scale-110 mb-4 shadow-xl">
                                        <X className="w-8 h-8" />
                                    </button>
                                    <span className="text-xs font-bold uppercase tracking-widest text-white">Remover Imagen</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button onClick={() => navigateStep(1)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10">Atrás</button>
                            <button onClick={() => navigateStep(3)} className="flex-[2] bg-brand-yellow text-black font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-lg shadow-brand-yellow/20 flex items-center justify-center gap-2 hover:bg-white hover:scale-105">Siguiente <ArrowRight size={18} /></button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div key="step-3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">RESUMEN</h2>
                            <p className="text-gray-400 font-medium">Verifica tu pedido de diseño.</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-md">
                            <div className="flex gap-6 items-start">
                                {imagePreview ? (
                                    <img src={imagePreview} className="w-24 h-24 rounded-2xl object-cover border border-white/10 shadow-lg" alt="Ref" />
                                ) : (
                                    <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <ImageIcon className="w-8 h-8 text-white/20" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl mb-1">Diseño Artístico</h3>
                                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4 italic">"{idea}"</p>
                                    <div className="text-3xl font-black text-brand-yellow">$35.000 <span className="text-xs text-gray-500 font-bold tracking-widest uppercase ml-2 align-middle">Precio Fijo</span></div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/10">
                                {["Propuesta Creativa Inicial", "Diseño Original Vectorial", "Archivos Finales para Imprimir"].map((feat, i) => (
                                    <div key={i} className="flex flex-row items-center gap-4">
                                        <div className="bg-pink-500/20 text-pink-500 p-1.5 rounded-lg border border-pink-500/20">
                                            <Check size={16} strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => navigateStep(2)} disabled={isUploading} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10 disabled:opacity-50">Atrás</button>
                            <button onClick={handleAddToCart} disabled={isUploading} className="flex-[2] bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105">
                                {isUploading ? <><Loader2 className="w-6 h-6 animate-spin" /> Procesando...</> : <><Zap size={20} className="fill-white" /> Añadir al Carrito</>}
                            </button>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div key="step-4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center space-y-8 max-w-xl mx-auto py-10">
                        <div className="w-28 h-28 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)] mb-4 border border-green-500/30">
                            <Check size={56} strokeWidth={3} />
                        </div>
                        <h2 className="text-5xl font-black italic uppercase">¡AÑADIDO!</h2>
                        <p className="text-gray-400 font-medium text-lg max-w-md leading-relaxed border-l-4 border-green-500/30 pl-4 py-2">
                            Tu solicitud de diseño está en el carrito. Finaliza la compra y nuestro equipo comenzará a trabajar en tu arte.
                        </p>
                        <div className="flex flex-col w-full max-w-sm gap-4">
                            <button onClick={() => { if (!isCartOpen) toggleCart() }} className="bg-white text-black font-black py-5 w-full rounded-2xl uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-white/10">
                                Ver Carrito Ahora
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/cotizador" className="bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center hover:scale-105">
                                    Impresión
                                </Link>
                                <Link href="/packs" className="bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center hover:scale-105">
                                    Packs
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <main data-theme="dark" className="min-h-screen bg-brand-black text-white flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background effects */}
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Interactive Wizard Space */}
            <div className="flex-1 container mx-auto px-6 max-w-4xl flex flex-col justify-center pt-32 pb-16 relative z-10">

                {/* Progress Indicators */}
                {step > 0 && step < 4 && (
                    <div className="flex items-center justify-center gap-3 mb-16">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= s ? 'bg-brand-yellow shadow-[0_0_15px_rgba(255,214,0,0.6)] scale-125' : 'bg-white/10'}`} />
                                {s < 3 && <div className={`w-12 md:w-20 h-[2px] mx-2 md:mx-4 transition-all duration-500 ${step > s ? 'bg-brand-yellow/50' : 'bg-white/10'}`} />}
                            </div>
                        ))}
                    </div>
                )}

                {/* Animated Form Content */}
                <div className="relative">
                    <AnimatePresence mode="wait" custom={direction}>
                        {renderStepContent()}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
