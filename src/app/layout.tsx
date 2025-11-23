import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Purrpurr | Elite Development Agency",
  description: "We build Digital Empires, not just code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-zinc-950 text-zinc-100 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}