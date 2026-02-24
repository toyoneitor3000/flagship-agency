import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fábrica de Stickers en Bogotá | Sobre Pigmento Stickers",
    description: "Somos Pigmento Stickers, taller de impresión de stickers y calcomanías en Bogotá. Vinilos importados, alta resolución y envíos a toda Colombia.",
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
