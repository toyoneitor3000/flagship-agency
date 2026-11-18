import { SECTOR_ART_DIRECTIONS } from './identity';
import { APPROVED_TEMPLATES } from './templatesRegistry';
import type {
    ApprovedTemplateId,
    AssetReference,
    ProjectSector,
    Proposal,
    ProposalPage,
    VisualBrief,
} from './types';

// =============================================================================
// 04A · ASSET ENGINE
// Genera briefs visuales estructurados por página, asigna fotografía curada
// o renders técnicos y permite regenerar selectivamente UNA página sin alterar
// las demás páginas ni los cálculos comerciales.
// =============================================================================

export function getAssetPoolForTemplate(
    sector: ProjectSector,
    templateId: ApprovedTemplateId,
): string[] {
    const dir = SECTOR_ART_DIRECTIONS[sector];
    const category = APPROVED_TEMPLATES[templateId].category;

    if (category === 'cover' || category === 'closing') {
        return Array.from(
            new Set([...dir.photographyPools.cover, ...dir.photographyPools.operations]),
        );
    }
    if (category === 'solutions' || category === 'executive') {
        return Array.from(
            new Set([
                ...dir.photographyPools.solution,
                ...dir.photographyPools.cover,
                ...dir.photographyPools.operations,
            ]),
        );
    }
    return Array.from(
        new Set([...dir.photographyPools.operations, ...dir.photographyPools.solution]),
    );
}

export function buildPageVisualBrief(
    sector: ProjectSector,
    projectTitle: string,
    templateId: ApprovedTemplateId,
    sectionTitle: string,
): VisualBrief {
    const dir = SECTOR_ART_DIRECTIONS[sector];
    const tpl = APPROVED_TEMPLATES[templateId];
    const usageZone = tpl.imageZones[0]?.label || 'Composición tipográfica sin zona fotográfica obligatoria';

    const subjectBySector: Record<ProjectSector, string> = {
        software: `${projectTitle} — operación digital de estudio técnico, dashboard vectorial de cotizaciones e infraestructura Wompi`,
        automotive: `${projectTitle} — vehículo de alta gama bajo iluminación controlada de estudio PPF TPU con acabado brillante ultra-gloss`,
        branding: `${projectTitle} — identidad visual modular, piezas impresas editoriales y aplicaciones de marca contemporáneas`,
        architecture: `${projectTitle} — bahía técnica de alto estándar arquitectónico con iluminación lineal calibrada`,
    };

    return {
        sector,
        style: dir.artDirectionStyle,
        subject: `${sectionTitle}: ${subjectBySector[sector]}`,
        composition: `${tpl.columns} columnas fijas · ${tpl.name}`,
        colorMood: `75% Blanco Perla #F7F7F5 / 20% Negro #111111 / 5% Acento ${dir.sectorAccent}`,
        usageZone,
        targetTemplateId: templateId,
    };
}

export function buildInitialAssetsForPage(
    proposalId: string,
    sector: ProjectSector,
    templateId: ApprovedTemplateId,
    pageNumber: number,
    caption: string,
): AssetReference[] {
    const tpl = APPROVED_TEMPLATES[templateId];
    const pool = getAssetPoolForTemplate(sector, templateId);
    if (tpl.imageZones.length === 0 && templateId !== 'acceptance-a') {
        return [];
    }

    const zone = tpl.imageZones[0] || {
        id: `zone-${templateId}`,
        label: 'Apoyo Visual',
        aspectRatio: '16:9',
    };
    const chosenUrl = pool[(pageNumber - 1) % pool.length];

    return [
        {
            id: `${proposalId}-asset-p${pageNumber}-r1`,
            url: chosenUrl,
            alt: `${caption} · Dirección de Arte ${SECTOR_ART_DIRECTIONS[sector].label}`,
            caption,
            aspectRatio: zone.aspectRatio,
            zoneId: zone.id,
            sourceType: templateId === 'solution-visual-a' ? 'vector-ui-composite' : 'ai-generated',
            revision: 1,
            updatedAt: new Date().toISOString(),
        },
    ];
}

/**
 * Selective single-page asset regeneration (Section 7):
 * Strictly modifies ONLY the target page's image asset while keeping every other
 * page, layout geometry, copy, and commercial calculation untouched.
 */
export function regenerateSinglePageAsset(
    proposal: Proposal,
    pageNumber: number,
): Proposal {
    const now = new Date().toISOString();
    let updatedAssetForGlobalList: AssetReference | null = null;

    const updatedPages: ProposalPage[] = proposal.pages.map((page) => {
        if (page.pageNumber !== pageNumber) {
            return page;
        }

        const pool = getAssetPoolForTemplate(proposal.project.sector, page.templateId);
        const currentAsset = page.assets[0];
        const candidates = pool.filter((u) => u !== currentAsset?.url);
        const currentIndex = currentAsset ? pool.indexOf(currentAsset.url) : -1;
        const nextUrl =
            candidates.length > 0
                ? pool[(currentIndex + 1 + pool.length) % pool.length] !== currentAsset?.url
                    ? pool[(currentIndex + 1 + pool.length) % pool.length]
                    : candidates[0]
                : currentAsset?.url || pool[0];
        const nextRevision = (currentAsset?.revision || 0) + 1;

        const nextAsset: AssetReference = {
            id: currentAsset?.id || `${proposal.id}-asset-p${page.pageNumber}-r${nextRevision}`,
            url: nextUrl,
            alt: currentAsset?.alt || `${page.title} · Revisión visual #${nextRevision}`,
            caption: currentAsset?.caption || page.title,
            aspectRatio: currentAsset?.aspectRatio || '16:9',
            zoneId: currentAsset?.zoneId || 'primary-zone',
            sourceType: currentAsset?.sourceType || 'ai-generated',
            revision: nextRevision,
            updatedAt: now,
        };
        updatedAssetForGlobalList = nextAsset;

        return {
            ...page,
            editorialStatus: 'review',
            assets: [nextAsset],
            visualBrief: buildPageVisualBrief(
                proposal.project.sector,
                proposal.project.title,
                page.templateId,
                page.contentData.sectionTitle,
            ),
        };
    });

    const nextGlobalAssets = proposal.assets.filter(
        (asset) => !asset.id.startsWith(`${proposal.id}-asset-p${pageNumber}`),
    );
    if (updatedAssetForGlobalList) {
        nextGlobalAssets.push(updatedAssetForGlobalList);
    }

    return {
        ...proposal,
        updatedAt: now,
        pages: updatedPages,
        assets: nextGlobalAssets,
        jobs: [
            {
                id: `job-asset-regen-${Date.now()}`,
                proposalId: proposal.id,
                stage: 'asset-engine',
                status: 'completed',
                message: `Asset regenerado selectivamente para Página 0${pageNumber} sin alterar cifras ni páginas restantes.`,
                timestamp: now,
                durationMs: 420,
            },
            ...proposal.jobs,
        ],
    };
}
