import { MoveLeft, Truck, Clock, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";

export const metadata = {
    title: "Política de Envíos | Pigmento Stickers",
    description: "Conoce nuestros tiempos, costos y cobertura de envíos para tus stickers y productos.",
};

export default function PoliticaEnviosPage() {
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
                            Política de <span className="text-brand-yellow">Envíos</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Aquí te explicamos todo sobre cómo, cuándo y por cuánto llegará tu pedido a tus manos.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mb-16">
                    <FadeIn delay={0.1}>
                        <div className="h-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-brand-yellow/30 transition-all">
                            <div className="w-12 h-12 bg-brand-yellow/10 rounded-xl flex items-center justify-center mb-6">
                                <Truck className="text-brand-yellow w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Tiempos y Costos</h3>
                            <div className="space-y-4 text-gray-400">
                                <div className="p-4 bg-brand-black/50 rounded-lg flex justify-between items-center border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="text-brand-yellow w-5 h-5" />
                                        <span>Cundinamarca</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-bold">${PIGMENTO_DATA.shipping.cundinamarca.price.toLocaleString()}</div>
                                        <div className="text-xs text-brand-yellow">{PIGMENTO_DATA.shipping.cundinamarca.time}</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-brand-black/50 rounded-lg flex justify-between items-center border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="text-brand-yellow w-5 h-5" />
                                        <span>Nacional</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-bold">${PIGMENTO_DATA.shipping.nacional.price.toLocaleString()}</div>
                                        <div className="text-xs text-brand-yellow">{PIGMENTO_DATA.shipping.nacional.time}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="h-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-brand-yellow/30 transition-all">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                <Clock className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Tiempos de Producción</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Recuerda que los tiempos de envío empiezan a contar <strong className="text-white">a partir de que el pedido ha sido despachado</strong>.
                            </p>
                            <ul className="list-disc pl-5 text-gray-400 space-y-2">
                                <li>Stickers Personalizados: 2-4 días hábiles.</li>
                                <li>Cubreplacas: 1-3 días hábiles.</li>
                                <li>Packs de Colección: Despacho casi inmediato si hay disponibilidad.</li>
                            </ul>
                        </div>
                    </FadeIn>
                </div>

                <div className="max-w-4xl">
                    <FadeIn delay={0.3}>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <ShieldCheck className="text-brand-yellow w-6 h-6" />
                                Condiciones Generales
                            </h3>
                            <div className="space-y-6 text-gray-400">
                                <div>
                                    <h4 className="text-white font-bold mb-2">Transportadoras</h4>
                                    <p>
                                        Trabajamos con las mejores transportadoras del país (Inter Rapidísimo, Envía, Servientrega) para asegurar de que tu pedido llegue en óptimas condiciones. Al despachar te compartiremos tu guía para rastreo.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2">Responsabilidad</h4>
                                    <p>
                                        A partir del momento que la transportadora recibe tu paquete, los tiempos de tránsito dependen netamente de ellos. Sin embargo, en Pigmento siempre te haremos acompañamiento en caso de cualquier novedad o retraso.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2">Dirección de Envío</h4>
                                    <p>
                                        Por favor, asegúrate de escribir correctamente toda la información de envío en el checkout. La corrección de datos una vez despachado el paquete puede incurrir en costos adicionales generados por la transportadora.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}

