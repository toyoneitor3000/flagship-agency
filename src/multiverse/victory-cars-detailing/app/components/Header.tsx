'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#about', label: 'Nosotros' },
  { href: '/#services', label: 'Servicios' },
  { href: '/#contact', label: 'Contacto' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled 
            ? 'bg-black/50 backdrop-blur-2xl border-b border-white/10' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Mobile Menu Button & Left Logo */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <Link href="/" className="flex-shrink-0">
              <div className="relative h-8 w-32 transition-transform hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Victory Cars Detailing"
                  fill
                  sizes="128px"
                  style={{ objectFit: "contain" }}
                  className="opacity-95 brightness-0 invert"
                  priority
                />
              </div>
            </Link>

            <button
              className="text-white hover:text-brand-cyan transition-all duration-300 p-2.5 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2} />
              )}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Links */}
            <nav className="flex items-center gap-10 flex-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium tracking-wide text-brand-slate hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo Center */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="transition-transform hover:scale-105 duration-300">
                <div className="relative h-8 w-32">
                  <Image
                    src="/logo.png"
                    alt="Victory Cars Detailing"
                    fill
                    sizes="128px"
                    style={{ objectFit: "contain" }}
                    className="opacity-95 brightness-0 invert"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* CTA Right */}
            <div className="flex-1 flex justify-end">
              <a
                href="https://wa.me/573124730909"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium py-2 px-6 rounded-full transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/20 flex items-center gap-2"
              >
                <span>Contacto</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />

        <div className="relative h-full overflow-y-auto px-6 py-8 flex flex-col">
          <div className="relative flex items-center justify-center mb-12">
            <Link href="/" onClick={handleNavLinkClick}>
              <div className="relative h-12 w-48">
                <Image
                  src="/logo.png"
                  alt="Victory Cars Detailing"
                  fill
                  sizes="192px"
                  style={{ objectFit: "contain" }}
                  className="brightness-0 invert"
                />
              </div>
            </Link>

            <button
              className="absolute right-0 text-brand-slate hover:text-white transition-all duration-300 p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú"
              type="button"
            >
              <X className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavLinkClick}
                    className="group"
                    style={{
                      animation: isMobileMenuOpen ? `fadeInUp 0.5s ease-out ${index * 0.1}s both` : 'none'
                    }}
                  >
                    <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/10 transition-all duration-300">
                      <span className="text-lg font-medium tracking-wide text-brand-slate group-hover:text-white transition-colors duration-300 block text-center">
                        {link.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>

              <div
                className="pt-6"
                style={{
                  animation: isMobileMenuOpen ? 'fadeInUp 0.5s ease-out 0.4s both' : 'none'
                }}
              >
                <a
                  href="https://wa.me/573124730909"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavLinkClick}
                  className="bg-brand-cyan hover:bg-cyan-400 text-black font-semibold rounded-full w-full py-4 text-base flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>Contáctanos</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
