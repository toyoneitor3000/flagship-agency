import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export const viewport: Viewport = {
  // themeColor removed to allow iOS transparent status bar
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://purrpurr.dev'),
  title: "Purrpurr | Elite Development Agency",
  description: "Ingeniería de precisión para marcas que no pueden permitirse fallar. Arquitectura Digital de Alto Rendimiento.",
  icons: {
    icon: '/purrpurr-icon.png',
    apple: '/purrpurr-icon.png',
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Purrpurr | Arquitectura Digital",
    description: "Ingeniería de precisión para marcas que no pueden permitirse fallar.",
    url: 'https://purrpurr.dev',
    siteName: 'Purrpurr',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Purrpurr Digital Architecture',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Purrpurr | Elite Development Agency",
    description: "Ingeniería de precisión para marcas que no pueden permitirse fallar.",
    images: ['/og-image.png'],
    creator: '@purrpurr',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Purrpurr",
  },
};

import AuthProvider from '@/components/auth/AuthProvider';
import { PurrpurrProvider } from '@/components/purrpurr/PurrpurrContext';
import { MagicProvider } from '@/components/magic/MagicContext';
import { getMagicContent } from '@/lib/magic-server';
const MagicTrigger = () => null; // Placeholder or just remove import if not used


import { allFontVariables } from "@/lib/fonts";
import { TypographyInjector } from "@/components/purrpurr/TypographyInjector";
import { ThemeColorManager } from "@/components/ui/ThemeColorManager";
import { MainWrapper } from "@/components/ui/MainWrapper";
import { AnalyticsTracker } from "@/hooks/useAnalytics";
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const magicContent = await getMagicContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${allFontVariables} antialiased bg-zinc-950 text-zinc-100 flex flex-col min-h-screen`}>
        <AuthProvider>
          <MagicProvider initialContent={magicContent}>
            <PurrpurrProvider>
              <ThemeColorManager />
              <TypographyInjector />
              <LoadingScreen />
              <AnalyticsTracker />
              <Navbar />
              <MainWrapper>
                {children}
              </MainWrapper>
              <WhatsAppFloat />
              <Footer />
            </PurrpurrProvider>
          </MagicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}