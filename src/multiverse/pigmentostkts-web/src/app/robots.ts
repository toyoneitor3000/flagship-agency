import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    // Asegurarnos de que el entorno no indexe ramas de desarrollo si tuviéramos
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pigmentostickers.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/api/', '/_next/', '/private/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
