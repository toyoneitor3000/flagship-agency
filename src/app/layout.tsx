import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export const viewport: Viewport = {
  themeColor: "#0f0033",
};

export const metadata: Metadata = {
  title: "Purrpurr | Elite Development Agency",
  description: "We build Digital Empires, not just code.",
  icons: {
    icon: '/purrpurr-icon.png',
  },
  manifest: "/manifest.json",
};

import { PurrpurrProvider } from '@/components/purrpurr/PurrpurrContext';

import { allFontVariables } from "@/lib/fonts";
import { TypographyInjector } from "@/components/purrpurr/TypographyInjector";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${allFontVariables} antialiased bg-zinc-950 text-zinc-100 flex flex-col min-h-screen`}>
        <PurrpurrProvider>
          <TypographyInjector />
          <LoadingScreen />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </PurrpurrProvider>
      </body>
    </html>
  );
}