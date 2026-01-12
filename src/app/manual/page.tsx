'use client';

import { motion } from 'framer-motion';
import {
    BookOpen,
    Terminal,
    CreditCard,
    MessageSquare,
    Rocket,
    LifeBuoy,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function ManualPage() {
    return (
        <div className="min-h-screen text-white pt-32 pb-20 px-4 md:px-8">

            {/* HERO HEADING */}
            <div className="max-w-4xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
                        <span className="text-indigo-400 text-xs font-mono tracking-widest font-bold uppercase">Manual de Abordo</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
                        Bienvenido a <span className="text-indigo-500">Purrpurr</span>
                    </h1>

                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Este documento es tu brújula. Aquí explicamos cómo operamos, cómo usar tu dashboard y cómo sacarle el máximo provecho a tu infraestructura digital.
                    </p>
                </motion.div>
            </div>

            {/* SECTIONS GRID */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* 1. Dashboard */}
                <SectionCard
                    icon={<Terminal className="w-6 h-6 text-indigo-400" />}
                    title="Tu Centro de Mando"
                    delay={0.1}
                >
                    <p className="mb-4">
                        El <strong>Dashboard</strong> es tu puente de mando. Desde ahí puedes visualizar:
                    </p>
                    <ul className="space-y-2 mb-4">
                        <ListItem>Estado en tiempo real de tus servidores.</ListItem>
                        <ListItem>Avance de tus proyectos activos.</ListItem>
                        <ListItem>Gestión de dominios y DNS.</ListItem>
                    </ul>
                    <p className="text-xs text-zinc-500">
                        Si ves una luz roja en "Cluster Status", no entres en pánico. Nuestro equipo ya ha sido notificado automáticamente.
                    </p>
                </SectionCard>

                {/* 2. Communication */}
                <SectionCard
                    icon={<MessageSquare className="w-6 h-6 text-emerald-400" />}
                    title="Comunicación Asíncrona"
                    delay={0.2}
                >
                    <p className="mb-4">
                        Valoramos tu tiempo y nuestra concentración. Privilegiamos la comunicación escrita y asíncrona para dejar registro de cada decisión.
                    </p>
                    <ul className="space-y-2 mb-4">
                        <ListItem>Actualizaciones semanales vía Email.</ListItem>
                        <ListItem>Canal directo de Slack/WhatsApp para urgencias reales.</ListItem>
                        <ListItem>Reuniones de sincronización solo si son necesarias.</ListItem>
                    </ul>
                </SectionCard>

                {/* 3. Pricing & Billing */}
                <SectionCard
                    icon={<CreditCard className="w-6 h-6 text-pink-400" />}
                    title="Facturación Transparente"
                    delay={0.3}
                >
                    <p className="mb-4">
                        Sin sorpresas. Tu suscripción cubre mantenimiento, servidores y soporte continuo.
                    </p>
                    <ul className="space-y-2 mb-4">
                        <ListItem>Los ciclos de facturación son mensuales o anuales.</ListItem>
                        <ListItem>Puedes descargar tus facturas directamente desde el Dashboard.</ListItem>
                        <ListItem>El escalado de servidores se cobra automáticamente si excedes tu cuota.</ListItem>
                    </ul>
                </SectionCard>

                {/* 4. Support */}
                <SectionCard
                    icon={<LifeBuoy className="w-6 h-6 text-amber-400" />}
                    title="Soporte y Wiki"
                    delay={0.4}
                >
                    <p className="mb-4">
                        ¿No sabes qué significa "DNS Propagation" o "Cache Hit"?
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/wiki" className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-indigo-500/50 transition-colors group">
                            <span className="text-zinc-200 text-sm font-medium">Revisar la Wiki Técnica</span>
                            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400" />
                        </Link>
                        <Link href="/contact" className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-amber-500/50 transition-colors group">
                            <span className="text-zinc-200 text-sm font-medium">Contactar Soporte</span>
                            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400" />
                        </Link>
                    </div>
                </SectionCard>

            </div>

            {/* GET STARTED CTA */}
            <div className="max-w-2xl mx-auto mt-20 text-center">
                <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

                    <h3 className="text-2xl font-bold text-white mb-4">¿Listo para despegar?</h3>
                    <p className="text-zinc-400 mb-8">
                        Tu infraestructura ya está lista. No hay nada que configurar.
                        <br />Simplemente relájate y observa cómo crece tu imperio digital.
                    </p>

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-xl shadow-indigo-900/20"
                    >
                        <Rocket className="w-5 h-5" />
                        Ir a mi Dashboard
                    </Link>
                </div>
            </div>

        </div>
    );
}

// --- SUBCOMPONENTS ---

function SectionCard({ icon, title, children, delay }: { icon: React.ReactNode, title: string, children: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="bg-zinc-900/40 border border-zinc-800/60 p-6 rounded-2xl hover:bg-zinc-900/60 transition-colors"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-100">{title}</h3>
            </div>
            <div className="text-zinc-400 text-sm leading-relaxed">
                {children}
            </div>
        </motion.div>
    );
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
            <span className="text-zinc-300">{children}</span>
        </li>
    );
}
