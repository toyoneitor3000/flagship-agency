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
import Breadcrumbs from "@/components/Breadcrumbs";

const navLinks = [
  { name: "Packs de Colección", href: "/packs" },
  { name: "Personalizados", href: "/cotizador" },
  { name: "Cubreplacas", href: "/cubreplacas" },
  { name: "Diseño", href: "/diseno" },
  { name: "Aprende", href: "/aprende" },
  { name: "Nosotros", href: "/nosotros" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let scrollPosition = window.scrollY;

      // The landing page uses a custom scroll container (<main>) for snap-scrolling
      if (pathname === '/') {
        const mainEl = document.querySelector('main');
        if (mainEl) {
          scrollPosition = mainEl.scrollTop;
        }
      }

      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });

    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll, { capture: true });
  }, [pathname]);

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
  // Simplfied theme logic: use dark background and white text initially and always
  const isTextBlack = false;

  const textColorClass = "text-white";
  const hoverColorClass = "hover:text-brand-yellow";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        // Navbar siempre oscuro y visible
        "bg-[#0A0A0A] border-b border-white/10 shadow-sm py-0"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Main Bar */}
          <div className={cn(
            "flex justify-between items-center transition-all duration-300",
            isScrolled ? "h-[50px] md:h-[60px]" : "h-[60px] md:h-[75px]"
          )}>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center md:flex-1 md:justify-start">
              <Link href="/" className={cn(
                "relative transition-all duration-300 hover:scale-105 active:scale-95",
                isScrolled ? "w-40 md:w-[220px] h-[40px] md:h-[50px]" : "w-48 md:w-[280px] h-[50px] md:h-[65px]"
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
                  sizes="(max-width: 768px) 150px, 300px"
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
              <CartButton isScrolled={true} />
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
              <CartButton isScrolled={true} />
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
              <Breadcrumbs theme="dark" />
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
    </nav >
  );
};

export default Navbar;
