
'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from 'next/link';
import { LogOut, User, Settings, LayoutDashboard, Briefcase, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

export const UserMenu = ({ iconOnly = false }: { iconOnly?: boolean }) => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    if (status === "loading") {
        return <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />;
    }

    if (session && session.user) {
        return (
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "relative flex items-center gap-2 rounded-full border border-zinc-700 hover:border-zinc-500 transition-all p-1 pr-3",
                        isOpen && "border-zinc-500 ring-2 ring-zinc-500/20"
                    )}
                >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-800">
                        {session.user.image ? (
                            <Image
                                src={session.user.image}
                                alt={session.user.name || "User"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="w-4 h-4 text-zinc-400" />
                            </div>
                        )}
                    </div>
                    {/* Only show name on desktop if not iconOnly mode */}
                    {!iconOnly && (
                        <span className="text-xs font-semibold max-w-[100px] truncate hidden sm:block text-zinc-300">
                            {session.user.name?.split(' ')[0]}
                        </span>
                    )}
                    <ChevronDown className={cn("w-3 h-3 text-zinc-500 transition-transform", isOpen && "rotate-180")} />
                </button>

                {/* DROPDOWN MENU */}
                {isOpen && (
                    <div className="absolute top-full right-0 mt-3 w-64 bg-[#0A0A0B] border border-zinc-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-100">

                        {/* Header */}
                        <div className="px-4 py-4 border-b border-zinc-900 bg-zinc-900/50">
                            <p className="text-sm font-bold text-white truncate">{session.user.name}</p>
                            <p className="text-xs text-zinc-500 truncate font-mono">{session.user.email}</p>
                        </div>

                        {/* Navigation Links */}
                        <div className="p-2 space-y-1">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                                <span>Dashboard</span>
                            </Link>

                            <Link
                                href="/profile"
                                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <User className="w-4 h-4 text-blue-400" />
                                <span>Mi Perfil</span>
                            </Link>

                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <Briefcase className="w-4 h-4 text-orange-400" />
                                <span>Mis Proyectos</span>
                            </Link>

                            <Link
                                href="/settings"
                                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <Settings className="w-4 h-4 text-green-400" />
                                <span>Configuración</span>
                            </Link>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-zinc-900 mx-2" />

                        {/* Footer / Logout */}
                        <div className="p-2">
                            <button
                                onClick={() => signOut()}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (iconOnly) {
        return (
            <button
                onClick={() => signIn("google")}
                className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all font-mono text-xs"
                aria-label="Iniciar Sesión"
            >
                [ LOGIN ]
            </button>
        );
    }

    return (
        <button
            onClick={() => signIn("google")}
            className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/50 text-sm font-bold font-mono text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-900 transition-all"
        >
            [ INICIAR_SESIÓN ]
        </button>
    );
};
