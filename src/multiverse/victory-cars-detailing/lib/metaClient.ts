// Meta Graph API Client Helper
// Fallbacks to mock data if credentials are missing or the API errors out.

const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.META_USER_ACCESS_TOKEN;
const API_VERSION = 'v22.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

export interface MetaAd {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  spend: number;
  ctr: number;
  clicks: number;
  conversations: number;
  costPerConversation: number;
  imageUrl?: string;
  previewUrl?: string;
}

export interface MetaInsights {
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversations: number;
  costPerConversation: number;
  isMock: boolean;
  campaigns?: { id: string; name: string; spend: number; status: string }[];
  accountBalance?: number;
  amountSpent?: number;
  spendCap?: number;
}

export interface MetaCampaign {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | string;
  spend: number;
  clicks: number;
  ctr: number;
  conversations: number;
  costPerConversation: number;
  startTime?: string;
}

export interface MetaAdSet {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | string;
  campaign_id: string;
  spend: number;
  clicks: number;
  ctr: number;
  conversations: number;
  costPerConversation: number;
  startTime?: string;
}

export const isMetaConfigured = !!(AD_ACCOUNT_ID && ACCESS_TOKEN);

// MOCK DATA for local testing/free tier fallback
const MOCK_INSIGHTS: MetaInsights = {
  spend: 423500, // COP
  impressions: 184500,
  clicks: 3410,
  ctr: 1.85,
  conversations: 124,
  costPerConversation: 3415, // ~3415 COP per message
  isMock: true,
  accountBalance: 150000,
  amountSpent: 423500,
  spendCap: 1000000,
};

const TRAFFIC_MANAGER_ADS: MetaAd[] = [
  {
    id: `mock_ad_ppf_1`,
    name: `PPF - Enfoque Proceso - Julio`,
    status: 'PAUSED',
    spend: 0,
    ctr: 0,
    clicks: 0,
    conversations: 0,
    costPerConversation: 0,
    imageUrl: '/services/ppf.jpg',
  },
  {
    id: `mock_ad_ppf_2`,
    name: `PPF - Resultado Final - Julio`,
    status: 'PAUSED',
    spend: 0,
    ctr: 0,
    clicks: 0,
    conversations: 0,
    costPerConversation: 0,
    imageUrl: '/services/showroom-reveal-car.jpg',
  },
  {
    id: `mock_ad_detailing_1`,
    name: `Detailing - Brillo Extremo - Julio`,
    status: 'PAUSED',
    spend: 0,
    ctr: 0,
    clicks: 0,
    conversations: 0,
    costPerConversation: 0,
    imageUrl: '/services/detailing-pro-finish.jpg',
  },
  {
    id: `mock_ad_detailing_2`,
    name: `Detailing - Cerámico - Julio`,
    status: 'PAUSED',
    spend: 0,
    ctr: 0,
    clicks: 0,
    conversations: 0,
    costPerConversation: 0,
    imageUrl: '/services/ceramic-coating.jpg',
  }
];

const MOCK_ADS: MetaAd[] = [...TRAFFIC_MANAGER_ADS, ...Array.from({ length: 14 }, (_, i) => {
  const serviceNames = ['Restauración BMW', 'Polarizado Mercedes', 'Full Clean Audi'];
  const name = `ad genérico ${serviceNames[i % serviceNames.length]} v${Math.floor(i / 5) + 1}`;
  const status = i < 4 ? 'ACTIVE' : 'PAUSED'; // 4 active, 10 paused
  const spend = Math.floor(Math.random() * 30000) + (status === 'ACTIVE' ? 30000 : 2000);
  const clicks = Math.floor(spend / 150);
  const ctr = parseFloat((Math.random() * 2 + 1).toFixed(2));
  const conversations = Math.floor(clicks * (Math.random() * 0.15 + 0.05));
  const costPerConversation = conversations > 0 ? Math.round(spend / conversations) : 0;
  
  // Random Unsplash detailing image
  const imageIds = ['photo-1605559424843-9e4c228bf1c2', 'photo-1599423300020-f166a5c1c87a', 'photo-1583121274602-3e2820c69888', 'photo-1551538855-b5f7e5d8713a', 'photo-1603584946323-0498b3c103e3'];
  const imageUrl = `https://images.unsplash.com/${imageIds[i % imageIds.length]}?q=80&w=600&auto=format&fit=crop`;

    return {
      id: `mock_ad_legacy_${100000 + i}`,
      name,
      status: status as 'ACTIVE' | 'PAUSED',
      spend,
      ctr,
      clicks,
      conversations,
      costPerConversation,
      imageUrl,
    };
  })];

