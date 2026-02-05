"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";

export default function FloatingWhatsApp() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-6 w-80 border border-gray-100"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Pigmento Stickers</p>
                                <p className="text-sm text-green-600">En línea ahora</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            ¡Hola! 👋 ¿En qué podemos ayudarte? Respuesta en minutos.
                        </p>
                        <a
                            href={PIGMENTO_DATA.contact.whatsappUrl}
                            target="_blank"
                            className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold transition-colors"
                        >
                            Iniciar Chat
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors ${isOpen ? "bg-gray-800" : "bg-green-500 hover:bg-green-600"
                    }`}
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white" />
                )}
            </motion.button>

            {/* Pulse animation */}
            {!isOpen && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white" />
            )}
        </div>
    );
}
