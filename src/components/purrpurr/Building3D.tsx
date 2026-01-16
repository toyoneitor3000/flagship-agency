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

import { BUILDING_LEVELS, MULTIVERSE_PROJECTS, MulitverseProject } from '@/data/purrpurr-architecture';

const FLOOR_DATA = BUILDING_LEVELS;

// --- FLOOR COMPONENT (Clickable) ---
function Floor({ position, args, color, name, type, floorData, isSelected, onClick }: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const isLab = type === 'lab';
    const isTop = type === 'top';
    const isBase = type === 'base';

    // Hover effect
    const [hovered, setHovered] = useState(false);
    const isUnderground = type === 'underground';

    // Helper for underground opacity
    const materialOpacity = isUnderground ? 0.3 : 1;
    const materialTransparent = isUnderground;

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
                    color={isLab ? "#2e1065" : isUnderground ? "#0f0f10" : "#18181b"}
                    metalness={isUnderground ? 0.9 : 0.8}
                    roughness={isUnderground ? 0.1 : 0.2}
                    transparent={materialTransparent}
                    opacity={materialOpacity}
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
            {!isTop && !isBase && !isUnderground && (
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

function ProjectSatellite({ project, index }: { project: MulitverseProject; index: number }) {
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
        <div className="fixed inset-0 bg-zinc-950 z-[5]" style={{ backgroundColor: '#050505' }}>
            <Canvas
                camera={{ position: [25, 20, 25], fov: 35 }}
                onClick={() => setSelectedFloor(null)}
            >
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 30, 90]} />

                <ambientLight intensity={0.4} />
                <pointLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-20, -10, -20]} intensity={1} color="#4c1d95" />

                {/* Universe Stars */}
                <Stars radius={200} depth={100} count={8000} factor={6} saturation={0} fade speed={0.5} />
                <Sparkles count={500} scale={40} size={4} speed={0.4} opacity={0.4} color="#a855f7" />

                {/* The Multiverse Orbiting System */}
                <MultiverseSystem />

                <group position={[0, -4, 0]}>
                    <BuildingStack
                        growthLevel={growthLevel}
                        selectedFloor={selectedFloor}
                        onFloorClick={handleFloorClick}
                    />
                    {/* Ground Plane at Level 0 */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.4, 0]}>
                        <circleGeometry args={[12, 64]} />
                        <meshStandardMaterial color="#000" transparent opacity={0.8} />
                    </mesh>

                    {/* Connective Grid */}
                    <gridHelper args={[60, 60, 0x333333, 0x111111]} position={[0, 0.5, 0]} />

                    <ContactShadows opacity={0.6} scale={40} blur={2.5} far={10} resolution={512} color="#000000" />
                </group>

                <OrbitControls
                    enableZoom={true}
                    minDistance={10}
                    maxDistance={60}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.8}
                    autoRotate={selectedFloor === null}
                    autoRotateSpeed={0.5}
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
