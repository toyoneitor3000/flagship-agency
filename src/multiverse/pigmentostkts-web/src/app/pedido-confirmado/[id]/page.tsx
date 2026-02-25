"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Package, User, ExternalLink, MessageCircle, Copy, Check, Loader2 } from "lucide-react";

function formatPrice(price: number) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
}

export default function PedidoConfirmadoPage() {
    const { data: session } = useSession();
    const params = useParams();
    const orderId = params.id as string;
    const shortId = orderId?.slice(-6).toUpperCase() || '';
    const trackingUrl = `/pedido/${orderId}`;

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [waSent, setWaSent] = useState(false);

    useEffect(() => {
        if (!orderId) return;
        fetch(`/api/orders/${orderId}`)
            .then(r => r.json())
            .then(data => {
                setOrder(data.order || data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [orderId]);

    // Construir mensaje de WhatsApp para el CLIENTE que envía a Pigmento
    const buildClientWhatsAppMessage = () => {
        if (!order) return '';

        let msg = `¡Hola Pigmento! 🎨\n\n`;
        msg += `Acabo de realizar un pedido y quiero confirmarlo:\n\n`;
        msg += `📋 *Pedido #${shortId}*\n\n`;

        if (order.items) {
            order.items.forEach((item: any) => {
                const meta = item.metadata ? JSON.parse(item.metadata) : null;
                const name = meta?.name || meta?.materialName || 'Sticker';
                msg += `• ${item.quantity}x ${name} — ${formatPrice(item.price * item.quantity)}\n`;
            });
        }

        msg += `\n💰 *Total: ${formatPrice(order.amount)}*\n\n`;
        msg += `👤 ${order.shippingName || ''}\n`;
        if (order.shippingAddress) msg += `📍 ${order.shippingAddress}${order.shippingCity ? `, ${order.shippingCity}` : ''}\n`;
        if (order.contactPhone) msg += `📱 ${order.contactPhone}\n`;
        msg += `\n📱 Mi pedido: ${typeof window !== 'undefined' ? window.location.origin : ''}${trackingUrl}\n\n`;
        msg += `¿Cómo realizo el pago? 💳`;

        return msg;
    };

    const handleCopyAndSendWhatsApp = async () => {
        const msg = buildClientWhatsAppMessage();
        try {
            await navigator.clipboard.writeText(msg);
            setCopied(true);
            setTimeout(() => {
                window.open('https://wa.me/573160535247', '_blank');
                setWaSent(true);
                setCopied(false);
            }, 600);
        } catch {
            // Fallback: abrir con texto acortado
            const short = encodeURIComponent(`¡Hola Pigmento! 🎨 Acabo de hacer el pedido #${shortId}. Total: ${order ? formatPrice(order.amount) : ''}. ¿Cómo realizo el pago?`);
            window.open(`https://wa.me/573160535247?text=${short}`, '_blank');
            setWaSent(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
                {/* Header con animación de éxito */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-8 py-10 text-center relative overflow-hidden">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                        className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4"
                    >
                        <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-black tracking-tight"
                    >
                        ¡Pedido Registrado!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-green-100 text-sm mt-1"
                    >
                        Pedido #{shortId}
                    </motion.p>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
                </div>

                {/* Contenido */}
                <div className="px-8 py-8 space-y-5">

                    {/* PASO 1: Enviar pedido por WhatsApp */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className={`rounded-2xl p-5 border-2 transition-all ${waSent ? 'bg-green-50 border-green-200' : 'bg-[#25D366]/5 border-[#25D366]/30'}`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-black ${waSent ? 'bg-green-500 text-white' : 'bg-[#25D366] text-white'}`}>
                                {waSent ? '✓' : '1'}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                                    {waSent ? '¡Mensaje enviado!' : 'Envía tu pedido por WhatsApp'}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 mb-3">
                                    {waSent
                                        ? 'Te responderemos pronto con las instrucciones de pago.'
                                        : 'Envíanos tu pedido por WhatsApp para confirmar y coordinar el pago.'}
                                </p>
                                {!waSent && (
                                    <button
                                        onClick={handleCopyAndSendWhatsApp}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 text-xs font-black bg-[#25D366] text-white px-5 py-2.5 rounded-xl hover:bg-[#20bd5b] transition-all uppercase tracking-wider disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : copied ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            <MessageCircle className="w-4 h-4" />
                                        )}
                                        {copied ? 'Copiado, abriendo WhatsApp...' : 'Enviar por WhatsApp'}
                                    </button>
                                )}
                                {waSent && (
                                    <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Recuerda pegar el mensaje (Ctrl+V) en la conversación
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* PASO 2: Seguimiento */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-5"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center shrink-0 text-sm font-black">2</div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-brand-black uppercase tracking-tight">Sigue tu pedido</h3>
                                <p className="text-xs text-gray-500 mt-1 mb-3">
                                    Guarda este enlace para ver el estado, fotos del proceso y tu número de rastreo.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        href={trackingUrl}
                                        className="inline-flex items-center gap-1.5 text-xs font-black bg-brand-black text-white px-4 py-2 rounded-xl hover:bg-brand-yellow hover:text-brand-black transition-all uppercase tracking-wider"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Ver Pedido
                                    </Link>
                                    <button
                                        onClick={() => {
                                            const fullUrl = `${window.location.origin}${trackingUrl}`;
                                            navigator.clipboard.writeText(fullUrl);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                        Copiar Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* PASO 3: Invitar a registrarse (si no tiene sesión) */}
                    {!session && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                            className="bg-blue-50 border border-blue-100 rounded-2xl p-5"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-sm font-black">3</div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Crea tu cuenta</h3>
                                    <p className="text-xs text-gray-500 mt-1 mb-3">
                                        Inicia sesión para ver todos tus pedidos en un solo lugar y recibir actualizaciones automáticas.
                                    </p>
                                    <button
                                        onClick={() => signIn("google", { callbackUrl: trackingUrl })}
                                        className="inline-flex items-center gap-2 text-xs font-black bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all uppercase tracking-wider"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Iniciar con Google
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Ya tiene sesión */}
                    {session && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                            className="bg-green-50 border border-green-100 rounded-2xl p-5"
                        >
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                                <div>
                                    <h3 className="text-sm font-black text-gray-900">Sesión activa</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Tu pedido ya aparece en tu <Link href="/dashboard" className="text-green-600 font-bold hover:underline">dashboard</Link>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Resumen rápido */}
                    {order && !loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                        >
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Resumen</p>
                            <div className="space-y-1.5">
                                {order.items?.map((item: any) => {
                                    const meta = item.metadata ? JSON.parse(item.metadata) : null;
                                    const name = meta?.name || meta?.materialName || 'Sticker';
                                    return (
                                        <div key={item.id} className="flex justify-between items-center">
                                            <span className="text-xs text-gray-600">{item.quantity}x {name}</span>
                                            <span className="text-xs font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    );
                                })}
                                <div className="border-t border-gray-200 pt-1.5 mt-1.5 flex justify-between">
                                    <span className="text-xs font-bold text-gray-500">Total</span>
                                    <span className="text-sm font-black text-brand-black">{formatPrice(order.amount)}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
                    <Link href="/" className="text-xs font-bold text-gray-400 hover:text-brand-black transition-colors">
                        ← Volver a Pigmento Stickers
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
