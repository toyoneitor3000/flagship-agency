import { CVClient } from "@/components/cv/CVClient";
import { notFound } from "next/navigation";

// This list should match TARGET_DATA in CVClient.tsx
const VALID_TARGETS = ['opyt'];

export const metadata = {
    title: "Camilo Toloza | Portafolio Profesional",
    description: "Diseñador Digital & Creative Lead con más de 12 años de experiencia en ecosistemas digitales y branding automotriz.",
};

interface TargetedCVPageProps {
    params: Promise<{ slug: string }>;
}

export default async function TargetedCVPage({ params }: TargetedCVPageProps) {
    const { slug } = await params;

    if (!VALID_TARGETS.includes(slug.toLowerCase())) {
        notFound();
    }

    return <CVClient mode="targeted" slug={slug} />;
}
