'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'MVP Launch',
    price: '$4,900',
    description: 'Perfect for startups validating an idea.',
    features: ['Landing Page + Core Feature', 'Next.js + Tailwind Stack', '2 Weeks Delivery', 'Basic SEO Setup', '1 Month Support'],
    cta: 'Start MVP',
    popular: false,
  },
  {
    name: 'Scale-Up Product',
    price: '$12,500',
    description: 'Full-featured application for growth.',
    features: ['Complex User Flows', 'Authentication & Database', 'Payment Integration (Stripe)', 'Admin Dashboard', '4 Weeks Delivery', 'Priority Support'],
    cta: 'Scale Now',
    popular: true,
  },
  {
    name: 'Enterprise Custom',
    price: 'Custom',
    description: 'Dedicated team for large-scale systems.',
    features: ['Microservices Architecture', 'AI/ML Integration', 'Custom SLAs', '24/7 Incident Response', 'Audited Security', 'Dedicated Project Manager'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className='py-32 bg-zinc-950 relative overflow-hidden' id='pricing'>
      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-20'>
          <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>Transparent Investment</h2>
          <p className='text-zinc-400 max-w-2xl mx-auto'>No hidden fees. No hourly billing surprises. Flat-rate pricing for world-class engineering.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border flex flex-col ${plan.popular ? 'bg-zinc-900/80 border-indigo-500/50 shadow-2xl shadow-indigo-900/20' : 'bg-zinc-900/30 border-zinc-800'}`}
            >
              {plan.popular && (
                <span className='absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full uppercase tracking-wider'>
                  Most Popular
                </span>
              )}
              
              <div className='mb-8'>
                <h3 className='text-xl font-bold text-white mb-2'>{plan.name}</h3>
                <div className='text-4xl font-bold text-white mb-2'>{plan.price}</div>
                <p className='text-zinc-400 text-sm'>{plan.description}</p>
              </div>

              <ul className='space-y-4 mb-8 flex-1'>
                {plan.features.map((feature, i) => (
                  <li key={i} className='flex items-start gap-3 text-zinc-300 text-sm'>
                    <Check className='w-5 h-5 text-indigo-400 shrink-0' />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-white text-black hover:bg-indigo-50' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
