'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavItem {
    label: string;
    href: string;
    icon: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Conócenos', href: '/hibrido#conocenos', icon: '/clients/hibrido-lab/icons/icono_conocenos.svg' },
    { label: 'Productos', href: '/hibrido/marketplace', icon: '/clients/hibrido-lab/icons/icono_productos.svg' },
    { label: 'Experiencias', href: '/hibrido#experiencias', icon: '/clients/hibrido-lab/icons/icono_experiencias.svg' },
    { label: 'Recicla con nosotros', href: '/hibrido/plastico-final-feliz', icon: '/clients/hibrido-lab/icons/icono_recicla.svg' },
    { label: 'Clientes felices', href: '/hibrido#clientes', icon: '/clients/hibrido-lab/icons/icono_clientes.svg' },
];

export const HibridoHeader = () => {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
            {/* Liquid Glow Accent Ribbon */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div 
                    className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-purple-600 via-pink-500 via-amber-500 to-cyan-400 opacity-90 animate-pulse"
                />
                <div 
                    className="absolute -top-12 left-1/4 w-96 h-24 bg-gradient-to-r from-[#52388d] to-pink-600/30 blur-3xl opacity-40 pointer-events-none"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
                {/* Brand Logo */}
                <Link href="/hibrido" className="relative flex items-center group shrink-0">
                    <div className="relative w-44 sm:w-56 h-12">
                        <Image
                            src="/clients/hibrido-lab/Logo completo_blanco.png"
                            alt="Híbrido | Laboratorio Creativo"
                            fill
                            className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                    </div>
                </Link>

                {/* Navigation Pills */}
                <nav className="hidden md:flex items-center gap-2 lg:gap-3 overflow-x-auto py-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`group flex flex-col items-center justify-center transition-all ${
                                    isActive ? 'scale-105' : 'hover:scale-102'
                                }`}
                            >
                                <span className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                                    isActive
                                        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                                        : 'bg-white/5 text-zinc-200 border-white/20 hover:border-white/50 hover:bg-white/10'
                                }`}>
                                    {item.label}
                                </span>
                                <div className="mt-1 w-6 h-6 relative opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        width={24}
                                        height={24}
                                        className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                    />
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sub-Brand Quick Links (Pelos, Plástico, Dinamita) */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/hibrido/pelos-amor"
                        className="hidden lg:inline-flex items-center px-3 py-1 text-[11px] font-mono uppercase rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-colors"
                    >
                        - pelos + amor
                    </Link>
                    <Link
                        href="/hibrido/dinamita"
                        className="hidden lg:inline-flex items-center px-3 py-1 text-[11px] font-mono uppercase rounded-lg border border-pink-500/30 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 transition-colors"
                    >
                        Dinamita
                    </Link>
                    <Link
                        href="/cockpit/roadmap"
                        className="px-3 py-1.5 text-xs font-mono font-bold rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                    >
                        [ ROADMAP ]
                    </Link>
                </div>
            </div>
        </header>
    );
};
