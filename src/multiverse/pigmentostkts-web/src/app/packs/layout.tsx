import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Packs de Stickers Coleccionables | Calcomanías Premium Colombia",
    description: "Packs exclusivos de stickers coleccionables. Arte urbano, diseños premium y ediciones limitadas. Envíos a toda Colombia.",
};

export default function PacksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
