'use client';

import { useState, useRef, useMemo, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Float, useTexture, Environment, Sparkles, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe, Eye, ExternalLink, ArrowLeft, Building2, Rocket,
    Zap, Server, Users, Palette, Code, LucideIcon,
    Home, Play, Pause, X, ChevronDown, Plus, Loader2
} from 'lucide-react';
import { createMultiversePlanet, getMultiverseRegistry } from '@/app/actions/create-multiverse-planet';
import { MULTIVERSE_PROJECTS, MultiverseProject, BUILDING_LEVELS } from '@/data/purrpurr-architecture';

// Extended project data with deployment info
interface MultiverseWorld extends MultiverseProject {
    productionUrl?: string;
    localUrl?: string;
    framework?: string;
    status: 'production' | 'development' | 'building' | 'offline' | 'archived';
    buildingLevels?: number;
    isSelf?: boolean; // True if this is the current project (Flagship Agency)
}

const MULTIVERSE_WORLDS: MultiverseWorld[] = [
    {
        ...MULTIVERSE_PROJECTS.find(p => p.id === 'p-1')!,
        name: 'Purrpurr', // Renombrado de Flagship Agency a Purrpurr
        productionUrl: 'https://flagshipagency.co',
        localUrl: 'http://localhost:3002', // Este ES el proyecto actual
        framework: 'Next.js 15',
        status: 'production',
        buildingLevels: 31,
        isSelf: true, // Marcador de que este es el proyecto actual
    },
    {
        ...MULTIVERSE_PROJECTS.find(p => p.id === 'p-2')!,
        productionUrl: 'https://pigmentostkts.com',
        localUrl: 'http://localhost:3001',
        framework: 'Next.js 15',
        status: 'production',
        buildingLevels: 8,
    },
    {
        ...MULTIVERSE_PROJECTS.find(p => p.id === 'p-3')!,
        productionUrl: 'https://victorycarsdetailing.com',
        localUrl: 'http://localhost:3003',
        framework: 'Next.js 15',
        status: 'development',
        buildingLevels: 6,
    },
    {
        ...MULTIVERSE_PROJECTS.find(p => p.id === 'p-4')!,
        productionUrl: 'https://speedlightculture.com',
        localUrl: 'http://localhost:3004',
        framework: 'Next.js 15',
        status: 'building',
        buildingLevels: 4,
    },
    {
        ...MULTIVERSE_PROJECTS.find(p => p.id === 'p-5')!,
        productionUrl: 'https://financars.co',
        localUrl: 'http://localhost:3005',
        framework: 'Next.js 15',
        status: 'offline',
        buildingLevels: 3,
    },
    {
        ...MULTIVERSE_PROJECTS.find(p => p.id === 'p-6')!,
        status: 'offline',
        buildingLevels: 2,
    },
];

// =============================================================================
// 3D COMPONENTS
// =============================================================================

// Central Star/Sun
function CentralStar() {
    const meshRef = useRef<THREE.Mesh>(null);
    const router = useRouter();
    const [hovered, setHovered] = useState(false);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
            meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
        }
    });

    return (
        <group
            onClick={(e) => { e.stopPropagation(); router.push('/purrpurr'); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        >
            {/* Core Structure - Massive & Wireframe */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[4.5, 2]} />
                    <meshStandardMaterial
                        color="#a855f7"
                        emissive="#a855f7"
                        emissiveIntensity={hovered ? 3 : 2}
                        wireframe
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            </Float>

            {/* Inner Energy Core */}
            <mesh>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>

            {/* Outer Glow Field */}
            <mesh scale={hovered ? 1.2 : 1}>
                <sphereGeometry args={[6, 32, 32]} />
                <meshStandardMaterial
                    color="#a855f7"
                    emissive="#9333ea"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={hovered ? 0.3 : 0.15}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Label */}
            <Html position={[0, 9, 0]} center style={{ pointerEvents: 'none' }}>
                <div className={`text-center transition-all duration-300 ${hovered ? 'scale-110' : 'scale-100'}`}>
                    <div className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_25px_rgba(168,85,247,1)]">
                        PURRPURR
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <span className="text-base bg-purple-600 text-white px-4 py-1 rounded-full font-black uppercase tracking-widest shadow-xl shadow-purple-600/40 border border-purple-400">
                            NÚCLEO
                        </span>
                        <span className="text-xl text-purple-200 font-mono font-bold">∞ MASA</span>
                    </div>
                    {hovered && (
                        <div className="mt-4 text-base text-white font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md border border-white/20 animate-pulse">
                            CLICK PARA ENTRAR
                        </div>
                    )}
                </div>
            </Html>

            <Sparkles count={150} scale={12} size={3} speed={0.4} color="#d8b4fe" />
        </group>
    );
}

