"use client";

import React, { createContext, useContext, useState } from "react";

type NavTheme = "light" | "dark";

interface NavThemeContextType {
    theme: NavTheme;
    setTheme: (theme: NavTheme) => void;
}

const NavThemeContext = createContext<NavThemeContextType | undefined>(undefined);

export function NavThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<NavTheme>("light");

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
