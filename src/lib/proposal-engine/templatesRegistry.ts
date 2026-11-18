import type { ApprovedTemplateId, TemplateCategory, TemplateMetadata } from './types';

// =============================================================================
// 04B · DESIGN ENGINE — LIBRARY OF 15 APPROVED FIXED TEMPLATES
// La IA selecciona plantillas aprobadas, pero nunca modifica sus geometrías.
// =============================================================================

export const APPROVED_TEMPLATES: Record<ApprovedTemplateId, TemplateMetadata> = {
    // -------------------------------------------------------------------------
    // 1. COVER (3 Templates)
    // -------------------------------------------------------------------------
    'cover-editorial-a': {
        id: 'cover-editorial-a',
        category: 'cover',
        name: 'Cover Editorial A · Hero Full-Frame',
        description: 'Portada institucional asimétrica con H1 editorial de alto contraste, datos de partes y hero visual inferior.',
        columns: 12,
        imageZones: [
            { id: 'hero-main', label: 'Hero Visual Principal', aspectRatio: '16:9', minResolution: '1920x1080', required: true },
        ],
        typographicZones: [
            { id: 'cover-title', role: 'H1', maxChars: 90, maxLines: 3 },
            { id: 'cover-lead', role: 'Body', maxChars: 240, maxLines: 3 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'ProposalID', 'PageNumber', 'BrandDivider', 'BrandFooter'],
        allowedEditorialComponents: ['HeroTitle', 'MetricBlock'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['pearl-light', 'mixed-split'],
        contentRules: { minItems: 1, maxItems: 3, maxBodyWords: 45 },
    },
    'cover-image-split': {
        id: 'cover-image-split',
        category: 'cover',
        name: 'Cover Image Split · Bilateral 50/50',
        description: 'Portada de grilla dividida verticalmente: columna izquierda institucional + panel fotográfico a sangre a la derecha.',
        columns: 12,
        imageZones: [
            { id: 'hero-split', label: 'Panel Fotográfico Vertical', aspectRatio: '4:5', minResolution: '1600x2000', required: true },
        ],
        typographicZones: [
            { id: 'cover-title', role: 'H1', maxChars: 75, maxLines: 4 },
            { id: 'cover-lead', role: 'Body', maxChars: 220, maxLines: 4 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'ProposalID', 'PageNumber', 'BrandDivider', 'BrandFooter'],
        allowedEditorialComponents: ['HeroTitle', 'InfoCard'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['mixed-split', 'pearl-light'],
        contentRules: { minItems: 1, maxItems: 2, maxBodyWords: 40 },
    },
    'cover-dark-closing': {
        id: 'cover-dark-closing',
        category: 'cover',
        name: 'Cover Dark Closing · Monolito Negro',
        description: 'Portada de alto contraste con bloque dominante negro #111111, acento sectorial y ficha técnica resumida.',
        columns: 12,
        imageZones: [
            { id: 'hero-dark', label: 'Fotografía Cinemática Dark', aspectRatio: '16:9', minResolution: '1920x1080', required: true },
        ],
        typographicZones: [
            { id: 'cover-title', role: 'H1', maxChars: 80, maxLines: 3 },
            { id: 'cover-lead', role: 'Body', maxChars: 200, maxLines: 3 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'ProposalID', 'PageNumber', 'BrandDivider', 'BrandFooter'],
        allowedEditorialComponents: ['HeroTitle', 'MetricBlock'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['obsidian-contrast', 'mixed-split'],
        contentRules: { minItems: 1, maxItems: 3, maxBodyWords: 35 },
    },

    // -------------------------------------------------------------------------
    // 2. EXECUTIVE (2 Templates)
    // -------------------------------------------------------------------------
    'executive-summary-a': {
        id: 'executive-summary-a',
        category: 'executive',
        name: 'Executive Summary A · Síntesis + Métricas',
        description: 'Resumen ejecutivo de alianza, diagnóstico de contexto y bloque negro de métricas de impacto + objetivos.',
        columns: 12,
        imageZones: [
            { id: 'context-photo', label: 'Fotografía Contextual Lateral', aspectRatio: '4:3', minResolution: '1200x900', required: false },
        ],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 70, maxLines: 2 },
            { id: 'exec-body', role: 'Body', maxChars: 520, maxLines: 7 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['InfoCard', 'MetricBlock'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['pearl-light', 'mixed-split'],
        contentRules: { minItems: 2, maxItems: 4, maxBodyWords: 95 },
    },
    'executive-summary-b': {
        id: 'executive-summary-b',
        category: 'executive',
        name: 'Executive Summary B · Diagnóstico & Objetivos 2×2',
        description: 'Página dedicada a contexto del negocio, brechas operativas actuales y matriz 2×2 de objetivos estratégicos.',
        columns: 12,
        imageZones: [],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 70, maxLines: 2 },
            { id: 'obj-grid', role: 'Body', maxChars: 650, maxLines: 10 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['InfoCard', 'MetricBlock'],
        overflowRule: 'compact-grid',
        colorVariants: ['pearl-light', 'obsidian-contrast'],
        contentRules: { minItems: 2, maxItems: 4, maxBodyWords: 110 },
    },

    // -------------------------------------------------------------------------
    // 3. SOLUTIONS (3 Templates)
    // -------------------------------------------------------------------------
    'solution-visual-a': {
        id: 'solution-visual-a',
        category: 'solutions',
        name: 'Solution Visual A · Mockup & Alcance Integrado',
        description: 'Presentación visual del producto/servicio con VisualMockup (fotografía + UI vectorial superpuesta) y módulos detallados.',
        columns: 12,
        imageZones: [
            { id: 'solution-mockup', label: 'Mockup Visual o Render Técnico', aspectRatio: '16:9', minResolution: '1600x900', required: true },
        ],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'module-list', role: 'Body', maxChars: 680, maxLines: 10 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['VisualMockup', 'InfoCard'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['pearl-light', 'mixed-split'],
        contentRules: { minItems: 1, maxItems: 4, maxBodyWords: 110 },
    },
    'module-grid-a': {
        id: 'module-grid-a',
        category: 'solutions',
        name: 'Module Grid A · Retícula de Entregables',
        description: 'Grilla estructural de tarjetas para desglosar módulos de software o paquetes técnicos con criterios de aceptación.',
        columns: 12,
        imageZones: [
            { id: 'module-thumb', label: 'Vista Operativa de Apoyo', aspectRatio: '16:9', minResolution: '1200x675', required: false },
        ],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'cards', role: 'Body', maxChars: 720, maxLines: 12 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['InfoCard', 'MetricBlock'],
        overflowRule: 'compact-grid',
        colorVariants: ['pearl-light'],
        contentRules: { minItems: 2, maxItems: 6, maxBodyWords: 130 },
    },
    'technical-diagram-a': {
        id: 'technical-diagram-a',
        category: 'solutions',
        name: 'Technical Diagram A · Arquitectura Vectorial SVG',
        description: 'Diagrama arquitectónico SVG determinístico (capas, flujos Wompi/CRM o capas de blindaje PPF TPU) + especificaciones.',
        columns: 12,
        imageZones: [
            { id: 'diagram-photo', label: 'Fotografía Técnica Complementaria', aspectRatio: '16:9', minResolution: '1200x675', required: false },
        ],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'arch-spec', role: 'Body', maxChars: 600, maxLines: 10 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['VisualMockup', 'InfoCard', 'MetricBlock'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['mixed-split', 'pearl-light'],
        contentRules: { minItems: 2, maxItems: 5, maxBodyWords: 105 },
    },

    // -------------------------------------------------------------------------
    // 4. IMPLEMENTATION (2 Templates)
    // -------------------------------------------------------------------------
    'timeline-a': {
        id: 'timeline-a',
        category: 'implementation',
        name: 'Timeline A · Cronograma Escalonado',
        description: 'Línea de tiempo horizontal/escalonada de fases acumulativas con entregables por etapa y hitos de validación.',
        columns: 12,
        imageZones: [
            { id: 'ops-context', label: 'Fotografía Operativa en Sitio', aspectRatio: '16:9', minResolution: '1400x788', required: false },
        ],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'timeline-items', role: 'Body', maxChars: 650, maxLines: 10 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['Timeline', 'MetricBlock'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['pearl-light', 'mixed-split'],
        contentRules: { minItems: 2, maxItems: 5, maxBodyWords: 110 },
    },
    'roadmap-a': {
        id: 'roadmap-a',
        category: 'implementation',
        name: 'Roadmap A · Hitos & Entregables de Despliegue',
        description: 'Hoja de ruta operativa con barras de progreso, responsables de alianza y matriz de entregables verificables.',
        columns: 12,
        imageZones: [],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'roadmap-list', role: 'Body', maxChars: 680, maxLines: 11 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['Timeline', 'InfoCard'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['pearl-light'],
        contentRules: { minItems: 2, maxItems: 5, maxBodyWords: 115 },
    },

    // -------------------------------------------------------------------------
    // 5. FINANCIAL (3 Templates)
    // -------------------------------------------------------------------------
    'pricing-table-a': {
        id: 'pricing-table-a',
        category: 'financial',
        name: 'Pricing Table A · Desglose Contable Continuo',
        description: 'Tabla económica oficial con tarifas lista, beneficio alianza, descuento e inversión neta en <tfoot> continuo + gráfica SVG.',
        columns: 12,
        imageZones: [],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'pricing-rows', role: 'Data', maxChars: 750, maxLines: 14 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'LegalNotice', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['PricingTable', 'MetricBlock'],
        overflowRule: 'split-table',
        colorVariants: ['pearl-light'],
        contentRules: { minItems: 1, maxItems: 6, maxBodyWords: 90 },
    },
    'pricing-comparison-a': {
        id: 'pricing-comparison-a',
        category: 'financial',
        name: 'Pricing Comparison A · Inversión + Modalidades',
        description: 'Desglose financiero integral combinando cronograma resumido, tabla comparativa lista vs alianza y selector de modalidades.',
        columns: 12,
        imageZones: [],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'comparison-grid', role: 'Data', maxChars: 800, maxLines: 14 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['PricingTable', 'InfoCard', 'MetricBlock'],
        overflowRule: 'split-table',
        colorVariants: ['pearl-light', 'mixed-split'],
        contentRules: { minItems: 1, maxItems: 6, maxBodyWords: 95 },
    },
    'payment-terms-a': {
        id: 'payment-terms-a',
        category: 'financial',
        name: 'Payment Terms A · Hitos 50/50 & Gráfica Financiera',
        description: 'Estructura de desembolso 50/50, comparativa gráfica de ahorro SVG y canales oficiales Wompi / Bancolombia.',
        columns: 12,
        imageZones: [],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'terms-body', role: 'Data', maxChars: 650, maxLines: 12 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'SectionTitle', 'LegalNotice', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['MetricBlock', 'InfoCard'],
        overflowRule: 'compact-grid',
        colorVariants: ['pearl-light', 'mixed-split'],
        contentRules: { minItems: 2, maxItems: 4, maxBodyWords: 85 },
    },

    // -------------------------------------------------------------------------
    // 6. CLOSING (2 Templates)
    // -------------------------------------------------------------------------
    'acceptance-a': {
        id: 'acceptance-a',
        category: 'closing',
        name: 'Acceptance A · Condiciones, Wompi QR & Firmas',
        description: 'Página final de condiciones legales, pasarela Wompi con QR vectorial, firma oficial Camilo Toloza y aceptación del cliente.',
        columns: 12,
        imageZones: [
            { id: 'closing-ops', label: 'Banner Visual de Respaldo', aspectRatio: '21:9', minResolution: '1600x685', required: false },
        ],
        typographicZones: [
            { id: 'section-h2', role: 'H2', maxChars: 75, maxLines: 2 },
            { id: 'legal-copy', role: 'Body', maxChars: 550, maxLines: 10 },
        ],
        allowedInstitutionalComponents: [
            'BrandHeader',
            'SectionTitle',
            'LegalNotice',
            'SignatureBlock',
            'BrandDivider',
            'PageNumber',
            'BrandFooter',
        ],
        allowedEditorialComponents: ['InfoCard'],
        overflowRule: 'compact-grid',
        colorVariants: ['pearl-light'],
        contentRules: { minItems: 2, maxItems: 4, maxBodyWords: 90 },
    },
    'closing-editorial-a': {
        id: 'closing-editorial-a',
        category: 'closing',
        name: 'Closing Editorial A · Cierre Institucional Oscuro',
        description: 'Contraportada editorial contrastada con manifiesto de alianza, firma ejecutiva y canales oficiales de activación.',
        columns: 12,
        imageZones: [
            { id: 'closing-hero', label: 'Fotografía Editorial de Cierre', aspectRatio: '16:9', minResolution: '1600x900', required: true },
        ],
        typographicZones: [
            { id: 'closing-h1', role: 'H1', maxChars: 70, maxLines: 3 },
            { id: 'closing-body', role: 'Body', maxChars: 240, maxLines: 4 },
        ],
        allowedInstitutionalComponents: ['BrandHeader', 'ProposalID', 'SignatureBlock', 'BrandDivider', 'PageNumber', 'BrandFooter'],
        allowedEditorialComponents: ['HeroTitle', 'MetricBlock'],
        overflowRule: 'redistribute-to-next-page',
        colorVariants: ['obsidian-contrast', 'mixed-split'],
        contentRules: { minItems: 1, maxItems: 3, maxBodyWords: 50 },
    },
};

export const ALL_APPROVED_TEMPLATE_IDS = Object.keys(APPROVED_TEMPLATES) as ApprovedTemplateId[];

export function getTemplatesByCategory(category: TemplateCategory): TemplateMetadata[] {
    return ALL_APPROVED_TEMPLATE_IDS.map((id) => APPROVED_TEMPLATES[id]).filter(
        (tpl) => tpl.category === category,
    );
}
