import { auth, signIn } from '@/auth';
import Link from 'next/link';
import { Lock, ShieldAlert, ArrowRight, Home, Sparkles, FileText } from 'lucide-react';
import { ProposalGenerator } from './ProposalGenerator';

export const metadata = {
  title: 'Generador de Propuestas | Purrpurr Cockpit',
  description: 'Generador de cotizaciones y propuestas comerciales formales.',
};

export const dynamic = 'force-dynamic';

export default async function ProposalsPage() {
  const session = await auth();

  // 1. Caso: Usuario No Autenticado
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900/90 border border-zinc-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
          {/* Glow decorativo */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                Cockpit // Cotizaciones
              </div>
              <h1 className="text-2xl font-bold font-display text-white">Autenticación Requerida</h1>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Para acceder al generador de propuestas comerciales, cotizaciones personalizadas y exportación en PDF, debes iniciar sesión con una cuenta autorizada.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <form
                action={async () => {
                  'use server';
                  await signIn('google', { redirectTo: '/cockpit/proposals' });
                }}
              >
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Iniciar Sesión con Google
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <Link
                href="/"
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-zinc-700/50"
              >
                <Home className="w-3.5 h-3.5" />
                Volver a la Página Principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Caso: Usuario Autenticado pero sin rol Admin
  if (session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900/90 border border-red-500/20 p-8 rounded-2xl shadow-2xl backdrop-blur-xl text-center">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto text-red-400 mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold font-display text-white">Acceso Restringido</h1>
          <p className="text-sm text-zinc-400 mt-2">
            La cuenta <strong className="text-zinc-200 font-mono text-xs">{session.user.email}</strong> está autenticada, pero no cuenta con privilegios de administrador para gestionar cotizaciones.
          </p>

          <div className="space-y-3 mt-6">
            <form
              action={async () => {
                'use server';
                await signIn('google', { redirectTo: '/cockpit/proposals' });
              }}
            >
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition-colors border border-zinc-700 cursor-pointer"
              >
                Cambiar a Cuenta Administradora
              </button>
            </form>

            <Link
              href="/"
              className="block w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs transition-colors border border-zinc-800"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Caso: Administrador autorizado
  return (
    <div className="min-h-screen bg-zinc-950">
      <ProposalGenerator />
    </div>
  );
}
