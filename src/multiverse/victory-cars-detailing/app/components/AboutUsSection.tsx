import React from 'react';
import Image from 'next/image';
import { Shield, Sparkles, Zap, Award } from 'lucide-react';

const AboutUsSection: React.FC = () => {
  const featuredServices = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Protección Cerámica 9H",
      description: "Tecnología SYLEX y GTECHNIQ con garantía de 3-5 años.",
      highlight: "Garantía Real"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "PPF Shield",
      description: "Película de protección transparente que se autoregenera.",
      highlight: "10 Años"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Detailing Premium",
      description: "Corrección de pintura profesional y detailing completo.",
      highlight: "Resultado Espejo"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificación IGL",
      description: "Únicos en Bogotá con certificación oficial IGL Coatings.",
      highlight: "Certificado"
    }
  ];

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Fondo con efectos */}
      <div className="absolute inset-0 bg-gradient-to-b from-apple-bg via-white to-apple-bg opacity-50 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Sección original About Us */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-32">
          <div className="w-full md:flex-1 relative group">
            {/* Contenedor de imagen con efectos */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-[2rem] overflow-hidden border border-apple-border shadow-md transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(0,0,0,0.05)]">
              <Image
                src="/about-us.jpg"
                alt="Victory Cars S.A.S. Taller"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              {/* Overlay con gradiente mejorado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Badge decorativo */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-xl border border-apple-border text-apple-text font-medium px-5 py-2 rounded-full text-xs tracking-wider shadow-sm">
                CERTIFICADO IGL
              </div>
            </div>
          </div>
          
          <div className="w-full md:flex-1 text-apple-subtext space-y-8">
            {/* Título mejorado */}
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-apple-blue text-xs font-semibold tracking-[0.2em] uppercase">Sobre Nosotros</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-apple-text tracking-tight leading-[1.1]">
                Artesanos de la <br className="hidden md:block" />
                <span className="text-apple-subtext">Perfección.</span>
              </h2>
            </div>
            
            {/* Contenido con mejor espaciado */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-regular text-apple-subtext">
                En <span className="text-apple-text font-medium">VICTORY CARS</span> no solo lavamos autos; <span className="text-apple-text font-medium">restauramos obras de ingeniería</span>. Somos un centro especializado en protección y personalización automotriz de alto calibre.
              </p>
              <p className="text-lg md:text-xl leading-relaxed font-regular text-apple-subtext">
                Combinamos tecnología de vanguardia, técnicas de corrección milimétrica y productos premium como <span className="text-apple-blue font-medium">IGL Coatings</span> para garantizar que su inversión mantenga su valor y estética por años.
              </p>
            </div>
            
            {/* Stats o características destacadas */}
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-apple-border">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-semibold text-apple-text tracking-tight">10+</div>
                <div className="text-sm text-apple-subtext mt-2 font-medium">Años</div>
              </div>
              <div className="text-center border-x border-apple-border">
                <div className="text-3xl md:text-4xl font-semibold text-apple-text tracking-tight">500+</div>
                <div className="text-sm text-apple-subtext mt-2 font-medium">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-semibold text-apple-text tracking-tight">100%</div>
                <div className="text-sm text-apple-subtext mt-2 font-medium">Garantía</div>
              </div>
            </div>
            
            {/* CTA mejorado */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://wa.me/573124730909?text=Hola,%20deseo%20conocer%20más%20sobre%20Victory%20Cars." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <span>Contáctanos</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="#services" 
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Ver Servicios
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Servicios Destacados */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold text-apple-text tracking-tight mb-6">
            Nuestros Servicios Destacados
          </h2>
          <p className="text-xl text-apple-subtext max-w-2xl mx-auto mb-8 leading-relaxed font-regular">
            Descubre los servicios premium que nos distinguen en el mercado automotriz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {featuredServices.map((service, index) => (
            <div 
              key={index}
              className="bg-white border border-apple-border rounded-[2rem] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-apple-bg rounded-2xl mb-6 transition-colors duration-300">
                <div className="text-apple-blue">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-apple-text mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-apple-subtext text-sm mb-6 leading-relaxed font-regular">
                {service.description}
              </p>
              <div>
                <span className="inline-block bg-apple-bg text-apple-text text-xs font-medium py-1.5 px-4 rounded-full border border-apple-border">
                  {service.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white border border-apple-border shadow-sm rounded-[2.5rem] p-10 md:p-16">
          <h3 className="text-3xl md:text-4xl font-semibold text-apple-text tracking-tight mb-6">¿Listo para transformar tu vehículo?</h3>
          <p className="text-lg md:text-xl text-apple-subtext max-w-2xl mx-auto mb-10 leading-relaxed font-regular">
            Agenda una evaluación personalizada y descubre cómo podemos llevar tu vehículo a su máxima expresión.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#services" 
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <span>Ver todos los servicios</span>
              <Sparkles className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/573124730909" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <span>Agendar cita</span>
              <Shield className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
