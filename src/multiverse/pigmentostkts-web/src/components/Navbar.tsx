"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { cn } from "@/lib/utils";
import CartButton from "@/components/CartButton";

const navLinks = [
  { name: "Colecciones", href: "/packs#colecciones" },
  { name: "Personalizados", href: "/#calculator" },
  { name: "Packs", href: "/packs" },
  { name: "Cubreplacas", href: "/#cubreplacas" },
  { name: "Diseño", href: "/#design" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si es un link con hash (ej: /#calculator o #calculator)
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const currentPath = window.location.pathname;

      // Si ya estamos en la página del hash (ej: estamos en / y el link es /#calculator o #calculator)
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

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#121212] md:bg-[#121212]/70 backdrop-blur-xl border-b border-white/5 py-[3px]"
          : "bg-white/5 backdrop-blur-[1px] py-[3px]"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center md:flex-1 md:justify-start">
            <Link href="/" className={cn(
              "relative transition-all duration-300 hover:scale-105 active:scale-95",
              isScrolled ? "w-28 md:w-48 h-[35px] md:h-[60px]" : "w-36 md:w-64 h-[45px] md:h-[80px]"
            )}>
              <Image
                src="/brand/logo.png"
                alt="Pigmento Stickers Logo"
                fill
                className="object-contain object-left"
                priority
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
                  isScrolled ? "text-white hover:text-brand-yellow" : "text-brand-black hover:text-brand-yellow"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Button & Cart */}
          <div className="hidden md:flex items-center md:flex-1 md:justify-end gap-4">
            <CartButton />
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
            <CartButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 transition-colors",
                isScrolled ? "text-white" : "text-brand-black"
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
