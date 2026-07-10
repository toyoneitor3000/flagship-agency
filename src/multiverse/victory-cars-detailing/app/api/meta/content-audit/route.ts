import { NextResponse } from 'next/server';
import { getInstagramMedia, getInstagramInsights, InstagramMedia, InstagramInsights } from '@/lib/metaClient';

export interface AuditedPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink?: string;
  // Organic metrics
  likes: number;
  comments: number;
  saved: number;
  shares: number;
  reach: number;
  impressions: number;
  engagement: number;
  // Calculated scores
  engagementRate: number;
  pautaScore: number;
  tier: 'top' | 'mid' | 'low';
}

function calculatePautaScore(post: {
  likes: number;
  comments: number;
  saved: number;
  shares: number;
  reach: number;
  engagement: number;
}): number {
  // Weighted scoring formula:
  // 40% → Engagement Rate (likes + comments + saved / reach)
  // 30% → Saves (strongest purchase-intent signal)
  // 20% → Shares (virality signal)
  // 10% → Comments (conversation signal)
  
  const reach = post.reach || 1; // Avoid division by zero
  
  const engagementRate = ((post.likes + post.comments + post.saved) / reach) * 100;
  const savesNormalized = Math.min(post.saved / 10, 10); // Normalize: 100 saves = 10
  const sharesNormalized = Math.min(post.shares / 5, 10);  // Normalize: 50 shares = 10
  const commentsNormalized = Math.min(post.comments / 5, 10); // Normalize: 50 comments = 10
  
  const rawScore = (
    (Math.min(engagementRate, 10)) * 0.4 +
    savesNormalized * 0.3 +
    sharesNormalized * 0.2 +
    commentsNormalized * 0.1
  );
  
  return Math.round(Math.min(rawScore, 10) * 10) / 10; // 0 to 10, 1 decimal
}

export async function GET() {
  try {
    // 1. Get the last 50 Instagram posts
    const media = await getInstagramMedia(50);
    
    if (!media.length) {
      return NextResponse.json({ posts: [], message: 'No se encontraron publicaciones de Instagram.' });
    }

    // 2. For each post, get insights (with rate limiting to avoid API throttling)
    const auditedPosts: AuditedPost[] = [];
    
    for (const post of media) {
      let insights: InstagramInsights = { saved: 0, shares: 0, reach: 0, impressions: 0, engagement: 0 };
      
      try {
        insights = await getInstagramInsights(post.id);
      } catch (e) {
        console.warn(`Skipping insights for ${post.id}`);
      }

      const likes = post.like_count || 0;
      const comments = post.comments_count || 0;
      const saved = insights.saved || 0;
      const shares = insights.shares || 0;
      const reach = insights.reach || 1;
      const impressions = insights.impressions || 0;
      const engagement = insights.engagement || 0;
      
      const engagementRate = reach > 0 ? ((likes + comments + saved) / reach) * 100 : 0;
      const pautaScore = calculatePautaScore({ likes, comments, saved, shares, reach, engagement });
      
      let tier: 'top' | 'mid' | 'low' = 'low';
      if (pautaScore >= 7) tier = 'top';
      else if (pautaScore >= 4) tier = 'mid';
      
      auditedPosts.push({
        id: post.id,
        caption: post.caption,
        media_type: post.media_type,
        media_url: post.media_url,
        thumbnail_url: post.thumbnail_url,
        timestamp: post.timestamp,
        permalink: post.permalink,
        likes,
        comments,
        saved,
        shares,
        reach,
        impressions,
        engagement,
        engagementRate: Math.round(engagementRate * 100) / 100,
        pautaScore,
        tier,
      });
    }
    
    // 3. Sort by pautaScore descending
    auditedPosts.sort((a, b) => b.pautaScore - a.pautaScore);
    
    // 4. Stats summary
    const totalPosts = auditedPosts.length;
    const topPosts = auditedPosts.filter(p => p.tier === 'top').length;
    const midPosts = auditedPosts.filter(p => p.tier === 'mid').length;
    const lowPosts = auditedPosts.filter(p => p.tier === 'low').length;
    const avgScore = auditedPosts.reduce((sum, p) => sum + p.pautaScore, 0) / totalPosts;

    return NextResponse.json({
      posts: auditedPosts,
      stats: {
        total: totalPosts,
        top: topPosts,
        mid: midPosts,
        low: lowPosts,
        avgScore: Math.round(avgScore * 10) / 10,
      }
    });

  } catch (error: any) {
    console.error('Content Audit Error:', error);
    return NextResponse.json({ error: error.message || 'Error en la auditoría de contenido' }, { status: 500 });
  }
}
