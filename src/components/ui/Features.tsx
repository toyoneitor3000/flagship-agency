'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Globe, ShieldCheck, Zap, Smartphone, Layers, ArrowDown } from 'lucide-react';

const backendFeatures = [
  {
    title: 'Velocidad Ultrarrápida',
    description: 'Nadie espera más de 3 segundos. Nuestras páginas cargan al instante para que no pierdas ni un solo cliente.',
    icon: Zap,
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
    title: 'Crece sin Límites',
    description: '¿Pasaste de 100 a 1 millón de visitas? Tu plataforma aguantará el tráfico sin caerse ni ponerse lenta.',
    icon: Layers,
  },
];

const frontendFeatures = [
  {
    title: 'Diseño que Enamora',
    description: 'Interfaces premium creadas para generar confianza inmediata y diferenciarte de tu competencia.',
    icon: Smartphone,
  },
  {
    title: 'Interacciones Fluidas',
    description: 'Cada scroll y cada click se sienten naturales. Una experiencia de usuario que se disfruta en cada segundo.',
    icon: Zap,
  },
  {
    title: 'Preparado para el Futuro',
    description: 'Integramos ingeniería robusta y tecnologías modernas que mantienen tu negocio a la vanguardia.',
    icon: Cpu,
  },
];

// --- TERMINAL COMPONENT ---

