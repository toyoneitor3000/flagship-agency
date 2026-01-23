"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail, Phone, MapPin, Globe, Linkedin, Github,
    Printer, ArrowLeft, Camera, Palette,
    Code2, Rocket, Briefcase, GraduationCap,
    ExternalLink, ChevronRight, Users, Lock, Zap
} from 'lucide-react';
import Link from 'next/link';

const CONTACT_INFO = {
    name: "Camilo Toloza",
    title: "Diseñador Digital & Creative Lead",
    email: "camilotolosa1136@gmail.com",
    phone: "+57 310 295 77 54",
    location: "Bogotá, Colombia",
    website: "purrpurr.dev",
    linkedin: "#",
    github: "#",
    summary: "Arquitecto digital y líder creativo con más de 12 años de experiencia transformando visiones complejas en ecosistemas digitales escalables. Especialista en orquestar infraestructuras técnicas de alto rendimiento y estrategias de marca que fusionan la ingeniería de vanguardia con una estética de nivel superior. Mi enfoque se centra en la ejecución técnica impecable y la creación de productos digitales auténticos que generan valor real y credibilidad en el mercado."
};

const TARGET_DATA: Record<string, { motivation: string, name: string }> = {
    opyt: {
        name: "OPYT Producciones",
        motivation: "Mi interés en OPYT Producciones radica en su impecable estándar de ejecución y su capacidad para narrar historias con una estética cinematográfica superior. Como alguien que ha orquestado ecosistemas digitales desde la base técnica, busco integrar mi capacidad de diseño de alto nivel con sus procesos de producción para elevar la identidad visual de sus proyectos a un estándar global, aportando no solo ejecución gráfica, sino eficiencia técnica y arquitecturas visuales innovadoras."
    }
};

