'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const INITIAL_LOGS = [
    { time: '18:52:01', type: 'system', message: 'Purrpurr Lab Social Media Orchestrator initialized.' },
    { time: '18:52:05', type: 'brain', message: 'Analyzing current tech trends on X and LinkedIn...' },
    { time: '18:52:12', type: 'brain', message: 'Trend identified: "Strategy as Infrastructure".' },
    { time: '18:52:15', type: 'visual', message: 'Generating visual concept for "The Code Behind the Business".' },
    { time: '18:52:20', type: 'copy', message: 'Drafting caption for Instagram Reel (Hooks: Control, Scalability).' },
    { time: '18:52:45', type: 'system', message: 'Antigravity ID: Active and waiting for user input.' },
];

export const TerminalFeed = () => {
    const [logs, setLogs] = useState(INITIAL_LOGS);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    // Simulate new logs arriving
    useEffect(() => {
        const messages = [
            { type: 'brain', message: 'Scanning competitor engagement patterns...' },
            { type: 'visual', message: 'Optimizing color contrast for mobile viewing.' },
            { type: 'copy', message: 'Refining CTA: -> "Access Infrastructure".' },
            { type: 'social', message: 'Peak engagement window detected: 19:00 - 21:00.' },
        ];

        const interval = setInterval(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            const now = new Date();
            const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

            setLogs(prev => [...prev.slice(-15), { time: timeStr, ...randomMsg }]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black/80 border border-white/5 rounded-2xl p-6 font-mono overflow-hidden h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00FF9C]" />
                    <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">LIVE_EXECUTION_FEED</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-3 text-[11px] scrollbar-hide pr-2"
            >
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                        <span className={`uppercase font-bold shrink-0 ${log.type === 'system' ? 'text-zinc-400' :
                            log.type === 'brain' ? 'text-[#8f69ff]' :
                                log.type === 'visual' ? 'text-[#00FF9C]' : 'text-[#a78bfa]'
                            }`}>
                            {log.type}:
                        </span>
                        <span className="text-zinc-300 break-words">{log.message}</span>
                    </div>
                ))}
                <div className="flex gap-2 items-center">
                    <span className="text-emerald-500 shrink-0">➜</span>
                    <div className="w-2 h-4 bg-emerald-500 animate-pulse shrink-0" />
                </div>
            </div>
        </div>
    );
};
