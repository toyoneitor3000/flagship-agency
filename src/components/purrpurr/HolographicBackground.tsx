'use client';

import { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
    z: number;
}

interface Connection {
    p1: number; // index of point 1
    p2: number; // index of point 2
    id: string; // unique id for signal tracking
}

interface ProjectedVertex {
    x: number;
    y: number;
    z: number; // scale/depth
    cubeIndex: number;
    vertexIndex: number;
}

interface Signal {
    edgeId: string; // which connection or edge it's traveling on
    progress: number; // 0 to 1
    speed: number;
    p1: ProjectedVertex | { x: number, y: number }; // Start projected point
    p2: ProjectedVertex | { x: number, y: number }; // End projected point
}

interface WireframeCube {
    x: number;
    y: number;
    z: number;
    size: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    speedX: number;
    speedY: number;
    speedZ: number;
    vertices: Point[];
    edges: Connection[];
}

export const HolographicBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // --- Configuration ---
        const colors = {
            bg: '#0f0033',
            line: 'rgba(112, 180, 0, 0.4)', // Much brighter visible structure
            activeLine: 'rgba(140, 255, 50, 0.6)', // Very visible connections
            node: 'rgba(160, 255, 0, 1)', // Solid bright nodes
            signal: '#ffffff',
            signalTail: 'rgba(0, 255, 150, 0)',
        };

        // Create Cubes - FORCED DENSITY
        const cubes: WireframeCube[] = [];
        const numCubes = Math.max(40, Math.floor(width / 40)); // Force at least 40 cubes

        for (let i = 0; i < numCubes; i++) {
            cubes.push(createCube(width, height));
        }

        // Signals System
        let signals: Signal[] = [];

        // Auto-spawn signals - FASTER & MORE FREQUENT
        setInterval(() => {
            // High density signals for "busy network" feel
            if (signals.length < 100) {
                // Logic handled in render loop
            }
        }, 50);

        // --- Animation Loop ---
        let frameId: number;

        const render = () => {
            ctx.fillStyle = colors.bg;
            ctx.fillRect(0, 0, width, height);

            const perspective = 1000; // Deeper perspective
            const centerX = width / 2;
            const centerY = height / 2;

            let allProjectedVertices: ProjectedVertex[] = [];

            // 1. Process and Draw Cubes
            cubes.forEach((cube, cubeIdx) => {
                cube.rotationX += cube.speedX;
                cube.rotationY += cube.speedY;
                cube.rotationZ += cube.speedZ;

                const floatTime = Date.now() * 0.001;
                const floatY = Math.sin(floatTime + cube.x * 0.5) * 30; // More float

                // Project Vertices
                const projectedPoints: ProjectedVertex[] = cube.vertices.map((v, vIdx) => {
                    let px = v.x * cube.size;
                    let py = v.y * cube.size;
                    let pz = v.z * cube.size;

                    // Rotations
                    let tempY = py * Math.cos(cube.rotationX) - pz * Math.sin(cube.rotationX);
                    let tempZ = py * Math.sin(cube.rotationX) + pz * Math.cos(cube.rotationX);
                    py = tempY; pz = tempZ;

                    let tempX = px * Math.cos(cube.rotationY) + pz * Math.sin(cube.rotationY);
                    tempZ = -px * Math.sin(cube.rotationY) + pz * Math.cos(cube.rotationY);
                    px = tempX; pz = tempZ;

                    tempX = px * Math.cos(cube.rotationZ) - py * Math.sin(cube.rotationZ);
                    tempY = px * Math.sin(cube.rotationZ) + py * Math.cos(cube.rotationZ);
                    px = tempX; py = tempY;

                    const worldX = px + cube.x;
                    const worldY = py + cube.y + floatY;
                    const worldZ = pz + cube.z;

                    // Push back deep into screen
                    const scale = perspective / (perspective + worldZ + 800);
                    const screenX = centerX + worldX * scale;
                    const screenY = centerY + worldY * scale;

                    return { x: screenX, y: screenY, z: scale, cubeIndex: cubeIdx, vertexIndex: vIdx };
                });

                allProjectedVertices = [...allProjectedVertices, ...projectedPoints];

                // Draw Cube Structure
                ctx.strokeStyle = colors.line;
                ctx.lineWidth = 1;

                ctx.beginPath();
                cube.edges.forEach(edge => {
                    const p1 = projectedPoints[edge.p1];
                    const p2 = projectedPoints[edge.p2];

                    // Don't draw if too far away/small to save visual clutter
                    if (p1.z > 0.1) {
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                    }

                    // Spawn Signal on Edge
                    if (Math.random() > 0.99 && signals.length < 100) {
                        signals.push({
                            edgeId: `edge-${cubeIdx}-${edge.id}-${Math.random()}`,
                            progress: 0,
                            speed: 0.04 + Math.random() * 0.04,
                            p1: p1,
                            p2: p2
                        });
                    }
                });
                ctx.stroke();

                // Draw Vertices (Nodes)
                ctx.fillStyle = colors.node;
                projectedPoints.forEach(p => {
                    // Only draw nearer nodes to avoid sparkly noise in background
                    if (p.z > 0.2) {
                        const size = Math.max(0.5, 2 * p.z);
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            });

            // 2. Neural Networking (Interconnectivity)
            ctx.strokeStyle = colors.activeLine;
            ctx.lineWidth = 0.8;

            // Increased range for more connections
            const maxDistance = 200;

            // Limit checks for performance with high cube count
            // Only check a subset or optimize spatial partitioning if needed.
            // For now, simpler optimization: only connect nodes that are relatively close in Z-depth
            for (let i = 0; i < allProjectedVertices.length; i += 2) { // Skip every other node for perf/style
                const p1 = allProjectedVertices[i];
                if (p1.z < 0.2) continue; // Skip far nodes

                for (let j = i + 1; j < allProjectedVertices.length; j += 4) { // Sparsely connect to others
                    const p2 = allProjectedVertices[j];
                    if (p1.cubeIndex === p2.cubeIndex) continue; // Skip self
                    if (Math.abs(p1.z - p2.z) > 0.1) continue; // Skip profound depth diffs

                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistance * maxDistance) {
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - (dist / maxDistance)) * p1.z; // Fade by distance & depth

                        ctx.strokeStyle = `rgba(112, 150, 0, ${opacity * 0.4})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();

                        // Neural Signal (Fast transfer)
                        if (Math.random() > 0.995) {
                            signals.push({
                                edgeId: `neuron-${i}-${j}-${Math.random()}`,
                                progress: 0,
                                speed: 0.06 + Math.random() * 0.05,
                                p1: p1,
                                p2: p2
                            });
                        }
                    }
                }
            }

            // 3. Render Light Beams (Signals)
            // Use additive blending for "Light" effect
            ctx.globalCompositeOperation = 'screen';
            ctx.lineWidth = 2;

            signals = signals.filter(sig => {
                sig.progress += sig.speed;
                if (sig.progress >= 1) return false;

                const startX = sig.p1.x + (sig.p2.x - sig.p1.x) * sig.progress;
                const startY = sig.p1.y + (sig.p2.y - sig.p1.y) * sig.progress;

                // Trail length - LONG FLOW
                const tailLen = 0.6;
                const tailProgress = Math.max(0, sig.progress - tailLen);

                const endX = sig.p1.x + (sig.p2.x - sig.p1.x) * tailProgress;
                const endY = sig.p1.y + (sig.p2.y - sig.p1.y) * tailProgress;

                // Gradient Beam - BRIGHTER
                const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Head: White Hot
                gradient.addColorStop(0.2, 'rgba(200, 255, 150, 0.9)'); // Body: Very Bright Green
                gradient.addColorStop(1, 'rgba(160, 255, 100, 0)'); // Tail: Transparent

                ctx.strokeStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();

                return true;
            });

            ctx.globalCompositeOperation = 'source-over'; // Reset blending
            frameId = requestAnimationFrame(render);
        };

        render(); // Start loop

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-50 w-full h-full bg-[#0f0033]"
            style={{ opacity: 1 }}
        />
    );
};

function createCube(width: number, height: number): WireframeCube {
    const vertices: Point[] = [
        { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 }, { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
        { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 },
    ];

    const edges: Connection[] = [
        { p1: 0, p2: 1, id: 'e1' }, { p1: 1, p2: 2, id: 'e2' }, { p1: 2, p2: 3, id: 'e3' }, { p1: 3, p2: 0, id: 'e4' },
        { p1: 4, p2: 5, id: 'e5' }, { p1: 5, p2: 6, id: 'e6' }, { p1: 6, p2: 7, id: 'e7' }, { p1: 7, p2: 4, id: 'e8' },
        { p1: 0, p2: 4, id: 'e9' }, { p1: 1, p2: 5, id: 'e10' }, { p1: 2, p2: 6, id: 'e11' }, { p1: 3, p2: 7, id: 'e12' }
    ];

    const rangeX = width * 0.45;
    const rangeY = height * 0.45;

    return {
        x: (Math.random() - 0.5) * rangeX * 2,
        y: (Math.random() - 0.5) * rangeY * 2,
        z: (Math.random() - 0.5) * 600,
        size: 40 + Math.random() * 60,
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        speedX: (Math.random() - 0.5) * 0.003,
        speedY: (Math.random() - 0.5) * 0.003,
        speedZ: (Math.random() - 0.5) * 0.001,
        vertices,
        edges
    };
}
