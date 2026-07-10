'use client';

import { useState, useEffect } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 5));
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {/* Contenido del preloader */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo con animación */}
        <div className="relative w-72 h-20 md:w-80 md:h-24 animate-[fadeIn_0.8s_ease-out]">
          <img
            src="/logo.png"
            alt="Victory Cars Detailing"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Barra de progreso */}
        <div className="w-56 md:w-64">
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-white/50 text-xs font-semibold mt-4 tracking-widest">
            {progress}%
          </p>
        </div>

        {/* Texto animado */}
        <div className="text-center space-y-2 animate-[fadeIn_1.2s_ease-out_both]">
          <p className="text-white/40 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
            Cargando experiencia premium
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default Preloader;
