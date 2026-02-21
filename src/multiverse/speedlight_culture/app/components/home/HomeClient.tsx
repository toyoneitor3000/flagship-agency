"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";

import { Wrench, Play, ChevronRight, Zap, Loader2 } from "lucide-react";
import { AdFeedCard } from "@/app/components/AdBanners";
import { useLanguage } from "@/app/context/LanguageContext";
import HomeIntro from "@/app/components/home/HomeIntro";
import FeedCard from "@/app/components/feed/FeedCard";
import LoginRequiredModal from "@/app/components/auth/LoginRequiredModal";
import { getCinemaFeed } from "@/app/actions/cinema";

interface HomeClientProps {
    initialUser: any; // User type from Better-Auth
    initialFeatured: any[];
    initialFeed: any[];
}

export default function HomeClient({ initialUser, initialFeatured, initialFeed }: HomeClientProps) {
    const router = useRouter();

    // Use Better-Auth hook
    const { data: session, isPending: isAuthPending } = useSession();

    // Determine current user: either from client session (authoritative) or initial props
    // Note: session?.user is likely more up to date on client
    const user = session?.user || initialUser;
    const currentUserId = user?.id;

    const [feedItems] = useState<any[]>(initialFeed);
    const [featuredItems] = useState<any[]>(initialFeatured);
    const [guestMode, setGuestMode] = useState(false);

    // INTRO LOGIC STATE
    const [showIntro, setShowIntro] = useState(false);
    const [isCheckingIntro, setIsCheckingIntro] = useState(true); // Start true to prevent flash
    const { language } = useLanguage();

    const t_home = {
        es: {
            featured: "Máquinas Destacadas",
            viewAll: "Ver todo",
            latest: "Última Actividad",
            empty: "El feed está tranquilo hoy...",
            project: "PROYECTO",
            gallery: "GALERÍA",
            marketplace: "MARKETPLACE",
            seller: "Vendedor",
            builder: "Constructor",
            photographer: "Fotógrafo",
            untitled: "Sin título",
            play: "Ver",
            ago: "hace"
        },
        en: {
            featured: "Featured Machines",
            viewAll: "View All",
            latest: "Latest Activity",
            empty: "The feed is quiet today...",
            project: "PROJECT",
            gallery: "GALLERY",
            marketplace: "MARKETPLACE",
            seller: "Seller",
            builder: "Builder",
            photographer: "Photographer",
            untitled: "Untitled",
            play: "Play",
            ago: "ago"
        }
    };

    const labels = t_home[language];

    // Logic to determine if we should show Intro
    useEffect(() => {
        // If we have a user, never show intro
        if (user) {
            setShowIntro(false);
            setIsCheckingIntro(false);
            return;
        }

        // If no user, check session storage (guest mode previously accepted)
        const isSessionActive = sessionStorage.getItem('speedlight_session_active');

        // If not checking auth anymore and still no user...
        if (!isAuthPending) {
            if (!isSessionActive) {
                setShowIntro(true);
            } else {
                setShowIntro(false);
            }
            setIsCheckingIntro(false);
        }
    }, [user, isAuthPending]);


    // No need to fetch feed client-side since it's now done Server-Side


    const timeAgo = (date: Date) => {
        if (!date) return '';
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let value = 0;
        let unit = "";
        if (seconds < 60) return language === 'es' ? "ahora" : "now";
        if (seconds < 3600) { value = Math.floor(seconds / 60); unit = 'm'; }
        else if (seconds < 86400) { value = Math.floor(seconds / 3600); unit = 'h'; }
        else if (seconds < 2592000) { value = Math.floor(seconds / 86400); unit = 'd'; }
        else { value = Math.floor(seconds / 2592000); unit = 'mo'; }
        return `${value}${unit}`;
    };

    const handleEnterApp = () => {
        sessionStorage.setItem('speedlight_session_active', 'true');
        setShowIntro(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSignUp = () => {
        router.push('/sign-up');
    };

    // If we are still strictly checking initial auth state (pending), show nothing or loader?
    // We opt to show the loader only if it's the very first load and we have no idea.
    // But strictly speaking, if `user` is present, `isAuthPending` doesn't matter much for display.
    // Warning: `isAuthPending` from better-auth might be true initially even if we have `initialUser`.
    // So trigger logic:

    const shouldShowLoader = isCheckingIntro;

    if (shouldShowLoader) {
        return (
            <div className="flex justify-center items-center pb-20 pt-20 h-screen bg-black">
                <Loader2 className="w-8 h-8 text-[#FF9800] animate-spin" />
            </div>
        );
    }

    if (showIntro) {
        return <HomeIntro onEnterApp={handleEnterApp} onSignUp={handleSignUp} featuredItems={featuredItems} recentActivity={feedItems} isLoggedIn={!!currentUserId} />;
    }

    return (
        <div className="w-full max-w-[1600px] mx-auto min-h-screen pb-20 pt-20 overflow-x-hidden px-4 md:px-8">

            <>
                {/* COMPACT FEATURED SECTION - Links directly to projects */}
                {featuredItems.length > 0 && (
                    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-4 bg-[#FF9800] rounded-sm shadow-[0_0_8px_#FF9800]"></span>
                            <h2 className="text-[#FF9800] text-sm font-bold font-oswald uppercase tracking-widest flex items-center gap-2">
                                {labels.featured}
                            </h2>
                        </div>

                        <Link href="/projects" className="block relative w-full h-40 md:h-48 rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                            {featuredItems[0].content?.image ? (
                                <Image
                                    src={featuredItems[0].content.image}
                                    alt="Featured Projects"
                                    fill
                                    sizes="100vw"
                                    priority={true}
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#1e1e1e] to-black flex items-center justify-center">
                                    <Wrench className="text-white/10 w-12 h-12" />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0805]/90 via-[#0D0805]/50 to-transparent"></div>

                            <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
                                <div className="max-w-md">
                                    <h3 className="font-oswald font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-2 leading-tight uppercase group-hover:text-[#FF9800] transition-colors">{featuredItems[0].content.title}</h3>
                                    <p className="text-[#F5E6D3]/60 text-xs md:text-sm font-roboto-mono uppercase tracking-widest">{labels.viewAll} / Proyectos</p>
                                </div>

                                <div className="hidden md:flex shrink-0 w-12 h-12 bg-[#FF9800]/20 backdrop-blur-md rounded-full border border-[#FF9800]/50 items-center justify-center group-hover:bg-[#FF9800] group-hover:text-black transition-all duration-300">
                                    <ChevronRight className="w-6 h-6 text-[#FF9800] group-hover:text-black" />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}


                {/* MAIN FEED MASONRY GRID */}
                <div className="space-y-8">
                    <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-2">
                        <Zap className="w-4 h-4 text-[#FF9800]" />
                        <h2 className="text-white text-sm font-bold uppercase tracking-[0.2em] font-oswald">{labels.latest}</h2>
                    </div>

                    {feedItems.length === 0 ? (
                        <div className="p-12 text-center text-white/30 border border-white/5 rounded-2xl bg-[#0A0A0A]">
                            <p>{labels.empty}</p>
                        </div>
                    ) : (
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                            {feedItems.map((item, idx) => {
                                if (item.type === 'ad') {
                                    return (
                                        <div key={item.id} className="break-inside-avoid mb-6 rounded-3xl overflow-hidden shadow-2xl border border-white/5 mx-[-10px] md:mx-0 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards" style={{ animationDelay: `${(idx % 10) * 100}ms` }}>
                                            <AdFeedCard data={item.data} />
                                        </div>
                                    );
                                }

                                return (
                                    <div key={item.uniqueId} className="break-inside-avoid mb-6 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards" style={{ animationDelay: `${(idx % 10) * 100}ms` }}>
                                        <FeedCard
                                            item={item}
                                            labels={labels}
                                            currentUserId={currentUserId}
                                            timeAgo={timeAgo}
                                            onRequireAuth={() => setGuestMode(false)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* End of Feed Spacer */}
                    <div className="h-32 flex flex-col items-center justify-center text-white/20 text-xs uppercase tracking-widest gap-2 opacity-50">
                        <span className="font-oswald">End of Transmission</span>
                        <span className="text-[10px] normal-case tracking-normal font-roboto-mono">
                            Speedlight Culture
                            <span className="mx-2 text-[#FF9800]">•</span>
                            v1.0
                        </span>
                    </div>
                </div>
            </>

            <LoginRequiredModal
                isOpen={!showIntro && !currentUserId && !guestMode}
                onClose={() => setGuestMode(true)}
            />
        </div>
    );
}
