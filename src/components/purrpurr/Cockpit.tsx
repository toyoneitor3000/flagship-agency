'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Terminal, AlertCircle, Check, Database } from 'lucide-react';

export const Cockpit = () => {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/magic/content');
            const data = await res.json();
            setContent(data);
        } catch (e) {
            console.error(e);
            setStatus('Connection Error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const updateField = async (key: string, value: string) => {
        setSaving(true);
        setStatus('Transmitting...');
        try {
            const res = await fetch('/api/magic/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-magic-word': 'purrpurr-magic'
                },
                body: JSON.stringify({ key, value })
            });

            if (res.ok) {
                setStatus('Synced to Core.');
            } else {
                setStatus('Transmission Failed.');
            }
        } catch (e) {
            setStatus('Network Error.');
        } finally {
            setSaving(false);
            setTimeout(() => setStatus(null), 2000);
        }
    };

    const handleLocalChange = (path: string, value: string) => {
        // Simple deep update for specific known paths to avoid complexity
        const newContent = JSON.parse(JSON.stringify(content)); // Deep clone

        if (path.startsWith('hero.')) {
            const k = path.split('.')[1];
            if (newContent.hero) newContent.hero[k] = value;
        } else if (path.startsWith('pricing.')) {
            const k = path.split('.')[1];
            if (newContent.pricing) newContent.pricing[k] = value;
        }

        setContent(newContent);
    };

    if (loading) return (
        <div className="w-full h-full flex items-center justify-center p-12">
            <div className="flex flex-col items-center gap-4">
                <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                <span className="text-xs font-mono text-emerald-500/50 animate-pulse">ESTABLISHING SECURE UPLINK...</span>
            </div>
        </div>
    );

    return (
        <div className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
            {/* Header */}
            <div className="bg-zinc-900/50 border-b border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                    <div>
                        <h2 className="text-sm font-bold text-white tracking-widest uppercase font-mono flex items-center gap-2">
                            <Database className="w-3 h-3 text-zinc-400" />
                            MISSION CONTROL
                        </h2>
                        <p className="text-[10px] text-zinc-500 font-mono">Live Access to: purrpurr-web</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {status && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">{status}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 md:p-8 space-y-8">

                {/* Hero Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-purple-400">
                        <Terminal className="w-4 h-4" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Module 01: Hero Identity</h3>
                        <div className="h-px bg-purple-500/20 flex-grow" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ControlInput
                            label="MAIN_TITLE"
                            subLabel="Appears in H1 tag"
                            value={content?.hero?.title_1 || ''}
                            onChange={(v) => handleLocalChange('hero.title_1', v)}
                            onSave={() => updateField('hero.title_1', content.hero.title_1)}
                            saving={saving}
                        />
                        <ControlInput
                            label="SUB_DESCRIPTION"
                            subLabel="Hero paragraph text"
                            value={content?.hero?.description || ''}
                            onChange={(v) => handleLocalChange('hero.description', v)}
                            onSave={() => updateField('hero.description', content.hero.description)}
                            saving={saving}
                        />
                        <ControlInput
                            label="PREFIX_TEXT"
                            subLabel="Small text before highlight"
                            value={content?.hero?.title_2_pre || ''}
                            onChange={(v) => handleLocalChange('hero.title_2_pre', v)}
                            onSave={() => updateField('hero.title_2_pre', content.hero.title_2_pre)}
                            saving={saving}
                        />
                        <ControlInput
                            label="HIGHLIGHT_TEXT"
                            subLabel="Colored animated text"
                            value={content?.hero?.title_2_post || ''}
                            onChange={(v) => handleLocalChange('hero.title_2_post', v)}
                            onSave={() => updateField('hero.title_2_post', content.hero.title_2_post)}
                            saving={saving}
                        />
                    </div>
                </section>

                {/* Pricing Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-indigo-400">
                        <Terminal className="w-4 h-4" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Module 02: Commercial Logic</h3>
                        <div className="h-px bg-indigo-500/20 flex-grow" />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <ControlInput
                            label="PRICING_HEADER"
                            subLabel="Section title"
                            value={content?.pricing?.title || ''}
                            onChange={(v) => handleLocalChange('pricing.title', v)}
                            onSave={() => updateField('pricing.title', content.pricing.title)}
                            saving={saving}
                        />
                        <ControlInput
                            label="PRICING_SUBTEXT"
                            subLabel="Marketing copy under title"
                            value={content?.pricing?.description || ''}
                            onChange={(v) => handleLocalChange('pricing.description', v)}
                            onSave={() => updateField('pricing.description', content.pricing.description)}
                            saving={saving}
                        />
                    </div>
                </section>

            </div>

            <div className="bg-zinc-950 p-4 border-t border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-600 font-mono">
                    SECURE CONNECTION ESTABLISHED. ALL CHANGES ARE DEPLOYED INSTANTLY.
                </p>
            </div>
        </div>
    );
};

const ControlInput = ({ label, subLabel, value, onChange, onSave, saving }: { label: string, subLabel?: string, value: string, onChange: (v: string) => void, onSave: () => void, saving: boolean }) => {
    return (
        <div className="group relative bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <label className="text-xs font-bold font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors block">{label}</label>
                    {subLabel && <p className="text-[10px] text-zinc-600">{subLabel}</p>}
                </div>
            </div>

            <div className="flex gap-3 mt-3">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-grow bg-zinc-950/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 font-mono focus:outline-none focus:border-purple-500/50 focus:bg-zinc-900 transition-all placeholder:text-zinc-700"
                    placeholder="Enter value..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onSave();
                    }}
                />
                <button
                    onClick={onSave}
                    disabled={saving}
                    className="px-3 bg-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-400 rounded-lg border border-transparent hover:border-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                >
                    <Save className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    )
}
