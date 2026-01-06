'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

// Número de Purrpurr
const WHATSAPP_NUMBER = '573102957754';
const DEFAULT_MESSAGE = '¡Hola! Me interesa crear mi página web con Purrpurr 🚀';

export const WhatsAppFloat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);

    const handleSend = () => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-20 right-0 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#25D366] p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Purrpurr</p>
                                <p className="text-white/80 text-xs">Respuesta en minutos</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-auto text-white/60 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="p-4 space-y-3">
                            <div className="bg-zinc-800 rounded-xl rounded-tl-none p-3 max-w-[90%]">
                                <p className="text-zinc-300 text-sm">
                                    ¡Hola! 👋 ¿Listo para crear tu página web profesional?
                                </p>
                                <p className="text-zinc-500 text-[10px] mt-1">Ahora</p>
                            </div>

                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Escribe tu mensaje..."
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl p-3 text-sm text-white placeholder:text-zinc-500 resize-none focus:outline-none focus:border-[#25D366]/50 transition-colors"
                                rows={2}
                            />

                            <button
                                onClick={handleSend}
                                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Iniciar Chat
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Pulse Animation (only when closed) */}
            {!isOpen && (
                <span className="absolute top-0 right-0 w-3 h-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
                </span>
            )}
        </div>
    );
};
