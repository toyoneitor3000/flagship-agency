"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type NavTheme = "light" | "dark";

interface NavThemeContextType {
    theme: NavTheme;
    setTheme: (theme: NavTheme) => void;
}

const NavThemeContext = createContext<NavThemeContextType | undefined>(undefined);

export function NavThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<NavTheme>("light");

    useEffect(() => {
        const handleScroll = () => {
            // Find the element at the top of the viewport (where the navbar is)
            // Using a small offset to ensure we catch the section "under" the navbar
            const navbarHeight = 80;
            const elementsAtPoint = document.elementsFromPoint(window.innerWidth / 2, navbarHeight / 2);

            // Find the closest parent (or self) that has a data-theme attribute
            for (const el of elementsAtPoint) {
                const section = el.closest('[data-theme]');
                if (section) {
                    const newTheme = section.getAttribute('data-theme') as NavTheme;
                    if (newTheme && (newTheme === 'light' || newTheme === 'dark')) {
                        setTheme(newTheme);
                        return;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        // Run once on mount and after a short delay to ensure sections are rendered
        handleScroll();
        const timer = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener("scroll", handleScroll, { capture: true });
            window.removeEventListener("resize", handleScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <NavThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </NavThemeContext.Provider>
    );
}

export function useNavTheme() {
    const context = useContext(NavThemeContext);
    if (context === undefined) {
        throw new Error("useNavTheme must be used within a NavThemeProvider");
    }
    return context;
}
