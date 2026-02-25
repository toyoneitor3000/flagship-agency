"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { LoginModal } from "./LoginModal";

export function UserMenu() {
  const { data: session, status, update } = useSession();
  const user = session?.user;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Force session re-fetch on mount — critical after OAuth redirect
  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Automatically open modal if redirected with ?login=true
    if (searchParams.get("login") === "true") {
      setIsLoginModalOpen(true);

      // Clean up the URL to remove the query parameter without refreshing
      const params = new URLSearchParams(searchParams.toString());
      params.delete("login");
      const newUrl = pathname + (params.toString() ? '?' + params.toString() : '');
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full bg-brand-black border border-white/10 animate-pulse" />
    );
  }

  if (status === "unauthenticated" || !user) {
    return (
      <>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="text-[12px] font-semibold tracking-tight uppercase text-white hover:text-brand-yellow transition-colors duration-200 bg-transparent border-none appearance-none outline-none"
        >
          Iniciar Sesión
        </button>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <NotificationBell />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-brand-yellow/60 hover:border-brand-yellow transition-colors">
            <Image
              src={user.image || "https://placehold.co/100x100/png?text=U"}
              alt={user.name || "User"}
              fill
              className="object-cover"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-[#111] border border-white/10 text-white" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-white">{user.name}</p>
              <p className="text-xs leading-none text-white/50">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            onClick={() => router.push('/dashboard')}
            className="text-white/80 hover:text-white focus:text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push('/dashboard')}
            className="text-white/80 hover:text-white focus:text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
