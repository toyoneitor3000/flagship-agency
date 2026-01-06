/**
 * PURRPURR DESIGN LAB CONFIGURATION
 * 
 * Single source of truth for all design options used in the Studio.
 * Import from here instead of hardcoding in components.
 */

import {
    Camera, ShoppingBag, Briefcase, Rocket, Coffee, Building, Activity, Zap,
    Grid, Circle, Rows3, Columns, Square, Layers, Star, Users, Phone, MapPin,
    Image, Video, Quote, Type, Leaf
} from 'lucide-react';

// ============================================================================
// BRAND COLOR PALETTE (from wallpaper-test/page.tsx)
// ============================================================================
export const BRAND_PALETTE = [
    { id: 'WHITE', name: 'Pure White', hex: '#FFFFFF', class: 'bg-white' },
    { id: 'ZINC_50', name: 'Zinc 50', hex: '#FAFAFA', class: 'bg-zinc-50' },
    { id: 'ZINC_100', name: 'Zinc 100', hex: '#F4F4F5', class: 'bg-zinc-100' },
    { id: 'ZINC_200', name: 'Zinc 200', hex: '#E4E4E7', class: 'bg-zinc-200' },
    { id: 'ZINC_800', name: 'Zinc 800', hex: '#27272A', class: 'bg-zinc-800' },
    { id: 'ZINC_900', name: 'Zinc 900', hex: '#18181B', class: 'bg-zinc-900' },
    { id: 'ZINC_950', name: 'Zinc 950', hex: '#09090B', class: 'bg-zinc-950' },
    { id: 'BLACK', name: 'Pure Black', hex: '#000000', class: 'bg-black' },
    { id: 'PURPLE', name: 'Brand Purple', hex: '#6D28D9', class: 'bg-purple-600' },
    { id: 'NEON_GREEN', name: 'Neon Green', hex: '#00FF9C', class: 'bg-[#00FF9C]' },
    { id: 'MINT', name: 'Mint', hex: '#A7F3D0', class: 'bg-emerald-200' },
    { id: 'DEEP_BLUE', name: 'Deep Blue', hex: '#1E3A8A', class: 'bg-blue-900' },
    { id: 'HOT_PINK', name: 'Hot Pink', hex: '#DB2777', class: 'bg-pink-600' },
    { id: 'ORANGE', name: 'Orange', hex: '#EA580C', class: 'bg-orange-600' },
    { id: 'YELLOW', name: 'Yellow', hex: '#CA8A04', class: 'bg-yellow-600' },
] as const;

// ============================================================================
// COLOR PRESETS (Curated Theme Combinations)
// ============================================================================
export const COLOR_PRESETS = [
    {
        id: 'MIDNIGHT',
        name: 'Midnight',
        colors: {
            primary: '#6D28D9',
            secondary: '#1E1B4B',
            accent: '#A78BFA',
            background: '#0f0033'
        }
    },
    {
        id: 'FOREST',
        name: 'Forest',
        colors: {
            primary: '#059669',
            secondary: '#064E3B',
            accent: '#34D399',
            background: '#022C22'
        }
    },
    {
        id: 'SUNSET',
        name: 'Sunset',
        colors: {
            primary: '#F97316',
            secondary: '#7C2D12',
            accent: '#FDBA74',
            background: '#1C0A00'
        }
    },
    {
        id: 'OCEAN',
        name: 'Ocean',
        colors: {
            primary: '#0EA5E9',
            secondary: '#0C4A6E',
            accent: '#7DD3FC',
            background: '#0A1929'
        }
    },
    {
        id: 'ROSE',
        name: 'Rose',
        colors: {
            primary: '#F43F5E',
            secondary: '#4C0519',
            accent: '#FDA4AF',
            background: '#1A0A0E'
        }
    },
    {
        id: 'GOLD',
        name: 'Gold',
        colors: {
            primary: '#D4AF37',
            secondary: '#3D2E0A',
            accent: '#F5D77A',
            background: '#1A1402'
        }
    },
    {
        id: 'CYBER',
        name: 'Cyber',
        colors: {
            primary: '#00FF9C',
            secondary: '#18181B',
            accent: '#39FF14',
            background: '#000000'
        }
    },
    {
        id: 'MONOCHROME',
        name: 'Mono',
        colors: {
            primary: '#FFFFFF',
            secondary: '#27272A',
            accent: '#71717A',
            background: '#09090B'
        }
    },
] as const;

