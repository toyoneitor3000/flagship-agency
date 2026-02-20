"use client";

import Link from "next/link";
import Image from "next/image";
import { Ghost, Shield, Star, Palette, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const menuItems = [
    {
        id: "stickers",
        label: "Stickers",
        description: "Cortes precisos y vinilos premium",
        icon: Ghost,
        href: "/cotizador",
        imageSrc: "/project-types/printed-stickers.png",
        gradient: "from-purple-900/90 to-indigo-900/90",
        delay: 0
    },
    {
        id: "cubreplacas",
        label: "Cubreplacas",
        description: "Protección y estilo para tu moto",
        icon: Shield,
        href: "/cotizador",
        imageSrc: "/project-types/cubreplacas.png",
        gradient: "from-gray-900/90 to-black/90",
        delay: 0.1
    },
    {
        id: "packs",
        label: "Packs",
        description: "Colecciones listas para pegar",
        icon: Star,
        href: "/packs",
        imageSrc: "/fotos stickers coleccion/Sushi Pack/3.png",
        gradient: "from-orange-700/80 to-red-900/80",
        delay: 0.2
    },
    {
        id: "diseno",
        label: "Diseño",
        description: "Creamos tu identidad visual",
        icon: Palette,
        href: "/diseno",
        imageSrc: "/images/design/logo_pro_alt.png",
        gradient: "from-pink-900/80 to-rose-950/80",
        delay: 0.3
    }
];

function TiltCard({ item }: { item: typeof menuItems[0] }) {
    const ref = useRef<HTMLAnchorElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]); // Reduced rotation for wider cards
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay, duration: 0.5 }}
            style={{
                perspective: 1000,
            }}
            className="h-full w-full"
        >
            <Link
                ref={ref}
                href={item.href}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="block relative h-60 md:h-72 lg:h-80 w-full rounded-[1rem] overflow-hidden group shadow-lg hover:shadow-2xl hover:shadow-brand-yellow/20 transition-all duration-300 transform-gpu bg-gray-900 border border-white/5"
            >
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-full h-full"
                >
                    {/* Background Image with Zoom Effect */}
                    <div className="absolute inset-0 z-0 select-none">
                        <Image
                            src={item.imageSrc}
                            alt={item.label}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    {/* Cinematic Cinematic Gradient Overlay (Bottom-Heavy for text) */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-70" />

                    {/* Color Tint Overlay - More subtle now */}
                    <div className={`absolute inset-0 z-10 bg-gradient-to-br ${item.gradient} mix-blend-overlay opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />

                    {/* Shine Effect */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-soft-light" />

                    {/* Content Container - Glassmorphism Style Layout */}
                    <div className="relative z-30 h-full p-6 md:p-8 flex flex-col justify-end transform-gpu translate-z-20">
                        {/* Top Icon */}
                        <div className="absolute top-5 left-5">
                            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/20 shadow-lg group-hover:bg-brand-yellow group-hover:text-black transition-all duration-300">
                                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
                            </div>
                        </div>

                        <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                            <h3 className="font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-[-0.07em] leading-[0.9] mb-3 drop-shadow-xl text-white">
                                {item.label}
                            </h3>

                            {/* Description reveals/slides up on hover with Frosted Glass Panel */}
                            <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-75">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg">
                                    <p className="text-xs md:text-sm font-medium text-white leading-tight mb-2 drop-shadow-sm">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center text-[10px] md:text-xs font-bold text-brand-yellow uppercase tracking-widest gap-2">
                                        Explorar <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export default function HomeMenu() {
    return (
        <div className="relative w-full">
            {/* Ambient Glow / Orbs Background */}
            <div className="absolute -inset-20 bg-brand-yellow/20 blur-[100px] rounded-full opacity-40 animate-pulse pointer-events-none -z-10" />
            <div className="absolute -inset-20 bg-purple-600/20 blur-[120px] rounded-full opacity-30 animate-pulse delay-1000 pointer-events-none -z-10 translate-x-20 translate-y-20" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full relative z-10">
                {menuItems.map((item) => (
                    <TiltCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
