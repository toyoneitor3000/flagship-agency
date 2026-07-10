import React from 'react';
import { MapPin, Clock, Navigation } from 'lucide-react';

const LocationSection: React.FC = () => {
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.273183424164!2d-74.0537330852382!3d4.71701989659091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b2d2f7a0b2d%3A0x6e2f4f2b2c2d2e2f!2sCalle%20128%20%2347-36%2C%20Bogot%C3%A1%2C%20Cundinamarca%2C%20Colombia!5e0!3m2!1sen!2sus!4v1678888888888!5m2!1sen!2sus"; 
  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Calle+128+%2347-36,+Bogot%C3%A1";

  return (
    <section className="py-32 bg-white relative border-t border-apple-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-semibold text-center text-apple-text mb-20 tracking-tight">Visítenos en el Norte de Bogotá</h2>
        
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
          <div className="md:flex-1 w-full h-80 md:h-[400px] bg-white rounded-[2rem] overflow-hidden shadow-md border border-apple-border relative group">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Victory Cars S.A.S."
              className="opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-apple-border rounded-[2rem]"></div>
          </div>
          
          <div className="md:flex-1 text-apple-subtext">
            <div className="space-y-10">
                <div className="flex items-start group">
                    <div className="p-4 bg-apple-bg rounded-2xl mr-5 border border-apple-border group-hover:bg-white group-hover:shadow-sm transition-all">
                        <MapPin className="text-apple-blue" size={28} />
                    </div>
                    <div className="pt-1">
                        <h4 className="text-apple-text font-semibold text-lg mb-1 tracking-tight">VICTORY CARS CENTER</h4>
                        <p className="text-apple-subtext text-lg font-regular">Calle 128 #47-36</p>
                        <p className="text-apple-subtext/80 text-sm font-regular">Prado Veraniego, Bogotá</p>
                    </div>
                </div>

                <div className="flex items-start group">
                    <div className="p-4 bg-apple-bg rounded-2xl mr-5 border border-apple-border group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Clock className="text-apple-blue" size={28} />
                    </div>
                    <div className="pt-1">
                        <h4 className="text-apple-text font-semibold text-lg mb-1 tracking-tight">HORARIO EXTENDIDO</h4>
                        <p className="text-apple-subtext font-regular">Lunes a Sábado</p>
                        <p className="text-apple-text font-medium">8:00 AM – 6:00 PM</p>
                    </div>
                </div>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-12 bg-apple-text text-white font-medium py-3.5 px-8 rounded-full text-base hover:bg-apple-text/90 transition-all duration-300 shadow-md tracking-wide"
            >
              <Navigation className="mr-2" size={18} />
              Trazar Ruta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
