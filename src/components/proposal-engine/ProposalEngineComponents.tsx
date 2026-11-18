'use client';

import React from 'react';
import {
    CheckCircle2,
    Cpu,
    CreditCard,
    Layers,
    Lock,
    ShieldCheck,
} from 'lucide-react';
import { formatCOP, formatCOPCompact } from '@/lib/proposal-engine/commercial';
import { INSTITUTIONAL_PALETTE, SECTOR_ART_DIRECTIONS } from '@/lib/proposal-engine/identity';
import { APPROVED_TEMPLATES } from '@/lib/proposal-engine/templatesRegistry';
import type {
    Proposal,
    ProposalPage,
} from '@/lib/proposal-engine/types';

// =============================================================================
// PURRPURR.DEV × SPEEDLIGHT CULTURE — DESIGN ENGINE COMPONENTS (Section 2 & 8)
// 8 Institutional Components + 6 Editorial Components + 15 Fixed Templates
// Canvas Geometry: Exact A4 (210mm × 297mm -> 794px × 1123px at 96dpi)
// =============================================================================

export interface TemplateRenderProps {
    proposal: Proposal;
    page: ProposalPage;
    totalPages: number;
    selectedPackageIndex?: number | null;
    onSelectPackageIndex?: (idx: number) => void;
}

function getSectorAccent(proposal: Proposal): string {
    return proposal.visualConfig?.palette?.sectorAccent || INSTITUTIONAL_PALETTE.institutionalPurple;
}

function getSectorDark(proposal: Proposal): string {
    return proposal.visualConfig?.palette?.sectorDark || INSTITUTIONAL_PALETTE.ink;
}

function VectorArrowGlyph({
    direction = 'ne',
    color = '#111111',
    size = 18,
}: {
    direction?: 'ne' | 'se';
    color?: string;
    size?: number;
}) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {direction === 'ne' ? (
                <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke={color}
                    strokeWidth="2.1"
                    strokeLinecap="square"
                />
            ) : (
                <path
                    d="M7 7L17 17M17 17H9M17 17V9"
                    stroke={color}
                    strokeWidth="2.1"
                    strokeLinecap="square"
                />
            )}
        </svg>
    );
}

// =============================================================================
// A. 8 INSTITUTIONAL COMPONENTS (PERMANENT & LOCKED ACROSS ALL PROPOSALS)
// =============================================================================

export function BrandHeader({
    proposal,
    dark = false,
}: {
    proposal: Proposal;
    dark?: boolean;
}) {
    const accent = getSectorAccent(proposal);
    const sectorDir = SECTOR_ART_DIRECTIONS[proposal.project.sector];

    return (
        <header
            className={`flex items-center justify-between pb-3.5 border-b ${
                dark ? 'border-white/15 text-[#F7F7F5]' : 'border-[#E7E7E5] text-[#111111]'
            }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded ${
                        dark ? 'bg-[#F7F7F5]' : 'bg-white border border-[#E7E7E5]'
                    }`}
                >
                    <img
                        src={proposal.brandIdentity.primaryBrand.logoSrc}
                        alt={proposal.brandIdentity.primaryBrand.name}
                        className="h-5 w-auto object-contain"
                    />
                    <span className="font-mono text-xs font-bold text-[#777777]">×</span>
                    <img
                        src={proposal.brandIdentity.partnerBrand.logoSrc}
                        alt={proposal.brandIdentity.partnerBrand.name}
                        className="h-4 w-auto object-contain"
                    />
                </div>
                <div className="flex flex-col">
                    <span
                        className={`text-[10px] font-mono font-bold tracking-[0.16em] uppercase ${
                            dark ? 'text-[#E7E7E5]' : 'text-[#111111]'
                        }`}
                    >
                        PURRPURR.DEV × SPEEDLIGHT CULTURE
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-[#777777]">
                        {sectorDir.badgeLabel}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ProposalID proposal={proposal} dark={dark} />
                <span
                    className="inline-block w-2 h-6 shrink-0"
                    style={{ backgroundColor: accent }}
                />
            </div>
        </header>
    );
}

export function ProposalID({
    proposal,
    dark = false,
}: {
    proposal: Proposal;
    dark?: boolean;
}) {
    return (
        <div className="text-right leading-tight">
            <div
                className={`text-[11px] font-mono font-bold tracking-[0.12em] whitespace-nowrap ${
                    dark ? 'text-[#F7F7F5]' : 'text-[#111111]'
                }`}
            >
                #{proposal.code} · V0{proposal.version}
            </div>
            <div className="text-[9px] font-mono text-[#777777] whitespace-nowrap">
                EMISIÓN {proposal.commercialData.issueDate} · VIGENCIA {proposal.commercialData.validDays}D
            </div>
        </div>
    );
}

export function PageNumber({
    pageNumber,
    totalPages,
    dark = false,
}: {
    pageNumber: number;
    totalPages: number;
    dark?: boolean;
}) {
    const cur = String(pageNumber).padStart(2, '0');
    const tot = String(totalPages).padStart(2, '0');
    return (
        <span
            className={`font-mono text-[10px] font-bold tracking-[0.14em] whitespace-nowrap ${
                dark ? 'text-[#F7F7F5]' : 'text-[#111111]'
            }`}
        >
            PÁG. {cur} / {tot}
        </span>
    );
}

export function SectionTitle({
    code,
    title,
    subtitle,
    accent,
    dark = false,
}: {
    code: string;
    title: string;
    subtitle: string;
    accent: string;
    dark?: boolean;
}) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2.5 mb-1.5">
                <span
                    className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-[0.14em] uppercase text-[#F7F7F5]"
                    style={{ backgroundColor: dark ? accent : '#111111' }}
                >
                    SECCIÓN {code}
                </span>
                <span className="h-[1px] flex-1 bg-[#E7E7E5]" />
                <VectorArrowGlyph direction="se" color={accent} size={16} />
            </div>
            <h2
                className={`text-[24px] leading-[1.08] font-bold tracking-[-0.02em] ${
                    dark ? 'text-[#F7F7F5]' : 'text-[#111111]'
                }`}
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
                {title}
            </h2>
            <p className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#777777] mt-1">
                {subtitle}
            </p>
        </div>
    );
}

