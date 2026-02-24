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
        delay: 0
    },
    {
        id: "cubreplacas",
        label: "Cubreplacas",
        description: "Protección y estilo para tu moto",
        icon: Shield,
        href: "/cubreplacas",
        imageSrc: "/project-types/cubreplacas.png",
        delay: 0.1
    },
    {
        id: "packs",
        label: "Packs",
        description: "Colecciones listas para pegar",
        icon: Star,
        href: "/packs",
        imageSrc: "/fotos stickers coleccion/Sushi Pack/3.png",
        delay: 0.2
    },
    {
        id: "diseno",
        label: "Diseño",
        description: "Creamos tu identidad visual",
        icon: Palette,
        href: "/diseno",
        imageSrc: "/images/design/logo_pro_alt.png",
        delay: 0.3
    }
];

function TiltCard({ item }: { item: typeof menuItems[0] }) {
    const ref = useRef<HTMLAnchorElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

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
                className="block relative h-48 md:h-56 lg:h-64 w-full rounded-[1.5rem] overflow-hidden group shadow-lg hover:shadow-2xl hover:shadow-brand-yellow/30 transition-shadow duration-500 transform-gpu bg-brand-black border border-white/10"
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
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    {/* Subtle Vignette Overlay for Text Readability - Minimal interference */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

                    {/* Shine Effect */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-soft-light" />

                    {/* Icon Badge - Top Right */}
                    <div className="absolute top-3 right-3 z-30 transform-gpu translate-z-30">
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-xl group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all duration-300">
                            <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-black transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Glassmorphic Content Panel - Bottom Inset */}
                    <div className="absolute bottom-2 left-2 right-2 z-30 transform-gpu translate-z-20 transition-transform duration-500 group-hover:-translate-y-1">
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-end shadow-2xl relative overflow-hidden">
                            {/* Inner Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex justify-between items-end relative z-10 w-full">
                                <div className="flex-1 pr-3">
                                    <h3 className="font-black text-xl md:text-2xl lg:text-3xl uppercase tracking-tighter leading-none mb-1 text-white group-hover:text-brand-yellow transition-colors duration-300">
                                        {item.label}
                                    </h3>
                                    <p className="text-[10px] md:text-xs font-medium text-gray-300 leading-snug drop-shadow-sm">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Call to action arrow - Fixed at bottom right */}
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-brand-yellow group-hover:text-black transition-all duration-300 shadow-inner group-hover:scale-110">
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-rotate-45" />
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

            {/* Changed to 2x2 Grid explicitly, slightly larger gaps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full relative z-10">
                {menuItems.map((item) => (
                    <TiltCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