const MOCK_CAMPAIGNS: MetaCampaign[] = [
  { id: 'mock_camp_1', name: 'Campaña WhatsApp - General', status: 'ACTIVE', spend: 200000, clicks: 1500, ctr: 1.5, conversations: 50, costPerConversation: 4000, startTime: '2023-10-01' },
  { id: 'mock_camp_2', name: 'Retargeting - Interesados', status: 'PAUSED', spend: 50000, clicks: 300, ctr: 2.1, conversations: 10, costPerConversation: 5000, startTime: '2023-10-15' }
];

const MOCK_ADSETS: MetaAdSet[] = [
  { id: 'mock_adset_1', name: 'Público Amplio Bogotá', status: 'ACTIVE', campaign_id: 'mock_camp_1', spend: 100000, clicks: 700, ctr: 1.2, conversations: 20, costPerConversation: 5000, startTime: '2023-10-01' },
  { id: 'mock_adset_2', name: 'Lookalike 1% Clientes', status: 'ACTIVE', campaign_id: 'mock_camp_1', spend: 100000, clicks: 800, ctr: 1.8, conversations: 30, costPerConversation: 3333, startTime: '2023-10-01' }
];

export async function getAdAccountInsights(): Promise<MetaInsights> {
  if (!isMetaConfigured) {
    return MOCK_INSIGHTS;
  }

  try {
    const formattedAccountId = AD_ACCOUNT_ID?.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;
    const url = `${BASE_URL}/${formattedAccountId}/insights?fields=spend,impressions,clicks,inline_link_click_ctr,actions&date_preset=this_month&access_token=${ACCESS_TOKEN}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Meta API error: ${res.statusText}`);
    
    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      return { ...MOCK_INSIGHTS, isMock: false, spend: 0, impressions: 0, clicks: 0, ctr: 0, conversations: 0, costPerConversation: 0 };
    }

    const insights = data.data[0];
    const spend = parseFloat(insights.spend || 0);
    const impressions = parseInt(insights.impressions || 0, 10);
    const clicks = parseInt(insights.clicks || 0, 10);
    const ctr = parseFloat(insights.inline_link_click_ctr || 0);
    
    // Fetch account details for balance
    let accountBalance = 0;
    let amountSpent = 0;
    let spendCap = 0;
    try {
      const accUrl = `${BASE_URL}/${formattedAccountId}?fields=balance,amount_spent,spend_cap&access_token=${ACCESS_TOKEN}`;
      const accRes = await fetch(accUrl);
      if (accRes.ok) {
        const accData = await accRes.json();
        // Meta returns balance and spend in cents typically, or depending on currency formatting. 
        // We'll divide by 100 assuming COP doesn't use cents in the same way, or just use the raw value if it's already formatted.
        // Actually, for COP, it is often 100x the actual value in the API (e.g., 10000 means 100 COP).
        // For safety, let's just parse it directly.
        accountBalance = parseFloat(accData.balance || 0) / 100;
        amountSpent = parseFloat(accData.amount_spent || 0) / 100;
        spendCap = parseFloat(accData.spend_cap || 0) / 100;
      }
    } catch (e) {
      console.error('Failed to fetch account balance:', e);
    }
    
    // Extract messaging conversations from actions
    let conversations = 0;
    if (insights.actions) {
      const msgAction = insights.actions.find(
        (a: any) => a.action_type === 'onsite_conversion.messaging_first_reply' || a.action_type === 'link_click'
      );
      if (msgAction) {
        conversations = parseInt(msgAction.value || 0, 10);
      }
    }
    
    const costPerConversation = conversations > 0 ? Math.round(spend / conversations) : 0;

    // Fetch campaigns for breakdown
    let campaignsBreakdown = [];
    try {
      const campUrl = `${BASE_URL}/${formattedAccountId}/campaigns?fields=id,name,status,insights{spend}&date_preset=this_month&access_token=${ACCESS_TOKEN}&limit=50`;
      const campRes = await fetch(campUrl);
      if (campRes.ok) {
        const campData = await campRes.json();
        if (campData.data) {
          campaignsBreakdown = campData.data
            .map((c: any) => ({
              id: c.id,
              name: c.name,
              status: c.status,
              spend: parseFloat(c.insights?.data?.[0]?.spend || 0)
            }))
            .filter((c: any) => c.spend > 0)
            .sort((a: any, b: any) => b.spend - a.spend);
        }
      }
    } catch (e) {
      console.error('Failed to fetch campaigns breakdown:', e);
    }

    return {
      spend,
      impressions,
      clicks,
      ctr,
      conversations,
      costPerConversation,
      isMock: false,
      campaigns: campaignsBreakdown,
      accountBalance,
      amountSpent,
      spendCap,
    };
  } catch (error) {
    console.error('Failed to fetch Meta insights, falling back to mock data:', error);
    return MOCK_INSIGHTS;
  }
}

