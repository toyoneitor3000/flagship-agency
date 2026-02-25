"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ExternalLink, Copy, Check, Clipboard } from "lucide-react";

type WhatsAppPreviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    phone: string;
    messagePreview: string;
    plainMessage: string;  // Mensaje en texto plano (NO URL-encoded)
};

export function WhatsAppPreviewModal({
    isOpen,
    onClose,
    phone,
    messagePreview,
    plainMessage,
}: WhatsAppPreviewModalProps) {
    const [copied, setCopied] = useState(false);
    const [step, setStep] = useState<'preview' | 'copied'>('preview');

    const fullPhone = phone.replace(/\D/g, '').startsWith('57')
        ? phone.replace(/\D/g, '')
        : `57${phone.replace(/\D/g, '')}`;

    // URL corta solo para abrir el chat, sin mensaje
    const whatsappChatUrl = `https://wa.me/${fullPhone}`;

    const handleCopyAndOpen = async () => {
        try {
            await navigator.clipboard.writeText(plainMessage);
            setCopied(true);
            setStep('copied');
            // Abrir WhatsApp automáticamente después de copiar
            setTimeout(() => {
                window.open(whatsappChatUrl, '_blank');
            }, 600);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            // Fallback: intentar con la URL (truncada pero algo llega)
            const encoded = encodeURIComponent(plainMessage);
            window.open(`${whatsappChatUrl}?text=${encoded}`, '_blank');
        }
    };

    const handleCopyOnly = async () => {
        try {
            await navigator.clipboard.writeText(plainMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleClose = () => {
        onClose();
        setStep('preview');
        setCopied(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                                        Enviar por WhatsApp
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-medium">
                                        {step === 'preview' ? 'Revisa el mensaje y haz clic en enviar' : '¡Mensaje copiado! Pégalo en WhatsApp'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Destinatario */}
                        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest w-12">Para:</span>
                                <span className="text-sm font-bold text-gray-800">+{fullPhone}</span>
                            </div>
                        </div>

                        {/* Step indicator for copied state */}
                        {step === 'copied' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="px-6 py-3 bg-green-50 border-b border-green-100"
                            >
                                <div className="flex items-center gap-2 text-green-700 text-sm font-bold">
                                    <Check className="w-4 h-4" />
                                    <span>Mensaje copiado al portapapeles. Pégalo en la conversación de WhatsApp (Ctrl+V)</span>
                                </div>
                            </motion.div>
                        )}

                        {/* Preview del mensaje */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                Vista Previa del Mensaje
                            </p>
                            <div className="bg-[#DCF8C6] rounded-xl rounded-tl-sm p-4 shadow-sm border border-[#c5e8b0]">
                                <div
                                    className="text-[13px] text-gray-800 leading-relaxed whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{ __html: messagePreview }}
                                />
                                <p className="text-[10px] text-gray-500 text-right mt-2">
                                    {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={handleCopyOnly}
                                className="flex items-center justify-center gap-1.5 text-sm font-bold text-gray-500 py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copiado' : 'Copiar'}
                            </button>
                            <button
                                onClick={handleCopyAndOpen}
                                className="flex-1 text-sm font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5b] text-white transition-all uppercase tracking-wider"
                            >
                                <Clipboard className="w-4 h-4" />
                                Copiar y Abrir WhatsApp
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
