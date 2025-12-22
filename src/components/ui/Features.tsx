'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, ShieldCheck, Zap, Smartphone, Layers } from 'lucide-react';

const features = [
  {
    title: 'Velocidad Ultrarrápida',
    description: 'Nadie espera más de 3 segundos. Nuestras páginas cargan al instante para que no pierdas ni un solo cliente.',
    icon: Zap,
  },
  {
    title: 'Diseño que Enamora',
    description: 'Interfaces premium creadas para generar confianza inmediata y diferenciarte de tu competencia.',
    icon: Smartphone,
  },
  {
    title: 'Pagos 100% Seguros',
    description: 'Tus clientes podrán pagar con total tranquilidad. Seguridad de nivel bancario en cada transacción.',
    icon: ShieldCheck,
  },
  {
    title: 'Alcance Global',
    description: 'Tu plataforma funcionará igual de rápido en Bogotá, Miami o Madrid. Sin fronteras.',
    icon: Globe,
  },
  {
    title: 'Preparado para el Futuro',
    description: 'Integramos Inteligencia Artificial y tecnologías modernas que mantienen tu negocio a la vanguardia.',
    icon: Cpu,
  },
  {
    title: 'Crece sin Límites',
    description: '¿Pasaste de 100 a 1 millón de visitas? Tu plataforma aguantará el tráfico sin caerse ni ponerse lenta.',
    icon: Layers,
  },
];

export const Features = () => {
  return (
    <section className='py-32 bg-[#0D0216] relative overflow-hidden' id='features'>

      {/* --- LAYER 1: BACKEND DEEP DIVE --- */}

      {/* Deep Space Grid - The System */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#A855F705_1px,transparent_1px),linear-gradient(to_bottom,#A855F705_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Deep Glows - Cyberpunk Atmosphere */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#9333EA]/5 rounded-full blur-[150px] pointer-events-none' />

      <div className='container mx-auto px-4 relative z-10'>

        {/* SECTION HEADER WITH TERMINAL VIBE */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24'>
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 bg-[#00FF9C] rounded-full animate-pulse shadow-[0_0_10px_#00FF9C]"></span>
              <span className="font-mono text-[#00FF9C] text-sm tracking-widest uppercase">System Core Online</span>
            </div>

            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight'>
              La Ingeniería Invisible<br />
              <span className="text-[#A855F7]">Que Genera Ventas.</span>
            </h2>

            <p className='text-zinc-400 font-mono text-lg leading-relaxed mb-8'>
              Lo que no se ve es lo que sostiene el negocio. Mientras otros usan plantillas, nosotros construimos <span className="text-white">sistemas robustos</span> diseñados para escalar.
            </p>

            <ul className="space-y-4 font-mono text-sm text-zinc-300">
              <li className="flex items-center gap-3">
                <span className="text-[#00FF9C]">&gt;</span> Infraestructura serverless escala automática
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#00FF9C]">&gt;</span> Carga &lt; 800ms (Core Web Vitals)
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#00FF9C]">&gt;</span> Seguridad bancaria integrada
              </li>
            </ul>
          </div>

          {/* LIVING TERMINAL - VISUAL PROOF */}
          <div className="order-1 lg:order-2">
            <div className="rounded-xl bg-[#0f0b1e] border border-[#A855F7]/30 shadow-2xl p-6 font-mono text-sm relative overflow-hidden group">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4 border-b border-[#A855F7]/20 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[#A855F7]/50 text-xs">root@purrpurr-server: ~</div>
              </div>

              {/* Code Content */}
              <div className="space-y-2 text-[#E9D5FF]">
                <div className="flex gap-2">
                  <span className="text-[#00FF9C]">$</span>
                  <span className="typing-effect">./analyze_market.sh --target=growth</span>
                </div>
                <div className="opacity-50 text-xs py-2">
                  [INFO] Connecting to neural network...<br />
                  [INFO] Analyzing competitor data...<br />
                  [SUCCESS] Optimization vectors found.
                </div>
                <div className="flex gap-2">
                  <span className="text-[#00FF9C]">$</span>
                  <span>deploy_infrastructure --mode=aggressive</span>
                </div>
                <div className="text-[#00FF9C] py-2">
                  ✓ CDN Nodes Active<br />
                  ✓ Database Sharding Enabled<br />
                  ✓ Payment Gateway Secured<br />
                </div>
                <div className="flex gap-2 animate-pulse">
                  <span className="text-[#00FF9C]">$</span>
                  <span className="w-3 h-5 bg-[#00FF9C]"></span>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#A855F7]/0 via-[#A855F7]/10 to-[#A855F7]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>
        </div>

        {/* FEATURE CARDS - MODULES */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='group p-6 bg-[#9333EA]/5 border border-[#A855F7]/20 hover:border-[#00FF9C] hover:bg-[#9333EA]/10 transition-all duration-300 font-mono relative overflow-hidden backdrop-blur-sm'
            >
              <div className="absolute top-0 right-0 p-2 opacity-30 text-[10px] text-[#A855F7] group-hover:text-[#00FF9C] transition-colors">
                SYS_MOD_0{index + 1}
              </div>

              <div className='w-10 h-10 bg-[#A855F7]/5 border border-[#A855F7]/30 flex items-center justify-center mb-4 group-hover:border-[#00FF9C] group-hover:bg-[#00FF9C]/10 transition-colors rounded-sm'>
                <feature.icon className='w-5 h-5 text-[#A855F7] group-hover:text-[#00FF9C] transition-colors stroke-[1.5]' />
              </div>

              <h3 className='text-lg font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors'>
                {feature.title}
              </h3>

              <p className='text-[#A7A2D4] text-sm leading-relaxed border-l-2 border-[#A855F7]/30 pl-4 group-hover:border-[#00FF9C] transition-colors'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
