"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { cn } from "@/lib/utils";
import CartButton from "@/components/CartButton";
import { useNavTheme } from "@/context/NavThemeContext";
import Breadcrumbs from "@/components/Breadcrumbs";

const navLinks = [
  { name: "Colecciones", href: "/packs#colecciones" },
  { name: "Personalizados", href: "/#calculator" },
  { name: "Packs", href: "/packs" },
  { name: "Cubreplacas", href: "/cubreplacas" },
  { name: "Diseño", href: "/#design" },
];

const Navbar = () => {
  const { theme } = useNavTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const currentPath = window.location.pathname;

      if (currentPath === path || (path === "/" && currentPath === "/") || path === "") {
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }
      }
    }
  };

  const isLanding = pathname === "/";
  // Simplfied theme logic: use the detected theme from context
  const isTextBlack = theme === "light";

  const textColorClass = isTextBlack ? "text-brand-black" : "text-white";
  const hoverColorClass = "hover:text-brand-yellow";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        // Enhanced glassmorphism: Adaptive background based on theme
        isScrolled
          ? (isTextBlack ? "bg-white/80 backdrop-blur-lg border-b border-black/5" : "bg-black/80 backdrop-blur-lg border-b border-white/5")
          : "bg-transparent border-b border-transparent py-0",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Main Bar */}
          <div className="flex justify-between items-center h-[60px] md:h-[85px]">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center md:flex-1 md:justify-start">
              <Link href="/" className={cn(
                "relative transition-all duration-300 hover:scale-105 active:scale-95",
                isScrolled ? "w-32 md:w-40 h-[40px] md:h-[50px]" : "w-40 md:w-56 h-[50px] md:h-[70px]"
              )}>
                <Image
                  src="/brand/logo.png"
                  alt="Pigmento Stickers Logo"
                  fill
                  className={cn(
                    "object-contain object-left transition-all duration-300"
                  )}
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 150px, 250px"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-[12px] font-semibold tracking-tight uppercase transition-colors duration-200",
                    textColorClass,
                    hoverColorClass
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Action Button & Cart */}
            <div className="hidden md:flex items-center md:flex-1 md:justify-end gap-4">
              <CartButton isScrolled={!isTextBlack} />
              <Link
                href={PIGMENTO_DATA.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-yellow text-brand-black px-6 py-2 rounded-full font-bold text-[12px] uppercase tracking-tighter transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-brand-yellow/20 active:scale-95"
              >
                Cotizar
              </Link>
            </div>

            {/* Mobile menu button & Cart */}
            <div className="md:hidden flex items-center gap-2">
              <CartButton isScrolled={!isTextBlack} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "p-2 transition-colors",
                  textColorClass
                )}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Breadcrumbs - Only visible if not landing page and not scrolled (optional usually, but let's keep it visible) */}
          {!isLanding && (
            <div className="hidden md:block py-2 border-t border-white/5">
              <Breadcrumbs theme={isTextBlack ? 'light' : 'dark'} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsOpen(false);
                  }}
                  className="block text-2xl font-black text-white hover:text-brand-yellow transition-colors italic uppercase tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Breadcrumbs */}
              {!isLanding && (
                <div className="py-4 border-t border-white/10">
                  <Breadcrumbs theme="dark" />
                </div>
              )}

              <div className="pt-4">
                <Link
                  href={PIGMENTO_DATA.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-brand-yellow text-brand-black px-6 py-4 rounded-xl font-black text-lg uppercase"
                >
                  Cotizar Proyecto
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
