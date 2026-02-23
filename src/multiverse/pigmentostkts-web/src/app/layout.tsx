import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ConditionalFooter from "@/components/ConditionalFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700", "800", "900"]
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pigmentostickers.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Pigmento Stickers | Stickers Premium, Vinilos y Diseño",
    template: "%s | Pigmento Stickers"
  },
  description: "Stickers personalizados, vinilo de corte automotriz, diseño gráfico y branding. Calidad premium, materiales holográficos, laminados UV y cortes kiss cut / die cut.",
  keywords: ["stickers", "vinilo automotriz", "calcomanías personalizadas", "diseño gráfico", "branding", "corte completo", "semi corte", "holográfico", "Colombia", "impresión HD", "cubreplacas"],
  authors: [{ name: "Pigmento Estudio" }],
  creator: "Pigmento Estudio",
  publisher: "Pigmento Estudio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Pigmento Stickers | El límite es tu imaginación",
    description: "Impresión de stickers personalizados de alta gama, vinilos texturizados y servicios de diseño. Haz que tu marca destaque.",
    url: baseUrl,
    siteName: "Pigmento Stickers",
    images: [
      {
        url: "/og-image.jpg", // Tienes que subir una imagen 1200x630px en /public como 'og-image.jpg'
        width: 1200,
        height: 630,
        alt: "Pigmento Stickers Portada",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pigmento Stickers | Stickers Premium",
    description: "Imprime tus ideas con la mejor calidad en vinilos y laminados.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: '/',
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
        <ConditionalFooter />
      </body>
    </html>
  );
}