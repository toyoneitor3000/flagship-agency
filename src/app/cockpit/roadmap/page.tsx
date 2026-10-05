import { Metadata } from 'next';
import { HYBRID_LAB_PHASES } from '@/config/hybrid-lab-checklist';
import { RoadmapClient } from './RoadmapClient';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Cronograma & Checklist Maestro | Purrpurr Híbrido Laboratorio',
  description: 'Seguimiento técnico, fases y tareas completadas de la plataforma Híbrido Laboratorio.',
};

export const dynamic = 'force-dynamic';

function getMergedPhases() {
  const stateFile = path.join(process.cwd(), 'data', 'roadmap-overrides.json');
  let overrides: Record<string, { completed: boolean; completedAt?: string }> = {};

  try {
    if (fs.existsSync(stateFile)) {
      overrides = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading roadmap overrides:', e);
  }

  return HYBRID_LAB_PHASES.map(phase => ({
    ...phase,
    items: phase.items.map(item => {
      const override = overrides[item.id];
      if (override !== undefined) {
        return {
          ...item,
          completed: override.completed,
          completedAt: override.completedAt ?? item.completedAt
        };
      }
      return item;
    })
  }));
}

export default async function RoadmapPage() {
  const initialPhases = getMergedPhases();

  return (
    <RoadmapClient initialPhases={initialPhases} />
  );
}
