import { NextRequest, NextResponse } from 'next/server';
import { getCampaigns } from '@/lib/metaClient';
import { checkAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const campaigns = await getCampaigns();
    return NextResponse.json({ campaigns });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch campaigns' }, { status: 500 });
  }
}
