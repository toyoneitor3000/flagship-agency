"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, Flame, Skull, Zap, Heart, Ghost, Rocket } from "lucide-react";

const stickerIcons = [
    { Icon: Sparkles, color: "from-purple-500 to-pink-500", rotate: -15, delay: 0 },
    { Icon: Star, color: "from-yellow-400 to-orange-500", rotate: 10, delay: 0.1 },
    { Icon: Flame, color: "from-orange-500 to-red-600", rotate: -8, delay: 0.2 },
    { Icon: Skull, color: "from-gray-600 to-gray-800", rotate: 20, delay: 0.3 },
    { Icon: Zap, color: "from-blue-400 to-cyan-500", rotate: -20, delay: 0.4 },
    { Icon: Heart, color: "from-pink-500 to-rose-600", rotate: 15, delay: 0.5 },
    { Icon: Ghost, color: "from-indigo-400 to-purple-600", rotate: -12, delay: 0.6 },
    { Icon: Rocket, color: "from-emerald-500 to-teal-600", rotate: 8, delay: 0.7 },
];

export default function FloatingStickers() {
    return (
        <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
            {stickerIcons.map(({ Icon, color, rotate, delay }, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotate: rotate,
                    }}
                    transition={{
                        delay: delay + 0.5,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                    }}
                    whileHover={{ scale: 1.2, rotate: 0, zIndex: 50 }}
                    className={`absolute cursor-pointer`}
                    style={{
                        top: `${15 + (index % 4) * 20}%`,
                        left: `${10 + (index % 3) * 25}%`,
                        transform: `rotate(${rotate}deg)`,
                    }}
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3 + index * 0.5,
                            ease: "easeInOut",
                        }}
                        className={`bg-gradient-to-br ${color} p-4 md:p-6 rounded-2xl shadow-xl border-4 border-white/20`}
                    >
                        <Icon className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-lg" />
                    </motion.div>
                </motion.div>
            ))}

            {/* Decorative elements */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-brand-yellow/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
            />
        </div>
    );
}
