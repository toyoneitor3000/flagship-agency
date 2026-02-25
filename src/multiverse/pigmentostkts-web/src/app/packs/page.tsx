"use client";

import Link from "next/link";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Package, Sparkles, ShieldCheck, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
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
    <main data-theme="light" className="min-h-screen bg-white scroll-smooth uppercase font-black">
      {/* HEADER & RANDOM PACKS */}
      <section id="packs" data-theme="light" className="bg-white relative flex flex-col items-center overflow-hidden pt-[110px] pb-8 min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>
        <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 px-4">
          {/* Compact Header */}
          <div className="text-center mb-6 md:mb-8 relative z-10 w-full">
            <span className="text-brand-yellow font-black tracking-widest uppercase bg-brand-black inline-block px-3 py-1 rounded-full text-[10px] md:text-xs shadow-lg mb-2">
              Edición Boutique
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-brand-black tracking-tighter uppercase leading-[0.85] italic mb-2">
              PACKS EXCLUSIVOS
            </h1>
            <p className="text-[10px] md:text-xs text-brand-black/40 font-black max-w-xl mx-auto tracking-widest">
              Curaduría de arte urbano y coleccionables.
            </p>
          </div>

          {/* 6-PACK GRID */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5 w-full">
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
                      "rounded-xl md:rounded-2xl p-4 md:p-5 border-2 transition-all duration-300 relative flex flex-col group",
                      isMega
                        ? "bg-brand-black text-white border-brand-yellow shadow-[4px_4px_0px_0px_rgba(255,183,0,1)] z-10"
                        : isMedium
                          ? "bg-white border-brand-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white border-gray-100 shadow-sm hover:border-brand-yellow/50"
                    )}
                  >
                    {isRecommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-black text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20 whitespace-nowrap border border-brand-black/5">
                        {pack.recommended}
                      </div>
                    )}

                    {/* Header: Title & Savings Badge */}
                    <div className="flex justify-between items-start mb-1 overflow-hidden">
                      <h3 className="text-base md:text-md font-black uppercase italic tracking-tighter leading-none">
                        {pack.name}
                      </h3>
                      {savings > 0 && (
                        <div className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded-md text-[9px] md:text-[10px] font-black uppercase tracking-wider border shrink-0",
                          isMega
                            ? "bg-brand-yellow/10 border-brand-yellow/30 text-brand-yellow"
                            : "bg-green-50 border-green-200 text-green-700"
                        )}>
                          <Sparkles size={10} /> -${(savings / 1000).toFixed(0)}K
                        </div>
                      )}
                    </div>

                    {/* Secondary info: Qty & Unit Price */}
                    <div className={cn("text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2", isMega ? "text-gray-400" : "text-gray-500")}>
                      {qty} UNIDADES
                      <span className={cn("w-1 h-1 rounded-full opacity-30", isMega ? "bg-brand-yellow" : "bg-brand-black")}></span>
                      <span className={cn("px-2 py-0.5 rounded text-[9px] md:text-[10px]", isMega ? "text-brand-black bg-brand-yellow" : "text-white bg-brand-black")}>
                        ${unitPrice}/U
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="mb-4 flex items-baseline gap-1.5">
                      <span className={cn("text-3xl md:text-5xl font-black tracking-tighter shrink-0", isMega ? "text-brand-yellow" : "text-brand-black")}>
                        ${(price / 1000).toFixed(0)}k
                      </span>
                      <span className="text-xs md:text-sm font-bold opacity-30 uppercase tracking-widest">/ Pack</span>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-auto space-y-2">
                      <Button
                        onClick={() => handleAddToCart(pack)}
                        className={cn(
                          "w-full h-10 md:h-11 font-black rounded-xl uppercase text-xs md:text-sm tracking-widest transition-all shadow-md group-hover:scale-[1.02]",
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
                        className="flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-gray-400 hover:text-brand-black transition-colors uppercase tracking-widest py-0.5 group/wa"
                      >
                        <Zap size={10} className="group-hover/wa:text-brand-yellow transition-colors" />
                        WHATSAPP
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Down Hint */}
        <div className="pb-8 animate-bounce relative z-10">
          <a href="#colecciones" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-black transition-colors group">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ver Colecciones</span>
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* PREMIUM COLLECTIONS */}
      <section id="colecciones" data-theme="dark" className="min-h-screen flex flex-col items-center bg-brand-black text-white relative overflow-hidden pt-[110px]">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:30px_30px] opacity-40 pointer-events-none"></div>
        <div className="flex-1 flex flex-col justify-center container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-brand-yellow font-black tracking-widest uppercase text-[10px] border-2 border-brand-yellow px-3 py-1 rounded-full inline-block mb-3">
              Curaduría Exclusiva
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tighter uppercase mb-3 text-center">
              COLECCIONES <span className="text-brand-yellow">PREMIUM</span>
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A diferencia de nuestros packs aleatorios, estas colecciones <span className="text-brand-yellow uppercase italic tracking-wider">ya vienen pre-armadas</span> con los diseños exactos que ves en las fotos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {PIGMENTO_DATA.pricing.collectionPacks?.map((pack) => (
              <div key={pack.name} className="group relative bg-white/5 rounded-[1.5rem] border-2 border-white/10 overflow-hidden hover:border-brand-yellow transition-all duration-300 flex flex-col h-full hover:shadow-[0_10px_30px_rgba(255,183,0,0.15)] hover:-translate-y-1">
                <Link href={`/producto/${pack.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-gray-900">
                    <img src={pack.image} alt={pack.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-brand-yellow text-brand-black text-[9px] md:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        {pack.qty} Stickers
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <Link href={`/producto/${pack.slug}`}>
                    <h3 className="text-lg md:text-xl font-black uppercase text-white mb-1.5 tracking-tighter leading-tight group-hover:text-brand-yellow transition-colors">{pack.name}</h3>
                  </Link>
                  <p className="text-[10px] md:text-xs font-bold text-gray-400 mb-4 flex-1 leading-relaxed">{pack.description}</p>

                  <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Precio Pack</span>
                        <span className="text-2xl md:text-3xl font-black text-white tracking-tighter group-hover:text-brand-yellow transition-colors">${pack.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(pack, true); }}
                      className="w-full bg-white hover:bg-brand-yellow text-brand-black font-black uppercase text-[9px] md:text-[10px] tracking-widest h-10 md:h-11 rounded-xl transition-all shadow-lg group-hover:scale-[1.02]"
                    >
                      AGREGAR AL CARRITO
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a href="#envios" className="flex flex-col items-center gap-1 text-white/30 hover:text-brand-yellow transition-colors group animate-bounce">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Consultar Envíos</span>
              <ChevronDown size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* SHIPPING SECTION (Unified) */}
      <section id="envios" data-theme="light" className="min-h-screen flex flex-col bg-white relative pt-[110px] overflow-hidden">
        <div className="flex-1 flex flex-col justify-center">
          <div className="py-4 md:py-6">
            <Gallery />
          </div>

          <div className="py-6 text-brand-black text-center">
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

                <div className="mt-12 flex justify-center border-t border-white/10 pt-8">
                  <a href="#calidad" className="flex flex-col items-center gap-1 text-white/40 hover:text-brand-yellow transition-colors group animate-bounce">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ver Beneficios</span>
                    <ChevronDown size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY SECTION */}
      <section id="calidad" data-theme="light" className="min-h-screen flex flex-col justify-center pt-[110px] bg-gray-50 border-y border-gray-100 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <div className="group">
              <div className="w-16 h-16 bg-brand-black text-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transition-all group-hover:rotate-6">
                <Sparkles size={32} />
              </div>
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2">Curaduría Experta</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Cada pack es una selección manual de nuestros mejores diseños.</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-brand-black text-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transition-all group-hover:rotate-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2">Calidad Superior</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Vinilos de alta resistencia, protegidos contra agua y UV.</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-brand-black text-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transition-all group-hover:rotate-6">
                <Crown size={32} />
              </div>
              <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2">Diseño Único</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">Arte urbano exclusivo actualizado constantemente.</p>
            </div>
          </div>

          <div className="flex justify-center border-t border-gray-200 pt-12 mt-12">
            <a href="#packs" className="flex flex-col items-center gap-2 text-gray-400 hover:text-brand-black transition-colors group">
              <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Volver Arriba</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}