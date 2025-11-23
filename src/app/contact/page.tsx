'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', budget: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSent(true);
  };

  return (
    <div className='min-h-screen pt-32 pb-20 bg-zinc-950 relative overflow-hidden'>
      {/* Background Decor */}
      <div className='absolute top-20 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center mb-16'
          >
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
              Let's Build Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500'>Empire</span>
            </h1>
            <p className='text-zinc-400 text-lg max-w-2xl mx-auto'>
              Ready to scale? Fill out the form below and our engineering team will review your project within 24 hours.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-12'>
            {/* Contact Info Side */}
            <div className='space-y-8'>
              <div className='bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800'>
                <Mail className='w-8 h-8 text-indigo-400 mb-4' />
                <h3 className='text-white font-bold mb-1'>Email Us</h3>
                <p className='text-zinc-400 text-sm'>hello@purrpurr.com</p>
              </div>
              
              <div className='bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800'>
                <MessageSquare className='w-8 h-8 text-purple-400 mb-4' />
                <h3 className='text-white font-bold mb-1'>Live Chat</h3>
                <p className='text-zinc-400 text-sm'>Available 9am - 6pm EST</p>
              </div>
            </div>

            {/* Form Side */}
            <div className='md:col-span-2'>
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className='space-y-6 bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800 backdrop-blur-sm'
              >
                {isSent ? (
                  <div className='text-center py-20'>
                    <div className='w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                      <Send className='w-10 h-10 text-green-500' />
                    </div>
                    <h3 className='text-2xl font-bold text-white mb-2'>Message Sent!</h3>
                    <p className='text-zinc-400'>We'll be in touch shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='text-sm text-zinc-400 font-medium ml-1'>Name</label>
                        <input 
                          required 
                          type="text" 
                          className='w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors'
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={e => setFormState({...formState, name: e.target.value})}
                        />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm text-zinc-400 font-medium ml-1'>Email</label>
                        <input 
                          required 
                          type="email" 
                          className='w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors'
                          placeholder="john@company.com"
                          value={formState.email}
                          onChange={e => setFormState({...formState, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm text-zinc-400 font-medium ml-1'>Project Budget</label>
                      <select 
                        className='w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none'
                        value={formState.budget}
                        onChange={e => setFormState({...formState, budget: e.target.value})}
                      >
                        <option value="" disabled>Select a range</option>
                        <option value="10k-30k">$10k - $30k</option>
                        <option value="30k-50k">$30k - $50k</option>
                        <option value="50k-100k">$50k - $100k</option>
                        <option value="100k+">$100k+</option>
                      </select>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm text-zinc-400 font-medium ml-1'>Project Details</label>
                      <textarea 
                        required
                        rows={4}
                        className='w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none'
                        placeholder="Tell us about your vision..."
                        value={formState.message}
                        onChange={e => setFormState({...formState, message: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className='w-full bg-white text-zinc-950 font-bold py-4 rounded-xl hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                      {isSubmitting ? 'Sending...' : <><Send className='w-4 h-4' /> Send Request</>}
                    </button>
                  </>
                )}
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}