export async function getAds(): Promise<MetaAd[]> {
  if (!isMetaConfigured) {
    return MOCK_ADS;
  }

  try {
    const formattedAccountId = AD_ACCOUNT_ID?.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;
    // Fetch ads, statuses, and insights for each
    const url = `${BASE_URL}/${formattedAccountId}/ads?fields=id,name,status,effective_status,creative{image_url,thumbnail_url},insights{spend,clicks,inline_link_click_ctr,actions}&date_preset=this_month&access_token=${ACCESS_TOKEN}&limit=200`;
    
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Meta API error: ${res.statusText}`);
    
    const data = await res.json();
    if (!data.data) return [];

    return data.data.map((ad: any) => {
      const insights = ad.insights?.data?.[0] || {};
      const spend = parseFloat(insights.spend || 0);
      const clicks = parseInt(insights.clicks || 0, 10);
      const ctr = parseFloat(insights.inline_link_click_ctr || 0);
      
      let conversations = 0;
      if (insights.actions) {
        const msgAction = insights.actions.find(
          (a: any) => a.action_type === 'onsite_conversion.messaging_first_reply' || a.action_type === 'link_click'
        );
        if (msgAction) {
          conversations = parseInt(msgAction.value || 0, 10);
        }
      }
      
      const costPerConversation = conversations > 0 ? Math.round(spend / conversations) : 0;
      const imageUrl = ad.creative?.image_url || ad.creative?.thumbnail_url || 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600&auto=format&fit=crop';

      return {
        id: ad.id,
        name: ad.name,
        status: ad.effective_status || ad.status,
        spend,
        clicks,
        ctr,
        conversations,
        costPerConversation,
        imageUrl,
        startTime: ad.created_time
      };
    });
  } catch (error) {
    console.error('Failed to fetch Meta ads:', error);
    // If configured, don't silently fallback to mock data, throw to let the UI know it failed.
    if (isMetaConfigured) throw error;
    return MOCK_ADS;
  }
}

function extractInsightsMetrics(insights: any) {
  const spend = parseFloat(insights.spend || 0);
  const clicks = parseInt(insights.clicks || 0, 10);
  const ctr = parseFloat(insights.inline_link_click_ctr || 0);
  
  let conversations = 0;
  if (insights.actions) {
    const msgAction = insights.actions.find(
      (a: any) => a.action_type === 'onsite_conversion.messaging_first_reply' || a.action_type === 'link_click'
    );
    if (msgAction) {
      conversations = parseInt(msgAction.value || 0, 10);
    }
  }
  const costPerConversation = conversations > 0 ? Math.round(spend / conversations) : 0;

  return { spend, clicks, ctr, conversations, costPerConversation };
}

export async function getCampaigns(): Promise<MetaCampaign[]> {
  if (!isMetaConfigured) return MOCK_CAMPAIGNS;
  try {
    const formattedAccountId = AD_ACCOUNT_ID?.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;
    const url = `${BASE_URL}/${formattedAccountId}/campaigns?fields=id,name,status,start_time,insights{spend,clicks,inline_link_click_ctr,actions}&date_preset=this_month&access_token=${ACCESS_TOKEN}&limit=50`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Meta API error: ${res.statusText}`);
    const data = await res.json();
    if (!data.data) return [];

    return data.data.map((c: any) => {
      const metrics = extractInsightsMetrics(c.insights?.data?.[0] || {});
      return {
        id: c.id,
        name: c.name,
        status: c.status,
        startTime: c.start_time,
        ...metrics
      };
    });
  } catch (error) {
    console.error('Failed to fetch Meta campaigns:', error);
    return MOCK_CAMPAIGNS;
  }
}

