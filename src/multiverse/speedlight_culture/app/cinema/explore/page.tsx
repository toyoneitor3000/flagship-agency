"use client";

import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Compass, Play, ArrowLeft } from "lucide-react";
import { getCinemaFeed } from '@/app/actions/cinema';
import { SideNav } from '../components/SideNav';

// --- UTILITIES ---
const getCloudflareId = (url: string) => {
    if (!url) return null;
    const regExp = /(?:cloudflarestream\.com|videodelivery\.net)\/([a-zA-Z0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// --- SUB-COMPONENT: VIDEO GRID ITEM ---
function VideoGridItem({ video }: { video: any }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [avatarError, setAvatarError] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isHovered) {
            timer = setTimeout(() => setShowPreview(true), 300);
        } else {
            setShowPreview(false);
        }
        return () => clearTimeout(timer);
    }, [isHovered]);

    const cloudflareId = getCloudflareId(video.videoUrl);
    const youtubeId = getYoutubeId(video.videoUrl);

    // Logic to determine if we have a real provided poster
    const hasRealPoster = video.poster &&
        !video.poster.includes('placehold.co') &&
        !video.poster.includes('images.unsplash.com/photo-1503376763036');

    return (
        <Link
            href={`/cinema?video=${video.id}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative aspect-[4/5] bg-zinc-950 rounded-xl overflow-hidden border border-white/5 hover:border-[#FF9800]/50 transition-all duration-500 shadow-2xl"
        >
            {/* Background Layer: Real Thumbnail or Video Frame */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${showPreview ? 'opacity-0' : 'opacity-100'}`}>
                {hasRealPoster && !imgError ? (
                    <Image
                        src={video.poster}
                        alt={video.title}
                        fill
                        unoptimized={true}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={() => setImgError(true)}
                    />
                ) : cloudflareId ? (
                    <img
                        src={`https://videodelivery.net/${cloudflareId}/thumbnails/thumbnail.jpg?time=2s&height=600`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : youtubeId ? (
                    <img
                        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.src = `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
                        }}
                    />
                ) : (
                    /* NATIVE VIDEO FRAME AS POSTER (The most robust fallback) */
                    <video
                        src={video.videoUrl + "#t=0.5"}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        preload="metadata"
                        muted
                    />
                )}
            </div>

            {/* Video Preview On Hover */}
            {showPreview && (
                <div className="absolute inset-0 z-10 bg-black animate-in fade-in duration-500">
                    {cloudflareId ? (
                        <iframe
                            src={`https://iframe.videodelivery.net/${cloudflareId}?autoplay=true&muted=true&controls=false&loop=true&preload=auto`}
                            className="w-full h-full object-cover scale-[1.01]"
                            allow="autoplay; encrypted-media"
                        />
                    ) : youtubeId ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1`}
                            className="w-full h-full object-cover scale-[1.01]"
                        />
                    ) : (
                        <video
                            src={video.videoUrl}
                            muted
                            autoPlay
                            playsInline
                            loop
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/98 via-black/40 to-transparent z-20" />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-30 flex flex-col justify-end p-3 md:p-4">
                <h3 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-2 mb-2 group-hover:text-[#FF9800] transition-colors">
                    {video.title}
                </h3>

                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20 relative shrink-0 bg-zinc-800 flex items-center justify-center">
                        {!video.avatar || avatarError ? (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white/40">
                                <span className="text-[10px] font-bold">{(video.creator || "?").charAt(0).toUpperCase()}</span>
                            </div>
                        ) : (
                            <Image
                                src={video.avatar}
                                alt={video.creator}
                                fill
                                unoptimized={true}
                                className="object-cover"
                                onError={() => setAvatarError(true)}
                            />
                        )}
                    </div>
                    <span className="text-[11px] text-white/60 font-medium truncate">{video.creator}</span>
                </div>
            </div>

            {/* Play Badge */}
            <div className="absolute top-3 right-3 z-30 p-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-3 h-3 fill-white text-white" />
            </div>
        </Link>
    );
}

// --- MAIN PAGE COMPONENT ---
function ExploreContent() {
    const [videos, setVideos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'cinema' | 'social'>('social');
    const router = useRouter();

    useEffect(() => {
        const loadVideos = async () => {
            setIsLoading(true);
            try {
                const feed = await getCinemaFeed();
                const verticalVideos = (feed || []).filter((v: any) => v.format === 'vertical');
                setVideos(verticalVideos);
            } catch (error) {
                console.error("Error loading explore feed:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadVideos();
    }, []);

    const handleViewModeToggle = (mode: 'cinema' | 'social') => {
        setViewMode(mode);
        router.push(`/cinema?mode=${mode}`);
    };

    return (
        <div className="flex h-screen bg-[#060403] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <div className="hidden lg:block h-full shrink-0">
                <SideNav viewMode={viewMode} setViewMode={handleViewModeToggle} />
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-y-auto no-scrollbar bg-[#0D0805]">
                {/* Header */}
                <div className="sticky top-0 z-[100] bg-[#0D0805]/95 backdrop-blur-xl border-b border-white/5 px-4 md:px-12 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/cinema" className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <Compass className="w-7 h-7 text-[#FF9800]" />
                                    <h1 className="text-2xl font-black italic tracking-tighter uppercase font-oswald text-white">Explorar</h1>
                                </div>
                                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Discover Premium Content</p>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden">
                            <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-[3px] shadow-2xl">
                                <button
                                    onClick={() => handleViewModeToggle('social')}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${viewMode === 'social' ? 'bg-white text-black' : 'text-white/40'}`}
                                >
                                    Social
                                </button>
                                <button
                                    onClick={() => handleViewModeToggle('cinema')}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${viewMode === 'cinema' ? 'bg-[#FF9800] text-black' : 'text-white/40'}`}
                                >
                                    Films
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Content */}
                <div className="px-4 md:px-12 py-8">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <div className="w-12 h-12 border-2 border-white/10 rounded-full border-t-[#FF9800] animate-spin" />
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Sincronizando feed...</p>
                        </div>
                    ) : videos.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-6">
                            {videos.map((video) => (
                                <VideoGridItem key={video.id} video={video} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <Compass className="w-10 h-10 text-white/20" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">No hay videos disponibles</h2>
                            <p className="text-white/40 max-w-xs mx-auto text-sm">Vuelve más tarde para descubrir nuevo contenido.</p>
                        </div>
                    )}
                </div>

                <div className="h-32 shrink-0" />
            </main>
        </div>
    );
}

export default function ExplorePage() {
    return (
        <Suspense fallback={
            <div className="fixed inset-0 bg-[#0D0805] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#FF9800] rounded-full animate-spin border-t-transparent" />
            </div>
        }>
            <ExploreContent />
        </Suspense>
    );
}
