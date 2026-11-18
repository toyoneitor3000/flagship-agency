import { buildInitialAssetsForPage, buildPageVisualBrief } from './assetEngine';
import { formatCOP } from './commercial';
import { APPROVED_TEMPLATES } from './templatesRegistry';
import type {
    ApprovedTemplateId,
    Proposal,
    ProposalPage,
    TemplateCategory,
} from './types';

// =============================================================================
// 03 · PROPOSAL PLANNER (ADAPTIVE PAGE SELECTION ENGINE)
// Determina automáticamente cuántas páginas necesita la propuesta y asigna
// una plantilla fija aprobada a cada página según el volumen real de contenido.
// =============================================================================

function determineAdaptivePageCount(
    proposal: Proposal,
    modeOverride?: 'auto' | 'compact-5' | 'expanded-9',
): 'compact-5' | 'expanded-9' {
    const mode = modeOverride || proposal.adaptiveMode || 'auto';
    if (mode === 'compact-5' || mode === 'expanded-9') {
        return mode;
    }

    const scopeCount = proposal.project.scope.length;
    const milestoneCount = proposal.project.milestones.length;
    const packageCount = proposal.commercialData.alternativePackages.length;

    if (
        proposal.project.complexity === 'enterprise' ||
        scopeCount >= 5 ||
        milestoneCount >= 4 ||
        packageCount >= 4
    ) {
        return 'expanded-9';
    }
    return 'compact-5';
}

function makePageContent(
    proposal: Proposal,
    templateId: ApprovedTemplateId,
    sectionCode: string,
    sectionTitle: string,
    sectionSubtitle: string,
    headline: string,
    leadParagraph: string,
) {
    const isAutomotive = proposal.project.sector === 'automotive';
    return {
        sectionCode,
        sectionTitle,
        sectionSubtitle,
        headline,
        leadParagraph,
        highlights: proposal.project.objectives.slice(0, 4).map((obj) => ({
            label: obj.metricLabel,
            value: obj.metricValue,
            note: obj.title,
        })),
        callouts: proposal.project.scope.slice(0, 3).map((item) => ({
            title: item.title,
            body: item.summary,
            tag: item.phaseTag,
        })),
        mockupOverlayData: {
            appTitle: isAutomotive
                ? `CONFIGURADOR PPF TPU · ${proposal.code}`
                : `COTIZADOR EJECUTIVO · ${proposal.code}`,
            appUrl: isAutomotive ? 'speedlightculture.com/works' : 'purrpurr.dev × speedlightculture.com',
            primaryStatLabel:
                proposal.commercialData.alternativePackages.length > 1
                    ? 'INVERSIÓN DESDE / INTEGRAL'
                    : 'INVERSIÓN NETA CERRADA',
            primaryStatValue:
                proposal.commercialData.alternativePackages.length > 1 && isAutomotive
                    ? `${formatCOP(proposal.commercialData.alternativePackages[0].total)}`
                    : formatCOP(proposal.commercialData.grandTotal),
            statusBadge:
                proposal.commercialData.discountTotal > 0
                    ? `ALIANZA -${Math.round(proposal.commercialData.discounts[0]?.percentage || 0)}% ACTIVA`
                    : 'ESPECIFICACIÓN VERIFICADA',
            actionLabel: isAutomotive ? 'RESERVAR BAHÍA WOMPI ↗' : 'EMITIR PROPUESTA A4 & WOMPI ↗',
            secondaryStats: [
                {
                    label: 'ESQUEMA DE PAGO',
                    value: '50% Inicio · 50% Entrega',
                },
                {
                    label: isAutomotive ? 'COBERTURA' : 'ENTREGABLES',
                    value: `${proposal.project.scope.length} Módulos / Bloques`,
                },
            ],
        },
        templateRef: templateId,
    };
}

