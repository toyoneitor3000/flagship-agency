import { NextResponse } from 'next/server';
import { getMagicContent } from '@/lib/magic-server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const content = await getMagicContent();
    return NextResponse.json(content);
}
