import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import { createAdFromImage } from '@/lib/metaClient';
import { MARKETING_CATEGORIES, ProductCategory } from '@/lib/marketingConfig';

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { category, imageUrl, budget, generatedCopy, durationDays } = body;

    if (!category || !imageUrl || !budget || !generatedCopy) {
      return NextResponse.json({ error: 'Missing required parameters (category, imageUrl, budget, generatedCopy)' }, { status: 400 });
    }

    // SIMULATED: Post to Instagram Organic
    console.log(`[INSTAGRAM_API_MOCK] Publishing to IG: ${imageUrl}`);
    console.log(`[INSTAGRAM_API_MOCK] Caption: ${generatedCopy}`);
    
    const instagramSimulatedResult = {
      success: true,
      igMediaId: `mock_ig_${Date.now()}`
    };

    // ACTION: Create Meta Ad
    // Default pageId/adsetId from env variables if not supplied
    const defaultPageId = process.env.META_PAGE_ID || 'mock_page';
    const defaultAdsetId = process.env.META_ADSET_ID || 'mock_adset';

    const adName = `${category.toUpperCase()} - ${new Date().toLocaleDateString('es-CO')} - $${budget} (${durationDays || 3} dias)`;

    const metaAdResult = await createAdFromImage({
      name: adName,
      imageUrl,
      bodyText: generatedCopy,
      pageId: defaultPageId,
      adsetId: defaultAdsetId,
    });

    if (!metaAdResult.success) {
       return NextResponse.json({ error: metaAdResult.error || 'Failed to create Meta Ad' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      instagramResult: instagramSimulatedResult,
      metaAdResult: {
        adId: metaAdResult.adId,
        budgetAssigned: budget,
        adName
      }
    });
  } catch (error: any) {
    console.error('Publish Route Error:', error);
    return NextResponse.json({ error: error.message || 'Failed processing publish request' }, { status: 500 });
  }
}
