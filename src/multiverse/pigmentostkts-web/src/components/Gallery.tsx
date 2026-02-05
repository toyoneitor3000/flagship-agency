"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Laptop, Bike, Gamepad2, Sparkles } from "lucide-react";

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    gradient: string;
    icon: React.ReactNode;
}

const galleryItems: GalleryItem[] = [
    { id: 1, title: "Gaming Setup", category: "gaming", gradient: "from-purple-600 to-pink-600", icon: <Gamepad2 className="w-12 h-12" /> },
    { id: 2, title: "Moto Custom", category: "motos", gradient: "from-orange-500 to-red-600", icon: <Bike className="w-12 h-12" /> },
    { id: 3, title: "Laptop Art", category: "laptops", gradient: "from-blue-500 to-cyan-500", icon: <Laptop className="w-12 h-12" /> },
    { id: 4, title: "Colección Anime", category: "coleccion", gradient: "from-pink-500 to-rose-500", icon: <Sparkles className="w-12 h-12" /> },
    { id: 5, title: "Racing Decals", category: "motos", gradient: "from-yellow-500 to-orange-500", icon: <Bike className="w-12 h-12" /> },
    { id: 6, title: "Sticker Bomb", category: "laptops", gradient: "from-green-500 to-emerald-500", icon: <Laptop className="w-12 h-12" /> },
    { id: 7, title: "Retro Gaming", category: "gaming", gradient: "from-indigo-500 to-purple-600", icon: <Gamepad2 className="w-12 h-12" /> },
    { id: 8, title: "Street Art", category: "coleccion", gradient: "from-red-500 to-pink-500", icon: <Sparkles className="w-12 h-12" /> },
];

const categories = [
    { id: "all", label: "Todos" },
    { id: "motos", label: "Motos" },
    { id: "laptops", label: "Laptops" },
    { id: "gaming", label: "Gaming" },
    { id: "coleccion", label: "Colección" },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const filteredItems = activeCategory === "all"
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    const navigateGallery = (direction: "prev" | "next") => {
        if (!selectedItem) return;
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        const newIndex = direction === "next"
            ? (currentIndex + 1) % filteredItems.length
            : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedItem(filteredItems[newIndex]);
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm bg-brand-black px-4 py-2 rounded-full">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-black mt-6 mb-4">NUESTROS TRABAJOS</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Mira lo que hemos creado para nuestros clientes. Cada sticker cuenta una historia.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all ${activeCategory === cat.id
                                ? "bg-brand-black text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSelectedItem(item)}
                                className={`relative aspect-square rounded-3xl overflow-hidden cursor-pointer group bg-gradient-to-br ${item.gradient}`}
                            >
                                {/* Placeholder content - replace with real images */}
                                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                                    {item.icon}
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <p className="font-bold text-lg">{item.title}</p>
                                        <p className="text-sm text-gray-300 capitalize">{item.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedItem(null)}
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 text-white hover:text-brand-yellow transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); navigateGallery("prev"); }}
                                className="absolute left-6 text-white hover:text-brand-yellow transition-colors"
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </button>

                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`relative w-full max-w-3xl aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${selectedItem.gradient}`}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    {selectedItem.icon}
                                    <h3 className="text-3xl font-black mt-6">{selectedItem.title}</h3>
                                    <p className="text-lg text-white/70 capitalize mt-2">{selectedItem.category}</p>
                                    <p className="text-sm text-white/50 mt-4">Reemplaza con imagen real</p>
                                </div>
                            </motion.div>

                            <button
                                onClick={(e) => { e.stopPropagation(); navigateGallery("next"); }}
                                className="absolute right-6 text-white hover:text-brand-yellow transition-colors"
                            >
                                <ChevronRight className="w-10 h-10" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
