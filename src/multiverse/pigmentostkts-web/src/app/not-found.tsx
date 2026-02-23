import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Página no encontrada | Pigmento',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center relative overflow-hidden px-4 selection:bg-brand-yellow selection:text-black pt-20">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-10">

        {/* 404 Main Title with custom hover effects */}
        <div className="relative group cursor-default">
          <h1 className="text-[120px] sm:text-[180px] md:text-[220px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-white to-white/20 select-none transform transition-transform duration-700 group-hover:scale-[1.03]">
            404
          </h1>
          {/* Subtle glow effect behind the text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 bg-brand-yellow blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Messaging */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-white tracking-tight leading-snug">
            Oops... <span className="text-brand-yellow">esta página se despegó.</span>
          </h2>
          <p className="text-lg md:text-xl text-brand-gray/70 max-w-xl mx-auto font-medium">
            No pudimos encontrar lo que buscabas. Tal vez cambiaste de idea,
            la URL es incorrecta o el sticker ya no está en este lienzo.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-yellow text-brand-black font-bold uppercase tracking-wider rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 hover:shadow-brand-yellow/30"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 w-1/4 h-full bg-white/40 skew-x-[45deg] -translate-x-[200%] transition-transform duration-700 group-hover:translate-x-[400%]" />
          <span className="relative z-10">Volver al Inicio</span>
          <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Ambient particles (Simulated with simple divs) */}
      <div className="absolute bottom-20 left-[15%] w-3 h-3 bg-brand-yellow rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute top-40 right-[20%] w-4 h-4 bg-brand-yellow rounded-full opacity-40 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-[10%] w-2 h-2 bg-brand-white rounded-full opacity-30 animate-pulse" style={{ animationDuration: '2s' }} />
      <div className="absolute bottom-1/3 right-[15%] w-2 h-2 bg-brand-white rounded-full opacity-20 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />

      {/* Decorative vertical texts */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-brand-white/5 font-bold tracking-[0.5em] uppercase text-xl select-none pointer-events-none hidden lg:block whitespace-nowrap">
        Error de Carga
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-brand-white/5 font-bold tracking-[0.5em] uppercase text-xl select-none pointer-events-none hidden lg:block whitespace-nowrap">
        Pigmento Stickers
      </div>
    </div>
  );
}