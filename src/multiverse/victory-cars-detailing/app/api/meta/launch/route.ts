import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const accountId = process.env.META_AD_ACCOUNT_ID;
  const token = process.env.META_USER_ACCESS_TOKEN;
  const PAGE_ID = '107779549069255';
  const WHATSAPP_PHONE = '573157742419';

  if (!accountId || !token) {
    return NextResponse.json({ error: 'Missing Meta credentials' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { budget, days, creatives } = body;
    const dailyBudget = Math.floor(budget / days);
    
    const allCreatives = creatives || [];
    
    if (allCreatives.length === 0) {
      return NextResponse.json({ error: 'No creatives found in the repository.' }, { status: 400 });
    }

    // 2. Premium Interests
    const interests = [
      { id: '6003309888453', name: 'BMW' },
      { id: '6003150915833', name: 'Reproducción y grabación de sonido' },
      { id: '6003161093178', name: 'Porsche' },
      { id: '6003293721530', name: 'Mercedes-Benz (vehículos)' }
    ];

    // 3. Create Campaign
    const campForm = new FormData();
    campForm.append('name', `Fase de Pruebas: Testeo Masivo (${allCreatives.length} Anuncios)`);
    campForm.append('objective', 'OUTCOME_ENGAGEMENT');
    campForm.append('status', 'ACTIVE');
    campForm.append('special_ad_categories', '[]');
    campForm.append('is_adset_budget_sharing_enabled', 'false');
    campForm.append('access_token', token);

    const campRes = await fetch(`https://graph.facebook.com/v22.0/${accountId}/campaigns`, { method: 'POST', body: campForm });
    const campData = await campRes.json();
    if (campData.error) throw new Error(campData.error.message);
    const campaignId = campData.id;

    // 4. Create AdSet
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + days);

    const adsetForm = new FormData();
    adsetForm.append('name', 'Laboratorio de Pruebas - CBO Premium');
    adsetForm.append('campaign_id', campaignId);
    adsetForm.append('daily_budget', dailyBudget.toString());
    adsetForm.append('billing_event', 'IMPRESSIONS');
    adsetForm.append('optimization_goal', 'CONVERSATIONS');
    adsetForm.append('bid_strategy', 'LOWEST_COST_WITHOUT_CAP');
    adsetForm.append('promoted_object', JSON.stringify({ page_id: PAGE_ID, whatsapp_phone_number: WHATSAPP_PHONE }));
    adsetForm.append('destination_type', 'WHATSAPP');
    adsetForm.append('end_time', endTime.toISOString());
    adsetForm.append('status', 'ACTIVE');
    
    adsetForm.append('targeting', JSON.stringify({
      geo_locations: { countries: ['CO'] },
      age_min: 25,
      age_max: 65,
      flexible_spec: [{ interests: interests }],
      targeting_automation: { advantage_audience: 1 }
    }));
    adsetForm.append('access_token', token);

    const adsetRes = await fetch(`https://graph.facebook.com/v22.0/${accountId}/adsets`, { method: 'POST', body: adsetForm });
    const adsetData = await adsetRes.json();
    if (adsetData.error) throw new Error(adsetData.error.message);
    const adsetId = adsetData.id;

    // 5. Create Ads for ALL creatives
    const createdAds = [];
    const failedAds = [];

    const formattedAccountId = accountId.startsWith('act_') ? accountId : `act_${accountId}`;

    for (let i = 0; i < allCreatives.length; i++) {
      const creative = allCreatives[i];
      let finalCreativeId = creative.id;
      
      // If it's an Instagram post (has media_url), we must create an AdCreative first
      if (creative.media_url) {
        const creativeUrl = `https://graph.facebook.com/v22.0/${formattedAccountId}/adcreatives?access_token=${token}`;
        const creativeBody = {
          name: `Creative_IG_${creative.id}`,
          object_story_spec: {
            page_id: PAGE_ID,
            instagram_actor_id: '17841460906674455',
            source_instagram_media_id: creative.id
          }
        };

        const igCreativeRes = await fetch(creativeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(creativeBody),
        });
        
        if (igCreativeRes.ok) {
          const igCreativeData = await igCreativeRes.json();
          finalCreativeId = igCreativeData.id;
        } else {
          failedAds.push({ id: creative.id, reason: 'Failed to create IG creative' });
          continue;
        }
      }

      const adForm = new FormData();
      adForm.append('name', `Test ${i + 1} - ${creative.name || creative.caption?.substring(0, 20) || 'Creativo'}`);
      adForm.append('adset_id', adsetId);
      adForm.append('creative', JSON.stringify({ creative_id: finalCreativeId }));
      adForm.append('status', 'ACTIVE');
      adForm.append('access_token', token);

      const adRes = await fetch(`https://graph.facebook.com/v22.0/${formattedAccountId}/ads`, { method: 'POST', body: adForm });
      const adData = await adRes.json();
      if (adData.error) {
        failedAds.push({ id: creative.id, reason: adData.error.message });
      } else {
        createdAds.push(adData.id);
      }
    }

    return NextResponse.json({
      success: true,
      campaignId,
      adsetId,
      launchedCount: createdAds.length,
      failedCount: failedAds.length,
      failedDetails: failedAds
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
