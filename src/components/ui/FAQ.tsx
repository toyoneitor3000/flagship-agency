'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Is this template SEO optimized?',
    answer: 'Absolutely. We use Next.js Metadata API, semantic HTML5, and proper ARIA tags to ensure search engines love your site as much as users do.'
  },
  {
    question: 'Can I use this for commercial projects?',
    answer: 'Yes! Once you purchase a license, you have full rights to use the code for client work, SaaS products, or internal tools without attribution.'
  },
  {
    question: 'Do you offer technical support?',
    answer: 'Our dedicated support team is available 24/7 for Pro and Enterprise plans. We typically respond within 2 hours.'
  },
  {
    question: 'How do I deploy this?',
    answer: 'It is designed to be deployed instantly on Vercel, Netlify, or any containerized environment (Docker). A deployment guide is included.'
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id='faq' className='py-24 bg-zinc-950'>
      <div className='container mx-auto px-4 max-w-3xl'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Frequently Asked <span className='text-indigo-500'>Questions</span>
          </h2>
        </div>

        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className='border border-zinc-800 rounded-2xl bg-zinc-900/20 overflow-hidden'
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className='w-full flex items-center justify-between p-6 text-left focus:outline-none'
              >
                <span className='text-lg font-medium text-zinc-200'>{faq.question}</span>
                <ChevronDown 
                  className={cn(
                    'w-5 h-5 text-zinc-500 transition-transform duration-300',
                    openIndex === index ? 'rotate-180' : ''
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='px-6 pb-6 text-zinc-400 leading-relaxed'>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
