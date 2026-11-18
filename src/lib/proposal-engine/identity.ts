import type { BrandIdentity, ProjectSector, VisualConfiguration } from './types';

// =============================================================================
// LAYER 1 — PERMANENT INSTITUTIONAL IDENTITY (LOCKED ACROSS ALL PROPOSALS)
// PURRPURR.DEV × SPEEDLIGHT CULTURE
// =============================================================================

export const INSTITUTIONAL_PALETTE = {
    pearl: '#F7F7F5' as const,          // 75% dominant editorial paper surface
    ink: '#111111' as const,            // 20% structure, high-contrast headlines, dark blocks
    lightGray: '#E7E7E5' as const,      // Structural dividers & borders
    secondaryGray: '#777777' as const,  // Technical captions & institutional metadata
    institutionalPurple: '#9B5CFF' as const, // 5% purrpurr.dev alliance indicator
};

export const INSTITUTIONAL_IDENTITY: BrandIdentity = {
    allianceLabel: 'ALIANZA ESTRATÉGICA OFICIAL · PURRPURR.DEV × SPEEDLIGHT CULTURE',
    primaryBrand: {
        name: 'purrpurr.dev',
        tagline: 'Ingeniería de Software, Motores A4 & Automatización B2B',
        logoSrc: '/brand/purrpurrlogo.png',
        domain: 'purrpurr.dev',
    },
    partnerBrand: {
        name: 'Speedlight Culture',
        tagline: 'Ecosistema Automotriz, Taller Works & Producción Editorial',
        logoSrc: '/brand/speedlight-logo-black-ui.png',
        domain: 'speedlightculture.com',
    },
    issuerRepresentative: 'Camilo Andrés Toloza Petter',
    issuerDocument: 'C.C. 1.019.089.803 · Régimen No Responsable de IVA',
    issuerEmail: 'camilo@purrpurr.dev',
    issuerPhone: '+57 316 053 5247 · +57 313 883 0156',
    city: 'Bogotá D.C., Colombia',
    signatureSrc: '/signatures/camilo-toloza-signature-black.png',
};

// =============================================================================
// LAYER 2 — SECTOR ART DIRECTION (CONTROLLED VARIATION BY SECTOR)
// =============================================================================

export interface SectorArtDirection {
    sector: ProjectSector;
    label: string;
    sectorAccent: string;
    sectorDark: string;
    artDirectionStyle: string;
    badgeLabel: string;
    photographyPools: {
        cover: string[];
        solution: string[];
        operations: string[];
    };
}

