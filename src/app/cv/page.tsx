import { CVClient } from "@/components/cv/CVClient";

export const metadata = {
    title: "Camilo Toloza | Portafolio Profesional",
    description: "Diseñador Digital & Creative Lead con más de 12 años de experiencia en ecosistemas digitales y branding automotriz.",
};

export default function PublicCVPage() {
    return <CVClient mode="public" />;
}
