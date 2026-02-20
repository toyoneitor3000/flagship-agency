"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, Flame, Skull, Zap, Heart, Ghost, Rocket } from "lucide-react";

const stickerIcons = [
    { Icon: Sparkles, imageSrc: null, color: "from-purple-500 to-pink-500", rotate: -15, delay: 0 },
    { Icon: Star, imageSrc: null, color: "from-yellow-400 to-orange-500", rotate: 10, delay: 0.1 },
    { Icon: Flame, imageSrc: null, color: "from-orange-500 to-red-600", rotate: -8, delay: 0.2 },
    { Icon: Skull, imageSrc: null, color: "from-gray-600 to-gray-800", rotate: 20, delay: 0.3 },
    { Icon: Zap, imageSrc: null, color: "from-blue-400 to-cyan-500", rotate: -20, delay: 0.4 },
    { Icon: Heart, imageSrc: null, color: "from-pink-500 to-rose-600", rotate: 15, delay: 0.5 },
    { Icon: Ghost, imageSrc: null, color: "from-indigo-400 to-purple-600", rotate: -12, delay: 0.6 },
    { Icon: Rocket, imageSrc: null, color: "from-emerald-500 to-teal-600", rotate: 8, delay: 0.7 },
];

export default function FloatingStickers() {
    return (
        <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
            {stickerIcons.map(({ Icon, imageSrc, color, rotate, delay }, index) => (
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
                    drag
                    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
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
                        // Sticker Container: Solid white border, tight rounding, realistic shadow
                        className={`relative group bg-gradient-to-br ${color} p-4 md:p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[6px] border-white overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]`}
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}></div>

                        {/* Holographic/Iridescent Shine on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none z-20" />

                        {/* Gloss/Reflection Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none w-[200%] -ml-[50%]" />

                        {/* Static Gloss */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent pointer-events-none rounded-[1.5rem]" />

                        <div className="relative z-10">
                            {imageSrc ? (
                                /* CONVERTER LOGIC: If image is present, treat white bg as transparent using multiply */
                                <img
                                    src={imageSrc}
                                    alt="sticker"
                                    className="w-8 h-8 md:w-12 md:h-12 object-contain mix-blend-multiply drop-shadow-md"
                                />
                            ) : (
                                <Icon className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-md" strokeWidth={2.5} />
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ))}

            {/* Decorative elements */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
            />
        </div>
    );
}
