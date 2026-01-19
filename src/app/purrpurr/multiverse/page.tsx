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
    Home, Play, Pause, X, ChevronDown, Plus, Loader2,
    Terminal, Power, Activity, Settings
} from 'lucide-react';
import { createMultiversePlanet, getMultiverseRegistry } from '@/app/actions/create-multiverse-planet';
import { MULTIVERSE_PROJECTS, MultiverseProject, BUILDING_LEVELS } from '@/data/purrpurr-architecture';
import { checkServerStatus, startProjectServer, stopProjectServer } from '@/app/actions/multiverse-server-actions';

// Extended project data with deployment info
interface MultiverseWorld extends MultiverseProject {
    productionUrl?: string | null;
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
        localUrl: 'http://localhost:3000',
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
    onClose,
    activeTab,
    setActiveTab
}: {
    world: MultiverseWorld;
    onClose: () => void;
    activeTab: 'building' | 'info' | 'terminal';
    setActiveTab: (tab: 'building' | 'info' | 'terminal') => void;
}) {
    const [previewSource, setPreviewSource] = useState<'production' | 'local'>('local');
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [isServerActive, setIsServerActive] = useState<boolean | null>(null);
    const [isStarting, setIsStarting] = useState(false);
    const [serverLogs, setServerLogs] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const check = async () => {
            const status = await checkServerStatus(world.id);
            setIsServerActive(status);
            if (status && isStarting) {
                setIsStarting(false);
                setServerLogs(prev => [...prev, `[STATUS] Port detected. Server is now ONLINE.`]);
            }
        };
        check();
        const interval = setInterval(check, 5000);
        return () => clearInterval(interval);
    }, [world.id, isStarting]);

    const activeUrl = previewSource === 'local' ? world.localUrl : world.productionUrl;

    const deviceWidths = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px'
    };

    const handleStartServer = async () => {
        setIsStarting(true);
        setError(null);
        setServerLogs(prev => [...prev, `[CLI] Executing: npm run dev on port ${world.localUrl?.split(':').pop()}`]);

        const result: any = await startProjectServer(world.id);

        if (result.logs) {
            const newLogs = result.logs.split('\n').filter((l: string) => l.trim() !== '');
            setServerLogs(prev => [...prev, ...newLogs]);
        }

        if (result.success) {
            setServerLogs(prev => [...prev, `[SUCCESS] Command issued. Monitoring port...`]);
            // Give it 15s max before giving up on the 'Starting' state
            setTimeout(async () => {
                if (isStarting) {
                    const status = await checkServerStatus(world.id);
                    setIsServerActive(status);
                    setIsStarting(false);
                }
            }, 15000);
        } else {
            setError(result.error);
            setServerLogs(prev => [...prev, `[ERROR] ${result.error}`]);
            setIsStarting(false);
        }
    };

    const handleStopServer = async () => {
        setIsStarting(true);
        setServerLogs(prev => [...prev, `[CLI] Stop command issued...`]);
        const result = await stopProjectServer(world.id);
        if (result.success) {
            setServerLogs(prev => [...prev, `[SUCCESS] ${result.message}`]);
            setIsServerActive(false);
        } else {
            setServerLogs(prev => [...prev, `[ERROR] ${result.error}`]);
        }
        setIsStarting(false);
    };

    const handleRestartServer = async () => {
        setServerLogs(prev => [...prev, `[CLI] Restarting server...`]);
        await stopProjectServer(world.id);
        await new Promise(r => setTimeout(r, 1000));
        handleStartServer();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#050508] flex"
        >
            {/* 1. LEFT PANEL: Control Center */}
            <aside className="w-80 border-r border-white/5 bg-zinc-950/50 flex flex-col z-10 pointer-events-auto">
                <div className="p-6 border-b border-white/5">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-xs font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-3 h-3" /> Salir del Taller
                    </button>

                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl shadow-2xl" style={{ backgroundColor: world.color, color: '#000' }}>
                            {world.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-white font-black tracking-tight">{world.name}</h2>
                            <p className="text-[10px] text-zinc-500 font-mono">ID: {world.id}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <nav className="space-y-1">
                        {[
                            { id: 'terminal', label: 'SISTEMAS & CONSOLA', icon: Terminal },
                            { id: 'building', label: 'ARQUITECTURA 3D', icon: Building2 },
                            { id: 'info', label: 'DOCUMENTACIÓN', icon: Globe },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === tab.id
                                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                    : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Server Local</span>
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${isServerActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                <Activity className={`w-2.5 h-2.5 ${isServerActive ? 'animate-pulse' : ''}`} />
                                {isServerActive ? 'ONLINE' : 'OFFLINE'}
                            </div>
                        </div>
                        {isServerActive && (
                            <a
                                href={world.localUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2 mb-2 bg-emerald-500 text-black font-black text-[10px] rounded-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                            >
                                <ExternalLink className="w-3 h-3" /> ABRIR EN EL NAVEGADOR
                            </a>
                        )}
                        {!isServerActive ? (
                            <button
                                onClick={handleStartServer}
                                disabled={isStarting}
                                className="w-full py-2 bg-amber-500 text-black font-black text-[10px] rounded-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                            >
                                {isStarting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Power className="w-3 h-3" />}
                                {isStarting ? 'INICIANDO...' : 'ENCENDER SERVIDOR'}
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleStopServer}
                                    disabled={isStarting}
                                    className="flex-1 py-2 bg-red-500/20 text-red-500 border border-red-500/30 font-black text-[10px] rounded-lg hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <X className="w-3 h-3" /> DETENER
                                </button>
                                <button
                                    onClick={handleRestartServer}
                                    disabled={isStarting}
                                    className="flex-1 py-2 bg-white/5 text-white border border-white/10 font-black text-[10px] rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <Activity className="w-3 h-3" /> REINICIAR
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 rounded-xl p-3">
                            <div className="text-[9px] text-zinc-500 uppercase font-bold">Niveles</div>
                            <div className="text-xl font-black text-white">{world.buildingLevels}</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                            <div className="text-[9px] text-zinc-500 uppercase font-bold">Health</div>
                            <div className="text-xl font-black text-emerald-500">98%</div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-black/40">
                    <div className="flex items-center gap-3 opacity-50 grayscale">
                        <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center">
                            <Code className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">v4.2.0-stable</div>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN WORKSPACE AREA */}
            <main className="flex-1 relative overflow-hidden flex flex-col pointer-events-auto">
                <AnimatePresence mode="wait">
                    {activeTab === 'terminal' && (
                        <motion.div
                            key="terminal"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex-1 p-8"
                        >
                            <div className="h-full bg-[#0c0c14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-mono">
                                <div className="bg-zinc-900/80 p-4 border-b border-white/10 flex justify-between items-center">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-zinc-700" />
                                        <div className="w-3 h-3 rounded-full bg-zinc-700" />
                                        <div className="w-3 h-3 rounded-full bg-zinc-700" />
                                    </div>
                                    <span className="text-[10px] text-zinc-500 tracking-widest uppercase">multiverse-os core terminal</span>
                                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold rounded-full">RT-SESSION-ACTIVE</div>
                                </div>
                                <div className="flex-1 p-6 overflow-y-auto space-y-1 font-mono text-[11px] leading-relaxed">
                                    <p className="text-emerald-500 mb-4 font-bold">{">"} WORKSHOP_OS v4.2.0 // PROJECT: {world.name.toUpperCase()}</p>

                                    {serverLogs.length === 0 && !isServerActive && (
                                        <p className="text-zinc-600 italic">No activity recorded. Start server to begin feed...</p>
                                    )}

                                    {serverLogs.map((log, i) => (
                                        <p key={i} className={`
                                            ${log.includes('[ERROR]') || log.includes('error') ? 'text-red-400' : ''}
                                            ${log.includes('[SUCCESS]') ? 'text-emerald-400' : ''}
                                            ${log.includes('[CLI]') ? 'text-amber-400' : 'text-zinc-400'}
                                        `}>
                                            <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                            {log}
                                        </p>
                                    ))}

                                    {isStarting && (
                                        <div className="flex items-center gap-2 text-amber-500 mt-2">
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            <span>Esperando respuesta del proceso...</span>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                                            <p className="font-bold underline mb-1 uppercase text-[10px]">Critical Deployment Error</p>
                                            <p className="text-xs">{error}</p>
                                        </div>
                                    )}

                                    {isServerActive && (
                                        <div className="mt-6 space-y-3">
                                            <a
                                                href={world.localUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-500 font-bold underline block"
                                            >
                                                &gt; OPEN LIVE WORKSHOP (NEW TAB)
                                            </a>
                                            <p className="text-zinc-500 text-[10px] italic">Host diagnostic: {world.localUrl}</p>
                                        </div>
                                    )}

                                    {!isServerActive && !isStarting && (
                                        <div className="mt-8">
                                            <button
                                                onClick={handleStartServer}
                                                className="px-6 py-2 bg-white text-black font-black text-[10px] rounded-lg hover:bg-zinc-200 transition-all uppercase"
                                            >
                                                Initialize Server
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {(activeTab === 'building' || activeTab === 'info') && (
                        <motion.div
                            key="visuals"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 relative"
                        >
                            <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
                                <color attach="background" args={['#050510']} />
                                <ambientLight intensity={0.3} />
                                <pointLight position={[5, 5, 5]} intensity={1} color={world.color} />
                                <Stars radius={100} depth={50} count={2000} factor={4} fade speed={0.5} />
                                <MiniBuilding world={world} />
                                <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
                            </Canvas>
                            <div className="absolute bottom-8 right-8 bg-zinc-950/80 p-4 border border-white/10 rounded-2xl max-w-xs backdrop-blur-xl">
                                <h4 className="text-white font-bold mb-1">Análisis Estructural</h4>
                                <p className="text-zinc-500 text-[10px] leading-relaxed">Visualización geométrica del núcleo del planeta. Los niveles representan la profundidad de la arquitectura de datos.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </motion.div>
    );
}
// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

function FleetItem({ world, onManage }: { world: MultiverseWorld, onManage: (world: MultiverseWorld) => void }) {
    const [isServerActive, setIsServerActive] = useState<boolean | null>(null);
    const [isStarting, setIsStarting] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    useEffect(() => {
        checkServerStatus(world.id).then(setIsServerActive);
        const interval = setInterval(() => {
            checkServerStatus(world.id).then(setIsServerActive);
        }, 5000);
        return () => clearInterval(interval);
    }, [world.id]);

    const handleStart = async () => {
        setIsStarting(true);
        setLogs([`🚀 Solicitando arranque para ${world.name}...`]);

        const result: any = await startProjectServer(world.id);

        if (result.logs) {
            const newLogs = result.logs.split('\n').filter((l: string) => l.trim() !== '');
            setLogs(prev => [...prev, ...newLogs]);
        }

        if (result.success) {
            setLogs(prev => [...prev, `[SISTEMA] Comando enviado correctamente. Monitoreando puerto ${world.localUrl?.split(':').pop()}...`]);
        } else {
            setLogs(prev => [...prev, `[ERROR] ${result.error || 'Fallo desconocido al iniciar'}`]);
        }

        setTimeout(async () => {
            const status = await checkServerStatus(world.id);
            setIsServerActive(status);
            setIsStarting(false);
            if (status) {
                setLogs(prev => [...prev, `✅ SERVIDOR ONLINE en ${world.localUrl}`]);
            }
        }, 8000);
    };

    return (
        <div className="group relative">
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 flex flex-col gap-4 hover:border-white/20 transition-all overflow-hidden bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: world.color + '20', border: `1px solid ${world.color}40` }}>
                            <Globe className="w-6 h-6" style={{ color: world.color }} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{world.name}</h3>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-zinc-500 font-mono uppercase">{world.type}</span>
                                <div className="w-1 h-1 rounded-full bg-zinc-700" />
                                <span className="text-xs text-zinc-500 font-mono tracking-widest">{world.localUrl}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 justify-end ${isServerActive ? 'text-emerald-500' : 'text-red-500'}`}>
                                <Activity className={`w-3 h-3 ${isServerActive ? 'animate-pulse' : ''}`} />
                                {isServerActive ? 'Online' : 'Offline'}
                            </div>
                            <p className="text-[10px] text-zinc-600 font-mono mt-1">PORT: {world.localUrl?.split(':').pop()}</p>
                        </div>

                        <div className="h-10 w-[1px] bg-white/10" />

                        <div className="flex gap-2">
                            <button
                                onClick={() => onManage(world)}
                                className="px-4 py-2 bg-white/5 text-zinc-300 border border-white/10 font-black text-xs rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                <Settings className="w-3 h-3" />
                                GESTIONAR
                            </button>
                            {!isServerActive ? (
                                <button
                                    onClick={handleStart}
                                    disabled={isStarting}
                                    className="px-4 py-2 bg-amber-500 text-black font-black text-xs rounded-lg hover:bg-amber-400 transition-all flex items-center gap-2 disabled:opacity-50 min-w-[120px] justify-center"
                                >
                                    {isStarting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                                    {isStarting ? 'INICIANDO' : 'ARRANCAR'}
                                </button>
                            ) : (
                                <a
                                    href={world.localUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-emerald-500 text-black font-black text-xs rounded-lg hover:bg-emerald-400 transition-all flex items-center gap-2"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    ABRIR LOCAL
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Console Logs Preview */}
                <AnimatePresence>
                    {(isStarting || logs.length > 0) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/5 pt-4 mt-2"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Terminal className="w-3 h-3 text-zinc-500" />
                                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Consola de Arranque</span>
                                {isStarting && <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />}
                            </div>
                            <div
                                ref={scrollRef}
                                className="bg-black/40 rounded-lg p-3 font-mono text-[10px] max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 space-y-1"
                            >
                                {logs.map((log, i) => (
                                    <div key={i} className={`
                                        ${log.includes('[ERROR]') ? 'text-red-400' : ''}
                                        ${log.includes('✅') ? 'text-emerald-400 font-bold' : 'text-zinc-400'}
                                        ${log.includes('🚀') ? 'text-amber-400 font-bold' : ''}
                                    `}>
                                        <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                        {log}
                                    </div>
                                ))}
                                {isStarting && (
                                    <div className="flex items-center gap-2 text-amber-500/50 animate-pulse">
                                        <span className="w-1 h-1 bg-amber-500 rounded-full" />
                                        <span>Procesando...</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function MultiversePage() {
    const [selectedWorld, setSelectedWorld] = useState<MultiverseWorld | null>(null);
    const [cameraDistance, setCameraDistance] = useState(60);
    const [viewMode, setViewMode] = useState<'universe' | 'warping' | 'orbiting' | 'planet'>('universe');
    const [activeTab, setActiveTab] = useState<'building' | 'info' | 'terminal'>('terminal');
    const [displayMode, setDisplayMode] = useState<'3d' | 'fleet'>('fleet');

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
            } as any as MultiverseWorld]);
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
            setActiveTab('terminal'); // Default to console when entering workshop
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

            {/* DASHBOARD - Centro de Mando / Centro de Gestión */}
            {displayMode === 'fleet' && viewMode === 'universe' && (
                <div className="fixed inset-0 z-[60] bg-[#050508] overflow-y-auto">
                    {/* Premium Background Layer */}
                    <div className="fixed inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1033_0%,transparent_50%)] opacity-40" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,#0c1222_0%,transparent_50%)] opacity-40" />
                        {/* CSS Animated Particles (Low Cost) */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                    </div>

                    <div className="max-w-6xl mx-auto p-12 pt-32 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between mb-12"
                        >
                            <div>
                                <h2 className="text-5xl font-black tracking-tighter text-white mb-2 italic">CENTRO DE MANDO</h2>
                                <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase opacity-60">Control quirúrgico de micro-servicios // multiverse-os</p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="flex bg-zinc-900 border border-white/10 rounded-full p-1 h-fit">
                                    <button
                                        onClick={() => setDisplayMode('3d')}
                                        className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest transition-all ${(displayMode as string) === '3d' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                                    >
                                        UNIVERSO 3D
                                    </button>
                                    <button
                                        onClick={() => setDisplayMode('fleet')}
                                        className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest transition-all ${(displayMode as string) === 'fleet' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                                    >
                                        DASHBOARD
                                    </button>
                                </div>
                                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global Status</div>
                                    <div className="text-emerald-500 font-black text-sm">SYSTEMS NOMINAL</div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-4">
                            {displayedWorlds.filter(w => !w.isSelf).map((world, idx) => (
                                <motion.div
                                    key={world.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <FleetItem world={world} onManage={(w) => {
                                        setSelectedWorld(w);
                                        setViewMode('planet');
                                    }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 3D Universe View */}
            {(viewMode === 'universe' || viewMode === 'orbiting') && displayMode === '3d' && (
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

                    {/* Universe Mode UI - Only show in 3D Mode */}
                    {viewMode === 'universe' && displayMode === '3d' && (
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Header - Visible in both 3D and Fleet mode if not obstructing */}
                            <div className="pointer-events-auto pt-28 px-6 flex items-start justify-between">
                                <div className="flex gap-4">
                                    <a href="/purrpurr" className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-full text-white hover:bg-zinc-800 transition-colors">
                                        <Home className="w-4 h-4" /> HQ
                                    </a>
                                    <div className="flex bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-full p-1">
                                        <button
                                            onClick={() => setDisplayMode('3d')}
                                            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${(displayMode as string) === '3d' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                                        >
                                            3D
                                        </button>
                                        <button
                                            onClick={() => setDisplayMode('fleet')}
                                            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${(displayMode as string) === 'fleet' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                                        >
                                            DASHBOARD
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h1 className="text-2xl font-bold tracking-tight text-white">El Multiverso</h1>
                                    <p className="text-sm text-zinc-500 font-mono">purrpurt://multiverse/{displayMode}</p>
                                </div>
                            </div>

                            {/* 3D-Specific UI Overlays */}
                            {displayMode === '3d' && (
                                <>
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
                                    <div className="absolute right-6 top-40 w-72 z-[100] pointer-events-none">
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
                                </>
                            )}
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

                                    <div className="flex gap-3">
                                        <button
                                            onClick={enterPlanetArchitecture}
                                            className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Building2 className="w-4 h-4" />
                                            Arquitectura
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedWorld(selectedWorld);
                                                setActiveTab('terminal');
                                                setViewMode('planet');
                                            }}
                                            className="flex-1 py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 border border-white/10"
                                        >
                                            <Terminal className="w-4 h-4 text-amber-500" />
                                            Consola
                                        </button>
                                    </div>
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
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onClose={() => {
                            setViewMode('universe');
                            setSelectedWorld(null);
                            setActiveTab('preview');
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
