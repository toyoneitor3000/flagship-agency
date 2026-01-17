'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame, ThreeEvent, useThree } from '@react-three/fiber';
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

import { BUILDING_LEVELS, MULTIVERSE_PROJECTS, MultiverseProject, BuildingLevel } from '@/data/purrpurr-architecture';

// Sort floors: Underground first (most negative), then surface, then cosmic/transcendent (highest)
const FLOOR_DATA = [...BUILDING_LEVELS].sort((a, b) => a.level - b.level);

// --- FLOOR COMPONENT (Clickable) ---
function Floor({ position, args, color, name, type, floorData, isSelected, onClick }: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const isLab = type === 'lab';
    const isTop = type === 'top';
    const isBase = type === 'base';

    // Hover effect
    const [hovered, setHovered] = useState(false);
    const isUnderground = type === 'underground';
    const isCosmic = type === 'cosmic' || type === 'transcendent';

    // Helper for underground/cosmic opacity
    const materialOpacity = isUnderground ? 0.6 : isCosmic ? 0.6 : 1;
    const materialTransparent = isUnderground || isCosmic;

    useFrame(() => {
        if (meshRef.current) {
            const targetScale = isSelected ? 1.08 : hovered ? 1.03 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group position={position}>
            {/* Main Block - Using standard boxGeometry instead of RoundedBox for stability */}
            <mesh
                ref={meshRef}
                onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick(); }}
                onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            >
                <boxGeometry args={args} />
                <meshStandardMaterial
                    color={isLab ? "#2e1065" : isUnderground ? "#1e1e24" : isCosmic ? "#0a0a1a" : "#18181b"}
                    metalness={isUnderground ? 0.5 : isCosmic ? 0.95 : 0.8}
                    roughness={isUnderground ? 0.6 : isCosmic ? 0.05 : 0.2}
                    transparent={materialTransparent}
                    opacity={materialOpacity}
                />
            </mesh>

            {/* Glowing Edges / Accents */}
            <mesh>
                <boxGeometry args={[args[0] + 0.02, args[1] + 0.02, args[2] + 0.02]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isSelected ? 3 : isLab || isTop ? 2 : 1}
                    wireframe={true}
                    transparent
                    opacity={isSelected ? 0.5 : isUnderground ? 0.3 : 0.15}
                />
            </mesh>

            {/* Window Lights (Front Face) */}
            {!isTop && !isBase && !isUnderground && (
                <group position={[0, 0, args[2] / 2 + 0.01]}>
                    <mesh position={[-0.5, 0, 0]}><planeGeometry args={[0.2, 0.4]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
                    <mesh position={[0, 0, 0]}><planeGeometry args={[0.2, 0.4]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
                    <mesh position={[0.5, 0, 0]}><planeGeometry args={[0.2, 0.4]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} /></mesh>
                </group>
            )}

            {/* 🔬 DEBUG: Label comentado temporalmente
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
            */}

            {/* 🔬 DEBUG: Top Decoration comentado temporalmente
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
            */}

            {/* 🔬 DEBUG: Html Overlay comentado temporalmente
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
            */}
        </group>
    );
}

// --- SIMPLE BUILDING (STABLE VERSION) ---
function SimpleBuilding({ growthLevel }: { growthLevel: number }) {
    const visibleFloors = FLOOR_DATA.filter(f => growthLevel >= f.threshold);
    const surfaceFloors = visibleFloors.filter(f => f.level >= 0 && f.level <= 10).sort((a, b) => a.level - b.level);
    const undergroundFloors = visibleFloors.filter(f => f.level < 0).sort((a, b) => b.level - a.level);
    const cosmicFloors = visibleFloors.filter(f => f.level > 10).sort((a, b) => a.level - b.level);

    // Pre-calculate positions
    const surfaceWithPositions = surfaceFloors.reduce((acc, floor, i) => {
        const prevY = i === 0 ? 0 : acc[i - 1].yEnd;
        const yPos = prevY + floor.height / 2;
        const yEnd = prevY + floor.height + 0.05;
        return [...acc, { ...floor, yPos, yEnd }];
    }, [] as (typeof surfaceFloors[0] & { yPos: number; yEnd: number })[]);

    const surfaceTopY = surfaceWithPositions.length > 0 ? surfaceWithPositions[surfaceWithPositions.length - 1].yEnd : 0;

    const cosmicWithPositions = cosmicFloors.reduce((acc, floor, i) => {
        const startY = surfaceTopY + 1.5;
        const prevY = i === 0 ? startY : acc[i - 1].yEnd;
        const yPos = prevY + floor.height / 2;
        const yEnd = prevY + floor.height + 0.3;
        return [...acc, { ...floor, yPos, yEnd }];
    }, [] as (typeof cosmicFloors[0] & { yPos: number; yEnd: number })[]);

    const undergroundWithPositions = undergroundFloors.reduce((acc, floor, i) => {
        const prevY = i === 0 ? 0 : acc[i - 1].yEnd;
        const yPos = prevY - floor.height / 2 - 0.08;
        const yEnd = prevY - floor.height - 0.08;
        return [...acc, { ...floor, yPos, yEnd }];
    }, [] as (typeof undergroundFloors[0] & { yPos: number; yEnd: number })[]);

    return (
        <group>
            {/* Underground Floors - Special shapes for special levels */}
            {undergroundWithPositions.map((floor) => {
                const isCore = floor.level === -4; // El Núcleo

                if (isCore) {
                    // THE CORE - Rendered as a glowing sphere
                    return (
                        <group key={floor.name} position={[0, floor.yPos, 0]}>
                            {/* Outer glow sphere */}
                            <mesh>
                                <sphereGeometry args={[1.8, 32, 32]} />
                                <meshStandardMaterial
                                    color="#ff4444"
                                    emissive="#ff2222"
                                    emissiveIntensity={0.8}
                                    transparent
                                    opacity={0.3}
                                />
                            </mesh>
                            {/* Inner core sphere */}
                            <mesh>
                                <sphereGeometry args={[1.2, 32, 32]} />
                                <meshStandardMaterial
                                    color={floor.color}
                                    emissive={floor.color}
                                    emissiveIntensity={1.5}
                                    metalness={0.9}
                                    roughness={0.1}
                                />
                            </mesh>
                            {/* Core ring */}
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <torusGeometry args={[1.5, 0.05, 16, 100]} />
                                <meshStandardMaterial
                                    color="#ffaa00"
                                    emissive="#ff6600"
                                    emissiveIntensity={2}
                                />
                            </mesh>
                        </group>
                    );
                }

                // Regular underground floors
                return (
                    <mesh key={floor.name} position={[0, floor.yPos, 0]}>
                        <boxGeometry args={[2.2, floor.height, 2.2]} />
                        <meshStandardMaterial
                            color={floor.color}
                            metalness={0.6}
                            roughness={0.4}
                            transparent
                            opacity={0.7}
                        />
                    </mesh>
                );
            })}

            {/* Surface Tower */}
            {surfaceWithPositions.map((floor) => (
                <mesh key={floor.name} position={[0, floor.yPos, 0]}>
                    <boxGeometry args={[2, floor.height, 2]} />
                    <meshStandardMaterial
                        color={floor.color}
                        metalness={0.7}
                        roughness={0.3}
                    />
                </mesh>
            ))}

            {/* Cosmic Levels */}
            {cosmicWithPositions.map((floor, i) => (
                <mesh key={floor.name} position={[0, floor.yPos, 0]}>
                    <boxGeometry args={[1.5 - (i * 0.02), floor.height, 1.5 - (i * 0.02)]} />
                    <meshStandardMaterial
                        color={floor.color}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.8}
                        emissive={floor.color}
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}
        </group>
    );
}

// --- HELPER: Calculate Y position for a given floor level ---
function getFloorYPosition(level: number): number {
    const surfaceFloors = FLOOR_DATA.filter(f => f.level >= 0 && f.level <= 10).sort((a, b) => a.level - b.level);
    const undergroundFloors = FLOOR_DATA.filter(f => f.level < 0).sort((a, b) => b.level - a.level);
    const cosmicFloors = FLOOR_DATA.filter(f => f.level > 10).sort((a, b) => a.level - b.level);

    // Calculate surface positions
    let surfaceTopY = 0;
    const surfacePositions: Record<number, number> = {};
    let currentY = 0;
    for (const floor of surfaceFloors) {
        const yPos = currentY + floor.height / 2;
        surfacePositions[floor.level] = yPos;
        currentY += floor.height + 0.05;
        surfaceTopY = currentY;
    }

    // Calculate underground positions
    const undergroundPositions: Record<number, number> = {};
    currentY = 0;
    for (const floor of undergroundFloors) {
        currentY -= floor.height + 0.08;
        const yPos = currentY + floor.height / 2;
        undergroundPositions[floor.level] = yPos;
    }

    // Calculate cosmic positions  
    const cosmicPositions: Record<number, number> = {};
    currentY = surfaceTopY + 1.5;
    for (const floor of cosmicFloors) {
        const yPos = currentY + floor.height / 2;
        cosmicPositions[floor.level] = yPos;
        currentY += floor.height + 0.3;
    }

    // Return the position for the requested level
    if (level >= 0 && level <= 10) return surfacePositions[level] ?? 4;
    if (level < 0) return undergroundPositions[level] ?? -2;
    if (level > 10) return cosmicPositions[level] ?? 15;
    return 4;
}

// --- CAMERA CONTROLLER: Moves camera target to selected floor ---
function CameraController({ selectedFloor }: { selectedFloor: number | null }) {
    const controlsRef = useRef<any>(null);

    useFrame(() => {
        if (controlsRef.current) {
            const targetY = selectedFloor !== null ? getFloorYPosition(selectedFloor) : 4;
            const currentTarget = controlsRef.current.target;

            // Smoothly interpolate Y position only
            currentTarget.y += (targetY - currentTarget.y) * 0.05;
            controlsRef.current.update();
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            minDistance={5}
            maxDistance={35}
            autoRotate={selectedFloor === null}
            autoRotateSpeed={0.5}
            target={[0, 4, 0]}
            enableDamping={true}
            dampingFactor={0.05}
        />
    );
}

// --- MULTIVERSE COMPONENT ---
function MultiverseSystem() {
    return (
        <group>
            {MULTIVERSE_PROJECTS.map((project, i) => (
                <ProjectSatellite key={project.id} project={project} index={i} />
            ))}
        </group>
    );
}

function ProjectSatellite({ project, index }: { project: MultiverseProject; index: number }) {
    const meshRef = useRef<THREE.Group>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(({ clock }) => {
        if (orbitRef.current) {
            // Orbit rotation
            orbitRef.current.rotation.y = clock.getElapsedTime() * project.orbitSpeed + (index * 2);
        }
        if (meshRef.current) {
            // Self rotation
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <group ref={orbitRef}>
            <group position={[project.orbitRadius, 0, 0]}>
                <group ref={meshRef}
                    onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
                >
                    {/* Planet Mesh */}
                    <mesh>
                        <sphereGeometry args={[1.5, 32, 32]} />
                        <meshStandardMaterial
                            color={project.color}
                            emissive={project.color}
                            emissiveIntensity={hovered ? 0.5 : 0.1}
                            metalness={0.6}
                            roughness={0.4}
                            wireframe={project.type === 'foundation'}
                        />
                    </mesh>

                    {/* Rings for style */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[2.2, 0.05, 16, 100]} />
                        <meshStandardMaterial color={project.color} transparent opacity={0.3} />
                    </mesh>

                    {/* Label */}
                    <Html distanceFactor={20} position={[0, 2.5, 0]} center style={{ pointerEvents: 'none' }}>
                        <div className={`
                            px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-300
                            ${hovered ? 'bg-zinc-900/90 border-purple-500 scale-110' : 'bg-black/50 border-white/10 opacity-60'}
                        `}>
                            <p className="text-white text-xs font-bold whitespace-nowrap">{project.name}</p>
                            {hovered && (
                                <p className="text-[10px] text-zinc-400 max-w-[150px] mt-1">{project.description}</p>
                            )}
                        </div>
                    </Html>
                </group>

                {/* Orbit Trail (Visual guide) */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[project.orbitRadius - 0.1, project.orbitRadius + 0.1, 64]} />
                    <meshBasicMaterial color="white" transparent opacity={0.03} side={THREE.DoubleSide} />
                </mesh>
            </group>
        </group>
    );
}


// --- MAIN COMPONENT ---
export function Building3D({ growthLevel, setGrowthLevel, selectedFloor, setSelectedFloor }: Building3DProps) {

    const handleFloorClick = (level: number) => {
        setSelectedFloor(selectedFloor === level ? null : level);
    };

    return (
        <div className="fixed inset-0 bg-black z-[5]">
            <Canvas
                camera={{ position: [5, 3, 5], fov: 45 }}
                onClick={() => setSelectedFloor(null)}
                style={{ background: '#050505' }}
            >
                <color attach="background" args={['#050510']} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 15, 10]} intensity={1} />
                <pointLight position={[-10, 5, -10]} intensity={0.5} color="#a855f7" />

                {/* Stars Background */}
                <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />

                {/* The Building */}
                <SimpleBuilding growthLevel={growthLevel} />

                {/* Ground Platform */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                    <circleGeometry args={[8, 64]} />
                    <meshStandardMaterial color="#0a0a15" />
                </mesh>

                <CameraController selectedFloor={selectedFloor} />
            </Canvas>

            {/* Overlay Gradient for seamless integration */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />

            {/* ELEVATOR PANEL - Right Side */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50 max-h-[80vh] overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Elevator Header */}
                    <div className="p-3 border-b border-zinc-700/50 bg-zinc-800/50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-mono text-zinc-400">ELEVATOR</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1">
                            Purrpurr<span className="text-purple-400">HQ</span>
                        </h3>
                    </div>

                    {/* Floor List - Scrollable */}
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {/* Cosmic Levels (Top) */}
                        {FLOOR_DATA.filter(f => f.level > 10).sort((a, b) => b.level - a.level).map((floor) => (
                            <button
                                key={floor.level}
                                onClick={() => setSelectedFloor(floor.level)}
                                disabled={growthLevel < floor.threshold}
                                className={`
                                    w-full px-3 py-2 flex items-center gap-2 border-b border-zinc-800/50 transition-all text-left
                                    ${selectedFloor === floor.level
                                        ? 'bg-purple-500/20 border-l-2 border-l-purple-500'
                                        : 'hover:bg-zinc-800/50 border-l-2 border-l-transparent'}
                                    ${growthLevel < floor.threshold ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                            >
                                <div
                                    className="w-3 h-3 rounded-sm flex-shrink-0"
                                    style={{ backgroundColor: floor.color }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-mono text-zinc-500">L{floor.level}</p>
                                    <p className="text-xs text-zinc-300 truncate">{floor.name}</p>
                                </div>
                                {floor.type === 'transcendent' && (
                                    <span className="text-[8px] text-purple-400">✦</span>
                                )}
                            </button>
                        ))}

                        {/* Divider */}
                        <div className="px-3 py-1 bg-zinc-800/30">
                            <span className="text-[9px] text-zinc-600 uppercase tracking-wider">━━ Cosmic ↑ | Surface ↓ ━━</span>
                        </div>

                        {/* Surface Levels */}
                        {FLOOR_DATA.filter(f => f.level >= 0 && f.level <= 10).sort((a, b) => b.level - a.level).map((floor) => (
                            <button
                                key={floor.level}
                                onClick={() => setSelectedFloor(floor.level)}
                                disabled={growthLevel < floor.threshold}
                                className={`
                                    w-full px-3 py-2 flex items-center gap-2 border-b border-zinc-800/50 transition-all text-left
                                    ${selectedFloor === floor.level
                                        ? 'bg-purple-500/20 border-l-2 border-l-purple-500'
                                        : 'hover:bg-zinc-800/50 border-l-2 border-l-transparent'}
                                    ${growthLevel < floor.threshold ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                                    ${floor.type === 'lab' ? 'bg-purple-900/10' : ''}
                                `}
                            >
                                <div
                                    className="w-3 h-3 rounded-sm flex-shrink-0"
                                    style={{ backgroundColor: floor.color }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-mono text-zinc-500">L{floor.level}</p>
                                    <p className="text-xs text-zinc-300 truncate">{floor.name}</p>
                                </div>
                                {floor.type === 'lab' && (
                                    <span className="text-[8px] text-purple-400">⚗️</span>
                                )}
                            </button>
                        ))}

                        {/* Divider */}
                        <div className="px-3 py-1 bg-zinc-800/30">
                            <span className="text-[9px] text-zinc-600 uppercase tracking-wider">━━ Ground | Underground ↓ ━━</span>
                        </div>

                        {/* Underground Levels */}
                        {FLOOR_DATA.filter(f => f.level < 0).sort((a, b) => b.level - a.level).map((floor) => (
                            <button
                                key={floor.level}
                                onClick={() => setSelectedFloor(floor.level)}
                                disabled={growthLevel < floor.threshold}
                                className={`
                                    w-full px-3 py-2 flex items-center gap-2 border-b border-zinc-800/50 transition-all text-left
                                    ${selectedFloor === floor.level
                                        ? 'bg-orange-500/20 border-l-2 border-l-orange-500'
                                        : 'hover:bg-zinc-800/50 border-l-2 border-l-transparent'}
                                    ${growthLevel < floor.threshold ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                            >
                                <div
                                    className="w-3 h-3 rounded-sm flex-shrink-0"
                                    style={{ backgroundColor: floor.color }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-mono text-orange-400">L{floor.level}</p>
                                    <p className="text-xs text-zinc-300 truncate">{floor.name}</p>
                                </div>
                                <span className="text-[8px] text-orange-400">⚠</span>
                            </button>
                        ))}
                    </div>

                    {/* Elevator Footer - Stats */}
                    <div className="p-3 border-t border-zinc-700/50 bg-zinc-800/50">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-500">Niveles Activos</span>
                            <span className="font-mono text-purple-400">
                                {FLOOR_DATA.filter(f => growthLevel >= f.threshold).length}/{FLOOR_DATA.length}
                            </span>
                        </div>
                        <div className="mt-2">
                            <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                                    style={{ width: `${growthLevel}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Selected Floor Info Panel - Bottom Left */}
            <AnimatePresence>
                {selectedFloor !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-20 left-6 z-50"
                    >
                        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-4 w-80 shadow-2xl">
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: FLOOR_DATA.find(f => f.level === selectedFloor)?.color + '30' }}
                                >
                                    <span className="text-lg">{selectedFloor >= 11 ? '✦' : selectedFloor < 0 ? '⚠' : '🏢'}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-zinc-500">LEVEL {selectedFloor}</p>
                                    <h4 className="text-white font-bold">
                                        {FLOOR_DATA.find(f => f.level === selectedFloor)?.name}
                                    </h4>
                                </div>
                                <button
                                    onClick={() => setSelectedFloor(null)}
                                    className="ml-auto text-zinc-500 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-xs text-zinc-400">
                                {FLOOR_DATA.find(f => f.level === selectedFloor)?.description || FLOOR_DATA.find(f => f.level === selectedFloor)?.subtitle}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instructions */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-zinc-600 text-xs">
                    🖱️ Arrastra para rotar • Scroll para zoom • Usa el ascensor para navegar
                </p>
            </div>
        </div>
    );
}
