"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Package, Star, Sparkles } from "lucide-react";

interface StatProps {
    value: number;
    label: string;
    suffix?: string;
    icon: React.ReactNode;
    delay?: number;
}

function AnimatedStat({ value, label, suffix = "", icon, delay = 0 }: StatProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setTimeout(() => {
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        setCount(value);
                        clearInterval(interval);
                    } else {
                        setCount(Math.floor(current));
                    }
                }, duration / steps);

                return () => clearInterval(interval);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [isInView, value, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay / 1000 }}
            className="text-center group"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-yellow/10 rounded-2xl mb-4 group-hover:bg-brand-yellow group-hover:scale-110 transition-all duration-300">
                <div className="text-brand-yellow group-hover:text-black transition-colors">
                    {icon}
                </div>
            </div>
            <div className="text-5xl md:text-6xl font-black text-white mb-2">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">
                {label}
            </div>
        </motion.div>
    );
}

export default function StatsCounter() {
    const stats = [
        { value: 2500, label: "Clientes Felices", suffix: "+", icon: <Users className="w-7 h-7" /> },
        { value: 15000, label: "Stickers Entregados", suffix: "+", icon: <Package className="w-7 h-7" /> },
        { value: 5, label: "Años de Experiencia", suffix: "", icon: <Star className="w-7 h-7" /> },
        { value: 98, label: "Satisfacción", suffix: "%", icon: <Sparkles className="w-7 h-7" /> },
    ];

    return (
        <section className="py-24 bg-brand-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-yellow rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm">Números que hablan</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-4">NUESTRA TRAYECTORIA</h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, idx) => (
                        <AnimatedStat key={stat.label} {...stat} delay={idx * 200} />
                    ))}
                </div>
            </div>
        </section>
    );
}
