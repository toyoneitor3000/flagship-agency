'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Clock, Code2, Rocket, ArrowDown, Globe, Cpu, Layers } from 'lucide-react';
import Link from 'next/link';
import { WikiLinker } from '@/components/ui/WikiLinker';
import { PricingCalculator } from './PricingCalculator';

interface Plan {
  id: string;
  name: string;
  category: 'web' | 'enterprise';
  slug: string;
  prices: {
    monthly: { cop: string; usd: string };
    annual: { cop: string; usd: string };
    setup: { cop: string; usd: string };
  };
  description: string;
  features: string[];
  specs?: {
    storage: string;
    bandwidth: string;
    compute: string;
    changes: string;
  };
  tech: string;
  popular?: boolean;
  hours: number | string;
  infraDetail: string;
}

const plansData: Plan[] = [
  {
    id: 'semilla',
    name: 'Plan Semilla (Start)',
    category: 'web',
    slug: 'semilla',
    prices: {
      monthly: { cop: '$15,000', usd: '$4.00' },
      annual: { cop: '$250,000', usd: '$65.00' },
      setup: { cop: '$350,000', usd: '$95' }
    },
    description: 'El punto de partida ideal. Tu espacio digital profesional, accesible y sin barreras.',
    features: [
      'Diseño Web Profesional (Landing Page)',
      'Panel de Control (CMS Autoadministrable)',
      '1 Dominio .com Incluido',
      'Asistente Digital 24/7'
    ],
    specs: {
      storage: '5 GB NVMe SSD',
      bandwidth: '100 GB Transferencia',
      compute: 'Serverless (Shared CPU)',
      changes: 'Solo Contenido (CMS)'
    },
    tech: 'Tu primera web profesional.',
    popular: false,
    hours: 8,
    infraDetail: 'Infraestructura Base: Cubre los esenciales técnicos (Dominio, SSL, DNS) para mantener el sitio online y seguro.'
  },
  {
    id: 'pro',
    name: 'Plan Profesional (Services)',
    category: 'web',
    slug: 'pro',
    prices: {
      monthly: { cop: '$95,000', usd: '$25' },
      annual: { cop: '$950,000', usd: '$250' },
      setup: { cop: '$850,000', usd: '$220' }
    },
    description: 'Para consultores y marcas. Blog, captación de clientes y presencia corporativa seria.',
    features: [
      'Sitio Multi-Página + Blog Dinámico',
      'CMS Autoadministrable para Artículos',
      'Formularios CRM & Integración a WhatsApp',
      'Optimización SEO Técnica Integral'
    ],
    specs: {
      storage: '20 GB NVMe SSD',
      bandwidth: '500 GB Transferencia',
      compute: 'Serverless (Fast Edge)',
      changes: 'Ajustes de Diseño & Contenido'
    },
    tech: 'Tu oficina digital abierta 24/7.',
    popular: true,
    hours: 24,
    infraDetail: 'Recursos Dinámicos: Un CMS consume recursos activos (Base de Datos & CPU). Incluye Backups diarios para proteger tu contenido.'
  },
  {
    id: 'store',
    name: 'Plan Comercio (Store)',
    category: 'web',
    slug: 'store',
    prices: {
      monthly: { cop: '$180,000', usd: '$50' },
      annual: { cop: '$1,800,000', usd: '$480' },
      setup: { cop: '$2,200,000', usd: '$580' }
    },
    description: 'Tu imperio digital. No solo vendes, gestionas inventarios, pasarela de pagos y logística en un solo lugar.',
    features: [
      'Catálogo & Productos Ilimitados con Variantes',
      'Pasarela de Pagos (Wompi, MercadoPago, Bold)',
      'Panel Financiero, Analítica & Control de Pedidos',
      'Carrito de Compras & Checkout sin Fricción'
    ],
    specs: {
      storage: '100 GB NVMe SSD',
      bandwidth: '1 TB Transferencia',
      compute: 'Dedicated DB (Primary)',
      changes: 'Soporte Técnico & Actualizaciones'
    },
    tech: 'Tu negocio facturando en automático.',
    popular: false,
    hours: 48,
    infraDetail: 'Alta Disponibilidad: Servidores optimizados para tráfico transaccional. Incluye monitoreo de seguridad para proteger los pagos.'
  },
  {
    id: 'system',
    name: 'Plan Sistema (Web App)',
    category: 'enterprise',
    slug: 'system',
    prices: {
      monthly: { cop: '$280,000', usd: '$75' },
      annual: { cop: '$2,500,000', usd: '$650' },
      setup: { cop: '$4,500,000', usd: '$1,200' }
    },
    description: 'Digitaliza tu operación. Software a medida para reservas, intranets, dashboards o gestión compleja de clientes.',
    features: [
      'Usuarios, Roles y Permisos (Auth & Seguridad)',
      'Dashboards y Reportes de Datos en Tiempo Real',
      'Lógica de Negocio y Automatizaciones a Medida',
      'Integración con APIs, CRMs y Sistemas Externos'
    ],
    specs: {
      storage: 'Base de Datos Dedicada',
      bandwidth: 'Tráfico Ilimitado',
      compute: 'Serverless Functions Escalables',
      changes: 'Soporte Funcional Dedicado'
    },
    tech: 'Tu empresa operando en piloto automático.',
    popular: false,
    hours: 80,
    infraDetail: 'Soporte Operativo: Garantía de funcionamiento para tu software. Incluye monitoreo de errores, parches de seguridad y soporte técnico continuo.'
  },
  {
    id: 'venture',
    name: 'Venture & Corporate',
    category: 'enterprise',
    slug: 'venture',
    prices: {
      monthly: { cop: 'Retainer', usd: 'Custom' },
      annual: { cop: 'A Medida', usd: 'Custom' },
      setup: { cop: 'Desde $12M', usd: '$3k+' }
    },
    description: 'Para Visionarios con Capital y Startups. Diseñamos, programamos y escalamos productos digitales desde cero.',
    features: [
      'Arquitectura de Producto Completa (MVP Escalable)',
      'Desarrollo Mobile & Web Full-Stack de Alta Gama',
      'Infraestructura Cloud Escalable (AWS / Azure / Vercel)',
      'Equipo Dedicado de CTO & Senior Developers'
    ],
    specs: {
      storage: 'Infraestructura Cloud Propia',
      bandwidth: 'Gestión Delegada 100%',
      compute: 'Cluster Privado de Alta Capacidad',
      changes: 'Agencia (Desarrollo Continuo)'
    },
    tech: 'Tu socio tecnológico estratégico a largo plazo.',
    popular: false,
    hours: 'Dedicado',
    infraDetail: 'Arquitectura Dedicada: Diseño de infraestructura Cloud a medida para escalar masivamente tu producto sin límites.'
  }
];

