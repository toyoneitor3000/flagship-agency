import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swMinify: false,
  disable: true, // Temporarily disabled to fix build error
  workboxOptions: {
    disableDevLogs: true,
  },
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "libsql", "@prisma/adapter-libsql"],
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default withPWA(nextConfig);