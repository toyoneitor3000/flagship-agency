"use client"; // <--- LA LLAVE MAESTRA 

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { ArrowRight, Check, Scissors, Palette, StickyNote, Shield } from "lucide-react";
import { FadeIn, ScaleOnHover } from "@/components/ui/motion";
import { motion } from "framer-motion";
import * as React from "react";

// Import new components
import FloatingStickers from "@/components/FloatingStickers";
import StatsCounter from "@/components/StatsCounter";
import Gallery from "@/components/Gallery";
import PriceCalculator from "@/components/PriceCalculator";

export default function Home() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'plotter': return <Scissors className="w-8 h-8" />;
      case 'design': return <Palette className="w-8 h-8" />;
      case 'cubreplacas': return <Shield className="w-8 h-8" />;
      default: return <StickyNote className="w-8 h-8" />;
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* HERO SECTION - White Background */}
      <section className="relative bg-white text-brand-black py-32 md:py-48 overflow-hidden">
        {/* Grid de puntos de fondo */}
        <div className="absolute inset-0 opacity-20 bg-dot-pattern pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Text content */}
            <FadeIn className="flex-1">
              <div className="max-w-2xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-brand-yellow font-bold tracking-widest uppercase mb-6 block"
                >
                  Soluciones Visuales Premium
                </motion.span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="block"
                  >
                    TU VISIÓN,
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600 block"
                  >
                    NUESTRA TINTA.
                  </motion.span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-gray-700 mb-12 font-medium max-w-xl leading-relaxed"
                >
                  Desde stickers de colección hasta branding corporativo completo. Alta resolución, vinilos importados y cortes de precisión.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <ScaleOnHover>
                    <a
                      href={PIGMENTO_DATA.contact.whatsappUrl}
                      target="_blank"
                      className="inline-flex items-center justify-center bg-brand-yellow text-brand-black hover:bg-white font-black text-lg px-10 py-5 rounded-full transition-all uppercase tracking-wide shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
                    >
                      Cotizar Proyecto <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </ScaleOnHover>
                  <ScaleOnHover>
                    <Link
                      href="/packs"
                      className="inline-flex items-center justify-center bg-transparent border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white font-black text-lg px-10 py-5 rounded-full transition-all uppercase tracking-wide"
                    >
                      Ver Packs
                    </Link>
                  </ScaleOnHover>
                </motion.div>
              </div>
            </FadeIn>

            {/* Right side - Floating Stickers Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex-1 hidden lg:block"
            >
              <FloatingStickers />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-brand-black/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS COUNTER SECTION */}
      <StatsCounter />

      {/* SERVICES GRID - Black Background */}
      <section className="py-32 bg-brand-black relative z-10">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <div className="text-center mb-20">
              <span className="text-brand-black font-bold tracking-widest uppercase text-sm bg-brand-yellow px-4 py-2 rounded-full">Lo que hacemos</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight mt-6">NUESTROS SERVICIOS</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Cubrimos todas las etapas de tu proyecto visual. Desde la idea hasta la impresión final.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PIGMENTO_DATA.services.map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.1} className="h-full">
                <div className="h-full bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-brand-yellow/50 hover:shadow-2xl transition-all duration-500 group flex flex-col">
                  <div className="bg-brand-yellow/10 w-20 h-20 rounded-2xl flex items-center justify-center text-brand-yellow mb-8 group-hover:bg-brand-yellow group-hover:text-black group-hover:scale-110 transition-all duration-300">
                    {getIcon(service.id)}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 font-medium mb-8 flex-1 leading-relaxed">{service.description}</p>
                  <div className="pt-6 border-t border-white/10 mt-auto">
                    <span className="text-xs text-gray-500 uppercase font-bold block mb-1 tracking-wider">Desde</span>
                    <span className="text-xl font-black text-brand-yellow">{service.priceStart}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <Gallery />

      {/* PRICE CALCULATOR */}
      <PriceCalculator />

      {/* DESIGN TEASER - Yellow Background */}
      <section id="design" className="py-24 bg-brand-yellow">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="bg-brand-black rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
              {/* Fondo decorativo */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-yellow opacity-20 rounded-full blur-3xl"></div>

              <div className="flex-1 z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-none">¿NECESITAS <br />DISEÑO?</h2>
                <p className="text-white/80 text-xl font-medium mb-10 max-w-lg">
                  Desde digitalizar tu logo hasta crear la identidad completa de tu marca. No imprimas mediocridad.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-4 font-bold text-white text-lg">
                    <div className="bg-brand-yellow text-brand-black p-2 rounded-full"><Check size={16} /></div> Vectorización de Logos
                  </li>
                  <li className="flex items-center gap-4 font-bold text-white text-lg">
                    <div className="bg-brand-yellow text-brand-black p-2 rounded-full"><Check size={16} /></div> Identidad Visual & Branding
                  </li>
                  <li className="flex items-center gap-4 font-bold text-white text-lg">
                    <div className="bg-brand-yellow text-brand-black p-2 rounded-full"><Check size={16} /></div> Merchandising Corporativo
                  </li>
                </ul>
                <ScaleOnHover>
                  <Button className="bg-brand-yellow text-black hover:bg-white h-16 px-10 text-xl font-bold rounded-2xl shadow-xl">
                    Ver Planes de Diseño
                  </Button>
                </ScaleOnHover>
              </div>

              <div className="flex-1 flex justify-center z-10">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  className="bg-white p-8 rounded-3xl shadow-2xl rotate-6 transition-all duration-500 max-w-sm w-full border-4 border-brand-yellow"
                >
                  <div className="aspect-square bg-gray-50 rounded-2xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-200">
                    <Palette className="w-24 h-24 text-gray-300" />
                  </div>
                  <div className="h-6 bg-gray-100 rounded-full w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-100 rounded-full w-1/2"></div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW - White Background */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-white font-bold tracking-widest uppercase text-sm bg-brand-black px-4 py-2 rounded-full">Testimonios</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-black mt-4">LO QUE DICEN NUESTROS CLIENTES</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Carlos M.", role: "Motociclista", text: "Los stickers para mi moto quedaron brutales. Calidad profesional y el diseño personalizado superó mis expectativas." },
              { name: "María L.", role: "Streamer", text: "Pedí 500 stickers para regalar a mis subs y todos quedaron impresionados. Volveré a pedir sin duda." },
              { name: "Andrés P.", role: "Dueño de Tienda", text: "El branding de mi negocio quedó increíble. Desde los stickers hasta las tarjetas, todo premium." },
            ].map((testimonial, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-brand-yellow/50 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className="w-5 h-5 text-brand-yellow fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-brand-black">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}