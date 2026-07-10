import React from 'react';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-apple-bg text-apple-subtext py-20 border-t border-apple-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

        <div className="col-span-1 md:col-span-1">
          <h3 className="text-xl font-semibold text-apple-text mb-6 tracking-tight">VICTORY <span className="text-apple-subtext">CARS</span></h3>
          <p className="text-sm leading-relaxed mb-8 font-regular text-apple-subtext">
            Elevando el estándar del cuidado automotriz en Bogotá. Pasión, tecnología y perfección en cada detalle.
          </p>
          <div className="flex space-x-5">
            <a href="https://wa.me/573124730909" target="_blank" rel="noopener noreferrer" className="text-apple-subtext hover:text-apple-blue transition-colors"><Instagram size={22} /></a>
            <a href="https://wa.me/573124730909" target="_blank" rel="noopener noreferrer" className="text-apple-subtext hover:text-apple-blue transition-colors"><Facebook size={22} /></a>
            <a href="https://wa.me/573124730909" target="_blank" rel="noopener noreferrer" className="text-apple-subtext hover:text-apple-blue transition-colors"><Twitter size={22} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-apple-text font-medium mb-6 tracking-widest uppercase text-xs">Servicios</h4>
          <ul className="space-y-4 text-sm font-regular text-apple-subtext">
            <li><a href="#services" className="hover:text-apple-blue transition-colors">Cerámico 9H</a></li>
            <li><a href="#services" className="hover:text-apple-blue transition-colors">PPF Protection</a></li>
            <li><a href="#services" className="hover:text-apple-blue transition-colors">Detailing Interior</a></li>
            <li><a href="#services" className="hover:text-apple-blue transition-colors">Corrección de Pintura</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-apple-text font-medium mb-6 tracking-widest uppercase text-xs">Empresa</h4>
          <ul className="space-y-4 text-sm font-regular text-apple-subtext">
            <li><a href="https://wa.me/573124730909?text=Hola,%20deseo%20conocer%20más%20sobre%20Victory%20Cars." target="_blank" rel="noopener noreferrer" className="hover:text-apple-blue transition-colors">Nosotros</a></li>
            <li><a href="#gallery" className="hover:text-apple-blue transition-colors">Portafolio</a></li>
            <li><a href="https://wa.me/573124730909" target="_blank" rel="noopener noreferrer" className="hover:text-apple-blue transition-colors">Contacto</a></li>
            <li><a href="https://wa.me/573124730909" target="_blank" rel="noopener noreferrer" className="hover:text-apple-blue transition-colors">Política de Privacidad</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-apple-text font-medium mb-6 tracking-widest uppercase text-xs">Boletín VIP</h4>
          <p className="text-sm mb-5 font-regular text-apple-subtext">Reciba ofertas exclusivas y consejos de mantenimiento.</p>
          <div className="flex">
            <input type="email" placeholder="Su email" className="bg-white border border-apple-border text-apple-text px-4 py-3 rounded-l-2xl focus:outline-none focus:border-apple-blue/50 focus:ring-1 focus:ring-apple-blue/50 w-full text-sm placeholder-apple-subtext/50 transition-all" />
            <a href="https://wa.me/573124730909?text=Hola,%20deseo%20suscribirme%20al%20boletín%20VIP." target="_blank" rel="noopener noreferrer" className="bg-apple-text text-white px-5 py-3 rounded-r-2xl hover:bg-apple-text/90 transition-colors flex items-center justify-center">
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-20 pt-8 border-t border-apple-border text-center text-xs text-apple-subtext font-regular">
        &copy; {new Date().getFullYear()} Victory Cars S.A.S. Todos los derechos reservados.
        <div className="mt-3">
          Diseñado y desarrollado por <a href="https://purrpurr.dev" target="_blank" rel="noopener noreferrer" className="text-apple-subtext hover:text-apple-blue transition-colors">purrpurr.dev</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
