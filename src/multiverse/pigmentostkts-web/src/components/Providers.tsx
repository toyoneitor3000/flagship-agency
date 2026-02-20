"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { NavThemeProvider } from "@/context/NavThemeContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Preloader from "@/components/Preloader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PreloaderProvider>
      <SessionProvider>
        <CartProvider>
          <NavThemeProvider>
            <Preloader />
            <Navbar />
            <CartSidebar />
            {children}
          </NavThemeProvider>
        </CartProvider>
      </SessionProvider>
    </PreloaderProvider>
  );
}