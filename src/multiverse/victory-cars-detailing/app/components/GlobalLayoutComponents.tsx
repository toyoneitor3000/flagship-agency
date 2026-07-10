'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import VisualEffects from './VisualEffects';
import WhatsAppFloatingButton from './WhatsAppFloatingButton';

export default function GlobalLayoutComponents() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return (
    <>
      <Header />
      <ScrollReveal />
      <VisualEffects />
      <WhatsAppFloatingButton />
    </>
  );
}
