'use client';

import { useState, useEffect, useCallback } from 'react';

// ============================================================================
// TYPES - Matching database models
// ============================================================================

export interface ColorPalette {
    id: string;
    name: string;
    slug: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    category: string | null;
}

export interface LayoutOption {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
}

export interface SectionTemplate {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    isPremium: boolean;
}

export interface VisualEffect {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    type: string;
    cssClass: string | null;
}

export interface GenerativePattern {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    generator: string;
}

export interface FontPairing {
    id: string;
    name: string;
    displayFont: string;
    bodyFont: string;
    category: string | null;
    tracking: number;
    leading: number;
}

export interface Archetype {
    id: string;
    name: string;
    slug: string;
    label: string;
    description: string | null;
    icon: string | null;
    color: string;
}

export interface PurrpurrLabData {
    colorPalettes: ColorPalette[];
    layoutOptions: LayoutOption[];
    sectionTemplates: SectionTemplate[];
    visualEffects: VisualEffect[];
    generativePatterns: GenerativePattern[];
    fontPairings: FontPairing[];
    archetypes: Archetype[];
}

// ============================================================================
// HOOK: usePurrpurrLab
// Single source of truth for all Lab tools
// ============================================================================

interface UsePurrpurrLabOptions {
    autoFetch?: boolean;
}

interface UsePurrpurrLabReturn {
    data: PurrpurrLabData | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    // Convenience accessors
    palettes: ColorPalette[];
    layouts: LayoutOption[];
    sections: SectionTemplate[];
    effects: VisualEffect[];
    patterns: GenerativePattern[];
    fonts: FontPairing[];
    archetypes: Archetype[];
}

export function usePurrpurrLab(options: UsePurrpurrLabOptions = {}): UsePurrpurrLabReturn {
    const { autoFetch = true } = options;

    const [data, setData] = useState<PurrpurrLabData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTools = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/purrpurr-lab/tools');

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }

            // Defensive check: ensure response is JSON
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await res.text();
                console.error(`[usePurrpurrLab] Expected JSON but got ${contentType || 'unknown'}. URL: /api/purrpurr-lab/tools. Preview: ${text.substring(0, 100)}`);
                throw new Error('Invalid server response format (expected JSON)');
            }

            const json = await res.json();

            if (json.success) {
                setData(json.data);
            } else {
                throw new Error(json.error || 'Unknown error');
            }
        } catch (err: any) {
            console.error('[usePurrpurrLab] Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchTools();
        }
    }, [autoFetch, fetchTools]);

    return {
        data,
        loading,
        error,
        refetch: fetchTools,
        // Convenience accessors with empty array fallbacks
        palettes: data?.colorPalettes || [],
        layouts: data?.layoutOptions || [],
        sections: data?.sectionTemplates || [],
        effects: data?.visualEffects || [],
        patterns: data?.generativePatterns || [],
        fonts: data?.fontPairings || [],
        archetypes: data?.archetypes || [],
    };
}

// ============================================================================
// HOOK: usePurrpurrLabPalettes - Just palettes
// ============================================================================

export function usePurrpurrLabPalettes() {
    const { palettes, loading, error, refetch } = usePurrpurrLab();
    return { palettes, loading, error, refetch };
}

// ============================================================================
// HOOK: usePurrpurrLabEffects - Just effects
// ============================================================================

export function usePurrpurrLabEffects() {
    const { effects, patterns, loading, error, refetch } = usePurrpurrLab();
    return { effects, patterns, loading, error, refetch };
}

// ============================================================================
// HOOK: usePurrpurrLabFonts - Just fonts
// ============================================================================

export function usePurrpurrLabFonts() {
    const { fonts, loading, error, refetch } = usePurrpurrLab();
    return { fonts, loading, error, refetch };
}

// ============================================================================
// HOOK: usePurrpurrLabSections - Just sections
// ============================================================================

export function usePurrpurrLabSections() {
    const { sections, loading, error, refetch } = usePurrpurrLab();
    return { sections, loading, error, refetch };
}

// ============================================================================
// HOOK: usePurrpurrLabArchetypes - Just archetypes
// ============================================================================

export function usePurrpurrLabArchetypes() {
    const { archetypes, loading, error, refetch } = usePurrpurrLab();
    return { archetypes, loading, error, refetch };
}

export default usePurrpurrLab;
