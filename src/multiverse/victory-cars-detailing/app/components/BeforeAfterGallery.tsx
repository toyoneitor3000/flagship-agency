'use client';

import React from 'react';
import ComparisonSlider from './InteractiveComparisonSlider';

const BeforeAfterGallery: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden border-t border-apple-border">
       {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-apple-blue/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold text-apple-text mb-6 tracking-tight">Evidencia Real</h2>
          <p className="text-lg md:text-xl text-apple-subtext max-w-2xl mx-auto font-regular leading-relaxed">
            Desliza para descubrir la verdadera transformación que logramos en cada vehículo.
          </p>
        </div>

        <div className="space-y-24 max-w-5xl mx-auto">
          <ComparisonSlider 
            label="Corrección de Micro-rayones (Swirl Marks)"
            beforeImage="/gallery/swirl-marks-before.jpg" 
            afterImage="/gallery/swirl-marks-after.jpg" 
          />
          <ComparisonSlider 
            label="Detailing Interior Profundo"
            beforeImage="/gallery/interior-before.jpg" 
            afterImage="/gallery/interior-after.jpg" 
          />
           <ComparisonSlider 
            label="Restauración Completa de Pintura"
            beforeImage="/gallery/paint-before.jpg" 
            afterImage="/gallery/paint-after.jpg" 
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
