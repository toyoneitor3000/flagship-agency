import { Hero } from '@/components/ui/Hero';
import { Features } from '@/components/ui/Features';
import { Pricing } from '@/components/ui/Pricing';

export default function Home() {
  return (
    <div className='selection:bg-indigo-500/30 selection:text-indigo-200'>
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}