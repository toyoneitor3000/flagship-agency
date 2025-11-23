import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/ui/Hero';
import { Features } from '@/components/ui/Features';
import { Testimonials } from '@/components/ui/Testimonials';
import { Pricing } from '@/components/ui/Pricing';
import { FAQ } from '@/components/ui/FAQ';
import { CTA } from '@/components/ui/CTA';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className='min-h-screen bg-zinc-950 selection:bg-indigo-500/30 selection:text-indigo-200'>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}