const EXPERIENCE = [
    {
        company: "Purrpurr Development",
        role: "Fundador & Creative Lead",
        period: "2025 - Presente",
        website: "www.purrpurr.dev",
        description: "Agencia de desarrollo y diseño especializado, enfocada en la creación de infraestructuras técnicas personalizadas y arquitecturas digitales que superan los estándares convencionales del mercado.",
        achievements: [
            "Diseño y despliegue de ecosistemas digitales complejos: Ejecución de plataformas robustas que priorizan la integridad técnica y la experiencia de usuario de alto nivel.",
            "Integración avanzada de sistemas: Implementación de bases de datos escalables y estándares de código propietario para soluciones corporativas y creativas.",
            "Liderazgo en visión de agencia: Fusión de dirección creativa estratégica con ingeniería de software de alto rendimiento para proyectos de escala global."
        ]
    },
    {
        company: "Victory Cars",
        role: "Diseño & Estrategia Digital",
        period: "2024 - Presente",
        website: "www.victorycarsdetailing.com",
        description: "Dirección de arte y estrategia de marca para una de las marcas de estética automotriz más exclusivas.",
        achievements: [
            "Creación del sistema visual 'Victory Midnight': Estética Tech/Luxury basada en tipografías futuristas (Orbitron) y paletas Deep Night.",
            "Diseño y desarrollo del ecosistema web oficial con enfoque en conversión y visualización de activos de alta gama.",
            "Digitalización del catálogo de servicios 2025: Integración de productos premium como Ceramic Coating y PPF Autorregenerativo."
        ]
    },
    {
        company: "Wrap Masters",
        role: "Cofundador & Director de Marca",
        period: "2024 - 2025",
        description: "Conceptualización y posicionamiento de marca líder en personalización automotriz de alto nivel.",
        achievements: [
            "Creación del nombre y desarrollo integral de la estrategia de marca.",
            "Diseño y personalización de vehículos de alta gama.",
            "Dirección de contenido y estrategia digital para el posicionamiento."
        ]
    },
    {
        company: "Aquashield Autodetailing",
        role: "Content Creator & Estrategia",
        period: "2021 - 2023",
        description: "Creación de contenido especializado y branding para protección y estética automotriz.",
        achievements: [
            "Estrategia de visual storytelling para productos de alta gama.",
            "Producción audiovisual para campañas de marketing digital."
        ]
    },
    {
        company: "Speedlight Ecosystem (Academy, Culture, Auto Studio)",
        role: "Fundador",
        period: "2018 - Presente",
        website: "speedlightculture.com | speedlightacademy.com",
        description: "Ecosistema integral que abarca desde la educación técnica hasta el estudio de diseño y fotografía de élite, manteniéndose vigente en la industria.",
        achievements: [
            "Diseño de arquitectura 'Social Network First': Transformación de plataforma web en un feed dinámico de actividad automotriz.",
            "Estrategia 'Operation Cold Start': Implementación de sistemas de referidos (Viral Loops) y gamificación para escalabilidad de usuarios.",
            "Estructuración de planes de suscripción (5 Probabilidades) optimizando la monetización y el lifetime value del ecosistema."
        ]
    },
    {
        company: "Financars",
        role: "Cofundador",
        period: "2017 - Presente",
        website: "financars.vercel.app",
        description: "Fintech disruptiva en el sector automotriz que introduce el 'Modelo de Custodia' para liquidez inmediata y sistemas de Subasta Invertida (Dutch Auction).",
        achievements: [
            "Arquitectura del modelo de 'Custodia': Transformación de vehículos en activos líquidos inmediatos mediante contratos de Mutuo con Prenda.",
            "Desarrollo de motor de Subastas Invertidas: Implementación de algoritmos de caída de precio en tiempo real para optimización de inventario.",
            "UX de peritaje digital y valoración automatizada integrada con bases de datos comerciales de alto volumen."
        ]
    },
    {
        company: "Carbono Cultura Motor",
        role: "Fundador & Director Creativo",
        period: "2015 - 2019",
        description: "Consolidación de la marca como referente estético en la cultura motor, integrando fotografía de élite y diseño de identidad.",
        achievements: [
            "Liderazgo creativo y fundación de la marca.",
            "Fotografía editorial y publicitaria para proyectos de alto nivel.",
            "Diseño de identidades visuales para la industria automotriz."
        ]
    },
    {
        company: "Pigmento Stickers",
        role: "Fundador",
        period: "2013 - Presente",
        website: "pigmentostkrs.com",
        description: "Marca líder y pionera en la producción de stickers personalizados de alta gama para la cultura motor, especializándose en materiales premium y asesoría de identidad para marcas del sector.",
        achievements: [
            "Liderazgo en la producción de stickers personalizados a escala, implementando flujos de trabajo 'Design-to-Print' y terminados especiales (Tornasol, Holográficos, Reflectivos).",
            "Creación del 'Sticker Lab': Un ecosistema digital avanzado que automatiza la personalización masiva, permitiendo a miles de usuarios y marcas crear piezas gráficas de alta fidelidad.",
            "Evolución tecnológica del negocio: Implementación de sistemas de automatización avanzada para la gestión logística, inventarios y atención al cliente a escala nacional empleando herramientas de IA."
        ]
    }
];

const SKILLS = {
    design: ["Diseño Gráfico Profesional", "Páginas Web (UI/UX)", "Animación de Marketing", "Branding Automotriz", "Piezas Gráficas"],
    technical: ["Next.js & React", "Tailwind CSS", "Supabase", "Figma", "Adobe Suite (PS, AI, AE, PR)"],
    creative: ["Fotografía Automotriz", "Contenido Audiovisual", "Comerciales & Video", "Diseño de Stickers"]
};

