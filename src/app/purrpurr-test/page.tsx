'use client';

import { useState } from 'react';
import { PurrpurrGuide } from '@/components/purrpurr/PurrpurrGuide';
import { PurrpurrSuccess } from '@/components/purrpurr/PurrpurrSuccess';
import { PurrpurrGlitch } from '@/components/purrpurr/PurrpurrGlitch';
import { PurrpurrLoader } from '@/components/purrpurr/PurrpurrLoader';
import { PurrpurrInvestigator } from '@/components/purrpurr/PurrpurrInvestigator';
import Link from 'next/link';

export default function PurrpurrTestPage() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorTrigger, setErrorTrigger] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8 font-sans pb-32" data-section-theme='dark'>
            {/* 3. INTRO MODE DEMO */}
            <PurrpurrGuide mode="intro" tip="Welcome! I am Purrpurr, your holographic guide. I will disappear in a few seconds." />

            {/* 1. FLOATING MODE DEMO */}
            <PurrpurrGuide mode="floating" tip="I am always here floating if you need me!" />

            <header className="mb-12 border-b border-zinc-800 pb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                    Purrpurr Component Laboratory
                </h1>
                <p className="text-zinc-400">Testing all 5 Guide Modes + Assets.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* 01. LOADER */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-purple-400">01.</span> PurrpurrLoader
                    </h2>
                    <div className="h-64 flex flex-col items-center justify-center bg-black/50 rounded-lg mb-4 border border-zinc-800 relative overflow-hidden">
                        <PurrpurrLoader />
                        <Link
                            href="/purrpurr-test/slow"
                            className="mt-6 text-xs bg-purple-900/40 text-purple-200 px-3 py-1.5 rounded border border-purple-800 hover:bg-purple-900/60 transition-colors z-10"
                        >
                            Test Real Loading (3s Delay) &rarr;
                        </Link>
                    </div>
                </section>

                {/* 02. INVESTIGATOR */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-purple-400">02.</span> PurrpurrInvestigator
                    </h2>
                    <div className="h-64 flex flex-col items-center justify-center bg-black/50 rounded-lg mb-4 border border-zinc-800 overflow-hidden relative">
                        {/* Scaled down for demo */}
                        <div className="scale-75 origin-center">
                            <PurrpurrInvestigator />
                        </div>
                    </div>
                    <p className="text-xs text-center text-zinc-500">Normally appears on 404 Pages</p>
                </section>

                {/* --- GUIDE MODES SHOWCASE --- */}
                <div className="col-span-1 md:col-span-2 bg-zinc-900/30 p-8 rounded-2xl border border-purple-500/20">
                    <h2 className="text-2xl font-bold mb-8 text-white">Purrpurr Guide Scenarios</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 2. CONTEXTUAL */}
                        <div className="flex flex-col items-center gap-4 bg-zinc-950 p-6 rounded-xl border border-zinc-800">
                            <h3 className="text-purple-400 font-mono text-sm">MODE: CONTEXTUAL</h3>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-zinc-500">Complex Input</span>
                                <PurrpurrGuide mode="contextual" tip="This is the standard contextual help." />
                            </div>
                        </div>

                        {/* 4. ERROR */}
                        <div className="flex flex-col items-center gap-4 bg-zinc-950 p-6 rounded-xl border border-red-900/30">
                            <h3 className="text-red-400 font-mono text-sm">MODE: ERROR</h3>
                            <button
                                onClick={() => setErrorTrigger(!errorTrigger)}
                                className="px-4 py-2 bg-red-900/50 text-red-200 text-xs rounded border border-red-800"
                            >
                                Toggle Error
                            </button>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-zinc-500">Password Field</span>
                                <PurrpurrGuide mode="error" isVisible={errorTrigger} tip="Critical Error! Systems failing!" />
                            </div>
                        </div>

                        {/* 5. TOUR */}
                        <div className="flex flex-col items-center gap-4 bg-zinc-950 p-6 rounded-xl border border-blue-900/30">
                            <h3 className="text-blue-400 font-mono text-sm">MODE: TOUR</h3>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-zinc-500">Step 1 of 3</span>
                                <PurrpurrGuide mode="tour" tip="Click next to continue the tour." onNext={() => alert('Going to step 2...')} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Existing Components */}
                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-purple-400">04.</span> PurrpurrSuccess
                    </h2>
                    <div className="flex flex-col items-center justify-center h-48 gap-4">
                        <button
                            onClick={() => setShowSuccess(true)}
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
                        >
                            Trigger Success Modal
                        </button>
                    </div>
                </section>

                <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/50">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-purple-400">05.</span> PurrpurrGlitch
                    </h2>
                    <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg h-32">
                        <span className="text-zinc-600 font-mono text-sm">System Monitor &rarr;</span>
                        <PurrpurrGlitch />
                    </div>
                </section>

            </div>

            {showSuccess && (
                <PurrpurrSuccess
                    message="Everything is working purr-fectly!"
                    onDismiss={() => setShowSuccess(false)}
                />
            )}
        </div>
    );
}
