'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, ShieldCheck, Zap, Smartphone, Layers } from 'lucide-react';

const features = [
  {
    title: 'Next.js Architecture',
    description: 'Server-side rendering and static generation for instant page loads and SEO dominance.',
    icon: Globe,
  },
  {
    title: 'Mobile-First Design',
    description: 'Responsive interfaces that feel like native apps on every device. Touch-optimized.',
    icon: Smartphone,
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, DDoS protection, and automated compliance checks.',
    icon: ShieldCheck,
  },
  {
    title: 'Global Edge Network',
    description: 'Your app is replicated across 35+ regions worldwide for <50ms latency.',
    icon: Zap,
  },
  {
    title: 'AI Integration',
    description: 'Native support for LLMs, vector databases, and generative AI features.',
    icon: Cpu,
  },
  {
    title: 'Scalable Infrastructure',
    description: 'From 100 to 10 million users without rewriting a single line of code.',
    icon: Layers,
  },
];

export const Features = () => {
  return (
    <section className='py-32 bg-zinc-950' id='features'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-20'>
          <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>Engineering Excellence</h2>
          <p className='text-zinc-400 max-w-2xl mx-auto'>We don\'t use templates. We engineer robust digital products using the same stack as industry giants like Netflix, Uber, and Notion.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='group p-8 bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 rounded-3xl hover:bg-zinc-900 transition-all duration-300'
            >
              <div className='w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all'>
                <feature.icon className='w-6 h-6 text-zinc-300 group-hover:text-indigo-400 transition-colors' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>{feature.title}</h3>
              <p className='text-zinc-400 leading-relaxed'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
