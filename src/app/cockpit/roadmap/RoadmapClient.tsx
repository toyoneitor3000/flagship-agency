'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, Clock, Check, Layers,
  Terminal, ShieldCheck, ArrowRight, RefreshCw,
  Sparkles, Calendar, Rocket, Cpu, Database,
  ExternalLink, ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';
import { Phase, ChecklistItem, calculateChecklistStats } from '@/config/hybrid-lab-checklist';

interface RoadmapClientProps {
  initialPhases: Phase[];
}

const CATEGORY_TAGS: Record<string, { label: string; color: string; icon: any }> = {
  identidad: { label: 'Identidad Visual', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Sparkles },
  '3d-engine': { label: 'Motor 3D WebGL', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', icon: Cpu },
  marketplace: { label: 'Marketplace', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: Layers },
  'pasarela-pagos': { label: 'Pasarela de Pagos', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20', icon: ShieldCheck },
  infra: { label: 'Infraestructura / Cloud', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Terminal },
  architecture: { label: 'Arquitectura', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', icon: Database },
  engine: { label: 'Motor Cognitivo', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Cpu },
  frontend: { label: 'Laboratorio / UI', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', icon: Layers },
  transaccional: { label: 'Transaccional', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: ShieldCheck },
  devops: { label: 'DevOps / Cloud', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Terminal }
};

export const RoadmapClient: React.FC<RoadmapClientProps> = ({ initialPhases }) => {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stats = calculateChecklistStats(phases);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleItem = async (itemId: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setIsUpdating(itemId);

    // Optimistic Update
    setPhases(prev =>
      prev.map(phase => ({
        ...phase,
        items: phase.items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              completed: nextStatus,
              completedAt: nextStatus ? new Date().toISOString().split('T')[0] : undefined
            };
          }
          return item;
        })
      }))
    );

    try {
      const res = await fetch('/api/cockpit/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, completed: nextStatus })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.phases) {
          setPhases(data.phases);
        }
        triggerToast(nextStatus ? '✓ Tarea marcada como completada' : 'Tarea reabierta como pendiente');
      }
    } catch (e) {
      console.error('Error al actualizar checklist:', e);
      triggerToast('Error al persistir estado en servidor');
    } finally {
      setIsUpdating(null);
    }
  };

  const togglePhaseCollapse = (phaseId: string) => {
    setCollapsedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const filteredPhases = phases
    .filter(p => phaseFilter === 'all' || p.id === phaseFilter)
    .map(p => ({
      ...p,
      items: p.items.filter(item => {
        if (filter === 'pending') return !item.completed;
        if (filter === 'completed') return item.completed;
        return true;
      })
    }))
    .filter(p => p.items.length > 0 || filter === 'all');

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans pb-24 selection:bg-purple-500/30">
      
      {/* GLOW DECORATIVO DE FONDO */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px]" />
      </div>

      {/* HEADER SUPERIOR */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/cockpit"
              className="text-xs font-mono text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              Cockpit <span className="text-zinc-700">/</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-sm font-bold tracking-wider uppercase font-mono text-zinc-200">
                Híbrido Laboratorio // Master Checklist
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hibrido"
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
            >
              <span>Ver Web Híbrido</span>
              <ExternalLink className="w-3 h-3 text-purple-400" />
            </Link>
            <Link
              href="/cockpit/proposals"
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>Propuestas PDF</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </Link>
            <Link
              href="/lab"
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>Ver Laboratorio</span>
              <ArrowRight className="w-3 h-3 text-zinc-500" />
            </Link>
          </div>
        </div>
      </header>

      {/* PANEL PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* HERO Y MÉTRICAS DE PROGRESO */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            
            {/* TEXTOS Y CONTEXTO */}
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Roadmap de Ejecución • 8 Semanas</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                Construcción de la Plataforma Híbrida
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
                Cronograma operativo y lista de verificación interactiva para consolidar la arquitectura de{' '}
                <strong className="text-zinc-200">Purrpurr</strong>: fusionando la aceleración visual del Laboratorio de Diseño con la solidez transaccional, criptográfica y multi-tenant de ingeniería.
              </p>
            </div>

            {/* CARD DE PROGRESO */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center min-w-[280px] shadow-xl">
              <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-zinc-800"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * stats.percentage) / 100}
                    strokeLinecap="round"
                    className="text-emerald-400 transition-all duration-700 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black font-mono text-white leading-none">{stats.percentage}%</span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Listo</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-2 text-center pt-2 border-t border-zinc-800/80 font-mono text-xs">
                <div className="bg-zinc-900/60 p-2 rounded-lg">
                  <p className="text-zinc-500 text-[10px] uppercase">Completadas</p>
                  <p className="text-base font-bold text-emerald-400">{stats.completed} / {stats.total}</p>
                </div>
                <div className="bg-zinc-900/60 p-2 rounded-lg">
                  <p className="text-zinc-500 text-[10px] uppercase">Pendientes</p>
                  <p className="text-base font-bold text-amber-400">{stats.pending}</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* BARRA DE FILTROS Y CONTROLES */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/60 font-mono text-xs">
          
          {/* FILTRO POR ESTADO */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-zinc-500 uppercase px-2 text-[10px]">Filtrar:</span>
            {[
              { id: 'all', label: `Todos (${stats.total})` },
              { id: 'pending', label: `Pendientes (${stats.pending})` },
              { id: 'completed', label: `Completados (${stats.completed})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-zinc-200 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* FILTRO POR FASE */}
          <div className="flex items-center gap-2 justify-end">
            <select
              value={phaseFilter}
              onChange={e => setPhaseFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-300 outline-none hover:border-zinc-700 cursor-pointer text-xs"
            >
              <option value="all">Todas las Fases (1 a 4)</option>
              {phases.map(p => (
                <option key={p.id} value={p.id}>
                  Fase {p.number}: {p.title}
                </option>
              ))}
            </select>
          </div>

        </section>

        {/* LISTADO DE FASES Y TAREAS */}
        <section className="space-y-6">
          {filteredPhases.map((phase) => {
            const isCollapsed = collapsedPhases[phase.id] || false;
            const phaseCompleted = phase.items.filter(i => i.completed).length;
            const phaseTotal = phase.items.length;
            const phaseProgress = phaseTotal === 0 ? 0 : Math.round((phaseCompleted / phaseTotal) * 100);

            return (
              <div
                key={phase.id}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/80 shadow-lg"
              >
                {/* ENCABEZADO DE LA FASE */}
                <div
                  onClick={() => togglePhaseCollapse(phase.id)}
                  className="p-5 sm:p-6 bg-zinc-900/70 border-b border-zinc-800/80 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-sm text-zinc-300 shrink-0">
                      0{phase.number}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/30">
                          {phase.badge}
                        </span>
                        <span className="text-zinc-500 text-xs font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {phase.weeks}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{phase.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex flex-col items-end text-right font-mono text-xs">
                      <span className="text-zinc-400 font-bold">{phaseCompleted} / {phaseTotal} tareas</span>
                      <span className="text-[10px] text-zinc-500">{phaseProgress}% completado</span>
                    </div>

                    <button
                      type="button"
                      className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors"
                    >
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* CONTENIDO Y TAREAS DE LA FASE */}
                {!isCollapsed && (
                  <div className="divide-y divide-zinc-800/60">
                    {phase.items.map((item) => {
                      const categoryInfo = CATEGORY_TAGS[item.category] || CATEGORY_TAGS.architecture;
                      const Icon = categoryInfo.icon;
                      const isTaskUpdating = isUpdating === item.id;

                      return (
                        <div
                          key={item.id}
                          className={`p-5 sm:p-6 transition-all duration-200 flex items-start gap-4 ${
                            item.completed
                              ? 'bg-zinc-950/40 text-zinc-400'
                              : 'bg-zinc-900/20 hover:bg-zinc-800/20 text-zinc-200'
                          }`}
                        >
                          {/* CHECKBOX INTERACTIVO */}
                          <button
                            onClick={() => toggleItem(item.id, item.completed)}
                            disabled={isTaskUpdating}
                            title={item.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                            className={`mt-1 w-6 h-6 rounded-lg border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                              item.completed
                                ? 'bg-emerald-500 border-emerald-400 text-zinc-950 shadow-sm shadow-emerald-500/20'
                                : 'bg-zinc-950 border-zinc-700 hover:border-emerald-400 text-transparent hover:text-emerald-400/40'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>

                          {/* INFORMACIÓN DE LA TAREA */}
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4
                                className={`text-base font-bold transition-all ${
                                  item.completed
                                    ? 'line-through text-zinc-500 decoration-zinc-600'
                                    : 'text-white'
                                }`}
                              >
                                {item.title}
                              </h4>

                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 ${categoryInfo.color}`}>
                                  <Icon className="w-3 h-3" />
                                  {categoryInfo.label}
                                </span>

                                {item.completed && (
                                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                    COMPLETADA {item.completedAt && `• ${item.completedAt}`}
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className={`text-xs sm:text-sm leading-relaxed ${item.completed ? 'text-zinc-500' : 'text-zinc-400'}`}>
                              {item.description}
                            </p>

                            {/* ENTREGABLES CLAVE */}
                            <div className="pt-2">
                              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                                Entregables Técnicos:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {item.deliverables.map((deliv, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border ${
                                      item.completed
                                        ? 'bg-zinc-950/60 border-zinc-800 text-zinc-600 line-through'
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                                    }`}
                                  >
                                    • {deliv}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </section>

      </main>

      {/* TOAST DE FEEDBACK INMEDIATO */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
