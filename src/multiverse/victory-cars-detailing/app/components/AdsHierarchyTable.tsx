'use client';

import React, { useState, useMemo } from 'react';
import { MetaAd, MetaCampaign, MetaAdSet } from '@/lib/metaClient';
import { ArrowDown, ArrowUp, Columns, Info, CheckCircle, PauseCircle } from 'lucide-react';

interface Props {
  campaigns: MetaCampaign[];
  adsets: MetaAdSet[];
  ads: MetaAd[];
}

type TabType = 'campaigns' | 'adsets' | 'ads';
type SortDir = 'asc' | 'desc';

export default function AdsHierarchyTable({ campaigns, adsets, ads }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');
  
  // Sorting state
  const [sortCol, setSortCol] = useState<string>('spend');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  
  // Column toggles
  const [showCtr, setShowCtr] = useState(false);
  const [showClicks, setShowClicks] = useState(false);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('desc');
    }
  };

  const formatCOP = (val: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
  };

  const sortData = (data: any[]) => {
    return [...data].sort((a, b) => {
      let valA = a[sortCol];
      let valB = b[sortCol];
      
      // Handle string comparisons (like name or status)
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      
      // Fallback for missing numeric values
      valA = valA || 0;
      valB = valB || 0;
      
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });
  };

  const renderSortIcon = (col: string) => {
    if (sortCol !== col) return null;
    return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 ml-1 inline" /> : <ArrowDown className="w-3 h-3 ml-1 inline" />;
  };

  const Th = ({ col, label }: { col: string, label: string }) => (
    <th 
      className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors group"
      onClick={() => handleSort(col)}
    >
      <div className="flex items-center">
        {label}
        <span className="text-slate-400 group-hover:text-apple-blue">{renderSortIcon(col)}</span>
      </div>
    </th>
  );

  return (
    <div className="bg-white border border-apple-border rounded-3xl p-6 space-y-6">
      
      {/* HEADER & EXPLANATION */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-apple-text">Estructura de Meta Ads</h2>
          <p className="text-xs text-apple-subtext mt-1">Explora el rendimiento de tu inversión por niveles.</p>
        </div>
        
        {/* Toggles */}
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <Columns className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-600">Columnas:</span>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" checked={showCtr} onChange={(e) => setShowCtr(e.target.checked)} className="rounded text-apple-blue focus:ring-apple-blue" />
            CTR %
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" checked={showClicks} onChange={(e) => setShowClicks(e.target.checked)} className="rounded text-apple-blue focus:ring-apple-blue" />
            Clics
          </label>
        </div>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-slate-700">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-900 mb-1">¿Cómo entender esta jerarquía?</p>
          <ul className="space-y-1 text-xs">
            <li><span className="font-bold">Campañas:</span> El panorama general. Define tu objetivo principal (ej. Recibir Mensajes de WhatsApp) y el presupuesto total.</li>
            <li><span className="font-bold">Conjuntos de Anuncios:</span> Define "A quién" y "Dónde" se muestra (ej. Dueños de autos en Bogotá, solo en Reels).</li>
            <li><span className="font-bold">Anuncios:</span> El contenido final que ven tus clientes (el video o foto persuasiva con su texto).</li>
          </ul>
        </div>
      </div>

      {/* TABS */}
      <div className="flex space-x-2 border-b border-apple-border">
        {(['campaigns', 'adsets', 'ads'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSortCol('spend'); setSortDir('desc'); }}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === tab ? 'border-apple-blue text-apple-blue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {tab === 'campaigns' ? `Campañas (${campaigns.length})` : tab === 'adsets' ? `Conjuntos (${adsets.length})` : `Anuncios (${ads.length})`}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-apple-border">
              <Th col="name" label="Nombre" />
              <Th col="startTime" label="Fecha Inicio" />
              <Th col="status" label="Estado" />
              <Th col="spend" label="Inversión" />
              <Th col="conversations" label="Mensajes" />
              <Th col="costPerConversation" label="Costo/Msg" />
              {showCtr && <Th col="ctr" label="CTR" />}
              {showClicks && <Th col="clicks" label="Clics" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-apple-border/50">
            {activeTab === 'campaigns' && sortData(campaigns).map(item => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 text-sm font-semibold text-slate-800">
                  {item.name}
                  <div className="text-[10px] text-slate-400 font-normal">{item.id}</div>
                </td>
                <td className="py-4 px-4 text-xs font-medium text-slate-600">
                  {formatDate(item.startTime)}
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${item.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {item.status === 'ACTIVE' ? <CheckCircle className="w-3 h-3 mr-1"/> : <PauseCircle className="w-3 h-3 mr-1"/>}
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-slate-700">{formatCOP(item.spend)}</td>
                <td className="py-4 px-4 text-sm font-bold text-green-600">{item.conversations}</td>
                <td className="py-4 px-4 text-sm font-semibold text-slate-800">{formatCOP(item.costPerConversation)}</td>
                {showCtr && <td className="py-4 px-4 text-sm text-slate-600">{item.ctr}%</td>}
                {showClicks && <td className="py-4 px-4 text-sm text-slate-600">{item.clicks}</td>}
              </tr>
            ))}

            {activeTab === 'adsets' && sortData(adsets).map(item => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 text-sm font-semibold text-slate-800">
                  {item.name}
                  <div className="text-[10px] text-slate-400 font-normal">{item.id}</div>
                </td>
                <td className="py-4 px-4 text-xs font-medium text-slate-600">
                  {formatDate(item.startTime)}
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${item.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {item.status === 'ACTIVE' ? <CheckCircle className="w-3 h-3 mr-1"/> : <PauseCircle className="w-3 h-3 mr-1"/>}
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-slate-700">{formatCOP(item.spend)}</td>
                <td className="py-4 px-4 text-sm font-bold text-green-600">{item.conversations}</td>
                <td className="py-4 px-4 text-sm font-semibold text-slate-800">{formatCOP(item.costPerConversation)}</td>
                {showCtr && <td className="py-4 px-4 text-sm text-slate-600">{item.ctr}%</td>}
                {showClicks && <td className="py-4 px-4 text-sm text-slate-600">{item.clicks}</td>}
              </tr>
            ))}

            {activeTab === 'ads' && sortData(ads).map(item => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                    )}
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-xs font-medium text-slate-600">
                  {formatDate(item.startTime)}
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${item.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {item.status === 'ACTIVE' ? <CheckCircle className="w-3 h-3 mr-1"/> : <PauseCircle className="w-3 h-3 mr-1"/>}
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-semibold text-slate-700">{formatCOP(item.spend)}</td>
                <td className="py-4 px-4 text-sm font-bold text-green-600">{item.conversations}</td>
                <td className="py-4 px-4 text-sm font-semibold text-slate-800">{formatCOP(item.costPerConversation)}</td>
                {showCtr && <td className="py-4 px-4 text-sm text-slate-600">{item.ctr}%</td>}
                {showClicks && <td className="py-4 px-4 text-sm text-slate-600">{item.clicks}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
