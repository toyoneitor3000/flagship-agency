"use client";

import { useEffect, useState } from "react";
import { GitBranch, RefreshCw, Send, Terminal, Info, X, Edit3, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { AnimatePresence, motion } from "framer-motion";

interface Commit {
    hash: string;
    author: string;
    date: string;
    message: string;
}

export function GithubHistory() {
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState<string | null>(null);
    const [editingCommit, setEditingCommit] = useState<Commit | null>(null);
    const [customMessage, setCustomMessage] = useState("");
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/git-history");
            const data = await res.json();
            if (Array.isArray(data)) {
                setCommits(data);
            }
        } catch (error) {
            console.error("Failed to fetch git history", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const startPublish = (commit: Commit) => {
        setEditingCommit(commit);
        // User wants the commit message as the primary title
        setCustomMessage(commit.message);
    };

    const handlePublish = async () => {
        if (!editingCommit) return;

        setPublishing(editingCommit.hash);
        try {
            const res = await fetch("/api/admin/changelog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: customMessage,
                    // Private identity: refer to the team
                    description: `Mejora de sistema implementada por el equipo de Purrpurr.`,
                    technicalDetails: `Identificador: ${editingCommit.hash}\nFecha de despliegue: ${editingCommit.date}\nReferencia: ${editingCommit.message}`,
                    githubCommitHash: editingCommit.hash,
                    type: "UPDATE",
                    isPublished: true
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setNotification({ message: "Noticia publicada con éxito", type: "success" });
                setEditingCommit(null);
            } else {
                setNotification({ message: `Error: ${data.details || data.error || "No se pudo publicar"}`, type: "error" });
            }
        } catch (error) {
            console.error("Error publishing update", error);
            setNotification({ message: "Error de red al publicar", type: "error" });
        } finally {
            setPublishing(null);
        }
    };

    return (
        <section className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 overflow-hidden relative">
            <AnimatePresence>
                {notification && (
                    <Toast
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
                        <GitBranch className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white leading-tight">Control de Publicaciones</h2>
                        <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Ecosistema de Despliegues</p>
                    </div>
                </div>
                <button
                    onClick={fetchHistory}
                    className="p-2.5 bg-zinc-950/50 hover:bg-zinc-900 border border-white/5 rounded-xl transition-all hover:scale-105 active:scale-95"
                    title="Refrescar historial"
                >
                    <RefreshCw className={`w-4 h-4 text-zinc-400 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Editing Flow */}
            <AnimatePresence mode="wait">
                {editingCommit ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-8 p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl shadow-2xl backdrop-blur-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-purple-300 flex items-center gap-2 text-sm uppercase tracking-wider">
                                <Edit3 className="w-4 h-4" />
                                Redactar Noticia Pública
                            </h3>
                            <button onClick={() => setEditingCommit(null)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                                <X className="w-4 h-4 text-zinc-500" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Título de la Actualización</label>
                                <input
                                    type="text"
                                    value={customMessage}
                                    onChange={(e) => setCustomMessage(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all font-medium"
                                    placeholder="Nombre de la mejora..."
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-zinc-600 font-mono tracking-tighter">COMMIT ID</span>
                                    <span className="text-[11px] text-purple-400/60 font-mono font-bold">{editingCommit.hash}</span>
                                </div>
                                <button
                                    onClick={handlePublish}
                                    disabled={publishing === editingCommit.hash || !customMessage.trim()}
                                    className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-900/40 disabled:opacity-50 active:scale-95 hover:shadow-purple-500/20"
                                >
                                    {publishing === editingCommit.hash ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    Publicar en Pu News
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="space-y-3">
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-white/5 animate-pulse rounded-2xl border border-white/5" />
                        ))}
                    </div>
                ) : commits.length === 0 ? (
                    <div className="text-center py-16 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <p className="text-zinc-500 text-sm italic">Esperando nuevos despliegues en el repositorio...</p>
                    </div>
                ) : (
                    commits.map((commit, index) => (
                        <div
                            key={commit.hash}
                            className={`p-4 bg-zinc-950/40 border rounded-2xl flex flex-col gap-4 group transition-all duration-300
                                ${index === 0
                                    ? 'border-purple-500/30 bg-purple-500/5 shadow-lg shadow-purple-500/5'
                                    : 'border-white/5 hover:border-white/10 hover:bg-zinc-950/60'
                                }
                            `}
                        >
                            <div className="flex gap-3 items-start w-full">
                                <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors
                                    ${index === 0
                                        ? 'bg-purple-500/10 border-purple-500/30'
                                        : 'bg-zinc-900 border-white/5 group-hover:border-purple-500/20'
                                    }
                                `}>
                                    {index === 0 ? (
                                        <Zap className="w-5 h-5 text-purple-400" />
                                    ) : (
                                        <Terminal className="w-5 h-5 text-zinc-500 group-hover:text-purple-400/60 transition-colors" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1 py-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        {index === 0 && (
                                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-[9px] font-bold text-green-400 uppercase tracking-widest shrink-0">
                                                <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                                                Reciente
                                            </span>
                                        )}
                                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                                            <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                                                {commit.hash.substring(0, 7)}
                                            </span>
                                            <span className="text-zinc-600 font-medium uppercase tracking-wider whitespace-nowrap">
                                                • {commit.date}
                                            </span>
                                        </div>
                                    </div>
                                    <p className={`text-sm font-medium break-words whitespace-pre-wrap transition-colors leading-relaxed
                                        ${index === 0 ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}
                                    `}>
                                        {commit.message}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => startPublish(commit)}
                                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border active:scale-[0.98] flex items-center justify-center gap-2
                                    ${index === 0
                                        ? 'bg-purple-600 text-white border-purple-500 hover:bg-purple-500 shadow-md shadow-purple-500/20'
                                        : 'bg-white/5 hover:bg-purple-600/10 text-zinc-400 hover:text-purple-400 border-white/5 hover:border-purple-500/30'
                                    }
                                `}
                            >
                                {index === 0 ? 'Publicar Ahora' : 'Preparar'}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8 p-5 bg-zinc-950/80 border border-white/5 rounded-2xl flex items-start gap-4 shadow-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Info className="w-4 h-4 text-blue-400" />
                </div>
                <div className="space-y-1.5">
                    <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                        <span className="text-blue-400 font-extrabold uppercase mr-1.5 tracking-tighter">Pu Workflow:</span>
                        Usa este panel para transformar despliegues técnicos en noticias para tus clientes. Al publicar, se enviará una notificación global y la identidad del equipo se mantendrá <span className="text-zinc-200 font-semibold italic underline decoration-blue-500/40">privada</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