export function planProposalPages(
    proposal: Proposal,
    modeOverride?: 'auto' | 'compact-5' | 'expanded-9',
): Proposal {
    const resolvedMode = determineAdaptivePageCount(proposal, modeOverride);
    const sector = proposal.project.sector;
    const isAutomotive = sector === 'automotive';

    interface PageBlueprint {
        sectionType: TemplateCategory;
        templateId: ApprovedTemplateId;
        sectionCode: string;
        title: string;
        subtitle: string;
        headline: string;
        leadParagraph: string;
    }

    const compactBlueprints: PageBlueprint[] = [
        {
            sectionType: 'cover',
            templateId: 'cover-editorial-a',
            sectionCode: '00',
            title: 'Portada Editorial',
            subtitle: 'Alianza Oficial & Presentación Ejecutiva',
            headline: proposal.project.title,
            leadParagraph: proposal.project.subtitle,
        },
        {
            sectionType: 'executive',
            templateId: 'executive-summary-a',
            sectionCode: '01',
            title: 'Resumen Ejecutivo & Contexto',
            subtitle: 'Propósito de Alianza, Diagnóstico y Objetivos',
            headline: 'Diagnóstico Operativo & Arquitectura de Resultados',
            leadParagraph: proposal.project.executiveSummary,
        },
        {
            sectionType: 'solutions',
            templateId: 'solution-visual-a',
            sectionCode: '02',
            title: isAutomotive ? 'Ingeniería PPF TPU & Bloques Técnicos' : 'Arquitectura Digital & Módulos del Sistema',
            subtitle: 'Diseño Visual Vectorial & Desglose Técnico',
            headline: isAutomotive ? 'Protección Alifática en 3 Bloques Independientes' : 'Ecosistema Modular de Alta Precisión',
            leadParagraph: proposal.project.solutionConcept,
        },
        {
            sectionType: 'financial',
            templateId: 'pricing-comparison-a',
            sectionCode: '03',
            title: 'Plan de Implementación & Inversión',
            subtitle: 'Cronograma Escalonado, Comparativa & Modalidades',
            headline: 'Transparencia Financiera, Cronograma & Retorno',
            leadParagraph: `Propuesta estructurada en ${proposal.project.milestones.length} etapas verificables (${proposal.project.deliveryTimeframe}) con precios netos cerrados bajo Régimen No Responsable de IVA.`,
        },
        {
            sectionType: 'closing',
            templateId: 'acceptance-a',
            sectionCode: '04',
            title: 'Condiciones Comerciales & Aceptación',
            subtitle: 'Pasarela Oficial Wompi, Garantía & Firma de Acuerdo',
            headline: 'Activación Inmediata, Respaldo Legal & Aceptación',
            leadParagraph: proposal.commercialData.warrantySummary,
        },
    ];

    const expandedBlueprints: PageBlueprint[] = [
        compactBlueprints[0],
        {
            sectionType: 'executive',
            templateId: 'executive-summary-a',
            sectionCode: '01',
            title: 'Resumen Ejecutivo',
            subtitle: 'Visión de Alianza & Impacto Comercial',
            headline: 'Resumen Ejecutivo de la Propuesta',
            leadParagraph: proposal.project.executiveSummary,
        },
        {
            sectionType: 'executive',
            templateId: 'executive-summary-b',
            sectionCode: '02',
            title: 'Contexto & Objetivos Estratégicos',
            subtitle: 'Diagnóstico Inicial & Indicadores Clave',
            headline: 'Brechas Actuales & Metas Cuantificables',
            leadParagraph: proposal.project.problemContext,
        },
        {
            sectionType: 'solutions',
            templateId: 'solution-visual-a',
            sectionCode: '03',
            title: 'Concepto & Solución Visual',
            subtitle: 'Interfaz Real / Presentación del Activo',
            headline: 'Experiencia Final para Cliente & Operación',
            leadParagraph: proposal.project.solutionConcept,
        },
        {
            sectionType: 'solutions',
            templateId: 'module-grid-a',
            sectionCode: '04',
            title: 'Alcance & Entregables por Módulo',
            subtitle: 'Desglose Exhaustivo de Componentes',
            headline: 'Módulos Incluidos & Criterios de Entrega',
            leadParagraph: `Cada componente se entrega documentado y validado dentro de un marco de ${proposal.project.scope.length} bloques técnicos independientes.`,
        },
        {
            sectionType: 'solutions',
            templateId: 'technical-diagram-a',
            sectionCode: '05',
            title: 'Arquitectura Técnica & Flujo',
            subtitle: 'Capas Tecnológicas / Ingeniería de Materiales',
            headline: isAutomotive ? 'Capas de Blindaje TPU & Protocolo de Bahía Limpia' : 'Arquitectura Desacoplada & Dispersión Wompi',
            leadParagraph: proposal.project.problemContext,
        },
        {
            sectionType: 'implementation',
            templateId: 'timeline-a',
            sectionCode: '06',
            title: 'Plan de Implementación',
            subtitle: 'Cronograma de Ejecución & Hitos',
            headline: `Ruta de Ejecución (${proposal.project.deliveryTimeframe})`,
            leadParagraph: 'Fases secuenciales con validación semanal y liberación progresiva a satisfacción.',
        },
        {
            sectionType: 'financial',
            templateId: 'pricing-comparison-a',
            sectionCode: '07',
            title: 'Inversión, Comparativa & Modalidades',
            subtitle: 'Desglose Económico Lista vs Alianza',
            headline: 'Inversión Modular & Beneficio de Alianza',
            leadParagraph: 'Cálculo determinístico auditado en pesos colombianos (COP), sin costos ocultos.',
        },
        compactBlueprints[4],
    ];

    const selectedBlueprints = resolvedMode === 'expanded-9' ? expandedBlueprints : compactBlueprints;

    const existingPagesByTemplate = new Map(
        proposal.pages.map((p) => [`${p.sectionType}:${p.pageNumber}`, p]),
    );

    const plannedPages: ProposalPage[] = selectedBlueprints.map((bp, index) => {
        const pageNumber = index + 1;
        const existing = existingPagesByTemplate.get(`${bp.sectionType}:${pageNumber}`);
        const templateId = existing?.templateId || bp.templateId;
        const assets =
            existing?.assets && existing.assets.length > 0
                ? existing.assets
                : buildInitialAssetsForPage(proposal.id, sector, templateId, pageNumber, bp.title);

        return {
            id: existing?.id || `${proposal.id}-page-${pageNumber}`,
            pageNumber,
            sectionType: bp.sectionType,
            templateId,
            title: bp.title,
            editorialStatus: existing?.editorialStatus || 'approved',
            contentData:
                existing?.contentData ||
                makePageContent(
                    proposal,
                    templateId,
                    bp.sectionCode,
                    bp.title,
                    bp.subtitle,
                    bp.headline,
                    bp.leadParagraph,
                ),
            assets,
            visualBrief: buildPageVisualBrief(sector, proposal.project.title, templateId, bp.title),
        };
    });

    const allAssets = plannedPages.flatMap((p) => p.assets);
    const now = new Date().toISOString();

    return {
        ...proposal,
        adaptiveMode: resolvedMode,
        updatedAt: now,
        pages: plannedPages,
        assets: allAssets,
        jobs: [
            {
                id: `job-planner-${Date.now()}`,
                proposalId: proposal.id,
                stage: 'planner',
                status: 'completed',
                message: `ProposalPlanner asignó ${plannedPages.length} páginas adaptativas (${resolvedMode}) con plantillas fijas aprobadas.`,
                timestamp: now,
                durationMs: 120,
            },
            ...proposal.jobs,
        ],
    };
}

