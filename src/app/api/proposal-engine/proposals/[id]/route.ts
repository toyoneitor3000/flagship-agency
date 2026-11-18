import { NextRequest, NextResponse } from 'next/server';
import { regenerateSinglePageAsset } from '@/lib/proposal-engine/assetEngine';
import { createVisualConfiguration } from '@/lib/proposal-engine/identity';
import {
    duplicateProposalPage,
    planProposalPages,
    removeProposalPage,
    reorderProposalPage,
    switchPageTemplate,
} from '@/lib/proposal-engine/planner';
import { runQualityControl } from '@/lib/proposal-engine/qualityControl';
import {
    freezeImmutableVersion,
    getProposalFromStore,
    saveProposalToStore,
} from '@/lib/proposal-engine/store';
import type { ApprovedTemplateId, ProjectSector } from '@/lib/proposal-engine/types';

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    const { id } = await context.params;
    const proposal = getProposalFromStore(id);
    if (!proposal) {
        return NextResponse.json({ error: `Propuesta ${id} no encontrada.` }, { status: 404 });
    }

    return NextResponse.json({
        proposal,
        qcReport: runQualityControl(proposal),
    });
}

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await context.params;
        const current = getProposalFromStore(id);
        if (!current) {
            return NextResponse.json({ error: `Propuesta ${id} no encontrada.` }, { status: 404 });
        }

        const body = (await req.json()) as {
            action?:
                | 'analyze'
                | 'plan'
                | 'generate-assets'
                | 'render'
                | 'validate'
                | 'export'
                | 'create-version'
                | 'switch-template'
                | 'reorder-page'
                | 'duplicate-page'
                | 'remove-page'
                | 'switch-sector';
            pageNumber?: number;
            templateId?: ApprovedTemplateId;
            direction?: 'up' | 'down';
            adaptiveMode?: 'auto' | 'compact-5' | 'expanded-9';
            sector?: ProjectSector;
            versionLabel?: string;
            versionSummary?: string;
        };

        let next = current;

        switch (body.action) {
            case 'plan':
            case 'analyze':
                next = saveProposalToStore(planProposalPages(current, body.adaptiveMode));
                break;

            case 'generate-assets':
                if (typeof body.pageNumber === 'number') {
                    next = saveProposalToStore(regenerateSinglePageAsset(current, body.pageNumber));
                } else {
                    next = saveProposalToStore(regenerateSinglePageAsset(current, 1));
                }
                break;

            case 'switch-template':
                if (typeof body.pageNumber === 'number' && body.templateId) {
                    next = saveProposalToStore(
                        switchPageTemplate(current, body.pageNumber, body.templateId),
                    );
                }
                break;

            case 'reorder-page':
                if (typeof body.pageNumber === 'number' && body.direction) {
                    next = saveProposalToStore(
                        reorderProposalPage(current, body.pageNumber, body.direction),
                    );
                }
                break;

            case 'duplicate-page':
                if (typeof body.pageNumber === 'number') {
                    next = saveProposalToStore(duplicateProposalPage(current, body.pageNumber));
                }
                break;

            case 'remove-page':
                if (typeof body.pageNumber === 'number') {
                    next = saveProposalToStore(removeProposalPage(current, body.pageNumber));
                }
                break;

            case 'switch-sector':
                if (body.sector) {
                    next = saveProposalToStore(
                        planProposalPages(
                            {
                                ...current,
                                project: { ...current.project, sector: body.sector },
                                visualConfig: createVisualConfiguration(body.sector, current.visualConfig.colorVariant),
                                pages: current.pages.map((p) => ({ ...p, assets: [] })),
                            },
                            current.adaptiveMode,
                        ),
                    );
                }
                break;

            case 'create-version':
            case 'export':
                next = freezeImmutableVersion(
                    {
                        ...current,
                        status: body.action === 'export' ? 'exported' : current.status,
                    },
                    body.versionLabel,
                    body.versionSummary,
                );
                break;

            case 'validate':
            case 'render':
            default:
                next = current;
                break;
        }

        return NextResponse.json({
            proposal: next,
            qcReport: runQualityControl(next),
        });
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Error actualizando propuesta.' },
            { status: 500 },
        );
    }
}
