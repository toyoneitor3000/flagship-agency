"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileType2, Upload, X, Loader2, Zap, Check, Image as ImageIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function VectorizacionApp() {
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
            if (selected.size > 10 * 1024 * 1024) {
                alert("La imagen debe ser menor a 10MB.");
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
                }
            }

            const orderInstructions = `[NUEVO PEDIDO DE VECTORIZACIÓN]
Detalles del cliente: ${idea}
Archivo original adjunto: ${fileUrl ? `https://pigmentostckrs.com${fileUrl}` : 'No se adjuntó archivo. Contactar al cliente.'}
`;

            const designItem = {
                id: Date.now(),
                name: "Servicio de Vectorización",
                price: 75000,
                displayPrice: "$75.000",
                image: imagePreview || "/images/design/vector.png",
                category: "Solución Técnica",
                description: `Detalles: ${idea}`,
                features: [
                    "Redibujo Vectorial Preciso",
                    "Limpieza de Nodos y Curvas",
                    "Entregables: .AI, .PDF, .EPS, .SVG"
                ],
                fileUrl: orderInstructions,
                fileName: "instrucciones_vectorizacion.txt"
            };

            addItem(designItem, 1);
            navigateStep(4); // Success step

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
                        <span className="bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 px-4 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase">
                            Solución Técnica
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
                            RECUPERA TU <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">CALIDAD.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed">
                            Vectorizamos tus logos o imágenes pixeladas. Obten archivos perfectamente escalables para usos de gran formato sin perder calidad.
                        </p>
                        <div className="flex flex-col w-full max-w-sm gap-4 pt-4">
                            <button onClick={() => navigateStep(1)} className="flex items-center justify-center gap-3 bg-brand-yellow text-brand-black w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-yellow/20">
                                <FileType2 size={20} /> Empezar Proceso <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div key="step-1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">LA NECESIDAD</h2>
                            <p className="text-gray-400 font-medium">¿Para qué necesitas este archivo vectorizado?</p>
                        </div>
                        <textarea
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder="Ej. Tengo este logo viejo y quiero imprimirlo en un pendón gigante de 3 metros..."
                            className="w-full bg-black/50 border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all min-h-[220px] text-lg resize-none shadow-inner"
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
                            <h2 className="text-3xl font-black italic uppercase">EL ARCHIVO ORIGINAL</h2>
                            <p className="text-gray-400 font-medium">Sube la imagen, foto o logo pixelado.</p>
                        </div>

                        {!imagePreview ? (
                            <div className="relative border-2 border-dashed border-white/10 rounded-3xl hover:border-brand-yellow/50 hover:bg-white/5 transition-all group overflow-hidden h-[320px]">
                                <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                <div className="flex flex-col items-center justify-center h-full pointer-events-none">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-yellow/20 transition-all shadow-xl">
                                        <Upload className="w-10 h-10 text-gray-400 group-hover:text-brand-yellow transition-colors" />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-brand-yellow transition-colors">Toca para subir archivo</span>
                                    <span className="text-[10px] text-gray-600 mt-2 font-bold uppercase tracking-widest">JPG, PNG o PDF ligero</span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl h-[320px]">
                                <img src={imagePreview} alt="Reference Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                    <button onClick={handleRemoveFile} className="bg-red-500 text-white p-5 rounded-full transition-transform hover:scale-110 mb-4 shadow-xl">
                                        <X className="w-8 h-8" />
                                    </button>
                                    <span className="text-xs font-bold uppercase tracking-widest text-white">Remover Archivo</span>
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
                            <p className="text-gray-400 font-medium">Verifica tu pedido.</p>
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
                                    <h3 className="font-bold text-xl mb-1">Vectorización</h3>
                                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4 italic">"{idea}"</p>
                                    <div className="text-3xl font-black text-brand-yellow">$75.000 <span className="text-xs text-gray-500 font-bold tracking-widest uppercase ml-2 align-middle">Precio Fijo</span></div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/10">
                                {["Redibujo Vectorial Preciso", "Limpieza de Nodos y Curvas", "Entregables: .AI, .PDF, .EPS, .SVG"].map((feat, i) => (
                                    <div key={i} className="flex flex-row items-center gap-4">
                                        <div className="bg-brand-yellow/20 text-brand-yellow p-1.5 rounded-lg border border-brand-yellow/20">
                                            <Check size={16} strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => navigateStep(2)} disabled={isUploading} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10 disabled:opacity-50">Atrás</button>
                            <button onClick={handleAddToCart} disabled={isUploading} className="flex-[2] bg-brand-yellow hover:bg-white hover:scale-105 text-brand-black font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-[0_0_30px_rgba(255,214,0,0.3)] disabled:opacity-50 flex items-center justify-center gap-2">
                                {isUploading ? <><Loader2 className="w-6 h-6 animate-spin" /> Procesando...</> : <><Zap size={20} className="fill-brand-black" /> Añadir al Carrito</>}
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
                            Tu solicitud de vectorización está en el carrito. Finaliza la compra y nuestro equipo comenzará a trabajar en tu arte.
                        </p>
                        <div className="flex flex-col w-full max-w-sm gap-4">
                            <button onClick={() => { if (!isCartOpen) toggleCart() }} className="bg-white text-black font-black py-5 w-full rounded-2xl uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-white/10">
                                Ver Carrito Ahora
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/cotizador" className="bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center hover:scale-105">
                                    Cotizar Impresión
                                </Link>
                                <Link href="/diseno" className="bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center hover:scale-105">
                                    Ver Más Servicios
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
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />

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