// ============================================================================
// ARCHETYPES / CATEGORIES (Business Types)
// ============================================================================
export const ARCHETYPES = [
    { id: 'CREATOR', label: 'Creator / Cine', icon: Camera, desc: 'Para influencers y cineastas. Full Screen Video.', color: '#ef4444' },
    { id: 'BOUTIQUE', label: 'E-Commerce Lujo', icon: ShoppingBag, desc: 'Moda y productos físicos. Minimalista.', color: '#d4af37' },
    { id: 'PROFESSIONAL', label: 'Servicios Pro', icon: Briefcase, desc: 'Abogados, Consultores. Serio y confiable.', color: '#3b82f6' },
    { id: 'STARTUP', label: 'Startup / SaaS', icon: Rocket, desc: 'Tecnología y Software. Gradientes y energía.', color: '#8b5cf6' },
    { id: 'GASTRO', label: 'Gastro / Bar', icon: Coffee, desc: 'Restaurantes y Cafés. Cálido y visual.', color: '#f97316' },
    { id: 'REAL_ESTATE', label: 'Arquitectura', icon: Building, desc: 'Inmobiliaria y Diseño. Elegante.', color: '#10b981' },
    { id: 'HEALTH', label: 'Salud & Wellness', icon: Activity, desc: 'Spa, Yoga, Dental. Limpio y zen.', color: '#06b6d4' },
    { id: 'AUTO', label: 'High Performance', icon: Zap, desc: 'Autos, Gym, Deportes. Agresivo.', color: '#eab308' },
] as const;

// ============================================================================
// LAYOUT OPTIONS
// ============================================================================
export const LAYOUT_OPTIONS = [
    { id: 'MINIMAL', name: 'Minimalista', icon: Square, desc: 'Limpio y elegante' },
    { id: 'BOLD', name: 'Bold', icon: Rows3, desc: 'Impactante y fuerte' },
    { id: 'GRID', name: 'Grid', icon: Grid, desc: 'Estructurado' },
    { id: 'ASYMMETRIC', name: 'Asimétrico', icon: Columns, desc: 'Creativo y único' },
] as const;

// ============================================================================
// AVAILABLE SECTIONS
// ============================================================================
export const AVAILABLE_SECTIONS = [
    { id: 'HERO', name: 'Hero', icon: Star, desc: 'Sección principal' },
    { id: 'ABOUT', name: 'Nosotros', icon: Users, desc: 'Quiénes somos' },
    { id: 'SERVICES', name: 'Servicios', icon: Layers, desc: 'Lo que ofrecemos' },
    { id: 'GALLERY', name: 'Galería', icon: Image, desc: 'Portfolio visual' },
    { id: 'TESTIMONIALS', name: 'Testimonios', icon: Quote, desc: 'Reseñas de clientes' },
    { id: 'VIDEO', name: 'Video', icon: Video, desc: 'Contenido multimedia' },
    { id: 'PRICING', name: 'Precios', icon: Type, desc: 'Planes y tarifas' },
    { id: 'CONTACT', name: 'Contacto', icon: Phone, desc: 'Formulario de contacto' },
    { id: 'LOCATION', name: 'Ubicación', icon: MapPin, desc: 'Mapa y dirección' },
] as const;

// ============================================================================
// VISUAL EFFECTS (from wallpaper-test)
// ============================================================================
export const VISUAL_EFFECTS = [
    { id: 'grid', label: 'Grid', desc: 'Retícula sutil' },
    { id: 'dots', label: 'Dots', desc: 'Puntos de fondo' },
    { id: 'scanlines', label: 'Scanline', desc: 'Líneas CRT' },
    { id: 'mesh', label: 'Mesh', desc: 'Gradiente mesh' },
    { id: 'ambient', label: 'Ambient', desc: 'Orbes flotantes' },
    { id: 'scanner', label: 'Scanner', desc: 'Línea animada' },
    { id: 'pulse', label: 'Pulse', desc: 'Pulso global' },
    { id: 'noise', label: 'Noise', desc: 'Grano de film' },
    { id: 'vignette', label: 'Vignette', desc: 'Viñeta oscura' },
    { id: 'blur', label: 'Blur', desc: 'Difuminado suave' },
] as const;

