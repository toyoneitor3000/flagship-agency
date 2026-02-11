"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function CartButton() {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 transition-transform hover:scale-110 active:scale-95 group"
    >
      <ShoppingBag className="w-6 h-6 text-white transition-colors group-hover:text-brand-yellow" strokeWidth={2.5} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-black text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-lg border-2 border-brand-black">
          {totalItems}
        </span>
      )}
    </button>
  );
}
