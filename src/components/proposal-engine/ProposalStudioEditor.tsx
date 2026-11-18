'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    CheckCircle2,
    Copy,
    Cpu,
    Download,
    Eye,
    FileCode2,
    FileText,
    History,
    Layers,
    Lock,
    Plus,
    Printer,
    RefreshCw,
    ShieldCheck,
    Sliders,
    Trash2,
} from 'lucide-react';
import {
    ALL_APPROVED_TEMPLATE_IDS,
    APPROVED_TEMPLATES,
} from '@/lib/proposal-engine/templatesRegistry';
import { calculateCommercialData, formatCOP } from '@/lib/proposal-engine/commercial';
import {
    createVisualConfiguration,
    SECTOR_ART_DIRECTIONS,
    VARIATION_GOVERNANCE_RULES,
} from '@/lib/proposal-engine/identity';
import {
    duplicateProposalPage,
    planProposalPages,
    removeProposalPage,
    reorderProposalPage,
    switchPageTemplate,
} from '@/lib/proposal-engine/planner';
import { regenerateSinglePageAsset } from '@/lib/proposal-engine/assetEngine';
import { runQualityControl } from '@/lib/proposal-engine/qualityControl';
import {
    createProposalFromInput,
    freezeImmutableVersion,
    getSeedProposals,
} from '@/lib/proposal-engine/store';
import type {
    ApprovedTemplateId,
    ProjectSector,
    Proposal,
} from '@/lib/proposal-engine/types';
import {
    ProposalEnginePillarsBar,
    ProposalTemplateRenderer,
} from './ProposalEngineComponents';

type StudioZone = 'informacion' | 'paginas' | 'canvas' | 'propiedades' | 'produccion';

const ZONES: Array<{ id: StudioZone; number: string; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'informacion', number: 'Z1', label: 'Información', icon: Sliders },
    { id: 'paginas', number: 'Z2', label: 'Páginas', icon: Layers },
    { id: 'canvas', number: 'Z3', label: 'Canvas A4', icon: Eye },
    { id: 'propiedades', number: 'Z4', label: 'Propiedades', icon: Cpu },
    { id: 'produccion', number: 'Z5', label: 'Producción', icon: ShieldCheck },
];

export interface ProposalStudioEditorProps {
    initialProposalId?: string;
    apiBasePath?: string;
}

