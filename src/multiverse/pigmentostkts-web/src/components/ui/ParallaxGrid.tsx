"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function ParallaxGrid() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 400 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const moveX = useTransform(springX, [-0.5, 0.5], ["-20px", "20px"]);
    const moveY = useTransform(springY, [-0.5, 0.5], ["-20px", "20px"]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{ x: moveX, y: moveY }}
            className="absolute inset-0 z-0 pointer-events-none"
        >
            <div className="absolute inset-[-50px] bg-dot-pattern opacity-20"></div>
        </motion.div>
    );
}
