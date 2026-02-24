import { MoveLeft, AlertTriangle, RefreshCcw, Handshake, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";

export const metadata = {
    title: "Garantía y Devoluciones de Stickers Personalizados",
    description: "Política de devoluciones y garantía de reimpresión de Pigmento Stickers. Si hay un defecto de producción, reimprimimos gratis.",
};

export default function DevolucionesPage() {
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
                            Política de <span className="text-brand-yellow">Devoluciones</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Nos enorgullecemos de nuestra calidad, pero si algo sale mal, estamos aquí para solucionarlo.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mb-16">
                    <FadeIn delay={0.1}>
                        <div className="h-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                            <AlertTriangle className="text-brand-yellow w-8 h-8 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Reporte de Defectos</h3>
                            <p className="text-gray-400 text-sm">
                                Tienes un máximo de <strong className="text-white">48 horas</strong> tras recibir tu pedido para reportar cualquier anomalía o defecto de producción.
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="h-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                            <RefreshCcw className="text-brand-yellow w-8 h-8 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Garantía de Reimpresión</h3>
                            <p className="text-gray-400 text-sm">
                                Si cometemos un error (tamaño incorrecto, mal corte, colores desviados), reimprimimos tu pedido totalmente <strong className="text-white">gratis</strong>.
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <div className="h-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                            <Handshake className="text-brand-yellow w-8 h-8 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Sin Reembolsos</h3>
                            <p className="text-gray-400 text-sm">
                                Al ser productos 100% personalizados, no realizamos devoluciones en dinero. Siempre brindamos solución mediante reimpresión o saldo a favor.
                            </p>
                        </div>
                    </FadeIn>
                </div>

                <div className="max-w-4xl">
                    <FadeIn delay={0.4}>
                        <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-8">¿Cómo realizar un reclamo?</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">Revisa tu pedido</h4>
                                        <p className="text-gray-400">Verifica que estás dentro del plazo de las primeras 48 horas desde la entrega del transportista.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">Toma evidencia</h4>
                                        <p className="text-gray-400">Tómale fotos o graba un corto video donde se sea evidente el defecto de producción o corte.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">Contáctanos urgente</h4>
                                        <p className="text-gray-400">Envíanos un mensaje por WhatsApp con tu número de pedido y la evidencia adjunta. Revisaremos el caso inmediatamente.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/10">
                                <h4 className="text-white font-bold mb-4">La garantía NO cubre:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <CheckCircle2 className="text-gray-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>Archivos enviados en baja resolución (pixelados) o colores que cambian de RGB a CMYK (si el cliente aprobó la muestra previa).</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <CheckCircle2 className="text-gray-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>Errores de ortografía o diseño en los archivos enviados por el cliente.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <CheckCircle2 className="text-gray-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>Mala instalación de los stickers o daños por manipulación inapropiada.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-10">
                                <a
                                    href={PIGMENTO_DATA.contact.whatsappUrl}
                                    target="_blank"
                                    className="inline-flex items-center justify-center px-8 py-3 bg-brand-yellow text-black font-black uppercase tracking-wide rounded-xl hover:bg-white transition-colors"
                                >
                                    Enviar Caso por WhatsApp
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}