// ============================================================================
// GENERATIVE PATTERNS (from wallpaper-test)
// ============================================================================
export const GENERATIVE_PATTERNS = [
    { id: 'solid', name: 'Solid', desc: 'Color sólido' },
    { id: 'spotlight', name: 'Spotlight', desc: 'Gradiente focal' },
    { id: 'aurora', name: 'Aurora', desc: 'Luces boreales' },
    { id: 'velvet', name: 'Velvet', desc: 'Centro suave' },
    { id: 'cyber', name: 'Cyber', desc: 'Grilla cyberpunk' },
    { id: 'proton', name: 'Proton', desc: 'Gradiente diagonal' },
    { id: 'molten', name: 'Molten', desc: 'Lava líquida' },
    { id: 'data', name: 'Data', desc: 'Matrix digital' },
    { id: 'nebula', name: 'Nebula', desc: 'Espacio profundo' },
    { id: 'vortex', name: 'Vortex', desc: 'Remolino cónico' },
    { id: 'net', name: 'Net', desc: 'Patrón red' },
] as const;

// ============================================================================
// ANIMATION LEVELS
// ============================================================================
export const ANIMATION_LEVELS = [
    { id: 'NONE', name: 'Sin animaciones', icon: Square },
    { id: 'SUBTLE', name: 'Sutiles', icon: Leaf },
    { id: 'DYNAMIC', name: 'Dinámicas', icon: Zap },
] as const;

// ============================================================================
// TYPOGRAPHY CATEGORIES (from typography-test)
// ============================================================================
export const TYPOGRAPHY_CATEGORIES = [
    { id: 'sans', label: 'Sans Serif', desc: 'Modernas, legibles' },
    { id: 'serif', label: 'Serif', desc: 'Clásicas, elegantes' },
    { id: 'display', label: 'Display', desc: 'Impactantes' },
    { id: 'script', label: 'Script', desc: 'Manuscritas' },
    { id: 'mono', label: 'Monospace', desc: 'Técnicas' },
] as const;

// ============================================================================
// FONT PAIRINGS (Recommended Combinations)
// ============================================================================
export const FONT_PAIRINGS = [
    { display: 'Righteous', body: 'Inter', category: 'TECH' },
    { display: 'Playfair Display', body: 'Lora', category: 'LUXURY' },
    { display: 'Bebas Neue', body: 'Open Sans', category: 'MODERN' },
    { display: 'Anton', body: 'Roboto', category: 'BOLD' },
    { display: 'Space Grotesk', body: 'Inter', category: 'STARTUP' },
    { display: 'Cinzel', body: 'Cormorant Garamond', category: 'ELEGANT' },
] as const;

// ============================================================================
// DESIGN CONFIG TYPE
// ============================================================================
export interface DesignConfig {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    layout: typeof LAYOUT_OPTIONS[number]['id'];
    sections: string[];
    effects: {
        fluid: boolean;
        particles: boolean;
        glassmorphism: boolean;
        animations: typeof ANIMATION_LEVELS[number]['id'];
        pattern?: typeof GENERATIVE_PATTERNS[number]['id'];
        overlays?: string[]; // IDs from VISUAL_EFFECTS
    };
    typography?: {
        display: string;
        body: string;
        tracking?: number;
        leading?: number;
    };
}

// ============================================================================
// DEFAULT DESIGN CONFIG
// ============================================================================
export const DEFAULT_DESIGN_CONFIG: DesignConfig = {
    colors: COLOR_PRESETS[0].colors,
    layout: 'MINIMAL',
    sections: ['HERO', 'ABOUT', 'SERVICES', 'CONTACT'],
    effects: {
        fluid: true,
        particles: false,
        glassmorphism: true,
        animations: 'SUBTLE',
        pattern: 'spotlight',
        overlays: []
    },
    typography: {
        display: 'Righteous',
        body: 'Inter',
        tracking: -0.08,
        leading: 0.85
    }
};

// ============================================================================
// HELPER: Get archetype theme
// ============================================================================
export function getArchetypeTheme(archetypeId: string) {
    const arch = ARCHETYPES.find(a => a.id === archetypeId);
    if (!arch) return COLOR_PRESETS[0].colors;

    return {
        primary: arch.color,
        secondary: '#18181B',
        accent: arch.color,
        background: '#000000'
    };
}

// ============================================================================
// HELPER: Get contrast theme (light/dark)
// ============================================================================
export function getContrastTheme(hex: string): 'light' | 'dark' {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? 'light' : 'dark';
}
