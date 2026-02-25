import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const STATUS_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string }> = {
    PENDING: { label: "Procesando", icon: "⏳", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
    PRODUCTION: { label: "En Producción", icon: "🔧", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
    PACKING: { label: "Empacando", icon: "📋", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
    SHIPPED: { label: "Enviado", icon: "📦", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
    COMPLETED: { label: "Entregado", icon: "✅", color: "text-green-700", bg: "bg-green-50 border-green-200" },
    CANCELLED: { label: "Cancelado", icon: "❌", color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

const STAGES = ["PENDING", "PRODUCTION", "PACKING", "SHIPPED", "COMPLETED"];

const DELIVERY_LABELS: Record<string, string> = {
    nacional: "📦 Envío Nacional (Interrapidísimo)",
    picap: "⚡ Picap (Mismo día)",
    oficina: "📍 Recogida en Oficina",
};

export default async function PedidoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const order = await prisma.order.findUnique({
        where: { id },
        include: { items: true },
    });

    if (!order) return notFound();

    const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
    const currentStageIndex = STAGES.indexOf(order.status);
    const photos: string[] = (order as any).progressPhotos ? JSON.parse((order as any).progressPhotos) : [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-brand-black text-white py-8 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <Link href="/" className="text-brand-yellow font-black text-lg tracking-tight hover:underline">
                        Pigmento Stickers 🎨
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
                        Seguimiento de Pedido
                    </h1>
                    <p className="text-gray-400 text-sm mt-1 font-mono">
                        #{order.id.slice(-6).toUpperCase()}
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
                {/* Estado actual */}
                <div className={`rounded-2xl border-2 p-6 text-center ${statusConf.bg}`}>
                    <span className="text-4xl block mb-2">{statusConf.icon}</span>
                    <p className={`text-xl font-black ${statusConf.color}`}>{statusConf.label.toUpperCase()}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Última actualización: {order.updatedAt.toLocaleDateString("es-ES", {
                            year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                    </p>
                </div>

                {/* Timeline de progreso */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5">Progreso</h2>
                    <div className="flex items-center justify-between relative">
                        {/* Línea de fondo */}
                        <div className="absolute top-5 left-6 right-6 h-1 bg-gray-100 rounded-full" />
                        <div
                            className="absolute top-5 left-6 h-1 bg-brand-yellow rounded-full transition-all duration-500"
                            style={{ width: `calc(${(currentStageIndex / (STAGES.length - 1)) * 100}% - 48px)` }}
                        />
                        {STAGES.map((stage, i) => {
                            const conf = STATUS_CONFIG[stage];
                            const isActive = i <= currentStageIndex;
                            const isCurrent = stage === order.status;
                            return (
                                <div key={stage} className="flex flex-col items-center relative z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all ${isCurrent ? 'bg-brand-yellow border-brand-yellow scale-110 shadow-lg shadow-brand-yellow/20' :
                                        isActive ? 'bg-white border-brand-yellow' : 'bg-gray-50 border-gray-200'
                                        }`}>
                                        {conf.icon}
                                    </div>
                                    <p className={`text-[9px] font-black mt-2 uppercase tracking-wider text-center ${isCurrent ? 'text-brand-black' : isActive ? 'text-gray-600' : 'text-gray-300'
                                        }`}>
                                        {conf.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Número de rastreo */}
                {order.trackingNumber && (
                    <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6">
                        <h2 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-3">🚚 Guía de Envío</h2>
                        <p className="text-2xl font-black text-purple-800 font-mono">{order.trackingNumber}</p>
                        {order.trackingUrl && (
                            <a
                                href={order.trackingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-purple-600 hover:text-purple-800 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-xl transition-colors"
                            >
                                🔗 Rastrear mi envío
                            </a>
                        )}
                    </div>
                )}

                {/* Fotos del progreso */}
                {photos.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">📸 Fotos del Proceso</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {photos.map((url, i) => (
                                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                                    className="aspect-square rounded-xl overflow-hidden border border-gray-100 hover:border-brand-yellow hover:shadow-lg transition-all">
                                    <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Productos */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">🛒 Tu Pedido</h2>
                    <div className="space-y-4">
                        {order.items.map((item) => {
                            const meta = item.metadata ? JSON.parse(item.metadata as string) : null;
                            const name = meta?.name || meta?.materialName || "Sticker Personalizado";
                            const category = meta?.category || "";
                            const features = meta?.features || [];

                            return (
                                <div key={item.id} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                                    <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center shrink-0 border border-brand-yellow/20">
                                        🎨
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-bold text-gray-900">{name}</h3>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            <span className="text-[10px] text-gray-500 font-medium">Cant: {item.quantity}</span>
                                            {category && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-bold uppercase">{category}</span>}
                                            {features.map((f: string, i: number) => (
                                                <span key={i} className="text-[9px] bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-gray-500">{f}</span>
                                            ))}
                                        </div>
                                        {item.fileUrl && (
                                            <a href={`/view-design/${item.fileUrl.split('/').pop()}`} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-purple-600 hover:text-purple-800">
                                                🔗 Ver tu diseño
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-sm font-black text-gray-900 shrink-0">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500 font-bold">Total</span>
                        <span className="text-xl font-black text-brand-black">{formatPrice(order.amount)}</span>
                    </div>
                </div>

                {/* Datos de envío */}
                {(order.shippingName || order.shippingAddress) && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">📍 Envío</h2>
                        <div className="space-y-1.5 text-sm text-gray-700">
                            {order.shippingName && <p>👤 <strong>{order.shippingName}</strong></p>}
                            {order.shippingAddress && <p>📍 {order.shippingAddress}{order.shippingCity ? `, ${order.shippingCity}` : ''}</p>}
                            {order.deliveryMethod && <p>🚚 {DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod}</p>}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center pt-4 pb-8">
                    <p className="text-sm text-gray-400 mb-3">¿Preguntas sobre tu pedido?</p>
                    <a href="https://wa.me/573160535247" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white font-black text-sm px-6 py-3 rounded-xl hover:bg-[#20bd5b] transition-colors">
                        💬 Escríbenos por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
