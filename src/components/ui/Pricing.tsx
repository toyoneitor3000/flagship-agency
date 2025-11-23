'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'MVP Launch',
    price: '$4,500',
    description: 'Perfect for early-stage founders validating an idea.',
    features: ['Custom Next.js Development', 'Mobile-Responsive UI', 'Authentication Setup', 'Database Integration', '1 Month Support'],
    popular: false,
  },
  {
    name: 'Growth Scale',
    price: '$8,900',
    description: 'For businesses ready to dominate their market.',
    features: ['Everything in MVP', 'Advanced Admin Dashboard', 'Stripe Payments Integration', 'SEO & Performance Optimization', 'Content Management System (CMS)', '3 Months Priority Support'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-scale digital transformation and dedicated teams.',
    features: ['Dedicated Squad (Dev + PM + Design)', 'Microservices Architecture', 'AI/ML Integration', '24/7 SLA Support', 'Audit & Penetration Testing', 'Cloud Infrastructure Setup'],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className='py-32 bg-zinc-950 relative overflow-hidden' id='pricing'>
      {/* Ambient Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-20'>
          <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>Simple, Transparent Pricing</h2>
          <p className='text-zinc-400 max-w-xl mx-auto'>No hidden fees. No hourly billing surprises. Just clear milestones and exceptional delivery.</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border flex flex-col ${plan.popular ? 'bg-zinc-900/80 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10' : 'bg-zinc-950/50 border-zinc-800 hover:bg-zinc-900/50 transition-colors'}`}
            >
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg'>
                  <Sparkles className='w-3 h-3' />
                  MOST POPULAR
                </div>
              )}

              <div className='mb-8'>
                <h3 className='text-xl font-bold text-white mb-2'>{plan.name}</h3>
                <p className='text-zinc-400 text-sm h-10'>{plan.description}</p>
              </div>

              <div className='mb-8'>
                <span className='text-4xl font-bold text-white'>{plan.price}</span>
                {plan.price !== 'Custom' && <span className='text-zinc-500'>/project</span>}
              </div>

              <ul className='space-y-4 mb-8 flex-grow'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-3 text-sm text-zinc-300'>
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-zinc-600'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href='/contact' 
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  plan.popular 
                    ? 'bg-white text-zinc-950 hover:bg-indigo-50 shadow-lg shadow-indigo-500/20' 
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                Choose {plan.name}
                <ArrowRight className='w-4 h-4' />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
