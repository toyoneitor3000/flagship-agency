"use client";

import Navbar from "@/components/Navbar";
import { Mail, MapPin, Phone, Instagram, Send, Info } from "lucide-react";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";

export default function NosotrosPage() {
    return (
        <main data-theme="dark" className="min-h-screen bg-brand-black text-white flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background elements */}
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex-1 container mx-auto px-6 max-w-5xl flex flex-col justify-center pt-32 pb-16 relative z-10">
                {/* Hero section */}
                <div className="text-center mb-16 space-y-4">
                    <span className="bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 px-4 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase">
                        El Taller
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
                        SOMOS <br />
                        <span className="text-brand-yellow">PIGMENTO.</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        No somos solo una imprenta. Somos un laboratorio creativo especializado en stickers, branding y accesorios de alta resistencia para creadores, marcas y motoristas.
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* About section */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:border-brand-yellow/30 transition-all flex flex-col justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <Info className="w-10 h-10 text-brand-yellow mb-6" />
                        <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Nuestra Historia</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Nacimos de la necesidad de encontrar materiales que realmente aguantaran el clima, el barro y el sol. Hoy equipamos desde emprendedores que necesitan sus primeros logos hasta talleres exigentes.
                        </p>
                        <p className="text-gray-300 leading-relaxed font-bold italic">
                            Calidad suprema garantizada, siempre hechos con el mejor pigmento.
                        </p>
                    </div>

                    {/* Contact section */}
                    <div className="bg-brand-yellow text-brand-black p-8 md:p-10 rounded-3xl flex flex-col justify-center relative overflow-hidden group shadow-[0_0_40px_rgba(255,183,0,0.2)]">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                            <Send size={150} />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-widest mb-8 relative z-10 italic">Hablemos</h2>

                        <div className="space-y-6 relative z-10 font-bold uppercase tracking-widest text-sm">
                            <a href={PIGMENTO_DATA.contact.whatsappUrl} target="_blank" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                                <div className="bg-brand-black text-brand-yellow p-3 rounded-xl shadow-lg"><Phone size={20} /></div>
                                <div>
                                    <span className="block text-[10px] opacity-70 mb-1">WhatsApp Comercial</span>
                                    {PIGMENTO_DATA.contact.whatsapp}
                                </div>
                            </a>

                            <a href={`mailto:${PIGMENTO_DATA.contact.email}`} className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                                <div className="bg-brand-black text-brand-yellow p-3 rounded-xl shadow-lg"><Mail size={20} /></div>
                                <div>
                                    <span className="block text-[10px] opacity-70 mb-1">Correo Electrónico</span>
                                    <span className="lowercase normal-case font-medium">{PIGMENTO_DATA.contact.email}</span>
                                </div>
                            </a>

                            <a href="https://instagram.com/pigmento.stkrs" target="_blank" className="flex items-center gap-4 hover:translate-x-2 transition-transform">
                                <div className="bg-brand-black text-brand-yellow p-3 rounded-xl shadow-lg"><Instagram size={20} /></div>
                                <div>
                                    <span className="block text-[10px] opacity-70 mb-1">Redes Sociales</span>
                                    @pigmento.stkrs
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Location Map Placeholder / Info */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col md:flex-row items-center gap-8 text-center md:text-left shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="w-20 h-20 bg-brand-black text-brand-yellow rounded-full flex items-center justify-center shrink-0 border-2 border-brand-yellow/20 relative group overflow-hidden">
                        <MapPin size={30} className="relative z-10 group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest mb-2">Envíos y Logística</h3>
                        <p className="text-gray-400 font-medium max-w-2xl leading-relaxed">
                            Diseñamos e imprimimos los mejores stickers. Realizamos envíos diarios a toda la república: <strong className="text-white"> {PIGMENTO_DATA.shipping.nacional.time} de tránsito</strong> a nivel nacional y <strong className="text-brand-yellow">{PIGMENTO_DATA.shipping.cundinamarca.time} hábil</strong> en Cundinamarca/Sabana de Bogotá.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
