import { NextRequest, NextResponse } from 'next/server';
import { getAdSets } from '@/lib/metaClient';
import { checkAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const adsets = await getAdSets();
    return NextResponse.json({ adsets });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch adsets' }, { status: 500 });
  }
}
