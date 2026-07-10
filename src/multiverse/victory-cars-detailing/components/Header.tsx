import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity">
              <Image 
                src="/logo.png" 
                alt="Victory Cars Logo" 
                fill 
                className="object-contain" 
                priority
              />
            </div>
            <span className="text-white text-lg font-semibold tracking-tight group-hover:text-white/80 transition-colors">
              Victory Cars
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-slate">
            <Link href="#about" className="hover:text-white transition-colors">Nosotros</Link>
            <Link href="#services" className="hover:text-white transition-colors">Servicios</Link>
            <Link href="#gallery" className="hover:text-white transition-colors">Galería</Link>
          </div>

          {/* CTA */}
          <Link 
            href="#contact" 
            className="bg-white/5 hover:bg-white/10 text-white text-sm font-medium py-2 px-6 rounded-full transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/20"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;