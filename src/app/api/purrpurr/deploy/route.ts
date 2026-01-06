
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// --- ARCHETYPES COLOR MAPPING (Synced with Studio) ---
const ARCHETYPE_COLORS: Record<string, { color1: string; color2: string; color3: string; color4: string }> = {
    'CREATOR': { color1: '#000000', color2: '#18181b', color3: '#ef4444', color4: '#000000' },
    'BOUTIQUE': { color1: '#000000', color2: '#18181b', color3: '#d4af37', color4: '#000000' },
    'PROFESSIONAL': { color1: '#000000', color2: '#18181b', color3: '#3b82f6', color4: '#000000' },
    'STARTUP': { color1: '#000000', color2: '#18181b', color3: '#8b5cf6', color4: '#000000' },
    'GASTRO': { color1: '#000000', color2: '#18181b', color3: '#f97316', color4: '#000000' },
    'REAL_ESTATE': { color1: '#000000', color2: '#18181b', color3: '#10b981', color4: '#000000' },
    'HEALTH': { color1: '#000000', color2: '#18181b', color3: '#06b6d4', color4: '#000000' },
    'AUTO': { color1: '#000000', color2: '#18181b', color3: '#eab308', color4: '#000000' },
    // Default fallback
    'DEFAULT': { color1: '#000000', color2: '#18181b', color3: '#6D28D9', color4: '#000000' }
};

export async function POST(req: Request) {
    try {

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { name, category, logoUrl, fontStyle, description, location, whatsapp, complexity, editingSlug } = body;

        // Get theme colors based on category
        const themeColors = ARCHETYPE_COLORS[category] || ARCHETYPE_COLORS['DEFAULT'];

        // 1. Construct the "DNA" (Architecture JSON)
        // This is where " The Machine" logic starts.
        // We structure the unstructured input into the strict schema defined in the Blueprint.

        // 1. Construct the "DNA" (Architecture JSON) - THE STORYLET
        // We now generate the FULL High-End Agency structure defined in the Blueprint.

        const architecture = {
            identity: {
                name: name,
                category: category,
                domain: `${name.toLowerCase().replace(/\s/g, '')}.com`,
                seo: {
                    title: `${name} | ${category} Premium`,
                    description: description.substring(0, 160),
                    keywords: [category, location, complexity]
                },
                brand: {
                    typography: fontStyle,
                    colors: {
                        primary: '#000000',
                        secondary: '#ffffff'
                    },
                    // NEW: Theme colors for FluidBackground
                    themeColors: themeColors
                }
            },
            ui: {
                theme: complexity === 'HIGH' ? 'COMMERCE_PRO' : 'PORTFOLIO_LITE',
                layout: 'VERTICAL_SCROLL'
            },
            sections: [
                // 1. HERO (The Promise)
                {
                    id: 'hero',
                    type: 'HERO',
                    content: {
                        title: name,
                        subtitle: description,
                        cta: "Ver Propuesta"
                    }
                },
                // 2. AUTHORITY (Social Proof)
                {
                    id: 'authority',
                    type: 'AUTHORITY',
                    content: {
                        headline: "Con la confianza de líderes del sector",
                        logos: ["Alpha", "BetaCorp", "Gamma Systems", "Delta Group"] // Mock logos
                    }
                },
                // 3. VALUE PROP (The Solution - 3 Cards)
                {
                    id: 'value',
                    type: 'VALUE_PROP',
                    content: {
                        headline: "¿Por qué elegirnos?",
                        cards: [
                            { title: "Diseño Premium", desc: "Estética curada para un impacto visual inmediato." },
                            { title: "Velocidad Extrema", desc: "Optimización técnica para carga en <1s." },
                            { title: "Soporte Total", desc: "Acompañamiento estratégico 24/7." }
                        ]
                    }
                },
                // 4. DEMO/WORK (The Evidence)
                {
                    id: 'demo',
                    type: 'DEMO',
                    content: {
                        headline: "Nuestro Trabajo",
                        type: complexity === 'HIGH' ? 'PRODUCTS' : 'GALLERY', // Adapts to user need
                        items: [1, 2, 3] // Placeholders for images
                    }
                },
                // 5. PRICING (The Offer)
                {
                    id: 'pricing',
                    type: 'PRICING',
                    content: {
                        headline: "Planes Simples",
                        plans: [
                            { name: "Starter", price: "$499", features: ["Landing Page", "SEO Básico", "Soporte Email"] },
                            { name: "Pro", price: "$999", features: ["Web Completa", "SEO Avanzado", "CMS Autoadministrable", "Soporte Prioritario"] }
                        ]
                    }
                },
                // 6. FAQ (Objections)
                {
                    id: 'faq',
                    type: 'FAQ',
                    content: {
                        headline: "Preguntas Frecuentes",
                        items: [
                            { q: "¿Cuánto tardan en entregar?", a: "Dependiendo de la complejidad, entre 48 horas y 1 semana." },
                            { q: "¿Incluye Hosting?", a: "Sí, todos nuestros planes incluyen servidor de alta velocidad." }
                        ]
                    }
                },
                // 7. CONTACT (The Close)
                {
                    id: 'contact',
                    type: 'CONTACT',
                    content: {
                        whatsapp: whatsapp,
                        location: location,
                        email: `contacto@${name.toLowerCase().replace(/\s/g, '')}.com`
                    }
                }
            ]
        };

        let project;
        let slug: string;

        // CHECK: Are we UPDATING or CREATING?
        if (editingSlug) {
            // UPDATE MODE: Find existing project and update it
            const existingProject = await prisma.project.findFirst({
                where: {
                    slug: editingSlug,
                    userId: session.user.id
                }
            });

            if (!existingProject) {
                return NextResponse.json(
                    { success: false, error: "Project not found for update" },
                    { status: 404 }
                );
            }

            project = await prisma.project.update({
                where: { id: existingProject.id },
                data: {
                    name: name,
                    architecture: JSON.stringify(architecture),
                    integrations: whatsapp ? JSON.stringify({ whatsapp }) : null
                    // Note: We keep the same slug - no renaming
                }
            });
            slug = project.slug;

        } else {
            // CREATE MODE: Generate new slug and create project
            slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

            // Ensure slug uniqueness (simple collision handling)
            const count = await prisma.project.count({
                where: {
                    slug: {
                        startsWith: slug
                    }
                }
            });

            if (count > 0) {
                slug = `${slug}-${count + 1}`;
            }

            project = await prisma.project.create({
                data: {
                    name: name,
                    slug: slug,
                    userId: session.user.id,
                    status: 'DRAFT',
                    architecture: JSON.stringify(architecture),
                    integrations: whatsapp ? JSON.stringify({ whatsapp }) : null
                }
            });
        }

        return NextResponse.json({
            success: true,
            projectId: project.id,
            projectSlug: project.slug,
            isUpdate: !!editingSlug,
            message: editingSlug ? "Project successfully updated." : "Project DNA successfully stored in the Core."
        });

    } catch (error) {
        console.error("DEPLOY ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Failed to deploy project to the Core." },
            { status: 500 }
        );
    }
}
