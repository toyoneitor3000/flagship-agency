import { Hero } from '@/components/ui/Hero';
import { Features } from '@/components/ui/Features';
import { DesignPhilosophy } from '@/components/purrpurr/DesignPhilosophy';
import { Portfolio } from '@/components/ui/Portfolio';
import { Pricing } from '@/components/ui/Pricing';
import { CallToAction } from '@/components/ui/CallToAction';
import { PurrpurrLeadMagnet } from '@/components/purrpurr/PurrpurrLeadMagnet';

export default function Home() {
  return (
    <div className='selection:bg-indigo-500/30 selection:text-indigo-200'>
      <Hero />
      <Features />
      <Portfolio />
      <Pricing />
      <CallToAction />
      <PurrpurrLeadMagnet />
    </div>
  );
}