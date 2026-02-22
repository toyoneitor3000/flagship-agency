"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SideNav } from "./components/SideNav";
import { FilmsNavigation } from "./components/FilmsNavigation";
import { useUi } from "@/app/context/UiContext";

export default function CinemaLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isUiVisible, setIsSocialMode } = useUi();

    // Determine initial view mode based on pathname
    // If the URL is explicitly a films sub-route, default to cinema
    const isFilmsRoute = pathname.includes('/peliculas') ||
        pathname.includes('/series') ||
        pathname.includes('/originales') ||
        pathname.includes('/tendencias') ||
        pathname.includes('/mi-lista');

    const [viewMode, setViewMode] = useState<'cinema' | 'social'>(isFilmsRoute ? 'cinema' : 'social');

    // Active category state for FilmsNavigation
    const [activeCategory, setActiveCategory] = useState('all');

    // Sync View Mode with Context
    useEffect(() => {
        setIsSocialMode(viewMode === 'social');
    }, [viewMode, setIsSocialMode]);

    // Update active category based on URL
    useEffect(() => {
        if (pathname === '/cinema') setActiveCategory('all');
        else if (pathname.includes('/tendencias')) setActiveCategory('trending');
        else if (pathname.includes('/originales')) setActiveCategory('Originals');
        else if (pathname.includes('/peliculas')) setActiveCategory('Películas');
        else if (pathname.includes('/series')) setActiveCategory('Series');
        else if (pathname.includes('/mi-lista')) setActiveCategory('mylist');
    }, [pathname]);


    return (
        <div className="bg-[#0D0805] min-h-screen w-full relative font-sans text-white overflow-hidden selection:bg-[#FF9800] selection:text-black">

            {/* NAVIGATION SYSTEMS */}
            {viewMode === 'social' ? (
                /* SOCIAL SIDEBAR (Desktop Only) */
                <div className="hidden md:block fixed left-0 top-0 bottom-0 z-[150] h-full">
                    <SideNav viewMode={viewMode} setViewMode={setViewMode} />
                </div>
            ) : (
                /* FILMS NAVIGATION (Netflix Style) */
                <FilmsNavigation
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            )}

            {/* HEADER TOGGLE (Mobile Only - Persistent) */}
            <div className={`fixed top-[65px] left-0 right-0 z-[140] transition-all duration-500 md:hidden ${isUiVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-full px-4 flex items-center justify-center py-4 relative">
                    <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-[3px] shadow-2xl">
                        <button onClick={() => setViewMode('social')} className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${viewMode === 'social' ? 'bg-white text-black' : 'text-white/40'}`}>Social</button>
                        <button onClick={() => setViewMode('cinema')} className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${viewMode === 'cinema' ? 'bg-[#FF9800] text-black' : 'text-white/40'}`}>Films</button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 w-full h-full">
                {/* Clone the children and inject the viewMode and setViewMode props if needed, but since it's Next.js app router layout, we can just pass them via React Context, or for simplicity, let individual pages fetch their own data, and we just render children here. 
                  However, the main `page.tsx` needs to know `viewMode` to render the social scroll feed or the cinema landing. 
                  Since we can't easily pass props to `children` in Server Components layouts, we will extract the common state into the `UiContext` or create a specific `CinemaContext`.
                  
                  Wait, a simpler approach for now:
                  If `viewMode === 'social'`, we want to show the social feed.
                  If `viewMode === 'cinema'`, we want to show the films.
                  We can lift that logic here or let `page.tsx` handle its own state.
                  
                  *Crucial correction*: In Next.js App router, layous wrap pages. 
                  If we move `viewMode` to layout, pages can't directly read it unless we use a Context Provider. Let's create a quick Context for Cinema State.
                */}
                {children}
            </div>
        </div>
    );
}
