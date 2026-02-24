"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { elevateToAdmin } from "./actions";
import { Lock, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
            {pending ? (
                <span className="animate-pulse">Verificando...</span>
            ) : (
                <>
                    Desbloquear Acceso <Sparkles className="w-4 h-4" />
                </>
            )}
        </button>
    );
}

export default function AdminSecretPage() {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { data: session } = useSession();

    const handleSubmit = async (formData: FormData) => {
        setErrorMsg(null);
        const result = await elevateToAdmin(formData);

        // elevateToAdmin redirects on success, so if it returns, it's an error
        if (result && result.error) {
            setErrorMsg(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-brand-gray flex flex-col items-center justify-center p-4">
            <Link href="/" className="mb-8 hover:scale-105 transition-transform">
                <img src="/images/logo.png" alt="Pigmento Logo" className="h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            </Link>

            <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 text-center relative overflow-hidden">
                {/* Decorative subtle background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 blur-[50px] pointer-events-none rounded-full" />

                <div className="mx-auto w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6 relative z-10">
                    <Lock className="w-8 h-8 text-zinc-900" />
                </div>

                <h1 className="text-2xl font-black text-brand-black mb-2 relative z-10">Modo Administrador</h1>
                <p className="text-gray-500 text-sm mb-8 relative z-10">
                    Ingresa la contraseña maestra para habilitar los privilegios en tu cuenta.
                </p>

                {!session ? (
                    <div className="bg-amber-50 text-amber-800 p-4 rounded-xl border border-amber-200 flex items-start gap-3 text-left mb-6">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium">Debes iniciar sesión con tu cuenta normal antes de activar el modo administrador.</p>
                    </div>
                ) : session.user?.role === 'ADMIN' ? (
                    <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 flex justify-center gap-3 mb-6 relative z-10">
                        <p className="text-sm font-bold">¡Esta cuenta ya es de Administrador!</p>
                    </div>
                ) : (
                    <form action={handleSubmit} className="space-y-4 relative z-10 text-left">
                        {errorMsg && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                                {errorMsg}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contraseña Maestra</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all text-brand-black"
                                placeholder="••••••••"
                            />
                        </div>

                        <SubmitButton />
                    </form>
                )}

                <div className="mt-8 text-xs text-gray-400 font-medium relative z-10">
                    Entorno Asegurado • Pigmento Stickers
                </div>
            </div>
        </div>
    );
}
