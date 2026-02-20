"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const routeNameMap: Record<string, string> = {
    "cotizador": "Cotizador",
    "packs": "Packs",
    "checkout": "Checkout",
    "dashboard": "Dashboard",
    "diseno": "Diseño",
    "sticker-maker": "Sticker Maker",
    "view-design": "Mis Diseños",
    "faq": "Preguntas Frecuentes",
};

export default function Breadcrumbs({ className, theme = "dark" }: { className?: string; theme?: "light" | "dark" }) {
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter((segment) => segment !== "");

    const textColor = theme === "light" ? "text-brand-black/60" : "text-white/60";
    const activeColor = theme === "light" ? "text-brand-black" : "text-white";
    const hoverColor = "hover:text-brand-yellow";

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs uppercase tracking-widest font-medium", className)}>
            <ol className="flex items-center space-x-2">
                <li>
                    <Link
                        href="/"
                        className={cn("flex items-center transition-colors", textColor, hoverColor)}
                    >
                        <Home className="w-3 h-3" />
                    </Link>
                </li>

                {segments.map((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join("/")}`;
                    const isLast = index === segments.length - 1;
                    const name = routeNameMap[segment] || segment.replace(/-/g, " ");

                    return (
                        <li key={href} className="flex items-center">
                            <ChevronRight className={cn("w-3 h-3 mx-1", textColor)} />
                            {isLast ? (
                                <span className={cn(activeColor, "font-bold")}>
                                    {name}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className={cn("transition-colors", textColor, hoverColor)}
                                >
                                    {name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
