'use client';

import React, { useState, useEffect } from 'react';
import MarketingPlanBoard from '../../components/MarketingPlanBoard';
import { Loader2 } from 'lucide-react';
import { MetaAd, MetaCampaign } from '@/lib/metaClient';

export default function MarketingPlanPage() {
  const [mounted, setMounted] = useState(false);
  const [ads, setAds] = useState<MetaAd[]>([]);
  const [campaigns, setCampaigns] = useState<MetaCampaign[]>([]);
  const [realCreatives, setRealCreatives] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('victory_admin_token');
    const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

    try {
      // Fetch Ads, Campaigns and Insights
      const reqOptions = { headers, cache: 'no-store' as RequestCache };
      const [adsRes, campRes, insightsRes] = await Promise.all([
        fetch('/api/meta/ads', reqOptions),
        fetch('/api/meta/campaigns', reqOptions),
        fetch('/api/meta/insights', reqOptions),
      ]);

      if (insightsRes.ok) {
        const insightsData = await insightsRes.json();
        setInsights(insightsData);
      }

      if (adsRes.ok) {
        const adsData = await adsRes.json();
        setAds(adsData.ads || []);
      }
      if (campRes.ok) {
        const campData = await campRes.json();
        setCampaigns(campData.campaigns || []);
      }

      // Fetch Creatives & Instagram
      const [creativesRes, igRes] = await Promise.all([
        fetch('/api/meta/creatives', reqOptions),
        fetch('/api/meta/instagram', reqOptions)
      ]);

      let allCreatives: any[] = [];

      if (creativesRes.ok) {
        const creativesData = await creativesRes.json();
        if (creativesData && creativesData.data) {
          const victoryCarsCreatives = creativesData.data.filter((c: any) => 
            (c.thumbnail_url || c.image_url) &&
            (c.object_story_spec?.page_id === '107779549069255' || 
             c.instagram_actor_id === '17841460906674455')
          );
          allCreatives = [...allCreatives, ...victoryCarsCreatives];
        }
      }

      if (igRes.ok) {
        const igData = await igRes.json();
        if (igData && igData.data) {
          allCreatives = [...allCreatives, ...igData.data];
        }
      }

      // Filtrar duplicados por ID (si hay)
      const uniqueCreatives = Array.from(new Map(allCreatives.map(item => [item.id, item])).values());
      setRealCreatives(uniqueCreatives);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="shrink-0 bg-white/50 backdrop-blur-xl border border-apple-border p-6 rounded-3xl mb-6">
        <h1 className="text-2xl font-bold text-apple-text tracking-wide mb-2">Plan de Marketing</h1>
        <p className="text-apple-subtext text-sm">
          Visualiza y gestiona las diferentes fases de tu estrategia de pauta. 
          Clasifica el contenido, envíalo a testeo, y escala los anuncios ganadores.
        </p>
      </div>

      {loading ? (
        <div className="shrink-0 h-40 flex items-center justify-center text-apple-subtext text-sm border border-apple-border rounded-3xl bg-white/50">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Cargando Plan de Marketing...
        </div>
      ) : (
        <div className="flex-1">
          <MarketingPlanBoard creatives={realCreatives} ads={ads} campaigns={campaigns} insights={insights} />
        </div>
      )}
    </div>
  );
}
