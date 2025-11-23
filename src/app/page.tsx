import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/ui/Hero';
import { Features } from '@/components/ui/Features';
import { Pricing } from '@/components/ui/Pricing';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className='min-h-screen bg-zinc-950 selection:bg-indigo-500/30 selection:text-indigo-200'>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}