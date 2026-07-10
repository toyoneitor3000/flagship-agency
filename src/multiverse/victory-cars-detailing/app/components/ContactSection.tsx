'use client';

import React from 'react';
import { Phone, MapPin, Mail, ArrowRight, Share2 } from 'lucide-react';
import Image from 'next/image';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-apple-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-apple-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Info Side */}
          <div className="lg:w-1/3 space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-apple-text mb-6 tracking-tight leading-[1.1]">Inicie su <br className="hidden lg:block"/><span className="text-apple-subtext">Transformación.</span></h2>
              <p className="text-apple-subtext font-regular text-lg md:text-xl leading-relaxed">
                Estamos listos para llevar su vehículo al siguiente nivel. Agende su cita o visítenos para una evaluación personalizada.
              </p>
            </div>

            <div className="space-y-8 mt-8">
              <div className="flex items-start group">
                <div className="p-3 bg-white rounded-2xl mr-5 border border-apple-border shadow-sm group-hover:shadow-md transition-all">
                  <MapPin className="text-apple-blue" size={24} />
                </div>
                <div className="pt-1">
                  <h4 className="text-apple-text font-medium text-sm tracking-wider uppercase mb-1">Ubicación</h4>
                  <p className="text-apple-subtext text-lg font-regular">Calle 128 #47-36, Bogotá</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="p-3 bg-white rounded-2xl mr-5 border border-apple-border shadow-sm group-hover:shadow-md transition-all">
                  <Phone className="text-apple-blue" size={24} />
                </div>
                <div className="pt-1">
                  <h4 className="text-apple-text font-medium text-sm tracking-wider uppercase mb-1">Línea Directa</h4>
                  <p className="text-apple-subtext text-lg font-regular">+57 312 473 0909</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="p-3 bg-white rounded-2xl mr-5 border border-apple-border shadow-sm group-hover:shadow-md transition-all">
                  <Mail className="text-apple-blue" size={24} />
                </div>
                <div className="pt-1">
                  <h4 className="text-apple-text font-medium text-sm tracking-wider uppercase mb-1">Email</h4>
                  <p className="text-apple-subtext text-lg font-regular">contacto@victorycars.com</p>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-apple-border">
              <h4 className="text-apple-text font-medium mb-6 text-sm tracking-wider uppercase">Horario de Atención</h4>
              <div className="flex justify-between text-apple-subtext py-3 text-base font-regular">
                <span>Lunes - Viernes</span>
                <span className="text-apple-text font-medium">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-apple-subtext py-3 text-base font-regular">
                <span>Sábados</span>
                <span className="text-apple-text font-medium">9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-apple-border shadow-md relative">
            <div className="absolute top-8 right-8 w-24 h-24 md:w-32 md:h-32 opacity-5">
              <Image src="/logo.png" alt="Logo Watermark" fill sizes="(max-width: 800px) 100vw, 800px" style={{ objectFit: 'contain' }} />
            </div>
            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-apple-subtext text-xs font-semibold mb-3 uppercase tracking-widest">Nombre Completo</label>
                  <input type="text" className="w-full bg-apple-bg border border-apple-border rounded-2xl py-4 px-5 text-apple-text font-regular focus:outline-none focus:border-apple-blue/50 focus:bg-white focus:ring-1 focus:ring-apple-blue/50 transition-all placeholder-apple-subtext/50" placeholder="Su nombre" />
                </div>
                <div>
                  <label className="block text-apple-subtext text-xs font-semibold mb-3 uppercase tracking-widest">Teléfono</label>
                  <input type="tel" className="w-full bg-apple-bg border border-apple-border rounded-2xl py-4 px-5 text-apple-text font-regular focus:outline-none focus:border-apple-blue/50 focus:bg-white focus:ring-1 focus:ring-apple-blue/50 transition-all placeholder-apple-subtext/50" placeholder="+57 ..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-apple-subtext text-xs font-semibold mb-3 uppercase tracking-widest">Vehículo</label>
                  <input type="text" className="w-full bg-apple-bg border border-apple-border rounded-2xl py-4 px-5 text-apple-text font-regular focus:outline-none focus:border-apple-blue/50 focus:bg-white focus:ring-1 focus:ring-apple-blue/50 transition-all placeholder-apple-subtext/50" placeholder="Marca y Modelo" />
                </div>
                <div>
                  <label className="block text-apple-subtext text-xs font-semibold mb-3 uppercase tracking-widest">Servicio de Interés</label>
                  <select className="w-full bg-apple-bg border border-apple-border rounded-2xl py-4 px-5 text-apple-text font-regular focus:outline-none focus:border-apple-blue/50 focus:bg-white focus:ring-1 focus:ring-apple-blue/50 transition-all appearance-none">
                    <option className="bg-white text-apple-text">Seleccionar...</option>
                    <option className="bg-white text-apple-text">Cerámico 9H</option>
                    <option className="bg-white text-apple-text">PPF</option>
                    <option className="bg-white text-apple-text">Detailing Interior</option>
                    <option className="bg-white text-apple-text">Polarizado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-apple-subtext text-xs font-semibold mb-3 uppercase tracking-widest">Mensaje</label>
                <textarea rows={4} className="w-full bg-apple-bg border border-apple-border rounded-2xl py-4 px-5 text-apple-text font-regular focus:outline-none focus:border-apple-blue/50 focus:bg-white focus:ring-1 focus:ring-apple-blue/50 transition-all placeholder-apple-subtext/50 resize-none" placeholder="¿Cómo podemos ayudarle?"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <a href="https://wa.me/573124730909?text=Hola,%20deseo%20información%20sobre%20sus%20servicios%20de%20detailing." target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center justify-center gap-3">
                  <span>Contactar por WhatsApp</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && navigator.share) {
                      navigator.share({
                        title: 'Victory Cars Detailing',
                        text: 'Descubre los mejores servicios de detailing para tu vehículo en Victory Cars',
                        url: window.location.href,
                      });
                    } else {
                      const shareUrl = window.location.href;
                      const text = 'Descubre los mejores servicios de detailing para tu vehículo en Victory Cars';
                      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
                    }
                  }}
                  className="btn-secondary flex items-center justify-center gap-3"
                >
                  <span>Compartir en redes</span>
                  <Share2 size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
