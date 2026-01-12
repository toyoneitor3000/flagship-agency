"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
    duration?: number;
}

export function Toast({ message, type = "success", onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-green-400" />,
        error: <AlertCircle className="w-5 h-5 text-red-400" />,
        info: <Info className="w-5 h-5 text-blue-400" />,
    };

    const colors = {
        success: "border-green-500/20 bg-green-500/5 shadow-green-500/10",
        error: "border-red-500/20 bg-red-500/5 shadow-red-500/10",
        info: "border-blue-500/20 bg-blue-500/5 shadow-blue-500/10",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed bottom-8 right-8 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${colors[type]}`}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-sm font-medium text-white/90">{message}</p>
            <button
                onClick={onClose}
                className="ml-4 p-1 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white"
            >
                <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 rounded-full overflow-hidden w-full">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                    className={`h-full ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
                />
            </div>
        </motion.div>
    );
}
