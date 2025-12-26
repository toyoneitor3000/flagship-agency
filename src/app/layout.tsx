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
  title: "Purrpurr | Elite Development Agency",
  description: "We build Digital Empires, not just code.",
  icons: {
    icon: '/purrpurr-icon.png',
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Purrpurr",
  },
};

import { PurrpurrProvider } from '@/components/purrpurr/PurrpurrContext';
import { MagicProvider } from '@/components/magic/MagicContext';
import { getMagicContent } from '@/lib/magic-server';
const MagicTrigger = () => null; // Placeholder or just remove import if not used


import { allFontVariables } from "@/lib/fonts";
import { TypographyInjector } from "@/components/purrpurr/TypographyInjector";
import { ThemeColorManager } from "@/components/ui/ThemeColorManager";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const magicContent = await getMagicContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${allFontVariables} antialiased bg-zinc-950 text-zinc-100 flex flex-col min-h-screen`}>
        <MagicProvider initialContent={magicContent}>
          <PurrpurrProvider>
            <ThemeColorManager />
            <TypographyInjector />
            <LoadingScreen />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </PurrpurrProvider>
        </MagicProvider>
      </body>
    </html>
  );
}