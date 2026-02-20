import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const StickerMaker = dynamic(() => import('@/components/StickerMaker'), {
    ssr: false,
    loading: () => (
        <div className="w-full max-w-4xl mx-auto p-6 min-h-[600px] flex items-center justify-center">
            <div className="animate-pulse text-white/50">Cargando herramienta...</div>
        </div>
    )
});

export default function StickerMakerPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-pink-500/30">
            <Navbar />

            <div className="relative pt-32 pb-20 px-4">
                {/* Ambient Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10">
                    <StickerMaker />
                </div>
            </div>

            <Footer />
        </main>
    );
}
