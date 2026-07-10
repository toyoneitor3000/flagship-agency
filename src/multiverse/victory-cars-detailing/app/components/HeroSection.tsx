'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from './Carousel';
import { X } from 'lucide-react';

const HeroSection: React.FC = () => {
  const heroImages = [
    '/carrusel/IMG_0547.webp',
    '/carrusel/IMG_0556.webp',
    '/carrusel/IMG_5419.webp',
    '/carrusel/IMG_5440.webp'
  ];

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel images={heroImages} interval={4000} />
      </div>

      {/* Overlay oscuro para asegurar la legibilidad del texto sin lavar los colores de la foto */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      {/* Contenido */}
      <div className="relative z-10 w-full px-6 text-center flex flex-col items-center justify-center h-full pt-16">
        {/* Logo */}
        <div className="flex justify-center mb-8 md:mb-12 w-full">
          <div className="relative h-20 w-64 md:h-24 md:w-80">
            <Image
              src="/logo.png"
              alt="Victory Cars Detailing"
              fill
              sizes="(max-width: 768px) 256px, 320px"
              style={{ objectFit: "contain" }}
              className="opacity-100 drop-shadow-md brightness-0 invert"
              priority
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white tracking-tight max-w-4xl drop-shadow-md">
          Perfección para tu Vehículo
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
          Centro de detallado automotriz serio, pulido y profesional en Bogotá.
          <span className="block mt-4 text-apple-blue font-semibold text-sm md:text-base tracking-widest uppercase drop-shadow-md">
            Cerámicos 9H • PPF • Restauración Premium
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md sm:max-w-none">
          <a href="https://wa.me/573124730909?text=Hola,%20deseo%20agendar%20una%20cita%20VIP%20para%20mi%20vehículo." target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-4 px-10 shadow-lg hover:shadow-xl transition-all">
            Agendar Cita VIP
          </a>
          <Link href="/#services" className="btn-secondary text-base py-4 px-10 bg-white/10 text-white backdrop-blur shadow-lg hover:shadow-xl transition-all border border-white/20 hover:border-white hover:bg-white/20">
            Explorar Servicios
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-white font-semibold tracking-wide uppercase">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 py-2 px-5 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-apple-blue rounded-full animate-pulse"></span> Bogotá
          </div>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 py-2 px-5 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-apple-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span> Certificado IGL
          </div>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 py-2 px-5 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-apple-blue rounded-full animate-pulse" style={{ animationDelay: '1s' }}></span> Garantía Real
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
