'use client';

import { useEffect, useRef } from 'react';

export const GridBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Grid configuration
        const gridSize = 40; // Pixels per square
        const scrollSpeed = 0.5;
        let offset = 0;

        const colors = {
            bg: '#0f0033', // Deep background
            line: 'rgba(143, 105, 255, 0.08)', // Purrpurr Purple very subtle
            dot: 'rgba(112, 150, 0, 0.4)', // Purrpurr Green
        };

        const draw = () => {
            // Clear with slight trail effect for smoothness? No, keep it crisp.
            ctx.fillStyle = colors.bg;
            ctx.fillRect(0, 0, width, height);

            // Move grid
            offset = (offset + scrollSpeed) % gridSize;

            // Draw Vertical Lines
            ctx.beginPath();
            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw Horizontal Lines (Moving)
            ctx.beginPath();
            for (let y = offset; y <= height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.strokeStyle = colors.line;
            ctx.stroke();

            // Add "Data Points" at intersections (randomly flickering)
            // This gives the "Network" feel
            for (let x = 0; x <= width; x += gridSize) {
                for (let y = offset; y <= height; y += gridSize) {
                    // Randomly draw dots to simulate active nodes
                    if (Math.random() > 0.98) {
                        ctx.fillStyle = colors.dot;
                        ctx.fillRect(x - 1, y - 1, 3, 3);
                    }
                }
            }

            // Add a vignette effect to focus center
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width);
            gradient.addColorStop(0, 'rgba(15, 0, 51, 0)');
            gradient.addColorStop(1, '#0f0033'); // Solid fade to edge

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            requestAnimationFrame(draw);
        };

        const animId = requestAnimationFrame(draw);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] w-full h-full pointer-events-none"
        />
    );
};
