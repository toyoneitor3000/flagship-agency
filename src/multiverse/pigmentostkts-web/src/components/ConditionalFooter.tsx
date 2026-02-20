"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();

    // Hide footer on home page as it's manually included for scroll snap
    if (pathname === "/") {
        return null;
    }

    return <Footer />;
}
