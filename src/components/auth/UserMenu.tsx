'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from 'next/link';
import { LogOut, User, Settings, LayoutDashboard, ChevronDown, ArrowRightLeft, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export const UserMenu = ({ iconOnly = false }: { iconOnly?: boolean }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            setIsOpen(false);
            await signOut({ redirectTo: "/", callbackUrl: "/", redirect: true });
        } catch {
            window.location.href = "/";
        }
    };

    const handleSwitchAccount = async () => {
        setIsOpen(false);
        await signIn("google", {
            prompt: "select_account",
            callbackUrl: "/dashboard"
        });
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                    {!iconOnly && (
                        <span className="text-xs font-semibold max-w-[100px] truncate hidden sm:block text-zinc-300">
                            {session.user.name?.split(' ')[0] || session.user.email?.split('@')[0]}
                        </span>
                    )}
                    <ChevronDown className={cn("w-3 h-3 text-zinc-500 transition-transform", isOpen && "rotate-180")} />
                </button>

                {/* DROPDOWN MENU */}
                {isOpen && (
                    <div
                        className="absolute top-full right-0 mt-3 w-64 bg-[#050505]/90 border border-white/10 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-100"
                        style={{
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)'
                        }}
                    >
                        {/* Header */}
                        <div className="px-4 py-4 border-b border-white/5 bg-white/5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-white truncate">{session.user.name || 'Usuario'}</p>
                                {session.user.role === 'admin' && (
                                    <span className="text-[10px] bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 px-2 py-0.5 rounded-full font-bold uppercase">
                                        Admin
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-zinc-500 truncate font-mono mt-0.5">{session.user.email}</p>
                        </div>

                        {/* Navigation Links */}
                        <div className="p-2 space-y-1">
                            {session.user.role === 'admin' && (
                                <Link
                                    href="/cockpit/proposals"
                                    className="flex items-center gap-3 px-3 py-2 text-sm text-indigo-300 hover:text-white hover:bg-indigo-950/30 rounded-lg transition-colors font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Sparkles className="w-4 h-4 text-indigo-400" />
                                    <span>Generador Propuestas</span>
                                </Link>
                            )}

                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                                <span>Dashboard</span>
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

                        <div className="p-2">
                            <button
                                onClick={handleSwitchAccount}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                            >
                                <ArrowRightLeft className="w-4 h-4 text-yellow-400" />
                                <span>Cambiar Cuenta</span>
                            </button>
                        </div>

                        {/* Footer / Logout */}
                        <div className="p-2">
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>{isLoggingOut ? "Cerrando..." : "Cerrar Sesión"}</span>
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
                onClick={() => signIn("google", { prompt: "select_account" })}
                className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all font-mono text-xs"
                aria-label="Iniciar Sesión"
            >
                [ LOGIN ]
            </button>
        );
    }

    return (
        <button
            onClick={() => signIn("google", { prompt: "select_account" })}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold font-mono text-zinc-300 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all flex items-center gap-2"
        >
            [ INICIAR_SESIÓN ]
        </button>
    );
};
