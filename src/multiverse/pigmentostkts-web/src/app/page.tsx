"use client";

import Link from "next/link";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { ArrowRight, ArrowUp, ArrowDown, Scissors, Palette, StickyNote, Shield } from "lucide-react";
import { FadeIn, ScaleOnHover } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { usePreloader } from "@/context/PreloaderContext";

// Import new components
import HomeMenu from "@/components/HomeMenu";
import StatsCounter from "@/components/StatsCounter";

import ParallaxGrid from "@/components/ui/ParallaxGrid";
const ProductShowcase = React.lazy(() => import("@/components/ProductShowcase"));
const CallToAction = React.lazy(() => import("@/components/CallToAction"));

import { useNavTheme } from "@/context/NavThemeContext";

import { Footer } from "@/components/Footer";

const SECTION_IDS = ['hero', 'stats', 'services', 'packs', 'cta', 'footer'];

export default function Home() {
  const { isPreloaderDone } = usePreloader();
  const { setTheme } = useNavTheme();

  // Custom scroll logic for manual navigation buttons and scroll snap
  const mainRef = React.useRef<HTMLElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;

      const scrollTop = mainRef.current.scrollTop;
      setIsScrolled(scrollTop > 100);
      setIsAtTop(scrollTop < 50); // Updated condition for isAtTop

      const atBottom = mainRef.current.scrollHeight - scrollTop - mainRef.current.clientHeight < 10; // Check if at bottom of the scrollable element
      setIsAtBottom(atBottom);

      // Determine current section
      let newSectionIndex = currentSectionIndex;
      // We check which section is closest to the top of the viewport
      SECTION_IDS.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section's top is near or above the top of the viewport, and bottom is below it
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) {
            newSectionIndex = index;
          }
        }
      });

      setCurrentSectionIndex(newSectionIndex);

      // Force last section if at bottom (fixes issue with short footers)
      if (atBottom) { // Use the new atBottom variable
        setCurrentSectionIndex(SECTION_IDS.length - 1);
      }
    };

    // Initial theme set
    setTheme('light');

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [setTheme]);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < SECTION_IDS.length && mainRef.current) {
      const section = document.getElementById(SECTION_IDS[index]);
      if (section) {
        const topPos = mainRef.current.scrollTop + section.getBoundingClientRect().top;
        mainRef.current.scrollTo({
          top: topPos,
          behavior: 'smooth'
        });
      }
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'plotter': return <Scissors className="w-8 h-8" />;
      case 'design': return <Palette className="w-8 h-8" />;
      case 'cubreplacas': return <Shield className="w-8 h-8" />;
      default: return <StickyNote className="w-8 h-8" />;
    }
  };

  return (
    <main ref={mainRef} className="h-screen overflow-y-scroll scroll-smooth relative overflow-x-hidden">

      {/* HERO SECTION - White Background */}
      <section id="hero" data-theme="light" className="relative bg-white text-brand-black min-h-screen flex items-center pt-24 pb-16 md:py-0 overflow-hidden">
        {/* Parallax Grid Background */}
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
          <ParallaxGrid />
        </div>

        {/* Bottom Fade Gradient - Black to Transparent */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent pointer-events-none z-0"></div>

        <div className="w-full max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 h-full justify-center">
            {/* Left side - Text content */}
            <div className="w-full lg:w-[32%] flex-shrink-0 flex flex-col justify-center">
              <div className="max-w-xl mx-auto lg:mx-0">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPreloaderDone ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="text-brand-yellow font-bold tracking-widest uppercase mb-4 block text-base md:text-lg"
                >
                  Soluciones Visuales Premium
                </motion.span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-[-0.06em] mb-6 leading-[0.85]">
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={isPreloaderDone ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="block"
                  >
                    TU VISIÓN,
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={isPreloaderDone ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600 block"
                  >
                    NUESTRA TINTA.
                  </motion.span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isPreloaderDone ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg md:text-xl text-gray-700 mb-8 font-medium max-w-lg leading-relaxed"
                >
                  Desde stickers de colección hasta branding corporativo completo. Alta resolución, vinilos importados y cortes de precisión.
                </motion.p>
                {/* Buttons removed as requested */}
              </div>
            </div>

            {/* Right side - Navigation Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isPreloaderDone ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1 w-full mt-4 lg:mt-0 flex items-center"
            >
              <HomeMenu />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - Only visible at top */}
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block cursor-pointer z-20"
            onClick={() => scrollToSection(1)}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-brand-black/30 rounded-full flex justify-center pt-2"
            >
              <motion.div className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* STATS COUNTER SECTION */}
      <section id="stats" data-theme="dark" className="bg-brand-black py-16 md:py-24 border-b border-white/5 relative z-20">
        <StatsCounter />
      </section>

      {/* SERVICES GRID - Black Background */}
      <section id="services" data-theme="dark" className="min-h-screen flex flex-col justify-center pt-32 pb-24 bg-brand-black relative z-10 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn delay={0.2}>
            <div className="text-center mb-16">
              <span className="text-brand-black font-bold tracking-widest uppercase text-xs md:text-sm bg-brand-yellow px-4 py-2 rounded-full mb-6 inline-block shadow-[0_0_20px_rgba(255,214,0,0.3)]">
                Lo que hacemos
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
                SOLUCIONES <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">VISUALES</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Cubrimos todas las etapas de tu proyecto. Desde la conceptualización hasta la impresión final con materiales de clase mundial.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PIGMENTO_DATA.services.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.1} className="h-full">
                <Link
                  href={service.id === 'design' ? '/diseno' : service.id === 'cubreplacas' ? '/cotizador' : '/cotizador'}
                  className="block h-full group"
                >
                  <div className="h-full bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:border-brand-yellow/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,214,0,0.1)] relative overflow-hidden">

                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="bg-brand-black w-20 h-20 rounded-2xl flex items-center justify-center text-brand-yellow mb-8 shadow-inner border border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                        {getIcon(service.id)}
                      </div>

                      <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight">{service.title}</h3>
                      <p className="text-gray-400 font-medium mb-8 flex-1 leading-relaxed text-sm">{service.description}</p>

                      <div className="pt-6 border-t border-white/10 mt-auto flex items-end justify-between">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block mb-1">Desde</span>
                          <span className="text-lg font-black text-brand-yellow">{service.priceStart}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-brand-yellow group-hover:text-black transition-all">
                          <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PACKS SECTION */}
      <ProductShowcase />

      {/* CTA SECTION - Closing the landing page */}
      <CallToAction />

      {/* FOOTER SECTION */}
      <section id="footer" data-theme="dark" className="h-auto bg-brand-black relative z-10">
        <Footer />
      </section>

      {/* Global Scroll Up Navigation - Fixed & Top Right - Visible on Scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-24 right-4 md:right-8 z-50 flex flex-col gap-3"
          >
            {!isAtTop && (
              <button
                onClick={() => scrollToSection(Math.max(0, currentSectionIndex - 1))}
                className="w-12 h-12 bg-black/80 backdrop-blur text-brand-yellow rounded-full flex items-center justify-center border border-white/10 shadow-lg hover:bg-brand-yellow hover:text-black transition-all"
                aria-label="Previous Section"
              >
                <ArrowUp className="w-6 h-6" />
              </button>
            )}
            {!isAtBottom && (
              <button
                onClick={() => {
                  if (currentSectionIndex < SECTION_IDS.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                  } else {
                    mainRef.current?.scrollTo({ top: mainRef.current.scrollHeight, behavior: 'smooth' });
                  }
                }}
                className="w-12 h-12 bg-black/80 backdrop-blur text-brand-yellow rounded-full flex items-center justify-center border border-white/10 shadow-lg hover:bg-brand-yellow hover:text-black transition-all"
                aria-label="Next Section"
              >
                <ArrowDown className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main >
  );
}
