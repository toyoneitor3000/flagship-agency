'use client';

import { motion } from "framer-motion";
import Image from "next/image";

interface PurrpurrSuccessProps {
    message?: string;
    onDismiss?: () => void;
}

export const PurrpurrSuccess = ({ message = "Operation Successful!", onDismiss }: PurrpurrSuccessProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[10000] p-4 bg-zinc-950/60 backdrop-blur-sm"
            onClick={onDismiss}
        >
            <motion.div
                className="bg-zinc-900 border border-purple-500/30 rounded-2xl p-8 flex flex-col items-center shadow-[0_0_50px_rgba(168,85,247,0.25)] max-w-sm w-full relative overflow-hidden"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-500 to-emerald-500"></div>

                <motion.div
                    className="relative w-32 h-32 mb-6"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <Image
                        src="/assets/purrpurr/success.png"
                        alt="Purrpurr Success"
                        fill
                        className="object-contain drop-shadow-[0_0_15px_rgba(167,139,250,0.6)]"
                    />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2 text-center">{message}</h3>
                <p className="text-zinc-400 text-sm text-center mb-6">Process completed successfully.</p>

                {onDismiss && (
                    <button
                        onClick={onDismiss}
                        className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-purple-400 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
                    >
                        Close
                    </button>
                )}
            </motion.div>
        </motion.div>
    );
};
