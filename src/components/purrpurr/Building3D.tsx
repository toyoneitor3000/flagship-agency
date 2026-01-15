'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Text, ContactShadows, Float, Stars, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, BookOpen, Palette, Layout, Server, Beaker, Globe, Layers,
    Calculator, AlertCircle, XCircle, ExternalLink
} from 'lucide-react';

interface Building3DProps {
    growthLevel: number;
    setGrowthLevel: (level: number) => void;
    selectedFloor: number | null;
    setSelectedFloor: (floor: number | null) => void;
}

// --- FLOOR DATA (Same as ArchitectureBuilding manual) ---
const FLOOR_DATA = [
    {
        level: 0, threshold: 15, name: "Fundación", color: "#10b981", type: 'base', height: 0.6,
        title: "Fundación: Legal (De Cero a Uno)",
        subtitle: "Protocolo SAS Colombia (2025)",
        steps: [
            { id: 'f-1', title: '1. El ADN (Estatutos)', status: 'operational', desc: 'Documento Privado de Constitución.\n• Capital Autorizado: Alto (100M)\n• Capital Suscrito: Bajo (1M)\n• CIIU: 6201, 6202, 7310', cost: 'Gratis' },
            { id: 'f-2', title: '2. Plataforma VUE', status: 'operational', desc: 'vue.gov.co - DIAN + Cámara integrados.', link: 'https://www.vue.gov.co', cost: 'Gratis' },
            { id: 'f-3', title: '3. Ley 1780 (Jóvenes)', status: 'operational', desc: 'Matrícula $0 para menores de 35.', cost: '-$200k' },
            { id: 'f-4', title: '4. Tarifa Final', status: 'warning', desc: 'Impuesto + Formulario + Certificados', cost: '~$50k COP', solution: 'Vender 1 servicio freelance.' },
            { id: 'f-5', title: '5. Banco & NIT', status: 'locked', desc: 'Abrir cuenta Pyme con NIT.', cost: '$0' },
        ]
    },
    {
        level: 1, threshold: 30, name: "Academia", color: "#eab308", type: 'standard', height: 0.8,
        title: "La Academia: Conocimiento",
        subtitle: "El Cerebro Digital",
        steps: [
            { id: 'a-1', title: '1. Diccionario Purrpurr', status: 'operational', desc: '• Purrpurr Cores: Bloques reutilizables.\n• Suites: Espacios de cliente.\n• The Forge: Fábrica de software.', cost: 'Intelectual' },
            { id: 'a-2', title: '2. Wiki (GitHub/Notion)', status: 'pending', desc: 'Crear repositorio purrpurr-academy.', cost: 'Gratis' },
            { id: 'a-3', title: '3. Tutoriales Zero-to-Hero', status: 'locked', desc: 'Videos de 5 min por Core.', cost: 'Tiempo' },
        ]
    },
    { level: 2, threshold: 45, name: "Diseño", color: "#ec4899", type: 'standard', height: 0.8, title: "Diseño: UI/UX", subtitle: "Sistema Visual", steps: [] },
    { level: 3, threshold: 60, name: "Frontend", color: "#0ea5e9", type: 'standard', height: 0.8, title: "Frontend: Cliente", subtitle: "Next.js & React", steps: [] },
    { level: 4, threshold: 75, name: "Backend", color: "#3b82f6", type: 'standard', height: 0.8, title: "Backend: Servidor", subtitle: "API & DB", steps: [] },
    { level: 5, threshold: 85, name: "The Lab", color: "#a855f7", type: 'lab', height: 1.2, title: "Laboratorio", subtitle: "Microservicios", steps: [] },
    { level: 6, threshold: 95, name: "Ecosystem", color: "#6366f1", type: 'ecosystem', height: 0.6, title: "Ecosistema", subtitle: "Clientes", steps: [] },
    { level: 7, threshold: 100, name: "Visión", color: "#ffffff", type: 'top', height: 1.0, title: "Visión Global", subtitle: "Estrategia IA", steps: [] },
];

