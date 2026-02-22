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
      {/* HEADER & RANDOM PACKS */}
      <section className="min-h-[calc(100vh-110px)] mt-[110px] py-12 md:py-20 bg-white relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>

        {/* Generous Header */}
        <div className="text-center mb-8 md:mb-16 relative z-10 px-4 w-full">
          <span className="text-brand-yellow font-black tracking-widest uppercase bg-brand-black inline-block px-4 py-1.5 rounded-full text-[10px] md:text-xs shadow-xl mb-4 md:mb-6">
            Edición Boutique
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-black tracking-tighter uppercase leading-[0.85] italic mb-4 md:mb-6">
            PACKS EXCLUSIVOS
          </h1>
          <p className="text-sm md:text-lg text-gray-500 font-bold max-w-3xl mx-auto">
            Curaduría de arte urbano y coleccionables. <br className="hidden md:block" />
            <span className="text-brand-black text-[10px] md:text-xs uppercase tracking-widest bg-brand-yellow px-4 py-1.5 md:py-2 mt-4 inline-block rounded font-black shadow-sm">
              Diseños curados • Calidad Museo • Premium Packaging
            </span>
          </p>
        </div>

        {/* 6-PACK GRID */}
        <div className="w-full px-4 md:px-8 relative z-10 flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto w-full">
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
                    "rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 transition-all duration-300 relative flex flex-col group",
                    isMega
                      ? "bg-brand-black text-white border-brand-yellow shadow-[6px_6px_0px_0px_rgba(255,183,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,183,0,1)] hover:-translate-y-1 z-10"
                      : isMedium
                        ? "bg-white border-brand-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                        : "bg-white border-gray-200 shadow-md hover:border-brand-yellow/50 hover:shadow-xl hover:-translate-y-1"
                  )}
                >
                  {isRecommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-black text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20 whitespace-nowrap">
                      {pack.recommended}
                    </div>
                  )}

                  {/* Name + details */}
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase italic tracking-tighter leading-none mb-2">
                    {pack.name}
                  </h3>
                  <p className={cn("text-xs md:text-sm font-bold uppercase tracking-wider mb-6", isMega ? "text-gray-400" : "text-gray-500")}>
                    {qty} Unidades • <span className={cn("px-2 py-0.5 rounded", isMega ? "text-brand-black bg-brand-yellow" : "text-white bg-brand-black")}>${unitPrice}/u</span>
                  </p>

                  {/* Price */}
                  <div className="mt-2 mb-8">
                    <span className={cn("text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter", isMega ? "text-brand-yellow" : "text-brand-black")}>
                      ${(price / 1000).toFixed(0)}k
                    </span>
                    <span className="text-xs md:text-sm font-bold opacity-40 uppercase tracking-wider ml-1">/ Pack</span>
                    {savings > 0 && (
                      <div className={cn(
                        "mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider border",
                        isMega
                          ? "bg-brand-yellow/10 border-brand-yellow/30 text-brand-yellow"
                          : "bg-green-50 border-green-200 text-green-700"
                      )}>
                        <Sparkles size={14} className={isMega ? "text-brand-yellow" : "text-green-600"} /> Ahorras ${(savings / 1000).toFixed(savings % 1000 === 0 ? 0 : 1)}k
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4 space-y-3">
                    <Button
                      onClick={() => handleAddToCart(pack)}
                      className={cn(
                        "w-full h-12 md:h-14 lg:h-16 font-black rounded-xl uppercase text-xs md:text-sm tracking-widest transition-all shadow-md group-hover:scale-[1.02]",
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
                      className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-400 hover:text-brand-black transition-colors uppercase tracking-widest py-2"
                    >
                      <Zap size={14} /> Consultar por WhatsApp
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
      <section className="py-16 md:py-24 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:30px_30px] opacity-40 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-brand-yellow font-black tracking-widest uppercase text-xs border-2 border-brand-yellow px-4 py-1.5 rounded-full inline-block mb-4 shadow-[0_0_20px_rgba(255,183,0,0.2)]">
              Curaduría Exclusiva
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic tracking-tighter uppercase mb-4 text-center">
              COLECCIONES <span className="text-brand-yellow">PREMIUM</span>
            </h2>
            <p className="text-sm md:text-base font-bold text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A diferencia de nuestros packs aleatorios, estas colecciones <span className="text-brand-yellow uppercase italic tracking-wider">ya vienen pre-armadas</span> con los diseños exactos que ves en las fotos. <br className="hidden md:block" />
              Pertenecen a nuestra línea de curaduría exclusiva Pigmento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {PIGMENTO_DATA.pricing.collectionPacks?.map((pack) => (
              <div key={pack.name} className="group relative bg-white/5 rounded-[2rem] border-2 border-white/10 overflow-hidden hover:border-brand-yellow transition-all duration-300 flex flex-col h-full hover:shadow-[0_10px_30px_rgba(255,183,0,0.15)] hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-gray-900">
                  <img src={pack.image} alt={pack.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-brand-yellow text-brand-black text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      {pack.qty} Stickers
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-2 tracking-tighter leading-tight group-hover:text-brand-yellow transition-colors">{pack.name}</h3>
                  <p className="text-xs md:text-sm font-bold text-gray-400 mb-6 flex-1 leading-relaxed">{pack.description}</p>

                  <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Precio Pack</span>
                        <span className="text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:text-brand-yellow transition-colors">${pack.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(pack, true)}
                      className="w-full bg-white hover:bg-brand-yellow text-brand-black font-black uppercase text-[10px] md:text-xs tracking-widest h-12 md:h-14 rounded-xl transition-all shadow-lg group-hover:scale-[1.02]"
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