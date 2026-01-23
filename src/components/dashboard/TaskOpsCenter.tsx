"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    Zap,
    CheckCircle2,
    AlertCircle,
    Activity,
    User,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { updateCreativeTaskStatus } from '@/app/actions/creative-tasks';

interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    userId: string;
    createdAt: Date | string;
    user?: {
        name: string;
        email: string;
    };
}

interface TaskOpsCenterProps {
    initialTasks: any[];
}

export function TaskOpsCenter({ initialTasks }: TaskOpsCenterProps) {
    const [tasks, setTasks] = useState(initialTasks);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleStatusChange = async (taskId: string, newStatus: string) => {
        setLoadingId(taskId);
        try {
            await updateCreativeTaskStatus(taskId, newStatus);
            setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <section className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        Centro de Operaciones Creativas
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1">Cola de producción global de todos los suscriptores.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-zinc-950 border border-white/5 rounded-full text-[10px] font-mono text-zinc-500">
                        {tasks.filter(t => t.status === 'PENDING').length} PENDIENTES
                    </span>
                </div>
            </div>

            <div className="divide-y divide-white/5">
                {tasks.length === 0 ? (
                    <div className="p-12 text-center text-zinc-600 text-sm italic">
                        No hay tareas en la cola de producción.
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="p-6 hover:bg-white/[0.01] transition-colors flex items-center justify-between group">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${task.priority === 'URGENT' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                            task.priority === 'HIGH' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                                                'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                        }`}>
                                        {task.priority === 'NORMAL' ? 'Standard' : task.priority}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-medium uppercase tracking-widest">
                                        <User className="w-3 h-3" />
                                        {task.user?.name || 'Cliente'}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-zinc-200">{task.title}</h3>
                                    <p className="text-xs text-zinc-500 mt-1 max-w-2xl">{task.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex bg-zinc-950 rounded-xl p-1 border border-white/5">
                                    <button
                                        onClick={() => handleStatusChange(task.id, 'PENDING')}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${task.status === 'PENDING' ? 'bg-zinc-800 text-yellow-500' : 'text-zinc-600 hover:text-zinc-400'
                                            }`}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(task.id, 'IN_PROGRESS')}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${task.status === 'IN_PROGRESS' ? 'bg-zinc-800 text-blue-400' : 'text-zinc-600 hover:text-zinc-400'
                                            }`}
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(task.id, 'DONE')}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${task.status === 'DONE' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-600 hover:text-zinc-400'
                                            }`}
                                    >
                                        Done
                                    </button>
                                </div>
                                {loadingId === task.id && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
