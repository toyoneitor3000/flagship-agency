'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Palette, Layout, Layers, Sparkles, ChevronDown, ChevronUp,
    Wand2, GripVertical, Type, Loader2, AlertCircle, RefreshCw,
    Star, Users, Image, Quote, Video, Phone, MapPin, Grid, Square, Rows3, Columns,
    CreditCard, HelpCircle, FileText, Mail, Camera, ShoppingBag, Briefcase, Rocket, Coffee, Building, Activity, Zap, Leaf
} from 'lucide-react';

// Icon map to convert string icon names from DB to actual components
const ICON_MAP: Record<string, any> = {
    Star, Users, Image, Quote, Video, Phone, MapPin, Grid, Square, Rows3, Columns,
    CreditCard, HelpCircle, FileText, Mail, Camera, ShoppingBag, Briefcase, Rocket,
    Coffee, Building, Activity, Zap, Leaf, Layers
};

const getIcon = (iconName: string | null | undefined) => {
    if (!iconName) return Square;
    return ICON_MAP[iconName] || Square;
};

// --- TYPES ---
interface ColorPalette {
    id: string;
    name: string;
    slug: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    category: string | null;
}

interface LayoutOption {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
}

interface SectionTemplate {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    isPremium: boolean;
}

interface VisualEffect {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    type: string;
    cssClass: string | null;
}

interface GenerativePattern {
    id: string;
    name: string;
    slug: string;
    description: string | null;
}

interface FontPairing {
    id: string;
    name: string;
    displayFont: string;
    bodyFont: string;
    category: string | null;
    tracking: number;
    leading: number;
}

interface DesignLabTools {
    colorPalettes: ColorPalette[];
    layoutOptions: LayoutOption[];
    sectionTemplates: SectionTemplate[];
    visualEffects: VisualEffect[];
    generativePatterns: GenerativePattern[];
    fontPairings: FontPairing[];
}

// --- DESIGN CONFIG (What the user has selected) ---
export interface DesignConfig {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    layout: string;
    sections: string[];
    effects: {
        fluid: boolean;
        particles: boolean;
        glassmorphism: boolean;
        animations: 'NONE' | 'SUBTLE' | 'DYNAMIC';
        pattern?: string;
        overlays?: string[];
    };
    typography?: {
        display: string;
        body: string;
        tracking?: number;
        leading?: number;
    };
}

// --- PROPS ---
interface DesignLabProps {
    config: DesignConfig;
    onConfigChange: (config: DesignConfig) => void;
    onLog?: (message: string, type?: 'info' | 'success' | 'warn' | 'error') => void;
    hasPower?: boolean;
}

