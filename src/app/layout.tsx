import React, { Suspense } from "react";
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
  metadataBase: new URL('https://www.purrpurr.dev'),
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
import { AdminNotifications } from "@/components/notifications/AdminNotifications";
import { PurrPurrGuardian } from "@/components/purrpurr/PurrPurrGuardian";




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const magicContent = await getMagicContent();

  // Detect if this is a multi-tenant site request via cookie (headers don't propagate through rewrites)
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const tenantSlug = cookieStore.get('x-tenant-site')?.value;
  const isTenantSite = !!tenantSlug;

  // For tenant sites, render minimal wrapper without Purrpurr UI
  if (isTenantSite) {
    return (
      <html lang="es" className="scroll-smooth" suppressHydrationWarning>
        <body>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${allFontVariables} antialiased text-zinc-100 flex flex-col min-h-screen bg-transparent`}>
        {/* Solid Fallback Background */}
        <div className="fixed inset-0 bg-[#0f0033] -z-20 pointer-events-none" />

        <AuthProvider>
          <MagicProvider initialContent={magicContent}>
            <PurrpurrProvider>

              <AdminNotifications>
                <div className="relative z-10 font-sans">
                  <ThemeColorManager />
                  <TypographyInjector />
                  <LoadingScreen />
                  <AnalyticsTracker />
                  <Navbar />
                  <MainWrapper>
                    {children}
                  </MainWrapper>

                  <PurrPurrGuardian />

                  <Footer />
                </div>
              </AdminNotifications>
            </PurrpurrProvider>
          </MagicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}