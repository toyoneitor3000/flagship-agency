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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay / 1000 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-brand-yellow/30 transition-all duration-300 group"
        >
            <div className="mb-3 text-brand-yellow/80 group-hover:text-brand-yellow transition-colors group-hover:scale-110 duration-300">
                {icon}
            </div>
            <div className="text-3xl font-black text-white mb-1 tracking-tight">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-gray-400 font-medium uppercase tracking-widest text-[10px] text-center">
                {label}
            </div>
        </motion.div>
    );
}

export default function StatsCounter() {
    const stats = [
        { value: 2500, label: "Clientes Felices", suffix: "+", icon: <Users className="w-6 h-6" /> },
        { value: 15000, label: "Stickers Entregados", suffix: "+", icon: <Package className="w-6 h-6" /> },
        { value: 9, label: "Años de Experiencia", suffix: "", icon: <Star className="w-6 h-6" /> },
        { value: 98, label: "Satisfacción", suffix: "%", icon: <Sparkles className="w-6 h-6" /> },
    ];

    return (
        <section className="py-12 bg-brand-black border-y border-white/10 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 max-w-6xl mx-auto">

                    <div className="text-left md:w-1/3">
                        <span className="text-brand-yellow font-bold tracking-widest uppercase text-xs mb-2 block">
                            Nuestra Trayectoria
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            RESULTADOS QUE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">HABLAN POR SÍ SOLOS</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full md:w-2/3">
                        {stats.map((stat, idx) => (
                            <AnimatedStat key={stat.label} {...stat} delay={idx * 150} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
