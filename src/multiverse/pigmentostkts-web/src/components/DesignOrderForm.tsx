"use client";

import { useState } from "react";
import { Upload, X, Loader2, Wand2, Paintbrush } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function DesignOrderForm() {
    const { addItem } = useCart();
    const [idea, setIdea] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

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
        if (!idea.trim()) {
            alert("Por favor, cuéntanos tu idea primero.");
            return;
        }

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
                } else {
                    console.error("Failed to upload reference image");
                }
            }

            // Generate AI Prompt for the admin/designer to copy-paste later in Midjourney/DALL-E
            const aiPrompt = `[AI STICKER PROMPT GENERATOR]
Concept: ${idea}
Style Constraints: Vector art style, clean flat colors, thick white stroke/contour outline, isolated on a solid gray background, suitable for die-cut sticker printing, high contrast, vibrant typography (if any).
Reference Image Context: ${fileUrl ? `Please use the subject and basic composition from this visual reference: https://pigmentostckrs.com${fileUrl}` : 'No visual reference provided, rely purely on the Concept.'}
Parameters (Midjourney): --v 6.0 --ar 1:1 --stylize 250 --no background clutter, realistic shadows`;

            const designItem = {
                id: Date.now(), // Generate a unique ID for this specific design request
                name: "Diseño Artístico Personalizado",
                price: 35000,
                displayPrice: "$35.000",
                image: imagePreview || "/images/design/stickers_alt.png",
                category: "Servicio Premium",
                description: `Idea del cliente: ${idea}`,
                features: [
                    "Prompt Generado (Admin)",
                    "Diseño 100% Original",
                    "Archivos para Imprimir (.PDF, .PNG)"
                ],
                fileUrl: aiPrompt, // We hijack fileUrl to store the AI Prompt so the admin can copy it from the order dashboard!
                fileName: "ai_prompt_instructions.txt"
            };

            addItem(designItem, 1);

            // Clear form
            setIdea("");
            setFile(null);
            setImagePreview(null);

        } catch (error) {
            console.error("Error adding design to cart:", error);
            alert("Hubo un error. Por favor, intenta de nuevo.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-xl mx-auto shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] pointer-events-none rounded-full" />

            <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-6 flex items-center gap-3">
                <Paintbrush className="text-pink-500 w-6 h-6" /> Inicia tu Diseño
            </h3>

            <div className="space-y-6 relative z-10">
                {/* Description Textarea */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Desarrolla tu Idea <span className="text-pink-500">*</span>
                    </label>
                    <textarea
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="Ej. Quiero un gato samurai con una espada de neón rosa, estilo cyberpunk vectorial..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all min-h-[120px] resize-none"
                    />
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Referencia Visual <span className="text-gray-600 text-[10px] normal-case">(Opcional)</span>
                    </label>

                    {!imagePreview ? (
                        <div className="relative border-2 border-dashed border-white/10 rounded-xl hover:border-pink-500/30 hover:bg-white/5 transition-all group overflow-hidden">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center justify-center py-8 pointer-events-none">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    Sube una imagen o boceto
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                            <img src={imagePreview} alt="Reference Preview" className="w-full h-48 object-cover opacity-80" />
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={handleRemoveFile}
                                    className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white p-3 rounded-full transition-colors mb-2"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Remover archivo</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit / Add to Cart */}
                <Button
                    onClick={handleAddToCart}
                    disabled={isUploading || !idea.trim()}
                    className="w-full h-14 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] disabled:opacity-50 disabled:shadow-none"
                >
                    {isUploading ? (
                        <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Procesando Diseño...</>
                    ) : (
                        <><Wand2 className="w-5 h-5 mr-3" /> Añadir al Carrito ($35.000)</>
                    )}
                </Button>
                <p className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Generaremos tu Prompt AI Inteligente
                </p>
            </div>
        </div>
    );
}
