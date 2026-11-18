import { auth, signIn } from '@/auth';
import Link from 'next/link';
import { ArrowRight, FileText, Home, Lock, ShieldAlert } from 'lucide-react';
import ProposalStudioEditor from '@/components/proposal-engine/ProposalStudioEditor';

export const metadata = {
    title: 'Proposal Studio | Purrpurr Cockpit',
    description:
        'Motor editorial multipágina PURRPURR.DEV × SPEEDLIGHT CULTURE con plantillas A4 fijas, selección adaptativa y QC en 4 niveles.',
};

export const dynamic = 'force-dynamic';

export default async function CockpitProposalStudioPage({
    searchParams,
}: {
    searchParams: Promise<{ proposal?: string }>;
}) {
    const resolved = await searchParams;
    const session = await auth();
    const isDevLocal = process.env.NODE_ENV === 'development';

    if (!session?.user && !isDevLocal) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center space-y-6">
                    <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto text-purple-400">
                        <Lock className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-wider mb-2">
                            <FileText className="w-3.5 h-3.5" />
                            Cockpit // Proposal Studio
                        </div>
                        <h1 className="text-2xl font-bold text-white">Autenticación Requerida</h1>
                        <p className="text-sm text-zinc-400 mt-2">
                            Inicia sesión como administrador para acceder a PURRPURR.DEV — Proposal Studio.
                        </p>
                    </div>
                    <form
                        action={async () => {
                            'use server';
                            await signIn('google', { redirectTo: '/cockpit/proposal-studio' });
                        }}
                    >
                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-xl bg-white text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Iniciar Sesión con Google
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                    <Link
                        href="/"
                        className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-2"
                    >
                        <Home className="w-3.5 h-3.5" />
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        );
    }

    if (session?.user && session.user?.role !== 'admin' && !isDevLocal) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-zinc-900 border border-red-500/20 p-8 rounded-2xl text-center space-y-4">
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto text-red-400">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold">Acceso Restringido</h1>
                    <p className="text-sm text-zinc-400">
                        La cuenta <strong className="font-mono text-xs">{session.user.email}</strong> no tiene privilegios de administrador.
                    </p>
                </div>
            </div>
        );
    }

    return <ProposalStudioEditor initialProposalId={resolved?.proposal} />;
}
