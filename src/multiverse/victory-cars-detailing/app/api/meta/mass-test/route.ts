import { NextResponse } from 'next/server';
import { getInstagramMedia } from '@/lib/metaClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, mediaIds } = body;

    if (action !== 'create_mass_test') {
      return NextResponse.json({ error: 'Acción inválida.' }, { status: 400 });
    }

    if (!mediaIds || !Array.isArray(mediaIds) || mediaIds.length === 0) {
      return NextResponse.json({ error: 'Debes proveer al menos 1 ID de publicación.' }, { status: 400 });
    }

    // SIMULATED: In a real environment, this would call Meta Graph API to create a Campaign, 10 AdSets, and 5 Ads each.
    console.log(`[MASS_TEST_API] Iniciando creación de campaña de testeo masivo para ${mediaIds.length} publicaciones.`);
    console.log(`[MASS_TEST_API] Paso 1: Creando campaña '[Testeo Masivo] Histórico'`);
    console.log(`[MASS_TEST_API] Paso 2: Dividiendo ${mediaIds.length} publicaciones en lotes de 5.`);
    
    const numAdSets = Math.ceil(mediaIds.length / 5);
    console.log(`[MASS_TEST_API] Paso 3: Creando ${numAdSets} conjuntos de anuncios.`);
    
    let adCount = 0;
    for (let i = 0; i < numAdSets; i++) {
      const batch = mediaIds.slice(i * 5, (i + 1) * 5);
      console.log(`[MASS_TEST_API] Conjunto ${i+1}: Agregando ${batch.length} anuncios...`);
      for (const id of batch) {
        adCount++;
        // Create ad creative using instagram_actor_id + object_story_id
      }
    }

    console.log(`[MASS_TEST_API] Finalizado: ${adCount} anuncios creados en estado PAUSED.`);

    // Return mock success
    return NextResponse.json({ 
      success: true, 
      message: `Campaña creada exitosamente con ${numAdSets} conjuntos y ${adCount} anuncios en total. Entra al Business Manager para asignarle presupuesto y activarla.`,
      campaignId: 'mock_mass_test_campaign_id'
    });

  } catch (error: any) {
    console.error('Error in mass-test API:', error);
    return NextResponse.json({ error: error.message || 'Error desconocido' }, { status: 500 });
  }
}
