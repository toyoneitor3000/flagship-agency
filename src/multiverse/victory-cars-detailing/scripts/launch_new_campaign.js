const fs = require('fs');

const ACCESS_TOKEN = process.env.META_USER_ACCESS_TOKEN;
const ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const PAGE_ID = '107779549069255';
const WHATSAPP_PHONE = '573157742419';

async function launchCampaign() {
  console.log('Fetching existing creatives...');
  // 1. Fetch creatives
  const creativesRes = await fetch(`https://graph.facebook.com/v22.0/${ACCOUNT_ID}/adcreatives?fields=id,name,thumbnail_url,image_url,body,object_story_spec&access_token=${ACCESS_TOKEN}&limit=50`);
  const creativesData = await creativesRes.json();
  
  const allCreatives = creativesData.data || [];
  
  // Filter for PPF, Detailing, Promociones
  const targetKeywords = ['ppf', 'detailing', 'promocion', 'promo', 'cerami', 'lavado', 'jaguar'];
  const selectedCreatives = allCreatives.filter(c => {
    const name = (c.name || '').toLowerCase();
    const body = (c.body || '').toLowerCase();
    return targetKeywords.some(kw => name.includes(kw) || body.includes(kw));
  }).slice(0, 3); // Take top 3 best matching creatives

  if (selectedCreatives.length === 0) {
    console.error('No creatives found matching PPF, Detailing or Promociones');
    // Fallback to any 3 creatives just to fulfill the launch
    selectedCreatives.push(...allCreatives.slice(0, 3));
  }

  console.log(`Found ${selectedCreatives.length} creatives to launch.`);

  // 2. Create Campaign
  console.log('Creating Campaign...');
  const campForm = new FormData();
  campForm.append('name', 'Campaña Estratégica: PPF, Detailing y Promociones');
  campForm.append('objective', 'OUTCOME_ENGAGEMENT');
  campForm.append('status', 'ACTIVE');
  campForm.append('special_ad_categories', '[]');
  campForm.append('is_adset_budget_sharing_enabled', 'false');
  campForm.append('access_token', ACCESS_TOKEN);

  const campRes = await fetch(`https://graph.facebook.com/v22.0/${ACCOUNT_ID}/campaigns`, {
    method: 'POST',
    body: campForm
  });
  const campData = await campRes.json();
  if (campData.error) throw new Error(`Campaign error: ${JSON.stringify(campData.error)}`);
  const campaignId = campData.id;
  console.log(`Campaign created: ${campaignId}`);

  // 3. Create AdSet (650k budget for 15 days = 43333 daily)
  console.log('Creating AdSet...');
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 15);

  const adsetForm = new FormData();
  adsetForm.append('name', 'Conjunto WhatsApp - PPF & Detailing (15 Días)');
  adsetForm.append('campaign_id', campaignId);
  adsetForm.append('daily_budget', '43333');
  adsetForm.append('billing_event', 'IMPRESSIONS');
  adsetForm.append('optimization_goal', 'CONVERSATIONS');
  adsetForm.append('bid_strategy', 'LOWEST_COST_WITHOUT_CAP');
  adsetForm.append('promoted_object', JSON.stringify({
    page_id: PAGE_ID,
    whatsapp_phone_number: WHATSAPP_PHONE
  }));
  adsetForm.append('destination_type', 'WHATSAPP');
  adsetForm.append('end_time', endTime.toISOString());
  adsetForm.append('status', 'ACTIVE');
  // Simplest targeting
  adsetForm.append('targeting', JSON.stringify({
    geo_locations: { countries: ['CO'] },
    age_min: 25,
    age_max: 65,
    targeting_automation: { advantage_audience: 1 }
  }));
  adsetForm.append('access_token', ACCESS_TOKEN);

  const adsetRes = await fetch(`https://graph.facebook.com/v22.0/${ACCOUNT_ID}/adsets`, {
    method: 'POST',
    body: adsetForm
  });
  const adsetData = await adsetRes.json();
  if (adsetData.error) throw new Error(`AdSet error: ${JSON.stringify(adsetData.error)}`);
  const adsetId = adsetData.id;
  console.log(`AdSet created: ${adsetId}`);

  // 4. Create Ads
  console.log('Creating Ads...');
  for (let i = 0; i < selectedCreatives.length; i++) {
    const creative = selectedCreatives[i];
    const adForm = new FormData();
    adForm.append('name', `Anuncio ${i + 1} - ${creative.name || 'Repositorio'}`);
    adForm.append('adset_id', adsetId);
    adForm.append('creative', JSON.stringify({ creative_id: creative.id }));
    adForm.append('status', 'ACTIVE');
    adForm.append('access_token', ACCESS_TOKEN);

    const adRes = await fetch(`https://graph.facebook.com/v22.0/${ACCOUNT_ID}/ads`, {
      method: 'POST',
      body: adForm
    });
    const adData = await adRes.json();
    if (adData.error) {
      console.error(`Ad creation error for creative ${creative.id}:`, adData.error);
    } else {
      console.log(`Ad created: ${adData.id}`);
    }
  }

  console.log('Launch completed successfully!');
}

launchCampaign().catch(console.error);
