"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { isCartOpen, toggleCart, items, removeItem, totalPrice, updateQuantity } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    toggleCart();
    router.push('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-black/80 backdrop-blur-xl"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#121212] shadow-[0_0_50px_rgba(0,0,0,0.5)] h-full flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/10">

        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-brand-yellow rounded-full"></div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Tu Carrito</h2>
          </div>
          <button
            onClick={toggleCart}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 px-4">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-yellow blur-[60px] opacity-20"></div>
                <ShoppingBagIcon className="w-24 h-24 text-white/10 relative z-10" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-black text-white uppercase italic tracking-tighter">¿Aún no eliges nada?</p>
                <p className="text-gray-500 font-bold max-w-[240px] mx-auto">Tus stickers favoritos te están esperando para ser parte de tu colección.</p>
              </div>
              <Button
                variant="outline"
                onClick={toggleCart}
                className="h-14 px-8 rounded-2xl border-2 border-brand-yellow text-brand-yellow font-black uppercase tracking-widest hover:bg-brand-yellow hover:text-brand-black transition-all"
              >
                VOLVER A LA TIENDA
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6 group relative">
                <div className="w-24 h-24 bg-white/5 rounded-3xl p-1 relative flex-shrink-0 overflow-hidden border border-white/5 group-hover:border-brand-yellow/30 transition-all">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-black text-white text-lg leading-tight mb-1 uppercase tracking-tighter">{item.name}</h3>
                    <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.2em]">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-bold uppercase mb-1">Precio</span>
                      <span className="text-white font-black text-xl tracking-tighter">${item.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:bg-white/5 rounded-full transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:bg-white/5 rounded-full transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 border-t border-white/10 bg-black/40 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-gray-500 font-black uppercase tracking-widest">
                <span>Subtotal del pedido</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm font-black text-white uppercase italic tracking-tighter">TOTAL ESTIMADO</span>
                <span className="text-4xl font-black text-brand-yellow tracking-tighter">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <Button
              className="w-full bg-brand-yellow text-brand-black hover:bg-white h-16 text-xl font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,183,0,0.2)]"
              onClick={handleCheckout}
            >
              FINALIZAR COMPRA
            </Button>
            <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest">
              * El valor del envío se coordinará por WhatsApp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
