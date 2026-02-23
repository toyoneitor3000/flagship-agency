"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, Upload, X, Loader2, Zap, Check, Image as ImageIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function LogoEmpresarialApp() {
    const { addItem, isCartOpen, toggleCart } = useCart();

    // Form state
    const [vision, setVision] = useState("");
    const [audience, setAudience] = useState("");
    const [personality, setPersonality] = useState("");
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
        if (!vision.trim()) return;

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

            const orderInstructions = `[NUEVO PEDIDO DE BRANDING COMPLETO]
Visión y Empresa: ${vision}

Público Objetivo y Competencia: ${audience}

Personalidad y Voces de Marca: ${personality}

Inspiración/Moodboard Adjunto: ${fileUrl ? `https://pigmentostckrs.com${fileUrl}` : 'No se adjuntó archivo. Requiere ideación desde cero.'}
`;

            const designItem = {
                id: Date.now(),
                name: "Branding Completo",
                price: 650000,
                displayPrice: "$650.000",
                image: imagePreview || "/images/design/logo_pro.png",
                category: "Solución Empresarial",
                description: `Diagnóstico: ${audience.substring(0, 40)}...`,
                features: [
                    "Diseño Logo, Submarcas e Icono",
                    "Manual de Identidad (Paleta y Tipografías)",
                    "3 Aplicaciones (Tarjetas, Mocks, etc.)"
                ],
                fileUrl: orderInstructions,
                fileName: "instrucciones_branding.txt"
            };

            addItem(designItem, 1);
            navigateStep(6); // Success step

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
                        <span className="bg-purple-600/10 text-purple-400 border border-purple-600/20 px-4 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase">
                            Solución Empresarial
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
                            BRANDING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">COMPLETO.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed">
                            La imagen que tu empresa merece. Elaboramos una identidad integral que incluye manual de marca, paletas cromáticas y todo lo necesario para escalar con profesionalismo.
                        </p>
                        <div className="flex flex-col w-full max-w-sm gap-4 pt-4">
                            <button onClick={() => navigateStep(1)} className="flex items-center justify-center gap-3 bg-purple-600 text-white w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-purple-500 hover:scale-105 transition-all shadow-xl shadow-purple-600/20">
                                <Briefcase size={20} /> Empezar a Planear <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                );
            case 1:
                return (
                    <motion.div key="step-1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">LA VISIÓN</h2>
                            <p className="text-gray-400 font-medium">Háblanos de tu visión y valores.</p>
                        </div>
                        <textarea
                            value={vision}
                            onChange={(e) => setVision(e.target.value)}
                            placeholder="Ej. 'Lumina Tech' es una startup B2B que ofrece soluciones de seguridad para servidores. Buscamos transmitir confianza, innovación tecnológica y ser percibidos como líderes modernos de nuestra industria..."
                            className="w-full bg-black/50 border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all min-h-[200px] text-lg resize-none shadow-inner"
                        />
                        <div className="flex gap-4">
                            <button onClick={() => navigateStep(0)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10">Atrás</button>
                            <button onClick={() => navigateStep(2)} disabled={!vision.trim()} className="flex-[2] bg-purple-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 hover:bg-purple-500 hover:scale-105">Siguiente <ArrowRight size={18} /></button>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key="step-2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">EL PÚBLICO</h2>
                            <p className="text-gray-400 font-medium">¿Quién te va a comprar? ¿Quién es tu competencia?</p>
                        </div>
                        <textarea
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="Ej. Nos dirigimos a empresas medianas y corporativos. Gente entre 30 a 50 años. Nuestra competencia principal suele ser muy aburrida y corporativa, queremos vernos más frescos y ágiles que ellos..."
                            className="w-full bg-black/50 border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all min-h-[200px] text-lg resize-none shadow-inner"
                        />
                        <div className="flex gap-4">
                            <button onClick={() => navigateStep(1)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10">Atrás</button>
                            <button onClick={() => navigateStep(3)} disabled={!audience.trim()} className="flex-[2] bg-purple-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 hover:bg-purple-500 hover:scale-105">Siguiente <ArrowRight size={18} /></button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div key="step-3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">LA PERSONALIDAD</h2>
                            <p className="text-gray-400 font-medium">Si tu marca fuera una persona, ¿cómo sería?</p>
                        </div>
                        <textarea
                            value={personality}
                            onChange={(e) => setPersonality(e.target.value)}
                            placeholder="Ej. Si fuera una persona sería elegante, puntual, vestida de manera minimalista (colores oscuros o plateados) pero siempre con actitud de liderazgo y tecnología..."
                            className="w-full bg-black/50 border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all min-h-[200px] text-lg resize-none shadow-inner"
                        />
                        <div className="flex gap-4">
                            <button onClick={() => navigateStep(2)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10">Atrás</button>
                            <button onClick={() => navigateStep(4)} disabled={!personality.trim()} className="flex-[2] bg-purple-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 hover:bg-purple-500 hover:scale-105">Siguiente <ArrowRight size={18} /></button>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div key="step-4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">INSPIRACIÓN <span className="text-purple-400 text-sm normal-case block mt-2">(Opcional)</span></h2>
                            <p className="text-gray-400 font-medium">Adjunta cualquier documento, moodboard o imágenes estilo que representen la vibra deseada.</p>
                        </div>

                        {!imagePreview ? (
                            <div className="relative border-2 border-dashed border-white/10 rounded-3xl hover:border-purple-500/50 hover:bg-white/5 transition-all group overflow-hidden h-[320px]">
                                <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                <div className="flex flex-col items-center justify-center h-full pointer-events-none">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600/20 transition-all shadow-xl">
                                        <Upload className="w-10 h-10 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-purple-400 transition-colors">Toca para subir documento</span>
                                    <span className="text-[10px] text-gray-600 mt-2 font-bold uppercase tracking-widest">Formatos PNG, JPG, PDF (Max 5MB)</span>
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
                            <button onClick={() => navigateStep(3)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10">Atrás</button>
                            <button onClick={() => navigateStep(5)} className="flex-[2] bg-purple-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 hover:bg-purple-500 hover:scale-105">Siguiente <ArrowRight size={18} /></button>
                        </div>
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div key="step-5" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-black italic uppercase">RESUMEN</h2>
                            <p className="text-gray-400 font-medium">Verifica tu pedido empresarial.</p>
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
                                    <h3 className="font-bold text-xl mb-1">Branding Completo</h3>
                                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4 italic">"{vision}"</p>
                                    <div className="text-3xl font-black text-purple-400">$650.000 <span className="text-xs text-gray-500 font-bold tracking-widest uppercase ml-2 align-middle">Precio Fijo</span></div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/10">
                                {["Diseño Logo, Submarcas e Icono", "Manual de Identidad (Paleta y Tipografías)", "3 Aplicaciones (Tarjetas, Mocks, etc.)"].map((feat, i) => (
                                    <div key={i} className="flex flex-row items-center gap-4">
                                        <div className="bg-purple-600/20 text-purple-400 p-1.5 rounded-lg border border-purple-600/20">
                                            <Check size={16} strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => navigateStep(4)} disabled={isUploading} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl uppercase tracking-widest text-sm transition-colors border border-white/10 disabled:opacity-50">Atrás</button>
                            <button onClick={handleAddToCart} disabled={isUploading} className="flex-[2] bg-purple-600 hover:bg-purple-500 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105">
                                {isUploading ? <><Loader2 className="w-6 h-6 animate-spin" /> Procesando...</> : <><Zap size={20} className="fill-white" /> Añadir al Carrito</>}
                            </button>
                        </div>
                    </motion.div>
                );
            case 6:
                return (
                    <motion.div key="step-6" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center text-center space-y-8 max-w-xl mx-auto py-10">
                        <div className="w-28 h-28 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)] mb-4 border border-green-500/30">
                            <Check size={56} strokeWidth={3} />
                        </div>
                        <h2 className="text-5xl font-black italic uppercase">¡AÑADIDO!</h2>
                        <p className="text-gray-400 font-medium text-lg max-w-md leading-relaxed border-l-4 border-green-500/30 pl-4 py-2">
                            Tu solicitud para "Branding Completo" ha sido agregada con éxito. Finaliza la compra y nos pondremos en contacto contigo para agendar tu primera consultoría.
                        </p>
                        <div className="flex flex-col w-full max-w-sm gap-4">
                            <button onClick={() => { if (!isCartOpen) toggleCart() }} className="bg-white text-black font-black py-5 w-full rounded-2xl uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-white/10">
                                Ver Carrito Ahora
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/cotizador" className="bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center hover:scale-105">
                                    Impresión
                                </Link>
                                <Link href="/diseno" className="bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center hover:scale-105">
                                    Ver Más
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

            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex-1 container mx-auto px-6 max-w-4xl flex flex-col justify-center pt-32 pb-16 relative z-10">
                {step > 0 && step < 6 && (
                    <div className="flex items-center justify-center gap-2 md:gap-3 mb-16">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= s ? 'bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.6)] scale-125' : 'bg-white/10'}`} />
                                {s < 5 && <div className={`w-6 md:w-12 h-[2px] mx-1 md:mx-2 transition-all duration-500 ${step > s ? 'bg-purple-600/50' : 'bg-white/10'}`} />}
                            </div>
                        ))}
                    </div>
                )}
                <div className="relative">
                    <AnimatePresence mode="wait" custom={direction}>
                        {renderStepContent()}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
