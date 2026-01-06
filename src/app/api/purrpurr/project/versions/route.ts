import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// POST - Crear nueva versión manual
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
        const { projectId, name, description } = body;

        if (!projectId || !name) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Verificar propiedad del proyecto
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId: session.user.id
            }
        });

        if (!project) {
            return NextResponse.json(
                { success: false, error: "Project not found or access denied" },
                { status: 404 }
            );
        }

        // Crear versión
        const version = await prisma.projectVersion.create({
            data: {
                projectId,
                name,
                description: description || null,
                architecture: project.architecture
            }
        });

        return NextResponse.json({
            success: true,
            version
        });

    } catch (error) {
        console.error("CREATE VERSION ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// GET - Obtener versiones de un proyecto
export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get('projectId');

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: "Missing projectId" },
                { status: 400 }
            );
        }

        // Verificar propiedad del proyecto
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId: session.user.id
            }
        });

        if (!project) {
            return NextResponse.json(
                { success: false, error: "Project not found or access denied" },
                { status: 404 }
            );
        }

        // Obtener versiones
        const versions = await prisma.projectVersion.findMany({
            where: { projectId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            versions
        });

    } catch (error) {
        console.error("GET VERSIONS ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar una versión específica
export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const versionId = searchParams.get('id');

        if (!versionId) {
            return NextResponse.json(
                { success: false, error: "Missing version id" },
                { status: 400 }
            );
        }

        // Verificar que la versión pertenece a un proyecto del usuario
        const version = await prisma.projectVersion.findUnique({
            where: { id: versionId },
            include: {
                project: {
                    select: { userId: true }
                }
            }
        });

        if (!version || version.project.userId !== session.user.id) {
            return NextResponse.json(
                { success: false, error: "Version not found or access denied" },
                { status: 404 }
            );
        }

        await prisma.projectVersion.delete({
            where: { id: versionId }
        });

        return NextResponse.json({
            success: true,
            message: "Versión eliminada exitosamente"
        });

    } catch (error) {
        console.error("DELETE VERSION ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
