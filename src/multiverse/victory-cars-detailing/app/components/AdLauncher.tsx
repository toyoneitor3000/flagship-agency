"use client";

import React, { useState } from 'react';
import { Sparkles, UploadCloud, Rocket, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function AdLauncher() {
  const [file, setFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [category, setCategory] = useState<'PPF' | 'Detailing'>('PPF');
  
  // States for AI generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<{
    copyGenerado: string;
    recomendacionPauta: string;
    score: number;
  } | null>(null);

  // States for Launching to Meta
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchSuccess, setLaunchSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setAiResult(null);
      setLaunchSuccess(false);
      setErrorMsg(null);

      // Convert to base64 for preview and sending
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const generateCopy = async () => {
    if (!base64Image) return;
    
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, imageBase64: base64Image })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error generando copy');
      
      setAiResult(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const launchTest = async () => {
    if (!base64Image || !aiResult) return;

    setIsLaunching(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/meta/launch-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          copy: aiResult.copyGenerado,
          imageBase64: base64Image
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error publicando anuncio');
      
      setLaunchSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-2xl">
          <Sparkles className="w-6 h-6 text-fuchsia-600" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Lanzador IA (Autopilot)</h2>
          <p className="text-sm font-medium text-slate-500">Sube contenido, la IA crea el copy y lo programa en Meta Ads.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT PANEL: UPLOAD & SETUP */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700">1. Selecciona el Servicio</label>
            <div className="flex gap-4">
              {['PPF', 'Detailing'].map(cat => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat as 'PPF' | 'Detailing'); setAiResult(null); }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all border-2 ${
                    category === cat 
                      ? 'border-apple-blue bg-blue-50 text-apple-blue' 
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700">2. Sube la Imagen</label>
            <label className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-apple-blue transition-all group">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6 text-apple-blue" />
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Haz clic para subir contenido</p>
              <p className="text-xs font-medium text-slate-400">PNG, JPG (Max 5MB)</p>
            </label>
          </div>

          <button
            onClick={generateCopy}
            disabled={!base64Image || isGenerating || !!aiResult}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {isGenerating ? 'Analizando imagen...' : '3. Generar Anuncio con IA'}
          </button>

          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl flex gap-3 text-sm font-medium items-start">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              {errorMsg}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: PREVIEW & LAUNCH */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col">
          <label className="text-sm font-bold text-slate-700 mb-4">Vista Previa del Anuncio</label>
          
          <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            {base64Image ? (
              <div className="aspect-square w-full bg-slate-100 relative">
                <img src={base64Image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-square w-full bg-slate-100 flex items-center justify-center text-slate-400 font-medium text-sm">
                Sin imagen
              </div>
            )}
            
            <div className="p-4 flex-1">
              {aiResult ? (
                <>
                  <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {aiResult.copyGenerado}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="px-2 py-1 bg-fuchsia-100 text-fuchsia-700 text-xs font-bold rounded-lg">Score IA: {aiResult.score}/10</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  El copy generado por IA aparecerá aquí...
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={launchTest}
              disabled={!aiResult || isLaunching || launchSuccess}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isLaunching ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Conectando con Meta...</>
              ) : launchSuccess ? (
                <><CheckCircle2 className="w-5 h-5" /> ¡Programado para Testeo!</>
              ) : (
                <><Rocket className="w-5 h-5" /> Lanzar a Testeo (Borrador)</>
              )}
            </button>
            <p className="text-xs text-center font-medium text-slate-400 mt-3">
              Se creará en estado PAUSED en tu campaña de {category}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
