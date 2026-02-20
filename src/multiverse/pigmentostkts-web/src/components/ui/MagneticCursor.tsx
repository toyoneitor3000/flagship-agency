"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener("mousemove", moveCursor);

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.style.cursor = 'auto'; // Restore default cursor
        };
    }, [cursorX, cursorY]);

    // Optional: Add hover detection for links/buttons to expand the cursor
    // This is a simple implementation. For production, you'd add global listeners or use a context.

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-brand-yellow z-[9999] pointer-events-none mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <div className="w-2 h-2 bg-brand-yellow rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}
