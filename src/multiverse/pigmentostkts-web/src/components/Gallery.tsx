"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Package, Zap } from "lucide-react";
import { stickers, Sticker } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

const categories = [
    { id: "all", label: "Todos" },
    { id: "Gameboy Pack", label: "Gameboy Pack" },
    { id: "Sushi Pack", label: "Sushi Pack" },
    { id: "Unicorn Pack", label: "Unicorn Pack" },
    { id: "Colecciones", label: "Colecciones" },
    { id: "Tornasol", label: "Tornasol" },
    { id: "Varios", label: "Varios" },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedItem, setSelectedItem] = useState<Sticker | null>(null);

    const filteredItems = activeCategory === "all"
        ? stickers
        : stickers.filter(item => item.category === activeCategory);

    const navigateGallery = (direction: "prev" | "next") => {
        if (!selectedItem) return;
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        const newIndex = direction === "next"
            ? (currentIndex + 1) % filteredItems.length
            : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedItem(filteredItems[newIndex]);
    };

    return (
        <section className="py-16 bg-white relative" id="colecciones">
            <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] [background-size:30px_30px] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-brand-black font-black tracking-[0.2em] uppercase text-[10px] bg-brand-yellow px-4 py-1.5 rounded-full shadow-lg">Catálogo Real</span>
                        <span className="bg-brand-black text-brand-yellow font-black text-[9px] px-2.5 py-0.5 rounded-md uppercase animate-pulse">Inspiración</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-brand-black mt-2 mb-4 uppercase italic tracking-tighter leading-none text-center">STICKERS DE COLECCIÓN</h2>
                    <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto font-bold leading-tight">
                        Estos son solo algunos <span className="text-brand-black underline decoration-brand-yellow decoration-4">ejemplos de diseños</span> que pueden venir en tus packs. <br />
                        Cada paquete es una selección sorpresa de calidad suprema.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                                activeCategory === cat.id
                                    ? "bg-brand-black text-white shadow-[4px_4px_0px_0px_rgba(255,225,0,1)] -translate-x-0.5 -translate-y-0.5"
                                    : "bg-white text-gray-500 hover:bg-gray-100 border-2 border-gray-100"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, idx) => {
                            const getBorderColor = (cat: string) => {
                                if (cat === "Gameboy Pack") return "border-red-500 shadow-[6px_6px_0px_0px_rgba(239,68,68,0.8)]";
                                if (cat === "Sushi Pack") return "border-blue-500 shadow-[6px_6px_0px_0px_rgba(59,130,246,0.8)]";
                                if (cat === "Unicorn Pack") return "border-purple-500 shadow-[6px_6px_0px_0px_rgba(168,85,247,0.8)]";
                                if (cat === "Tornasol") return "border-brand-yellow shadow-[6px_6px_0px_0px_rgba(255,183,0,0.8)]";
                                return "border-brand-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]";
                            };

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: idx * 0.02 }}
                                    onClick={() => setSelectedItem(item)}
                                    className={cn(
                                        "relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer group bg-gray-50 border-4 transition-all hover:-translate-y-2 active:scale-95",
                                        getBorderColor(item.category)
                                    )}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />


                                    {/* Hover overlay with vibrant design */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                                        <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform">
                                            <p className="font-black text-sm text-white uppercase italic tracking-tighter leading-none mb-2">{item.name}</p>
                                            <div className="bg-brand-yellow text-brand-black text-[8px] font-black px-3 py-1 rounded-full inline-block uppercase tracking-widest">
                                                {item.category}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-8"
                            onClick={() => setSelectedItem(null)}
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 text-white hover:text-brand-yellow transition-colors z-[110]"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); navigateGallery("prev"); }}
                                className="absolute left-4 md:left-10 text-white hover:text-brand-yellow transition-colors hidden md:block"
                            >
                                <ChevronLeft className="w-12 h-12" />
                            </button>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center"
                            >
                                <div className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden bg-brand-black/50 border border-white/10">
                                    <Image
                                        src={selectedItem.image}
                                        alt={selectedItem.name}
                                        fill
                                        className="object-contain"
                                    />

                                </div>
                                <div className="mt-6 text-center text-white">
                                    <h3 className="text-3xl font-black uppercase italic tracking-tighter text-brand-yellow">{selectedItem.name}</h3>
                                    <p className="text-lg text-gray-400 font-bold mt-1">{selectedItem.category}</p>
                                    <p className="mt-4 text-gray-500 max-w-xl mx-auto">{selectedItem.description}</p>
                                </div>
                            </motion.div>

                            <button
                                onClick={(e) => { e.stopPropagation(); navigateGallery("next"); }}
                                className="absolute right-4 md:right-10 text-white hover:text-brand-yellow transition-colors hidden md:block"
                            >
                                <ChevronRight className="w-12 h-12" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
