'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function CreativeCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Only run on desktop? For now, we assume desktop or handle it via CSS media queries for display:none
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Center the initial position off-screen or center
        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
        gsap.set(follower, { xPercent: -50, yPercent: -50, opacity: 0 });

        const pos = { x: 0, y: 0 };
        const mouse = { x: 0, y: 0 };
        const speed = 0.5; // Faster, less "heavy" feel

        const fp = { x: 0, y: 0 };

        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");
        const fXSet = gsap.quickSetter(follower, "x", "px");
        const fYSet = gsap.quickSetter(follower, "y", "px");

        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            // Make visible on first move
            gsap.to([cursor, follower], { opacity: 1, duration: 0.5 });

            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Main dot tracks insantly
            xSet(mouse.x);
            ySet(mouse.y);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Ticker for the smooth follower
        const loop = () => {
            // Standard Lerp
            fp.x += (mouse.x - fp.x) * speed;
            fp.y += (mouse.y - fp.y) * speed;

            fXSet(fp.x);
            fYSet(fp.y);

            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        // Re-attach listeners when DOM changes (simplified by just doing it on mount/pathname change)
        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const setupListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, input, [data-hover], .hover-trigger');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
            return interactiveElements; // return to cleanup
        };

        let elements = setupListeners();

        // Observer for dynamic content? Maybe later. 

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            elements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [pathname]);

    return (
        <>
            {/* Native cursor restored. Follower acts as a "magnetic aura" */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-1 h-1 bg-transparent rounded-full z-[9999] pointer-events-none"
            />
            <div
                ref={followerRef}
                className={cn(
                    "fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full z-[9998] pointer-events-none transition-all duration-75 ease-out flex items-center justify-center mix-blend-difference",
                    isHovering ? "scale-[2.5] bg-white/10 border-white/50 backdrop-blur-[1px]" : "scale-100"
                )}
            />
        </>
    );
}
