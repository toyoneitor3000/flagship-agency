import { Hero } from '@/components/ui/Hero';
import { Features } from '@/components/ui/Features';
import { DesignPhilosophy } from '@/components/purrpurr/DesignPhilosophy';
import { Portfolio } from '@/components/ui/Portfolio';
import { Invitation } from '@/components/ui/Invitation';
import { Pricing } from '@/components/ui/Pricing';
import { CallToAction } from '@/components/ui/CallToAction';
import { PurrpurrLeadMagnet } from '@/components/purrpurr/PurrpurrLeadMagnet';
import { UserFluidBackground } from "@/components/purrpurr/UserFluidBackground";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className='selection:bg-indigo-500/30 selection:text-indigo-200 relative'>
      <Suspense fallback={
        <div className="absolute inset-0 w-full h-screen z-0 pointer-events-none bg-gradient-to-br from-[#dff0a3]/20 via-[#050505] to-[#cde6b7]/20" />
      }>
        <UserFluidBackground />
      </Suspense>
      <Hero />
      <Features />
      <Portfolio />
      <Pricing />
      <Invitation />
      <CallToAction />
      <PurrpurrLeadMagnet />
    </div>
  );
}