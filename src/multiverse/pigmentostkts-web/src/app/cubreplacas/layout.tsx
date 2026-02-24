import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cubreplacas Personalizados en Bogotá | Envíos a Toda Colombia",
    description: "Cubreplacas personalizados con tu diseño o logo. Vinilo de alta resistencia, protección UV. Fabricación en Bogotá, envíos a toda Colombia.",
};

export default function CubreplacasLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
