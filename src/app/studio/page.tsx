'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FluidBackground from '@/components/creative/FluidBackground';
import { FLUID_PRESET_PURRPURR } from '@/config/creative';
import { CheckoutBar } from '@/components/purrpurr/CheckoutBar';
import { DesignLab } from '@/components/purrpurr/DesignLab';
import { Terminal, Code, Cpu, FileJson, Layout, FolderOpen, ShieldCheck, MapPin, Phone, FlaskConical, Loader2 } from 'lucide-react';
import { usePurrpurr } from '@/components/purrpurr/PurrpurrContext';
import { usePurrpurrLab, type Archetype } from '@/hooks/usePurrpurrLab';

// --- IMPORT ONLY TYPES AND HELPERS FROM CONFIG (no static data!) ---
import {
    DEFAULT_DESIGN_CONFIG,
    getArchetypeTheme
} from '@/config/design-lab';
import { type DesignConfig } from '@/components/purrpurr/DesignLab';

// --- ICON MAP for database archetypes ---
import { ShoppingBag, Briefcase, Rocket, Coffee, Building, Activity, Zap, Leaf, Square } from 'lucide-react';
const ICON_MAP: Record<string, any> = {
    ShoppingBag, Briefcase, Rocket, Coffee, Building, Activity, Zap, Leaf
};
const getIcon = (iconName: string | null | undefined) => ICON_MAP[iconName || ''] || Square;

// --- STAGE DEFINITIONS ---
type Stage = 'INIT' | 'CATEGORY' | 'NAME' | 'LOGO_CHECK' | 'TYPOGRAPHY' | 'DESCRIPTION' | 'LOCATION' | 'WHATSAPP' | 'FINISHED';

// --- VIEW MODE ---
type ViewMode = 'WIZARD' | 'LAB';