// Individual Planet/World
function Planet({
    world,
    onSelect,
    isSelected,
    cameraDistance
}: {
    world: MultiverseWorld;
    onSelect: () => void;
    isSelected: boolean;
    cameraDistance: number;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const planetRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // GRAVITY PHYSICS SYSTEM
    // Mass is proportional to code volume (building levels)
    const mass = Math.max(1, world.buildingLevels || 1);

    // Heavier objects have more inertia -> Slower, more majestic movement
    // Lighter objects are agile -> Faster orbits
    const inertiaFactor = Math.sqrt(mass);
    const dynamicOrbitSpeed = (0.2 / inertiaFactor) * (world.orbitSpeed * 10); // Normalizing speed
    const dynamicRotationSpeed = 0.02 / inertiaFactor;

    // Visual Size
    const baseSize = 1.2;
    const sizeMultiplier = 0.12;
    const planetSize = baseSize + (mass * sizeMultiplier);

    // Status colors
    const statusColors: Record<string, string> = {
        production: '#10b981',
        development: '#f59e0b',
        building: '#3b82f6',
        offline: '#6b7280',
        archived: '#71717a',
    };

    useFrame(({ clock }) => {
        if (orbitRef.current && !isSelected) {
            // Apply gravitational flow equation
            const time = clock.getElapsedTime();
            const angle = time * dynamicOrbitSpeed;

            const x = Math.cos(angle) * world.orbitRadius;
            const z = Math.sin(angle) * world.orbitRadius;

            orbitRef.current.position.set(x, 0, z);
        }

        if (planetRef.current) {
            // Axial rotation defined by mass
            planetRef.current.rotation.y += dynamicRotationSpeed;
        }
    });

    return (
        <>
            {/* Gravity Well / Orbit Path */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[world.orbitRadius - 0.1, world.orbitRadius + 0.1, 128]} />
                <meshBasicMaterial
                    color={world.color}
                    transparent
                    opacity={hovered ? 0.3 : 0.05} // Faint orbit lines
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Planet System */}
            <group ref={orbitRef}>
                <group
                    ref={groupRef}
                    onClick={(e) => { e.stopPropagation(); onSelect(); }}
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
                >
                    {/* Floating Animation - damped by mass (Heavy things float less) */}
                    <Float
                        speed={2 / inertiaFactor}
                        rotationIntensity={0.1 / inertiaFactor}
                        floatIntensity={0.5 / inertiaFactor}
                    >
                        {/* Planet Body */}
                        <mesh ref={planetRef}>
                            <sphereGeometry args={[planetSize, 64, 64]} />
                            <meshStandardMaterial
                                color={world.color}
                                emissive={world.color}
                                emissiveIntensity={hovered ? 0.6 : 0.1}
                                metalness={0.6}
                                roughness={0.4}
                            />
                        </mesh>

                        {/* Atmosphere Glow */}
                        <mesh scale={1.2}>
                            <sphereGeometry args={[planetSize, 32, 32]} />
                            <meshStandardMaterial
                                color={world.color}
                                transparent
                                opacity={hovered ? 0.2 : 0.05}
                                side={THREE.BackSide}
                                blending={THREE.AdditiveBlending}
                            />
                        </mesh>

                        {/* Planetary Ring (Accretion Disk) */}
                        <mesh rotation={[Math.PI / 3, 0, 0]}>
                            <torusGeometry args={[planetSize * 1.5, 0.05, 16, 100]} />
                            <meshStandardMaterial
                                color={world.color}
                                emissive={world.color}
                                emissiveIntensity={0.5}
                                transparent
                                opacity={0.4}
                            />
                        </mesh>

                        {/* Status Satellite */}
                        <mesh position={[planetSize * 0.9, planetSize * 0.9, planetSize * 0.4]}>
                            <sphereGeometry args={[planetSize * 0.12, 16, 16]} />
                            <meshStandardMaterial
                                color={statusColors[world.status]}
                                emissive={statusColors[world.status]}
                                emissiveIntensity={1.5}
                            />
                        </mesh>
                    </Float>

                    {/* UI Label */}
                    <Html
                        position={[0, planetSize + 1.5, 0]}
                        center
                        distanceFactor={8}
                        style={{ pointerEvents: hovered ? 'auto' : 'none' }}
                    >
                        <div className={`
                            text-center transition-all duration-500
                            ${hovered ? 'scale-110 opacity-100' : 'scale-75 opacity-60'}
                        `}>
                            {/* Connector Line - Taller and stronger */}
                            <div className="h-16 w-[1px] bg-gradient-to-t from-transparent via-white/80 to-transparent mb-3 opacity-80" />

                            {/* Main Card - Big & Industrial */}
                            <div
                                className="px-8 py-6 rounded-xl border-2 backdrop-blur-2xl transition-all duration-300"
                                style={{
                                    backgroundColor: 'rgba(10, 10, 12, 0.9)',
                                    borderColor: world.color,
                                    boxShadow: `0 0 50px ${world.color}40`,
                                    minWidth: '260px'
                                }}
                            >
                                <h3 className="text-white font-black text-5xl whitespace-nowrap tracking-tighter mb-3 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                                    {world.name}
                                </h3>

                                <div className="flex items-center justify-center gap-4 border-t border-white/10 pt-3">
                                    <div className="px-3 py-1 rounded-md bg-white/5 text-xs font-bold uppercase text-white/60 tracking-wider">
                                        {world.status}
                                    </div>
                                    <div className="font-mono font-black text-2xl text-white flex items-baseline gap-2">
                                        <span className="text-white/40 text-[10px] font-sans tracking-widest uppercase">MASA</span>
                                        {(mass * 1250).toLocaleString()} <span className="text-xs font-normal text-white/40">GT</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button - Large */}
                            {hovered && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    onClick={(e) => { e.stopPropagation(); onSelect(); }}
                                    className="
                                        mt-6 px-10 py-4 rounded-full text-lg font-black uppercase tracking-[0.25em]
                                        bg-white text-black hover:bg-purple-400 hover:text-white hover:scale-105 active:scale-95
                                        flex items-center gap-3 transition-all duration-200
                                        shadow-[0_0_40px_rgba(255,255,255,0.2)]
                                    "
                                >
                                    <Rocket className="w-6 h-6" />
                                    EXPLORAR
                                </motion.button>
                            )}
                        </div>
                    </Html>
                </group>
            </group>
        </>
    );
}

