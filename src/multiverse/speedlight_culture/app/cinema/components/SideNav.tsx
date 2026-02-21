"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Home,
    Compass,
    UserCircle2,
    Users,
    Video,
    MessageCircle,
    Bell,
    PlusSquare,
    User,
    MoreHorizontal,
    Search,
    List
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";
import { useEffect, useState } from "react";
import { getFollowingUsers } from "@/app/actions/social";

export function SideNav() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [following, setFollowing] = useState<any[]>([]);

    useEffect(() => {
        if (session?.user) {
            getFollowingUsers().then(res => {
                if (res.success && res.users) {
                    setFollowing(res.users);
                }
            });
        }
    }, [session?.user]);

    const activeRoute = (path: string) => pathname === path;
    const [profileHref, setProfileHref] = useState('/profile');

    useEffect(() => {
        if (session?.user?.id) {
            setProfileHref(`/profile/${session.user.id}`);
        }
    }, [session?.user?.id]);

    return (
        <aside className="w-[280px] h-full bg-black border-r border-white/5 flex flex-col pt-4 overflow-y-auto hidden md:flex font-sans">

            {/* Logo */}
            <div className="px-5 mb-6">
                <Link href="/">
                    <Image src="/logonavbar.png" alt="Speedlight" width={140} height={40} className="object-contain" />
                </Link>
            </div>

            {/* Search Bar */}
            <div className="px-5 mb-6">
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2 hover:bg-white/15 transition-colors cursor-text border border-transparent focus-within:border-white/20">
                    <Search className="w-4 h-4 text-white/50 shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="bg-transparent text-white text-[15px] outline-none w-full ml-3 placeholder:text-white/50"
                    />
                </div>
            </div>

            {/* Main Nav Links */}
            <nav className="flex flex-col px-2 gap-1 mb-6">
                <NavLink href="/cinema" icon={<Home className="w-[26px] h-[26px] fill-[#FF9800]" />} label="Para ti" active={activeRoute('/cinema') || activeRoute('/')} />
                <NavLink href="/cinema/explore" icon={<Compass className="w-[26px] h-[26px]" />} label="Explorar" active={activeRoute('/cinema/explore')} />
                <NavLink href="/cinema/following" icon={<UserCircle2 className="w-[26px] h-[26px]" />} label="Siguiendo" active={activeRoute('/cinema/following')} />
                <NavLink href="/friends" icon={<Users className="w-[26px] h-[26px]" />} label="Friends" active={activeRoute('/friends')} />
                <NavLink href="/live" icon={<Video className="w-[26px] h-[26px]" />} label="LIVE" hasRing active={activeRoute('/live')} />
            </nav>

            {/* User Nav Links */}
            <nav className="flex flex-col px-2 gap-1 mb-6 border-b border-white/10 pb-6">
                <NavLink href="/messages" icon={<MessageCircle className="w-[26px] h-[26px]" />} label="Mensajes" active={activeRoute('/messages')} />
                <NavLink href="/notifications" icon={<Bell className="w-[26px] h-[26px]" />} label="Actividad" active={activeRoute('/notifications')} />
                <NavLink href="/upload" icon={<PlusSquare className="w-[26px] h-[26px]" />} label="Cargar" active={activeRoute('/upload')} />

                {session?.user ? (
                    <NavLink
                        href={profileHref}
                        icon={<User className="w-[26px] h-[26px]" />}
                        label="Perfil"
                        avatar={session.user.image || "/camilo.jpg"}
                        active={pathname.startsWith('/profile')}
                    />
                ) : (
                    <NavLink href="/profile" icon={<User className="w-[26px] h-[26px]" />} label="Ingresar" />
                )}

                <NavLink href="#" icon={<MoreHorizontal className="w-[26px] h-[26px]" />} label="Más" hasDot />
            </nav>

            {/* Cuentas que sigues */}
            {session?.user && (
                <div className="px-5 mb-2">
                    <h3 className="text-white/60 font-bold text-[13px] mb-4">Cuentas que sigues</h3>
                    <div className="flex flex-col gap-1">
                        {following.length > 0 ? (
                            following.slice(0, 5).map((u: any) => (
                                <FollowingAccount
                                    key={u.user_id}
                                    username={u.username}
                                    name={u.full_name || u.username}
                                    avatar={u.avatar_url || "/camilo.jpg"}
                                />
                            ))
                        ) : (
                            <p className="text-white/40 text-xs italic mb-2">Aún no sigues a nadie.</p>
                        )}
                    </div>
                    {following.length > 5 && (
                        <button className="flex items-center gap-3 text-[#FF9800] hover:bg-white/5 w-full mt-2 px-3 py-2 rounded-lg transition-colors font-bold text-sm">
                            <List className="w-5 h-5" /> Ver todo
                        </button>
                    )}
                </div>
            )}

            <div className="pb-20" />
        </aside>
    );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: string;
    hasRing?: boolean;
    hasDot?: boolean;
    avatar?: string;
}

function NavLink({ href, icon, label, active, badge, hasRing, hasDot, avatar }: NavLinkProps) {
    return (
        <Link href={href} className="flex items-center justify-start gap-4 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors relative group">
            <div className="relative shrink-0">
                {avatar ? (
                    <div className="w-[26px] h-[26px] rounded-full overflow-hidden border border-white/20">
                        <Image src={avatar} alt={label} width={26} height={26} className="object-cover" />
                    </div>
                ) : (
                    <div className={active ? "text-[#FF9800]" : "text-white"}>
                        {icon}
                    </div>
                )}
                {badge && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-black min-w-[18px] text-center">
                        {badge}
                    </div>
                )}
                {hasRing && (
                    <div className="absolute inset-[-4px] rounded-full border-[1.5px] border-pink-500" />
                )}
                {hasDot && (
                    <div className="absolute -top-0 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-black" />
                )}
            </div>
            <span className={`text-[17px] tracking-wide ${active ? 'font-bold text-[#FF9800]' : 'font-semibold text-white group-hover:text-white/90'}`}>
                {label}
            </span>
        </Link>
    );
}

interface FollowingAccountProps {
    username: string;
    name: string;
    avatar: string;
}

function FollowingAccount({ username, name, avatar }: FollowingAccountProps) {
    return (
        <Link href={`/@${username}`} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0 border border-white/10 relative">
                <Image src={avatar} alt={name} fill className="object-cover" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-white text-[15px] font-bold leading-tight truncate">{name}</span>
                <span className="text-white/50 text-[12px] leading-tight truncate">{username}</span>
            </div>
        </Link>
    );
}