export async function getAdSets(): Promise<MetaAdSet[]> {
  if (!isMetaConfigured) return MOCK_ADSETS;
  try {
    const formattedAccountId = AD_ACCOUNT_ID?.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;
    const url = `${BASE_URL}/${formattedAccountId}/adsets?fields=id,name,status,campaign_id,start_time,insights{spend,clicks,inline_link_click_ctr,actions}&date_preset=this_month&access_token=${ACCESS_TOKEN}&limit=50`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Meta API error: ${res.statusText}`);
    const data = await res.json();
    if (!data.data) return [];

    return data.data.map((a: any) => {
      const metrics = extractInsightsMetrics(a.insights?.data?.[0] || {});
      return {
        id: a.id,
        name: a.name,
        status: a.status,
        campaign_id: a.campaign_id,
        startTime: a.start_time,
        ...metrics
      };
    });
  } catch (error) {
    console.error('Failed to fetch Meta adsets:', error);
    return MOCK_ADSETS;
  }
}

export async function toggleAd(adId: string, status: 'ACTIVE' | 'PAUSED'): Promise<boolean> {
  if (adId.startsWith('mock_')) {
    // Modify the mock ads list in memory
    const adIndex = MOCK_ADS.findIndex(a => a.id === adId);
    if (adIndex !== -1) {
      MOCK_ADS[adIndex].status = status;
      return true;
    }
    return false;
  }

  if (!isMetaConfigured) return false;

  try {
    const url = `${BASE_URL}/${adId}?status=${status}&access_token=${ACCESS_TOKEN}`;
    const res = await fetch(url, { method: 'POST' });
    if (!res.ok) throw new Error(`Meta API toggle error: ${res.statusText}`);
    const data = await res.json();
    return !!data.success;
  } catch (error) {
    console.error('Failed to toggle Meta ad:', error);
    return false;
  }
}

// Quick helper to create an ad creative and ad for WhatsApp destination
export async function createAdFromImage(params: {
  name: string;
  imageUrl: string;
  bodyText: string;
  pageId: string; // Facebook Page ID
  adsetId: string; // Target Adset ID
}): Promise<{ success: boolean; adId?: string; error?: string }> {
  if (!isMetaConfigured) {
    // Mock create ad
    const newId = `mock_ad_${Date.now()}`;
    const newAd: MetaAd = {
      id: newId,
      name: params.name,
      status: 'PAUSED',
      spend: 0,
      ctr: 0,
      clicks: 0,
      conversations: 0,
      costPerConversation: 0,
      imageUrl: params.imageUrl,
    };
    MOCK_ADS.unshift(newAd);
    return { success: true, adId: newId };
  }

  try {
    const formattedAccountId = AD_ACCOUNT_ID?.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;
    
    // 1. Create Creative
    // For a Whatsapp/message ad, the CTA is MESSAGE_PAGE
    const creativeUrl = `${BASE_URL}/${formattedAccountId}/adcreatives?access_token=${ACCESS_TOKEN}`;
    const creativeBody = {
      name: `Creative_${params.name}_${Date.now()}`,
      object_story_spec: {
        page_id: params.pageId,
        link_data: {
          link: `https://facebook.com/${params.pageId}`,
          message: params.bodyText,
          picture: params.imageUrl,
          call_to_action: {
            type: 'MESSAGE_PAGE',
            value: {
              app_destination: 'WHATSAPP', // Or MESSENGER
            }
          }
        }
      }
    };

    const creativeRes = await fetch(creativeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creativeBody),
    });
    
    if (!creativeRes.ok) {
      const err = await creativeRes.json();
      throw new Error(`Creative creation failed: ${JSON.stringify(err)}`);
    }
    const creativeData = await creativeRes.json();
    const creativeId = creativeData.id;

    // 2. Create Ad under the Adset
    const adUrl = `${BASE_URL}/${formattedAccountId}/ads?access_token=${ACCESS_TOKEN}`;
    const adBody = {
      name: params.name,
      adset_id: params.adsetId,
      creative: { creative_id: creativeId },
      status: 'PAUSED', // Start paused so the user can verify
    };

    const adRes = await fetch(adUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adBody),
    });

    if (!adRes.ok) {
      const err = await adRes.json();
      throw new Error(`Ad creation failed: ${JSON.stringify(err)}`);
    }

    const adData = await adRes.json();
    return { success: true, adId: adData.id };
  } catch (error: any) {
    console.error('Meta Ad Creation Failed:', error);
    return { success: false, error: error.message || 'Unknown error during ad creation' };
  }
}

export interface InstagramMedia {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  permalink?: string;
}

