const https = require('https');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const ACCESS_TOKEN = process.env.META_USER_ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const PAGE_ID = '107779549069255'; // Victory Cars FanPage ID

const API_VERSION = 'v22.0';
const BASE_URL = 'graph.facebook.com';

function makeRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    
    const options = {
      hostname: BASE_URL,
      path: `/${API_VERSION}/${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          if (res.statusCode >= 400) {
            reject(parsed.error || parsed);
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function createCampaign(name) {
  const formattedAccountId = AD_ACCOUNT_ID.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;
  const payload = {
    name: name,
    objective: 'OUTCOME_LEADS',
    status: 'PAUSED',
    special_ad_categories: ['NONE'],
    access_token: ACCESS_TOKEN
  };
  
  console.log(`Creando campaña: ${name}...`);
  return await makeRequest(`${formattedAccountId}/campaigns`, 'POST', payload);
}

async function createAdSet(campaignId, name) {
  const formattedAccountId = AD_ACCOUNT_ID.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;
  const payload = {
    name: name,
    campaign_id: campaignId,
    status: 'PAUSED',
    optimization_goal: 'LEAD_GENERATION',
    billing_event: 'IMPRESSIONS',
    bid_amount: 500, // Dummy bid amount
    daily_budget: 3000000, // 30,000 COP
    targeting: {
      geo_locations: {
        countries: ['CO'],
        cities: [{ key: '445209', radius: 20, distance_unit: 'kilometer' }] // Bogotá
      },
      age_min: 25,
      age_max: 55
    },
    promoted_object: {
      page_id: PAGE_ID
    },
    access_token: ACCESS_TOKEN
  };
  
  console.log(`Creando conjunto de anuncios: ${name}...`);
  return await makeRequest(`${formattedAccountId}/adsets`, 'POST', payload);
}

async function main() {
  try {
    console.log('=== Iniciando inyección de pautas en modo BORRADOR (PAUSADO) ===\n');

    // 1. PPF
    const campPpf = await createCampaign('[Victory Cars] PPF - Mensajes WA');
    console.log(`✅ Campaña PPF creada. ID: ${campPpf.id}`);
    
    const adsetPpf = await createAdSet(campPpf.id, 'Conjunto - Público Amplio PPF (Bogotá)');
    console.log(`✅ Conjunto PPF creado. ID: ${adsetPpf.id}\n`);

    // 2. Detailing
    const campDet = await createCampaign('[Victory Cars] Detailing - Mensajes WA');
    console.log(`✅ Campaña Detailing creada. ID: ${campDet.id}`);
    
    const adsetDet = await createAdSet(campDet.id, 'Conjunto - Público Amplio Detailing (Bogotá)');
    console.log(`✅ Conjunto Detailing creado. ID: ${adsetDet.id}\n`);

    console.log('=== Proceso finalizado con éxito ===');
    console.log('Puedes revisar estas campañas en el Meta Ads Manager. Están en estado PAUSED.');
    
  } catch (e) {
    console.error('❌ Error al inyectar las campañas:', e);
  }
}

main();