const PROJECTS_HIGHLIGHTS = [
    { name: "Purrpurr Dev", type: "Arquitectura & Ecosistemas", link: "https://www.purrpurr.dev" },
    { name: "Victory Cars", type: "Estrategia Digital de Lujo", link: "https://www.victorycarsdetailing.com" },
    { name: "Pigmento", type: "E-commerce & Manufactura", link: "https://pigmentostkrs.com" },
    { name: "Speedlight Culture", type: "Plataforma Social Web3-Ready", link: "https://www.speedlightculture.com" },
    { name: "Speedlight Academy", type: "Plataforma EdTech", link: "https://www.speedlightacademy.com" }
];

const PROPOSAL_MODELS = [
    {
        name: "Standard Hire (Postulación Directa)",
        description: "Integración completa en el equipo como Diseñador Junior. Compromiso total con la cultura de OPYT, ejecución presencial/remota y crecimiento dentro de la estructura orgánica.",
        tag: "COLABORACIÓN TRADICIONAL"
    },
    {
        name: "Augmented Creative Partner (Suscripción)",
        description: "Ejecución ilimitada mediante el modelo SAOS de Purrpurr. Entrega de activos en < 48h, sin carga prestacional y con acceso a toda mi infraestructura de automatización.",
        tag: "ALTO RENDIMIENTO / ESCALABLE"
    }
];

interface CVClientProps {
    mode?: 'admin' | 'public' | 'targeted';
    slug?: string;
}

