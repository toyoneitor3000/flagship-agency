'use client';

import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Loader2, RotateCcw, Sparkles } from 'lucide-react';

interface ModelViewer3DProps {
    modelUrl?: string;
    productName?: string;
    accentColor?: string;
    showFloat?: boolean;
    autoRotate?: boolean;
}

// Procedural 3D Prototype for "Gomunator" or generic product if GLB is loading/not provided
function ProceduralGomunator({ color = '#8b5cf6' }: { color: string }) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.4;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Main Ergonomic Body / Roller */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.9, 0.9, 2.2, 32]} />
                <meshStandardMaterial 
                    color={color} 
                    roughness={0.25} 
                    metalness={0.65} 
                    envMapIntensity={1.2}
                />
            </mesh>

            {/* Silicone Cleaning Ribs / Textured Grooves */}
            {[-0.6, -0.2, 0.2, 0.6].map((y, idx) => (
                <mesh key={idx} position={[0, y, 0]}>
                    <torusGeometry args={[0.94, 0.04, 16, 64]} />
                    <meshStandardMaterial color="#ec4899" roughness={0.4} metalness={0.2} />
                </mesh>
            ))}

            {/* Ergonomic Handle Core */}
            <mesh position={[0, -1.6, 0]} castShadow>
                <cylinderGeometry args={[0.3, 0.35, 1.4, 24]} />
                <meshStandardMaterial color="#18181b" roughness={0.7} metalness={0.1} />
            </mesh>

            {/* Handle Grip Collar */}
            <mesh position={[0, -1.0, 0]}>
                <cylinderGeometry args={[0.38, 0.38, 0.25, 24]} />
                <meshStandardMaterial color="#f43f5e" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Brand Logo Plate */}
            <mesh position={[0, 0, 0.92]}>
                <boxGeometry args={[0.5, 0.3, 0.05]} />
                <meshStandardMaterial color="#ffffff" emissive="#52388d" emissiveIntensity={0.2} />
            </mesh>
        </group>
    );
}

// Model loader when external GLTF/GLB is provided
function ExternalModel({ url }: { url: string }) {
    const gltf = useGLTF(url);
    return <primitive object={gltf.scene} scale={1.5} />;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({
    modelUrl,
    productName = 'El Gomunator 3D',
    accentColor = '#8b5cf6',
    showFloat = true,
    autoRotate = true,
}) => {
    const [selectedColor, setSelectedColor] = useState(accentColor);
    const [isRotating, setIsRotating] = useState(autoRotate);

    const colors = [
        { label: 'Híbrido Purple', hex: '#52388d' },
        { label: 'Toxic Violet', hex: '#8b5cf6' },
        { label: 'Cyber Magenta', hex: '#ec4899' },
        { label: 'Volcanic Orange', hex: '#f97316' },
        { label: 'Deep Black', hex: '#18181b' },
    ];

    return (
        <div className="relative w-full h-[420px] md:h-[520px] rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black/95 border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between">
            {/* Top Toolbar */}
            <div className="relative z-10 p-4 flex items-center justify-between border-b border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs uppercase text-zinc-300 font-bold tracking-wider">
                        {productName}
                    </span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono">
                        WebGL 360°
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsRotating(!isRotating)}
                        className={`p-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1 ${
                            isRotating 
                                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' 
                                : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}
                        title="Toggle Auto-Rotation"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[10px]">{isRotating ? 'Giro ON' : 'Giro OFF'}</span>
                    </button>
                </div>
            </div>

            {/* Canvas 3D Area */}
            <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing">
                <Canvas
                    camera={{ position: [0, 0, 4.5], fov: 45 }}
                    shadows
                    gl={{ antialias: true, alpha: true }}
                >
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
                    <pointLight position={[-5, -2, -3]} color="#ec4899" intensity={2} />
                    <pointLight position={[5, -2, -3]} color="#06b6d4" intensity={1.5} />

                    <Suspense fallback={null}>
                        {showFloat ? (
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
                                {modelUrl ? (
                                    <ExternalModel url={modelUrl} />
                                ) : (
                                    <ProceduralGomunator color={selectedColor} />
                                )}
                            </Float>
                        ) : (
                            modelUrl ? (
                                <ExternalModel url={modelUrl} />
                            ) : (
                                <ProceduralGomunator color={selectedColor} />
                            )
                        )}
                        <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={6} blur={1.5} far={4} />
                    </Suspense>

                    <OrbitControls
                        enableZoom={true}
                        autoRotate={isRotating}
                        autoRotateSpeed={1.5}
                        minDistance={2.5}
                        maxDistance={8}
                    />
                </Canvas>
            </div>

            {/* Bottom Controls / Material Color Picker */}
            <div className="relative z-10 p-4 border-t border-white/5 bg-zinc-950/80 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[11px] font-mono text-zinc-400">Variante de Acabado:</span>
                </div>

                <div className="flex items-center gap-2">
                    {colors.map((c) => (
                        <button
                            key={c.hex}
                            onClick={() => setSelectedColor(c.hex)}
                            className={`w-6 h-6 rounded-full border transition-all ${
                                selectedColor === c.hex 
                                    ? 'border-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.6)]' 
                                    : 'border-white/20 opacity-70 hover:opacity-100 hover:scale-110'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.label}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
