const fs = require('fs');

const ACCESS_TOKEN = process.env.META_USER_ACCESS_TOKEN;
const ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const PAGE_ID = '107779549069255';
const WHATSAPP_PHONE = '573157742419';

async function searchInterest(keyword) {
  const res = await fetch(`https://graph.facebook.com/v22.0/search?type=adinterest&q=${keyword}&access_token=${ACCESS_TOKEN}`);
  const data = await res.json();
  if (data.data && data.data.length > 0) {
    return { id: data.data[0].id, name: data.data[0].name };
  }
  return null;
}

async function launchTargetedCampaign() {
  console.log('Fetching existing creatives...');
  const creativesRes = await fetch(`https://graph.facebook.com/v22.0/${ACCOUNT_ID}/adcreatives?fields=id,name,thumbnail_url,image_url,body,object_story_spec&access_token=${ACCESS_TOKEN}&limit=50`);
  const creativesData = await creativesRes.json();
  
  const allCreatives = creativesData.data || [];
  
  const targetKeywords = ['ppf', 'detailing', 'promocion', 'promo', 'cerami', 'lavado', 'jaguar'];
  const selectedCreatives = allCreatives.filter(c => {
    const name = (c.name || '').toLowerCase();
    const body = (c.body || '').toLowerCase();
    return targetKeywords.some(kw => name.includes(kw) || body.includes(kw));
  }).slice(0, 3);

  if (selectedCreatives.length === 0) {
    console.error('No creatives found matching keywords.');
    selectedCreatives.push(...allCreatives.slice(0, 3));
  }
  console.log(`Found ${selectedCreatives.length} creatives to launch.`);

  console.log('Searching for premium interests...');
  const brands = ['BMW', 'Audi', 'Porsche', 'Mercedes-Benz'];
  const interests = [];
  for (const brand of brands) {
    const interest = await searchInterest(brand);
    if (interest) interests.push(interest);
  }
  console.log('Found interests:', interests);

  console.log('Creating Campaign...');
  const campForm = new FormData();
  campForm.append('name', 'Campaña Estratégica [Premium]: PPF & Detailing');
  campForm.append('objective', 'OUTCOME_ENGAGEMENT');
  campForm.append('status', 'ACTIVE');
  campForm.append('special_ad_categories', '[]');
  campForm.append('is_adset_budget_sharing_enabled', 'false');
  campForm.append('access_token', ACCESS_TOKEN);

  const campRes = await fetch(`https://graph.facebook.com/v22.0/${ACCOUNT_ID}/campaigns`, { method: 'POST', body: campForm });
  const campData = await campRes.json();
  if (campData.error) throw new Error(`Campaign error: ${JSON.stringify(campData.error)}`);
  const campaignId = campData.id;
  console.log(`Campaign created: ${campaignId}`);

  console.log('Creating AdSet...');
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 15);

  const adsetForm = new FormData();
  adsetForm.append('name', 'Conjunto WhatsApp - Dueños Alta Gama');
  adsetForm.append('campaign_id', campaignId);
  adsetForm.append('daily_budget', '43333');
  adsetForm.append('billing_event', 'IMPRESSIONS');
  adsetForm.append('optimization_goal', 'CONVERSATIONS');
  adsetForm.append('bid_strategy', 'LOWEST_COST_WITHOUT_CAP');
  adsetForm.append('promoted_object', JSON.stringify({ page_id: PAGE_ID, whatsapp_phone_number: WHATSAPP_PHONE }));
  adsetForm.append('destination_type', 'WHATSAPP');
  adsetForm.append('end_time', endTime.toISOString());
  adsetForm.append('status', 'ACTIVE');
  
  const targetingSpec = {
    geo_locations: { countries: ['CO'] },
    age_min: 25,
    age_max: 65,
    flexible_spec: [{ interests: interests }],
    targeting_automation: { advantage_audience: 1 }
  };
  
  adsetForm.append('targeting', JSON.stringify(targetingSpec));
  adsetForm.append('access_token', ACCESS_TOKEN);

  const adsetRes = await fetch(`https://graph.facebook.com/v22.0/${ACCOUNT_ID}/adsets`, { method: 'POST', body: adsetForm });
  const adsetData = await adsetRes.json();
  if (adsetData.error) throw new Error(`AdSet error: ${JSON.stringify(adsetData.error)}`);
  const adsetId = adsetData.id;
  console.log(`AdSet created: ${adsetId}`);

  console.log('Creating Ads...');
  for (let i = 0; i < selectedCreatives.length; i++) {
    const creative = selectedCreatives[i];
    const adForm = new FormData();
    adForm.append('name', `Anuncio ${i + 1} - ${creative.name || 'Repositorio'}`);
    adForm.append('adset_id', adsetId);
    adForm.append('creative', JSON.stringify({ creative_id: creative.id }));
    adForm.append('status', 'ACTIVE');
    adForm.append('access_token', ACCESS_TOKEN);

    const adRes = await fetch(`https://graph.facebook.com/v22.0/${ACCOUNT_ID}/ads`, { method: 'POST', body: adForm });
    const adData = await adRes.json();
    if (adData.error) {
      console.error(`Ad creation error for creative ${creative.id}:`, adData.error.message);
    } else {
      console.log(`Ad created: ${adData.id}`);
    }
  }
  console.log('Targeted Launch completed successfully!');
}

launchTargetedCampaign().catch(console.error);
