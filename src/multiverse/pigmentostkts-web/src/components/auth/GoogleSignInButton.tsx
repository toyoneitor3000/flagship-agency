"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";

export function GoogleSignInButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Construct current URL to return to
    const currentQuery = searchParams.toString();
    const defaultCallback = pathname === '/' ? '/dashboard' : `${pathname}${currentQuery ? `?${currentQuery}` : ''}`;
    const callbackUrl = searchParams.get("callbackUrl") || defaultCallback;

    const handleSignIn = async () => {
        setIsLoading(true);
        // Set the preference in a cookie before handing off to Google
        document.cookie = `pigmento_remember_me=${rememberMe}; path=/; max-age=300`; // 5 minute window for the backend to read it during callback

        try {
            await signIn("google", { callbackUrl });
        } catch (error) {
            console.error("Error signing in with Google", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <button
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full h-14 bg-white border border-gray-200 hover:border-brand-yellow hover:bg-brand-gray/5 text-brand-black font-black text-sm rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(255,190,0,0.12)]"
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-brand-yellow" />
                ) : (
                    <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        CONTINUAR CON GOOGLE
                    </>
                )}
            </button>

            {/* Trust Device Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group mt-2">
                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${rememberMe ? 'bg-brand-black border-brand-black text-brand-yellow' : 'bg-white border-gray-300 group-hover:border-brand-yellow'}`}>
                    {rememberMe && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                </div>
                <input
                    type="checkbox"
                    className="hidden"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 leading-tight">Confiar en este dispositivo</span>
                    <span className="text-[11px] text-gray-500 font-medium">Mantener mi sesión de Pigmento iniciada por 30 días.</span>
                </div>
            </label>
        </div>
    );
}
