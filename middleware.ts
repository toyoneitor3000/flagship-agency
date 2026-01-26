import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host");

    // Definir dominios y sus carpetas en _sites
    // Puedes agregar más dominios aquí
    const domains = [
        { domain: "victorycarsdetailing.com", slug: "victory-cars-detailing" },
        { domain: "www.victorycarsdetailing.com", slug: "victory-cars-detailing" },
        // Para pruebas locales: victory.localhost:3002
        { domain: "victory.localhost:3002", slug: "victory-cars-detailing" }
    ];

    const currentDomain = domains.find(d => d.domain === hostname);

    if (currentDomain) {
        // Reescribir la URL para que Next.js renderice el contenido de _sites/[slug]
        // Ejemplo: victorycarsdetailing.com/promociones -> /_sites/victory-cars-detailing/promociones
        url.pathname = `/_sites/${currentDomain.slug}${url.pathname}`;

        // Use cookie instead of header for tenant detection (headers don't propagate through rewrites)
        const response = NextResponse.rewrite(url);
        response.cookies.set('x-tenant-site', currentDomain.slug, {
            path: '/',
            sameSite: 'lax'
        });
        return response;
    }

    return NextResponse.next();
}
