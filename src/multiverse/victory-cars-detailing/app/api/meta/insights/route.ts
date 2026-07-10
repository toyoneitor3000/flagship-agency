import { NextRequest, NextResponse } from 'next/server';
import { getAdAccountInsights } from '@/lib/metaClient';
import { checkAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const insights = await getAdAccountInsights();
    return NextResponse.json(insights);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch insights' }, { status: 500 });
  }
}
