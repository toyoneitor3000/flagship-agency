import { NextResponse } from 'next/server';
import { getInstagramMedia } from '@/lib/metaClient';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const data = await getInstagramMedia(50);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
