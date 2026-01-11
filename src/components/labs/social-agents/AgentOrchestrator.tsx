'use client';

import { motion } from 'framer-motion';
import { Bot, Activity } from 'lucide-react';

const AGENTS = [
    { id: 'brain', name: 'Agent: Brain', role: 'Strategy & Trends', status: 'Active', color: '#8f69ff' },
    { id: 'visual', name: 'Agent: Visual', role: 'Graphic Generation', status: 'Generating', color: '#00FF9C' },
    { id: 'copy', name: 'Agent: Voice', role: 'Copywriting', status: 'Idle', color: '#a78bfa' },
    { id: 'social', name: 'Agent: Ops', role: 'Distribution', status: 'Monitoring', color: '#f0ffcc' },
];

export const AgentOrchestrator = () => {
    return (
        <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl h-full">
            <h2 className="flex items-center gap-2 font-display font-bold mb-6 text-white uppercase tracking-wider">
                <Activity className="w-4 h-4 text-[#8f69ff]" />
                ORCHESTRATOR_STATUS
            </h2>
            <div className="space-y-4">
                {AGENTS.map((agent) => (
                    <div key={agent.id} className="group relative p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors"
                                    style={{
                                        backgroundColor: `${agent.color}10`,
                                        borderColor: `${agent.color}30`
                                    }}
                                >
                                    <Bot className="w-5 h-5" style={{ color: agent.color }} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold font-mono text-white">{agent.name}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{agent.role}</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${agent.status === 'Active' ? 'bg-indigo-500/10 text-indigo-400' :
                                        agent.status === 'Generating' ? 'bg-emerald-500/10 text-emerald-400' :
                                            'bg-zinc-500/10 text-zinc-500'
                                    }`}>
                                    {agent.status}
                                </span>
                                {agent.status === 'Generating' && (
                                    <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden mt-1">
                                        <motion.div
                                            className="h-full bg-emerald-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
