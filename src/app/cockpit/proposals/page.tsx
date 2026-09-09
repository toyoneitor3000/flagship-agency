import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ProposalGenerator } from './ProposalGenerator';

export const metadata = {
  title: 'Generador de Propuestas | Purrpurr Cockpit',
};

export default async function ProposalsPage() {
  const session = await auth();

  // Redirigir a inicio si no está logueado o si no es administrador
  if (!session || session.user?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <ProposalGenerator />
    </div>
  );
}