// --- FLOOR COMPONENT (Clickable) ---
function Floor({ position, args, color, name, type, floorData, isSelected, onClick }: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const isLab = type === 'lab';
    const isTop = type === 'top';
    const isBase = type === 'base';

    // Hover effect
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            const targetScale = isSelected ? 1.08 : hovered ? 1.03 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group position={position}>
            {/* Main Block */}
            <RoundedBox
                ref={meshRef}
                args={args}
                radius={0.05}
                smoothness={4}
                onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick(); }}
                onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            >
                <meshStandardMaterial
                    color={isLab ? "#2e1065" : "#18181b"}
                    metalness={0.8}
                    roughness={0.2}
                />
            </RoundedBox>

            {/* Glowing Edges / Accents */}
            <RoundedBox args={[args[0] + 0.02, args[1] + 0.02, args[2] + 0.02]} radius={0.05} smoothness={4}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isSelected ? 3 : isLab || isTop ? 2 : 0.5}
                    wireframe={true}
                    transparent
                    opacity={isSelected ? 0.4 : 0.1}
                />
            </RoundedBox>

            {/* Window Lights (Front Face) */}
            {!isTop && !isBase && (
                <group position={[0, 0, args[2] / 2 + 0.01]}>
                    <mesh position={[-0.5, 0, 0]}><planeGeometry args={[0.2, 0.4]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
                    <mesh position={[0, 0, 0]}><planeGeometry args={[0.2, 0.4]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
                    <mesh position={[0.5, 0, 0]}><planeGeometry args={[0.2, 0.4]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
                </group>
            )}

            {/* Label */}
            <Text
                position={[args[0] / 2 + 0.6, 0, 0]}
                rotation={[0, 0, 0]}
                fontSize={0.25}
                color={color}
                anchorX="left"
                anchorY="middle"
            >
                {name.toUpperCase()}
            </Text>

            {/* Top Decoration for Vision */}
            {isTop && (
                <group position={[0, args[1] / 2 + 0.5, 0]}>
                    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
                        <mesh>
                            <octahedronGeometry args={[0.4, 0]} />
                            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={4} wireframe />
                        </mesh>
                    </Float>
                    <Sparkles count={20} scale={2} size={2} speed={0.4} opacity={0.5} color="#ffffff" />
                </group>
            )}

            {/* Info Panel (Html Overlay) - Shows when selected */}
            {isSelected && floorData && (
                <Html
                    position={[-args[0] / 2 - 2.5, 0, 0]}
                    distanceFactor={5}
                    transform
                    occlude={false}
                    style={{ pointerEvents: 'auto' }}
                >
                    <div className="w-72 bg-zinc-900/95 backdrop-blur-lg border border-zinc-700 rounded-xl p-4 shadow-2xl text-white pointer-events-auto">
                        <div className="flex items-center justify-between mb-3 border-b border-zinc-700 pb-2">
                            <div>
                                <h3 className="font-bold text-sm" style={{ color }}>{floorData.title}</h3>
                                <p className="text-[10px] text-zinc-400">{floorData.subtitle}</p>
                            </div>
                        </div>

                        {floorData.steps.length > 0 ? (
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                {floorData.steps.map((step: any) => (
                                    <div key={step.id} className="text-xs border-l-2 pl-2" style={{ borderColor: step.status === 'warning' ? '#f97316' : step.status === 'operational' ? '#10b981' : '#71717a' }}>
                                        <p className="font-semibold text-zinc-200">{step.title}</p>
                                        <p className="text-zinc-400 whitespace-pre-line text-[10px] leading-relaxed">{step.desc}</p>
                                        {step.link && <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline text-[10px] flex items-center gap-1 mt-0.5"><ExternalLink className="w-2.5 h-2.5" /> Abrir Portal</a>}
                                        {step.solution && <p className="text-orange-400 text-[10px] mt-1 font-medium">→ {step.solution}</p>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-zinc-500 text-xs text-center py-4">Manual en construcción.</p>
                        )}
                    </div>
                </Html>
            )}
        </group>
    );
}

// --- BUILDING STACK ---
function BuildingStack({ growthLevel, selectedFloor, onFloorClick }: { growthLevel: number; selectedFloor: number | null; onFloorClick: (level: number) => void }) {
    let currentY = 0;
    const visibleFloors = FLOOR_DATA.filter(f => growthLevel >= f.threshold);

    return (
        <group position={[0, -2, 0]}>
            {visibleFloors.map((floor) => {
                const yPos = currentY + floor.height / 2;
                currentY += floor.height + 0.05;

                return (
                    <Floor
                        key={floor.name}
                        position={[0, yPos, 0]}
                        args={[2, floor.height, 2]}
                        color={floor.color}
                        name={floor.name}
                        type={floor.type}
                        floorData={floor}
                        isSelected={selectedFloor === floor.level}
                        onClick={() => onFloorClick(floor.level)}
                    />
                );
            })}
        </group>
    );
}

// --- MAIN COMPONENT ---
export function Building3D({ growthLevel, setGrowthLevel, selectedFloor, setSelectedFloor }: Building3DProps) {

    const handleFloorClick = (level: number) => {
        setSelectedFloor(selectedFloor === level ? null : level);
    };

    const handleCanvasClick = () => {
        // Deselect when clicking empty space
        // This is handled by floor.onClick stopPropagation
    };

    return (
        <div className="fixed inset-0 bg-zinc-950 z-[5]" style={{ backgroundColor: '#09090b' }}>
            <Canvas
                camera={{ position: [8, 6, 8], fov: 45 }}
                onClick={() => setSelectedFloor(null)}
            >
                <color attach="background" args={['#09090b']} />
                <fog attach="fog" args={['#09090b', 10, 30]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, 5, -10]} intensity={0.5} color="#4c1d95" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <group position={[0, -1, 0]}>
                    <BuildingStack
                        growthLevel={growthLevel}
                        selectedFloor={selectedFloor}
                        onFloorClick={handleFloorClick}
                    />
                    <ContactShadows opacity={0.5} scale={20} blur={2} far={4} resolution={256} color="#000000" />
                </group>

                <OrbitControls
                    enableZoom={true}
                    minDistance={4}
                    maxDistance={15}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.2}
                    autoRotate={selectedFloor === null}
                    autoRotateSpeed={0.3}
                />
            </Canvas>

            {/* Overlay Gradient for seamless integration */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />

            {/* HUD: Controls Overlay (Inside 3D View) */}
            <div className="absolute top-6 left-6 z-50">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-5 w-72 shadow-2xl"
                >
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-white">
                            Purrpurr<span className="text-purple-400">HQ</span>
                        </h2>
                        <p className="text-zinc-500 text-xs">Control de Estructura 3D</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-400 uppercase tracking-wider font-medium">Evolución</span>
                            <span className="text-white font-mono font-bold text-lg">{growthLevel}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={growthLevel}
                            onChange={(e) => setGrowthLevel(Number(e.target.value))}
                            className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <p className="text-[10px] text-zinc-500 text-right">
                            {FLOOR_DATA.filter(f => growthLevel >= f.threshold).length} / {FLOOR_DATA.length} Niveles Activos
                        </p>
                    </div>

                    {/* Selected Floor Info Summary */}
                    <AnimatePresence>
                        {selectedFloor !== null && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-zinc-700"
                            >
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Piso Seleccionado</p>
                                <p className="text-white font-semibold text-sm">
                                    L{selectedFloor}: {FLOOR_DATA.find(f => f.level === selectedFloor)?.name}
                                </p>
                                <button
                                    onClick={() => setSelectedFloor(null)}
                                    className="mt-2 w-full text-xs text-zinc-400 hover:text-white border border-zinc-700 rounded-lg py-1.5 transition-colors"
                                >
                                    Deseleccionar
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-zinc-600 text-xs">
                    🖱️ Arrastra para rotar • Scroll para zoom • Click en un piso para ver detalles
                </p>
            </div>
        </div>
    );
}
