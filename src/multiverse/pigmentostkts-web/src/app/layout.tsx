import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ConditionalFooter from "@/components/ConditionalFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { auth } from "@/auth";

const GA_MEASUREMENT_ID = "G-HREDYTNMLH";
const META_PIXEL_ID = "486554994533422";

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
    default: "Stickers Personalizados en Bogotá | Calcomanías y Cubreplacas Colombia | Pigmento Stickers",
    template: "%s | Pigmento Stickers Bogotá"
  },
  description: "Impresión de stickers personalizados, calcomanías y cubreplacas en Bogotá. Envíos a toda Colombia. Vinilo de alta calidad, corte troquelado, laminado UV. Cotiza en línea.",
  keywords: ["stickers personalizados bogota", "calcomanias bogota", "calcomanias personalizadas colombia", "impresion de stickers", "cubreplacas personalizados", "fabrica de stickers colombia", "stickers publicitarios", "calcomanias para carros", "vinilo automotriz", "stickers por mayor", "imprenta stickers bogota", "stickers autoadhesivos", "diseño gráfico", "branding"],
  authors: [{ name: "Pigmento Estudio" }],
  creator: "Pigmento Estudio",
  publisher: "Pigmento Estudio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Stickers Personalizados en Bogotá | Calcomanías Colombia | Pigmento Stickers",
    description: "Impresión de stickers, calcomanías y cubreplacas personalizados en Bogotá. Envíos a toda Colombia. Cotiza en línea.",
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
    title: "Stickers Personalizados Bogotá | Pigmento Stickers",
    description: "Impresión de stickers, calcomanías y cubreplacas en Bogotá. Envíos a toda Colombia. Cotiza en línea.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="es">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Providers session={session}>
          {children}
          <FloatingWhatsApp />
        </Providers>
        <ConditionalFooter />
      </body>
    </html>
  );
}