export function switchPageTemplate(
    proposal: Proposal,
    pageNumber: number,
    nextTemplateId: ApprovedTemplateId,
): Proposal {
    if (!APPROVED_TEMPLATES[nextTemplateId]) {
        return proposal;
    }

    const now = new Date().toISOString();
    const tpl = APPROVED_TEMPLATES[nextTemplateId];

    const updatedPages = proposal.pages.map((page) => {
        if (page.pageNumber !== pageNumber) return page;
        const hasAssets = page.assets.length > 0;
        const nextAssets =
            tpl.imageZones.length > 0 && !hasAssets
                ? buildInitialAssetsForPage(
                      proposal.id,
                      proposal.project.sector,
                      nextTemplateId,
                      page.pageNumber,
                      page.title,
                  )
                : page.assets;

        return {
            ...page,
            templateId: nextTemplateId,
            sectionType: tpl.category,
            editorialStatus: 'review' as const,
            assets: nextAssets,
            visualBrief: buildPageVisualBrief(
                proposal.project.sector,
                proposal.project.title,
                nextTemplateId,
                page.contentData.sectionTitle,
            ),
        };
    });

    return {
        ...proposal,
        updatedAt: now,
        pages: updatedPages,
    };
}

export function reorderProposalPage(
    proposal: Proposal,
    pageNumber: number,
    direction: 'up' | 'down',
): Proposal {
    const idx = proposal.pages.findIndex((p) => p.pageNumber === pageNumber);
    if (idx === -1) return proposal;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= proposal.pages.length) return proposal;

    const cloned = [...proposal.pages];
    const [moved] = cloned.splice(idx, 1);
    cloned.splice(targetIdx, 0, moved);

    const renumbered = cloned.map((page, i) => ({
        ...page,
        pageNumber: i + 1,
    }));

    return {
        ...proposal,
        updatedAt: new Date().toISOString(),
        pages: renumbered,
    };
}

export function duplicateProposalPage(
    proposal: Proposal,
    pageNumber: number,
): Proposal {
    const idx = proposal.pages.findIndex((p) => p.pageNumber === pageNumber);
    if (idx === -1) return proposal;
    const original = proposal.pages[idx];
    const copy: ProposalPage = {
        ...original,
        id: `${original.id}-copy-${Date.now()}`,
        title: `${original.title} (Continuación)`,
        editorialStatus: 'draft',
    };

    const nextPages = [...proposal.pages];
    nextPages.splice(idx + 1, 0, copy);

    return {
        ...proposal,
        updatedAt: new Date().toISOString(),
        pages: nextPages.map((p, i) => ({ ...p, pageNumber: i + 1 })),
    };
}

export function removeProposalPage(
    proposal: Proposal,
    pageNumber: number,
): Proposal {
    if (proposal.pages.length <= 2) return proposal;
    const filtered = proposal.pages
        .filter((p) => p.pageNumber !== pageNumber)
        .map((p, i) => ({ ...p, pageNumber: i + 1 }));

    return {
        ...proposal,
        updatedAt: new Date().toISOString(),
        pages: filtered,
    };
}
