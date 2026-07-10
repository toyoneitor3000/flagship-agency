"use client";

import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, AlertTriangle, Loader2, PlayCircle, Image as ImageIcon, Film, Grid3X3, DatabaseZap } from 'lucide-react';

interface InstagramMedia {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink?: string;
}

export default function MassTestManager() {
  const [posts, setPosts] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [launching, setLaunching] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/meta/instagram-feed');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error obteniendo publicaciones');
      setPosts(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunchMassTest = async () => {
    setLaunching(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const mediaIds = posts.map(p => p.id);
      const res = await fetch('/api/meta/mass-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_mass_test', mediaIds })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al lanzar testeo masivo');
      setSuccessMsg(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLaunching(false);
    }
  };

  const mediaIcon = (type: string) => {
    if (type === 'VIDEO') return <Film className="w-4 h-4" />;
    if (type === 'CAROUSEL_ALBUM') return <Grid3X3 className="w-4 h-4" />;
    return <ImageIcon className="w-4 h-4" />;
  };

  const formatDate = (ts: string) => {
    return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(ts));
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8 overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl shrink-0 mt-1">
            <DatabaseZap className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Motor de Testeo Masivo (ABO)</h2>
            <p className="text-sm font-medium text-slate-500 mt-1 max-w-xl">
              Crea una campaña con tus últimas 50 publicaciones divididas en 10 conjuntos de anuncios de manera automática. Forzaremos al algoritmo a darles una oportunidad justa a todas con presupuesto mínimo.
            </p>
          </div>
        </div>

        <button
          onClick={handleLaunchMassTest}
          disabled={loading || launching || posts.length === 0}
          className="bg-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm shrink-0 whitespace-nowrap w-full md:w-auto"
        >
          {launching ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlayCircle className="w-5 h-5" />}
          {launching ? 'Construyendo Campaña...' : `Testear ${posts.length} Publicaciones`}
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-4 mx-6 mt-6 bg-red-50 text-red-600 rounded-xl flex gap-3 text-sm font-medium items-start">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {successMsg && (
        <div className="p-4 mx-6 mt-6 bg-emerald-50 text-emerald-700 rounded-xl flex gap-3 text-sm font-medium items-start">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Grid Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Publicaciones seleccionadas para Testeo ({posts.length})
        </h3>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-indigo-400" />
            <p className="font-bold text-slate-600">Cargando tu feed de Instagram...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-bold text-slate-500">No hay publicaciones disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {posts.map((post) => (
              <div key={post.id} className="group relative rounded-xl overflow-hidden aspect-square bg-slate-100 shadow-sm border border-slate-200">
                <img
                  src={post.thumbnail_url || post.media_url}
                  alt={post.caption?.substring(0, 20)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect fill="%23f1f5f9" width="24" height="24"/></svg>'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-[10px] text-white/90 line-clamp-3 leading-snug font-medium mb-1 drop-shadow-md">
                      {post.caption || 'Sin texto'}
                    </p>
                    <p className="text-[9px] font-bold text-indigo-300">{formatDate(post.timestamp)}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white rounded p-1.5 border border-white/10">
                  {mediaIcon(post.media_type)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
