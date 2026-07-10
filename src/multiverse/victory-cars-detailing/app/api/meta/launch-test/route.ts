import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN = process.env.META_USER_ACCESS_TOKEN || '';
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID || '';
const PAGE_ID = '107779549069255'; // Victory Cars FanPage ID
const IG_ACTOR_ID = '17841460906674455';

const API_VERSION = 'v22.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

export async function POST(req: NextRequest) {
  try {
    const { category, copy, imageBase64 } = await req.json();

    if (!category || !copy || !imageBase64) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (category, copy, imageBase64)' }, { status: 400 });
    }

    if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) {
      return NextResponse.json({ error: 'Faltan las credenciales de Meta API' }, { status: 500 });
    }

    const formattedAccountId = AD_ACCOUNT_ID.startsWith('act_') ? AD_ACCOUNT_ID : `act_${AD_ACCOUNT_ID}`;

    // 1. Upload Image to Meta
    console.log('Subiendo imagen a Meta Ads...');
    // Base64 from frontend could look like: data:image/png;base64,iVBORw0KG...
    // We need just the raw base64 data to construct a Blob or Buffer, OR we can use the `bytes` field.
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const rawBase64 = matches ? matches[2] : imageBase64;

    const imgFormData = new FormData();
    imgFormData.append('bytes', rawBase64);
    imgFormData.append('access_token', ACCESS_TOKEN);

    const imageRes = await fetch(`${BASE_URL}/${formattedAccountId}/adimages`, {
      method: 'POST',
      body: imgFormData
    });
    
    const imageData = await imageRes.json();
    if (imageData.error) {
      throw new Error(`Error subiendo imagen: ${imageData.error.message}`);
    }

    // The key here is the hash, the JSON structure is usually { images: { bytes: { hash: "..." } } }
    const imageHash = imageData.images?.bytes?.hash;
    if (!imageHash) {
         throw new Error(`No se obtuvo el hash de la imagen. Response: ${JSON.stringify(imageData)}`);
    }
    console.log('Imagen subida. Hash:', imageHash);

    // 2. Create AdCreative
    console.log('Creando Ad Creative...');
    const creativePayload = {
      name: `Creative ${category} - ${new Date().getTime()}`,
      object_story_spec: {
        page_id: PAGE_ID,
        instagram_actor_id: IG_ACTOR_ID,
        link_data: {
          image_hash: imageHash,
          link: "https://wa.me/573214567890", // Example link, ideally we configure WhatsApp destination
          message: copy,
          call_to_action: {
            type: "LEARN_MORE"
          }
        }
      },
      access_token: ACCESS_TOKEN
    };

    const creativeRes = await fetch(`${BASE_URL}/${formattedAccountId}/adcreatives`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creativePayload)
    });
    
    const creativeData = await creativeRes.json();
    if (creativeData.error) {
      throw new Error(`Error creando Creative: ${creativeData.error.message}`);
    }
    const creativeId = creativeData.id;

    // 3. Find Campaign and AdSet based on category
    // For this prototype, we'll fetch existing campaigns and adsets and find the ones created by our script
    const adSetsRes = await fetch(`${BASE_URL}/${formattedAccountId}/adsets?fields=id,name,campaign{name}&access_token=${ACCESS_TOKEN}&limit=50`);
    const adSetsData = await adSetsRes.json();
    if (adSetsData.error) {
      throw new Error(`Error obteniendo AdSets: ${adSetsData.error.message}`);
    }

    // Filter adsets where the campaign name contains the category
    const targetAdSet = adSetsData.data.find((a: any) => 
      a.campaign && a.campaign.name && a.campaign.name.toUpperCase().includes(category.toUpperCase())
    );

    if (!targetAdSet) {
       // Si no encontramos un adset con ese nombre (por si el usuario no ha corrido el script), lanzamos error.
       throw new Error(`No se encontró un Conjunto de Anuncios / Campaña con la palabra "${category}". Asegúrate de ejecutar el script de creación de campañas primero.`);
    }

    const adSetId = targetAdSet.id;

    // 4. Create the Ad in PAUSED state
    console.log(`Creando Anuncio en AdSet ${adSetId}...`);
    const adPayload = {
      name: `Ad Testeo IA - ${category}`,
      adset_id: adSetId,
      creative: { creative_id: creativeId },
      status: 'PAUSED',
      access_token: ACCESS_TOKEN
    };

    const adRes = await fetch(`${BASE_URL}/${formattedAccountId}/ads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adPayload)
    });
    
    const adData = await adRes.json();
    if (adData.error) {
      throw new Error(`Error creando Anuncio: ${adData.error.message}`);
    }

    return NextResponse.json({ success: true, adId: adData.id, message: 'Anuncio enviado a Meta Ads en estado BORRADOR.' });

  } catch (error: any) {
    console.error('Launch Test Error:', error);
    return NextResponse.json({ error: error.message || 'Fallo en la publicación a Meta' }, { status: 500 });
  }
}