const Terminal = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Start when 30% visible

  const [step, setStep] = React.useState(0);
  const [text1, setText1] = React.useState('');
  const [text2, setText2] = React.useState('');
  const [showOutput1, setShowOutput1] = React.useState(false);
  const [showOutput2, setShowOutput2] = React.useState(false);
  const [showFinalPrompt, setShowFinalPrompt] = React.useState(false);

  // Animation sequence
  React.useEffect(() => {
    if (!isInView) return; // Wait for visibility

    const cmd1 = "./initialize_digital_mechanics.sh";
    const cmd2 = "build_portfolio_ecosystems --optimize=max";

    let isActive = true;

    const runSequence = async () => {
      // Initial delay before starting
      await new Promise(r => setTimeout(r, 500));
      if (!isActive) return;

      // Type Command 1
      for (let i = 0; i <= cmd1.length; i++) {
        if (!isActive) return;
        setText1(cmd1.slice(0, i));
        await new Promise(r => setTimeout(r, 50)); // Typing speed
      }

      // Process Command 1
      await new Promise(r => setTimeout(r, 400));
      if (!isActive) return;
      setShowOutput1(true);

      // Delay before Command 2
      await new Promise(r => setTimeout(r, 1500));
      if (!isActive) return;
      setStep(1); // Ready for cmd 2

      // Type Command 2
      for (let i = 0; i <= cmd2.length; i++) {
        if (!isActive) return;
        setText2(cmd2.slice(0, i));
        await new Promise(r => setTimeout(r, 50));
      }

      // Process Command 2
      await new Promise(r => setTimeout(r, 400));
      if (!isActive) return;
      setShowOutput2(true);

      // Final Prompt
      await new Promise(r => setTimeout(r, 1000));
      if (!isActive) return;
      setShowFinalPrompt(true);
    };

    runSequence();
    return () => { isActive = false; };
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-xl bg-[#0f0b1e] border border-[#8f69ff]/30 shadow-2xl p-6 font-mono text-sm relative overflow-hidden group min-h-[340px]"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#8f69ff]/20 pb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[#8f69ff]/50 text-xs">root@flagship-server: ~</div>
      </div>

      {/* Code Content */}
      <div className="space-y-2 text-[#E9D5FF]">

        {/* Command 1 Line */}
        <div className="flex gap-2 min-h-[20px]">
          <span className="text-[#00FF9C] shrink-0">$</span>
          <span>
            {text1}
            {step === 0 && !showOutput1 && (
              <span className="animate-pulse bg-[#00FF9C] w-2 h-4 inline-block ml-1 align-middle" />
            )}
          </span>
        </div>

        {/* Output 1 */}
        {showOutput1 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="opacity-50 text-xs py-2 space-y-1"
          >
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>[INFO] Connecting to digital core...</motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>[INFO] Analyzing market dynamics...</motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>[SUCCESS] Logic optimized.</motion.div>
          </motion.div>
        )}

        {/* Command 2 Line */}
        {(step >= 1) && (
          <div className="flex gap-2 min-h-[20px]">
            <span className="text-[#00FF9C] shrink-0">$</span>
            <span>
              {text2}
              {step === 1 && !showOutput2 && (
                <span className="animate-pulse bg-[#00FF9C] w-2 h-4 inline-block ml-1 align-middle" />
              )}
            </span>
          </div>
        )}

        {/* Output 2 */}
        {showOutput2 && (
          <div className="text-[#00FF9C] py-2 space-y-1">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>✓ CDN Nodes Active</motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>✓ Interface Engine Primed</motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>✓ Security Protocols Engaged</motion.div>
          </div>
        )}

        {/* Final Prompt */}
        {showFinalPrompt && (
          <div className="flex gap-2">
            <span className="text-[#00FF9C]">$</span>
            <span className="w-3 h-5 bg-[#00FF9C] animate-pulse"></span>
          </div>
        )}
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#8f69ff]/0 via-[#8f69ff]/10 to-[#8f69ff]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export const Features = () => {
  return (
    <div id='features' className="overflow-hidden">
      {/* --- BACK-END SECTION (Purple) --- */}
      <section className='pt-24 pb-32 relative overflow-hidden' data-section-theme='dark'>
        {/* Deep Space Grid - The System */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8f69ff08_1px,transparent_1px),linear-gradient(to_bottom,#8f69ff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Deep Glows - Cyberpunk Atmosphere */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#8f69ff]/5 rounded-full blur-[150px] pointer-events-none' />

        <div className='container mx-auto px-4 relative z-10'>
          {/* SECTION HEADER WITH TERMINAL VIBE */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24'>
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 bg-[#00FF9C] rounded-full animate-pulse shadow-[0_0_10px_#00FF9C]"></span>
                <span className="font-mono text-[#00FF9C] text-sm tracking-widest uppercase">System Core Online</span>
              </div>

              <h2 className='font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight'>
                La Ingeniería Invisible<br />
                <span className="text-[#8f69ff]">Que Genera Ventas.</span>
              </h2>

              <p className='text-zinc-400 font-mono text-lg leading-relaxed mb-8'>
                Lo que no se ve es lo que sostiene el negocio. Mientras otros usan plantillas, nosotros construimos <span className="text-white">sistemas robustos</span> diseñados para escalar.
              </p>

              <ul className="space-y-4 font-mono text-sm text-zinc-300">
                <li className="flex items-center gap-3">
                  <span className="text-[#00FF9C]">&gt;</span> Infraestructura serverless escala automática
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#00FF9C]">&gt;</span> Seguridad bancaria integrada
                </li>
              </ul>
            </div>

            {/* LIVING TERMINAL - VISUAL PROOF */}
            <div className="order-1 lg:order-2">
              <Terminal />
            </div>
          </div>

          {/* FEATURE CARDS - BACKEND */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {backendFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className='group p-6 bg-white/5 border border-white/10 hover:border-[#00FF9C] hover:bg-white/10 transition-all duration-300 font-mono relative overflow-hidden backdrop-blur-sm'
              >
                <div className="absolute top-0 right-0 p-2 opacity-30 text-[10px] text-[#8f69ff] group-hover:text-[#00FF9C] transition-colors">
                  SYS_MOD_0{index + 1}
                </div>

                <div className='w-10 h-10 bg-[#8f69ff]/10 border border-[#8f69ff]/30 flex items-center justify-center mb-4 group-hover:border-[#00FF9C] group-hover:bg-[#00FF9C]/10 transition-colors rounded-sm'>
                  <feature.icon className='w-5 h-5 text-[#8f69ff] group-hover:text-[#00FF9C] transition-colors stroke-[1.5]' />
                </div>

                <h3 className='text-lg font-bold text-white mb-2 group-hover:text-white transition-colors'>
                  {feature.title}
                </h3>

                <p className='text-zinc-400 text-sm leading-relaxed border-l-2 border-[#8f69ff]/30 pl-4 group-hover:border-[#00FF9C] transition-colors'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FRONT-END SECTION (Light) --- */}
      <section className='pt-24 pb-32 bg-[#f0ffcc] relative overflow-hidden border-t border-black/5' data-section-theme='light'>
        <div className='container mx-auto px-4 relative z-10'>
          <div className='max-w-4xl mb-20'>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 bg-[#709600] rounded-full shadow-[0_0_10px_#709600]"></span>
              <span className="font-mono text-[#709600] text-sm tracking-widest uppercase">Front-end Experience</span>
            </div>

            <h2 className='font-display text-4xl md:text-5xl font-bold text-[#0f0033] mb-6 tracking-tight'>
              Experiencia & Diseño<br />
              <span className="text-[#8f69ff]">Que Cautiva.</span>
            </h2>

            <p className='text-zinc-700 font-mono text-lg leading-relaxed'>
              No solo se trata de verse bien, se trata de <span className="text-[#0f0033] font-bold">funcionar perfecto</span>. Creamos interfaces intuitivas que reducen la fricción y multiplican tus conversiones.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {frontendFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className='group p-8 bg-zinc-950/5 border border-black/5 hover:border-[#8f69ff] hover:bg-white transition-all duration-300 font-mono relative overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-xl'
              >
                <div className="absolute top-0 right-0 p-2 opacity-30 text-[10px] text-[#0f0033]">
                  UX_MOD_0{index + 1}
                </div>

                <div className='w-12 h-12 bg-black/5 border border-black/10 flex items-center justify-center mb-6 group-hover:border-[#8f69ff] group-hover:bg-[#8f69ff]/10 transition-colors rounded-sm'>
                  <feature.icon className='w-6 h-6 text-[#0f0033] group-hover:text-[#8f69ff] transition-colors stroke-[1.5]' />
                </div>

                <h3 className='text-xl font-bold text-[#0f0033] mb-3'>
                  {feature.title}
                </h3>

                <p className='text-zinc-600 text-sm leading-relaxed border-l-2 border-zinc-300 pl-4 group-hover:border-[#8f69ff] transition-colors'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Scroll Down Button */}
          <div className="flex justify-center mt-20">
            <a
              href="#philosophy"
              className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-[#8f69ff] transition-colors duration-300"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#0f0033]/60">Ver Portafolio</span>
              <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#8f69ff]/50 group-hover:bg-[#8f69ff]/10 transition-all">
                <ArrowDown className="w-4 h-4 text-[#0f0033]/60 group-hover:text-[#8f69ff] animate-bounce" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