export const SECTOR_ART_DIRECTIONS: Record<ProjectSector, SectorArtDirection> = {
    software: {
        sector: 'software',
        label: 'Software, SaaS & Ingeniería B2B',
        sectorAccent: '#9B5CFF',
        sectorDark: '#111111',
        artDirectionStyle:
            'Editorial Tech Monograph · UI Vectorial sobre Fotografía de Estudio · Iluminación Neutra Contrastada',
        badgeLabel: 'SOFTWARE ARCHITECTURE',
        photographyPools: {
            cover: [
                '/cotizaciones/prop-jl-2026-094/hero-cover-detailing-studio.png',
                '/cotizaciones/prop-jl-2026-094/operacion-wompi-crm-taller.png',
            ],
            solution: [
                '/cotizaciones/prop-jl-2026-094/mockup-software-cotizador-ui.png',
                '/cotizaciones/prop-jl-2026-094/hero-cover-detailing-studio.png',
            ],
            operations: [
                '/cotizaciones/prop-jl-2026-094/operacion-wompi-crm-taller.png',
                '/cotizaciones/prop-jl-2026-094/mockup-software-cotizador-ui.png',
            ],
        },
    },
    automotive: {
        sector: 'automotive',
        label: 'Automotriz, Blindaje PPF & Works',
        sectorAccent: '#FF9800',
        sectorDark: '#0E0704',
        artDirectionStyle:
            'Automotive Museum Curation · Luz Arquitectónica de Estudio · Ficha Técnica de Ingeniería PPF TPU',
        badgeLabel: 'SPEEDLIGHT WORKS · AUTOMOTIVE',
        photographyPools: {
            cover: [
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_matte_hero.webp',
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_rear_real.webp',
            ],
            solution: [
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_rear_real.webp',
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_matte_hero.webp',
            ],
            operations: [
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_matte_hero.webp',
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_rear_real.webp',
            ],
        },
    },
    branding: {
        sector: 'branding',
        label: 'Branding, Identidad & Campañas',
        sectorAccent: '#9B5CFF',
        sectorDark: '#111111',
        artDirectionStyle:
            'Swiss Editorial Monograph · Grilla Arquitectónica · Composición Tipográfica de Alta Precisión',
        badgeLabel: 'BRANDING & EDITORIAL',
        photographyPools: {
            cover: [
                '/cotizaciones/prop-jl-2026-094/hero-cover-detailing-studio.png',
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_matte_hero.webp',
            ],
            solution: [
                '/cotizaciones/prop-jl-2026-094/mockup-software-cotizador-ui.png',
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_ppf_opticas.png',
            ],
            operations: [
                '/cotizaciones/prop-jl-2026-094/operacion-wompi-crm-taller.png',
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_rear_real.webp',
            ],
        },
    },
    architecture: {
        sector: 'architecture',
        label: 'Arquitectura, Espacios & Talleres Flagship',
        sectorAccent: '#C2410C',
        sectorDark: '#160C08',
        artDirectionStyle:
            'Spatial Monograph · Acabados Materiales de Bahía · Iluminación Técnica Sin Sombras Duras',
        badgeLabel: 'SPATIAL ARCHITECTURE',
        photographyPools: {
            cover: [
                '/cotizaciones/prop-jl-2026-094/operacion-wompi-crm-taller.png',
                '/cotizaciones/prop-jl-2026-094/hero-cover-detailing-studio.png',
            ],
            solution: [
                '/cotizaciones/prop-jl-2026-094/hero-cover-detailing-studio.png',
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_matte_hero.webp',
            ],
            operations: [
                '/cotizaciones/prop-jl-2026-094/operacion-wompi-crm-taller.png',
                '/cotizaciones/tesla-model-y/tesla_model_y_juniper_rear_real.webp',
            ],
        },
    },
};

export function createVisualConfiguration(
    sector: ProjectSector,
    colorVariant: VisualConfiguration['colorVariant'] = 'pearl-light',
): VisualConfiguration {
    const dir = SECTOR_ART_DIRECTIONS[sector];
    return {
        system: 'mixed',
        layoutMode: 'fixed',
        pageMode: 'adaptive',
        sector,
        colorVariant,
        palette: {
            ...INSTITUTIONAL_PALETTE,
            sectorAccent: dir.sectorAccent,
            sectorDark: dir.sectorDark,
        },
        typography: {
            display: 'Space Grotesk',
            body: 'Inter',
            mono: 'JetBrains Mono',
        },
        artDirectionStyle: dir.artDirectionStyle,
        lockedInstitutionalElements: true,
    };
}

export const VARIATION_GOVERNANCE_RULES = [
    { element: 'Logotipos institucionales', canChange: false, rule: 'Archivos originales bloqueados en cabecera y cierre.' },
    { element: 'Márgenes y retícula A4 (210×297mm)', canChange: false, rule: 'Sangría 0, margen de seguridad 14mm, 12 columnas fijas.' },
    { element: 'Sistema de numeración editorial', canChange: false, rule: 'PÁG. 01 / 0N y secciones 01..0N constantes.' },
    { element: 'Tipografía base', canChange: false, rule: 'Space Grotesk (H1-H3) + Inter (Body) + JetBrains Mono (Data).' },
    { element: 'Plantillas aprobadas (15 Fixed)', canChange: false, rule: 'Solo se seleccionan plantillas del registro oficial.' },
    { element: 'Fotografía de portada e interiores', canChange: true, rule: 'Curada por sector mediante Asset Engine.' },
    { element: 'Acento secundario sectorial', canChange: true, rule: 'Controlado por Capa 2 (#9B5CFF Software, #FF9800 Automotriz).' },
    { element: 'Recursos gráficos sectoriales', canChange: true, rule: 'Mockups vectoriales UI o diagramas de telemetría PPF.' },
] as const;
