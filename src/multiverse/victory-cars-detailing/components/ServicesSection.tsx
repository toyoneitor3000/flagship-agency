import React from 'react';
import ServiceCard from './ServiceCard';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-brand-petroleum via-brand-black to-brand-dark-blue" id="services">
      {/* Fondo con degradados solicitados */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-light-blue/20 to-brand-dark-blue/60 opacity-40 -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light-blue/10 via-brand-black/30 to-brand-dark-blue opacity-30 -z-10"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-light-blue/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-petroleum/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-orbitron tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-light-blue to-blue-400">
              Servicios Premium 2025
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8 leading-relaxed italic">
            Tecnología de vanguardia y atención al detalle que transforma tu vehículo
          </p>
          <div className="h-1.5 w-32 bg-gradient-to-r from-brand-cyan to-brand-light-blue mx-auto rounded-full shadow-[0_0_20px_rgba(76,201,240,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 reveal">
          {/* GTECHNIQ PREMIUM */}
          <ServiceCard
            title="GTECHNIQ Crystal Serum Light"
            imageUrl="/services/csl.png"
            promotion="ELITE 9H+ UK"
            benefits={[
              "Máxima dureza y brillo nivel concurso",
              "Resistencia química certificada",
              "Corrección de pintura profesional",
              "Sellado de vidrios incluido",
              "Mantenimiento inicial GRATIS"
            ]}
            description={
              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
                <div>
                  <span className="text-xs text-white/70 block">Automóvil</span>
                  <span className="text-xl font-bold text-brand-cyan">$1'690.000</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/70 block">SUV</span>
                  <span className="text-xl font-bold text-brand-cyan">$1'890.000</span>
                </div>
              </div>
            }
          />

          {/* RESTAURACIÓN CON CERA */}
          <ServiceCard
            title="Restauración con Cera Premium"
            imageUrl="/services/detailing-pro-finish.jpg"
            promotion="BRILLO & SHOWROOM"
            benefits={[
              "Elimina hologramas y rayas leves",
              "Restauración profunda de brillo",
              "Cera de alta gama aplicada",
              "Alternativa ideal al cerámico",
              "Protección UV de larga duración"
            ]}
            description={
              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
                <div>
                  <span className="text-xs text-white/70 block">Automóvil</span>
                  <span className="text-xl font-bold text-brand-cyan">$650.000</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/70 block">SUV</span>
                  <span className="text-xl font-bold text-brand-cyan">$750.000</span>
                </div>
              </div>
            }
          />

          {/* PPF KITS EXPLAINED */}
          <ServiceCard
            title="PPF Ultra Protection (Kits)"
            imageUrl="/services/ppf.jpg"
            promotion="10 AÑOS GARANTÍA"
            benefits={[
              "PPF Completo: Protección 100%",
              "Kit Frontal: Bumper, Capó y Alas",
              "Kit Puertas e Interior disponible",
              "Autorregenerable con calor",
              "Invisible a simple vista"
            ]}
            description={
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-white/70">Kit Frontal</span>
                  <span className="text-sm font-bold text-brand-cyan">Desde $2.8M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Full Body SUV</span>
                  <span className="text-sm font-bold text-brand-cyan">$12M - $14M</span>
                </div>
                <p className="text-[10px] text-white/40 text-center mt-3 italic">* Requiere valoración física</p>
              </div>
            }
          />

          {/* PPF BUMPERS */}
          <ServiceCard
            title="PPF Bumpers (Puntas y Bordes)"
            imageUrl="/services/ppf.jpg"
            promotion="CUIDADO URBANO"
            benefits={[
              "Protección puntual en Bumper Delantero",
              "Protección en Bumper Trasero",
              "Ideal para evitar rayones de parqueo",
              "El film más resistente del mercado",
              "Mantiene la pintura original intacta"
            ]}
            description={
              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
                <div>
                  <span className="text-xs text-white/70 block">Auto</span>
                  <span className="text-xl font-bold text-brand-cyan">$1'800.000</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/70 block">SUV</span>
                  <span className="text-xl font-bold text-brand-cyan">$2'200.000</span>
                </div>
              </div>
            }
          />

          {/* CERÁMICO PARA PPF - HALO */}
          <ServiceCard
            title="Cerámico HALO (Especial para PPF)"
            imageUrl="/services/systemx.png"
            promotion="SELLADO TÉCNICO"
            benefits={[
              "Producto específico para film flex",
              "Evita amarillamiento prematuro",
              "Máxima hidrofobia sobre PPF/Wrap",
              "Aplicación rápida de 2 horas",
              "Facilita lavado de superficies"
            ]}
            description={
              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
                <div>
                  <span className="text-xs text-white/70 block">Inversión</span>
                  <span className="text-xl font-bold text-brand-cyan">$750k - $900k</span>
                </div>
                <div className="text-right italic text-[10px] text-white/50 text-glow">
                  Ideal post-PPF
                </div>
              </div>
            }
          />

          {/* WRAP COMPLETO */}
          <ServiceCard
            title="Wrap Completo (Cambio Color)"
            imageUrl="/services/style-wrap.jpg"
            promotion="PERSONALIZACIÓN"
            benefits={[
              "Vinilo de alta gama importado",
              "Acabados Mate, Satinado o Gloss",
              "Protección de pintura original",
              "Aplicable a piezas específicas",
              "Diferentes texturas disponibles"
            ]}
            description={
              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
                <div>
                  <span className="text-xs text-white/70 block">Rango Inversión</span>
                  <span className="text-xl font-bold text-brand-cyan">$6.5M - $12.5M</span>
                </div>
                <div className="text-right italic text-[10px] text-white/50">
                  Según material
                </div>
              </div>
            }
          />

          {/* PDR - SIN PINTAR */}
          <ServiceCard
            title="PDR (Paintless Dent Repair)"
            imageUrl="/services/pdr-repair.png"
            promotion="ARTE SIN PINTAR"
            benefits={[
              "Elimina golpes sin masilla ni soldadura",
              "Conserva la pintura de fábrica",
              "Técnica artesanal de alta precisión",
              "Mantiene el valor original del auto",
              "Servicio rápido en el mismo día"
            ]}
            description={
              <div className="border-t border-white/10 pt-4 mt-4 text-center">
                <span className="text-xs text-white/70 block">Desde</span>
                <span className="text-2xl font-bold text-brand-cyan">$150.000</span>
                <p className="text-[10px] text-white/40 mt-1 italic">Sujeto a valoración técnica</p>
              </div>
            }
          />

          {/* SACATOCOS - LATONERÍA */}
          <ServiceCard
            title="Sacatocos (Latonería Estética)"
            imageUrl="/services/paint-booth.png"
            promotion="REQUIERE PINTURA"
            benefits={[
              "Para golpes con afectación de pintura",
              "Uso de sacatocos neumático/soldadura",
              "Restauración estructural de pieza",
              "Incluye proceso de repintado",
              "Cabina profesional de pintura"
            ]}
            description={
              <div className="border-t border-white/10 pt-4 mt-4 text-center">
                <span className="text-xs text-white/70 block">Desde</span>
                <span className="text-2xl font-bold text-brand-cyan">$350.000</span>
                <p className="text-[10px] text-white/40 mt-1 italic">Pieza + Valoración física</p>
              </div>
            }
          />

          {/* RINES & MORDAZAS */}
          <ServiceCard
            title="Pintura de Rines & Mordazas"
            imageUrl="/services/wheel-wash.jpg"
            promotion="SPORT LOOK"
            benefits={[
              "Pintura horneada para rines (Set x4)",
              "Color custom en Mordazas/Calipers",
              "Resistencia a altas temperaturas",
              "Remoción de rayones de andén",
              "Estética de alto rendimiento"
            ]}
            description={
              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
                <div>
                  <span className="text-xs text-white/70 block">Rines x4</span>
                  <span className="text-xl font-bold text-brand-cyan">$650.000</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/70 block">Mordazas</span>
                  <span className="text-xl font-bold text-brand-cyan">$450.000</span>
                </div>
              </div>
            }
          />

          {/* MASTER CLEAN */}
          <ServiceCard
            title="Master Clean (Motor & Interior)"
            imageUrl="/services/enginewash.jpeg"
            promotion="DETALLADO TOTAL"
            benefits={[
              "Lavado de motor seguro (Vapor)",
              "Interior con inyección-succión",
              "Desinfección profunda de ductos",
              "Hidratación de cueros/plásticos",
              "Limpieza de techos y alfombras"
            ]}
            description={
              <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
                <div>
                  <span className="text-xs text-white/70 block">Motor</span>
                  <span className="text-xl font-bold text-brand-cyan">$90.000</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/70 block">Interior Full</span>
                  <span className="text-xl font-bold text-brand-cyan">$300.000</span>
                </div>
              </div>
            }
          />
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-brand-slate text-lg mb-6">
            ¿No encuentras lo que buscas? Contáctanos para servicios personalizados
          </p>
          <a
            href="https://wa.me/573157742419?text=Hola,%20necesito%20información%20sobre%20servicios%20personalizados."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-cyan to-blue-500 text-brand-dark-blue font-bold py-4 px-8 rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 font-orbitron tracking-wide"
          >
            <span>Consultar Servicio Personalizado</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
