"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { NavThemeProvider } from "@/context/NavThemeContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Preloader from "@/components/Preloader";
import type { Session } from "next-auth";

export function Providers({ children, session }: { children: React.ReactNode, session?: Session | null }) {
  return (
    <PreloaderProvider>
      <SessionProvider session={session} refetchOnWindowFocus={true} refetchInterval={5 * 60}>
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