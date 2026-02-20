import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";

export const metadata = {
    title: "Preguntas Frecuentes | Pigmento Stickers",
    description: "Respuestas a tus dudas sobre stickers, envíos, materiales y más.",
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-brand-black text-white pt-32 pb-20">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-400 hover:text-brand-yellow transition-colors mb-6 text-sm font-medium uppercase tracking-widest"
                        >
                            <MoveLeft className="mr-2 w-4 h-4" /> Volver al inicio
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            Preguntas <span className="text-brand-yellow">Frecuentes</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Todo lo que necesitas saber sobre nuestros procesos, materiales y envíos.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                    {PIGMENTO_DATA.faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div className="h-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-brand-yellow/30 transition-all">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-start">
                                    <span className="text-brand-yellow mr-3 text-2xl leading-none">Q.</span>
                                    {faq.q}
                                </h3>
                                <p className="text-gray-400 leading-relaxed pl-8 border-l-2 border-white/5">
                                    {faq.a}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.4}>
                    <div className="mt-16 p-8 bg-brand-yellow/10 rounded-2xl border border-brand-yellow/20 text-center max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-white mb-2">¿No encuentras lo que buscas?</h3>
                        <p className="text-gray-400 mb-6">Estamos disponibles en WhatsApp para resolver tus dudas al instante.</p>
                        <a
                            href={PIGMENTO_DATA.contact.whatsappUrl}
                            target="_blank"
                            className="inline-flex items-center justify-center px-8 py-3 bg-brand-yellow text-black font-black uppercase tracking-wide rounded-xl hover:bg-white transition-colors"
                        >
                            Contactar Soporte
                        </a>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
