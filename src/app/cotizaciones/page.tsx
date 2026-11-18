import { ProposalGenerator } from '@/app/cockpit/proposals/ProposalGenerator';
import { ACTIVE_PROPOSAL } from '@/config/active-proposal';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: `Cotizaciones Oficiales · #${ACTIVE_PROPOSAL.code} | purrpurr.dev × Speedlight`,
  description: `Visor oficial de propuesta comercial #${ACTIVE_PROPOSAL.code} (${ACTIVE_PROPOSAL.clientName} · ${ACTIVE_PROPOSAL.clientCompany}) en alianza purrpurr.dev × Speedlight Culture.`,
};

export default function CotizacionesPage() {
  return <ProposalGenerator />;
}
