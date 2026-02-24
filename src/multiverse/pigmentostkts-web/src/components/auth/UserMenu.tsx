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
import { User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { LoginModal } from "./LoginModal";

export function UserMenu() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full overflow-hidden border border-slate-200">
          <Image
            src={user.image || "https://placehold.co/100x100/png?text=U"}
            alt={user.name || "User"}
            fill
            className="object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
