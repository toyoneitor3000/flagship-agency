"use client";

import Link from "next/link";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Package, Sparkles, ShieldCheck, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import Gallery from "@/components/Gallery";
import { useCart } from "@/context/CartContext";
import { Sticker } from "@/lib/data";

export default function PacksPage() {
  const { addItem } = useCart();

  // Premium Exclusivity Pricing Model
  const selectedPacks = [
    { id: 901, qty: 12, price: 25000, name: "Starter Pack" },
    { id: 902, qty: 30, price: 45000, name: "Collector Pack" },
    { id: 903, qty: 60, price: 78000, name: "Pro Pack" },
    { id: 904, qty: 100, price: 98000, name: "Mega Pack", recommended: "MÁS VENDIDO" },
    { id: 905, qty: 300, price: 240000, name: "Ultra Pack" },
    { id: 906, qty: 500, price: 350000, name: "Legendario", recommended: "MEJOR VALOR" }
  ];

  const handleAddToCart = (pack: any, isCollection: boolean = false) => {
    const sticker: Sticker = {
      id: pack.id || Math.floor(Math.random() * 10000) + 2000,
      name: pack.name,
      price: pack.price,
      displayPrice: `$${pack.price.toLocaleString()}`,
      image: pack.image || "/fotos stickers coleccion/Gameboy Pack/IMG_7373.jpg",
      category: isCollection ? "Colección Premium" : "Pack Exclusivo",
      description: pack.description || `${pack.qty} Unidades Curadas`,
      features: isCollection ? ["Edición Especial"] : ["Curaduría"]
    };
    addItem(sticker);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER & RANDOM PACKS — constrained to viewport */}
      <section className="h-[calc(100vh-110px)] mt-[110px] bg-white relative flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>

        {/* Compact Header */}
        <div className="text-center py-3 md:py-4 relative z-10 shrink-0">
          <span className="text-brand-yellow font-black tracking-widest uppercase bg-brand-black inline-block px-2.5 py-0.5 rounded-full text-[8px] md:text-[9px] shadow-lg">
            Edición Boutique
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-brand-black tracking-tighter uppercase leading-[0.85] italic mt-1">
            PACKS EXCLUSIVOS
          </h1>
          <p className="text-[10px] md:text-xs text-gray-500 font-bold mt-0.5">
            Curaduría de arte urbano y coleccionables.
            <span className="text-brand-black text-[7px] md:text-[8px] uppercase tracking-[0.1em] bg-brand-yellow px-2 py-px ml-2 rounded font-black">
              Diseños curados • Calidad Museo • Premium Packaging
            </span>
          </p>
        </div>

        {/* 6-PACK GRID */}
        <div className="flex-1 px-3 md:px-6 pb-3 relative z-10 flex items-center justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 max-w-5xl mx-auto w-full">
            {selectedPacks.map((pack) => {
              const qty = pack.qty;
              const price = pack.price;
              const isMega = qty >= 100;
              const isRecommended = !!pack.recommended;
              const isMedium = qty === 30 || qty === 60;

              const baseUnitPrice = 25000 / 12;
              const unitPrice = Math.round(price / qty);
              const savings = Math.round((baseUnitPrice * qty) - price);

              return (
                <div
                  key={pack.name}
                  className={cn(
                    "rounded-xl p-2.5 md:p-3 border-2 transition-all relative flex flex-col group",
                    isMega
                      ? "bg-brand-black text-white border-brand-yellow shadow-[4px_4px_0px_0px_rgba(255,183,0,1)] z-10"
                      : isMedium
                        ? "bg-white border-brand-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white border-gray-100 shadow-sm hover:border-brand-yellow/50"
                  )}
                >
                  {isRecommended && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-black text-[6px] font-black px-2 py-px rounded-full uppercase tracking-wider shadow z-20 whitespace-nowrap">
                      {pack.recommended}
                    </div>
                  )}

                  {/* Name + details */}
                  <h3 className="text-xs md:text-sm font-black uppercase italic tracking-tighter leading-none">
                    {pack.name}
                  </h3>
                  <p className={cn("text-[7px] md:text-[8px] font-bold uppercase tracking-wider mt-0.5", isMega ? "text-gray-400" : "text-gray-500")}>
                    {qty} Unidades • <span className={cn(isMega ? "text-brand-yellow" : "text-brand-black")}>${unitPrice}/u</span>
                  </p>

                  {/* Price */}
                  <div className="mt-1.5">
                    <span className={cn("text-xl md:text-2xl font-black tracking-tighter", isMega ? "text-brand-yellow" : "text-brand-black")}>
                      ${(price / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[7px] font-bold opacity-40 uppercase tracking-wider ml-0.5">/ Pack</span>
                    {savings > 0 && (
                      <div className={cn(
                        "mt-0.5 inline-flex items-center gap-0.5 px-1.5 py-px rounded-full text-[6px] md:text-[7px] font-black uppercase tracking-wider border ml-1",
                        isMega
                          ? "bg-brand-yellow/10 border-brand-yellow/20 text-brand-yellow"
                          : "bg-green-50 border-green-100 text-green-600"
                      )}>
                        <Sparkles size={7} /> ${(savings / 1000).toFixed(savings % 1000 === 0 ? 0 : 1)}k
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-1.5">
                    <Button
                      onClick={() => handleAddToCart(pack)}
                      className={cn(
                        "w-full h-7 md:h-8 font-black rounded-md uppercase text-[7px] md:text-[8px] tracking-[0.1em] transition-all",
                        isMega
                          ? "bg-brand-yellow hover:bg-white text-brand-black border border-transparent hover:border-brand-yellow"
                          : "bg-brand-black hover:bg-brand-yellow text-white hover:text-brand-black"
                      )}
                    >
                      AGREGAR AL CARRITO
                    </Button>
                    <a
                      href={`${PIGMENTO_DATA.contact.whatsappUrl}?text=Hola, quiero más información sobre el ${pack.name} de ${qty} stickers.`}
                      target="_blank"
                      className="block text-center text-[6px] md:text-[7px] font-bold text-gray-400 hover:text-brand-black transition-colors uppercase tracking-wider mt-0.5"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LUXURY PACKAGING & QUALITY SECTION */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-black text-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transition-all group-hover:rotate-6">
                <Sparkles size={32} />
              </div>
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2">Curaduría Experta</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Cada pack es una selección manual de nuestros mejores diseños, garantizando variedad y estilo en cada entrega.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-black text-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transition-all group-hover:rotate-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2">Calidad Superior</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Vinilos de alta resistencia, protegidos contra agua y rayos UV. Durabilidad garantizada por 5 años.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-black text-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transition-all group-hover:rotate-6">
                <Crown size={32} />
              </div>
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2">Diseño Único</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Constantemente actualizamos nuestro catálogo con piezas de arte urbano exclusivas para Pigmento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM COLLECTIONS */}
      <section className="py-16 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:30px_30px] opacity-40 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="text-brand-yellow font-black tracking-widest uppercase text-xs border-2 border-brand-yellow px-4 py-1.5 rounded-full inline-block mb-4 shadow-[0_0_20px_rgba(255,183,0,0.2)]">
              Curaduría Exclusiva
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-3 text-center">
              COLECCIONES <span className="text-brand-yellow">PREMIUM</span>
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A diferencia de nuestros packs aleatorios, estas colecciones <span className="text-brand-yellow uppercase italic tracking-wider">ya vienen pre-armadas</span> con los diseños exactos que ves en las fotos. <br className="hidden md:block" />
              Pertenecen a nuestra línea de curaduría exclusiva Pigmento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PIGMENTO_DATA.pricing.collectionPacks?.map((pack) => (
              <div key={pack.name} className="group relative bg-white/5 rounded-[2rem] border-2 border-white/10 overflow-hidden hover:border-brand-yellow transition-all flex flex-col h-full">
                <div className="relative aspect-square overflow-hidden bg-gray-900">
                  <img src={pack.image} alt={pack.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-brand-yellow text-brand-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {pack.qty} Stickers
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-black uppercase text-white mb-2 tracking-tighter leading-tight">{pack.name}</h3>
                  <p className="text-[10px] font-bold text-gray-500 mb-4 flex-1 leading-relaxed">{pack.description}</p>

                  <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Precio Pack</span>
                      <span className="text-xl font-black text-brand-yellow tracking-tighter">${pack.price.toLocaleString()}</span>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(pack, true)}
                      className="w-full bg-white hover:bg-brand-yellow text-brand-black font-black uppercase text-[9px] tracking-widest h-10 rounded-xl transition-all shadow-lg"
                    >
                      AGREGAR AL CARRITO
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="colecciones">
        <Gallery />
      </div>

      {/* SHIPPING */}
      <section className="py-16 bg-brand-yellow text-brand-black text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-brand-black rounded-[2.5rem] p-8 md:p-12 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] border-4 border-brand-black">
            <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-8">
              ENVIAMOS A <br /> TODA COLOMBIA
            </h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/5 border-2 border-white/10 p-6 rounded-[1.5rem] text-left">
                <span className="text-3xl font-black text-white tracking-tighter">${PIGMENTO_DATA.shipping.cundinamarca.price.toLocaleString()}</span>
                <p className="text-brand-yellow font-black uppercase text-[10px] tracking-widest mt-1.5">{PIGMENTO_DATA.shipping.cundinamarca.time} / Cundinamarca</p>
              </div>
              <div className="bg-white/5 border-2 border-white/10 p-6 rounded-[1.5rem] text-left">
                <span className="text-3xl font-black text-white tracking-tighter">${PIGMENTO_DATA.shipping.nacional.price.toLocaleString()}</span>
                <p className="text-brand-yellow font-black uppercase text-[10px] tracking-widest mt-1.5">{PIGMENTO_DATA.shipping.nacional.time} / Nacional</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}