import Link from 'next/link';

export const Footer = () => (
  <footer className='bg-zinc-950 border-t border-zinc-900 py-12'>
    <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500'>
      <p>&copy; {new Date().getFullYear()} Purrpurr. Todos los derechos reservados.</p>
      <div className='flex gap-6'>
        <Link href='/privacy' className='hover:text-zinc-300 transition-colors'>Política de Privacidad</Link>
        <Link href='/terms' className='hover:text-zinc-300 transition-colors'>Términos de Servicio</Link>
      </div>
    </div>
  </footer>
);