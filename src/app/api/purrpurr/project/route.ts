import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET - Obtener proyecto por slug/id
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
        const slug = searchParams.get('slug') || searchParams.get('id');

        if (!slug) {
            return NextResponse.json(
                { success: false, error: "Missing slug or id parameter" },
                { status: 400 }
            );
        }

        const project = await prisma.project.findFirst({
            where: {
                userId: session.user.id,
                OR: [
                    { slug: slug },
                    { id: slug }
                ]
            },
            include: {
                versions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });

        if (!project) {
            return NextResponse.json(
                { success: false, error: "Project not found or access denied" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            project
        });

    } catch (error) {
        console.error("GET PROJECT ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// PUT - Actualizar proyecto
export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { projectId, name, slug, status, architecture, createVersion } = body;

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: "Missing projectId" },
                { status: 400 }
            );
        }

        // Verificar propiedad del proyecto
        const existingProject = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId: session.user.id
            }
        });

        if (!existingProject) {
            return NextResponse.json(
                { success: false, error: "Project not found or access denied" },
                { status: 404 }
            );
        }

        // Si se está actualizando la arquitectura y se solicita crear versión
        if (architecture && createVersion) {
            await prisma.projectVersion.create({
                data: {
                    projectId: projectId,
                    name: `v${Date.now()}`,
                    description: `Versión automática - ${new Date().toLocaleDateString('es-ES')}`,
                    architecture: existingProject.architecture
                }
            });
        }

        // Verificar slug único si se está cambiando
        if (slug && slug !== existingProject.slug) {
            const slugExists = await prisma.project.findUnique({
                where: { slug }
            });
            if (slugExists) {
                return NextResponse.json(
                    { success: false, error: "El slug ya está en uso" },
                    { status: 400 }
                );
            }
        }

        // Actualizar proyecto
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                ...(name && { name }),
                ...(slug && { slug }),
                ...(status && { status }),
                ...(architecture && { architecture })
            },
            include: {
                versions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });

        return NextResponse.json({
            success: true,
            project: updatedProject
        });

    } catch (error) {
        console.error("PUT PROJECT ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar proyecto
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
        const projectId = searchParams.get('id');

        if (!projectId) {
            return NextResponse.json(
                { success: false, error: "Missing project id" },
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

        // Eliminar versiones primero (si existen)
        await prisma.projectVersion.deleteMany({
            where: { projectId }
        });

        // Eliminar proyecto
        await prisma.project.delete({
            where: { id: projectId }
        });

        return NextResponse.json({
            success: true,
            message: "Proyecto eliminado exitosamente"
        });

    } catch (error) {
        console.error("DELETE PROJECT ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
