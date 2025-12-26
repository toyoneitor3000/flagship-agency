import { NextRequest, NextResponse } from 'next/server';
import { updateMagicContent } from '@/lib/magic-server';

const MAGIC_WORD = process.env.MAGIC_WORD || 'purrpurr-magic';

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('x-magic-word');

        // Simple authentication
        if (authHeader !== MAGIC_WORD) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { key, value } = body;

        if (!key || value === undefined) {
            return NextResponse.json({ success: false, error: 'Missing key or value' }, { status: 400 });
        }

        const result = await updateMagicContent(key, value);

        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Write failed' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 });
    }
}
