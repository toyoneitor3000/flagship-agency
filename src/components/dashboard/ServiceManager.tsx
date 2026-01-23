"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Clock,
    CheckCircle2,
    AlertCircle,
    Layers,
    Zap,
    MessageSquare,
    ChevronRight,
    Send,
    Loader2
} from 'lucide-react';
import { createCreativeTask } from '@/app/actions/creative-tasks';

interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    type: string;
    createdAt: Date | string;
}

interface ServiceManagerProps {
    initialTasks: any[];
}

export function ServiceManager({ initialTasks }: ServiceManagerProps) {
    const [tasks, setTasks] = useState(initialTasks);
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'NORMAL',
        type: 'DESIGN'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newTask = await createCreativeTask(formData);
            setTasks([newTask, ...tasks]);
            setIsCreating(false);
            setFormData({ title: '', description: '', priority: 'NORMAL', type: 'DESIGN' });
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'IN_PROGRESS': return <Zap className="w-4 h-4 text-blue-500 animate-pulse" />;
            case 'DONE': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            default: return <AlertCircle className="w-4 h-4 text-zinc-500" />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'PENDING': return 'En espera';
            case 'IN_PROGRESS': return 'En desarrollo';
            case 'DONE': return 'Completado';
            default: return status;
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    Solicitudes Creativas
                </h2>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Solicitud
                </button>
            </div>

            {/* TASK LIST */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode='popLayout'>
                    {tasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-zinc-900/40 border border-dashed border-white/10 rounded-2xl p-12 text-center"
                        >
                            <div className="w-12 h-12 bg-zinc-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                                <MessageSquare className="w-6 h-6 text-zinc-700" />
                            </div>
                            <p className="text-zinc-500 text-sm">No tienes solicitudes activas.</p>
                            <p className="text-zinc-600 text-xs mt-1">Tu equipo creativo está listo para empezar.</p>
                        </motion.div>
                    ) : (
                        tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group bg-zinc-900/40 border border-white/5 p-5 rounded-2xl hover:border-indigo-500/30 transition-all flex items-center justify-between"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${task.priority === 'URGENT' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                task.priority === 'HIGH' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                                                    'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                                            }`}>
                                            {task.priority === 'NORMAL' ? 'Standard' : task.priority}
                                        </span>
                                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{task.type}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{task.title}</h3>
                                    <p className="text-xs text-zinc-500 line-clamp-1 max-w-md">{task.description}</p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 justify-end mb-1">
                                            {getStatusIcon(task.status)}
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                                                {getStatusLabel(task.status)}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-zinc-600 font-mono">
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-indigo-500 transition-colors" />
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* CREATE MODAL */}
            <AnimatePresence>
                {isCreating && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCreating(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-zinc-950 border border-white/10 rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Plus className="w-32 h-32 rotate-45" />
                            </div>

                            <form onSubmit={handleSubmit} className="relative space-y-6">
                                <div>
                                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Solicitar Ejecución</h2>
                                    <p className="text-sm text-zinc-500">Define lo que necesitas y nosotros nos encargamos del resto.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest pl-1">Título de la Obra</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Ej: Post Instagram Lanzamiento"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest pl-1">Categoría</label>
                                            <select
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-colors appearance-none"
                                            >
                                                <option value="DESIGN">Diseño Gráfico</option>
                                                <option value="MOTION">Motion Graphics</option>
                                                <option value="STRATEGY">Estrategia</option>
                                                <option value="OTHER">Otros</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest pl-1">Prioridad</label>
                                            <select
                                                value={formData.priority}
                                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-colors appearance-none"
                                            >
                                                <option value="NORMAL">Standard</option>
                                                <option value="HIGH">Alta</option>
                                                <option value="URGENT">Urgente</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest pl-1">Descripción / Brief</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="¿Qué debemos lograr? Incluye medidas, textos o referencias..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreating(false)}
                                        className="flex-1 px-6 py-4 rounded-xl text-sm font-bold text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        disabled={isLoading}
                                        className="flex-[2] bg-indigo-600 text-white rounded-xl py-4 font-bold text-sm hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/20 active:scale-95 flex items-center justify-center gap-2 group"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Enviar Solicitud
                                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
