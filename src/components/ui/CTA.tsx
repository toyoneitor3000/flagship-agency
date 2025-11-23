'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { submitContactForm } from '@/app/actions';

export const CTA = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    await submitContactForm(formData);
    
    setStatus('success');
  };

  return (
    <section className='py-24 bg-zinc-950 relative overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] -z-10' />

      <div className='container mx-auto px-4 text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='max-w-4xl mx-auto bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-12 rounded-[3rem]'
        >
          <h2 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            Ready to ship your <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'>Next Big Thing?</span>
          </h2>
          <p className='text-xl text-zinc-400 mb-10 max-w-2xl mx-auto'>
            Join the waitlist and get early access to the advanced architecture features.
          </p>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center justify-center gap-3 text-emerald-400 text-xl font-medium bg-emerald-400/10 py-4 px-6 rounded-full inline-flex'
            >
              <CheckCircle2 className='w-6 h-6' />
              <span>You're in! Check your inbox soon.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
              <input 
                type='email' 
                name='email'
                required
                placeholder='Enter your email'
                className='px-6 py-4 bg-zinc-800/50 border border-zinc-700 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 flex-1 disabled:opacity-50'
                disabled={status === 'loading'}
              />
              <button 
                type='submit'
                disabled={status === 'loading'}
                className='group px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors inline-flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap'
              >
                {status === 'loading' ? (
                  <Loader2 className='w-5 h-5 animate-spin' />
                ) : (
                  <>
                    Get Access
                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};