export const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'enterprise'>('all');

  const webPlans = plansData.filter(p => p.category === 'web');
  const enterprisePlans = plansData.filter(p => p.category === 'enterprise');

  const renderCard = (plan: Plan, index: number) => {
    return (
      <motion.div
        key={plan.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        className={`relative p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
          plan.popular
            ? 'bg-gradient-to-b from-zinc-900 via-indigo-950/30 to-zinc-950 border-2 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.22)] z-10'
            : 'bg-zinc-950/70 border-zinc-800/80 hover:border-indigo-500/40 hover:bg-zinc-900/80 shadow-xl'
        }`}
      >
        {plan.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[11px] font-bold rounded-full flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 uppercase tracking-wider z-20">
            <Sparkles className="w-3 h-3 text-indigo-200" />
            Más Elegido
          </div>
        )}

        <div>
          {/* HEADER DEL PLAN */}
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center min-h-[2.5rem]">
              {plan.name}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed min-h-[2.75rem]">
              <WikiLinker text={plan.description} />
            </p>
          </div>

          {/* FASE 1: CONSTRUCCIÓN (SETUP) */}
          <div className="mb-2 p-4 sm:p-5 bg-zinc-900/60 rounded-2xl border border-zinc-800/70 relative overflow-hidden group/phase1">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover/phase1:opacity-20 transition-opacity">
              <Rocket className="w-12 h-12 rotate-45 text-indigo-400" />
            </div>

            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest block mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
              Fase 1: Construcción (Setup)
            </span>

            <div className="flex flex-wrap items-baseline gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight whitespace-nowrap">
                {plan.prices.setup.cop}
              </span>
              <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                Pago Único
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/25">
              <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-xs text-zinc-300">
                {typeof plan.hours === 'number' ? (
                  <>Incluye <strong>{plan.hours} Horas</strong> de Ingeniería</>
                ) : (
                  <>Ingeniería <strong>{plan.hours}</strong></>
                )}
              </span>
            </div>
          </div>

          {/* CONECTOR DE FLUJO */}
          <div className="flex justify-center -my-3 relative z-10">
            <div className="bg-zinc-950 border border-zinc-800 rounded-full p-1 text-zinc-500 shadow-md">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* FASE 2: OPERACIÓN (INFRAESTRUCTURA) */}
          <div className="mb-6 pt-5 pb-4 px-4 sm:px-5 bg-zinc-900/30 rounded-2xl border border-zinc-800/70 border-t-0 rounded-t-none -mt-3">
            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest block mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF9C] shadow-[0_0_8px_rgba(0,255,156,0.6)]"></span>
              Fase 2: Operación & Servidores
            </span>

            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              {plan.name === 'Venture & Corporate' ? (
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white tracking-tight">A Medida</span>
                  <span className="text-zinc-500 text-[10px] font-medium">Cotización por Proyecto</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#00FF9C] tracking-tight drop-shadow-[0_0_10px_rgba(0,255,156,0.25)] whitespace-nowrap">
                    {plan.prices.annual.cop}
                  </span>
                  <span className="text-zinc-400 text-xs font-medium">/ Año</span>
                </div>
              )}

              {plan.name !== 'Venture & Corporate' && (
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#00FF9C]" /> Dominio .com</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#00FF9C]" /> SSL</span>
                </div>
              )}
            </div>

            {/* RECEIPT BOX */}
            <div className="text-xs leading-relaxed bg-zinc-950/80 p-3 rounded-xl border border-zinc-800/80 flex gap-2.5 items-start shadow-inner">
              <span className="text-indigo-400 mt-0.5 shrink-0 text-sm">ℹ️</span>
              <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                <WikiLinker text={plan.infraDetail} />
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-800/40 flex items-center justify-between text-xs text-zinc-400">
              <span className="text-[11px] text-zinc-500 font-medium">Hora Adicional:</span>
              <span className="font-mono text-zinc-300 font-bold">$120k COP</span>
            </div>
          </div>

          {/* TECH SPECS MINI GRID */}
          {plan.specs && (
            <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/50 mb-5 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Espacio</span>
                <span className="text-zinc-200 font-mono font-medium">{plan.specs.storage}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Transferencia</span>
                <span className="text-zinc-200 font-mono font-medium">{plan.specs.bandwidth}</span>
              </div>
            </div>
          )}

          {/* LISTA DE CARACTERÍSTICAS */}
          <div className="space-y-3 mb-6">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
              Incluido en la Solución
            </span>
            <ul className="space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 group-hover:text-white transition-colors">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="leading-snug"><WikiLinker text={feature} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA BUTTON */}
        <Link
          href={plan.name === 'Venture & Corporate' ? '/contact' : `/checkout?plan=${plan.slug}`}
          className={`mt-4 w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${
            plan.name === 'Venture & Corporate'
              ? 'bg-transparent border border-white/25 text-white hover:bg-white/10'
              : plan.popular
                ? 'bg-[#00FF9C] text-zinc-950 hover:brightness-110 shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)]'
                : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg shadow-white/5'
          }`}
        >
          {plan.name === 'Venture & Corporate' ? 'Cotizar Proyecto a Medida' : 'Elegir Plan'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-32 relative overflow-hidden" id="pricing" data-section-theme="dark">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Diseñado para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)]">PERSONAS</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <p className="text-indigo-400 text-[10px] md:text-sm font-bold tracking-wide uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Tecnología 2026: Eficiencia & Propiedad
              </p>
            </div>
            <div className="inline-block px-4 py-2 bg-[#00FF9C]/10 border border-[#00FF9C]/20 rounded-lg shadow-[0_0_15px_rgba(0,255,156,0.1)]">
              <p className="text-[#00FF9C] text-[10px] md:text-sm font-bold tracking-wide uppercase flex items-center gap-2">
                <Check className="w-4 h-4" />
                Alianza Speedlight & Loyalty Activa
              </p>
            </div>
          </div>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Entendemos que detrás de cada proyecto hay un sueño. <br className="hidden md:block" />
            Nuestros planes están pensados para acompañar cada etapa de tu crecimiento con precios transparentes y sin sorpresas.
          </p>
        </div>

        {/* Strategy Notice */}
        <div className="flex flex-col items-center mb-16 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl max-w-2xl text-center">
            <p className="text-zinc-400 text-sm">
              <span className="text-indigo-400 font-bold">Visión a Largo Plazo:</span> Tu proyecto está diseñado para evolucionar. Pagas la Arquitectura Inicial (Setup) y luego decidimos cómo escalar: Mantenimiento Anual o <span className="text-white font-medium">Modalidad Agencia (Retainer)</span> para acompañar tu crecimiento.
            </p>
          </div>
        </div>

        {/* CALCULADORA DE INVERSIÓN */}
        <div className="mb-20">
          <PricingCalculator />
        </div>

        {/* SELECTOR DE CATEGORÍA DE PLANES */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-zinc-900/90 border border-zinc-800/80 rounded-2xl gap-1.5 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Todos los Planes ({plansData.length})
            </button>
            <button
              onClick={() => setActiveCategory('web')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeCategory === 'web'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              Web & E-Commerce ({webPlans.length})
            </button>
            <button
              onClick={() => setActiveCategory('enterprise')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeCategory === 'enterprise'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#00FF9C]" />
              Software & Enterprise ({enterprisePlans.length})
            </button>
          </div>
        </div>

        {/* DISTRIBUCIÓN REORDENADA DE PLANES */}
        <div className="max-w-7xl mx-auto space-y-16">
          {/* TIER 1: WEB & E-COMMERCE (3 COLUMNAS AMPLIAS) */}
          {(activeCategory === 'all' || activeCategory === 'web') && (
            <div>
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
                  <h3 className="text-xl font-bold font-display text-white">Soluciones Web & Comercio Digital</h3>
                </div>
                <span className="text-xs text-zinc-400 font-mono">Desarrollo Ágil, Conversión & SEO</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {webPlans.map((plan, index) => renderCard(plan, index))}
              </div>
            </div>
          )}

          {/* TIER 2: SOFTWARE A MEDIDA & VENTURE (2 COLUMNAS GENEROSAS) */}
          {(activeCategory === 'all' || activeCategory === 'enterprise') && (
            <div>
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] shadow-[0_0_10px_rgba(0,255,156,0.8)]"></span>
                  <h3 className="text-xl font-bold font-display text-white">Sistemas a Medida & Alta Escala</h3>
                </div>
                <span className="text-xs text-zinc-400 font-mono">Arquitectura Cloud Dedicada, Dashboards & MVPs</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                {enterprisePlans.map((plan, index) => renderCard(plan, index))}
              </div>
            </div>
          )}
        </div>

        {/* MÓDULOS DE ESPECIALIDAD (ADD-ONS) */}
        <div className="mt-24 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl font-bold text-white mb-4">¿Necesitas Superpoderes?</h3>
            <p className="text-zinc-400">Agrega módulos específicos a tu Setup inicial.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-indigo-500/50 transition-colors group flex flex-col items-center">
              <div className="text-2xl mb-2">🛍️</div>
              <h4 className="font-bold text-white text-sm mb-1">E-Commerce Plus</h4>
              <p className="text-[10px] text-zinc-400 mb-2">Si necesitas más de 100 productos.</p>
              <p className="text-sm font-bold text-[var(--color-brand-accent)]">+$250k <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-indigo-500/50 transition-colors group flex flex-col items-center">
              <div className="text-2xl mb-2">👤</div>
              <h4 className="font-bold text-white text-sm mb-1">Portal de Usuarios</h4>
              <p className="text-[10px] text-zinc-400 mb-2">Tus clientes se registran (Membresía).</p>
              <p className="text-sm font-bold text-[var(--color-brand-accent)]">+$450k <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900 border border-indigo-500/30 p-4 rounded-2xl hover:border-indigo-400 transition-colors group flex flex-col items-center shadow-lg shadow-indigo-900/10">
              <div className="text-2xl mb-2">📲</div>
              <h4 className="font-bold text-white text-sm mb-1">App Stores (PWA)</h4>
              <p className="text-[10px] text-zinc-400 mb-2 text-center">Tu Web empacada para descargar en iPhone y Android.</p>
              <p className="text-sm font-bold text-indigo-300">$850k <span className="text-[10px] text-indigo-500">Pago Único</span></p>
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-purple-500/50 transition-colors group flex flex-col items-center">
              <div className="text-2xl mb-2">🧊</div>
              <h4 className="font-bold text-white text-sm mb-1">Cine & 3D</h4>
              <p className="text-[10px] text-zinc-400 mb-2 text-center">Experiencias Inmersivas WebGL.</p>
              <p className="text-sm font-bold text-[var(--color-brand-accent)]">+$750k <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-[#00FF9C]/50 transition-colors group flex flex-col items-center">
              <div className="text-2xl mb-2">🧬</div>
              <h4 className="font-bold text-white text-sm mb-1">Data Engine</h4>
              <p className="text-[10px] text-zinc-400 mb-2">Dashboards BI y Big Data.</p>
              <p className="text-sm font-bold text-white text-xs opacity-50">Cotizar</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 max-w-2xl mx-auto px-6 py-6 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
          <h4 className="text-zinc-300 font-bold mb-2 flex items-center justify-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            ¿Prefieres alojarlo en tu propio servidor?
          </h4>
          <p className="text-sm text-zinc-500 mb-4">
            Ofrecemos una opción de <strong>"Buyout" (Pago Único Final)</strong> donde te entregamos todo el código fuente y activos para que seas 100% dueño de tu infraestructura. Sin pagos mensuales ni ataduras.
          </p>
          <Link href="/contact" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4">
            Solicitar cotización de entrega de código &rarr;
          </Link>
        </div>

        <div className="flex justify-center mt-12 pb-8">
          <a
            href="#invitation"
            className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors duration-300"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Iniciar Despegue</span>
            <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
