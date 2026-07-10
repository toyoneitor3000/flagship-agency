import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAds, toggleAd, createAdFromImage } from '@/lib/metaClient';
import { checkAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const ads = await getAds();
    return NextResponse.json({ ads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'toggle') {
      const { adId, status } = body;
      if (!adId || !status) {
        return NextResponse.json({ error: 'Missing adId or status' }, { status: 400 });
      }
      const success = await toggleAd(adId, status);
      if (success) {
        revalidatePath('/admin/marketing-plan');
      }
      return NextResponse.json({ success });
    }

    if (action === 'create') {
      const { name, imageUrl, bodyText, pageId, adsetId } = body;
      if (!name || !imageUrl || !bodyText) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
      }

      // Default pageId/adsetId from env variables if not supplied
      const defaultPageId = pageId || process.env.META_PAGE_ID || 'mock_page';
      const defaultAdsetId = adsetId || process.env.META_ADSET_ID || 'mock_adset';

      const result = await createAdFromImage({
        name,
        imageUrl,
        bodyText,
        pageId: defaultPageId,
        adsetId: defaultAdsetId,
      });

      if (result.success) {
        revalidatePath('/admin/marketing-plan');
      }

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed processing request' }, { status: 500 });
  }
}
