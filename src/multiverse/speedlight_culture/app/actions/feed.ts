'use server';

import { createClient } from "@/app/utils/supabase/server";
import { getCinemaFeed } from "@/app/actions/cinema";
import { getAdByType } from "@/app/data/ads";

export async function getHomeFeed(userId?: string) {
    const supabase = await createClient();

    const getStats = async (id: string, type: string) => {
        try {
            const { count: likesCount } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('target_id', id).eq('target_type', type);
            const { count: commentsCount } = await supabase.from('comments').select('*', { count: 'exact', head: true }).eq('target_id', id).eq('target_type', type);

            let isLiked = false;
            if (userId) {
                const { data } = await supabase.from('likes').select('id').eq('target_id', id).eq('target_type', type).eq('user_id', userId).single();
                isLiked = !!data;
            }
            return { likes: likesCount || 0, comments: commentsCount || 0, isLiked };
        } catch (err) {
            return { likes: 0, comments: 0, isLiked: false };
        }
    };

    try {
        // Run main queries in parallel
        const [
            { data: projects },
            { data: albums },
            { data: market },
            videos,
            { data: articles },
            { data: events },
            { data: workshops }
        ] = await Promise.all([
            // 1. Projects
            supabase
                .from('projects')
                .select('id, title, description, cover_image, created_at, profiles(id, full_name, avatar_url)')
                .order('created_at', { ascending: false })
                .limit(10),
            // 2. Albums
            supabase
                .from('gallery_albums')
                .select('id, title, cover_url, created_at, user_id')
                .order('created_at', { ascending: false })
                .limit(5),
            // 3. Marketplace
            supabase
                .from('marketplace_listings')
                .select('id, title, description, images, price, created_at, profile_id')
                .order('created_at', { ascending: false })
                .limit(5),
            // 4. Videos
            getCinemaFeed(),
            // 5. Articles
            supabase
                .from('articles')
                .select('id, title, summary, content, cover_image, category, created_at, author_id')
                .eq('published', true)
                .order('created_at', { ascending: false })
                .limit(5),
            // 6. Events
            supabase
                .from('events')
                .select('id, title, date_text, location, description, image, type, created_at, user_id')
                .order('created_at', { ascending: false })
                .limit(5),
            // 7. Workshops
            supabase
                .from('profiles')
                .select('id, full_name, avatar_url, business_category, custom_links, bio')
                .eq('account_type', 'business')
                .limit(3)
        ]);

        // Process Videos separately as they need getStats
        const videoPromises = videos.map(async (v: any) => {
            const type = v.format === 'vertical' ? 'social' : 'cinema';
            const stats = await getStats(v.id, type);

            return {
                id: v.id,
                uniqueId: `vid_${v.id}`,
                type: type,
                date: new Date(v.created_at || Date.now()),
                user: { id: null, name: v.creator, avatar: v.avatar },
                content: { title: v.title, text: v.description, image: v.poster, video_poster: v.poster, video: v.videoUrl },
                stats
            };
        });
        const normalizedVideos = await Promise.all(videoPromises);

        // --- ENRICHMENT helper ---
        const enrichUsers = async (rawItems: any[], idField: string) => {
            if (!rawItems || rawItems.length === 0) return [];
            const userIds = [...new Set(rawItems.map(i => i[idField]).filter(Boolean))];
            if (userIds.length === 0) return rawItems;
            const { data: users } = await supabase.from('profiles').select('id, full_name, avatar_url').in('id', userIds);
            const userMap = new Map(users?.map(u => [u.id, u]) || []);
            return rawItems.map(i => ({
                ...i,
                profiles: userMap.get(i[idField]) || { full_name: 'Usuario', avatar_url: null, id: i[idField] }
            }));
        };

        const [albumWithAuthors, marketWithAuthors, articlesWithAuthors, eventsWithAuthors] = await Promise.all([
            enrichUsers(albums || [], 'user_id'),
            enrichUsers(market || [], 'profile_id'),
            enrichUsers(articles || [], 'author_id'),
            enrichUsers(events || [], 'user_id')
        ]);

        // --- NORMALIZE CONTENT ---
        const featuredCandidates = projects ? projects.filter(p => p.cover_image) : [];
        const featuredRaw = featuredCandidates.slice(0, 5);
        const featuredIds = new Set(featuredRaw.map(p => p.id));
        const feedProjects = projects ? projects.filter(p => !featuredIds.has(p.id)) : [];

        const featured: any[] = [];
        await Promise.all(featuredRaw.map(async (p) => {
            const stats = await getStats(p.id, 'project');
            featured.push({
                id: p.id, uniqueId: `feat_${p.id}`, type: 'project', date: new Date(p.created_at),
                user: { id: (p.profiles as any)?.id, name: (p.profiles as any)?.full_name, avatar: (p.profiles as any)?.avatar_url },
                content: { title: p.title, text: p.description, image: p.cover_image },
                stats
            });
        }));

        const items: any[] = [];
        const pushItem = async (raw: any, type: string, mapFn: any) => {
            const stats = await getStats(raw.id, type);
            items.push({ ...mapFn(raw), stats });
        };

        await Promise.all([
            ...feedProjects.map(p => pushItem(p, 'project', (x: any) => ({
                id: x.id, uniqueId: `proj_${x.id}`, type: 'project', date: new Date(x.created_at),
                user: { id: x.profiles?.id, name: x.profiles?.full_name, avatar: x.profiles?.avatar_url },
                content: { title: x.title, text: x.description, image: x.cover_image }
            }))),
            ...albumWithAuthors.map(a => pushItem(a, 'gallery', (x: any) => ({
                id: x.id, uniqueId: `album_${x.id}`, type: 'gallery', date: new Date(x.created_at),
                user: { id: x.profiles?.id, name: x.profiles?.full_name, avatar: x.profiles?.avatar_url },
                content: { title: x.title, text: 'Álbum Fotográfico', image: x.cover_url }
            }))),
            ...marketWithAuthors.map(m => pushItem(m, 'marketplace', (x: any) => ({
                id: x.id, uniqueId: `market_${x.id}`, type: 'marketplace', date: new Date(x.created_at),
                user: { id: x.profiles?.id, name: x.profiles?.full_name, avatar: x.profiles?.avatar_url },
                content: { title: x.title, text: `$${x.price?.toLocaleString()}`, image: x.images?.[0] }
            }))),
            ...articlesWithAuthors.map(a => pushItem(a, 'article', (x: any) => ({
                id: x.id, uniqueId: `art_${x.id}`, type: 'article', date: new Date(x.created_at),
                user: { id: x.profiles?.id, name: x.profiles?.full_name, avatar: x.profiles?.avatar_url },
                content: { title: x.title, text: x.summary, image: x.cover_image }
            }))),
            ...eventsWithAuthors.map(e => pushItem(e, 'event', (x: any) => ({
                id: x.id, uniqueId: `evt_${x.id}`, type: 'event', date: new Date(x.created_at),
                user: { id: x.profiles?.id, name: x.profiles?.full_name, avatar: x.profiles?.avatar_url },
                content: { title: x.title, text: `${x.date_text} • ${x.location}`, image: x.image, description: x.description }
            }))),
            ...(workshops || []).map(w => pushItem(w, 'workshop', (x: any) => ({
                id: x.id, uniqueId: `workshop_${x.id}`, type: 'workshop', date: new Date(),
                user: { id: x.id, name: x.full_name, avatar: x.avatar_url },
                content: { title: x.full_name, text: x.bio || 'Taller Certificado', image: x.avatar_url }
            })))
        ]);

        items.push(...normalizedVideos);
        items.sort((a, b) => b.date.getTime() - a.date.getTime());

        // STRICT: Only one latest item per type
        const uniqueItems: any[] = [];
        const seenTypes = new Set<string>();
        for (const item of items) {
            if (!seenTypes.has(item.type)) {
                seenTypes.add(item.type);
                uniqueItems.push(item);
            }
        }

        items.length = 0;
        items.push(...uniqueItems);

        const feedAd = getAdByType('feed_card');
        if (items.length > 2 && feedAd) {
            items.splice(2, 0, { id: 'native_ad_1', uniqueId: 'native_ad_1', type: 'ad', data: feedAd, date: new Date() });
        }

        return { featured, items };
    } catch (error) {
        console.error("Error loading feed server-side:", error);
        return { featured: [], items: [] };
    }
}
