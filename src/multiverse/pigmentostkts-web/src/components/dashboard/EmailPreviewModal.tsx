"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send, Loader2, Check, AlertTriangle } from "lucide-react";

type EmailPreviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    to: string;
    subject: string;
    htmlPreview: string;
    textBody: string;
    htmlBody: string;
};

export function EmailPreviewModal({
    isOpen,
    onClose,
    to,
    subject,
    htmlPreview,
    textBody,
    htmlBody,
}: EmailPreviewModalProps) {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSend = async () => {
        setStatus('sending');
        setErrorMsg('');

        try {
            const response = await fetch('/api/notifications/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to, subject, htmlBody, textBody }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Error enviando email');
            }

            setStatus('sent');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 2000);
        } catch (err: any) {
            setStatus('error');
            setErrorMsg(err.message || 'Error desconocido');
        }
    };

    const handleClose = () => {
        if (status !== 'sending') {
            onClose();
            setStatus('idle');
            setErrorMsg('');
        }
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
                                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Mail className="w-4.5 h-4.5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                                        Confirmar Envío de Email
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-medium">
                                        Revisa el mensaje antes de enviarlo
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Email details */}
                        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest w-12">Para:</span>
                                <span className="text-sm font-bold text-gray-800">{to}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest w-12">Asunto:</span>
                                <span className="text-sm font-medium text-gray-700">{subject}</span>
                            </div>
                        </div>

                        {/* Message preview */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                Vista Previa del Mensaje
                            </p>
                            <div
                                className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-sm text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: htmlPreview }}
                            />
                        </div>

                        {/* Status messages */}
                        <AnimatePresence>
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6"
                                >
                                    <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm font-bold px-4 py-3 rounded-xl border border-red-100">
                                        <AlertTriangle className="w-4 h-4 shrink-0" />
                                        <span>{errorMsg}</span>
                                    </div>
                                </motion.div>
                            )}
                            {status === 'sent' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6"
                                >
                                    <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm font-bold px-4 py-3 rounded-xl border border-green-100">
                                        <Check className="w-4 h-4 shrink-0" />
                                        <span>¡Email enviado exitosamente!</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Action buttons */}
                        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={handleClose}
                                disabled={status === 'sending'}
                                className="flex-1 text-sm font-bold text-gray-500 py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={status === 'sending' || status === 'sent'}
                                className={`flex-1 text-sm font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase tracking-wider ${status === 'sent'
                                        ? 'bg-green-500 text-white'
                                        : status === 'error'
                                            ? 'bg-red-500 hover:bg-red-600 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    } disabled:opacity-70`}
                            >
                                {status === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
                                {status === 'sent' && <Check className="w-4 h-4" />}
                                {status === 'error' && <AlertTriangle className="w-4 h-4" />}
                                {status === 'idle' && <Send className="w-4 h-4" />}
                                {status === 'sending' ? 'Enviando...' :
                                    status === 'sent' ? '¡Enviado!' :
                                        status === 'error' ? 'Reintentar' : 'Enviar Email'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
