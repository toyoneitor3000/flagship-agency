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
    <section className='py-32 bg-zinc-950 relative overflow-hidden' id='features'>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 pointer-events-none" />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-20'>
          <span className="font-mono text-purple-500 text-sm mb-2 block">&lt;capabilities&gt;</span>
          <h2 className='text-3xl md:text-5xl font-bold text-white mb-6 font-mono'>
            System.<span className="text-green-500">Upgrade()</span>
          </h2>
          <p className='text-zinc-400 max-w-2xl mx-auto font-mono text-sm'>
            <span className="text-zinc-600">/* </span>
            No solo escribimos código. Construimos herramientas digitales diseñadas para vender más y escalar sin límites.
            <span className="text-zinc-600"> */</span>
          </p>
          <span className="font-mono text-purple-500 text-sm mt-2 block">&lt;/capabilities&gt;</span>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='group p-6 bg-zinc-900/40 border border-zinc-800 hover:border-green-500 hover:bg-zinc-900/80 transition-all duration-300 font-mono relative overflow-hidden'
            >
              <div className="absolute top-0 right-0 p-2 opacity-50 text-[10px] text-zinc-600">
                0{index + 1}
              </div>

              <div className='w-10 h-10 bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-green-500 transition-colors'>
                <feature.icon className='w-5 h-5 text-zinc-400 group-hover:text-green-500 transition-colors' />
              </div>

              <h3 className='text-lg font-bold text-white mb-2'>
                {feature.title}
              </h3>

              <p className='text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4 group-hover:border-green-500/50 transition-colors'>
                {feature.description}
              </p>

              <div className="mt-4 text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                return true;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