// Camera Controller with zoom tracking
function CameraController({
    onDistanceChange,
    selectedPlanet,
    viewMode,
    onResetView
}: {
    onDistanceChange: (distance: number) => void;
    selectedPlanet: MultiverseWorld | null;
    viewMode: 'universe' | 'warping' | 'orbiting' | 'planet';
    onResetView: () => void;
}) {
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);

    useFrame(() => {
        if (controlsRef.current) {
            const distance = camera.position.length();
            onDistanceChange(distance);
        }
    });

    // Calculate dynamic constraints based on mode
    const minD = viewMode === 'planet' ? 2 : viewMode === 'orbiting' ? 5 : 10;
    const maxD = viewMode === 'planet' ? 20 : viewMode === 'orbiting' ? 30 : 150;

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            minDistance={minD}
            maxDistance={maxD}
            autoRotate={viewMode === 'universe' || viewMode === 'orbiting'} // Auto rotate in orbit mode too
            autoRotateSpeed={viewMode === 'orbiting' ? 0.5 : 0.2} // Faster rotation when close
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI * 0.8}
            minPolarAngle={Math.PI * 0.2}
        />
    );
}

// Mini Building for planet view
function MiniBuilding({ world }: { world: MultiverseWorld }) {
    const levels = world.buildingLevels || 5;

    return (
        <group position={[0, -2, 0]}>
            {/* Base Platform */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <circleGeometry args={[3, 64]} />
                <meshStandardMaterial color="#0a0a15" />
            </mesh>

            {/* Building Stack */}
            {Array.from({ length: Math.min(levels, 10) }).map((_, i) => (
                <mesh key={i} position={[0, i * 0.5 + 0.25, 0]}>
                    <boxGeometry args={[1.5 - i * 0.05, 0.45, 1.5 - i * 0.05]} />
                    <meshStandardMaterial
                        color={world.color}
                        metalness={0.7}
                        roughness={0.3}
                        emissive={world.color}
                        emissiveIntensity={i === levels - 1 ? 1 : 0.1}
                    />
                </mesh>
            ))}

            {/* Top Glow */}
            <pointLight position={[0, levels * 0.5, 0]} color={world.color} intensity={2} distance={5} />
        </group>
    );
}

// =============================================================================
// PLANET DETAIL VIEW COMPONENT
// =============================================================================

function PlanetDetailView({
    world,
    onClose
}: {
    world: MultiverseWorld;
    onClose: () => void;
}) {
    const [activeTab, setActiveTab] = useState<'preview' | 'building' | 'info'>('preview');
    const [previewSource, setPreviewSource] = useState<'production' | 'local'>('production');

    const previewUrl = previewSource === 'production' ? world.productionUrl : world.localUrl;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
        >
            {/* Background - 3D Scene */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
                    <color attach="background" args={['#050510']} />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[5, 5, 5]} intensity={1} color={world.color} />
                    <Stars radius={100} depth={50} count={2000} factor={4} fade speed={0.5} />

                    {/* Mini Building of this world */}
                    <MiniBuilding world={world} />

                    <OrbitControls
                        enableZoom={true}
                        autoRotate
                        autoRotateSpeed={0.5}
                        minDistance={5}
                        maxDistance={20}
                    />
                </Canvas>
            </div>

            {/* Overlay UI */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Header */}
                <div className="pointer-events-auto p-6 flex items-start justify-between">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-full text-white hover:bg-zinc-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Multiverso
                    </button>

                    <div className="flex items-center gap-4">
                        {/* Source Toggle */}
                        {world.productionUrl && world.localUrl && (
                            <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-full p-1">
                                <button
                                    onClick={() => setPreviewSource('production')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${previewSource === 'production'
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    Producción
                                </button>
                                <button
                                    onClick={() => setPreviewSource('local')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${previewSource === 'local'
                                        ? 'bg-amber-500/20 text-amber-400'
                                        : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    Localhost
                                </button>
                            </div>
                        )}

                        {/* External Link */}
                        {world.productionUrl && (
                            <a
                                href={world.productionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-full text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Abrir Sitio
                            </a>
                        )}
                    </div>
                </div>

                {/* Planet Info Card */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="pointer-events-auto absolute left-6 top-24 w-80"
                >
                    <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold"
                                style={{ backgroundColor: `${world.color}30`, color: world.color }}
                            >
                                {world.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white">{world.name}</h2>
                                <p className="text-sm text-zinc-400">{world.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span
                                        className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase"
                                        style={{
                                            backgroundColor: world.status === 'production' ? '#10b98130' : '#f59e0b30',
                                            color: world.status === 'production' ? '#10b981' : '#f59e0b'
                                        }}
                                    >
                                        {world.status}
                                    </span>
                                    <span className="text-[10px] text-zinc-500">{world.framework}</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                                <Building2 className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
                                <div className="text-lg font-bold text-white">{world.buildingLevels}</div>
                                <div className="text-[10px] text-zinc-500 uppercase">Niveles</div>
                            </div>
                            <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                                <Globe className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
                                <div className="text-lg font-bold text-white">{world.orbitRadius}</div>
                                <div className="text-[10px] text-zinc-500 uppercase">Órbita</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'preview'
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'
                                    }`}
                            >
                                <Eye className="w-4 h-4" />
                                Ver Preview del Sitio
                            </button>
                            <button
                                onClick={() => setActiveTab('building')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'building'
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'
                                    }`}
                            >
                                <Building2 className="w-4 h-4" />
                                Explorar Arquitectura
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Preview Panel */}
                <AnimatePresence>
                    {activeTab === 'preview' && (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="pointer-events-auto absolute right-6 top-24 bottom-6 w-[60%] max-w-4xl"
                        >
                            <div className="h-full bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                                {/* Browser Chrome */}
                                <div className="bg-zinc-800/80 p-3 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="flex-1 bg-zinc-900/80 rounded-lg px-4 py-1.5 flex items-center gap-2">
                                            <Globe className="w-3.5 h-3.5 text-zinc-500" />
                                            <span className="text-xs text-zinc-400 font-mono">
                                                {world.isSelf ? 'SYSTEM://LOCAL_CORE' : previewUrl}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content or iFrame */}
                                <div className="flex-1 bg-white relative">
                                    {world.isSelf ? (
                                        <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center text-center p-8">
                                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(147,51,234,0.3)] animate-pulse">
                                                <Home className="w-12 h-12 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Estás en la Nave Nodriza</h3>
                                            <p className="text-zinc-400 max-w-md">
                                                Actualmente estás operando desde el núcleo de Flagship Agency. No es posible generar una vista previa recursiva.
                                            </p>
                                            <div className="mt-8 flex gap-4">
                                                <a href="/" className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors">
                                                    Ir al Home
                                                </a>
                                                <a href="/purrpurr/architecture" className="px-6 py-2 bg-zinc-800 text-white rounded-full font-bold hover:bg-zinc-700 transition-colors">
                                                    Ver Arquitectura
                                                </a>
                                            </div>
                                        </div>
                                    ) : previewUrl ? (
                                        <iframe
                                            src={previewUrl}
                                            className="w-full h-full border-0"
                                            title={`Preview de ${world.name}`}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
                                            <div className="text-center text-zinc-400">
                                                <div className="text-4xl mb-2">📡</div>
                                                <p>No hay señal del satélite</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function MultiversePage() {
    const [selectedWorld, setSelectedWorld] = useState<MultiverseWorld | null>(null);
    const [cameraDistance, setCameraDistance] = useState(60);
    const [viewMode, setViewMode] = useState<'universe' | 'warping' | 'orbiting' | 'planet'>('universe');

    // Dynamic Worlds Logic
    const [dynamicWorlds, setDynamicWorlds] = useState<MultiverseWorld[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getMultiverseRegistry().then((data: any[]) => {
            if (Array.isArray(data)) {
                // Ensure loaded worlds have required 3D properties
                const validWorlds = data.map((w, i) => ({
                    ...w,
                    orbitRadius: w.orbitRadius || (150 + i * 40),
                    orbitSpeed: w.orbitSpeed || (0.1 / (i + 1))
                }));
                setDynamicWorlds(validWorlds as MultiverseWorld[]);
            }
        });
    }, []);

    const displayedWorlds = useMemo(() => {
        const staticIds = new Set(MULTIVERSE_WORLDS.map(w => w.id));
        const uniqueDynamic = dynamicWorlds.filter(w => !staticIds.has(w.id));
        return [...MULTIVERSE_WORLDS, ...uniqueDynamic];
    }, [dynamicWorlds]);

    async function handleCreatePlanet(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const color = formData.get('color') as string || '#a855f7';

        const result = await createMultiversePlanet(name, description, color);
        setIsSubmitting(false);

        if (result.success && result.planet) {
            setDynamicWorlds(prev => [...prev, {
                ...result.planet,
                orbitRadius: 150 + prev.length * 40,
                orbitSpeed: 0.1 / (prev.length + 1)
            } as MultiverseWorld]);
            setIsCreating(false);
        } else {
            console.error(result.error);
        }
    }



// Handle planet selection with warp animation
const handlePlanetSelect = (world: MultiverseWorld) => {
    // If already selected and in orbiting mode, selecting again enters the planet
    if (selectedWorld?.id === world.id && viewMode === 'orbiting') {
        setViewMode('planet');
        return;
    }

    setSelectedWorld(world);
    setViewMode('warping');

    // Transition to orbiting view after warp
    setTimeout(() => {
        setViewMode('orbiting');
    }, 1500);
};

// Function to enter the architecture view (Planet mode)
const enterPlanetArchitecture = () => {
    setViewMode('planet');
};

return (
    <div className="min-h-screen bg-black text-white">
        {/* Warp Speed Transition */}
        <AnimatePresence>
            {viewMode === 'warping' && selectedWorld && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black overflow-hidden"
                >
                    {/* Warp Lines Effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Central glow */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 20, opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeIn" }}
                            className="absolute w-20 h-20 rounded-full"
                            style={{ backgroundColor: selectedWorld.color }}
                        />

                        {/* Warp lines */}
                        {Array.from({ length: 100 }).map((_, i) => {
                            const angle = (i / 100) * Math.PI * 2;
                            const delay = Math.random() * 0.3;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{
                                        scaleX: 0,
                                        opacity: 0,
                                        x: 0,
                                        y: 0
                                    }}
                                    animate={{
                                        scaleX: [0, 50, 100],
                                        opacity: [0, 1, 0],
                                        x: Math.cos(angle) * 1000,
                                        y: Math.sin(angle) * 1000
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        delay,
                                        ease: "easeIn"
                                    }}
                                    className="absolute w-1 h-0.5 bg-white rounded-full origin-left"
                                    style={{
                                        transform: `rotate(${angle}rad)`,
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Destination Text */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="text-center"
                        >
                            <Rocket className="w-12 h-12 mx-auto mb-4 text-white animate-pulse" />
                            <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Viajando a</p>
                            <h2 className="text-3xl font-bold" style={{ color: selectedWorld.color }}>
                                {selectedWorld.name}
                            </h2>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* 3D Universe View */}
        {(viewMode === 'universe' || viewMode === 'orbiting') && (
            <div className="fixed inset-0">
                <Canvas camera={{ position: [0, 30, 60], fov: 50 }}>
                    <Suspense fallback={null}>
                        <color attach="background" args={['#020208']} />

                        {/* Lighting */}
                        <ambientLight intensity={0.2} />
                        <pointLight position={[0, 0, 0]} intensity={3} color="#a855f7" />

                        {/* Stars Background */}
                        <Stars radius={200} depth={100} count={5000} factor={6} fade speed={0.5} />

                        {/* Central Star */}
                        <CentralStar />

                        {/* Space-Time Mesh (Grid) */}
                        <group position={[0, -5, 0]}>
                            <Grid
                                renderOrder={-1}
                                position={[0, 0, 0]}
                                infiniteGrid
                                cellSize={2}
                                sectionSize={10}
                                fadeDistance={250}
                                sectionColor="#4c1d95"
                                cellColor="#2e1065"
                            />
                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                                <circleGeometry args={[200, 64]} />
                                <meshBasicMaterial color="#000000" transparent opacity={0.8} />
                            </mesh>
                        </group>

                        {/* Render different scenes based on mode */}
                        {viewMode === 'universe' ? (
                            <>
                                {/* Planets */}
                                {displayedWorlds.filter(w => !w.isSelf && w.status !== 'archived').map((world) => (
                                    <Planet
                                        key={world.id}
                                        world={world}
                                        onSelect={() => handlePlanetSelect(world)}
                                        isSelected={selectedWorld?.id === world.id}
                                        cameraDistance={cameraDistance}
                                    />
                                ))}
                            </>
                        ) : (
                            selectedWorld && (
                                // Orbiting Mode: Center the selected planet
                                <group>
                                    <Planet
                                        world={{ ...selectedWorld, orbitRadius: 0, orbitSpeed: 0 }} // Force center
                                        onSelect={enterPlanetArchitecture}
                                        isSelected={true}
                                        cameraDistance={15}
                                    />
                                    {/* Subtle Grid for reference */}
                                    <Grid position={[0, -5, 0]} infiniteGrid cellSize={1} sectionSize={5} fadeDistance={50} sectionColor={selectedWorld.color} cellColor="#ffffff" />
                                </group>
                            )
                        )}

                        {/* Camera Controls */}
                        <CameraController
                            onDistanceChange={setCameraDistance}
                            selectedPlanet={selectedWorld}
                            viewMode={viewMode}
                            onResetView={() => {
                                setSelectedWorld(null);
                                setViewMode('universe');
                            }}
                        />
                    </Suspense>
                </Canvas>

                {/* UI OVERLAYS */}
                {/* Universe Mode UI - Hide when orbiting */}
                {viewMode === 'universe' && (
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Header */}
                        <div className="pointer-events-auto p-6 flex items-start justify-between">
                            <a href="/purrpurr" className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-full text-white hover:bg-zinc-800 transition-colors">
                                <Home className="w-4 h-4" /> PurrPurt HQ
                            </a>
                            <div className="text-right">
                                <h1 className="text-2xl font-bold tracking-tight">El Multiverso</h1>
                                <p className="text-sm text-zinc-500 font-mono">purrpurt://multiverse</p>
                            </div>
                        </div>

                        {/* Bottom Instructions */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4"
                            >
                                <p className="text-zinc-400 text-sm mb-2">
                                    🖱️ Arrastra para rotar • Scroll para zoom • Click en un planeta para explorar
                                </p>
                                <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
                                    <span>📍 Distancia: {cameraDistance.toFixed(0)} AU</span>
                                    <span>🌍 Planetas: {MULTIVERSE_WORLDS.length}</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Zoom Indicator */}
                        <div className="absolute left-6 bottom-8">
                            <div className="bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-xl p-4 w-48">
                                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Zoom Level</div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                        animate={{ width: `${Math.max(10, 100 - cameraDistance)}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] text-zinc-600">
                                    <span>Lejos</span>
                                    <span>Cerca</span>
                                </div>
                            </div>
                        </div>

                        {/* Planet List Container - High Z-Index */}
                        <div className="absolute right-6 top-24 w-72 z-[100] pointer-events-none">
                            <div className="pointer-events-auto bg-zinc-900/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                    <h3 className="text-sm font-bold text-white">Ecosistema Satelital</h3>
                                    <button
                                        onClick={(e) => {
                                            console.log('Button Clicked'); // Debug
                                            e.stopPropagation();
                                            setIsCreating(true);
                                        }}
                                        className="
                                                cursor-pointer pointer-events-auto relative
                                                bg-indigo-600 hover:bg-indigo-500 
                                                text-white p-1.5 px-3 rounded-lg 
                                                transition-all shadow-lg hover:shadow-indigo-500/25
                                                flex items-center gap-1.5 group border border-white/10
                                            "
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-wider">Nuevo</span>
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div className="max-h-[60vh] overflow-y-auto pointer-events-auto">
                                    {/* Active Projects */}
                                    {[...displayedWorlds]
                                        .filter(w => !w.isSelf && w.status !== 'archived')
                                        .sort((a, b) => (b.buildingLevels || 0) - (a.buildingLevels || 0))
                                        .map((world) => {
                                            const levels = world.buildingLevels || 1;
                                            const indicatorSize = 10 + (levels * 0.6);
                                            const isFlagship = world.isSelf;
                                            return (
                                                <button
                                                    key={world.id}
                                                    onClick={() => handlePlanetSelect(world)}
                                                    className={`w-full px-4 py-3 flex items-center gap-4 hover:bg-white/5 transition-all duration-300 border-b border-white/5 last:border-0 group ${isFlagship ? 'bg-white/[0.02]' : ''}`}
                                                >
                                                    <div className="flex items-center justify-center w-12 flex-shrink-0">
                                                        <div className={`rounded-full shadow-lg transition-transform group-hover:scale-110 ${isFlagship ? 'animate-pulse' : ''}`} style={{ backgroundColor: world.color, width: `${Math.min(indicatorSize, 32)}px`, height: `${Math.min(indicatorSize, 32)}px`, boxShadow: `0 0 ${levels}px ${world.color}50` }} />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="flex items-baseline gap-2">
                                                            <p className={`font-black tracking-tight text-white transition-all ${isFlagship ? 'text-lg' : 'text-base'}`}>{world.name}</p>
                                                            {isFlagship && <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 rounded uppercase">Core</span>}
                                                        </div>
                                                        <div className="flex items-center justify-between mt-0.5">
                                                            <p className="text-[10px] text-zinc-500">{world.type}</p>
                                                            <p className="text-[9px] text-zinc-600 font-mono">{levels} LVL</p>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}

                                    {/* Archived Section */}
                                    <div className="bg-black/40 border-t border-b border-white/5 mt-4 py-2 px-4">
                                        <h4 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-zinc-600" />
                                            Deep Space (Archived)
                                        </h4>
                                    </div>

                                    {[...displayedWorlds]
                                        .filter(w => w.status === 'archived')
                                        .map((world) => (
                                            <div key={world.id} className="w-full px-4 py-3 flex items-center gap-4 opacity-40 hover:opacity-80 transition-opacity cursor-auto">
                                                <div className="w-12 flex justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-zinc-400 text-sm line-through decoration-zinc-700">{world.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ORBITING MODE UI */}
                {viewMode === 'orbiting' && selectedWorld && (
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Back Button */}
                        <div className="pointer-events-auto absolute top-6 left-6">
                            <button
                                onClick={() => {
                                    setViewMode('universe');
                                    setSelectedWorld(null);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-full text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Volver al Universo
                            </button>
                        </div>

                        {/* Planet Info Floating */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-auto"
                        >
                            <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl max-w-md w-full mx-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{selectedWorld.name}</h2>
                                        <p className="text-zinc-400 text-sm">{selectedWorld.description}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: selectedWorld.color }}>
                                        <Globe className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                                    <div className="bg-white/5 rounded-lg p-2">
                                        <div className="text-xs text-zinc-500 uppercase">Estado</div>
                                        <div className={`text-sm font-bold`} style={{ color: selectedWorld.status === 'production' ? '#10b981' : '#f59e0b' }}>
                                            {selectedWorld.status}
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-2">
                                        <div className="text-xs text-zinc-500 uppercase">Niveles</div>
                                        <div className="text-sm font-bold text-white">{selectedWorld.buildingLevels}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-2">
                                        <div className="text-xs text-zinc-500 uppercase">Framework</div>
                                        <div className="text-sm font-bold text-white">{selectedWorld.framework?.split(' ')[0]}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={enterPlanetArchitecture}
                                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Building2 className="w-4 h-4" />
                                    Explorar Arquitectura
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        )}

        {/* Planet Detail View */}
        <AnimatePresence>
            {viewMode === 'planet' && selectedWorld && (
                <PlanetDetailView
                    world={selectedWorld}
                    onClose={() => {
                        setViewMode('universe');
                        setSelectedWorld(null);
                    }}
                />
            )}
        </AnimatePresence>

        {/* CREATION MODAL */}
        {isCreating && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCreating(false)} />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="relative bg-[#09090b] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <button onClick={() => setIsCreating(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                            <Globe className="w-5 h-5 text-purple-500" />
                            Nuevo Planeta Genesis
                        </h2>
                        <p className="text-zinc-500 text-sm">Inicializar un nuevo proyecto en el multiverso.</p>
                    </div>

                    <form onSubmit={handleCreatePlanet} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-xs text-zinc-400 uppercase font-bold ml-1">Nombre del Proyecto</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-bold"
                                placeholder="Ej. Proyecto Alpha"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs text-zinc-400 uppercase font-bold ml-1">Descripción</label>
                            <textarea
                                name="description"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all h-24 resize-none"
                                placeholder="Propósito de este sistema..."
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs text-zinc-400 uppercase font-bold ml-1">Color Atmosférico</label>
                            <div className="flex gap-2 flex-wrap bg-white/5 p-3 rounded-lg border border-white/5">
                                {['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e'].map((c) => (
                                    <label key={c} className="cursor-pointer group relative">
                                        <input type="radio" name="color" value={c} className="peer sr-only" defaultChecked={c === '#8b5cf6'} />
                                        <div className="w-8 h-8 rounded-full bg-current border-2 border-transparent peer-checked:border-white peer-checked:scale-110 peer-checked:shadow-lg transition-all" style={{ color: c, boxShadow: `0 0 10px ${c}40` }} />
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="flex-1 px-4 py-3 rounded-xl font-bold text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-[2] px-4 py-3 bg-white text-black rounded-xl font-black hover:bg-purple-200 transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
                                {isSubmitting ? 'TERRAFORMANDO...' : 'INICIAR GENESIS'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
    </div>
);
}
