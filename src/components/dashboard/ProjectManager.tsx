'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
    Layout,
    Plus,
    MoreVertical,
    Edit3,
    Trash2,
    History,
    ExternalLink,
    X,
    Save,
    AlertTriangle,
    RotateCcw,
    Check,
    Loader2,
    GitBranch,
    Clock,
    Tag,
    ChevronRight
} from 'lucide-react';

interface ProjectVersion {
    id: string;
    name: string;
    description: string | null;
    architecture: string;
    createdAt: string;
}

interface Project {
    id: string;
    name: string;
    slug: string;
    status: string;
    architecture: string;
    createdAt: string;
    updatedAt: string;
    versions?: ProjectVersion[];
}

interface ProjectManagerProps {
    initialProjects: Project[];
}

// Helper function to format relative time
function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `hace ${diffMins}m`;
    if (diffHours < 24) return `hace ${diffHours}h`;
    if (diffDays < 7) return `hace ${diffDays}d`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export function ProjectManager({ initialProjects }: ProjectManagerProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showDropdown, setShowDropdown] = useState<string | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVersionsModal, setShowVersionsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form state for editing
    const [editForm, setEditForm] = useState({
        name: '',
        slug: '',
        status: 'DRAFT'
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setShowDropdown(null);
        if (showDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showDropdown]);

    // Clear messages after 3 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const openEditModal = (project: Project) => {
        setSelectedProject(project);
        setEditForm({
            name: project.name,
            slug: project.slug,
            status: project.status
        });
        setShowEditModal(true);
        setShowDropdown(null);
    };

    const openDeleteModal = (project: Project) => {
        setSelectedProject(project);
        setShowDeleteModal(true);
        setShowDropdown(null);
    };

    const openVersionsModal = async (project: Project) => {
        setIsLoading(true);
        setShowDropdown(null);

        try {
            const res = await fetch(`/api/purrpurr/project?id=${project.id}`);
            const data = await res.json();

            if (data.success) {
                setSelectedProject(data.project);
                setShowVersionsModal(true);
            } else {
                setError(data.error || 'Error al cargar versiones');
            }
        } catch {
            setError('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!selectedProject) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/purrpurr/project', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: selectedProject.id,
                    ...editForm
                })
            });

            const data = await res.json();

            if (data.success) {
                setProjects(prev =>
                    prev.map(p => p.id === selectedProject.id ? data.project : p)
                );
                setSuccess('Proyecto actualizado exitosamente');
                setShowEditModal(false);
            } else {
                setError(data.error || 'Error al actualizar');
            }
        } catch {
            setError('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedProject) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/purrpurr/project?id=${selectedProject.id}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (data.success) {
                setProjects(prev => prev.filter(p => p.id !== selectedProject.id));
                setSuccess('Proyecto eliminado exitosamente');
                setShowDeleteModal(false);
            } else {
                setError(data.error || 'Error al eliminar');
            }
        } catch {
            setError('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRestoreVersion = async (version: ProjectVersion) => {
        if (!selectedProject) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/purrpurr/project', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: selectedProject.id,
                    architecture: version.architecture,
                    createVersion: true
                })
            });

            const data = await res.json();

            if (data.success) {
                setProjects(prev =>
                    prev.map(p => p.id === selectedProject.id ? data.project : p)
                );
                setSelectedProject(data.project);
                setSuccess(`Restaurado a ${version.name}`);
            } else {
                setError(data.error || 'Error al restaurar');
            }
        } catch {
            setError('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    const createManualVersion = useCallback(async () => {
        if (!selectedProject) return;
        setIsLoading(true);
        setError(null);

        const versionName = prompt('Nombre de la versión (ej: v1.0):');
        if (!versionName) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/purrpurr/project/versions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: selectedProject.id,
                    name: versionName,
                    description: `Versión manual - ${new Date().toLocaleDateString('es-ES')}`
                })
            });

            const data = await res.json();

            if (data.success) {
                // Refresh project data
                const projectRes = await fetch(`/api/purrpurr/project?id=${selectedProject.id}`);
                const projectData = await projectRes.json();
                if (projectData.success) {
                    setSelectedProject(projectData.project);
                }
                setSuccess('Versión creada exitosamente');
            } else {
                setError(data.error || 'Error al crear versión');
            }
        } catch {
            setError('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    }, [selectedProject]);

    return (
        <section className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Layout className="w-5 h-5 text-purple-400" />
                    Proyectos Activos
                </h2>
                <Link
                    href="/studio"
                    className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Proyecto
                </Link>
            </div>

            {/* Notifications */}
            {(error || success) && (
                <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${error ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                    {error ? <AlertTriangle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    {error || success}
                </div>
            )}

            {/* Projects Grid */}
            {projects.length === 0 ? (
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-zinc-950/30">
                    <p className="text-zinc-500 mb-4">No has iniciado ningún proyecto aún.</p>
                    <Link href="/studio" className="text-purple-400 hover:text-purple-300 text-sm font-mono underline">
                        Inicia el Architect Studio &rarr;
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-zinc-950 border border-white/5 p-4 rounded-xl hover:border-purple-500/50 transition-colors group/item relative"
                        >
                            {/* Project Header */}
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-lg font-bold truncate pr-2">{project.name}</div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${project.status === 'PUBLISHED'
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {project.status}
                                    </span>

                                    {/* Dropdown Menu */}
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowDropdown(showDropdown === project.id ? null : project.id);
                                            }}
                                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            <MoreVertical className="w-4 h-4 text-zinc-400" />
                                        </button>

                                        {showDropdown === project.id && (
                                            <div
                                                className="absolute right-0 top-8 bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50 min-w-[160px] overflow-hidden"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => openEditModal(project)}
                                                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 flex items-center gap-2 text-zinc-300"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => openVersionsModal(project)}
                                                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 flex items-center gap-2 text-zinc-300"
                                                >
                                                    <History className="w-4 h-4" />
                                                    Versiones
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(project)}
                                                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-red-500/10 flex items-center gap-2 text-red-400"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Eliminar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="text-xs text-zinc-500 font-mono mb-3">
                                <div className="flex items-center gap-1">
                                    <span className="text-zinc-600">/</span>{project.slug}
                                </div>
                            </div>

                            {/* Version Badge - Quick Access Button */}
                            <button
                                onClick={() => openVersionsModal(project)}
                                className="w-full mb-4 p-2.5 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group/versions"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs font-medium text-zinc-300">Control de Versiones</div>
                                            <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {getRelativeTime(project.updatedAt)}
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover/versions:text-blue-400 group-hover/versions:translate-x-0.5 transition-all" />
                                </div>
                            </button>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Link
                                    href={`/sites/${project.slug}`}
                                    target="_blank"
                                    className="flex-1 bg-zinc-900 border border-white/5 hover:border-white/20 h-10 rounded-lg flex items-center justify-center text-xs font-mono text-zinc-400 hover:text-white transition-all gap-1"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    VER SITIO
                                </Link>
                                <Link
                                    href={`/studio?id=${project.id}`}
                                    className="flex-1 bg-white text-black h-10 rounded-lg flex items-center justify-center text-xs font-bold hover:bg-zinc-200 transition-colors"
                                >
                                    EDITAR
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedProject && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-purple-400" />
                            Editar Proyecto
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1.5">Nombre</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-1.5">Slug (URL)</label>
                                <div className="flex items-center bg-zinc-950 border border-white/10 rounded-lg overflow-hidden focus-within:border-purple-500 transition-colors">
                                    <span className="px-3 text-zinc-500 text-sm">/sites/</span>
                                    <input
                                        type="text"
                                        value={editForm.slug}
                                        onChange={(e) => setEditForm(prev => ({
                                            ...prev,
                                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                                        }))}
                                        className="flex-1 bg-transparent py-2.5 pr-4 text-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-1.5">Estado</label>
                                <select
                                    value={editForm.status}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none transition-colors"
                                >
                                    <option value="DRAFT">Borrador</option>
                                    <option value="PUBLISHED">Publicado</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="flex-1 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={isLoading}
                                className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedProject && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-red-500/30 rounded-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-400">Eliminar Proyecto</h3>
                                <p className="text-sm text-zinc-400">Esta acción es irreversible</p>
                            </div>
                        </div>

                        <p className="text-zinc-300 mb-6">
                            ¿Estás seguro de que deseas eliminar <strong className="text-white">{selectedProject.name}</strong>?
                            Se eliminarán todas las versiones y datos asociados.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Versions Modal with Timeline */}
            {showVersionsModal && selectedProject && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-2xl w-full p-6 relative max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowVersionsModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                                    <GitBranch className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Control de Versiones</h3>
                                    <p className="text-sm text-zinc-500">{selectedProject.name}</p>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className="flex items-center gap-4 mt-4 p-3 bg-zinc-950/50 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm text-zinc-400">
                                        <strong className="text-white">{(selectedProject.versions?.length || 0) + 1}</strong> versiones
                                    </span>
                                </div>
                                <div className="w-px h-4 bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-zinc-400">
                                        Última: <strong className="text-white">{getRelativeTime(selectedProject.updatedAt)}</strong>
                                    </span>
                                </div>
                                <div className="flex-1" />
                                <button
                                    onClick={createManualVersion}
                                    disabled={isLoading}
                                    className="px-3 py-1.5 text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Crear Snapshot
                                </button>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-zinc-700" />

                                {/* Current Version - HEAD */}
                                <div className="relative pl-12 pb-6">
                                    {/* Timeline Node */}
                                    <div className="absolute left-0 top-0">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                                            <Check className="w-5 h-5 text-purple-400" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-bold text-purple-400">HEAD</span>
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">ACTUAL</span>
                                                </div>
                                                <div className="text-xs text-zinc-400">Versión activa en producción</div>
                                                <div className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(selectedProject.updatedAt).toLocaleString('es-ES', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/sites/${selectedProject.slug}`}
                                                    target="_blank"
                                                    className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    Ver
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Version History */}
                                {selectedProject.versions && selectedProject.versions.length > 0 ? (
                                    selectedProject.versions.map((version, index) => (
                                        <div key={version.id} className="relative pl-12 pb-6">
                                            {/* Timeline Node */}
                                            <div className="absolute left-0 top-0">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${index === 0
                                                        ? 'bg-blue-500/20 border-2 border-blue-500/50'
                                                        : 'bg-zinc-800 border-2 border-zinc-700'
                                                    }`}>
                                                    <History className={`w-4 h-4 ${index === 0 ? 'text-blue-400' : 'text-zinc-500'}`} />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className={`border rounded-xl p-4 transition-all hover:border-white/20 ${index === 0
                                                    ? 'bg-zinc-950/80 border-blue-500/20'
                                                    : 'bg-zinc-950/50 border-white/5'
                                                }`}>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-bold text-white">{version.name}</span>
                                                            {index === 0 && (
                                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                                                                    ANTERIOR
                                                                </span>
                                                            )}
                                                        </div>
                                                        {version.description && (
                                                            <div className="text-xs text-zinc-400 mb-2">{version.description}</div>
                                                        )}
                                                        <div className="text-xs text-zinc-500 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(version.createdAt).toLocaleString('es-ES', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRestoreVersion(version)}
                                                        disabled={isLoading}
                                                        className="ml-4 px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 border border-white/10 hover:border-white/20 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-50 group"
                                                    >
                                                        <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-[-45deg] transition-transform" />
                                                        Restaurar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative pl-12 pb-6">
                                        <div className="absolute left-0 top-0">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-700 flex items-center justify-center">
                                                <Plus className="w-4 h-4 text-zinc-600" />
                                            </div>
                                        </div>
                                        <div className="border border-dashed border-white/10 rounded-xl p-6 text-center">
                                            <History className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
                                            <p className="text-sm text-zinc-400">No hay versiones anteriores</p>
                                            <p className="text-xs text-zinc-600 mt-1">
                                                Crea un snapshot para guardar el estado actual
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <p className="text-xs text-zinc-500">
                                Los snapshots guardan el estado completo del proyecto
                            </p>
                            <button
                                onClick={() => setShowVersionsModal(false)}
                                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Global Loading Overlay */}
            {isLoading && !showEditModal && !showDeleteModal && !showVersionsModal && (
                <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-20">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                </div>
            )}
        </section>
    );
}
