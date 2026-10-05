import { Metadata } from 'next';
import { HibridoHeader } from '@/components/hibrido/Header';

export const metadata: Metadata = {
    title: 'Híbrido | Laboratorio Creativo',
    description: 'Ecosistema de diseño, productos sostenibles, streetwear y estilo de vida.',
    openGraph: {
        title: 'Híbrido | Laboratorio Creativo',
        description: 'Estamos construyendo un ecosistema para los que no encajan en lo convencional.',
        images: ['/clients/hibrido-lab/og-image.jpg'],
    },
};

export default function HibridoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#52388d] selection:text-white">
            <HibridoHeader />
            <main className="flex-1 w-full relative">
                {children}
            </main>
            <footer className="w-full border-t border-white/10 bg-black/80 py-12 px-4 sm:px-6 lg:px-8 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
                    <p>© {new Date().getFullYear()} HÍBRIDO LABORATORIO CREATIVO S.A.S. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-zinc-300 transition-colors">Menos Pelos + Amor</span>
                        <span className="hover:text-zinc-300 transition-colors">Plástico con Final Feliz</span>
                        <span className="hover:text-zinc-300 transition-colors">Dinamita Mood</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
