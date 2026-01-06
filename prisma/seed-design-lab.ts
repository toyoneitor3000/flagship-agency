import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const connectionString = process.env.DATABASE_URL || 'file:./dev.db';

const adapter = new PrismaLibSql({
    url: connectionString,
});

const prisma = new PrismaClient({ adapter });

/**
 * SEED: Poblar las herramientas del Design Lab
 * 
 * Ejecutar con: npx prisma db seed
 * O manualmente: npx tsx prisma/seed-design-lab.ts
 */

async function seedDesignLab() {
    console.log('🧪 Seeding Design Lab tools...');

    // ==========================================
    // COLOR PALETTES
    // ==========================================
    const palettes = [
        { name: 'Midnight', slug: 'midnight', primary: '#6D28D9', secondary: '#1E1B4B', accent: '#A78BFA', background: '#0f0033', category: 'DARK', sortOrder: 0 },
        { name: 'Forest', slug: 'forest', primary: '#059669', secondary: '#064E3B', accent: '#34D399', background: '#022C22', category: 'DARK', sortOrder: 1 },
        { name: 'Sunset', slug: 'sunset', primary: '#F97316', secondary: '#7C2D12', accent: '#FDBA74', background: '#1C0A00', category: 'WARM', sortOrder: 2 },
        { name: 'Ocean', slug: 'ocean', primary: '#0EA5E9', secondary: '#0C4A6E', accent: '#7DD3FC', background: '#0A1929', category: 'COOL', sortOrder: 3 },
        { name: 'Rose', slug: 'rose', primary: '#F43F5E', secondary: '#4C0519', accent: '#FDA4AF', background: '#1A0A0E', category: 'WARM', sortOrder: 4 },
        { name: 'Gold', slug: 'gold', primary: '#D4AF37', secondary: '#3D2E0A', accent: '#F5D77A', background: '#1A1402', category: 'LUXURY', sortOrder: 5 },
        { name: 'Cyber', slug: 'cyber', primary: '#00FF9C', secondary: '#18181B', accent: '#39FF14', background: '#000000', category: 'TECH', sortOrder: 6 },
        { name: 'Monochrome', slug: 'monochrome', primary: '#FFFFFF', secondary: '#27272A', accent: '#71717A', background: '#09090B', category: 'MINIMAL', sortOrder: 7 },
    ];

    for (const palette of palettes) {
        await prisma.colorPalette.upsert({
            where: { slug: palette.slug },
            update: palette,
            create: palette
        });
    }
    console.log(`  ✔ ${palettes.length} Color Palettes`);

    // ==========================================
    // LAYOUT OPTIONS
    // ==========================================
    const layouts = [
        { name: 'Minimalista', slug: 'minimal', description: 'Limpio y elegante', icon: 'Square', sortOrder: 0 },
        { name: 'Bold', slug: 'bold', description: 'Impactante y fuerte', icon: 'Rows3', sortOrder: 1 },
        { name: 'Grid', slug: 'grid', description: 'Estructurado', icon: 'Grid', sortOrder: 2 },
        { name: 'Asymmetric', slug: 'asymmetric', description: 'Creativo y único', icon: 'Columns', sortOrder: 3 },
    ];

    for (const layout of layouts) {
        await prisma.layoutOption.upsert({
            where: { slug: layout.slug },
            update: layout,
            create: layout
        });
    }
    console.log(`  ✔ ${layouts.length} Layout Options`);

    // ==========================================
    // SECTION TEMPLATES
    // ==========================================
    const sections = [
        { name: 'Hero', slug: 'hero', description: 'Sección principal', icon: 'Star', category: 'HERO', sortOrder: 0 },
        { name: 'Nosotros', slug: 'about', description: 'Quiénes somos', icon: 'Users', category: 'CONTENT', sortOrder: 1 },
        { name: 'Servicios', slug: 'services', description: 'Lo que ofrecemos', icon: 'Layers', category: 'CONTENT', sortOrder: 2 },
        { name: 'Galería', slug: 'gallery', description: 'Portfolio visual', icon: 'Image', category: 'MEDIA', sortOrder: 3 },
        { name: 'Testimonios', slug: 'testimonials', description: 'Reseñas de clientes', icon: 'Quote', category: 'SOCIAL', sortOrder: 4 },
        { name: 'Video', slug: 'video', description: 'Contenido multimedia', icon: 'Video', category: 'MEDIA', sortOrder: 5 },
        { name: 'Precios', slug: 'pricing', description: 'Planes y tarifas', icon: 'CreditCard', category: 'COMMERCE', sortOrder: 6 },
        { name: 'Contacto', slug: 'contact', description: 'Formulario de contacto', icon: 'Phone', category: 'CONTACT', sortOrder: 7 },
        { name: 'Ubicación', slug: 'location', description: 'Mapa y dirección', icon: 'MapPin', category: 'CONTACT', sortOrder: 8 },
        { name: 'FAQ', slug: 'faq', description: 'Preguntas frecuentes', icon: 'HelpCircle', category: 'CONTENT', sortOrder: 9 },
        { name: 'Blog', slug: 'blog', description: 'Artículos y noticias', icon: 'FileText', category: 'CONTENT', isPremium: true, sortOrder: 10 },
        { name: 'Newsletter', slug: 'newsletter', description: 'Suscripción por email', icon: 'Mail', category: 'SOCIAL', sortOrder: 11 },
    ];

    for (const section of sections) {
        await prisma.sectionTemplate.upsert({
            where: { slug: section.slug },
            update: section,
            create: section
        });
    }
    console.log(`  ✔ ${sections.length} Section Templates`);

    // ==========================================
    // VISUAL EFFECTS
    // ==========================================
    const effects = [
        { name: 'Grid', slug: 'grid', description: 'Retícula sutil', type: 'OVERLAY', cssClass: 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]', sortOrder: 0 },
        { name: 'Dots', slug: 'dots', description: 'Puntos de fondo', type: 'OVERLAY', cssClass: 'bg-[radial-gradient(#80808025_1px,transparent_1px)] [background-size:20px_20px]', sortOrder: 1 },
        { name: 'Scanlines', slug: 'scanlines', description: 'Líneas CRT', type: 'OVERLAY', cssClass: 'bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)50%,rgba(0,0,0,0.1)50%,rgba(0,0,0,0.1))] bg-[size:100%_4px]', sortOrder: 2 },
        { name: 'Mesh', slug: 'mesh', description: 'Gradiente mesh', type: 'OVERLAY', cssClass: 'bg-[radial-gradient(at_top_left,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(at_bottom_right,rgba(0,0,0,0.2)_0%,transparent_50%)]', sortOrder: 3 },
        { name: 'Vignette', slug: 'vignette', description: 'Viñeta oscura', type: 'OVERLAY', cssClass: 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]', sortOrder: 4 },
        { name: 'Noise', slug: 'noise', description: 'Grano de film', type: 'OVERLAY', sortOrder: 5 },
        { name: 'Blur', slug: 'blur', description: 'Difuminado suave', type: 'OVERLAY', cssClass: 'backdrop-blur-[2px]', sortOrder: 6 },
        { name: 'Ambient', slug: 'ambient', description: 'Orbes flotantes', type: 'ANIMATION', sortOrder: 7 },
        { name: 'Scanner', slug: 'scanner', description: 'Línea animada', type: 'ANIMATION', sortOrder: 8 },
        { name: 'Pulse', slug: 'pulse', description: 'Pulso global', type: 'ANIMATION', sortOrder: 9 },
    ];

    for (const effect of effects) {
        await prisma.visualEffect.upsert({
            where: { slug: effect.slug },
            update: effect,
            create: effect
        });
    }
    console.log(`  ✔ ${effects.length} Visual Effects`);

    // ==========================================
    // GENERATIVE PATTERNS
    // ==========================================
    const patterns = [
        { name: 'Solid', slug: 'solid', description: 'Color sólido', generator: JSON.stringify({ type: 'solid' }), sortOrder: 0 },
        { name: 'Spotlight', slug: 'spotlight', description: 'Gradiente focal', generator: JSON.stringify({ type: 'radial', position: 'top' }), sortOrder: 1 },
        { name: 'Aurora', slug: 'aurora', description: 'Luces boreales', generator: JSON.stringify({ type: 'aurora', blobs: 3 }), sortOrder: 2 },
        { name: 'Velvet', slug: 'velvet', description: 'Centro suave', generator: JSON.stringify({ type: 'radial', position: 'center' }), sortOrder: 3 },
        { name: 'Cyber', slug: 'cyber', description: 'Grilla cyberpunk', generator: JSON.stringify({ type: 'grid', glow: true }), sortOrder: 4 },
        { name: 'Proton', slug: 'proton', description: 'Gradiente diagonal', generator: JSON.stringify({ type: 'linear', angle: 135 }), sortOrder: 5 },
        { name: 'Molten', slug: 'molten', description: 'Lava líquida', generator: JSON.stringify({ type: 'blobs', count: 3 }), sortOrder: 6 },
        { name: 'Data', slug: 'data', description: 'Matrix digital', generator: JSON.stringify({ type: 'data', lines: true }), sortOrder: 7 },
        { name: 'Nebula', slug: 'nebula', description: 'Espacio profundo', generator: JSON.stringify({ type: 'nebula', depth: 3 }), sortOrder: 8 },
        { name: 'Vortex', slug: 'vortex', description: 'Remolino cónico', generator: JSON.stringify({ type: 'conic' }), sortOrder: 9 },
        { name: 'Net', slug: 'net', description: 'Patrón red', generator: JSON.stringify({ type: 'checkered', rotate: 45 }), sortOrder: 10 },
    ];

    for (const pattern of patterns) {
        await prisma.generativePattern.upsert({
            where: { slug: pattern.slug },
            update: pattern,
            create: pattern
        });
    }
    console.log(`  ✔ ${patterns.length} Generative Patterns`);

    // ==========================================
    // FONT PAIRINGS
    // ==========================================
    const fontPairings = [
        { name: 'Tech Stack', displayFont: 'Righteous', bodyFont: 'Inter', category: 'TECH', tracking: -0.08, leading: 0.85, sortOrder: 0 },
        { name: 'Luxury Classic', displayFont: 'Playfair Display', bodyFont: 'Lora', category: 'LUXURY', tracking: 0, leading: 1.0, sortOrder: 1 },
        { name: 'Modern Impact', displayFont: 'Bebas Neue', bodyFont: 'Open Sans', category: 'MODERN', tracking: 0.05, leading: 0.9, sortOrder: 2 },
        { name: 'Bold Statement', displayFont: 'Anton', bodyFont: 'Roboto', category: 'BOLD', tracking: 0.02, leading: 0.95, sortOrder: 3 },
        { name: 'Startup Vibes', displayFont: 'Space Grotesk', bodyFont: 'Inter', category: 'TECH', tracking: -0.04, leading: 1.0, sortOrder: 4 },
        { name: 'Elegant Heritage', displayFont: 'Cinzel', bodyFont: 'Cormorant Garamond', category: 'ELEGANT', tracking: 0.1, leading: 1.1, sortOrder: 5 },
        { name: 'Creative Energy', displayFont: 'Syne', bodyFont: 'Poppins', category: 'CREATIVE', tracking: -0.02, leading: 0.95, sortOrder: 6 },
        { name: 'Minimal Clean', displayFont: 'Montserrat', bodyFont: 'Raleway', category: 'MINIMAL', tracking: 0, leading: 1.0, sortOrder: 7 },
    ];

    for (const pairing of fontPairings) {
        await prisma.fontPairing.upsert({
            where: { name: pairing.name },
            update: pairing,
            create: pairing
        });
    }
    console.log(`  ✔ ${fontPairings.length} Font Pairings`);

    // ==========================================
    // ARCHETYPES
    // ==========================================
    const archetypes = [
        { name: 'creator', slug: 'creator', label: 'Creator / Cine', description: 'Para influencers y cineastas. Full Screen Video.', icon: 'Camera', color: '#ef4444', sortOrder: 0 },
        { name: 'boutique', slug: 'boutique', label: 'E-Commerce Lujo', description: 'Moda y productos físicos. Minimalista.', icon: 'ShoppingBag', color: '#d4af37', sortOrder: 1 },
        { name: 'professional', slug: 'professional', label: 'Servicios Pro', description: 'Abogados, Consultores. Serio y confiable.', icon: 'Briefcase', color: '#3b82f6', sortOrder: 2 },
        { name: 'startup', slug: 'startup', label: 'Startup / SaaS', description: 'Tecnología y Software. Gradientes y energía.', icon: 'Rocket', color: '#8b5cf6', sortOrder: 3 },
        { name: 'gastro', slug: 'gastro', label: 'Gastro / Bar', description: 'Restaurantes y Cafés. Cálido y visual.', icon: 'Coffee', color: '#f97316', sortOrder: 4 },
        { name: 'real_estate', slug: 'real-estate', label: 'Arquitectura', description: 'Inmobiliaria y Diseño. Elegante.', icon: 'Building', color: '#10b981', sortOrder: 5 },
        { name: 'health', slug: 'health', label: 'Salud & Wellness', description: 'Spa, Yoga, Dental. Limpio y zen.', icon: 'Activity', color: '#06b6d4', sortOrder: 6 },
        { name: 'auto', slug: 'auto', label: 'High Performance', description: 'Autos, Gym, Deportes. Agresivo.', icon: 'Zap', color: '#eab308', sortOrder: 7 },
    ];

    for (const archetype of archetypes) {
        await prisma.archetype.upsert({
            where: { slug: archetype.slug },
            update: archetype,
            create: archetype
        });
    }
    console.log(`  ✔ ${archetypes.length} Archetypes`);

    console.log('\n✅ Design Lab seeding complete!');
}

// Run the seed
seedDesignLab()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