export function CVClient({ mode = 'admin', slug }: CVClientProps) {
    const isPublic = mode === 'public';
    const isTargeted = mode === 'targeted';
    const currentTarget = slug ? TARGET_DATA[slug.toLowerCase()] : null;

    // Masking logic: Mask if public OR targeted (to prevent scrapers/leakage on shared links)
    const shouldMask = isPublic || isTargeted;

    const displayEmail = shouldMask
        ? CONTACT_INFO.email.replace(/(.).*(@.*)/, "$1***$2")
        : CONTACT_INFO.email;

    const displayPhone = shouldMask
        ? CONTACT_INFO.phone.replace(/(\+\d{2} \d{3}) \d{3} \d{2} \d{2}/, "$1 *** ** **")
        : CONTACT_INFO.phone;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 lg:pb-24">
            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Navigation / Actions Bar */}
            <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 print:hidden">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href={shouldMask ? "/" : "/dashboard"} className="flex items-center gap-2 group text-sm font-medium hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {shouldMask ? "Volver al Inicio" : "Volver al Dashboard"}
                    </Link>
                    <div className="flex items-center gap-4">
                        {mode === 'admin' && (
                            <div className="hidden md:flex items-center gap-2 border-r border-white/5 pr-4 mr-2">
                                <Link href="/cv" target="_blank" className="text-[10px] font-mono text-zinc-500 hover:text-indigo-400 transition-colors uppercase tracking-widest flex items-center gap-1">
                                    <Globe className="w-3 h-3" /> Link Público
                                </Link>
                                <span className="text-zinc-800">|</span>
                                <Link href="/proposals/opyt" target="_blank" className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 transition-colors uppercase tracking-widest flex items-center gap-1">
                                    <Rocket className="w-3 h-3" /> Link OPYT
                                </Link>
                            </div>
                        )}
                        <div className={`flex items-center gap-2 px-3 py-1 ${isPublic ? 'bg-indigo-500/10 border-indigo-500/20' : isTargeted ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-purple-500/10 border-purple-500/20'} rounded-full`}>
                            {isPublic ? <Globe className="w-3 h-3 text-indigo-400" /> : isTargeted ? <Rocket className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-purple-400" />}
                            <span className={`text-[10px] font-mono ${isPublic ? 'text-indigo-300' : isTargeted ? 'text-emerald-300' : 'text-purple-300'} uppercase tracking-widest`}>
                                {isPublic ? 'Portafolio Profesional Público' : isTargeted ? `Propuesta para ${currentTarget?.name || 'Partner'}` : 'Vista Privada Administrador'}
                            </span>
                        </div>
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-xs font-bold transition-all active:scale-95"
                        >
                            <Printer className="w-3 h-3" /> Exportar PDF
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-12 md:py-20 lg:max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Sidebar / Left Column */}
                    <aside className="lg:col-span-4 space-y-12 order-2 lg:order-1">

                        {/* Contact Section */}
                        <section className="space-y-6">
                            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 border-b border-white/5 pb-2">Canales Directos</h3>
                            <div className="space-y-4">
                                <ContactLink
                                    icon={Mail}
                                    label={displayEmail}
                                    href={shouldMask ? undefined : `mailto:${CONTACT_INFO.email}`}
                                    tooltip={shouldMask ? "Protegido por privacidad" : undefined}
                                />
                                <ContactLink
                                    icon={Phone}
                                    label={displayPhone}
                                    href={shouldMask ? undefined : `tel:${CONTACT_INFO.phone}`}
                                    tooltip={shouldMask ? "Protegido por privacidad" : undefined}
                                />
                                <ContactLink icon={MapPin} label={CONTACT_INFO.location} />
                                <ContactLink icon={Globe} label={CONTACT_INFO.website} href={`https://${CONTACT_INFO.website}`} />
                                <ContactLink icon={Linkedin} label="Red Profesional" href={CONTACT_INFO.linkedin === "#" ? undefined : `https://${CONTACT_INFO.linkedin}`} />
                                <ContactLink icon={Github} label="Repositorios" href={CONTACT_INFO.github === "#" ? undefined : `https://${CONTACT_INFO.github}`} />
                            </div>
                        </section>

                        {/* Skills Section */}
                        <section className="space-y-8">
                            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 border-b border-white/5 pb-2">Arsenal</h3>

                            <SkillGroup title="Diseño & Branding" skills={SKILLS.design} icon={Palette} />
                            <SkillGroup title="Código & Tech" skills={SKILLS.technical} icon={Code2} />
                            <SkillGroup title="Creative & Photo" skills={SKILLS.creative} icon={Camera} />
                        </section>

                        {/* Projects Highlights */}
                        <section className="space-y-6">
                            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 border-b border-white/5 pb-2">Proyectos Destacados</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {PROJECTS_HIGHLIGHTS.map((project, i) => (
                                    <a
                                        key={i}
                                        href={project.link}
                                        target="_blank"
                                        className="group bg-white/[0.02] border border-white/5 p-3 rounded-xl hover:bg-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="text-sm font-bold text-zinc-200">{project.name}</p>
                                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{project.type}</p>
                                        </div>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                                    </a>
                                ))}
                            </div>
                        </section>
                    </aside>

                    {/* Core Content / Right Column */}
                    <div className="lg:col-span-8 space-y-16 order-1 lg:order-2">

                        {/* Hero Header */}
                        <header className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block"
                            >
                                <span className={`px-3 py-1 ${isPublic ? 'bg-indigo-500/10 text-indigo-300' : isTargeted ? 'bg-emerald-500/10 text-emerald-300' : 'bg-zinc-500/10 text-zinc-400'} text-[10px] font-mono tracking-widest rounded-full border border-white/5 mb-4 block w-fit`}>
                                    {isPublic ? 'PORTAFOLIO PROFESIONAL' : isTargeted ? 'DISEÑO & ESTRATEGIA CREATIVA' : 'CURRÍCULUM PRIVADO DE GESTIÓN'}
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none mb-4 uppercase">
                                    {CONTACT_INFO.name}
                                </h1>
                                <p className="text-lg md:text-xl font-mono text-zinc-400 mb-8 max-w-2xl leading-relaxed">
                                    {CONTACT_INFO.summary}
                                </p>

                                {(mode === 'admin' || (isTargeted && currentTarget)) && (
                                    <div className={`p-6 bg-white/[0.02] border ${isTargeted ? 'border-emerald-500/30' : 'border-white/5'} rounded-3xl group transition-all max-w-3xl`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className={`w-2 h-2 rounded-full ${isTargeted ? 'bg-emerald-500' : 'bg-indigo-500'} animate-pulse`} />
                                            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                                                {isTargeted ? `PROPÓSITO PARA ${currentTarget?.name.toUpperCase()}` : 'PROPÓSITO PROFESIONAL'}
                                            </span>
                                        </div>
                                        <p className={`text-sm text-zinc-400 leading-relaxed italic border-l ${isTargeted ? 'border-emerald-500/20' : 'border-indigo-500/20'} pl-4`}>
                                            &quot;{isTargeted ? currentTarget?.motivation : 'Evolución constante y ejecución impecable en cada proyecto.'}&quot;
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </header>

                        {/* Experience Section */}
                        <section className="space-y-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3 italic underline decoration-indigo-500/50 underline-offset-8">
                                    <Briefcase className="w-5 h-5 text-indigo-500" /> Trayectoria
                                </h2>
                                <div className="h-px bg-white/5 flex-1 ml-6 hidden md:block" />
                            </div>

                            <div className="space-y-12">
                                {EXPERIENCE.map((exp, i) => (
                                    <div key={i} className="relative pl-8 border-l border-white/5 group hover:border-indigo-500/30 transition-colors">
                                        <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 bg-[#050505] border border-zinc-600 rounded-full group-hover:border-indigo-500 group-hover:bg-indigo-500 transition-all shadow-[0_0_10px_rgba(99,102,241,0)] group-hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                                        <div className="space-y-4">
                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                                                <div className="flex-1">
                                                    <h4 className="text-xs font-mono text-indigo-500 tracking-tighter mb-1 uppercase">{exp.period}</h4>
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div>
                                                            <h3 className="text-xl font-black text-white leading-tight">{exp.role}</h3>
                                                            <p className="text-zinc-500 font-medium text-sm">{exp.company}</p>
                                                        </div>
                                                        {exp.website && (
                                                            <div className="flex flex-wrap gap-2">
                                                                {exp.website.split('|').map((url, k) => {
                                                                    const cleanUrl = url.trim();
                                                                    return (
                                                                        <a
                                                                            key={k}
                                                                            href={`https://${cleanUrl}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-[10px] text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group/link print:hidden"
                                                                        >
                                                                            <Globe className="w-3 h-3 text-zinc-600 group-hover/link:text-indigo-500 transition-colors" />
                                                                            {cleanUrl}
                                                                            <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-all -ml-1" />
                                                                        </a>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                                                {exp.description}
                                            </p>

                                            <ul className="space-y-2">
                                                {exp.achievements.map((item, j) => (
                                                    <li key={j} className="text-xs text-zinc-500 flex items-start gap-4 hover:text-zinc-300 transition-colors">
                                                        <ChevronRight className="w-3 h-3 mt-0.5 text-indigo-500 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education Section */}
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-3 italic">
                                <GraduationCap className="w-5 h-5 text-indigo-500" /> Formación Profesional
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-indigo-500/20 transition-all">
                                    <h4 className="font-bold text-white uppercase tracking-tight text-sm mb-1">Diseño Gráfico</h4>
                                    <p className="text-[10px] text-zinc-500 mb-2 font-medium">Universidad Jorge Tadeo Lozano</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="text-[9px] text-indigo-500 font-mono tracking-widest uppercase">Pregrado</p>
                                        <span className="text-[9px] text-zinc-600 font-mono">2012 — 2017</span>
                                    </div>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-indigo-500/20 transition-all">
                                    <h4 className="font-bold text-white uppercase tracking-tight text-sm mb-1">Fotografía</h4>
                                    <p className="text-[10px] text-zinc-500 mb-2 font-medium">Universidad Jorge Tadeo Lozano</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="text-[9px] text-indigo-500 font-mono tracking-widest uppercase">Pregrado</p>
                                        <span className="text-[9px] text-zinc-600 font-mono">2012 — 2017</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Proposal Models Section - Admin & Targeted Only */}
                        {(mode === 'admin' || isTargeted) && (
                            <section className="space-y-10 pt-10 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-3 italic">
                                        <Zap className="w-5 h-5 text-indigo-500" /> Modelos de Colaboración
                                    </h2>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden md:block">
                                        {isTargeted ? `Personalizado para ${currentTarget?.name}` : 'Gestión de Colaboración'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {PROPOSAL_MODELS.map((model, i) => (
                                        <div key={i} className={`p-6 rounded-3xl border transition-all duration-500 group ${i === 1
                                            ? 'bg-indigo-500/5 border-indigo-500/30 hover:bg-indigo-500/10 hover:border-indigo-500/50'
                                            : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                            }`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${i === 1 ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-white/5 border-white/10 text-zinc-500'
                                                    }`}>
                                                    {model.tag}
                                                </span>
                                                {i === 1 && <Rocket className="w-4 h-4 text-indigo-500 animate-pulse" />}
                                            </div>
                                            <h3 className="text-sm font-black text-white uppercase mb-2 group-hover:text-indigo-300 transition-colors tracking-tight">{model.name}</h3>
                                            <p className="text-xs text-zinc-500 leading-relaxed">
                                                {model.description.split(' ').map((word, index) => {
                                                    const cleanWord = word.replace(/[.,]/g, '');
                                                    if (cleanWord === 'SAOS' || cleanWord === 'AOS') {
                                                        return (
                                                            <span key={index} className="text-indigo-400 font-bold border-b border-indigo-500/30 cursor-help mx-0.5" title={`${cleanWord}: Ver en Wiki Purrpurr`}>
                                                                {word}{' '}
                                                            </span>
                                                        );
                                                    }
                                                    return word + ' ';
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* References Section - Standard for Colombia */}
                        <section className="space-y-8 pt-10 border-t border-white/5">
                            <h2 className="text-xl font-bold text-white flex items-center gap-3 italic">
                                <Users className="w-5 h-5 text-indigo-500" /> Referencias
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                                    <h4 className="font-bold text-white mb-1">Referencias Profesionales</h4>
                                    <p className="text-xs text-zinc-500">Disponibles de inmediato a solicitud del departamento de selección.</p>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                                    <h4 className="font-bold text-white mb-1">Referencias Personales</h4>
                                    <p className="text-xs text-zinc-500">Documentación y contactos listos para validación de trayectoria.</p>
                                </div>
                            </div>
                        </section>

                        {/* Print Footer / Call to action */}
                        <footer className="pt-20 text-center space-y-4">
                            <div className="flex items-center justify-center gap-4 py-8 border-y border-white/5 grayscale hover:grayscale-0 transition-all duration-700 opacity-30 hover:opacity-100">
                                <Rocket className="w-6 h-6 text-indigo-500" />
                                <span className="text-sm font-mono tracking-[0.5em] text-white">IMPULSANDO LÍMITES</span>
                            </div>
                            <p className="text-[10px] font-mono text-zinc-700 print:block hidden">
                                Generado por Purrpurr Digital Architecture • bogotá • {new Date().getFullYear()}
                            </p>
                        </footer>

                    </div>
                </div>
            </main>
        </div>
    );
}

// Components
function ContactLink({ icon: Icon, label, href, tooltip }: { icon: any, label: string, href?: string, tooltip?: string }) {
    const content = (
        <div className="flex items-center gap-3 group" title={tooltip}>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400" />
            </div>
            <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-200 transition-colors truncate">{label}</span>
        </div>
    );

    if (href) {
        return (
            <a href={href} target={href.startsWith('http') ? "_blank" : undefined} rel="noopener noreferrer" className="print:text-zinc-700 print:grayscale">
                {content}
            </a>
        );
    }
    return content;
}

function SkillGroup({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-indigo-500" />
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                    <span key={i} className="text-[10px] bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full text-zinc-500 hover:text-white hover:border-indigo-500/30 transition-all cursor-default print:border-zinc-200 print:text-zinc-700">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}
