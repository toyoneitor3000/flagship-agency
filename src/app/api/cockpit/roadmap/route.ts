import { NextResponse } from 'next/server';
import { HYBRID_LAB_PHASES, calculateChecklistStats } from '@/config/hybrid-lab-checklist';
import fs from 'fs';
import path from 'path';

const STATE_FILE = path.join(process.cwd(), 'data', 'roadmap-overrides.json');

function getOverrides(): Record<string, { completed: boolean; completedAt?: string }> {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error('Error reading roadmap overrides:', error);
  }
  return {};
}

function saveOverrides(overrides: Record<string, { completed: boolean; completedAt?: string }>) {
  try {
    const dir = path.dirname(STATE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(overrides, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving roadmap overrides:', error);
  }
}

export async function GET() {
  const overrides = getOverrides();

  const mergedPhases = HYBRID_LAB_PHASES.map(phase => ({
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

  const stats = calculateChecklistStats(mergedPhases);

  return NextResponse.json({
    phases: mergedPhases,
    stats,
    updatedAt: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemId, completed } = body;

    if (!itemId || typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 });
    }

    const overrides = getOverrides();
    overrides[itemId] = {
      completed,
      completedAt: completed ? new Date().toISOString().split('T')[0] : undefined
    };
    saveOverrides(overrides);

    const mergedPhases = HYBRID_LAB_PHASES.map(phase => ({
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

    const stats = calculateChecklistStats(mergedPhases);

    return NextResponse.json({
      success: true,
      itemId,
      completed,
      stats,
      phases: mergedPhases
    });
  } catch (error) {
    console.error('Error updating roadmap status:', error);
    return NextResponse.json({ error: 'Error interno al actualizar estado' }, { status: 500 });
  }
}
