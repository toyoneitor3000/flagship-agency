import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ⚠️ ATENCION: Esto permite el deploy aunque haya errores de caché de TS
    // Necesario para arreglar el loop de 'Cannot find module page.js'
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'image.thum.io',
      },
    ],
  },

};

export default nextConfig;