'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  ArrowLeftRight, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  User, 
  Car, 
  Tag, 
  DollarSign, 
  Sparkles,
  Calendar,
  Wrench,
  CheckCircle2,
  Inbox,
  X,
  AlertTriangle
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface Lead {
  id: string;
  name: string;
  vehicle: string;
  plate: string;
  service: string;
  price: number;
  status: 'new' | 'quoted' | 'scheduled' | 'in_progress' | 'completed';
  timestamp: string;
}

const COLUMNS = [
  { id: 'new', name: 'Nuevos Leads', icon: Inbox, color: 'text-apple-subtext border-apple-border bg-white' },
  { id: 'quoted', name: 'Cotizados', icon: Tag, color: 'text-amber-500 border-amber-500/20 bg-amber-500/5' },
  { id: 'scheduled', name: 'Agendados', icon: Calendar, color: 'text-blue-500 border-blue-500/20 bg-blue-500/5' },
  { id: 'in_progress', name: 'En Taller', icon: Wrench, color: 'text-apple-blue border-red-500/20 bg-red-500/5' },
  { id: 'completed', name: 'Completados', icon: CheckCircle2, color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' },
] as const;

const SERVICES_LIST = [
  'Detailing Pro Finish',
  'Recubrimiento Cerámico',
  'Tapicería Full Clean',
  'Style Wrap & PPF',
  'Otro Servicio Detailing'
];

export default function KanbanLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState<'connected' | 'mock'>('mock');

  // Form states
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [plate, setPlate] = useState('');
  const [service, setService] = useState(SERVICES_LIST[0]);
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    let loadedLeads: Lead[] = [];

    if (db) {
      try {
        const snap = await getDocs(collection(db, 'leads'));
        snap.forEach((docSnap) => {
          loadedLeads.push({ id: docSnap.id, ...docSnap.data() } as Lead);
        });
        setFirebaseStatus('connected');
      } catch (err) {
        console.warn('Firebase query failed inside CRM, falling back to local storage:', err);
      }
    }

    if (loadedLeads.length === 0) {
      const stored = localStorage.getItem('victory_crm_leads_v2');
      if (stored) {
        loadedLeads = JSON.parse(stored);
      } else {
        loadedLeads = [];
      }
    }

    // Sort by timestamp descending
    loadedLeads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setLeads(loadedLeads);
    setLoading(false);
  };

  const saveAndSyncLeads = async (updatedList: Lead[]) => {
    setLeads(updatedList);
    localStorage.setItem('victory_crm_leads_v2', JSON.stringify(updatedList));
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !vehicle || !price) return;

    const newLeadItem: Omit<Lead, 'id'> = {
      name,
      vehicle,
      plate: plate.toUpperCase(),
      service,
      price: parseFloat(price) || 0,
      status: 'new',
      timestamp: new Date().toISOString(),
    };

    try {
      if (db) {
        const docRef = await addDoc(collection(db, 'leads'), newLeadItem);
        const saved: Lead = { id: docRef.id, ...newLeadItem };
        await saveAndSyncLeads([saved, ...leads]);
      } else {
        const mockId = `lead_${Date.now()}`;
        const saved: Lead = { id: mockId, ...newLeadItem };
        await saveAndSyncLeads([saved, ...leads]);
      }

      // Reset form
      setName('');
      setVehicle('');
      setPlate('');
      setService(SERVICES_LIST[0]);
      setPrice('');
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const moveLead = async (leadId: string, direction: 'forward' | 'backward') => {
    const leadIndex = leads.findIndex(l => l.id === leadId);
    if (leadIndex === -1) return;

    const currentLead = leads[leadIndex];
    const statusOrder: Lead['status'][] = ['new', 'quoted', 'scheduled', 'in_progress', 'completed'];
    const currentStatusIndex = statusOrder.indexOf(currentLead.status);
    
    let newStatusIndex = currentStatusIndex;
    if (direction === 'forward' && currentStatusIndex < statusOrder.length - 1) {
      newStatusIndex++;
    } else if (direction === 'backward' && currentStatusIndex > 0) {
      newStatusIndex--;
    }

    if (newStatusIndex === currentStatusIndex) return;
    const newStatus = statusOrder[newStatusIndex];

    const updatedLead = { ...currentLead, status: newStatus };
    const updatedList = leads.map(l => l.id === leadId ? updatedLead : l);

    try {
      if (db) {
        await updateDoc(doc(db, 'leads', leadId), { status: newStatus });
      }
      await saveAndSyncLeads(updatedList);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('¿Estás seguro de eliminar este lead del CRM?')) return;

    const updatedList = leads.filter(l => l.id !== leadId);
    
    try {
      if (db) {
        await deleteDoc(doc(db, 'leads', leadId));
      }
      await saveAndSyncLeads(updatedList);
    } catch (e) {
      console.error(e);
    }
  };

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6 pb-12 font-sans relative">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-apple-subtext text-xs mt-1">
            Gestiona prospectos y arrastra sus procesos de detallado hasta cobrarlos.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-apple-blue to-blue-600 hover:from-apple-blue hover:to-blue-600 text-apple-text px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-apple-blue/10 active:scale-[0.98] transition-all text-sm self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Vehículo / Lead</span>
        </button>
      </div>

      {/* Kanban Board Container */}
      {loading ? (
        <div className="h-96 flex items-center justify-center text-apple-subtext text-sm">
          <span>Cargando tablero CRM...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
          {COLUMNS.map((col) => {
            const colLeads = leads.filter(l => l.status === col.id);
            const colTotalAmount = colLeads.reduce((sum, l) => sum + l.price, 0);
            const Icon = col.icon;
            
            return (
              <div 
                key={col.id} 
                className="bg-white/30 backdrop-blur-2xl-sm border border-apple-border/80 rounded-3xl p-4 flex flex-col min-w-[240px] xl:min-w-0 max-h-[70vh] group/column hover:border-apple-border/40 transition-colors"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-apple-border/60">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${col.color.split(' ')[0]}`} />
                    <span className="font-bold text-xs text-apple-text tracking-wide uppercase">{col.name}</span>
                  </div>
                  <span className="text-[10px] bg-white text-apple-subtext font-semibold px-2 py-0.5 rounded-full">
                    {colLeads.length}
                  </span>
                </div>

                {/* Subtitle / column stats */}
                <div className="text-[10px] text-apple-subtext font-medium mb-3 flex items-center justify-between">
                  <span>Monto Total:</span>
                  <span className="text-apple-subtext font-bold">{formatCOP(colTotalAmount)}</span>
                </div>

                {/* Cards stack */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[150px]">
                  {colLeads.length === 0 ? (
                    <div className="h-24 border border-dashed border-apple-border rounded-full flex items-center justify-center text-[10px] text-apple-subtext">
                      Sin vehículos
                    </div>
                  ) : (
                    colLeads.map((lead) => (
                      <div 
                        key={lead.id}
                        className="bg-apple-bg/70 border border-apple-border rounded-full p-3.5 hover:border-slate-750 hover:bg-apple-bg transition-all space-y-3 relative group"
                      >
                        {/* Title and delete action */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-xs text-apple-text tracking-wide leading-tight">{lead.name}</h4>
                            <span className="text-[10px] text-apple-subtext mt-1 block flex items-center">
                              <Car className="w-3.5 h-3.5 mr-1 text-apple-subtext" /> {lead.vehicle}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-apple-subtext hover:text-apple-blue p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity rounded-md hover:bg-red-500/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Extra specs */}
                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className="font-mono text-apple-subtext border border-apple-border px-1.5 py-0.5 rounded bg-white/30 uppercase">
                            {lead.plate || 'SIN PLACA'}
                          </span>
                          <span className="text-apple-subtext font-bold">{formatCOP(lead.price)}</span>
                        </div>

                        {/* Bottom action buttons for moving columns */}
                        <div className="flex items-center justify-between border-t border-slate-900/80 pt-2.5 mt-2">
                          <button
                            onClick={() => moveLead(lead.id, 'backward')}
                            disabled={col.id === 'new'}
                            className="text-apple-subtext hover:text-apple-text disabled:text-slate-800 disabled:hover:text-slate-800 p-1 transition-colors hover:bg-white rounded"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          
                          <span className="text-[9px] text-apple-subtext truncate max-w-[80px] font-sans">
                            {lead.service.split(' ')[0]}...
                          </span>

                          <button
                            onClick={() => moveLead(lead.id, 'forward')}
                            disabled={col.id === 'completed'}
                            className="text-apple-subtext hover:text-apple-text disabled:text-slate-800 disabled:hover:text-slate-800 p-1 transition-colors hover:bg-white rounded"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Dialog for Adding Leads */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-apple-bg/80 backdrop-blur-2xl-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-apple-border p-6 rounded-3xl shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="text-apple-subtext hover:text-apple-text p-1 absolute top-4 right-4 hover:bg-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-apple-text mb-6 flex items-center">
              <Sparkles className="w-5 h-5 text-apple-blue mr-2" />
              Nuevo Registro en CRM
            </h3>

            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-apple-subtext text-xs font-semibold uppercase mb-1.5">Nombre del Cliente</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Camilo Toloza"
                  className="w-full bg-apple-bg border border-apple-border text-apple-text placeholder-brand-slate px-3.5 py-2.5 rounded-full focus:border-apple-blue outline-none text-sm transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-apple-subtext text-xs font-semibold uppercase mb-1.5">Vehículo (Marca/Modelo)</label>
                  <input
                    type="text"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    placeholder="Ej: BMW M4"
                    className="w-full bg-apple-bg border border-apple-border text-apple-text placeholder-brand-slate px-3.5 py-2.5 rounded-full focus:border-apple-blue outline-none text-sm transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-apple-subtext text-xs font-semibold uppercase mb-1.5">Placa</label>
                  <input
                    type="text"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    placeholder="Ej: KLP-482"
                    className="w-full bg-apple-bg border border-apple-border text-apple-text placeholder-brand-slate px-3.5 py-2.5 rounded-full focus:border-apple-blue outline-none text-sm transition-all font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-apple-subtext text-xs font-semibold uppercase mb-1.5">Servicio a Contratar</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-apple-bg border border-apple-border text-apple-text px-3.5 py-2.5 rounded-full focus:border-apple-blue outline-none text-sm transition-all"
                >
                  {SERVICES_LIST.map(serv => (
                    <option key={serv} value={serv}>{serv}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-apple-subtext text-xs font-semibold uppercase mb-1.5">Valor del Servicio (COP)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ej: 950000"
                  className="w-full bg-apple-bg border border-apple-border text-apple-text placeholder-brand-slate px-3.5 py-2.5 rounded-full focus:border-apple-blue outline-none text-sm transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-apple-blue to-blue-600 hover:from-apple-blue hover:to-blue-600 text-white font-semibold py-3 rounded-full shadow-lg shadow-apple-blue/10 active:scale-[0.98] transition-all text-sm mt-6"
              >
                Registrar e Iniciar Embudo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
