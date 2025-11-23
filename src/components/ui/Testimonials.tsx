'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'CTO at TechFlow',
    image: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    content: 'The architecture is simply brilliant. We migrated our entire platform in less than a week and saw a 40% boost in performance.'
  },
  {
    name: 'David Chen',
    role: 'Founder, StartScale',
    image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    content: 'I have never seen a template this polished. The attention to detail in the animations and responsive design is unmatched.'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Product Designer',
    image: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
    content: 'Finally, a dev tool that respects design principles. The dark mode implementation is flawless. Highly recommended.'
  }
];

export const Testimonials = () => {
  return (
    <section id='testimonials' className='py-24 bg-zinc-950 border-t border-zinc-900'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-5xl font-bold text-white mb-4'>
            Trusted by <span className='text-indigo-500'>Innovators</span>
          </h2>
          <p className='text-zinc-400 text-lg'>
            Don\'t just take our word for it.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800 hover:bg-zinc-900/50 transition-colors'
            >
              <div className='flex gap-1 mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-indigo-500 text-indigo-500' />
                ))}
              </div>
              <p className='text-zinc-300 mb-6 leading-relaxed'>"{t.content}"</p>
              <div className='flex items-center gap-4'>
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className='w-10 h-10 rounded-full border border-zinc-700'
                />
                <div>
                  <h4 className='text-white font-semibold text-sm'>{t.name}</h4>
                  <p className='text-zinc-500 text-xs'>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
