import { NextRequest, NextResponse } from 'next/server';
import {
    createProposalFromInput,
    listProposalsFromStore,
    type RawProposalCreationInput,
} from '@/lib/proposal-engine/store';
import { runQualityControl } from '@/lib/proposal-engine/qualityControl';

export async function GET() {
    const proposals = listProposalsFromStore();
    return NextResponse.json({
        engine: 'PURRPURR.DEV × SPEEDLIGHT CULTURE — PROPOSAL ENGINE v1.0',
        pillars: {
            visualDirection: 'FIXED',
            pageCount: 'ADAPTIVE',
            identity: 'MIXED',
        },
        count: proposals.length,
        proposals: proposals.map((p) => ({
            ...p,
            qcSummary: {
                overallPassed: runQualityControl(p).overallPassed,
                scorePercentage: runQualityControl(p).scorePercentage,
            },
        })),
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as RawProposalCreationInput;
        if (!body?.clientName || !body?.projectTitle || !Array.isArray(body?.items) || body.items.length === 0) {
            return NextResponse.json(
                { error: 'clientName, projectTitle y al menos 1 ítem son obligatorios.' },
                { status: 400 },
            );
        }

        const created = createProposalFromInput(body);
        const qcReport = runQualityControl(created);

        return NextResponse.json(
            {
                proposal: created,
                qcReport,
            },
            { status: 201 },
        );
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Error creando propuesta en Input Manager.' },
            { status: 500 },
        );
    }
}
