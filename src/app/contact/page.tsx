'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { submitContactForm } from '../actions';
import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', budget: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('budget', formState.budget);
      formData.append('message', formState.message);

      const result = await submitContactForm(formData);

      if (result.success) {
        setIsSent(true);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen pt-28 pb-20 bg-[#f0ffcc] font-mono relative overflow-hidden selection:bg-[#8f69ff]/30 selection:text-[#0f0033]'>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#7096000a_1px,transparent_1px),linear-gradient(to_bottom,#7096000a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className='container mx-auto px-4 max-w-6xl relative z-10'>

        {/* Header Section */}
        <div className='mb-12 text-center'>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8f69ff]/10 border border-[#8f69ff]/20 text-[#8f69ff] text-xs mb-4 font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#8f69ff] animate-pulse"></span>
            src/app/contact/page.tsx
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-[#1a2e05] mb-4 tracking-tight'>
            Iniciar_<span className="text-[#8f69ff]">Proyecto()</span>
          </h1>
          <p className='text-[#3a5200] max-w-xl mx-auto'>
            <span className="text-[#709600]/80">// No necesitas saber de código.</span><br />
            <span className="text-[#3a5200]">Tú tienes la visión, nosotros ponemos la tecnología. <br />Completa los espacios abajo para comenzar.</span>
          </p>
        </div>

        <div className='grid lg:grid-cols-12 gap-8 items-start'>

          {/* Sidebar Info */}
          <div className='lg:col-span-4 space-y-4'>
            <div className='bg-[#e2f0b9] border border-[#709600]/20 shadow-sm rounded-lg overflow-hidden'>
              <div className="bg-[#d4e6a0] px-4 py-2 border-b border-[#709600]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#1a2e05] uppercase tracking-wider">CONTACTO_DIRECTO</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#709600]/40"></div>
                  <div className="w-2 h-2 rounded-full bg-[#709600]/40"></div>
                </div>
              </div>
              <div className="p-4 space-y-4 text-xs md:text-sm">
                <div className="space-y-1">
                  <p className="text-[#709600]/80 italic">// ¿Prefieres escribirnos directo?</p>
                  <a href="mailto:purrpurrdev@gmail.com" className="flex items-center gap-2 text-[#8f69ff] hover:underline font-bold">
                    <Mail className='w-4 h-4' />
                    const email = "purrpurrdev@gmail.com"
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-[#709600]/80 italic">// Estamos en línea ahora</p>
                  <div className="flex items-center gap-2 text-[#3a5200]">
                    <MessageSquare className='w-4 h-4 text-[#709600]' />
                    <span>status: <span className="text-[#1a2e05] font-bold">"Online"</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-[#0f0033] border border-[#8f69ff]/30 shadow-lg rounded-lg overflow-hidden text-[#f0ffcc] p-5 font-mono text-xs leading-relaxed'>
              <div className="flex items-center gap-2 mb-4 text-[#8f69ff]">
                <Sparkles className="w-3 h-3" />
                <span className="font-bold tracking-wider">SISTEMA_LOG</span>
              </div>
              <div className="space-y-3 text-[#f0ffcc]/80">
                <p>
                  <span className="text-[#8f69ff]">➜</span> <span className="text-[#f0ffcc]">~</span> inicializando asistente...
                </p>
                <p className="text-[#8f69ff]/80 italic">
                  // Buscamos proyectos ambiciosos que necesiten ingeniería real.
                </p>
                <p>
                  <span className="text-[#709600]">✔</span> Agenda Q1 2026: <span className="text-white font-bold">DISPONIBLE</span>
                </p>
                <p>
                  <span className="text-[#8f69ff]">➜</span> <span className="text-[#f0ffcc]">~</span> esperando tu idea...
                </p>
              </div>
            </div>
          </div>

          {/* Form Editor */}
          <div className='lg:col-span-8 relative'>

            {/* Tab Bar */}
            <div className="flex items-center border-b border-[#709600]/20 bg-[#e2f0b9] rounded-t-lg overflow-hidden border-t border-x border-[#709600]/20 px-2 pt-2 gap-1">
              <div className="px-4 py-2 bg-[#f0ffcc] text-sm text-[#1a2e05] border-t-2 border-[#8f69ff] rounded-t-sm flex items-center gap-2 font-bold">
                <span className="text-[#8f69ff]">TS</span> tu_proyecto.ts
                <span className="text-[#709600]/50 text-xs ml-2 hover:text-[#1a2e05] cursor-pointer">×</span>
              </div>
            </div>

            {/* Editor Body */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className='bg-[#f0ffcc] border border-[#709600]/20 border-t-0 rounded-b-lg p-6 md:p-8 shadow-xl shadow-[#709600]/5 relative'
            >
              {/* Line Numbers */}
              <div className="absolute left-2 md:left-4 top-8 bottom-8 w-6 flex flex-col items-end text-[#709600]/30 text-xs md:text-sm font-mono select-none" aria-hidden="true">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
              </div>

              <div className="pl-6 md:pl-8 space-y-8">
                <input type="text" name="_honey" className="opacity-0 absolute top-0 -z-10" tabIndex={-1} autoComplete="off" />

                {isSent ? (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-[#8f69ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#8f69ff]/20">
                      <Send className="w-8 h-8 text-[#8f69ff]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a2e05] mb-2">¡Mensaje Recibido!</h3>
                    <p className="text-[#3a5200] text-sm mb-6">Hemos guardado tu solicitud en nuestra base de datos.</p>
                    <p className="text-[#709600] text-xs font-mono bg-[#e2f0b9] inline-block px-3 py-1 rounded">
                      return "Te contactaremos en breve";
                    </p>
                    <div className="mt-8">
                      <button onClick={() => setIsSent(false)} className="text-sm text-[#8f69ff] font-bold hover:underline">
                        Enviar otro mensaje
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block font-mono text-sm">
                          <span className="text-[#709600]/80 italic text-xs block mb-1">// 1. ¿Cuál es tu nombre o el de tu empresa?</span>
                          <span className="text-[#8f69ff] font-bold">const</span> nombre =
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full bg-[#e8f5c3] border border-[#709600]/20 rounded px-3 py-2 text-sm text-[#1a2e05] font-mono focus:outline-none focus:border-[#8f69ff] focus:bg-[#f0ffcc] focus:ring-1 focus:ring-[#8f69ff]/30 transition-all placeholder:text-[#709600]/40"
                          placeholder='"Ej: Carlos Pérez"'
                          value={formState.name}
                          onChange={e => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-mono text-sm">
                          <span className="text-[#709600]/80 italic text-xs block mb-1">// 2. ¿A dónde te enviamos la propuesta?</span>
                          <span className="text-[#8f69ff] font-bold">const</span> email =
                        </label>
                        <input
                          required
                          type="email"
                          className="w-full bg-[#e8f5c3] border border-[#709600]/20 rounded px-3 py-2 text-sm text-[#1a2e05] font-mono focus:outline-none focus:border-[#8f69ff] focus:bg-[#f0ffcc] focus:ring-1 focus:ring-[#8f69ff]/30 transition-all placeholder:text-[#709600]/40"
                          placeholder='"Ej: contacto@tudominio.com"'
                          value={formState.email}
                          onChange={e => setFormState({ ...formState, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <label className="block font-mono text-sm">
                        <span className="text-[#709600]/80 italic text-xs block mb-1">// 3. ¿Cuánto planeas invertir en tu éxito digital?</span>
                        <span className="text-[#8f69ff] font-bold">let</span> presupuesto =
                      </label>
                      <select
                        className="w-full bg-[#e8f5c3] border border-[#709600]/20 rounded px-3 py-2 text-sm text-[#1a2e05] font-mono focus:outline-none focus:border-[#8f69ff] focus:bg-[#f0ffcc] transition-all cursor-pointer"
                        value={formState.budget}
                        onChange={e => setFormState({ ...formState, budget: e.target.value })}
                      >
                        <option value="" disabled>"Selecciona una opción"</option>
                        <option value="450k">$450.000 COP (~$110 USD) - Flash (1 Día)</option>
                        <option value="950k">$950.000 COP (~$230 USD) - Básico</option>
                        <option value="2m-8m">$2M - $8M COP (~$500 - $2k USD) - Profesional</option>
                        <option value="8m-20m">$8M - $20M COP (~$2k - $5k USD) - MVP / App</option>
                        <option value="20m-50m">$20M - $50M COP (~$5k - $12k USD) - Ingeniería Full</option>
                        <option value="50m+">$50M+ COP (~$12k+ USD) - Enterprise</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="block font-mono text-sm">
                        <span className="text-[#709600]/80 italic text-xs block mb-1">// 4. Cuéntanos tu gran idea. No necesitas tecnicismos.</span>
                        <span className="text-[#8f69ff] font-bold">function</span> <span className="text-[#1a2e05] font-bold">tu_visión</span>() {'{'}
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          rows={5}
                          className="w-full bg-[#e8f5c3] border border-[#709600]/20 rounded px-3 py-2 text-sm text-[#1a2e05] font-mono focus:outline-none focus:border-[#8f69ff] focus:bg-[#f0ffcc] transition-all resize-none placeholder:text-[#709600]/40 leading-relaxed"
                          placeholder='return "Quiero una plataforma tipo Uber para..."'
                          value={formState.message}
                          onChange={e => setFormState({ ...formState, message: e.target.value })}
                        />
                      </div>
                      <span className="text-xs text-[#3a5200] font-mono">{'}'}</span>
                    </div>

                    {errorMessage && (
                      <div className="p-3 bg-red-500/10 border-l-2 border-red-500 text-xs font-mono text-red-700 font-bold">
                        Error: {errorMessage}
                      </div>
                    )}

                    {/* Submit */}
                    <div className="pt-6 border-t border-[#709600]/10 flex items-center justify-between">
                      <div className="text-xs text-[#709600] font-mono hidden sm:block italic">
                            // Tu idea está segura con nosotros
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#0f0033] hover:bg-[#8f69ff] text-white px-8 py-3 rounded-md text-sm font-mono font-bold tracking-wide flex items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-wait shadow-lg shadow-[#8f69ff]/20 group"
                      >
                        {isSubmitting ? (
                          'Procesando...'
                        ) : (
                          <>
                            <Code2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            EJECUTAR PROYECTO
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}