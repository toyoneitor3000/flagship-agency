'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Clock, Code2, Rocket, Building2, ArrowDown } from 'lucide-react';
import Link from 'next/link';

const agilePlans = [
  {
    name: 'Acceso Laboratorio (DIY)',
    price: '$45',
    currency: 'USD',
    time: 'Acceso Instantáneo',
    description: 'Para el emprendedor "ansioso". Toma el control total de tu estética y contenido con nuestro Studio Purrpurr 24/7.',
    features: ['Uso ilimitado del Design Lab', 'Cambios en tiempo real', 'Soporte técnico por ticket', 'Hospedaje premium incluido', 'Sin contratos largos'],
    tech: 'Ideal para flujo de caja mensual y control total.',
    popular: false,
  },
  {
    name: 'Anual Estándar (Static)',
    price: '$350',
    currency: 'USD',
    time: 'Entrega en 48h',
    description: 'La solución profesional "llave en mano". Nosotros construimos, tú te relajas. Un solo pago al año y te olvidas.',
    features: ['Diseño y montaje por expertos', 'Mantenimiento anual incluido', 'Rendimiento optimizado (90+)', 'Soporte prioritario', 'Renovación anual simple'],
    tech: 'Estabilidad y calidad premium sin mover un dedo.',
    popular: true,
  },
];

const customPlans = [
  {
    name: 'Growth & Partnership',
    price: '$16,000',
    currency: 'USD',
    time: 'Contrato Anual',
    description: 'Tu socio estratégico de ingeniería. Desarrollo a medida, automatizaciones y escalabilidad masiva.',
    features: ['Ingeniería dedicada (SaaS/Apps)', 'Sistemas de pagos complejos', 'Automatización de procesos', 'Consultoría de producto mensual', 'Soporte 24/7 garantizado'],
    tech: 'Tu propio departamento de tecnología externo.',
    popular: true,
  }
];

