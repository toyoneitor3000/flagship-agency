const fs = require('fs');

async function clean() {
  const accountId = process.env.META_AD_ACCOUNT_ID;
  const token = process.env.META_USER_ACCESS_TOKEN;
  
  // Get all campaigns
  const campRes = await fetch(`https://graph.facebook.com/v22.0/act_${accountId}/campaigns?fields=id,name,status&access_token=${token}`);
  const campData = await campRes.json();
  
  for (const camp of campData.data) {
    if (camp.name.includes('Fase de Pruebas: Testeo Masivo')) {
      console.log('Deleting campaign:', camp.name, camp.id);
      await fetch(`https://graph.facebook.com/v22.0/${camp.id}?access_token=${token}`, { method: 'DELETE' });
    }
  }
  console.log('Cleanup done');
}
clean().catch(console.error);
