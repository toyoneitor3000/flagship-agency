import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { RenderEngine } from '@/components/engine/RenderEngine';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function DeploymentPage(props: PageProps) {
    const params = await props.params;
    const { slug } = params;

    // 1. Fetch the "Save File" from the Box
    // Try to find by Slug first, or ID for backward compat (though slug is unique now)
    const project = await prisma.project.findFirst({
        where: {
            OR: [
                { slug: slug },
                { id: slug }
            ]
        }
    });

    if (!project) {
        return notFound();
    }

    // 2. Parse the "Brain" (JSON Architecture)
    // We treat the architecture string as a typed object
    let architecture;
    try {
        architecture = JSON.parse(project.architecture);
    } catch (e) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-red-500 font-mono">
                CRITICAL ERROR: DNA CORRUPTION DETECTED.
            </div>
        );
    }

    // 3. Hand off to the "Game Engine" to render the site
    return (
        <RenderEngine
            buildId={project.id}
            slug={project.slug}
            architecture={architecture}
        />
    );
}
