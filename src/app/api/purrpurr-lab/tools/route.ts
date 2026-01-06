import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/design-lab/tools
 * 
 * Retorna todas las herramientas disponibles en el laboratorio de diseño.
 * El Studio consume esta API para mostrar las opciones en tiempo real.
 * 
 * Cuando agregas una nueva paleta, layout o efecto en la base de datos,
 * automáticamente aparece en el Studio sin cambiar código.
 */
export async function GET(request: NextRequest) {
    try {
        // Fetch all active tools in parallel
        const [
            colorPalettes,
            layoutOptions,
            sectionTemplates,
            visualEffects,
            generativePatterns,
            fontPairings,
            archetypes
        ] = await Promise.all([
            prisma.colorPalette.findMany({
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' }
            }),
            prisma.layoutOption.findMany({
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' }
            }),
            prisma.sectionTemplate.findMany({
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' }
            }),
            prisma.visualEffect.findMany({
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' }
            }),
            prisma.generativePattern.findMany({
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' }
            }),
            prisma.fontPairing.findMany({
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' }
            }),
            prisma.archetype.findMany({
                where: { isActive: true },
                orderBy: { sortOrder: 'asc' }
            })
        ]);

        return NextResponse.json({
            success: true,
            data: {
                colorPalettes,
                layoutOptions,
                sectionTemplates,
                visualEffects,
                generativePatterns,
                fontPairings,
                archetypes
            },
            // Metadata for the Studio
            meta: {
                totalTools:
                    colorPalettes.length +
                    layoutOptions.length +
                    sectionTemplates.length +
                    visualEffects.length +
                    generativePatterns.length +
                    fontPairings.length +
                    archetypes.length,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('[DesignLab API] Error fetching tools:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch design lab tools' },
            { status: 500 }
        );
    }
}
