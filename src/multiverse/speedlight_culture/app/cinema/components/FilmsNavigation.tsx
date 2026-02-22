"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Search,
    Home,
    Film,
    Clock,
    Plus,
    ChevronRight,
    Play,
    TrendingUp,
    Tv,
    Flame
} from "lucide-react";

interface FilmsNavigationProps {
    viewMode: 'cinema' | 'social';
    setViewMode: (mode: 'cinema' | 'social') => void;
    activeCategory: string;
    setActiveCategory: (cat: string) => void;
}

export function FilmsNavigation({ viewMode, setViewMode, activeCategory, setActiveCategory }: FilmsNavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const categories = [
        { name: "Inicio", id: "all", icon: <Home className="w-5 h-5" /> },
        { name: "Tendencias", id: "trending", icon: <TrendingUp className="w-5 h-5" /> },
        { name: "Originales", id: "Originals", icon: <Flame className="w-5 h-5" /> },
        { name: "Películas", id: "Películas", icon: <Film className="w-5 h-5" /> },
        { name: "Series", id: "Series", icon: <Tv className="w-5 h-5" /> },
        { name: "Mi Lista", id: "mylist", icon: <Plus className="w-5 h-5" /> },
    ];

    return (
        <>
            {/* TOP NAVIGATION (Netflix Style) */}
            <header
                className={`fixed top-0 left-0 right-0 z-[160] px-4 md:px-12 py-4 flex items-center justify-between transition-all duration-500 md:pl-[100px] ${isScrolled ? "bg-[#060403] shadow-2xl" : "bg-transparent"
                    }`}
            >
                <div className="flex items-center gap-8">
                    {/* Switch (Shared component logic) */}
                    <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl">
                        <button
                            onClick={() => setViewMode('social')}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${viewMode === 'social' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            Social
                        </button>
                        <button
                            onClick={() => setViewMode('cinema')}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${viewMode === 'cinema' ? 'bg-[#FF9800] text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            Films
                        </button>
                    </div>

                    {/* Horizontal Categories (Desktop Only) */}
                    <nav className="hidden xl:flex items-center gap-6">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`text-sm font-bold transition-all uppercase tracking-widest ${activeCategory === cat.id ? 'text-[#FF9800]' : 'text-white/60 hover:text-white'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-white/60 hover:text-white transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-[#FF9800] border border-white/20" />
                </div>
            </header>

            {/* MINIMALIST SIDEBAR (Netflix Sidebar Style) */}
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[80px] hover:w-[240px] bg-[#060403] border-r border-white/5 z-[170] flex-col items-center py-20 transition-all duration-500 group overflow-hidden">
                <nav className="flex flex-col w-full gap-2 px-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all group/item overflow-hidden whitespace-nowrap ${activeCategory === cat.id ? 'bg-[#FF9800]/10 text-[#FF9800]' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
                        >
                            <div className="shrink-0">{cat.icon}</div>
                            <span className="text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto w-full px-4">
                    <button className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-white/5 text-white/40 transition-all overflow-hidden whitespace-nowrap">
                        <Clock className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Historial</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
