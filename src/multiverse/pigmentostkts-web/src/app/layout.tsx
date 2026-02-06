import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pigmento Stickers | Stickers Premium y Diseño Gráfico",
  description: "Stickers personalizados, vinilo de corte, diseño gráfico y branding. Calidad 8K, vinilos importados y cortes de precisión. Envíos a toda Colombia.",
  keywords: "stickers, vinilo, diseño gráfico, branding, Colombia, personalizado",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
          <FloatingWhatsApp />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}