export default function StudioPage() {
    // --- STATE MACHINE ---
    const [stage, setStage] = useState<Stage>('INIT');
    const [viewMode, setViewMode] = useState<ViewMode>('WIZARD'); // Toggle between Wizard and Lab
    const [showLab, setShowLab] = useState(false); // Lab panel visibility

    const [projectData, setProjectData] = useState({
        category: '',
        name: 'Purrpurr Project',
        logoUrl: '',
        fontStyle: 'INTER',
        description: 'Inicializando motor creativo...',
        location: '',
        whatsapp: '',
        complexity: 'STANDARD'
    });

    // --- DESIGN LAB CONFIG (Using centralized default) ---
    const [designConfig, setDesignConfig] = useState<DesignConfig>(DEFAULT_DESIGN_CONFIG);


    // --- VISUAL & SYSTEM STATE ---
    const [activeTheme, setActiveTheme] = useState<any>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [botMessage, setBotMessage] = useState("System Offline.");
    const [editingSlug, setEditingSlug] = useState<string | null>(null);

    // --- CONNECT TO NEXUS BRAIN ---
    const { setMessage, setMood } = usePurrpurr();

    // --- CONNECT TO PURRPURR LAB DATABASE ---
    const { archetypes, palettes, loading: labLoading } = usePurrpurrLab();

    // Simulated "Live Code" Stream (ENGLISH ONLY FOR STATUS)
    const addLog = (msg: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
        const prefix = type === 'success' ? '✔' : type === 'warn' ? '⚠' : type === 'error' ? '✖' : '➜';
        setLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${prefix} ${msg}`]);
    };

    // --- Sync Design Config to Theme ---
    useEffect(() => {
        setActiveTheme({
            color1: designConfig.colors.background,
            color2: designConfig.colors.secondary,
            color3: designConfig.colors.primary,
            color4: designConfig.colors.accent
        });
    }, [designConfig.colors]);

    // --- AUTOMATIC ONBOARDING FLOW ---
    useEffect(() => {
        const init = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const editSlug = urlParams.get('slug') || urlParams.get('id');

            if (editSlug) {
                addLog(`System: Edit Mode Detected (Slug: ${editSlug})`, 'info');
                try {
                    const res = await fetch(`/api/purrpurr/project?slug=${editSlug}`);
                    const data = await res.json();

                    if (data.success && data.project) {
                        const arch = JSON.parse(data.project.architecture);

                        setProjectData({
                            category: arch.identity.category,
                            name: arch.identity.name,
                            logoUrl: '',
                            fontStyle: arch.identity.brand.typography,
                            description: arch.identity.seo.description,
                            location: arch.sections.find((s: any) => s.type === 'CONTACT')?.content.location || '',
                            whatsapp: arch.sections.find((s: any) => s.type === 'CONTACT')?.content.whatsapp || '',
                            complexity: arch.ui.theme === 'COMMERCE_PRO' ? 'HIGH' : 'STANDARD'
                        });

                        setStage('FINISHED');
                        setShowLab(true); // Show lab in edit mode
                        setBotMessage(`Proyecto "${arch.identity.name}" cargado.\n\n💡 Usa el LABORATORIO para ajustes visuales.\n💬 Usa el CHAT para editar textos y descripciones.`);
                        addLog(`Core: Memory Dump Loaded Successfully.`, 'success');
                        setEditingSlug(data.project.slug);

                        const matchedCat = archetypes.find((c: Archetype) => c.slug === arch.identity.category);
                        if (matchedCat) {
                            setDesignConfig(prev => ({
                                ...prev,
                                colors: { ...prev.colors, primary: matchedCat.color }
                            }));
                        }

                    } else {
                        addLog(`Error: Could not load project.`, 'error');
                    }
                } catch (e) {
                    addLog(`Error: Network Failure`, 'error');
                }

            } else {
                setTimeout(() => {
                    setStage('CATEGORY');
                    setBotMessage("Bienvenido al Arquitecto de Purrpurr.\nSelecciona el modelo base para tu infraestructura digital:");
                    addLog("System: Kernel Initialized (Python v3.9 Backend)", 'success');
                    addLog("Auth: User Session Verified", 'info');
                    addLog("UI: Loading Strategic Presets...", 'info');
                }, 1500);
            }
        };

        init();
    }, []);

    // --- INPUT HANDLER (THE BRAIN - SOLO TEXTOS Y TIPOGRAFÍA) ---
    const handleInput = async (userInput: string) => {
        const input = userInput.trim();
        if (!input) return;

        addLog(`Input Received: "${input}"`, 'info');

        switch (stage) {
            case 'CATEGORY':
                setBotMessage("Por favor selecciona una de las opciones arriba o escribe el nombre de tu marca si ya tienes una categoría en mente.");
                setStage('NAME');
                setProjectData(prev => ({ ...prev, name: input }));
                addLog(`Core: Custom Namespace assigned: ${input}`, 'success');
                setBotMessage(`Entendido. Nombre del proyecto: "${input}".\n¿Tienes ya un archivo de Logo profesional (PNG Transparente)? (Responde SI o NO)`);
                break;

            case 'NAME':
                setProjectData(prev => ({ ...prev, name: input }));
                addLog(`Data: Entity Name set to "${input}"`, 'success');
                addLog(`FS: mkdir /var/www/${input.toLowerCase().replace(/\s/g, '_')}`, 'info');
                setStage('LOGO_CHECK');
                setBotMessage(`Nombre registrado. ¿Cuentas con un Logo en formato vector o PNG transparente? (SI / NO)`);
                break;

            case 'LOGO_CHECK':
                if (input.toLowerCase().includes('si') || input.toLowerCase().includes('yes')) {
                    setStage('DESCRIPTION');
                    addLog(`Assets: Asset Upload Slot Allocated`, 'warn');
                    setBotMessage("Perfecto. He habilitado el módulo de carga. Ahora describe tu visión: ¿Qué quieres transmitir con este diseño? (Ej: 'Lujo minimalista', 'Energía caótica', 'Tech limpio')");
                } else {
                    setStage('TYPOGRAPHY');
                    addLog(`Assets: Logo Missing. Init Typography Lab...`, 'info');
                    setBotMessage("Entendido. Usaremos el Laboratorio Tipográfico de Purrpurr. ¿Qué estilo prefieres? (MODERNO, CLASICO, o FUTURISTA)");
                }
                break;

            case 'TYPOGRAPHY':
                const font = input.toUpperCase();
                setProjectData(prev => ({ ...prev, fontStyle: font }));
                addLog(`Style: Injecting Font Family -> ${font}`, 'success');
                setStage('DESCRIPTION');
                setBotMessage("Tipografía configurada. Ahora, profundicemos: Describe el negocio o proyecto. (Ej: 'Venta de sneakers exclusivos' o 'Consultoría legal para startups')");
                break;

            case 'DESCRIPTION':
                const isComplex = input.toLowerCase().includes('marketplace') || input.toLowerCase().includes('tienda') || input.toLowerCase().includes('uber');

                if (isComplex) {
                    setProjectData(prev => ({ ...prev, complexity: 'HIGH', description: input }));
                    addLog(`Analysis: HIGH COMPLEXITY DETECTED (Commerce)`, 'warn');
                    addLog(`Module: Loading 'LITE_COMMERCE_V2' template...`, 'info');
                    setBotMessage("⚠️ Análisis: Detecto requerimientos de E-Commerce/Marketplace. He cargado el módulo 'LITE' con integración directa a WhatsApp para ventas rápidas.\n¿En qué ciudad o país operarás?");
                } else {
                    setProjectData(prev => ({ ...prev, complexity: 'STANDARD', description: input }));
                    addLog(`Analysis: Standard Portfolio structure.`, 'success');
                    setBotMessage(`Recibido. He ajustado los shaders visuales. ¿Cuál es su ubicación operativa (Ciudad/País)?`);
                }

                setStage('LOCATION');
                break;

            case 'LOCATION':
                setProjectData(prev => ({ ...prev, location: input }));
                addLog(`Geo: Localization set to ${input}`, 'success');
                setStage('WHATSAPP');
                setBotMessage(`Fase Final. Para activar el botón de conversión (Ventas/Contacto), ingresa tu número de WhatsApp corporativo.`);
                break;

            case 'WHATSAPP':
                setProjectData(prev => ({ ...prev, whatsapp: input }));
                addLog(`API: WhatsApp Gateway Connected (${input})`, 'success');
                setStage('FINISHED');
                setShowLab(true); // Unlock Lab after wizard completes
                setBotMessage(`✅ ARQUITECTURA COMPLETADA.\n\n🧪 El LABORATORIO está ahora disponible para ajustes visuales.\n💬 Usa el CHAT para cambiar textos.\n\nPresiona DEPLOY cuando estés listo.`);
                addLog(`System: COMPILATION FINISHED. READY TO DEPLOY.`, 'success');
                addLog(`Lab: Design Lab UNLOCKED.`, 'success');
                break;

            case 'FINISHED':
                // Chat commands for TEXT editing only
                if (input.toLowerCase().includes('name') || input.toLowerCase().includes('nombre')) {
                    setStage('NAME');
                    setBotMessage("Ok, renombremos el proyecto. ¿Nuevo nombre?");
                } else if (input.toLowerCase().includes('desc')) {
                    setStage('DESCRIPTION');
                    setBotMessage("Redefiniendo visión. ¿Cuál es la nueva descripción?");
                } else if (input.toLowerCase().includes('whatsapp')) {
                    setStage('WHATSAPP');
                    setBotMessage("Actualizando Gateway. ¿Nuevo número?");
                } else if (input.toLowerCase().includes('titulo') || input.toLowerCase().includes('title')) {
                    setBotMessage("Ingresa el nuevo título para tu Hero:");
                    // Could add a sub-stage for this
                } else {
                    // Default: treat as description update
                    setProjectData(prev => ({ ...prev, description: input }));
                    addLog(`Content: Description updated`, 'success');
                    setBotMessage(`Descripción actualizada.\n\n💬 Comandos: 'cambiar nombre', 'cambiar whatsapp'\n🧪 Para colores/efectos usa el LABORATORIO`);
                }
                break;
        }
    };

    const handleCategorySelect = (cat: Archetype) => {
        setProjectData(prev => ({ ...prev, category: cat.slug }));

        // Use helper to get full theme from archetype
        const archetypeTheme = getArchetypeTheme(cat.slug);
        setDesignConfig(prev => ({
            ...prev,
            colors: archetypeTheme || { ...prev.colors, primary: cat.color }
        }));

        addLog(`Strategy: Selected Archetype [${cat.slug}]`, 'success');
        addLog(`Style: Loading ${cat.slug}_THEME.css...`, 'info');
        setStage('NAME');
        setBotMessage(`Excelente elección: Estilo ${cat.label}.\nAhora, ¿Cómo se llama tu proyecto o empresa?`);
    };

    // --- Handle Design Lab Changes ---
    const handleDesignConfigChange = (newConfig: DesignConfig) => {
        setDesignConfig(newConfig);
    };

    // Visual logic
    const bgColors = activeTheme || {
        color1: '#000000',
        color2: '#18181b',
        color3: '#27272a',
        color4: '#09090b'
    };

    return (
        <div className="h-[100dvh] bg-[#0f0033] text-white font-sans overflow-hidden flex flex-col md:flex-row">

            {/* --- LEFT PANEL: SYSTEM (FILE TREE + DEBUG) --- */}
            <div className="w-full h-1/3 md:h-full md:w-[350px] lg:w-[400px] bg-gradient-to-b from-[#0f0033] to-[#1a0b40] border-r border-[#6D28D9]/20 flex flex-col relative z-20 shadow-2xl">
                {/* Header */}
                <div className="h-14 border-b border-[#6D28D9]/20 flex items-center px-6 gap-3 bg-[#0f0033]">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-auto font-mono text-xs text-[#6D28D9]">arch_engine.py</span>
                </div>

                {/* File Tree */}
                <div className="p-6 border-b border-[#6D28D9]/20 bg-[#1a0b40]/50">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                        <FolderOpen className="w-4 h-4 text-blue-500" />
                        <span>/{projectData.name.toLowerCase().replace(/\s/g, '_') || 'root'}</span>
                    </div>
                    <div className="pl-6 space-y-2 text-xs font-mono text-zinc-600 transition-all">
                        <div className={`flex items-center gap-2 ${stage !== 'INIT' ? 'text-zinc-300' : ''}`}>
                            <Layout className="w-3 h-3" /> index.html
                        </div>
                        <div className={`flex items-center gap-2 ${projectData.category ? 'text-purple-500' : ''}`}>
                            <Code className="w-3 h-3" /> theme_{projectData.category.toLowerCase() || 'default'}.css
                        </div>
                        {projectData.location && (
                            <div className="flex items-center gap-2 text-cyan-600"><MapPin className="w-3 h-3" /> geo_config.ts</div>
                        )}
                        <div className={`flex items-center gap-2 ${designConfig.effects.fluid ? 'text-purple-400' : 'text-zinc-600'}`}>
                            <Cpu className="w-3 h-3" /> fluid_shader.glsl
                        </div>
                        <div className={`flex items-center gap-2 ${stage === 'FINISHED' ? 'text-emerald-500 animate-pulse' : ''}`}>
                            <ShieldCheck className="w-3 h-3" /> security_headers.json
                        </div>
                        <div className={`flex items-center gap-2 ${designConfig.sections.length > 0 ? 'text-indigo-400' : 'text-zinc-600'}`}>
                            <FileJson className="w-3 h-3" /> sections_config.json ({designConfig.sections.length})
                        </div>
                    </div>
                </div>

                {/* Live Logs Terminal */}
                <div className="flex-1 p-6 overflow-hidden flex flex-col font-mono text-xs">
                    <div className="text-zinc-500 mb-4 uppercase tracking-widest text-[10px] font-bold flex justify-between">
                        <span>System Output (Debug)</span>
                        <span className="text-emerald-500 animate-pulse">● ONLINE</span>
                    </div>
                    <div className="space-y-3 overflow-y-auto flex-1 text-zinc-300/80 font-mono leading-relaxed pb-4 scrollbar-thin scrollbar-thumb-purple-500/30">
                        {logs.map((log, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i}
                                className="flex"
                            >
                                {log}
                            </motion.div>
                        ))}
                        <div className="w-2 h-4 bg-emerald-500 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL: CREATIVE (PREVIEW + LAB + CHAT) --- */}
            <div className="flex-1 relative flex flex-col h-2/3 md:h-full bg-[#0f0033]">

                {/* Fluid Background Layer */}
                <div className="absolute inset-0 z-0">
                    {designConfig.effects.fluid && (
                        <FluidBackground
                            config={{ ...FLUID_PRESET_PURRPURR.config, stiffness: 60 }}
                            colors={bgColors}
                            speed={0.005}
                            force={1.0}
                            className="w-full h-full"
                        />
                    )}
                    <div className="absolute inset-0 bg-[#0f0033]/40 pointer-events-none" />
                </div>

                {/* Navigation Preview */}
                <div className="relative z-10 w-full px-8 py-6 flex justify-between items-center border-b border-white/10">
                    <div className={`text-2xl font-bold tracking-tight ${projectData.fontStyle === 'SERIF' ? 'font-serif' : projectData.fontStyle === 'FUTURISTA' ? 'font-mono' : 'font-sans'}`}>
                        {projectData.name}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex gap-6 text-sm font-medium opacity-70">
                            <span>Inicio</span>
                            <span>Nosotros</span>
                            <span>Proyectos</span>
                            <span>Contacto</span>
                        </div>

                        {/* Lab Toggle Button */}
                        {(stage === 'FINISHED' || showLab) && (
                            <button
                                onClick={() => setShowLab(!showLab)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${showLab
                                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                    : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/30'
                                    }`}
                            >
                                <FlaskConical className="w-4 h-4" />
                                <span className="text-xs font-mono font-bold hidden sm:inline">LAB</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative z-10 flex-1 flex overflow-hidden">

                    {/* Design Lab Panel (Collapsible) */}
                    <AnimatePresence>
                        {showLab && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 320, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-full overflow-hidden border-r border-purple-500/20"
                            >
                                <div className="w-[320px] h-full overflow-y-auto p-4">
                                    <DesignLab
                                        config={designConfig}
                                        onConfigChange={handleDesignConfigChange}
                                        onLog={addLog}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Preview Area */}
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center overflow-y-auto">

                        {/* CATEGORY STAGE: ARCHETYPE GRID */}
                        {stage === 'CATEGORY' && (
                            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <h2 className="text-2xl font-light text-white/50 mb-8 uppercase tracking-[0.2em] text-center">Selecciona tu arquetipo</h2>
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full"
                                >
                                    {labLoading ? (
                                        <div className="col-span-4 flex justify-center py-12">
                                            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                                        </div>
                                    ) : archetypes.map((cat: Archetype) => {
                                        const IconComponent = getIcon(cat.icon);
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => handleCategorySelect(cat)}
                                                className="group relative p-6 bg-zinc-900/40 border border-white/10 rounded-2xl hover:bg-zinc-800/60 hover:border-white/30 transition-all flex flex-col items-center gap-4 hover:-translate-y-1"
                                            >
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                                                    <IconComponent className="w-6 h-6" style={{ color: cat.color }} />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="font-bold text-sm tracking-wide mb-1 text-white">{cat.label}</h3>
                                                    <p className="text-[10px] text-zinc-400 leading-tight">{cat.description}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        )}

                        {/* LATER STAGES: LIVE PREVIEW */}
                        {stage !== 'CATEGORY' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={projectData.description + designConfig.colors.primary}
                                className="space-y-6 max-w-4xl"
                            >
                                <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold tracking-widest text-zinc-400">
                                    <span>EST. {new Date().getFullYear()}</span>
                                    <div className="w-8 h-px bg-zinc-600" />
                                    <span>{projectData.location || "COLOMBIA"}</span>
                                </div>

                                <h1
                                    className={`text-5xl md:text-8xl tracking-tighter drop-shadow-xl ${projectData.fontStyle === 'SERIF' ? 'font-serif' : projectData.fontStyle === 'FUTURISTA' ? 'font-mono' : 'font-sans'}`}
                                    style={{ color: designConfig.colors.accent }}
                                >
                                    {projectData.name === 'Purrpurr Project' ? 'TU MARCA AQUÍ' : projectData.name}
                                </h1>

                                <p className="text-lg md:text-2xl text-zinc-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                                    {projectData.description}
                                </p>

                                {/* Active Sections Display */}
                                {designConfig.sections.length > 0 && stage === 'FINISHED' && (
                                    <div className="flex flex-wrap justify-center gap-2 pt-4">
                                        {designConfig.sections.map((section, i) => (
                                            <span
                                                key={section}
                                                className="px-3 py-1 text-[10px] font-mono rounded-full border"
                                                style={{
                                                    borderColor: `${designConfig.colors.primary}40`,
                                                    background: `${designConfig.colors.primary}10`,
                                                    color: designConfig.colors.accent
                                                }}
                                            >
                                                {section}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* WhatsApp CTA */}
                                {projectData.whatsapp && (
                                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pt-8">
                                        <button className="bg-[#25D366] text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center gap-3 mx-auto">
                                            <Phone className="w-5 h-5" />
                                            Contactar por WhatsApp
                                        </button>
                                        <p className="mt-4 text-xs text-zinc-500 font-mono opacity-60">
                                            Conexión Segura vía API: +{projectData.whatsapp}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* CHAT INTERFACE (Solo Textos) */}
                <div className="relative z-20 p-6 md:p-8 w-full max-w-3xl mx-auto">
                    <div className={`backdrop-blur-md rounded-2xl border p-4 shadow-2xl ${designConfig.effects.glassmorphism ? 'bg-[#0f0033]/60' : 'bg-[#0f0033]/90'} border-white/10`}>
                        <div className="mb-4 flex items-start gap-3">
                            <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center shrink-0">
                                <Terminal className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="text-sm text-emerald-200 font-mono leading-relaxed mt-1 whitespace-pre-line">
                                {botMessage}
                            </div>
                        </div>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b border-zinc-700 p-2 text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder={stage === 'CATEGORY' ? "Selecciona una opción arriba..." : stage === 'FINISHED' ? "Edita textos aquí... (ej: 'nuevo título', 'cambiar nombre')" : "Escribe tu respuesta..."}
                            disabled={stage === 'CATEGORY'}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleInput(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }
                            }}
                            autoFocus
                        />
                        <div className="mt-2 text-[10px] text-zinc-600 font-mono text-right flex justify-end gap-4">
                            <span>FASE: {stage}</span>
                            <span>MODO: {stage === 'FINISHED' ? 'TEXTO' : 'GUIADO'}</span>
                            {showLab && <span className="text-purple-400">🧪 LAB ACTIVO</span>}
                        </div>
                    </div>
                </div>

                {/* CHECKOUT BAR */}
                <CheckoutBar isVisible={stage === 'FINISHED' || projectData.complexity === 'HIGH'} projectData={projectData} editingSlug={editingSlug || undefined} />
            </div>

        </div>
    );
}