export function BrandDivider({ accent }: { accent: string }) {
    return (
        <div className="flex items-center gap-2 my-3">
            <span className="h-[2px] w-10" style={{ backgroundColor: accent }} />
            <span className="h-[1px] flex-1 bg-[#E7E7E5]" />
        </div>
    );
}

export function LegalNotice({ proposal }: { proposal: Proposal }) {
    return (
        <div className="grid grid-cols-3 gap-3 bg-white border border-[#E7E7E5] p-3.5">
            {proposal.commercialData.legalConditions.slice(0, 3).map((cond, idx) => (
                <div key={idx} className="space-y-1">
                    <div className="text-[9px] font-mono font-bold uppercase tracking-[0.1em] text-[#111111]">
                        0{idx + 1} · {cond.title}
                    </div>
                    <p className="text-[10px] leading-[1.35] text-[#555555]">
                        {cond.body}
                    </p>
                </div>
            ))}
        </div>
    );
}

export function SignatureBlock({ proposal }: { proposal: Proposal }) {
    return (
        <div className="grid grid-cols-2 gap-5 pt-3 border-t border-[#E7E7E5]">
            <div className="bg-white border border-[#E7E7E5] p-3.5 flex flex-col justify-between">
                <div className="h-12 flex items-end pb-1 border-b border-[#111111]">
                    <img
                        src={proposal.brandIdentity.signatureSrc}
                        alt={`Firma ${proposal.brandIdentity.issuerRepresentative}`}
                        className="h-11 w-auto object-contain"
                    />
                </div>
                <div className="pt-2">
                    <div className="text-[11px] font-bold text-[#111111]">
                        {proposal.brandIdentity.issuerRepresentative}
                    </div>
                    <div className="text-[9px] font-mono text-[#777777]">
                        Dirección Técnica · purrpurr.dev × Speedlight Culture
                    </div>
                    <div className="text-[9px] font-mono text-[#777777]">
                        {proposal.brandIdentity.issuerDocument}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-[#E7E7E5] p-3.5 flex flex-col justify-between">
                <div className="h-12 flex items-end pb-1.5 border-b border-[#111111]/40">
                    <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-[#777777]">
                        FIRMA DE APROBACIÓN / SELLO CLIENTE
                    </span>
                </div>
                <div className="pt-2">
                    <div className="text-[11px] font-bold text-[#111111]">
                        {proposal.client.name}
                    </div>
                    <div className="text-[9px] font-mono text-[#777777]">
                        {proposal.client.company} · {proposal.client.roleOrArea}
                    </div>
                    <div className="text-[9px] font-mono text-[#777777]">
                        Fecha aceptación: ____ / ____ / 2026
                    </div>
                </div>
            </div>
        </div>
    );
}

export function BrandFooter({
    proposal,
    pageNumber,
    totalPages,
    templateId,
    dark = false,
}: {
    proposal: Proposal;
    pageNumber: number;
    totalPages: number;
    templateId: string;
    dark?: boolean;
}) {
    return (
        <footer
            className={`pt-3 mt-auto border-t flex items-center justify-between text-[9px] font-mono tracking-[0.08em] uppercase ${
                dark ? 'border-white/15 text-[#999999]' : 'border-[#E7E7E5] text-[#777777]'
            }`}
        >
            <div className="flex items-center gap-3 whitespace-nowrap">
                <span className={dark ? 'text-[#F7F7F5] font-bold' : 'text-[#111111] font-bold'}>
                    PURRPURR.DEV × SPEEDLIGHT CULTURE
                </span>
                <span>·</span>
                <span>{proposal.brandIdentity.city}</span>
                <span>·</span>
                <span>PLANTILLA: {templateId}</span>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap">
                <span>#{proposal.code}</span>
                <span>·</span>
                <PageNumber pageNumber={pageNumber} totalPages={totalPages} dark={dark} />
            </div>
        </footer>
    );
}

// =============================================================================
// B. 6 EDITORIAL COMPONENTS + PROGRAMMATIC VECTOR CHARTS & DIAGRAMS
// =============================================================================

export function HeroTitle({
    tag,
    headline,
    subtitle,
    accent,
    dark = false,
}: {
    tag: string;
    headline: string;
    subtitle: string;
    accent: string;
    dark?: boolean;
}) {
    return (
        <div className="space-y-2.5">
            <span
                className="inline-block px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#111111]"
                style={{ backgroundColor: accent }}
            >
                {tag}
            </span>
            <h1
                className={`text-[34px] leading-[1.03] font-bold tracking-[-0.03em] ${
                    dark ? 'text-[#F7F7F5]' : 'text-[#111111]'
                }`}
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
                {headline}
            </h1>
            <p className={`text-[13px] leading-[1.45] max-w-[660px] ${dark ? 'text-[#D0D0CE]' : 'text-[#444444]'}`}>
                {subtitle}
            </p>
        </div>
    );
}

export function InfoCard({
    indexTag,
    title,
    body,
    footerTag,
    accent,
    dark = false,
}: {
    indexTag: string;
    title: string;
    body: string;
    footerTag?: string;
    accent: string;
    dark?: boolean;
}) {
    return (
        <div
            className={`p-3.5 border flex flex-col justify-between ${
                dark
                    ? 'bg-[#181818] border-white/10 text-[#F7F7F5]'
                    : 'bg-white border-[#E7E7E5] text-[#111111]'
            }`}
        >
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <span
                        className="text-[9px] font-mono font-bold uppercase tracking-[0.14em]"
                        style={{ color: accent }}
                    >
                        {indexTag}
                    </span>
                    <VectorArrowGlyph direction="ne" color={dark ? '#F7F7F5' : '#111111'} size={13} />
                </div>
                <h3
                    className="text-[13px] font-bold leading-[1.2] mb-1"
                    style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                >
                    {title}
                </h3>
                <p className={`text-[10.5px] leading-[1.42] ${dark ? 'text-[#B5B5B2]' : 'text-[#555555]'}`}>
                    {body}
                </p>
            </div>
            {footerTag && (
                <div className="pt-2 mt-2 border-t border-[#E7E7E5]/40 text-[9px] font-mono text-[#777777] uppercase tracking-[0.08em]">
                    {footerTag}
                </div>
            )}
        </div>
    );
}

export function MetricBlock({
    value,
    label,
    note,
    accent,
    inverse = false,
}: {
    value: string;
    label: string;
    note?: string;
    accent: string;
    inverse?: boolean;
}) {
    return (
        <div
            className={`p-3 border ${
                inverse
                    ? 'bg-[#111111] border-[#111111] text-[#F7F7F5]'
                    : 'bg-white border-[#E7E7E5] text-[#111111]'
            }`}
        >
            <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-[#777777] mb-1">
                {label}
            </div>
            <div
                className="text-[22px] font-bold leading-none tracking-[-0.02em]"
                style={{
                    color: inverse ? accent : '#111111',
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                }}
            >
                {value}
            </div>
            {note && (
                <div className={`text-[10px] leading-[1.3] mt-1.5 ${inverse ? 'text-[#D0D0CE]' : 'text-[#555555]'}`}>
                    {note}
                </div>
            )}
        </div>
    );
}

export function VisualMockup({
    imageUrl,
    imageAlt,
    overlayData,
    accent,
}: {
    imageUrl: string;
    imageAlt: string;
    overlayData?: ProposalPage['contentData']['mockupOverlayData'];
    accent: string;
}) {
    return (
        <div className="border border-[#111111] bg-[#111111] overflow-hidden">
            {/* Real Vector UI Top Chrome (100% deterministic typography, never painted by AI) */}
            {overlayData && (
                <div className="bg-[#111111] text-[#F7F7F5] px-3.5 py-2 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                        <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase">
                            {overlayData.appTitle}
                        </span>
                    </div>
                    <span className="text-[9px] font-mono text-[#999999]">
                        {overlayData.appUrl}
                    </span>
                </div>
            )}

            <div className="relative h-[220px] w-full bg-[#161616]">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full object-cover object-center"
                />

                {overlayData && (
                    <div className="absolute inset-x-3 bottom-3 bg-[#111111]/92 backdrop-blur-md border border-white/15 px-3.5 py-2.5 flex items-center justify-between gap-3 text-[#F7F7F5]">
                        <div>
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-[8.5px] font-mono font-bold px-1.5 py-0.5 text-[#111111]"
                                    style={{ backgroundColor: accent }}
                                >
                                    {overlayData.statusBadge}
                                </span>
                                <span className="text-[9px] font-mono text-[#BBBBBB]">
                                    {overlayData.primaryStatLabel}
                                </span>
                            </div>
                            <div className="text-[17px] font-bold tracking-tight text-white mt-0.5">
                                {overlayData.primaryStatValue}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {overlayData.secondaryStats.map((stat, idx) => (
                                <div key={idx} className="text-right">
                                    <div className="text-[8px] font-mono text-[#999999] uppercase">{stat.label}</div>
                                    <div className="text-[10px] font-mono font-bold text-[#F7F7F5]">{stat.value}</div>
                                </div>
                            ))}
                            <span
                                className="px-2.5 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#111111] whitespace-nowrap"
                                style={{ backgroundColor: accent }}
                            >
                                {overlayData.actionLabel}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function PricingTable({
    proposal,
    accent,
}: {
    proposal: Proposal;
    accent: string;
}) {
    const { commercialData } = proposal;

    return (
        <div className="border border-[#111111] bg-white overflow-hidden">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="bg-[#111111] text-[#F7F7F5] text-[9px] font-mono uppercase tracking-[0.12em]">
                        <th className="py-2 px-3">Concepto / Módulo</th>
                        <th className="py-2 px-2.5">Fase / Plazo</th>
                        <th className="py-2 px-2.5 text-right">Lista</th>
                        <th className="py-2 px-3 text-right">Inversión (COP)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E7E5]">
                    {commercialData.items.map((item) => (
                        <tr key={item.id} className="align-top">
                            <td className="py-2.5 px-3">
                                <div className="text-[11px] font-bold text-[#111111] leading-[1.25]">
                                    {item.title}
                                </div>
                                <div className="text-[9.5px] text-[#555555] leading-[1.35] mt-0.5">
                                    {item.description}
                                </div>
                            </td>
                            <td className="py-2.5 px-2.5 text-[10px] font-mono text-[#111111] whitespace-nowrap">
                                {item.phaseLabel}
                            </td>
                            <td className="py-2.5 px-2.5 text-[10px] font-mono text-[#777777] text-right line-through whitespace-nowrap">
                                {formatCOPCompact(item.listUnitPrice)}
                            </td>
                            <td className="py-2.5 px-3 text-[11px] font-mono font-bold text-[#111111] text-right whitespace-nowrap">
                                {formatCOP(item.subtotal)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* Continuous Accounting Footer (<tfoot> rule) */}
                <tfoot className="bg-[#F7F7F5] border-t-2 border-[#111111]">
                    <tr>
                        <td colSpan={3} className="py-1.5 px-3 text-right text-[10px] font-mono text-[#555555]">
                            Subtotal Tarifa Lista Consolidada:
                        </td>
                        <td className="py-1.5 px-3 text-right text-[10.5px] font-mono text-[#555555] whitespace-nowrap">
                            {formatCOP(commercialData.listSubtotal)}
                        </td>
                    </tr>
                    {commercialData.discountTotal > 0 && (
                        <tr>
                            <td colSpan={3} className="py-1 px-3 text-right text-[10px] font-mono font-bold" style={{ color: '#5E2EC4' }}>
                                {commercialData.discounts[0]?.label || 'Beneficio Alianza'}:
                            </td>
                            <td className="py-1 px-3 text-right text-[10.5px] font-mono font-bold whitespace-nowrap" style={{ color: '#5E2EC4' }}>
                                -{formatCOP(commercialData.discountTotal)}
                            </td>
                        </tr>
                    )}
                    <tr className="bg-[#111111] text-[#F7F7F5]">
                        <td colSpan={3} className="py-2.5 px-3 text-right text-[10.5px] font-mono font-bold uppercase tracking-[0.1em]">
                            Total Inversión Neta Cerrada ({commercialData.taxes[0]?.regimeLabel}):
                        </td>
                        <td
                            className="py-2.5 px-3 text-right text-[14px] font-mono font-bold whitespace-nowrap"
                            style={{ color: accent }}
                        >
                            {formatCOP(commercialData.grandTotal)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export function Timeline({
    proposal,
    accent,
}: {
    proposal: Proposal;
    accent: string;
}) {
    return (
        <div className="space-y-2.5">
            {proposal.project.milestones.map((ms, idx) => (
                <div
                    key={ms.id}
                    className="grid grid-cols-12 gap-3 bg-white border border-[#E7E7E5] p-3 items-start"
                >
                    <div className="col-span-3">
                        <span
                            className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-[0.12em] text-[#F7F7F5]"
                            style={{ backgroundColor: idx === 0 ? accent : '#111111', color: idx === 0 ? '#111111' : '#F7F7F5' }}
                        >
                            {ms.phaseNumber}
                        </span>
                        <div className="text-[10.5px] font-mono font-bold text-[#111111] mt-1">
                            {ms.timeframe}
                        </div>
                        {ms.paymentTrigger && (
                            <div className="text-[9px] font-mono text-[#777777] mt-0.5">
                                {ms.paymentTrigger}
                            </div>
                        )}
                    </div>

                    <div className="col-span-6">
                        <div className="text-[12px] font-bold text-[#111111] leading-snug">
                            {ms.title}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {ms.deliverables.map((del, dIdx) => (
                                <span
                                    key={dIdx}
                                    className="text-[9px] font-mono bg-[#F7F7F5] border border-[#E7E7E5] px-1.5 py-0.5 text-[#333333]"
                                >
                                    {del}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-3 text-right">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#555555]">
                            {ms.statusLabel}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FinancialSvgChart({
    proposal,
    accent,
}: {
    proposal: Proposal;
    accent: string;
}) {
    const listTotal = Math.max(1, proposal.commercialData.listSubtotal);
    const netTotal = proposal.commercialData.grandTotal;
    const saved = proposal.commercialData.discountTotal;
    const netPct = Math.round((netTotal / listTotal) * 100);
    const savedPct = Math.max(0, 100 - netPct);

    return (
        <div className="bg-white border border-[#E7E7E5] p-3">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[9.5px] font-mono font-bold uppercase tracking-[0.12em] text-[#111111]">
                    Comparativa Vectorial · Tarifa Lista vs Beneficio Alianza
                </span>
                <span className="text-[9px] font-mono text-[#777777]">
                    AHORRO REAL: {formatCOP(saved)} ({savedPct}%)
                </span>
            </div>
            <svg viewBox="0 0 600 66" className="w-full h-[66px]" role="img" aria-label="Comparativa financiera">
                {/* Tarifa Lista */}
                <text x="0" y="14" fontSize="10" fontFamily="monospace" fill="#555555">
                    TARIFA LISTA ({formatCOPCompact(listTotal)})
                </text>
                <rect x="210" y="4" width="380" height="14" fill="#E7E7E5" />
                <text x="584" y="14" fontSize="9" fontFamily="monospace" fill="#111111" textAnchor="end">
                    100%
                </text>

                {/* Inversión Alianza */}
                <text x="0" y="40" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#111111">
                    INVERSIÓN NETA ({formatCOPCompact(netTotal)})
                </text>
                <rect x="210" y="30" width={Math.max(40, Math.round((380 * netPct) / 100))} height="14" fill="#111111" />
                <rect
                    x={210 + Math.round((380 * netPct) / 100)}
                    y="30"
                    width={Math.max(0, 380 - Math.round((380 * netPct) / 100))}
                    height="14"
                    fill={accent}
                    fillOpacity="0.28"
                />
                <text x={202 + Math.round((380 * netPct) / 100)} y="40" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#F7F7F5" textAnchor="end">
                    {netPct}%
                </text>
                <text x="584" y="58" fontSize="9" fontFamily="monospace" fill="#5E2EC4" textAnchor="end">
                    Ahorro Alianza: -{savedPct}% ({formatCOPCompact(saved)})
                </text>
            </svg>
        </div>
    );
}

export function TechnicalArchitectureSvgDiagram({
    proposal,
    accent,
}: {
    proposal: Proposal;
    accent: string;
}) {
    const nodes =
        proposal.project.technicalArchitectureNodes ||
        proposal.project.scope.slice(0, 3).map((s, idx) => ({
            id: s.id,
            layer: `BLOQUE 0${idx + 1}`,
            title: s.title,
            spec: s.summary,
        }));

    return (
        <div className="bg-[#111111] text-[#F7F7F5] p-4 border border-[#111111]">
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
                    DIAGRAMA VECTORIAL DE ARQUITECTURA & FLUJO OPERATIVO
                </span>
                <span className="text-[9px] font-mono text-[#999999]">
                    RENDER VECTORIAL DETERMINÍSTICO
                </span>
            </div>

            <div className="grid grid-cols-3 gap-3 items-stretch">
                {nodes.slice(0, 3).map((node, idx) => (
                    <div key={node.id} className="bg-[#1B1B1B] border border-white/15 p-3 flex flex-col justify-between">
                        <div>
                            <div className="text-[8.5px] font-mono uppercase tracking-[0.12em] mb-1" style={{ color: accent }}>
                                {node.layer}
                            </div>
                            <div className="text-[12px] font-bold leading-snug text-white">
                                {node.title}
                            </div>
                            <p className="text-[10px] text-[#B8B8B5] leading-[1.4] mt-1.5">
                                {node.spec}
                            </p>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 text-[8.5px] font-mono text-[#888888]">
                            FLUJO 0{idx + 1} → VERIFICADO
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// =============================================================================
// C. 15 APPROVED FIXED TEMPLATES RENDERER
// Exact A4 geometry: width: 794px, height: 1123px (210mm × 297mm)
// =============================================================================

export function ProposalTemplateRenderer({
    proposal,
    page,
    totalPages,
    selectedPackageIndex = null,
    onSelectPackageIndex,
}: TemplateRenderProps) {
    const accent = getSectorAccent(proposal);
    const darkBg = getSectorDark(proposal);
    const templateMeta = APPROVED_TEMPLATES[page.templateId];
    const heroImage =
        page.assets[0]?.url || '/cotizaciones/prop-jl-2026-094/hero-cover-detailing-studio.png';
    const isDarkCover =
        page.templateId === 'cover-dark-closing' ||
        page.templateId === 'closing-editorial-a';

    const pageSurfaceStyle: React.CSSProperties = {
        width: '794px',
        height: '1123px',
        minWidth: '794px',
        minHeight: '1123px',
        maxHeight: '1123px',
        backgroundColor: isDarkCover ? darkBg : INSTITUTIONAL_PALETTE.pearl,
        color: isDarkCover ? INSTITUTIONAL_PALETTE.pearl : INSTITUTIONAL_PALETTE.ink,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    };

    const renderBody = () => {
        switch (page.templateId) {
            // -----------------------------------------------------------------
            // COVER TEMPLATES (3)
            // -----------------------------------------------------------------
            case 'cover-editorial-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-5">
                        <HeroTitle
                            tag={`${proposal.project.categoryLabel} · ${proposal.code}`}
                            headline={page.contentData.headline}
                            subtitle={page.contentData.leadParagraph}
                            accent={accent}
                        />

                        {/* Parties Metadata Grid */}
                        <div className="grid grid-cols-12 gap-3 my-4">
                            <div className="col-span-5 bg-white border border-[#E7E7E5] p-3.5">
                                <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-[#777777]">
                                    PREPARADO PARA EL CLIENTE
                                </div>
                                <div className="text-[15px] font-bold text-[#111111] mt-1">
                                    {proposal.client.name}
                                </div>
                                <div className="text-[11px] text-[#555555]">
                                    {proposal.client.company}
                                </div>
                                <div className="text-[10px] font-mono text-[#777777] mt-1">
                                    {proposal.client.phone} · {proposal.client.city}
                                </div>
                            </div>

                            <div className="col-span-4 bg-white border border-[#E7E7E5] p-3.5">
                                <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-[#777777]">
                                    EMITIDO EN ALIANZA POR
                                </div>
                                <div className="text-[14px] font-bold text-[#111111] mt-1">
                                    purrpurr.dev × Speedlight
                                </div>
                                <div className="text-[11px] text-[#555555]">
                                    {proposal.brandIdentity.issuerRepresentative}
                                </div>
                                <div className="text-[10px] font-mono text-[#777777] mt-1">
                                    Plazo: {proposal.project.deliveryTimeframe}
                                </div>
                            </div>

                            <div className="col-span-3 bg-[#111111] text-[#F7F7F5] p-3.5 flex flex-col justify-between">
                                <div className="text-[9px] font-mono uppercase tracking-[0.14em]" style={{ color: accent }}>
                                    INVERSIÓN NETA
                                </div>
                                <div className="text-[18px] font-bold tracking-tight mt-1">
                                    {formatCOP(proposal.commercialData.grandTotal)}
                                </div>
                                <div className="text-[9.5px] font-mono text-[#BBBBBB]">
                                    {proposal.commercialData.alternativePackages.length > 0
                                        ? `${proposal.commercialData.alternativePackages.length} Modalidades`
                                        : 'Valor Neto Cerrado'}
                                </div>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="relative h-[435px] w-full border border-[#111111] bg-[#111111] overflow-hidden">
                            <img
                                src={heroImage}
                                alt={page.assets[0]?.alt || proposal.project.title}
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#111111]/90 via-[#111111]/45 to-transparent flex items-end justify-between px-5 pb-4 text-[#F7F7F5]">
                                <div>
                                    <span className="text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: accent }}>
                                        DIRECCIÓN DE ARTE SECTORIAL · {proposal.visualConfig.sector.toUpperCase()}
                                    </span>
                                    <div className="text-[13px] font-bold mt-0.5">
                                        {proposal.client.projectReference || proposal.project.title}
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono text-[#E7E7E5]">
                                    EXPEDIENTE EDITORIAL A4
                                </span>
                            </div>
                        </div>
                    </div>
                );

            case 'cover-image-split':
                return (
                    <div className="flex-1 grid grid-cols-12 gap-5 py-5 items-stretch">
                        <div className="col-span-6 flex flex-col justify-between">
                            <HeroTitle
                                tag={`${proposal.project.categoryLabel}`}
                                headline={page.contentData.headline}
                                subtitle={page.contentData.leadParagraph}
                                accent={accent}
                            />
                            <div className="space-y-3">
                                <div className="bg-white border border-[#E7E7E5] p-4">
                                    <div className="text-[9px] font-mono uppercase text-[#777777]">CLIENTE TITULAR</div>
                                    <div className="text-[15px] font-bold text-[#111111] mt-1">{proposal.client.name}</div>
                                    <div className="text-[11px] text-[#555555]">{proposal.client.company}</div>
                                </div>
                                <MetricBlock
                                    value={formatCOP(proposal.commercialData.grandTotal)}
                                    label="INVERSIÓN PRINCIPAL NETA"
                                    note={`Esquema 50/50 · ${proposal.project.deliveryTimeframe}`}
                                    accent={accent}
                                    inverse
                                />
                            </div>
                        </div>
                        <div className="col-span-6 border border-[#111111] bg-[#111111] overflow-hidden relative">
                            <img
                                src={heroImage}
                                alt={proposal.project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/90 p-3 text-white border border-white/15">
                                <div className="text-[9px] font-mono uppercase" style={{ color: accent }}>
                                    PROPUESTA MULTIPÁGINA · #{proposal.code}
                                </div>
                                <div className="text-[11px] font-bold mt-0.5">
                                    {proposal.client.projectReference || proposal.project.title}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'cover-dark-closing':
                return (
                    <div className="flex-1 flex flex-col justify-between py-5">
                        <HeroTitle
                            tag={`EDICIÓN MONOLITO · ${proposal.code}`}
                            headline={page.contentData.headline}
                            subtitle={page.contentData.leadParagraph}
                            accent={accent}
                            dark
                        />
                        <div className="relative h-[450px] border border-white/20 overflow-hidden my-4">
                            <img src={heroImage} alt={proposal.project.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <MetricBlock value={proposal.client.name} label="CLIENTE" accent={accent} inverse />
                            <MetricBlock value={formatCOP(proposal.commercialData.grandTotal)} label="INVERSIÓN NETA" accent={accent} inverse />
                            <MetricBlock value={`${totalPages} PÁGINAS`} label="DOSSIER A4" accent={accent} inverse />
                        </div>
                    </div>
                );

            // -----------------------------------------------------------------
            // EXECUTIVE TEMPLATES (2)
            // -----------------------------------------------------------------
            case 'executive-summary-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />

                            <div className="grid grid-cols-12 gap-4 items-stretch mb-4">
                                <div className="col-span-7 bg-white border border-[#E7E7E5] p-4 flex flex-col justify-between">
                                    <div>
                                        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.14em]" style={{ color: '#5E2EC4' }}>
                                            VISIÓN DE ALIANZA & CONTEXTO
                                        </span>
                                        <h3
                                            className="text-[17px] font-bold leading-snug text-[#111111] mt-1 mb-2"
                                            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                                        >
                                            {page.contentData.headline}
                                        </h3>
                                        <p className="text-[11.5px] leading-[1.5] text-[#333333]">
                                            {page.contentData.leadParagraph}
                                        </p>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-[#E7E7E5]">
                                        <div className="text-[9px] font-mono uppercase text-[#777777]">BRECHA OPERATIVA RESUELTA</div>
                                        <p className="text-[10.5px] leading-[1.45] text-[#444444] mt-0.5">
                                            {proposal.project.problemContext}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-5 border border-[#111111] bg-[#111111] overflow-hidden relative min-h-[260px]">
                                    <img
                                        src={heroImage}
                                        alt={page.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#111111]/90 p-2.5 border border-white/15">
                                        <div className="text-[8.5px] font-mono uppercase" style={{ color: accent }}>
                                            ESTUDIO & OPERACIÓN
                                        </div>
                                        <div className="text-[10.5px] text-white font-semibold mt-0.5">
                                            {proposal.client.company}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4 KPI / Objective Blocks */}
                            <div className="grid grid-cols-4 gap-3 mb-4">
                                {proposal.project.objectives.slice(0, 4).map((obj, idx) => (
                                    <MetricBlock
                                        key={obj.id}
                                        value={obj.metricValue}
                                        label={obj.metricLabel}
                                        note={obj.title}
                                        accent={accent}
                                        inverse={idx === 0}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Dark Contrast Strategic Callout */}
                        <div className="bg-[#111111] text-[#F7F7F5] p-4 grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-8">
                                <span className="text-[9px] font-mono uppercase tracking-[0.14em]" style={{ color: accent }}>
                                    SOLUCIÓN PROPUESTA PURRPURR.DEV × SPEEDLIGHT
                                </span>
                                <p className="text-[11px] leading-[1.48] text-[#E7E7E5] mt-1">
                                    {proposal.project.solutionConcept}
                                </p>
                            </div>
                            <div className="col-span-4 border-l border-white/15 pl-4 text-right">
                                <div className="text-[9px] font-mono uppercase text-[#999999]">PLAZO TOTAL</div>
                                <div className="text-[14px] font-bold text-white mt-0.5">
                                    {proposal.project.deliveryTimeframe}
                                </div>
                                <div className="text-[9.5px] font-mono mt-1" style={{ color: accent }}>
                                    Entregas verificables
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'executive-summary-b':
                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />
                            <div className="bg-white border border-[#E7E7E5] p-4 mb-4">
                                <h3 className="text-[15px] font-bold text-[#111111] mb-1.5">
                                    {page.contentData.headline}
                                </h3>
                                <p className="text-[11.5px] leading-[1.5] text-[#444444]">
                                    {page.contentData.leadParagraph}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3.5">
                                {proposal.project.objectives.slice(0, 4).map((obj, idx) => (
                                    <InfoCard
                                        key={obj.id}
                                        indexTag={`OBJETIVO 0${idx + 1} · ${obj.metricValue}`}
                                        title={obj.title}
                                        body={obj.description}
                                        footerTag={obj.metricLabel}
                                        accent={accent}
                                    />
                                ))}
                            </div>
                        </div>
                        <FinancialSvgChart proposal={proposal} accent={accent} />
                    </div>
                );

            // -----------------------------------------------------------------
            // SOLUTIONS TEMPLATES (3)
            // -----------------------------------------------------------------
            case 'solution-visual-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />

                            {/* Real Vector UI Overlay + Studio Photography */}
                            <VisualMockup
                                imageUrl={heroImage}
                                imageAlt={page.title}
                                overlayData={page.contentData.mockupOverlayData}
                                accent={accent}
                            />

                            <div className="mt-4">
                                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#555555] mb-2">
                                    DESGLOSE DE MÓDULOS / BLOQUES DEL PROYECTO ({proposal.project.scope.length})
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {proposal.project.scope.slice(0, 3).map((item, idx) => (
                                        <InfoCard
                                            key={item.id}
                                            indexTag={`${item.code} · ${item.phaseTag}`}
                                            title={item.title}
                                            body={item.summary}
                                            footerTag={item.deliverables.slice(0, 2).join(' · ')}
                                            accent={accent}
                                            dark={idx === 0}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-[#E7E7E5] p-3 flex items-center justify-between">
                            <div>
                                <div className="text-[9px] font-mono uppercase text-[#777777]">ENTREGABLES GARANTIZADOS</div>
                                <div className="text-[11px] font-semibold text-[#111111]">
                                    {proposal.project.deliverables.map((d) => d.title).join('  ·  ')}
                                </div>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-[#111111] text-white whitespace-nowrap">
                                {proposal.visualConfig.sector.toUpperCase()} SPEC
                            </span>
                        </div>
                    </div>
                );

            case 'module-grid-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />
                            <div className="grid grid-cols-2 gap-3.5 mb-4">
                                {proposal.project.scope.map((item, idx) => (
                                    <InfoCard
                                        key={item.id}
                                        indexTag={`${item.code} · ${item.ownerTag}`}
                                        title={item.title}
                                        body={`${item.summary} Entregables: ${item.deliverables.join(', ')}.`}
                                        footerTag={item.phaseTag}
                                        accent={accent}
                                        dark={idx === 0}
                                    />
                                ))}
                            </div>
                        </div>
                        <TechnicalArchitectureSvgDiagram proposal={proposal} accent={accent} />
                    </div>
                );

            case 'technical-diagram-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />
                            <TechnicalArchitectureSvgDiagram proposal={proposal} accent={accent} />
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="border border-[#111111] h-[220px] overflow-hidden">
                                    <img src={heroImage} alt={page.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-2.5">
                                    {proposal.project.deliverables.map((del, idx) => (
                                        <div key={del.id} className="bg-white border border-[#E7E7E5] p-3">
                                            <div className="text-[9px] font-mono font-bold" style={{ color: '#5E2EC4' }}>
                                                ENTREGABLE 0{idx + 1} · {del.format}
                                            </div>
                                            <div className="text-[11.5px] font-bold text-[#111111] mt-0.5">{del.title}</div>
                                            <div className="text-[10px] text-[#555555] mt-0.5">{del.acceptanceCriteria}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            // -----------------------------------------------------------------
            // IMPLEMENTATION TEMPLATES (2)
            // -----------------------------------------------------------------
            case 'timeline-a':
            case 'roadmap-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />
                            <p className="text-[11.5px] text-[#444444] mb-4 leading-[1.45]">
                                {page.contentData.leadParagraph}
                            </p>
                            <Timeline proposal={proposal} accent={accent} />
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-7 border border-[#111111] h-[175px] overflow-hidden">
                                <img src={heroImage} alt={page.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="col-span-5 bg-[#111111] text-[#F7F7F5] p-4 h-[175px] flex flex-col justify-between">
                                <div className="text-[9px] font-mono uppercase tracking-[0.14em]" style={{ color: accent }}>
                                    CONTROL DE AVANCE
                                </div>
                                <div className="text-[16px] font-bold leading-tight">
                                    {proposal.project.deliveryTimeframe}
                                </div>
                                <p className="text-[10px] text-[#C8C8C6] leading-[1.4]">
                                    Cada fase se valida con entregable funcional y evidencia antes de pasar a la siguiente etapa.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            // -----------------------------------------------------------------
            // FINANCIAL TEMPLATES (3)
            // -----------------------------------------------------------------
            case 'pricing-comparison-a':
            case 'pricing-table-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />

                            {/* Compact Milestones Ribbon */}
                            <div className="grid grid-cols-3 gap-2.5 mb-3.5">
                                {proposal.project.milestones.slice(0, 3).map((ms, idx) => (
                                    <div key={ms.id} className="bg-white border border-[#E7E7E5] p-2.5">
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-[8.5px] font-mono font-bold px-1.5 py-0.5 text-[#111111]"
                                                style={{ backgroundColor: idx === 0 ? accent : '#E7E7E5' }}
                                            >
                                                {ms.phaseNumber}
                                            </span>
                                            <span className="text-[9px] font-mono text-[#777777]">{ms.timeframe}</span>
                                        </div>
                                        <div className="text-[11px] font-bold text-[#111111] mt-1 leading-tight">
                                            {ms.title}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Deterministic Pricing Table with continuous tfoot */}
                            <PricingTable proposal={proposal} accent={accent} />

                            {/* Alternative Modalities */}
                            {proposal.commercialData.alternativePackages.length > 0 && (
                                <div className="mt-3.5">
                                    <div className="text-[9.5px] font-mono font-bold uppercase tracking-[0.14em] text-[#555555] mb-2">
                                        MODALIDADES DE CONTRATACIÓN DISPONIBLES ({proposal.commercialData.alternativePackages.length})
                                    </div>
                                    <div
                                        className={`grid gap-2.5 ${
                                            proposal.commercialData.alternativePackages.length >= 3
                                                ? 'grid-cols-2'
                                                : 'grid-cols-2'
                                        }`}
                                    >
                                        {proposal.commercialData.alternativePackages.slice(0, 4).map((pkg, idx) => {
                                            const isSelected = selectedPackageIndex === idx;
                                            return (
                                                <div
                                                    key={pkg.id}
                                                    onClick={() => onSelectPackageIndex?.(idx)}
                                                    className={`p-3 border transition-colors ${
                                                        onSelectPackageIndex ? 'cursor-pointer' : ''
                                                    } ${
                                                        isSelected || pkg.recommended
                                                            ? 'bg-[#111111] text-[#F7F7F5] border-[#111111]'
                                                            : 'bg-white text-[#111111] border-[#E7E7E5]'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span
                                                            className="text-[8.5px] font-mono uppercase tracking-[0.12em]"
                                                            style={{ color: isSelected || pkg.recommended ? accent : '#777777' }}
                                                        >
                                                            {pkg.groupTitle || pkg.materialOrTechLabel}
                                                        </span>
                                                        <span className="text-[9px] font-mono text-[#777777] line-through">
                                                            {formatCOPCompact(pkg.listPrice)}
                                                        </span>
                                                    </div>
                                                    <div className="text-[11.5px] font-bold leading-snug mt-0.5">
                                                        {pkg.name}
                                                    </div>
                                                    <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-white/15">
                                                        <span className="text-[14px] font-mono font-bold" style={{ color: isSelected || pkg.recommended ? accent : '#111111' }}>
                                                            {formatCOP(pkg.total)}
                                                        </span>
                                                        <span className="text-[9px] font-mono opacity-80">
                                                            Anticipo {formatCOPCompact(pkg.advanceAmount)}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        <FinancialSvgChart proposal={proposal} accent={accent} />
                    </div>
                );

            case 'payment-terms-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {proposal.commercialData.paymentTerms.map((term, idx) => (
                                    <MetricBlock
                                        key={term.id}
                                        value={formatCOP(term.amount)}
                                        label={`${term.label} (${term.percentage}%)`}
                                        note={term.triggerDescription}
                                        accent={accent}
                                        inverse={idx === 0}
                                    />
                                ))}
                            </div>
                            <FinancialSvgChart proposal={proposal} accent={accent} />
                            <div className="mt-4">
                                <LegalNotice proposal={proposal} />
                            </div>
                        </div>
                    </div>
                );

            // -----------------------------------------------------------------
            // CLOSING TEMPLATES (2)
            // -----------------------------------------------------------------
            case 'acceptance-a': {
                const primaryPayment = proposal.commercialData.paymentMethods[0];
                const selectedPkg =
                    typeof selectedPackageIndex === 'number' &&
                    proposal.commercialData.alternativePackages[selectedPackageIndex]
                        ? proposal.commercialData.alternativePackages[selectedPackageIndex]
                        : null;
                const finalNetAmount = selectedPkg ? selectedPkg.total : proposal.commercialData.grandTotal;
                const advanceAmount = selectedPkg
                    ? selectedPkg.advanceAmount
                    : proposal.commercialData.paymentTerms[0]?.amount || Math.round(finalNetAmount * 0.5);
                const balanceAmount = finalNetAmount - advanceAmount;

                return (
                    <div className="flex-1 flex flex-col justify-between py-4">
                        <div>
                            <SectionTitle
                                code={page.contentData.sectionCode}
                                title={page.contentData.sectionTitle}
                                subtitle={page.contentData.sectionSubtitle}
                                accent={accent}
                            />

                            {/* Legal Conditions Row */}
                            <LegalNotice proposal={proposal} />

                            {/* Payment Gateway & QR Card */}
                            <div className="bg-[#111111] text-[#F7F7F5] p-4 mt-4 grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-3 bg-white p-2.5 flex flex-col items-center justify-center">
                                    <img
                                        src={primaryPayment?.qrSrc || '/brand/car-coding-payment-qr.svg'}
                                        alt="QR Oficial de Pago Wompi"
                                        className="w-24 h-24 object-contain"
                                    />
                                    <span className="text-[8px] font-mono text-[#111111] font-bold mt-1 uppercase">
                                        ESCANEAR QR WOMPI
                                    </span>
                                </div>

                                <div className="col-span-5 space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold uppercase" style={{ color: accent }}>
                                        <CreditCard className="w-3.5 h-3.5" />
                                        PASARELA OFICIAL & TRANSFERENCIA
                                    </div>
                                    <div className="text-[13px] font-bold text-white">
                                        {primaryPayment?.method || 'Pasarela Oficial Wompi'}
                                    </div>
                                    <p className="text-[10px] text-[#CCCCCC] leading-[1.4]">
                                        {primaryPayment?.details}
                                    </p>
                                    {proposal.commercialData.paymentMethods[1] && (
                                        <p className="text-[9.5px] font-mono text-[#999999]">
                                            {proposal.commercialData.paymentMethods[1].method}: {proposal.commercialData.paymentMethods[1].details}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-4 border-l border-white/15 pl-4 space-y-2 text-right">
                                    <div className="text-[9px] font-mono uppercase text-[#AAAAAA]">
                                        {selectedPkg ? `MODALIDAD SELECCIONADA` : `VALOR NETO DE REFERENCIA`}
                                    </div>
                                    <div className="text-[20px] font-mono font-bold" style={{ color: accent }}>
                                        {formatCOP(finalNetAmount)}
                                    </div>
                                    <div className="text-[10px] font-mono text-[#E7E7E5]">
                                        50% Anticipo: {formatCOP(advanceAmount)}
                                    </div>
                                    <div className="text-[10px] font-mono text-[#BBBBBB]">
                                        50% Entrega: {formatCOP(balanceAmount)}
                                    </div>
                                </div>
                            </div>

                            {/* Warranty Summary Strip */}
                            <div className="mt-4 bg-white border border-[#E7E7E5] p-3.5 flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#5E2EC4' }} />
                                <div>
                                    <div className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-[#111111]">
                                        GARANTÍA DE CALIDAD & RESPALDO INSTITUCIONAL
                                    </div>
                                    <p className="text-[10.5px] text-[#444444] leading-[1.45] mt-0.5">
                                        {proposal.commercialData.warrantySummary}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Institutional Signature Block */}
                        <SignatureBlock proposal={proposal} />
                    </div>
                );
            }

            case 'closing-editorial-a':
                return (
                    <div className="flex-1 flex flex-col justify-between py-5">
                        <HeroTitle
                            tag={`CIERRE EJECUTIVO · #${proposal.code}`}
                            headline={page.contentData.headline}
                            subtitle={proposal.commercialData.warrantySummary}
                            accent={accent}
                            dark
                        />
                        <div className="relative h-[340px] border border-white/20 overflow-hidden my-3">
                            <img src={heroImage} alt={page.title} className="w-full h-full object-cover" />
                        </div>
                        <SignatureBlock proposal={proposal} />
                    </div>
                );

            default:
                return (
                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <Layers className="w-8 h-8 mb-2" style={{ color: accent }} />
                        <div className="text-sm font-bold">{templateMeta?.name || page.templateId}</div>
                    </div>
                );
        }
    };

    return (
        <article
            className="proposal-page flex flex-col justify-between box-border overflow-hidden relative shadow-[0_10px_35px_rgba(17,17,17,0.12)] print:shadow-none"
            style={{
                ...pageSurfaceStyle,
                padding: '13mm 14mm',
            }}
            data-proposal-id={proposal.id}
            data-page-number={page.pageNumber}
            data-template-id={page.templateId}
        >
            {/* Institutional Top Accent Bar (5% rule) */}
            <div
                className="absolute top-0 left-0 right-0 h-[4px]"
                style={{ backgroundColor: accent }}
            />

            <BrandHeader proposal={proposal} dark={isDarkCover} />

            {renderBody()}

            <BrandFooter
                proposal={proposal}
                pageNumber={page.pageNumber}
                totalPages={totalPages}
                templateId={page.templateId}
                dark={isDarkCover}
            />
        </article>
    );
}

// =============================================================================
// COMPACT INSTITUTIONAL SYSTEM SUMMARY BADGES (NO SPARKLES, NO PULSE)
// =============================================================================

export function ProposalEnginePillarsBar({ proposal }: { proposal: Proposal }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px] font-mono">
            <div className="bg-white border border-[#0C0908]/10 px-3 py-2 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#5E2EC4] shrink-0" />
                <div>
                    <span className="font-bold text-[#111111]">VISUAL: FIXED</span>{' '}
                    <span className="text-[#666666]">· 15 plantillas aprobadas</span>
                </div>
            </div>
            <div className="bg-white border border-[#0C0908]/10 px-3 py-2 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#5E2EC4] shrink-0" />
                <div>
                    <span className="font-bold text-[#111111]">PÁGINAS: ADAPTIVE</span>{' '}
                    <span className="text-[#666666]">· {proposal.pages.length} págs ({proposal.adaptiveMode})</span>
                </div>
            </div>
            <div className="bg-white border border-[#0C0908]/10 px-3 py-2 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5E2EC4] shrink-0" />
                <div>
                    <span className="font-bold text-[#111111]">IDENTIDAD: MIXED</span>{' '}
                    <span className="text-[#666666]">· Sector {proposal.project.sector}</span>
                </div>
            </div>
        </div>
    );
}
