import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const accountId = process.env.META_AD_ACCOUNT_ID;
  const token = process.env.META_USER_ACCESS_TOKEN;

  if (!accountId || !token) {
    return NextResponse.json({ error: 'Missing Meta credentials' }, { status: 500 });
  }

  try {
    const formattedAccountId = accountId.startsWith('act_') ? accountId : `act_${accountId}`;
    const res = await fetch(`https://graph.facebook.com/v22.0/${formattedAccountId}/adcreatives?fields=id,name,thumbnail_url,image_url,body,object_story_spec,effective_object_story_id,created_time&access_token=${token}&limit=50`, { cache: 'no-store' });
    const data = await res.json();
    
    if (data.data) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      data.data = data.data.filter((c: any) => c.created_time && new Date(c.created_time) >= thirtyDaysAgo);
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
