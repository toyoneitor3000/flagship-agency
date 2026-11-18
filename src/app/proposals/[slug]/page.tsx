import { CVClient } from '@/components/cv/CVClient';
import { ProposalGenerator } from '@/app/cockpit/proposals/ProposalGenerator';
import { ACTIVE_PROPOSAL } from '@/config/active-proposal';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const VALID_TARGETS = ['opyt'];
const PROPOSAL_SLUGS = [
  'prop-jl-2026-094',
  'julian-lotero',
  'bogota-detail-center',
  'speedlight',
];

interface TargetedProposalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TargetedProposalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalized = slug.toLowerCase();

  if (PROPOSAL_SLUGS.includes(normalized)) {
    return {
      title: `Propuesta #${ACTIVE_PROPOSAL.code} · ${ACTIVE_PROPOSAL.clientName} | purrpurr.dev × Speedlight`,
      description: `${ACTIVE_PROPOSAL.title} · Alianza Oficial purrpurr.dev × Speedlight Culture.`,
    };
  }

  return {
    title: 'Camilo Toloza | Portafolio Profesional',
    description:
      'Diseñador Digital & Creative Lead con más de 12 años de experiencia en ecosistemas digitales y branding automotriz.',
  };
}

export default async function TargetedProposalPage({
  params,
}: TargetedProposalPageProps) {
  const { slug } = await params;
  const normalized = slug.toLowerCase();

  if (PROPOSAL_SLUGS.includes(normalized)) {
    return <ProposalGenerator />;
  }

  if (!VALID_TARGETS.includes(normalized)) {
    notFound();
  }

  return <CVClient mode="targeted" slug={slug} />;
}
