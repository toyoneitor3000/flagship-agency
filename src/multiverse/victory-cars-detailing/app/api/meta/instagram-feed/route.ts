import { NextResponse } from 'next/server';
import { getInstagramMedia } from '@/lib/metaClient';

export async function GET() {
  try {
    const media = await getInstagramMedia(50);
    return NextResponse.json({ success: true, data: media });
  } catch (error: any) {
    console.error('Failed to fetch Instagram Media:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch Instagram Media' }, { status: 500 });
  }
}