function ScaledA4Sheet({
    proposal,
    pageNumber,
    selectedPackageIndex,
    onSelectPackageIndex,
}: {
    proposal: Proposal;
    pageNumber: number;
    selectedPackageIndex: number | null;
    onSelectPackageIndex: (idx: number) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const available = containerRef.current.clientWidth;
            const nextScale = available > 0 ? Math.min(1, available / 794) : 1;
            setScale(nextScale);
        };
        updateScale();
        const obs = new ResizeObserver(updateScale);
        if (containerRef.current) obs.observe(containerRef.current);
        window.addEventListener('resize', updateScale);
        return () => {
            obs.disconnect();
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    const page = proposal.pages.find((p) => p.pageNumber === pageNumber) || proposal.pages[0];
    if (!page) return null;

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center">
            <div
                style={{
                    width: `${Math.round(794 * scale)}px`,
                    height: `${Math.round(1123 * scale)}px`,
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        width: '794px',
                        height: '1123px',
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    <ProposalTemplateRenderer
                        proposal={proposal}
                        page={page}
                        totalPages={proposal.pages.length}
                        selectedPackageIndex={selectedPackageIndex}
                        onSelectPackageIndex={onSelectPackageIndex}
                    />
                </div>
            </div>
        </div>
    );
}

export default function ProposalStudioEditor({
    initialProposalId,
    apiBasePath = '/api/proposal-engine',
}: ProposalStudioEditorProps) {
    const [proposals, setProposals] = useState<Proposal[]>(() => getSeedProposals());
    const [activeProposalId, setActiveProposalId] = useState<string>(() => {
        const seeds = getSeedProposals();
        if (initialProposalId && seeds.some((p) => p.id === initialProposalId || p.code === initialProposalId)) {
            const found = seeds.find((p) => p.id === initialProposalId || p.code === initialProposalId);
            return found!.id;
        }
        return seeds[0].id;
    });
    const [activeZone, setActiveZone] = useState<StudioZone>('canvas');
    const [activePageNumber, setActivePageNumber] = useState<number>(1);
    const [canvasViewMode, setCanvasViewMode] = useState<'single' | 'all'>('single');
    const [selectedPackageIndex, setSelectedPackageIndex] = useState<number | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('Motor inicializado · 15 plantillas fijas y QC 4 niveles activos.');
    const [newVersionLabel, setNewVersionLabel] = useState<string>('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [draftClientName, setDraftClientName] = useState('');
    const [draftClientCompany, setDraftClientCompany] = useState('');
    const [draftProjectTitle, setDraftProjectTitle] = useState('');
    const [draftSector, setDraftSector] = useState<ProjectSector>('software');
    const [draftPrice, setDraftPrice] = useState('1800000');

    // Sync from API if available (non-blocking)
    useEffect(() => {
        let cancelled = false;
        fetch(`${apiBasePath}/proposals`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (!cancelled && data?.proposals?.length) {
                    setProposals(data.proposals);
                }
            })
            .catch(() => {
                // Local seed state remains active cleanly
            });
        return () => {
            cancelled = true;
        };
    }, [apiBasePath]);

    const activeProposal = useMemo(
        () => proposals.find((p) => p.id === activeProposalId) || proposals[0],
        [proposals, activeProposalId],
    );

    const activePage = useMemo(
        () =>
            activeProposal.pages.find((p) => p.pageNumber === activePageNumber) ||
            activeProposal.pages[0],
        [activeProposal, activePageNumber],
    );

    const qcReport = useMemo(() => runQualityControl(activeProposal), [activeProposal]);

    const updateActiveProposal = (updater: (current: Proposal) => Proposal, note?: string) => {
        setProposals((prev) =>
            prev.map((item) => {
                if (item.id !== activeProposal.id) return item;
                return updater(item);
            }),
        );
        if (note) setStatusMessage(note);
    };

    const handleSectorChange = (sector: ProjectSector) => {
        updateActiveProposal((curr) => {
            const nextVisual = createVisualConfiguration(sector, curr.visualConfig.colorVariant);
            const nextProp: Proposal = {
                ...curr,
                project: {
                    ...curr.project,
                    sector,
                },
                visualConfig: nextVisual,
            };
            return planProposalPages(
                {
                    ...nextProp,
                    pages: nextProp.pages.map((p) => ({ ...p, assets: [] })),
                },
                curr.adaptiveMode,
            );
        }, `Dirección de arte cambiada a sector ${SECTOR_ART_DIRECTIONS[sector].label} manteniendo identidad institucional Capa 1.`);
    };

    const handleAdaptiveModeChange = (mode: 'compact-5' | 'expanded-9') => {
        updateActiveProposal(
            (curr) => planProposalPages(curr, mode),
            `ProposalPlanner recalibró el dossier a ${mode === 'compact-5' ? '5 páginas ejecutivas' : '9 páginas extendidas'}.`,
        );
        setActivePageNumber(1);
    };

    const handleItemPriceChange = (itemId: string, nextUnitPrice: number) => {
        updateActiveProposal((curr) => {
            const nextCommercial = calculateCommercialData({
                issueDate: curr.commercialData.issueDate,
                validDays: curr.commercialData.validDays,
                discountLabel: curr.commercialData.discounts[0]?.label,
                items: curr.commercialData.items.map((it) =>
                    it.id === itemId
                        ? {
                              ...it,
                              unitPrice: Math.max(0, Math.round(nextUnitPrice)),
                          }
                        : it,
                ),
                paymentMethods: curr.commercialData.paymentMethods,
                alternativePackages: curr.commercialData.alternativePackages,
                legalConditions: curr.commercialData.legalConditions,
                warrantySummary: curr.commercialData.warrantySummary,
            });
            return {
                ...curr,
                updatedAt: new Date().toISOString(),
                commercialData: nextCommercial,
            };
        }, 'Cálculo financiero determinístico recalculado automáticamente.');
    };

    const handleTemplateSwitch = (templateId: ApprovedTemplateId) => {
        if (!activePage) return;
        updateActiveProposal(
            (curr) => switchPageTemplate(curr, activePage.pageNumber, templateId),
            `Página 0${activePage.pageNumber} asignada a plantilla fija "${APPROVED_TEMPLATES[templateId].name}".`,
        );
    };

    const handleRegeneratePageImage = () => {
        if (!activePage) return;
        updateActiveProposal(
            (curr) => regenerateSinglePageAsset(curr, activePage.pageNumber),
            `Asset Engine regeneró el visual de la Página 0${activePage.pageNumber} sin alterar precios ni otras páginas.`,
        );
    };

    const handleFreezeVersion = () => {
        updateActiveProposal(
            (curr) => freezeImmutableVersion(curr, newVersionLabel.trim() || undefined),
            `Nueva versión inmutable V0${activeProposal.version + 1} congelada en historial.`,
        );
        setNewVersionLabel('');
    };

    const handleExportJson = () => {
        const blob = new Blob([JSON.stringify(activeProposal, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeProposal.code}_V0${activeProposal.version}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setStatusMessage(`Snapshot JSON ${activeProposal.code}_V0${activeProposal.version}.json exportado.`);
    };

    const handleCreateProposal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!draftClientName.trim() || !draftProjectTitle.trim()) return;
        const parsedPrice = Math.max(100000, parseInt(draftPrice.replace(/\D/g, ''), 10) || 1800000);
        const created = createProposalFromInput({
            clientName: draftClientName.trim(),
            clientCompany: draftClientCompany.trim() || draftClientName.trim(),
            projectTitle: draftProjectTitle.trim(),
            sector: draftSector,
            items: [
                {
                    title: draftProjectTitle.trim(),
                    description: 'Módulo principal estructurado desde Proposal Studio con garantías y esquema 50/50.',
                    phaseLabel: 'Etapa 1',
                    listUnitPrice: Math.round(parsedPrice * 1.2),
                    unitPrice: parsedPrice,
                },
            ],
        });
        setProposals((prev) => [created, ...prev]);
        setActiveProposalId(created.id);
        setActivePageNumber(1);
        setIsCreateModalOpen(false);
        setDraftClientName('');
        setDraftClientCompany('');
        setDraftProjectTitle('');
        setActiveZone('canvas');
        setStatusMessage(`Nueva propuesta #${created.code} generada y planificada en ${created.pages.length} páginas.`);
    };

    const sectorAccent = activeProposal.visualConfig.palette.sectorAccent;

    return (
        <div className="min-h-screen bg-[#F5EFEB] text-[#0C0908] pb-16">
            {/* Top Studio Ribbon */}
            <div className="bg-[#111111] text-[#F7F7F5] border-b border-white/10 px-4 sm:px-6 py-4">
                <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#F7F7F5] px-2.5 py-1.5 rounded flex items-center gap-2 shrink-0">
                            <img src="/brand/purrpurrlogo.png" alt="purrpurr.dev" className="h-4 w-auto object-contain" />
                            <span className="text-[10px] font-mono text-[#777777]">×</span>
                            <img src="/brand/speedlight-logo-black-ui.png" alt="Speedlight Culture" className="h-3.5 w-auto object-contain" />
                        </div>
                        <div>
                            <div className="text-[10px] font-mono uppercase tracking-[0.16em]" style={{ color: sectorAccent }}>
                                PURRPURR.DEV — PROPOSAL STUDIO v1.0
                            </div>
                            <h1 className="text-[18px] sm:text-[20px] font-bold tracking-tight text-white leading-tight">
                                Motor Editorial de Propuestas Multipágina A4
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <select
                            value={activeProposal.id}
                            onChange={(e) => {
                                setActiveProposalId(e.target.value);
                                setActivePageNumber(1);
                                setSelectedPackageIndex(null);
                            }}
                            className="bg-[#1E1E1E] border border-white/15 text-[#F7F7F5] text-xs font-mono px-3 py-2 focus:outline-none"
                            aria-label="Seleccionar propuesta"
                        >
                            {proposals.map((prop) => (
                                <option key={prop.id} value={prop.id}>
                                    #{prop.code} · {prop.project.sector.toUpperCase()} · {prop.client.name}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen((prev) => !prev)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold bg-[#9B5CFF] text-[#111111] hover:opacity-90 cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Nueva Propuesta
                        </button>

                        {activeProposal.pdfUrl && (
                            <a
                                href={activeProposal.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold bg-white text-[#111111] hover:bg-[#E7E7E5]"
                            >
                                <Download className="w-3.5 h-3.5" />
                                PDF Vectorial ({activeProposal.pages.length}p)
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Architecture 3-Pillars Summary & Status Bar */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-4 space-y-3">
                <ProposalEnginePillarsBar proposal={activeProposal} />

                <div className="bg-white border border-[#0C0908]/10 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <div className="flex items-center gap-2 text-[#111111]">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: qcReport.overallPassed ? '#10B981' : '#FF9800' }} />
                        <span>{statusMessage}</span>
                    </div>
                    <div className="text-[#524844]">
                        QC SCORE: <strong className="text-[#111111]">{qcReport.scorePercentage}%</strong> · V0{activeProposal.version} · {formatCOP(activeProposal.commercialData.grandTotal)}
                    </div>
                </div>

                {/* New Proposal Quick Input Form (01 · INPUT MANAGER) */}
                {isCreateModalOpen && (
                    <form
                        onSubmit={handleCreateProposal}
                        className="bg-white border border-[#111111] p-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-end"
                    >
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                Cliente / Titular
                            </label>
                            <input
                                type="text"
                                required
                                value={draftClientName}
                                onChange={(e) => setDraftClientName(e.target.value)}
                                placeholder="Ej. Carlos Mendoza"
                                className="w-full border border-[#0C0908]/20 px-3 py-2 text-xs bg-[#F7F7F5]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                Empresa / Taller
                            </label>
                            <input
                                type="text"
                                value={draftClientCompany}
                                onChange={(e) => setDraftClientCompany(e.target.value)}
                                placeholder="Ej. Apex Motorsport"
                                className="w-full border border-[#0C0908]/20 px-3 py-2 text-xs bg-[#F7F7F5]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                Sector (Arte Capa 2)
                            </label>
                            <select
                                value={draftSector}
                                onChange={(e) => setDraftSector(e.target.value as ProjectSector)}
                                className="w-full border border-[#0C0908]/20 px-2.5 py-2 text-xs bg-[#F7F7F5]"
                            >
                                <option value="software">Software / SaaS</option>
                                <option value="automotive">Automotriz / PPF</option>
                                <option value="branding">Branding / Identidad</option>
                                <option value="architecture">Arquitectura / Studio</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                Proyecto & Valor COP
                            </label>
                            <div className="flex gap-1.5">
                                <input
                                    type="text"
                                    required
                                    value={draftProjectTitle}
                                    onChange={(e) => setDraftProjectTitle(e.target.value)}
                                    placeholder="Nombre proyecto"
                                    className="w-2/3 border border-[#0C0908]/20 px-2.5 py-2 text-xs bg-[#F7F7F5]"
                                />
                                <input
                                    type="number"
                                    value={draftPrice}
                                    onChange={(e) => setDraftPrice(e.target.value)}
                                    className="w-1/3 border border-[#0C0908]/20 px-2 py-2 text-xs bg-[#F7F7F5]"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-[#111111] text-white text-xs font-mono font-bold py-2 px-3 cursor-pointer"
                            >
                                Generar 5 Págs
                            </button>
                        </div>
                    </form>
                )}

                {/* 5-Zone Navigation Bar — Always 100% visible without horizontal scroll */}
                <div className="grid grid-cols-5 gap-1.5 bg-white border border-[#0C0908]/10 p-1.5">
                    {ZONES.map((zone) => {
                        const Icon = zone.icon;
                        const active = activeZone === zone.id;
                        return (
                            <button
                                key={zone.id}
                                type="button"
                                onClick={() => setActiveZone(zone.id)}
                                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1.5 text-[10px] sm:text-xs font-mono font-bold transition-colors cursor-pointer ${
                                    active
                                        ? 'bg-[#111111] text-[#F7F7F5]'
                                        : 'bg-[#F7F7F5] text-[#524844] hover:text-[#111111]'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5 shrink-0" />
                                <span>
                                    <span className="hidden md:inline">{zone.number} · </span>
                                    {zone.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Studio Workspace */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-4 grid grid-cols-1 xl:grid-cols-12 gap-5">
                {/* LEFT PANEL: Context Controls for Zones 1, 2, 4, 5 OR Quick Page Strip in Zone 3 */}
                <div className={activeZone === 'canvas' ? 'xl:col-span-3 space-y-3' : 'xl:col-span-6 space-y-4'}>
                    {/* ZONA 1 · INFORMACIÓN */}
                    {activeZone === 'informacion' && (
                        <section className="bg-white border border-[#0C0908]/10 p-4 space-y-4">
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#5E2EC4] font-bold">
                                    ZONA 1 · INFORMACIÓN & MOTOR COMERCIAL
                                </div>
                                <h2 className="text-base font-bold mt-0.5">
                                    Identidad Mixta, Sector y Cálculos Determinísticos
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                        Cliente
                                    </label>
                                    <input
                                        type="text"
                                        value={activeProposal.client.name}
                                        onChange={(e) =>
                                            updateActiveProposal((curr) => ({
                                                ...curr,
                                                client: { ...curr.client, name: e.target.value },
                                            }))
                                        }
                                        className="w-full border border-[#0C0908]/15 px-3 py-2 text-xs bg-[#F7F7F5]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                        Empresa
                                    </label>
                                    <input
                                        type="text"
                                        value={activeProposal.client.company}
                                        onChange={(e) =>
                                            updateActiveProposal((curr) => ({
                                                ...curr,
                                                client: { ...curr.client, company: e.target.value },
                                            }))
                                        }
                                        className="w-full border border-[#0C0908]/15 px-3 py-2 text-xs bg-[#F7F7F5]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                    Título del Proyecto
                                </label>
                                <input
                                    type="text"
                                    value={activeProposal.project.title}
                                    onChange={(e) =>
                                        updateActiveProposal((curr) => ({
                                            ...curr,
                                            project: { ...curr.project, title: e.target.value },
                                            pages: curr.pages.map((p) =>
                                                p.pageNumber === 1
                                                    ? { ...p, contentData: { ...p.contentData, headline: e.target.value } }
                                                    : p,
                                            ),
                                        }))
                                    }
                                    className="w-full border border-[#0C0908]/15 px-3 py-2 text-xs bg-[#F7F7F5]"
                                />
                            </div>

                            {/* Sector Art Direction Switcher */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                        Dirección de Arte (Capa 2 MIXED)
                                    </label>
                                    <select
                                        value={activeProposal.project.sector}
                                        onChange={(e) => handleSectorChange(e.target.value as ProjectSector)}
                                        className="w-full border border-[#0C0908]/15 px-3 py-2 text-xs bg-[#F7F7F5] font-mono"
                                    >
                                        <option value="software">software (#9B5CFF)</option>
                                        <option value="automotive">automotive (#FF9800)</option>
                                        <option value="branding">branding (#9B5CFF)</option>
                                        <option value="architecture">architecture (#C2410C)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                        Extensión Adaptativa (Planner)
                                    </label>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleAdaptiveModeChange('compact-5')}
                                            className={`py-2 text-xs font-mono font-bold border cursor-pointer ${
                                                activeProposal.adaptiveMode === 'compact-5'
                                                    ? 'bg-[#111111] text-white border-[#111111]'
                                                    : 'bg-[#F7F7F5] text-[#524844] border-[#0C0908]/15'
                                            }`}
                                        >
                                            5 Págs (Compacta)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAdaptiveModeChange('expanded-9')}
                                            className={`py-2 text-xs font-mono font-bold border cursor-pointer ${
                                                activeProposal.adaptiveMode === 'expanded-9'
                                                    ? 'bg-[#111111] text-white border-[#111111]'
                                                    : 'bg-[#F7F7F5] text-[#524844] border-[#0C0908]/15'
                                            }`}
                                        >
                                            9 Págs (Compleja)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Deterministic Financial Items Editor */}
                            <div className="space-y-2 pt-2 border-t border-[#0C0908]/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase font-bold text-[#111111]">
                                        Ítems Comerciales (Cálculo Determinístico COP)
                                    </span>
                                    <span className="text-[11px] font-mono font-bold text-[#5E2EC4]">
                                        Total: {formatCOP(activeProposal.commercialData.grandTotal)}
                                    </span>
                                </div>
                                {activeProposal.commercialData.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-[#F7F7F5] border border-[#0C0908]/10 p-2.5 flex items-center justify-between gap-3"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs font-bold text-[#111111]">{item.title}</div>
                                            <div className="text-[10px] font-mono text-[#777777]">
                                                {item.phaseLabel} · Lista {formatCOP(item.listUnitPrice)}
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            step={50000}
                                            value={item.unitPrice}
                                            onChange={(e) =>
                                                handleItemPriceChange(item.id, Number(e.target.value))
                                            }
                                            className="w-32 border border-[#0C0908]/20 bg-white px-2.5 py-1.5 text-xs font-mono font-bold text-right"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ZONA 2 · PÁGINAS & Navegación lateral en Canvas */}
                    {(activeZone === 'paginas' || activeZone === 'canvas') && (
                        <section className="bg-white border border-[#0C0908]/10 p-3.5 space-y-2.5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#5E2EC4] font-bold">
                                        ZONA 2 · PÁGINAS ADAPTATIVAS ({activeProposal.pages.length})
                                    </div>
                                    <div className="text-xs font-bold">Estructura del Expediente A4</div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                {activeProposal.pages.map((p, idx) => {
                                    const selected = p.pageNumber === activePageNumber;
                                    return (
                                        <div
                                            key={p.id}
                                            onClick={() => setActivePageNumber(p.pageNumber)}
                                            className={`p-2.5 border transition-colors cursor-pointer ${
                                                selected
                                                    ? 'bg-[#111111] text-[#F7F7F5] border-[#111111]'
                                                    : 'bg-[#F7F7F5] text-[#111111] border-[#0C0908]/10 hover:border-[#111111]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span
                                                        className="px-1.5 py-0.5 text-[9px] font-mono font-bold shrink-0"
                                                        style={{
                                                            backgroundColor: selected ? sectorAccent : '#E7E7E5',
                                                            color: '#111111',
                                                        }}
                                                    >
                                                        0{p.pageNumber}
                                                    </span>
                                                    <span className="text-xs font-bold">{p.title}</span>
                                                </div>
                                                <span className="text-[9px] font-mono uppercase opacity-75 shrink-0">
                                                    {p.editorialStatus}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/10">
                                                <span className="text-[9px] font-mono opacity-75">
                                                    {p.templateId}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        disabled={idx === 0}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateActiveProposal((curr) =>
                                                                reorderProposalPage(curr, p.pageNumber, 'up'),
                                                            );
                                                        }}
                                                        className="p-1 opacity-75 hover:opacity-100 disabled:opacity-25 cursor-pointer"
                                                        title="Subir página"
                                                    >
                                                        <ArrowUp className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={idx === activeProposal.pages.length - 1}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateActiveProposal((curr) =>
                                                                reorderProposalPage(curr, p.pageNumber, 'down'),
                                                            );
                                                        }}
                                                        className="p-1 opacity-75 hover:opacity-100 disabled:opacity-25 cursor-pointer"
                                                        title="Bajar página"
                                                    >
                                                        <ArrowDown className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateActiveProposal((curr) =>
                                                                duplicateProposalPage(curr, p.pageNumber),
                                                            );
                                                        }}
                                                        className="p-1 opacity-75 hover:opacity-100 cursor-pointer"
                                                        title="Duplicar página"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </button>
                                                    {activeProposal.pages.length > 2 && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateActiveProposal((curr) =>
                                                                    removeProposalPage(curr, p.pageNumber),
                                                                );
                                                                setActivePageNumber(1);
                                                            }}
                                                            className="p-1 opacity-75 hover:text-red-400 cursor-pointer"
                                                            title="Eliminar página"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* ZONA 4 · PROPIEDADES (Template Switcher, Copy Editor, Asset Regeneration, Institutional Locks) */}
                    {activeZone === 'propiedades' && activePage && (
                        <section className="bg-white border border-[#0C0908]/10 p-4 space-y-4">
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#5E2EC4] font-bold">
                                    ZONA 4 · PROPIEDADES · PÁGINA 0{activePage.pageNumber}
                                </div>
                                <h2 className="text-base font-bold mt-0.5">
                                    Plantilla Fija, Textos y Regeneración Selectiva
                                </h2>
                            </div>

                            {/* Template Switcher (15 Approved Fixed Templates) */}
                            <div>
                                <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                    Cambiar Plantilla Aprobada (Conservando Contenido)
                                </label>
                                <select
                                    value={activePage.templateId}
                                    onChange={(e) => handleTemplateSwitch(e.target.value as ApprovedTemplateId)}
                                    className="w-full border border-[#0C0908]/20 px-3 py-2 text-xs font-mono bg-[#F7F7F5]"
                                >
                                    {ALL_APPROVED_TEMPLATE_IDS.map((tplId) => (
                                        <option key={tplId} value={tplId}>
                                            [{APPROVED_TEMPLATES[tplId].category.toUpperCase()}] {APPROVED_TEMPLATES[tplId].name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-[11px] text-[#666666] mt-1">
                                    {APPROVED_TEMPLATES[activePage.templateId]?.description}
                                </p>
                            </div>

                            {/* Editorial Copy Controls */}
                            <div className="space-y-2.5 pt-2 border-t border-[#0C0908]/10">
                                <div>
                                    <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                        Titular Principal de Página
                                    </label>
                                    <input
                                        type="text"
                                        value={activePage.contentData.headline}
                                        onChange={(e) =>
                                            updateActiveProposal((curr) => ({
                                                ...curr,
                                                pages: curr.pages.map((p) =>
                                                    p.pageNumber === activePage.pageNumber
                                                        ? {
                                                              ...p,
                                                              editorialStatus: 'review',
                                                              contentData: {
                                                                  ...p.contentData,
                                                                  headline: e.target.value,
                                                              },
                                                          }
                                                        : p,
                                                ),
                                            }))
                                        }
                                        className="w-full border border-[#0C0908]/20 px-3 py-2 text-xs bg-[#F7F7F5]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono uppercase text-[#524844] mb-1">
                                        Texto Narrativo / Lead Editorial
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={activePage.contentData.leadParagraph}
                                        onChange={(e) =>
                                            updateActiveProposal((curr) => ({
                                                ...curr,
                                                pages: curr.pages.map((p) =>
                                                    p.pageNumber === activePage.pageNumber
                                                        ? {
                                                              ...p,
                                                              editorialStatus: 'review',
                                                              contentData: {
                                                                  ...p.contentData,
                                                                  leadParagraph: e.target.value,
                                                              },
                                                          }
                                                        : p,
                                                ),
                                            }))
                                        }
                                        className="w-full border border-[#0C0908]/20 px-3 py-2 text-xs bg-[#F7F7F5]"
                                    />
                                </div>
                            </div>

                            {/* Asset Engine Selective Regeneration */}
                            <div className="bg-[#111111] text-[#F7F7F5] p-3.5 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase font-bold" style={{ color: sectorAccent }}>
                                        04A · ASSET ENGINE (VISUAL BRIEF DE PÁGINA)
                                    </span>
                                    <span className="text-[9px] font-mono text-[#AAAAAA]">
                                        REV #{activePage.assets[0]?.revision || 1}
                                    </span>
                                </div>
                                <div className="text-[11px] text-[#E7E7E5]">
                                    {activePage.visualBrief.subject}
                                </div>
                                <div className="text-[10px] font-mono text-[#999999]">
                                    Estilo: {activePage.visualBrief.style}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRegeneratePageImage}
                                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono font-bold text-[#111111] cursor-pointer"
                                    style={{ backgroundColor: sectorAccent }}
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    Regenerar Imagen Solo de Página 0{activePage.pageNumber}
                                </button>
                            </div>

                            {/* Institutional Variation Governance Lock Table */}
                            <div className="pt-2 border-t border-[#0C0908]/10">
                                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-[#111111] mb-2">
                                    <Lock className="w-3.5 h-3.5 text-[#5E2EC4]" />
                                    Reglas de Bloqueo MIXED (Capa 1 vs Capa 2)
                                </div>
                                <div className="space-y-1">
                                    {VARIATION_GOVERNANCE_RULES.slice(0, 5).map((r) => (
                                        <div
                                            key={r.element}
                                            className="flex items-center justify-between text-[10px] font-mono bg-[#F7F7F5] px-2.5 py-1.5"
                                        >
                                            <span className="font-bold text-[#111111]">{r.element}</span>
                                            <span className="text-[#5E2EC4]">BLOQUEADO</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ZONA 5 · PRODUCCIÓN (4-Level Quality Control, Immutable Versions V01-V04, Export) */}
                    {activeZone === 'produccion' && (
                        <section className="bg-white border border-[#0C0908]/10 p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#5E2EC4] font-bold">
                                        ZONA 5 · PRODUCCIÓN, QC & EXPORTACIÓN
                                    </div>
                                    <h2 className="text-base font-bold mt-0.5">
                                        Control de Calidad en 4 Niveles
                                    </h2>
                                </div>
                                <span
                                    className={`px-2.5 py-1 text-xs font-mono font-bold ${
                                        qcReport.overallPassed
                                            ? 'bg-emerald-700 text-white'
                                            : 'bg-amber-600 text-white'
                                    }`}
                                >
                                    QC {qcReport.scorePercentage}%
                                </span>
                            </div>

                            {/* 4 Levels Grid */}
                            <div className="space-y-2.5">
                                {qcReport.levels.map((level) => (
                                    <div key={level.id} className="border border-[#0C0908]/15 p-3 bg-[#F7F7F5]">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[11px] font-mono font-bold text-[#111111]">
                                                {level.code}. {level.title}
                                            </span>
                                            {level.passed ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> APROBADO
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700">
                                                    <AlertTriangle className="w-3.5 h-3.5" /> REVISAR
                                                </span>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            {level.checks.map((chk) => (
                                                <div key={chk.id} className="text-[10.5px] leading-snug text-[#444444]">
                                                    <span className="font-mono font-bold text-[#111111]">
                                                        {chk.passed ? '✓' : '!'} {chk.label}:
                                                    </span>{' '}
                                                    {chk.detail}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Immutable Version History */}
                            <div className="pt-2 border-t border-[#0C0908]/10 space-y-2">
                                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-[#111111]">
                                    <History className="w-3.5 h-3.5 text-[#5E2EC4]" />
                                    Historial Inmutable de Versiones ({activeProposal.versions.length})
                                </div>
                                <div className="space-y-1.5">
                                    {activeProposal.versions.map((ver) => (
                                        <div
                                            key={ver.code}
                                            className="bg-[#F7F7F5] border border-[#0C0908]/10 p-2.5 flex items-start justify-between gap-3"
                                        >
                                            <div>
                                                <div className="text-xs font-bold text-[#111111]">{ver.label}</div>
                                                <div className="text-[10.5px] text-[#555555]">{ver.summary}</div>
                                                <div className="text-[9px] font-mono text-[#777777] mt-0.5">
                                                    {ver.code} · {ver.snapshotHash}
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-[#111111] whitespace-nowrap">
                                                {formatCOP(ver.grandTotal)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-2 pt-1">
                                    <input
                                        type="text"
                                        value={newVersionLabel}
                                        onChange={(e) => setNewVersionLabel(e.target.value)}
                                        placeholder="Nombre versión (ej. Ajustes cliente)"
                                        className="flex-1 border border-[#0C0908]/20 px-2.5 py-1.5 text-xs bg-[#F7F7F5]"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleFreezeVersion}
                                        className="px-3 py-1.5 text-xs font-mono font-bold bg-[#111111] text-white cursor-pointer whitespace-nowrap"
                                    >
                                        Congelar V0{activeProposal.version + 1}
                                    </button>
                                </div>
                            </div>

                            {/* Export Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#0C0908]/10">
                                {activeProposal.pdfUrl && (
                                    <a
                                        href={activeProposal.pdfUrl}
                                        download
                                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-mono font-bold bg-[#111111] text-white"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Descargar PDF A4
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={handleExportJson}
                                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-mono font-bold bg-[#F7F7F5] border border-[#0C0908]/20 text-[#111111] cursor-pointer"
                                >
                                    <FileCode2 className="w-3.5 h-3.5" />
                                    Exportar JSON
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-mono font-bold bg-[#F7F7F5] border border-[#0C0908]/20 text-[#111111] cursor-pointer"
                                >
                                    <Printer className="w-3.5 h-3.5" />
                                    Imprimir A4
                                </button>
                            </div>
                        </section>
                    )}
                </div>

                {/* RIGHT / CENTER CANVAS: ZONA 3 · LIVE A4 WYSIWYG VIEWER */}
                <div className={activeZone === 'canvas' ? 'xl:col-span-9 space-y-3' : 'xl:col-span-6 space-y-3'}>
                    <div className="bg-white border border-[#0C0908]/10 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs font-mono">
                            <FileText className="w-4 h-4 text-[#5E2EC4]" />
                            <span className="font-bold">ZONA 3 · CANVAS A4 (210×297mm)</span>
                            {activePage && (
                                <span className="text-[#666666]">
                                    · Pág. 0{activePage.pageNumber}/{String(activeProposal.pages.length).padStart(2, '0')} · {activePage.templateId}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setCanvasViewMode('single')}
                                className={`px-2.5 py-1 text-[10px] font-mono font-bold border cursor-pointer ${
                                    canvasViewMode === 'single'
                                        ? 'bg-[#111111] text-white border-[#111111]'
                                        : 'bg-[#F7F7F5] text-[#524844] border-[#0C0908]/15'
                                }`}
                            >
                                Página Activa
                            </button>
                            <button
                                type="button"
                                onClick={() => setCanvasViewMode('all')}
                                className={`px-2.5 py-1 text-[10px] font-mono font-bold border cursor-pointer ${
                                    canvasViewMode === 'all'
                                        ? 'bg-[#111111] text-white border-[#111111]'
                                        : 'bg-[#F7F7F5] text-[#524844] border-[#0C0908]/15'
                                }`}
                            >
                                Vista Completa ({activeProposal.pages.length})
                            </button>
                        </div>
                    </div>

                    {canvasViewMode === 'single' && activePage ? (
                        <ScaledA4Sheet
                            proposal={activeProposal}
                            pageNumber={activePage.pageNumber}
                            selectedPackageIndex={selectedPackageIndex}
                            onSelectPackageIndex={setSelectedPackageIndex}
                        />
                    ) : (
                        <div className="space-y-6">
                            {activeProposal.pages.map((p) => (
                                <ScaledA4Sheet
                                    key={p.id}
                                    proposal={activeProposal}
                                    pageNumber={p.pageNumber}
                                    selectedPackageIndex={selectedPackageIndex}
                                    onSelectPackageIndex={setSelectedPackageIndex}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
