"use client";

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Heart, MessageCircle, Bookmark, Share2, Eye, Loader2, ArrowUpDown, Rocket, CheckCircle2, AlertTriangle, Image as ImageIcon, Film, Grid3X3 } from 'lucide-react';

interface AuditedPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink?: string;
  likes: number;
  comments: number;
  saved: number;
  shares: number;
  reach: number;
  impressions: number;
  engagement: number;
  engagementRate: number;
  pautaScore: number;
  tier: 'top' | 'mid' | 'low';
}

interface AuditStats {
  total: number;
  top: number;
  mid: number;
  low: number;
  avgScore: number;
}

export default function ContentAudit() {
  const [posts, setPosts] = useState<AuditedPost[]>([]);
  const [stats, setStats] = useState<AuditStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortCol, setSortCol] = useState<string>('pautaScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [hasLoaded, setHasLoaded] = useState(false);

  const runAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/meta/content-audit');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error ejecutando auditoría');
      setPosts(data.posts || []);
      setStats(data.stats || null);
      setHasLoaded(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sortedPosts = [...posts].sort((a: any, b: any) => {
    const valA = a[sortCol] ?? 0;
    const valB = b[sortCol] ?? 0;
    if (typeof valA === 'string') return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    return sortDir === 'asc' ? valA - valB : valB - valA;
  });

  const toggleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('desc');
    }
  };

  const formatDate = (ts: string) => {
    return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short' }).format(new Date(ts));
  };

  const tierBadge = (tier: string, score: number) => {
    const styles = {
      top: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      mid: 'bg-amber-100 text-amber-700 border-amber-200',
      low: 'bg-red-100 text-red-600 border-red-200',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black border ${styles[tier as keyof typeof styles] || styles.low}`}>
        {score}
      </span>
    );
  };

  const mediaIcon = (type: string) => {
    if (type === 'VIDEO') return <Film className="w-3 h-3" />;
    if (type === 'CAROUSEL_ALBUM') return <Grid3X3 className="w-3 h-3" />;
    return <ImageIcon className="w-3 h-3" />;
  };

  const Th = ({ col, label, icon }: { col: string; label: string; icon?: React.ReactNode }) => (
    <th
      onClick={() => toggleSort(col)}
      className="py-3 px-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 cursor-pointer hover:text-slate-700 transition-colors select-none whitespace-nowrap"
    >
      <div className="flex items-center gap-1">
        {icon}
        {label}
        {sortCol === col && <ArrowUpDown className="w-3 h-3 text-apple-blue" />}
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Auditoría de Contenido</h2>
              <p className="text-sm font-medium text-slate-500">Analiza tus últimas 50 publicaciones y encuentra las mejores para pautar.</p>
            </div>
          </div>
          <button
            onClick={runAudit}
            disabled={loading}
            className="bg-slate-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
            {loading ? 'Analizando...' : hasLoaded ? 'Actualizar Auditoría' : 'Ejecutar Auditoría'}
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-slate-50/50 border-b border-slate-100">
          <div className="text-center">
            <div className="text-2xl font-black text-slate-800">{stats.total}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publicaciones</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-emerald-600">{stats.top}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top (≥7)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-amber-600">{stats.mid}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Medio (4-7)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-red-500">{stats.low}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bajo (&lt;4)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-apple-blue">{stats.avgScore}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score Promedio</div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 mx-6 mt-4 bg-red-50 text-red-600 rounded-xl flex gap-3 text-sm font-medium items-start">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Pre-audit state */}
      {!hasLoaded && !loading && (
        <div className="p-12 text-center text-slate-400">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-bold text-slate-500 mb-1">Sin auditoría todavía</p>
          <p className="text-sm">Haz clic en &quot;Ejecutar Auditoría&quot; para analizar tus 50 publicaciones más recientes de Instagram.</p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="p-12 text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-apple-blue" />
          <p className="font-bold text-slate-700">Analizando publicaciones...</p>
          <p className="text-sm text-slate-400 mt-1">Obteniendo métricas de Instagram y calculando Score de Pauta.</p>
        </div>
      )}

      {/* Results Table */}
      {hasLoaded && !loading && sortedPosts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3 px-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 w-10">#</th>
                <Th col="pautaScore" label="Score" icon={<TrendingUp className="w-3 h-3" />} />
                <th className="py-3 px-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">Publicación</th>
                <Th col="likes" label="Likes" icon={<Heart className="w-3 h-3" />} />
                <Th col="comments" label="Comentarios" icon={<MessageCircle className="w-3 h-3" />} />
                <Th col="saved" label="Guardados" icon={<Bookmark className="w-3 h-3" />} />
                <Th col="shares" label="Compartidos" icon={<Share2 className="w-3 h-3" />} />
                <Th col="reach" label="Alcance" icon={<Eye className="w-3 h-3" />} />
                <Th col="engagementRate" label="Eng. Rate" />
                <Th col="timestamp" label="Fecha" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sortedPosts.map((post, idx) => (
                <tr key={post.id} className={`hover:bg-slate-50/80 transition-colors ${post.tier === 'top' ? 'bg-emerald-50/30' : ''}`}>
                  <td className="py-3 px-3 text-xs font-bold text-slate-300">{idx + 1}</td>
                  <td className="py-3 px-3">{tierBadge(post.tier, post.pautaScore)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 relative">
                        <img
                          src={post.thumbnail_url || post.media_url}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect fill="%23e2e8f0" width="24" height="24"/></svg>'; }}
                        />
                        <div className="absolute bottom-0.5 right-0.5 bg-black/60 text-white rounded p-0.5">
                          {mediaIcon(post.media_type)}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-700 truncate max-w-[200px]">
                          {post.caption?.split('\n')[0] || 'Sin caption'}
                        </p>
                        {post.permalink && (
                          <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="text-[10px] text-apple-blue hover:underline">
                            Ver en Instagram ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-sm font-semibold text-rose-500">{post.likes.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm font-semibold text-blue-500">{post.comments.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm font-black text-amber-600">{post.saved.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm font-semibold text-purple-500">{post.shares.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm font-medium text-slate-600">{post.reach.toLocaleString()}</td>
                  <td className="py-3 px-3 text-sm font-bold text-slate-700">{post.engagementRate}%</td>
                  <td className="py-3 px-3 text-xs font-medium text-slate-400">{formatDate(post.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
