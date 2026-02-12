import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Footer } from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700", "800", "900"]
});

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
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <FloatingWhatsApp />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}