export const DesignLab = ({ config, onConfigChange, onLog, hasPower = true }: DesignLabProps) => {
    // --- STATE ---
    const [tools, setTools] = useState<DesignLabTools | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedTab, setExpandedTab] = useState<string | null>('colors');
    const [draggedSection, setDraggedSection] = useState<string | null>(null);

    const log = (msg: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
        onLog?.(msg, type);
    };

    // --- FETCH TOOLS FROM DATABASE ---
    const fetchTools = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/purrpurr-lab/tools');
            if (!res.ok) throw new Error('Failed to load tools');

            const json = await res.json();
            if (json.success) {
                setTools(json.data);
                log(`Lab: Loaded ${json.meta?.totalTools || 0} tools from database`, 'success');
            } else {
                throw new Error(json.error || 'Unknown error');
            }
        } catch (err: any) {
            setError(err.message);
            log(`Lab: Error loading tools - ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTools();
    }, []);

    const toggleTab = (tab: string) => {
        setExpandedTab(expandedTab === tab ? null : tab);
    };

    // --- HANDLERS ---
    const handleColorPresetSelect = (palette: ColorPalette) => {
        onConfigChange({
            ...config,
            colors: {
                primary: palette.primary,
                secondary: palette.secondary,
                accent: palette.accent,
                background: palette.background
            }
        });
        log(`Theme: Applied "${palette.name}" palette`, 'success');
    };

    const handleLayoutSelect = (layout: LayoutOption) => {
        onConfigChange({ ...config, layout: layout.slug.toUpperCase() });
        log(`Layout: Switched to "${layout.name}" mode`, 'success');
    };

    const handleSectionToggle = (section: SectionTemplate) => {
        const sectionId = section.slug.toUpperCase();
        const isActive = config.sections.includes(sectionId);
        const newSections = isActive
            ? config.sections.filter(s => s !== sectionId)
            : [...config.sections, sectionId];

        onConfigChange({ ...config, sections: newSections });
        log(`Sections: ${isActive ? 'Removed' : 'Added'} "${section.name}"`, isActive ? 'warn' : 'success');
    };

    const handleEffectToggle = (effect: keyof DesignConfig['effects'], value: boolean | string) => {
        onConfigChange({
            ...config,
            effects: { ...config.effects, [effect]: value }
        });
        log(`Effects: ${effect} = ${value}`, 'info');
    };

    const handlePatternSelect = (pattern: GenerativePattern) => {
        onConfigChange({
            ...config,
            effects: { ...config.effects, pattern: pattern.slug }
        });
        log(`Pattern: Switched to "${pattern.name}"`, 'success');
    };

    const handleOverlayToggle = (effect: VisualEffect) => {
        const overlays = config.effects.overlays || [];
        const isActive = overlays.includes(effect.slug);
        const newOverlays = isActive
            ? overlays.filter(o => o !== effect.slug)
            : [...overlays, effect.slug];

        onConfigChange({
            ...config,
            effects: { ...config.effects, overlays: newOverlays }
        });
        log(`Overlay: ${effect.name} ${isActive ? 'OFF' : 'ON'}`, 'info');
    };

    const handleFontPairingSelect = (pairing: FontPairing) => {
        onConfigChange({
            ...config,
            typography: {
                display: pairing.displayFont,
                body: pairing.bodyFont,
                tracking: pairing.tracking,
                leading: pairing.leading
            }
        });
        log(`Typography: ${pairing.displayFont} + ${pairing.bodyFont}`, 'success');
    };

    // Drag and drop para reordenar secciones
    const handleDragStart = (sectionId: string) => {
        setDraggedSection(sectionId);
    };

    const handleDragOver = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggedSection || draggedSection === targetId) return;

        const sections = [...config.sections];
        const dragIndex = sections.indexOf(draggedSection);
        const targetIndex = sections.indexOf(targetId);

        if (dragIndex !== -1 && targetIndex !== -1) {
            sections.splice(dragIndex, 1);
            sections.splice(targetIndex, 0, draggedSection);
            onConfigChange({ ...config, sections });
        }
    };

    const handleDragEnd = () => {
        if (draggedSection) {
            log(`Sections: Reordered structure`, 'info');
        }
        setDraggedSection(null);
    };

    // --- TAB COMPONENT ---
    const Tab = ({ id, icon: Icon, label, children }: { id: string; icon: any; label: string; children: React.ReactNode }) => (
        <div className="border-b border-purple-500/20 last:border-b-0">
            <button
                onClick={() => toggleTab(id)}
                className={`w-full px-4 py-3 flex items-center justify-between transition-all ${expandedTab === id ? 'bg-purple-500/10 text-purple-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                </div>
                {expandedTab === id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
                {expandedTab === id && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-black/20">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="bg-zinc-950/80 border border-purple-500/20 rounded-xl p-8 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Cargando herramientas...</p>
            </div>
        );
    }

    // --- ERROR STATE ---
    if (error || !tools) {
        return (
            <div className="bg-zinc-950/80 border border-red-500/20 rounded-xl p-8 flex flex-col items-center justify-center gap-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <p className="text-xs font-mono text-red-400 uppercase tracking-wider">{error || 'Error loading tools'}</p>
                <button
                    onClick={fetchTools}
                    className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                    <RefreshCw className="w-4 h-4" /> Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950/80 border border-purple-500/20 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 px-4 py-3 border-b border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#8B5CF6]" />
                    <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest flex items-center gap-2">
                        <Wand2 className="w-3 h-3" />
                        Laboratorio de Diseño
                    </span>
                </div>
                <button
                    onClick={fetchTools}
                    className="text-zinc-500 hover:text-purple-400 transition-colors"
                    title="Recargar herramientas"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Tabs */}
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">

                {/* 🎨 COLORES */}
                <Tab id="colors" icon={Palette} label="Paleta de Colores">
                    <div className="grid grid-cols-4 gap-2">
                        {tools.colorPalettes?.map((palette) => (
                            <button
                                key={palette.id}
                                onClick={() => handleColorPresetSelect(palette)}
                                className={`group relative p-2 rounded-lg border transition-all ${config.colors.primary === palette.primary
                                    ? 'border-purple-500 bg-purple-500/20'
                                    : 'border-white/10 hover:border-white/30 bg-white/5'
                                    }`}
                                title={palette.name}
                            >
                                <div className="flex gap-0.5 mb-1.5 justify-center">
                                    <div className="w-3 h-3 rounded-full" style={{ background: palette.primary }} />
                                    <div className="w-3 h-3 rounded-full" style={{ background: palette.accent }} />
                                    <div className="w-3 h-3 rounded-full" style={{ background: palette.secondary }} />
                                </div>
                                <span className="text-[9px] font-mono text-zinc-400 group-hover:text-white block text-center">
                                    {palette.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Custom Color Picker */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-[10px] text-zinc-500 font-mono mb-2">CUSTOM PRIMARY:</p>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={config.colors.primary}
                                onChange={(e) => onConfigChange({
                                    ...config,
                                    colors: { ...config.colors, primary: e.target.value }
                                })}
                                className="w-10 h-8 rounded cursor-pointer bg-transparent border-0"
                            />
                            <input
                                type="text"
                                value={config.colors.primary}
                                onChange={(e) => onConfigChange({
                                    ...config,
                                    colors: { ...config.colors, primary: e.target.value }
                                })}
                                className="flex-1 bg-zinc-900/50 border border-zinc-700 rounded px-2 py-1 text-xs font-mono text-white uppercase"
                                maxLength={7}
                            />
                        </div>
                    </div>
                </Tab>

                {/* 📐 LAYOUT */}
                <Tab id="layout" icon={Layout} label="Estructura">
                    <div className="grid grid-cols-2 gap-2">
                        {tools.layoutOptions?.map((layout) => {
                            const IconComponent = getIcon(layout.icon);
                            return (
                                <button
                                    key={layout.id}
                                    onClick={() => handleLayoutSelect(layout)}
                                    className={`p-3 rounded-lg border text-left transition-all ${config.layout === layout.slug.toUpperCase()
                                        ? 'border-purple-500 bg-purple-500/20'
                                        : 'border-white/10 hover:border-white/30 bg-white/5'
                                        }`}
                                >
                                    <IconComponent className={`w-5 h-5 mb-2 ${config.layout === layout.slug.toUpperCase() ? 'text-purple-400' : 'text-zinc-500'}`} />
                                    <p className="text-xs font-bold text-white">{layout.name}</p>
                                    <p className="text-[10px] text-zinc-500">{layout.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </Tab>

                {/* 🧱 SECCIONES */}
                <Tab id="sections" icon={Layers} label="Secciones">
                    <p className="text-[10px] text-zinc-500 font-mono mb-3">
                        Arrastra para reordenar • Click para activar/desactivar
                    </p>
                    <div className="space-y-2">
                        {tools.sectionTemplates?.map((section) => {
                            const sectionId = section.slug.toUpperCase();
                            const isActive = config.sections?.includes(sectionId);
                            const orderIndex = config.sections?.indexOf(sectionId);
                            const IconComponent = getIcon(section.icon);

                            return (
                                <div
                                    key={section.id}
                                    draggable={isActive}
                                    onDragStart={() => handleDragStart(sectionId)}
                                    onDragOver={(e) => handleDragOver(e, sectionId)}
                                    onDragEnd={handleDragEnd}
                                    onClick={() => handleSectionToggle(section)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isActive
                                        ? 'border-emerald-500/50 bg-emerald-500/10'
                                        : 'border-white/10 bg-white/5 opacity-50 hover:opacity-100'
                                        } ${draggedSection === sectionId ? 'opacity-50 scale-95' : ''}`}
                                >
                                    {isActive && (
                                        <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab" />
                                    )}
                                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-white flex items-center gap-2">
                                            {section.name}
                                            {section.isPremium && (
                                                <span className="text-[8px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">PRO</span>
                                            )}
                                        </p>
                                        <p className="text-[10px] text-zinc-500">{section.description}</p>
                                    </div>
                                    {isActive && (
                                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                                            #{orderIndex + 1}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Tab>

                {/* ✨ EFECTOS */}
                <Tab id="effects" icon={Sparkles} label="Efectos Visuales">
                    <div className="space-y-4">
                        {/* Toggles principales */}
                        <div className="space-y-2">
                            <EffectToggle
                                label="Fondo Fluido"
                                description="Gradientes animados WebGL"
                                active={config.effects.fluid}
                                onChange={(v) => handleEffectToggle('fluid', v)}
                            />
                            <EffectToggle
                                label="Partículas"
                                description="Efecto de partículas flotantes"
                                active={config.effects.particles}
                                onChange={(v) => handleEffectToggle('particles', v)}
                            />
                            <EffectToggle
                                label="Glassmorphism"
                                description="Efecto cristal en cards"
                                active={config.effects.glassmorphism}
                                onChange={(v) => handleEffectToggle('glassmorphism', v)}
                            />
                        </div>

                        {/* Generative Patterns */}
                        <div className="pt-3 border-t border-white/10">
                            <p className="text-[10px] text-zinc-500 font-mono mb-2">PATRÓN GENERATIVO:</p>
                            <div className="grid grid-cols-3 gap-1.5">
                                {tools.generativePatterns?.map((pattern) => (
                                    <button
                                        key={pattern.id}
                                        onClick={() => handlePatternSelect(pattern)}
                                        className={`px-2 py-1.5 rounded text-[10px] font-mono transition-all ${config.effects.pattern === pattern.slug
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'
                                            }`}
                                        title={pattern.description || ''}
                                    >
                                        {pattern.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Overlay Effects */}
                        <div className="pt-3 border-t border-white/10">
                            <p className="text-[10px] text-zinc-500 font-mono mb-2">CAPAS FX:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {tools.visualEffects?.map((effect) => {
                                    const isActive = config.effects.overlays?.includes(effect.slug);
                                    return (
                                        <button
                                            key={effect.id}
                                            onClick={() => handleOverlayToggle(effect)}
                                            className={`px-2 py-1 rounded text-[9px] font-mono uppercase transition-all ${isActive
                                                ? 'bg-emerald-500/80 text-white'
                                                : 'bg-zinc-800/50 text-zinc-500 hover:text-zinc-300'
                                                }`}
                                            title={effect.description || ''}
                                        >
                                            {effect.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Animation Level */}
                        <div className="pt-3 border-t border-white/10">
                            <p className="text-[10px] text-zinc-500 font-mono mb-2">NIVEL DE ANIMACIÓN:</p>
                            <div className="flex gap-2">
                                {(['NONE', 'SUBTLE', 'DYNAMIC'] as const).map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => handleEffectToggle('animations', level)}
                                        className={`flex-1 p-2 rounded-lg border text-center transition-all ${config.effects.animations === level
                                            ? 'border-purple-500 bg-purple-500/20'
                                            : 'border-white/10 bg-white/5'
                                            }`}
                                    >
                                        <span className="text-[10px] font-mono">{level}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Tab>

                {/* 🔤 TIPOGRAFÍA */}
                <Tab id="typography" icon={Type} label="Tipografía">
                    <div className="space-y-4">
                        <p className="text-[10px] text-zinc-500 font-mono mb-2">
                            COMBINACIONES RECOMENDADAS:
                        </p>
                        <div className="space-y-2">
                            {tools.fontPairings?.map((pairing) => {
                                const isActive = config.typography?.display === pairing.displayFont;
                                return (
                                    <button
                                        key={pairing.id}
                                        onClick={() => handleFontPairingSelect(pairing)}
                                        className={`w-full p-3 rounded-lg border text-left transition-all ${isActive
                                            ? 'border-purple-500 bg-purple-500/20'
                                            : 'border-white/10 bg-white/5 hover:border-white/30'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-white">{pairing.displayFont}</p>
                                                <p className="text-[10px] text-zinc-500">+ {pairing.bodyFont}</p>
                                            </div>
                                            <span className="text-[9px] font-mono text-zinc-600 uppercase">
                                                {pairing.category}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </Tab>

                {/* --- POWER OVERLAY (LOCKED STATE) --- */}
                {!hasPower && (
                    <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
                            <Zap className="w-8 h-8 text-white animate-pulse" />
                        </div>
                        <h3 className="text-xl font-light text-white uppercase tracking-[0.3em] mb-2">Poder Bloqueado</h3>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed mb-8">
                            Estás en el plan estático. <br />
                            Adquiere acceso al Laboratorio para modificar la química de tu diseño.
                        </p>
                        <a
                            href="/checkout?plan=diy"
                            className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all font-sans"
                        >
                            Obtener el Poder
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- TOGGLE COMPONENT ---
const EffectToggle = ({
    label,
    description,
    active,
    onChange
}: {
    label: string;
    description: string;
    active: boolean;
    onChange: (value: boolean) => void;
}) => (
    <div
        onClick={() => onChange(!active)}
        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${active ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-white/5'
            }`}
    >
        <div>
            <p className="text-xs font-bold text-white">{label}</p>
            <p className="text-[10px] text-zinc-500">{description}</p>
        </div>
        <div className={`w-10 h-5 rounded-full transition-colors relative ${active ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${active ? 'left-5' : 'left-0.5'}`} />
        </div>
    </div>
);

export default DesignLab;
