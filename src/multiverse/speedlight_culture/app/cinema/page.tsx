"use client";

import { useRef, useEffect, useState, Suspense } from 'react';
import { Gamepad2, ChevronDown, Play, Maximize, Volume2, VolumeX, Plus, TrendingUp, Flame, Film, Tv, Clock } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getCinemaFeed } from '@/app/actions/cinema';
import { useUi } from '@/app/context/UiContext';
import { useGamepad } from '@/app/hooks/useGamepad';
import { VideoPlayer } from './components/VideoPlayer';
import { SocialInterface } from './components/SocialInterface';
import { SideNav } from './components/SideNav';
import { FilmsNavigation } from './components/FilmsNavigation';


// ----------------------------------------------------------------------
// PAGE COMPONENT
// ----------------------------------------------------------------------
function CinemaSocialContent() {
    const searchParams = useSearchParams();
    const videoIdParam = searchParams.get('video');
    const [featuredPost, setFeaturedPost] = useState<any>(null);
    const [categories, setCategories] = useState<any>({});
    const [activeCategory, setActiveCategory] = useState('all');
    const [isMuted, setIsMuted] = useState(true);

    // State for View Mode ('cinema' or 'social')
    const [viewMode, setViewMode] = useState<'cinema' | 'social'>('social');
    const [activeMovie, setActiveMovie] = useState<any>(null); // For Cinema Modal
    const [activeSocialPost, setActiveSocialPost] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const initialScrollRef = useRef(false); // To prevent scroll loop


    // Context
    const { isUiVisible, resetIdleTimer, setIsSocialMode, toggleUiVisibility } = useUi();

    // Sync View Mode
    useEffect(() => {
        setIsSocialMode(viewMode === 'social');
    }, [viewMode, setIsSocialMode]);

    // Load Data
    useEffect(() => {
        const loadContent = async () => {
            setIsLoading(true);
            try {
                const feed = await getCinemaFeed() || [];

                // 2. FILTERING (With Smart Fallback)
                const processedFeed = feed; // Use 'feed' as the base for processing
                const horizontalFeed = processedFeed.filter((p: any) => p.format === 'horizontal');
                let verticalFeed = processedFeed.filter((p: any) => p.format === 'vertical');

                // FALLBACK: If no vertical videos exist (e.g. data migration issue), show EVERYTHING in social feed
                // preventing the "Black Screen / No Content" error.
                if (verticalFeed.length === 0 && processedFeed.length > 0) {
                    console.log("No vertical content found. Fallback to mixed feed.");
                    verticalFeed = processedFeed;
                }

                // Initial State Priority: Url Param -> Feed Content
                if (videoIdParam) {
                    const target = processedFeed.find((p: any) => p.id === videoIdParam);
                    if (target) {
                        if (target.format === 'vertical') {
                            setViewMode('social');
                            setActiveSocialPost(target);
                        } else {
                            setViewMode('cinema');
                            setActiveMovie(target);
                        }
                    } else if (verticalFeed.length > 0) setActiveSocialPost(verticalFeed[0]);
                } else if (verticalFeed.length > 0) {
                    setActiveSocialPost(verticalFeed[0]);
                }

                // Featured for Cinema Mode
                if (horizontalFeed.length > 0) setFeaturedPost(horizontalFeed[0]);
                else setFeaturedPost(feed[0]);

                setCategories({
                    trending: horizontalFeed.slice(0, 5),
                    originals: horizontalFeed.slice(2, 6),
                    builds: horizontalFeed.slice(0, 3),
                    horizontal: horizontalFeed,
                    vertical: verticalFeed
                });

            } catch (e) {
                console.error("Failed loading feed", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadContent();
    }, []);

    // Scroll to Video (Deep Link)
    // Scroll to Video (Deep Link) - PROTECTED FROM LOOPS
    useEffect(() => {
        if (viewMode === 'social' && !isLoading && !initialScrollRef.current) {
            if (videoIdParam) {
                setTimeout(() => {
                    const el = document.getElementById(`video-${videoIdParam}`);
                    if (el) el.scrollIntoView({ behavior: 'auto' });
                }, 500);
            }
            initialScrollRef.current = true;
        }
    }, [videoIdParam, viewMode, isLoading]);

    // Update URL on Scroll matches activeSocialPost
    useEffect(() => {
        if (activeSocialPost && viewMode === 'social') {
            const newUrl = `?video=${activeSocialPost.id}`;
            window.history.replaceState(null, '', newUrl);
        }
    }, [activeSocialPost, viewMode]);

    // GLOBAL INTERSECTION OBSERVER (Fixes iOS flickering)
    useEffect(() => {
        if (viewMode !== 'social') return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-video-id');
                    const post = categories.vertical?.find((p: any) => p.id === id);
                    if (post) setActiveSocialPost(post);
                }
            });
        }, { threshold: 0.6 });

        const items = document.querySelectorAll('.cinema-feed-item');
        items.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [viewMode, categories.vertical]);

    // Keyboard & Gamepad
    const socialFeedRef = useRef<HTMLDivElement>(null);
    const { isConnected: isGamepadConnected } = useGamepad({
        onDown: () => socialFeedRef.current?.scrollBy({ top: window.innerHeight, behavior: 'smooth' }),
        onUp: () => socialFeedRef.current?.scrollBy({ top: -window.innerHeight, behavior: 'smooth' }),
        onSelect: () => setIsMuted(p => !p),
        onBack: () => activeMovie ? setActiveMovie(null) : setViewMode('social')
    });

    useEffect(() => {
        if (viewMode !== 'social') return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') socialFeedRef.current?.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            if (e.key === 'ArrowUp') socialFeedRef.current?.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [viewMode]);

    // Auto-Scroll Handler
    const handleVideoEnd = (currentId: string) => {
        if (!categories.vertical) return;
        const idx = categories.vertical.findIndex((p: any) => p.id === currentId);
        if (idx !== -1 && idx < categories.vertical.length - 1) {
            const nextPost = categories.vertical[idx + 1];
            const el = document.getElementById(`video-${nextPost.id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div className="bg-[#0D0805] min-h-screen w-full relative font-sans text-white overflow-hidden selection:bg-[#FF9800] selection:text-black">

            {viewMode === 'social' ? (
                /* SOCIAL SIDEBAR (Desktop Only) */
                <div className="hidden md:block fixed left-0 top-0 bottom-0 z-[150] h-full">
                    <SideNav viewMode={viewMode} setViewMode={setViewMode} />
                </div>
            ) : (
                /* FILMS NAVIGATION (Netflix Style) */
                <FilmsNavigation
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            )}

            {/* HEADER TOGGLE (Mobile Only - Persistent) */}
            <div className={`fixed top-[65px] left-0 right-0 z-[140] transition-all duration-500 md:hidden ${isUiVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-full px-4 flex items-center justify-center py-4 relative">
                    <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-[3px] shadow-2xl">
                        <button onClick={() => setViewMode('social')} className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${viewMode === 'social' ? 'bg-white text-black' : 'text-white/40'}`}>Social</button>
                        <button onClick={() => setViewMode('cinema')} className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${viewMode === 'cinema' ? 'bg-[#FF9800] text-black' : 'text-white/40'}`}>Films</button>
                    </div>
                </div>
            </div>

            {/* CINEMA MODE */}
            {viewMode === 'cinema' && (
                <div className="animate-in fade-in duration-500 md:pl-[80px]">
                    {/* BREADCRUMBS & TOP NAV HEADER SPACE */}
                    <div className="pt-28 px-4 md:px-12 flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                            <Link href="/" className="hover:text-[#FF9800] transition-colors">Speedlight</Link>
                            <span>/</span>
                            <span className="text-[#FF9800]">Cinema</span>
                            <span>/</span>
                            <span className="text-white/80">Films</span>
                        </div>
                    </div>

                    <div className="w-full max-w-[1700px] mx-auto relative group aspect-video max-h-[80vh] bg-black shadow-2xl rounded-3xl overflow-hidden border border-white/5">
                        {featuredPost && (
                            <AmbientCinemaPlayer
                                post={featuredPost}
                                isMuted={isMuted}
                                toggleMute={() => setIsMuted(!isMuted)}
                                onOpenFull={() => setActiveMovie(featuredPost)}
                            />
                        )}
                    </div>

                    <div className="relative z-10 bg-[#0D0805] pb-32 pt-16 min-h-screen px-4 md:px-12 space-y-20">
                        {/* Dynamic Rows based on Active Category */}
                        {activeCategory === 'all' && (
                            <>
                                <CategoryRow title="Tendencias Globales" posts={categories.trending} onPostClick={setActiveMovie} />
                                <CategoryRow title="Speedlight Shorts" posts={categories.vertical} onPostClick={setActiveMovie} isVertical />
                                <CategoryRow title="Speedlight Originals" posts={categories.originals} onPostClick={setActiveMovie} />
                                <CategoryRow title="Documentales de Builds" posts={categories.builds} onPostClick={setActiveMovie} />
                            </>
                        )}

                        {activeCategory === 'trending' && (
                            <CategoryRow title="Tendencias" posts={categories.trending} onPostClick={setActiveMovie} />
                        )}

                        {activeCategory === 'Originals' && (
                            <CategoryRow title="Speedlight Originals" posts={categories.originals} onPostClick={setActiveMovie} />
                        )}

                        {activeCategory === 'Películas' && (
                            <CategoryRow title="Películas" posts={(categories.horizontal || []).filter((p: any) => p.category === 'Películas')} onPostClick={setActiveMovie} />
                        )}

                        {activeCategory === 'Series' && (
                            <CategoryRow title="Series" posts={(categories.horizontal || []).filter((p: any) => p.category === 'Series')} onPostClick={setActiveMovie} />
                        )}

                        {activeCategory === 'mylist' && (
                            <div className="h-[40vh] flex flex-col items-center justify-center text-white/20">
                                <Plus className="w-12 h-12 mb-4" />
                                <p className="font-bold uppercase tracking-widest text-sm">Tu lista está vacía</p>
                                <p className="text-xs normal-case mt-2">Agrega contenido para verlo aquí tarde.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* SOCIAL MODE */}
            {viewMode === 'social' && (
                <div className="fixed inset-0 z-10 bg-black animate-in slide-in-from-bottom-10 duration-500 md:pl-[280px]">

                    {/* MAIN FEED AREA - spans full viewport, video centered in full screen */}
                    <div className="absolute inset-0 h-full">
                        {/* Fixed UI Overlay Wrapper */}
                        <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ${isUiVisible ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90" />
                        </div>

                        {/* GLOBAL SOCIAL INTERFACE (FIXED OVERLAY) - centered in full viewport */}
                        {activeSocialPost && (
                            <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-full md:max-w-[calc(100vh*9/16)] z-50 pointer-events-none transition-opacity duration-300 pb-[105px] md:pb-[115px] ${isUiVisible ? 'opacity-100' : 'opacity-0'}`}>
                                {/* Nav buttons just outside the right edge of the video - DESKTOP ONLY */}
                                <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+10px)] flex-col gap-3 pointer-events-auto">
                                    <button
                                        onClick={() => socialFeedRef.current?.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}
                                        className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                                    </button>
                                    <button
                                        onClick={() => socialFeedRef.current?.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                                        className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                </div>
                                <SocialInterface
                                    post={activeSocialPost}
                                    isMuted={isMuted}
                                    toggleMute={() => setIsMuted(!isMuted)}
                                    onOpenFull={() => { }}
                                    toggleUiVisibility={toggleUiVisibility}
                                />
                            </div>
                        )}

                        <div
                            ref={socialFeedRef}
                            className="h-full w-full overflow-y-scroll snap-y snap-mandatory snap-always overscroll-contain no-scrollbar"
                            onMouseMove={resetIdleTimer} onTouchStart={resetIdleTimer} onClick={resetIdleTimer}
                        >
                            {(categories.vertical || []).map((post: any) => (
                                <div
                                    key={post.id}
                                    id={`video-${post.id}`}
                                    data-video-id={post.id}
                                    className="cinema-feed-item w-full h-full snap-start snap-always relative border-b border-white/5 flex items-center justify-center bg-black"
                                >
                                    {/* Center video: Bleed 100.5vw on mobile to kill the vertical line, aspect-[9/16] on desktop */}
                                    <div className="h-full w-[100.5vw] md:w-auto md:aspect-[9/16] max-w-none md:max-w-full relative overflow-hidden bg-transparent -left-[0.25vw] md:left-0">
                                        <VideoPlayer
                                            post={post}
                                            isFeedMode={true}
                                            isActive={activeSocialPost?.id === post.id}
                                            isMuted={isMuted}
                                            toggleMute={() => setIsMuted(!isMuted)}
                                            onVideoEnd={() => handleVideoEnd(post.id)}
                                        />
                                    </div>
                                </div>
                            ))}

                            {!isLoading && (!categories.vertical || categories.vertical.length === 0) && (
                                <div className="h-full flex items-center justify-center text-white/50">No hay contenido vertical aún.</div>
                            )}
                        </div>
                    </div>
                </div>
            )
            }
            {/* IMMERSIVE MODAL (For Cinema Mode Clicks) */}
            {
                activeMovie && viewMode === 'cinema' && (
                    <div className="fixed inset-0 z-[200] bg-black">
                        <button className="absolute top-4 right-4 z-50 text-white" onClick={() => setActiveMovie(null)}>Close</button>
                        <VideoPlayer
                            post={activeMovie}
                            isFeedMode={false}
                            isMuted={isMuted}
                            toggleMute={() => setIsMuted(!isMuted)}
                        />
                    </div>
                )
            }

        </div >
    );
}
// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function AmbientCinemaPlayer({ post, isMuted, toggleMute, onOpenFull }: any) {
    // Ambient Blur Layer only
    return (
        <div className="relative w-full h-full overflow-hidden bg-black group">
            {/* Featured Poster Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image src={post.poster || post.thumbnail_url} alt={post.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#FF9800] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">Featured</span>
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Speedlight Original</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 drop-shadow-2xl font-oswald text-white leading-[0.9]">
                    {post.title}
                </h2>
                <p className="text-white/60 text-sm md:text-lg mb-8 line-clamp-3 max-w-xl font-medium">
                    {post.description || "Descubre la adrenalina y el arte de la cultura Speedlight en este exclusivo documental cinematográfico."}
                </p>
                <div className="flex items-center gap-4">
                    <button onClick={onOpenFull} className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase flex items-center gap-2 hover:bg-[#FF9800] transition-all hover:scale-105 active:scale-95 shadow-xl">
                        <Play className="w-5 h-5 fill-current" /> Reproducir
                    </button>
                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-xl font-bold uppercase hover:bg-white/20 transition-all">
                        Más Información
                    </button>
                </div>
            </div>

            {/* Mute Toggle */}
            <button
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="absolute bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-all text-white"
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
        </div>
    )
}


function CategoryRow({ title, posts, onPostClick, isVertical }: any) {
    if (!posts?.length) return null;
    return (
        <div className="space-y-4 group px-2">
            <div className="flex items-center justify-between pr-4">
                <h3 className="text-white/90 font-black text-xl md:text-2xl flex items-center gap-3 font-oswald tracking-tighter uppercase border-l-4 border-[#FF9800] pl-4">
                    {title}
                </h3>
                <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-[#FF9800] transition-colors">Ver Todo</button>
            </div>

            <div className="flex gap-3 md:gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {posts.map((post: any) => (
                    <div
                        key={post.id}
                        onClick={() => onPostClick(post)}
                        className={`flex-none ${isVertical ? 'w-[160px] md:w-[220px] aspect-[2/3]' : 'w-[240px] md:w-[400px] aspect-video'} relative rounded-xl overflow-hidden bg-neutral-900 cursor-pointer transform hover:scale-[1.05] hover:z-20 transition-all duration-500 border border-white/5 hover:border-[#FF9800]/50 shadow-2xl group/card`}
                    >
                        <Image src={post.poster || post.thumbnail_url || "/placeholder-cinema.jpg"} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover/card:scale-110" unoptimized />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover/card:opacity-100" />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                            <div className="w-12 h-12 rounded-full bg-[#FF9800] flex items-center justify-center shadow-2xl scale-75 group-hover/card:scale-100 transition-transform duration-500">
                                <Play className="w-6 h-6 fill-black text-black ml-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h4 className="text-white font-bold text-sm md:text-base leading-tight mb-1 line-clamp-1 group-hover/card:text-[#FF9800] transition-colors">{post.title}</h4>
                            <div className="flex items-center gap-2 opacity-60 group-hover/card:opacity-100 transition-opacity">
                                <span className="text-[10px] font-bold text-[#FF9800] uppercase tracking-tighter">HD 4K</span>
                                <span className="text-[10px] text-zinc-400 font-medium">{post.creator || 'Speedlight'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function CinemaSocialPage() {
    return (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#FF9800] rounded-full animate-spin" /></div>}>
            <CinemaSocialContent />
        </Suspense>
    );
}












