import React from 'react';
import { FaCar, FaSprayCan, FaShieldAlt, FaStar } from 'react-icons/fa';

const FeaturedServicesBar = () => {
  const services = [
    { icon: <FaCar className="text-2xl" />, title: 'Detailing Completo', description: 'Limpieza profunda interior y exterior' },
    { icon: <FaSprayCan className="text-2xl" />, title: 'Pulido & Encerado', description: 'Brillo profesional duradero' },
    { icon: <FaShieldAlt className="text-2xl" />, title: 'Protección Cerámica', description: 'Máxima protección para tu auto' },
    { icon: <FaStar className="text-2xl" />, title: 'Restauración', description: 'Devolvemos el brillo original' },
  ];

  return (
    <section className="py-24 bg-apple-bg">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16 text-apple-text">
          Nuestros Servicios Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:-translate-y-1 hover:shadow-md shadow-sm transition-all duration-300 border border-apple-border"
            >
              <div className="text-apple-blue mb-5 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium mb-3 text-apple-text text-center tracking-tight">
                {service.title}
              </h3>
              <p className="text-apple-subtext text-center text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesBar;
