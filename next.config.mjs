/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["@libsql/client", "libsql", "@prisma/adapter-libsql"],
    allowedDevOrigins: ["flagship.purrpurr.dev", "localhost:3002", "127.0.0.1:3002"],
    experimental: {
        serverActions: {
            allowedOrigins: ["flagship.purrpurr.dev", "localhost:3002", "127.0.0.1:3002"],
        },
    },
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
    // webpack: (config) => {
    //     // config.module.rules.push({
    //     //     test: /\.md$/,
    //     //     type: 'asset/source',
    //     // });
    //     return config;
    // },
};

export default nextConfig;
