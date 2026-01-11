'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Clock, Code2, Rocket, Building2, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { WikiLinker } from '@/components/ui/WikiLinker';

const plansData = [
  {
    name: 'Plan Semilla (Start)',
    prices: {
      monthly: { cop: '$19,900', usd: '$5.50' },
      annual: { cop: '$180,000', usd: '$50.00' }, // PRECIO TOTAL ANUAL
      setup: { cop: '$550,000', usd: '$150' }
    },
    description: 'El punto de partida ideal. Tu espacio digital profesional, accesible y sin barreras.',
    features: [
      'Diseño Web Profesional (Landing Page)',
      'Dashboard Básico (Textos/Fotos)',
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
    popular: true,
    hours: 8
  },
  {
    name: 'Plan Profesional (Services)',
    prices: {
      monthly: { cop: '$149,000', usd: '$40' },
      annual: { cop: '$1,440,000', usd: '$380' },
      setup: { cop: '$1,200,000', usd: '$320' }
    },
    description: 'Para consultores y marcas. Blog, captación de clientes y presencia corporativa seria.',
    features: [
      'Sitio Multi-Página + Blog',
      'CMS Autoadministrable',
      'Formularios CRM & WhatsApp',
      'Optimización SEO Técnica'
    ],
    specs: {
      storage: '20 GB NVMe SSD',
      bandwidth: '500 GB Transferencia',
      compute: 'Serverless (Fast Edge)',
      changes: 'Ajustes de Diseño (No Funcional)'
    },
    tech: 'Tu oficina digital abierta 24/7.',
    popular: false,
    hours: 24
  },
  {
    name: 'Plan Comercio (Store)',
    prices: {
      monthly: { cop: '$280,000', usd: '$75' },
      annual: { cop: '$2,800,000', usd: '$750' },
      setup: { cop: '$3,800,000', usd: '$1,000' }
    },
    description: 'Tu imperio digital. No solo vendes, gestionas finanzas, inventarios y logística en un solo lugar.',
    features: [
      'Catálogo & Productos Ilimitados',
      'Panel Financiero y Analítica',
      'Integración Logística (Envíos)',
      'Checkout Sin Fricción'
    ],
    specs: {
      storage: '100 GB NVMe SSD',
      bandwidth: '1 TB Transferencia',
      compute: 'Dedicated DB (Primary)',
      changes: 'Soporte Técnico & Actualizaciones'
    },
    tech: 'Tu negocio facturando en automático.',
    popular: false,
    hours: 40
  },
  {
    name: 'Núcleo Corporativo',
    prices: {
      monthly: { cop: 'Cotizar', usd: 'Custom' },
      annual: { cop: 'Cotizar', usd: 'Custom' },
      setup: { cop: 'Desde $10M', usd: '$3k+' }
    },
    description: 'Ingeniería pesada para Ballenas. Reestructuración digital de flotas e integración Legacy.',
    features: [
      'Nube Privada Aislada (On-Premise)',
      'Modelos AI con Data Propia (RAG)',
      'Integración SAP/Oracle',
      'Auditoría y Compliance'
    ],
    specs: {
      storage: 'Almacenamiento Ilimitado (S3)',
      bandwidth: 'Ancho de Banda Dedicado',
      compute: 'Cluster Kubernetes Privado',
      changes: 'Equipo de Desarrollo Dedicado'
    },
    tech: 'La infraestructura que mueve industrias.',
    popular: false,
    hours: 'Indefinido'
  }
];

export const Pricing = () => {

  return (
    <section className='py-32 bg-zinc-950 relative overflow-hidden' id='pricing' data-section-theme='dark'>
      {/* Ambient Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-12'>
          <h2 className='font-display text-3xl md:text-5xl font-bold text-white mb-6'>Diseñado para <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">PERSONAS</span></h2>
          <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg mb-6">
            <p className="text-indigo-400 text-sm font-bold tracking-wide uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Tecnología que potencia tu visión, sin barreras.
            </p>
          </div>
          <p className='text-zinc-400 max-w-2xl mx-auto text-lg'>
            Entendemos que detrás de cada proyecto hay un sueño. <br className="hidden md:block" />
            Nuestros planes están pensados para acompañar cada etapa de tu crecimiento.
          </p>
        </div>

        {/* Strategy Toggle */}
        {/* Strategy Toggle */}
        {/* Strategy Toggle */}
        <div className='flex flex-col items-center mb-16 gap-4'>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl max-w-2xl text-center">
            <p className="text-zinc-400 text-sm">
              <span className="text-indigo-400 font-bold">Modelo Transparente:</span> Pagas por el desarrollo de tu proyecto (Pago Único) y una cuota anual operativa para mantenerlo en línea (Hosting + Dominio). Sin mensualidades ocultas.
            </p>
          </div>
        </div>

        <div className='max-w-[95%] mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
            {plansData.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-3xl border flex flex-col group ${plan.popular ? 'bg-zinc-900 border-indigo-500 shadow-2xl shadow-indigo-500/20 z-10 ring-1 ring-indigo-500/50' : 'bg-zinc-950/80 border-zinc-800 hover:bg-zinc-900/80 transition-colors'}`}
              >
                {plan.popular && (
                  <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg uppercase tracking-wide z-20'>
                    <Sparkles className='w-3 h-3' />
                    Recomendado
                  </div>
                )}

                <div className='mb-6'>
                  <h3 className='font-display text-lg font-bold text-white mb-2 min-h-[3.5rem] flex items-center'>{plan.name}</h3>
                  <p className='text-zinc-400 text-xs leading-relaxed min-h-[2.5rem]'>
                    <WikiLinker text={plan.description} />
                  </p>
                </div>

                <div className='mb-6 pb-6 border-b border-zinc-900'>
                  <div className='flex flex-col gap-1 mb-2'>

                    {/* PRIMARY COST: DEVELOPMENT */}
                    {/* PRIMARY COST: DEVELOPMENT */}
                    <div className="mb-4">
                      <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider block mb-1">Inversión Inicial (Diseño)</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-white tracking-tight">{plan.prices.setup.cop}</span>
                        <span className="text-zinc-500 text-[10px] uppercase">Pago Único</span>
                      </div>
                      {/* HOURS BUDGET */}
                      <div className="mt-1.5 flex items-center gap-1.5 bg-indigo-500/10 w-fit px-2 py-1 rounded border border-indigo-500/20">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] text-zinc-300">Incluye <strong>{plan.hours} {typeof plan.hours === 'number' ? 'Horas' : ''}</strong> <span className="text-zinc-500 ml-1">(Pack Ahorro)</span></span>
                      </div>
                    </div>

                    {/* SECONDARY COST: INFRASTRUCTURE */}
                    <div className="bg-zinc-950/50 rounded-xl p-3 border border-zinc-800/60">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className='text-zinc-300 text-[11px] font-medium'>Infraestructura (Anual)</span>
                        <div className="group/info relative">
                          <span className="cursor-help text-[10px] text-zinc-500 border border-zinc-600 px-1.5 rounded hover:text-white hover:border-zinc-400 transition-colors">?</span>
                          <div className="absolute bottom-full right-0 mb-2 w-52 p-3 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-50">
                            <div className="text-[10px] text-zinc-300 leading-normal">
                              <WikiLinker text="Este valor se paga una vez al año para cubrir el Dominio (.com) y el Hosting." />
                              <strong className="block mt-2 text-red-300">Cualquier cambio de diseño o funcionalidad adicional se cobra por horas ($120k/h).</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className='text-lg font-bold text-[#00FF9C] tracking-tight'>{plan.prices.annual.cop}</span>
                          <span className='text-zinc-600 text-[9px] font-medium'>Renovación Anual</span>
                        </div>

                        {/* MICRO FEATURES */}
                        <div className="text-[9px] text-zinc-500 text-right space-y-0.5">
                          <div>✓ <WikiLinker text="Dominio" /> .com</div>
                          <div>✓ <WikiLinker text="Hosting" /> SSL</div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-zinc-800/50 flex items-center justify-between gap-1">
                        <span className="text-[9px] text-red-400/70 font-medium">Cambios fuera del plan:</span>
                        <div className="flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                          <Clock className="w-3 h-3 text-red-400" />
                          <span className="text-[9px] text-red-300 font-bold">$120.000 <span className="text-red-500/60 font-normal">/hora</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TECH SPECS MINI GRID */}
                {plan.specs && (
                  <div className="bg-zinc-900/30 p-2 rounded-lg border border-zinc-800/30 mb-4 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase block">Espacio</span>
                      <span className="text-[10px] text-zinc-300 font-mono">{plan.specs.storage}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase block">Banda</span>
                      <span className="text-[10px] text-zinc-300 font-mono">{plan.specs.bandwidth}</span>
                    </div>
                  </div>
                )}

                <div className='space-y-4 flex-grow'>
                  <ul className='space-y-3'>
                    {plan.features.slice(0, 4).map((feature) =>
                      <li key={feature} className='flex items-start gap-2 text-xs text-zinc-300 group-hover:text-white transition-colors'>
                        <Check className={`w-4 h-4 shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-indigo-400 transition-colors'}`} />
                        <WikiLinker text={feature} />
                      </li>
                    )}
                  </ul>
                </div>

                <Link
                  href={`/checkout?plan=${index === 0 ? 'semilla' : index === 1 ? 'pro' : index === 2 ? 'store' : 'enterprise'}`}
                  className={`mt-6 w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${plan.popular
                    ? 'bg-white text-zinc-950 hover:bg-indigo-50 shadow-lg shadow-indigo-500/20 hover:scale-[1.02]'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white'
                    }`}
                >
                  {index === 3 ? 'Cotizar Proyecto' : 'Elegir Plan'}
                  <ArrowRight className='w-3 h-3' />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MÓDULOS DE ESPECIALIDAD (ADD-ONS) */}
        <div className="mt-24 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl font-bold text-white mb-4">¿Necesitas Superpoderes?</h3>
            <p className="text-zinc-400">Agrega módulos específicos a tu Setup inicial.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {/* Módulo E-commerce */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-indigo-500/50 transition-colors group">
              <div className="text-2xl mb-2">🛍️</div>
              <h4 className="font-bold text-white text-sm mb-1">E-Commerce Plus</h4>
              <p className="text-[10px] text-zinc-400 mb-2">Si necesitas más de 100 productos.</p>
              <p className="text-sm font-bold text-[#00FF9C]">+$850k <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>
            {/* Módulo App */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-indigo-500/50 transition-colors group">
              <div className="text-2xl mb-2">🔐</div>
              <h4 className="font-bold text-white text-sm mb-1">Sistemas & Auth</h4>
              <p className="text-[10px] text-zinc-400 mb-2">Login, Roles y Base de Datos.</p>
              <p className="text-sm font-bold text-[#00FF9C]">+$1.5M <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>
            {/* Módulo 3D */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-purple-500/50 transition-colors group">
              <div className="text-2xl mb-2">🧊</div>
              <h4 className="font-bold text-white text-sm mb-1">Cine & 3D</h4>
              <p className="text-[10px] text-zinc-400 mb-2">Experiencias Inmersivas WebGL.</p>
              <p className="text-sm font-bold text-[#00FF9C]">+$2.8M <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>
            {/* Módulo Data */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-[#00FF9C]/50 transition-colors group">
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