export const Pricing = () => {
  const [activeTab, setActiveTab] = useState<'agile' | 'custom' | null>(null);

  const plans = activeTab === 'custom' ? customPlans : agilePlans;

  return (
    <section className='py-32 bg-zinc-950 relative overflow-hidden' id='pricing' data-section-theme='dark'>
      {/* Ambient Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-12'>
          <h2 className='font-display text-3xl md:text-5xl font-bold text-white mb-6'>Elige tu Nivel de Impacto</h2>
          <div className="inline-block px-4 py-2 bg-[#00FF9C]/10 border border-[#00FF9C]/20 rounded-lg mb-6">
            <p className="text-[#00FF9C] text-sm font-bold tracking-wide uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              No inviertas a ciegas. Solicita una Demostración de Ingeniería.
            </p>
          </div>
          <p className='text-zinc-400 max-w-2xl mx-auto text-lg'>
            Entendemos que no todos los proyectos son iguales. <br className="hidden md:block" />
            Diseñamos una estrategia dual para <strong>validar rápido</strong> o <strong>escalar masivamente</strong>.
          </p>
        </div>

        <AnimatePresence mode='wait'>
          {activeTab === null ? (
            <motion.div
              key="selection-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              <button
                onClick={() => setActiveTab('agile')}
                className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900/80 hover:border-indigo-500/50 transition-all text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">Paquetes Ágiles</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Lanza tu MVP o Landing Page en tiempo récord. Ideal para pre-ventas, validación de mercado y startups early-stage.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold pt-4 group-hover:gap-3 transition-all">
                    Ver Planes <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('custom')}
                className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900/80 hover:border-indigo-500/50 transition-all text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">Track-Ready Systems</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Sistemas robustos de gestión, automatización y escalabilidad. Para empresas que necesitan infraestructura seria.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-bold pt-4 group-hover:gap-3 transition-all">
                    Ver Sistemas <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="pricing-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Strategy Toggle */}
              <div className='flex justify-center mb-16'>
                <div className='bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 flex items-center relative'>
                  {/* Slider Background */}
                  <motion.div
                    className='absolute top-1.5 bottom-1.5 bg-indigo-600 rounded-xl z-0'
                    initial={false}
                    animate={{
                      x: activeTab === 'agile' ? 0 : '100%',
                      width: '50%'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />

                  <button
                    onClick={() => setActiveTab('agile')}
                    className={`relative z-10 px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors w-48 justify-center ${activeTab === 'agile' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <Rocket className='w-4 h-4' />
                    Paquetes Ágiles
                  </button>
                  <button
                    onClick={() => setActiveTab('custom')}
                    className={`relative z-10 px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors w-48 justify-center ${activeTab === 'custom' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <Building2 className='w-4 h-4' />
                    Track-Ready Systems
                  </button>
                </div>
              </div>

              <div className='max-w-7xl mx-auto'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className='grid grid-cols-1 md:grid-cols-3 gap-8'
                  >
                    {plans.map((plan, index) => (
                      <motion.div
                        key={plan.name}
                        className={`relative p-8 rounded-3xl border flex flex-col group ${plan.popular ? 'bg-zinc-900/80 border-indigo-500 shadow-2xl shadow-indigo-500/10 z-10 ring-1 ring-indigo-500/50' : 'bg-zinc-950/50 border-zinc-800 hover:bg-zinc-900/50 transition-colors'}`}
                      >
                        {plan.popular && (
                          <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg uppercase tracking-wide'>
                            <Sparkles className='w-3 h-3' />
                            Recomendado
                          </div>
                        )}

                        <div className='mb-6'>
                          <div className='flex justify-between items-start mb-2'>
                            <h3 className='font-display text-xl font-bold text-white'>{plan.name}</h3>
                            {activeTab === 'custom' && (
                              <span className='px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-[10px] uppercase font-bold tracking-wider'>High-Ticket</span>
                            )}
                          </div>
                          <div className='flex items-center gap-2 text-indigo-400 text-xs font-medium mb-3 bg-indigo-500/10 w-fit px-3 py-1.5 rounded-lg'>
                            <Clock className='w-3 h-3' />
                            {plan.time}
                          </div>
                          <p className='text-zinc-400 text-sm leading-relaxed min-h-[3rem]'>{plan.description}</p>
                        </div>

                        <div className='mb-8 pb-8 border-b border-zinc-900'>
                          <div className='flex items-baseline gap-1'>
                            <span className='text-4xl font-bold text-white tracking-tight'>{plan.price}</span>
                            <span className='text-zinc-500 text-sm font-semibold'>{plan.currency}</span>
                          </div>
                          {!plan.price.includes('+') && activeTab === 'agile' && <span className='text-zinc-600 text-xs'>Pago único</span>}
                          {activeTab === 'custom' && <span className='text-zinc-600 text-xs'>Inversión estimada</span>}
                        </div>

                        <div className='space-y-6 flex-grow'>
                          <div className='bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50'>
                            <div className='flex items-center gap-2 mb-2'>
                              <Code2 className='w-4 h-4 text-indigo-400' />
                              <span className='text-xs text-zinc-300 font-bold uppercase tracking-wide'>Nivel Técnico</span>
                            </div>
                            <p className='text-xs text-zinc-400 leading-relaxed'>{plan.tech}</p>
                          </div>

                          <ul className='space-y-4'>
                            {plan.features.map((feature) => (
                              <li key={feature} className='flex items-start gap-3 text-sm text-zinc-300 group-hover:text-zinc-200 transition-colors'>
                                <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-indigo-500/50 transition-colors'}`} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link
                          href={`/checkout?plan=${plan.name.includes('DIY') ? 'diy' : plan.name.includes('Static') ? 'static' : 'enterprise'}`}
                          className={`mt-8 w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${plan.popular
                            ? 'bg-white text-zinc-950 hover:bg-indigo-50 shadow-lg shadow-indigo-500/20 hover:scale-[1.02]'
                            : 'bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white'
                            }`}
                        >
                          {activeTab === 'agile' ? 'Iniciar Suscripción' : 'Activar Partnership'}
                          <ArrowRight className='w-4 h-4' />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-16 text-center">
                <button
                  onClick={() => setActiveTab(null)}
                  className="text-zinc-500 text-sm font-mono hover:text-indigo-400 transition-colors flex items-center justify-center mx-auto gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Volver a seleccionar categoría
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Down Button */}
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
