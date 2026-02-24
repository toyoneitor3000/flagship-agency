import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cotizador de Stickers Personalizados en Línea | Bogotá Colombia",
    description: "Cotiza tus stickers personalizados, calcomanías y cubreplacas en línea. Sube tu diseño, elige material y tamaño. Envíos a toda Colombia.",
};

export default function CotizadorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