export interface InstagramInsights {
  saved?: number;
  shares?: number;
  reach?: number;
  impressions?: number;
  engagement?: number;
}

const IG_USER_ID = '17841460906674455'; // Victory Cars Instagram Business Account

const MOCK_IG_POSTS: InstagramMedia[] = [
  {
    id: "mock_ig_1",
    caption: "Protección definitiva para este Porsche 911 GT3 RS. Instalación completa de PPF.\n\n#Porsche911 #PPF #CarDetailing",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1503376713175-3e2820c69888?q=80&w=600&auto=format&fit=crop",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    like_count: 142,
    comments_count: 18,
  },
  {
    id: "mock_ig_2",
    caption: "Tratamiento cerámico aplicado a este Audi RS e-tron GT. Brillo extremo.\n\n#AudiRSetron #CeramicCoating",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1603584946323-0498b3c103e3?q=80&w=600&auto=format&fit=crop",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    like_count: 89,
    comments_count: 7,
  },
  {
    id: "mock_ig_3",
    caption: "Wrap Premium para esta Mercedes G-Wagon. Negro mate satinado.\n\n#MercedesGWagon #CarWrap #MatteBlack",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1551538855-b5f7e5d8713a?q=80&w=600&auto=format&fit=crop",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    like_count: 210,
    comments_count: 32,
  },
  {
    id: "mock_ig_4",
    caption: "Corrección de pintura nivel exposición en este BMW M4.\n\n#BMWM4 #PaintCorrection #DetailingPro",
    media_type: "IMAGE",
    media_url: "https://images.unsplash.com/photo-1599423300020-f166a5c1c87a?q=80&w=600&auto=format&fit=crop",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    like_count: 67,
    comments_count: 4,
  }
];

export async function getInstagramMedia(limit: number = 50): Promise<InstagramMedia[]> {
  if (!ACCESS_TOKEN) {
    return MOCK_IG_POSTS;
  }

  try {
    const url = `${BASE_URL}/${IG_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count,permalink&limit=${limit}&access_token=${ACCESS_TOKEN}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Instagram API error: ${res.statusText}`);
    const data = await res.json();
    
    if (!data.data || data.data.length === 0) {
      return MOCK_IG_POSTS;
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return data.data
      .filter((m: any) => new Date(m.timestamp) >= thirtyDaysAgo)
      .map((m: any) => ({
      id: m.id,
      caption: m.caption || '',
      media_type: m.media_type,
      media_url: m.media_url || '',
      thumbnail_url: m.thumbnail_url,
      timestamp: m.timestamp,
      like_count: m.like_count || 0,
      comments_count: m.comments_count || 0,
      permalink: m.permalink,
    }));
  } catch (error) {
    console.error('Error fetching Instagram media, falling back to mock data:', error);
    return MOCK_IG_POSTS;
  }
}

export async function getInstagramInsights(mediaId: string): Promise<InstagramInsights> {
  if (!ACCESS_TOKEN) {
    // Mock insights
    return {
      saved: Math.floor(Math.random() * 40) + 5,
      shares: Math.floor(Math.random() * 20) + 1,
      reach: Math.floor(Math.random() * 3000) + 500,
      impressions: Math.floor(Math.random() * 5000) + 1000,
      engagement: Math.floor(Math.random() * 200) + 20,
    };
  }

  try {
    const url = `${BASE_URL}/${mediaId}/insights?metric=saved,shares,reach,impressions,engagement&access_token=${ACCESS_TOKEN}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      // Some media types don't support insights, return zeros
      console.warn(`Insights not available for media ${mediaId}: ${res.statusText}`);
      return { saved: 0, shares: 0, reach: 0, impressions: 0, engagement: 0 };
    }
    const data = await res.json();
    const result: InstagramInsights = {};
    for (const metric of (data.data || [])) {
      if (metric.name === 'saved') result.saved = metric.values?.[0]?.value || 0;
      if (metric.name === 'shares') result.shares = metric.values?.[0]?.value || 0;
      if (metric.name === 'reach') result.reach = metric.values?.[0]?.value || 0;
      if (metric.name === 'impressions') result.impressions = metric.values?.[0]?.value || 0;
      if (metric.name === 'engagement') result.engagement = metric.values?.[0]?.value || 0;
    }
    return result;
  } catch (error) {
    console.error(`Error fetching insights for ${mediaId}:`, error);
    return { saved: 0, shares: 0, reach: 0, impressions: 0, engagement: 0 };
  }
}

