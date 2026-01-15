'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Clock, Code2, Rocket, Building2, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { WikiLinker } from '@/components/ui/WikiLinker';
import { PricingCalculator } from './PricingCalculator';

const plansData = [
  {
    name: 'Plan Semilla (Start)',
    prices: {
      monthly: { cop: '$15,000', usd: '$4.00' },
      annual: { cop: '$250,000', usd: '$65.00' }, // PRECIO TOTAL ANUAL
      setup: { cop: '$350,000', usd: '$95' }
    },
    description: 'El punto de partida ideal. Tu espacio digital profesional, accesible y sin barreras.',
    features: [
      'Diseño Web Profesional (Landing Page)',
      'Panel de Control (CMS)',
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
    hours: 8,
    infraDetail: 'Infraestructura Base: Cubre los esenciales técnicos (Dominio, SSL, DNS) para mantener el sitio online y seguro.'
  },
  {
    name: 'Plan Profesional (Services)',
    prices: {
      monthly: { cop: '$95,000', usd: '$25' },
      annual: { cop: '$950,000', usd: '$250' },
      setup: { cop: '$850,000', usd: '$220' }
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
    hours: 24,
    infraDetail: 'Recursos Dinámicos: Un CMS consume recursos activos (Base de Datos & CPU). Incluye Backups diarios para proteger tu contenido.'
  },
  {
    name: 'Plan Comercio (Store)',
    prices: {
      monthly: { cop: '$180,000', usd: '$50' },
      annual: { cop: '$1,800,000', usd: '$480' },
      setup: { cop: '$2,200,000', usd: '$580' }
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
    infraDetail: 'Alta Disponibilidad: Servidores optimizados para tráfico transaccional. Incluye monitoreo de seguridad para proteger los pagos.'
  },
  {
    name: 'Plan Sistema (Web App)',
    prices: {
      monthly: { cop: '$280,000', usd: '$75' },
      annual: { cop: '$2,500,000', usd: '$650' },
      setup: { cop: '$4,500,000', usd: '$1,200' }
    },
    description: 'Digitaliza tu operación. Software a medida para reservas, intranets, dashboards o gestión de clientes.',
    features: [
      'Usuarios, Roles y Permisos (Auth)',
      'Dashboards y Reportes en Tiempo Real',
      'Lógica de Negocio Compleja',
      'Integración con CRMs/ERPs'
    ],
    specs: {
      storage: 'Base de Datos Dedicada',
      bandwidth: 'Tráfico Ilimitado',
      compute: 'Serverless Functions',
      changes: 'Soporte Funcional'
    },
    tech: 'Tu empresa operando en piloto automático.',
    popular: false,
    hours: 80,
    infraDetail: 'Soporte Operativo: Garantía de funcionamiento para tu software. Incluye monitoreo de errores, parches de seguridad y soporte técnico.'
  },
  {
    name: 'Venture & Corporate',
    prices: {
      monthly: { cop: 'Retainer', usd: 'Custom' },
      annual: { cop: 'A Medida', usd: 'Custom' },
      setup: { cop: 'Desde $12M', usd: '$3k+' }
    },
    description: 'Para Visionarios con Capital. Tienes la idea (el próximo Rappi/Uber), nosotros ponemos la ingeniería para construirlo desde cero.',
    features: [
      'Arquitectura de Producto (MVP)',
      'Desarrollo Mobile & Web Full-Stack',
      'Infraestructura Cloud Escalable',
      'Tu propio equipo de CTO & Devs'
    ],
    specs: {
      storage: 'Infraestructura Propia',
      bandwidth: 'Gestión Delegada',
      compute: 'Cluster Privado',
      changes: 'Agencia (Desarrollo Continuo)'
    },
    tech: 'Tu socio tecnológico a largo plazo.',
    popular: false,
    hours: 'Ilimitado',
    infraDetail: 'Arquitectura Dedicada: Diseño de infraestructura Cloud a medida (AWS/Azure) para escalar masivamente tu producto.'
  }
];

export const Pricing = () => {

  return (
    <section className='py-32 relative overflow-hidden' id='pricing' data-section-theme='dark'>
      {/* Ambient Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-12'>
          <h2 className='font-display text-3xl md:text-5xl font-bold text-white mb-6'>Diseñado para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-accent)]">PERSONAS</span></h2>
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
          <p className='text-zinc-400 max-w-2xl mx-auto text-lg'>
            Entendemos que detrás de cada proyecto hay un sueño. <br className="hidden md:block" />
            Nuestros planes están pensados para acompañar cada etapa de tu crecimiento con precios competitivos.
          </p>
        </div>

        {/* Strategy Toggle */}
        {/* Strategy Toggle */}
        {/* Strategy Toggle */}
        <div className='flex flex-col items-center mb-16 gap-4'>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl max-w-2xl text-center">
            <p className="text-zinc-400 text-sm">
              <span className="text-indigo-400 font-bold">Visión a Largo Plazo:</span> Tu proyecto está diseñado para evolucionar. Pagas la Arquitectura Inicial (Setup) y luego decidimos cómo escalar: Mantenimiento Anual o <span className="text-white font-medium">Modalidad Agencia (Retainer)</span> para acompañar tu crecimiento.
            </p>
          </div>
        </div>

        {/* CALCULADORA DE INVERSIÓN */}
        <div className="mb-24">
          <PricingCalculator />
        </div>

        <div className='max-w-[95%] mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {plansData.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-3xl border flex flex-col group transition-all duration-500 ${plan.popular
                  ? 'bg-gradient-to-b from-zinc-900 to-indigo-950/30 border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.15)] z-10 scale-105 md:scale-110'
                  : 'bg-zinc-950/50 border-white/5 hover:border-indigo-500/30 hover:bg-zinc-900/80'}`}
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

                {/* --- FASE 1: CONSTRUCCIÓN (SETUP) --- */}
                <div className='mb-2 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 relative overflow-hidden group/phase1'>
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover/phase1:opacity-20 transition-opacity">
                    <Rocket className="w-12 h-12 rotate-45" />
                  </div>
                  <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest block mb-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    Fase 1: Construcción
                  </span>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 tracking-tighter">{plan.prices.setup.cop}</span>
                    <span className="text-zinc-500 text-[10px] font-bold uppercase">Pago Único</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] text-zinc-300">Incluye <strong>{plan.hours} {typeof plan.hours === 'number' ? 'Horas' : ''}</strong> de Ingeniería</span>
                  </div>
                </div>

                {/* CONECTOR DE FLUJO */}
                <div className="flex justify-center -my-3 relative z-10">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-full p-1 text-zinc-600">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                </div>

                {/* --- FASE 2: OPERACIÓN (INFRAESTRUCTURA) --- */}
                <div className='mb-6 pt-6 pb-4 px-4 bg-zinc-900/20 rounded-2xl border border-zinc-800/50 border-t-0 rounded-t-none -mt-3'>
                  <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest block mb-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)]"></span>
                    Fase 2: Operación
                  </span>

                  <div className="flex justify-between items-start mb-3">
                    {plan.name === 'Venture & Corporate' ? (
                      <div className="flex flex-col">
                        <span className='text-lg font-bold text-white tracking-tight'>Por Proyecto</span>
                        <span className='text-zinc-500 text-[9px] font-medium'>Cotización a Medida</span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className='text-3xl font-black text-[var(--color-brand-accent)] tracking-tighter drop-shadow-[0_0_10px_rgba(0,255,156,0.2)]'>{plan.prices.annual.cop}</span>
                        <span className='text-zinc-500 text-[9px] font-medium'>/ Año (Renovación)</span>
                      </div>
                    )}

                    {/* Micro Features Compactas */}
                    {plan.name !== 'Venture & Corporate' && (
                      <div className="text-[9px] text-zinc-500 text-right">
                        <div className="flex items-center justify-end gap-1"><Check className="w-3 h-3 text-[var(--color-brand-accent)]" /> Dominio .com</div>
                        <div className="flex items-center justify-end gap-1"><Check className="w-3 h-3 text-[var(--color-brand-accent)]" /> Hosting SSL</div>
                      </div>
                    )}
                  </div>

                  {/* CAJA DE TRANSPARENCIA (RECEIPT STYLE) */}
                  <div className="text-[10px] leading-relaxed bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 flex gap-2 items-start shadow-inner">
                    <span className="text-indigo-400 mt-0.5 shrink-0">ℹ️</span>
                    <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      <WikiLinker text={plan.infraDetail} />
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-zinc-800/30 flex items-center justify-between gap-1 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-zinc-500 font-medium">Hora Adicional:</span>
                    <span className="text-[9px] text-zinc-400 font-mono">$120k</span>
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
                  className={`mt-6 w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${index === 4
                    ? 'bg-transparent border border-white/20 text-white hover:bg-white/10'
                    : plan.popular
                      ? 'bg-[var(--color-brand-accent)] text-zinc-950 hover:brightness-110 shadow-[0_0_20px_rgba(0,255,156,0.3)] hover:shadow-[0_0_30px_rgba(0,255,156,0.5)]'
                      : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg shadow-white/5'
                    }`}
                >
                  {index === 4 ? 'Cotizar Proyecto' : 'Elegir Plan'}
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

          <div className="flex flex-wrap justify-center gap-4">
            {/* Módulo E-commerce */}
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-indigo-500/50 transition-colors group flex flex-col items-center">
              <div className="text-2xl mb-2">🛍️</div>
              <h4 className="font-bold text-white text-sm mb-1">E-Commerce Plus</h4>
              <p className="text-[10px] text-zinc-400 mb-2">Si necesitas más de 100 productos.</p>
              <p className="text-sm font-bold text-[var(--color-brand-accent)]">+$250k <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>
            {/* Módulo App */}
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-indigo-500/50 transition-colors group flex flex-col items-center">
              <div className="text-2xl mb-2">👤</div>
              <h4 className="font-bold text-white text-sm mb-1">Portal de Usuarios</h4>
              <p className="text-[10px] text-zinc-400 mb-2">Tus clientes se registran (Membresía).</p>
              <p className="text-sm font-bold text-[var(--color-brand-accent)]">+$450k <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>
            {/* Módulo Apps Nativas */}
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900 border border-indigo-500/30 p-4 rounded-2xl hover:border-indigo-400 transition-colors group flex flex-col items-center shadow-lg shadow-indigo-900/10">
              <div className="text-2xl mb-2">📲</div>
              <h4 className="font-bold text-white text-sm mb-1">App Stores (PWA)</h4>
              <p className="text-[10px] text-zinc-400 mb-2 text-center">Tu Web empacada para descargar en iPhone y Android.</p>
              <p className="text-sm font-bold text-indigo-300">$850k <span className="text-[10px] text-indigo-500">Pago Único</span></p>
            </div>
            {/* Módulo 3D */}
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-zinc-900/30 border border-zinc-800 p-4 rounded-2xl hover:border-purple-500/50 transition-colors group flex flex-col items-center">
              <div className="text-2xl mb-2">🧊</div>
              <h4 className="font-bold text-white text-sm mb-1">Cine & 3D</h4>
              <p className="text-[10px] text-zinc-400 mb-2 text-center">Experiencias Inmersivas WebGL.</p>
              <p className="text-sm font-bold text-[var(--color-brand-accent)]">+$750k <span className="text-[10px] text-zinc-500">COP</span></p>
            </div>
            {/* Módulo Data */}
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
