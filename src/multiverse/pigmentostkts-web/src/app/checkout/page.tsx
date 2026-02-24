"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, ShieldCheck, CreditCard, MapPin, Truck, Tag, Plus, Minus, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, totalPrice, updateQuantity, removeItem } = useCart();
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<'nacional' | 'picap' | 'oficina'>('nacional');

  // Detect if a 1m+ or 60cm linear meter qualifies for free shipping
  const is1mPlus = (features: string[]) =>
    features.some(f => {
      // 1m, 1.5m, etc.
      if (/^(1|1\.5|2|3|4)\s*(m|mt|metro|metros)/i.test(f)) return true;
      // 60cm also counts as linear meter in this context
      if (/60\s*(cm|centimetros)/i.test(f)) return true;
      const cmMatch = f.match(/(\d+)\s*(cm|centimetros)/i);
      if (cmMatch && parseInt(cmMatch[1]) >= 100) return true;
      return false;
    });

  type ShippingGroup = {
    label: string;
    cost: number;
    isFree: boolean;
    arrivalText: string;
    carrier: string;
    items: string[];
  };

  // Free shipping: if total >= $180k OR has any personalized linear meter (Stickers, Cubreplacas, Personalizado)
  const isCustomVinyl = (item: any) =>
    item.category === 'Stickers' ||
    item.category === 'Personalizado' ||
    item.category === 'Cubreplacas';

  const hasLinearMeterVinyl = items.some(isCustomVinyl);

  const FREE_SHIPPING_THRESHOLD = 180000;
  const allShippingFree = totalPrice >= FREE_SHIPPING_THRESHOLD || hasLinearMeterVinyl;

  const shippingGroups = (() => {
    const groups: ShippingGroup[] = [];

    if (allShippingFree) {
      groups.push({
        label: 'Envío Gratis',
        cost: 0,
        isFree: true,
        arrivalText: '1 – 3 días hábiles tras producción',
        carrier: 'Interrapidisimo',
        items: items.map(i => i.name),
      });
      return groups;
    }

    // Vinilos personalizados (Stickers / Cubreplacas / Personalizado) → Envío Gratis
    const freeItems = items.filter(isCustomVinyl);
    if (freeItems.length > 0) {
      groups.push({
        label: 'Vinilo Personalizado',
        cost: 0,
        isFree: true,
        arrivalText: '2 – 4 días hábiles tras producción',
        carrier: 'Interrapidisimo',
        items: freeItems.map(i => i.name),
      });
    }

    // Resto de items (Interrapidisimo Nacional)
    const otherItems = items.filter(i => !freeItems.includes(i));
    if (otherItems.length > 0) {
      groups.push({
        label: 'Envío Nacional',
        cost: 15000,
        isFree: false,
        arrivalText: '1 – 3 días hábiles tras producción',
        carrier: 'Interrapidisimo',
        items: otherItems.map(i => i.name),
      });
    }

    return groups;
  })();

  const totalShipping = (() => {
    if (deliveryMethod === 'oficina') return 0;
    if (deliveryMethod === 'picap') return 0; // Client pays in app
    // Nacional: calculated from groups
    return shippingGroups.reduce((acc, g) => acc + g.cost, 0);
  })();
  // Progress toward free shipping
  const freeShippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);
  // ──────────────────────────────────────────────────────────────

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SPEEDLIGHT20") {
      setDiscount(0.2);
    } else {
      setDiscount(0);
      alert("Cupón no válido");
    }
  };

  const discountedTotal = totalPrice * (1 - discount);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    email: ""
  });

  // Removed aggressive redirect to /packs to prevent premature redirects when CartContext initializes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = () => {
    if (!formData.name || !formData.address) {
      alert("Por favor completa tu nombre y dirección");
      return;
    }

    let message = `Hola Pigmento! 🎨 Quiero realizar el siguiente pedido:%0A%0A`;
    message += `*Cliente:* ${formData.name}%0A`;
    message += `*Tel:* ${formData.phone}%0A`;
    message += `*Dirección:* ${formData.address}, ${formData.city}%0A%0A`;
    message += `*PEDIDO:*%0A`;

    items.forEach(item => {
      if (item.category === 'Personalizado' || item.category === 'Cubreplacas') {
        message += `• *${item.quantity}x ${item.name}* - $${(item.price * item.quantity).toLocaleString()}%0A`;
        message += `  _Detalles: ${item.description}_%0A`;
        if (item.features && item.features.length > 0) {
          message += `  _Especificaciones: ${item.features.join(', ')}_%0A`;
        }
        if (item.fileUrl) {
          const fileName = item.fileUrl.split('/').pop();
          const viewerUrl = `${window.location.origin}/view-design/${fileName}`;
          message += `  _Ver Diseño:_ ${viewerUrl}%0A`;
        }
      } else {
        message += `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toLocaleString()}%0A`;
      }
    });

    if (discount > 0) {
      message += `%0A*Subtotal:* $${totalPrice.toLocaleString()}`;
      message += `%0A*Cupón:* ${coupon.toUpperCase()} (-${discount * 100}%)`;
    }

    const deliveryLabel = deliveryMethod === 'picap'
      ? 'Picap (Moto - Costo asumido por cliente en App)'
      : deliveryMethod === 'oficina'
        ? 'Recogida en Oficina (Cll 181 #76-15, Bogotá)'
        : 'Envío Nacional (Interrapidisimo)';
    message += `%0A*MÉTODO DE ENTREGA:* ${deliveryLabel}%0A`;

    message += `%0A*ENVÍO: ${deliveryMethod === 'picap' ? 'POR COTIZAR (PICAP)' : (totalShipping > 0 ? '$' + totalShipping.toLocaleString() : 'GRATIS')}*`;
    message += `%0A*TOTAL A PAGAR: $${(discountedTotal + totalShipping).toLocaleString()}*`;
    message += `%0A%0AFormas de pago aceptadas: Nequi, Bancolombia, Daviplata, Bre-B, Efecty.`;

    window.open(`https://wa.me/573160535247?text=${message}`, '_blank');
  };

  if (items.length === 0) return null;

  return (
    <main className="min-h-screen pt-14 pb-6 relative"
      style={{
        background: "linear-gradient(160deg, #E6C200 0%, #F5D000 40%, #EDD100 70%, #C9A800 100%)"
      }}
    >
      {/* Grid texture sobre amarillo */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Sombra sutil en esquinas */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.08) 100%)" }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* Back button */}
        <Link
          href="/packs"
          className="inline-flex items-center gap-2 mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-black/70 hover:text-black border border-black/20 hover:border-black/40 bg-black/10 hover:bg-black/15 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>

        {/* Título */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-8 bg-black rounded-full shrink-0" />
          <div>
            <h1 className="text-[28px] font-black text-black italic tracking-tighter uppercase leading-none">
              FINALIZAR PEDIDO
            </h1>
            <p className="text-black/50 text-[11px] font-black uppercase tracking-widest mt-1">Completa tus datos de envío</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-4 items-start">

          {/* ─── IZQUIERDA: DATOS ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Panel Información - DARK CARD */}
            <div
              className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
              style={{ background: "rgba(18,18,18,0.88)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Header del panel */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.08]">
                <div className="w-8 h-8 rounded-xl bg-brand-yellow/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-brand-yellow" />
                </div>
                <h2 className="font-black text-[12px] text-white uppercase tracking-widest italic">
                  Información de Envío
                </h2>
              </div>

              <div className="p-4 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-white/40 uppercase tracking-[0.18em]">Nombre *</label>
                    <Input
                      name="name"
                      placeholder="Juan Pérez"
                      className="bg-white/[0.07] border-white/10 h-10 rounded-xl text-white placeholder:text-white/20 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:bg-white/10 text-xs transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-white/40 uppercase tracking-[0.18em]">Teléfono</label>
                    <Input
                      name="phone"
                      placeholder="300 123 4567"
                      className="bg-white/[0.07] border-white/10 h-10 rounded-xl text-white placeholder:text-white/20 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:bg-white/10 text-xs transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] font-black text-white/40 uppercase tracking-[0.18em]">Dirección *</label>
                  <Input
                    name="address"
                    placeholder="Calle 123 # 45-67, Apto 201"
                    className="bg-white/[0.07] border-white/10 h-10 rounded-xl text-white placeholder:text-white/20 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:bg-white/10 text-xs transition-all"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-white/40 uppercase tracking-[0.18em]">Ciudad</label>
                    <Input
                      name="city"
                      placeholder="Bogotá D.C."
                      className="bg-white/[0.07] border-white/10 h-10 rounded-xl text-white placeholder:text-white/20 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:bg-white/10 text-xs transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-white/40 uppercase tracking-[0.18em]">
                      Email <span className="text-white/20 font-medium normal-case">(Opcional)</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      className="bg-white/[0.07] border-white/10 h-10 rounded-xl text-white placeholder:text-white/20 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:bg-white/10 text-xs transition-all"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Envío - Opciones seleccionables */}
            <div
              className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
              style={{ background: "rgba(18,18,18,0.88)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.08]">
                <div className="w-7 h-7 rounded-xl bg-brand-yellow/20 flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5 text-brand-yellow" />
                </div>
                <div className="flex-1">
                  <h2 className="font-black text-[11px] text-white uppercase tracking-widest italic">Método de Entrega</h2>
                </div>
                {totalShipping === 0 ? (
                  <span className="text-[9px] font-black text-green-400 uppercase tracking-widest bg-green-400/10 px-2 py-0.5 rounded-lg">GRATIS</span>
                ) : (
                  <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">${totalShipping.toLocaleString()}</span>
                )}
              </div>

              <div className="divide-y divide-white/[0.06] p-2.5 space-y-1.5">

                {/* Opción 1: Nacional Interrapidisimo */}
                <button
                  onClick={() => setDeliveryMethod('nacional')}
                  className={`w-full flex gap-3 items-start p-2.5 rounded-xl transition-all text-left border ${deliveryMethod === 'nacional'
                    ? 'border-brand-yellow/50 bg-brand-yellow/10'
                    : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${deliveryMethod === 'nacional' ? 'border-brand-yellow' : 'border-white/20'
                    }`}>
                    {deliveryMethod === 'nacional' && <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-black text-white text-[10px] uppercase tracking-tighter">Envío Nacional</p>
                      {allShippingFree || totalShipping === 0 ? (
                        <span className="font-black text-green-400 text-[10px] shrink-0">GRATIS</span>
                      ) : (
                        <span className="font-black text-white text-[10px] shrink-0">$15.000</span>
                      )}
                    </div>
                    <p className="text-white/40 text-[9px] mt-0.5">Interrapidisimo</p>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <p className="text-brand-yellow/70 text-[9px] font-black uppercase tracking-widest leading-none">● 1 – 2 días hábiles (Cundinamarca)</p>
                      <p className="text-white/20 text-[8px] font-black uppercase tracking-widest leading-none">● 2 – 3 días hábiles (Resto del país)</p>
                      <p className="text-white/40 text-[7px] font-medium uppercase tracking-[0.1em] mt-0.5">Tras finalizar producción</p>
                    </div>
                  </div>
                </button>

                {/* Opción 2: Picap */}
                <button
                  onClick={() => setDeliveryMethod('picap')}
                  className={`w-full flex gap-3 items-start p-2.5 rounded-xl transition-all text-left border ${deliveryMethod === 'picap'
                    ? 'border-brand-yellow/50 bg-brand-yellow/10'
                    : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${deliveryMethod === 'picap' ? 'border-brand-yellow' : 'border-white/20'
                    }`}>
                    {deliveryMethod === 'picap' && <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-1.5">
                        <p className="font-black text-white text-[10px] uppercase tracking-tighter">Picap</p>
                        <span className="text-[7px] font-black bg-orange-500/20 text-orange-400 px-1 py-0.5 rounded-md uppercase tracking-widest">HOY MISMO</span>
                      </div>
                    </div>
                    <p className="text-white/40 text-[9px] mt-0.5">Costo según App (cliente asume valor)</p>
                    <p className="text-orange-400/80 text-[9px] font-black uppercase tracking-widest mt-1 italic">⚡ Mismo día tras producción</p>
                  </div>
                </button>

                {/* Opción 3: Recoger en oficina */}
                <button
                  onClick={() => setDeliveryMethod('oficina')}
                  className={`w-full flex gap-3 items-start p-2.5 rounded-xl transition-all text-left border ${deliveryMethod === 'oficina'
                    ? 'border-green-400/50 bg-green-400/10'
                    : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${deliveryMethod === 'oficina' ? 'border-green-400' : 'border-white/20'
                    }`}>
                    {deliveryMethod === 'oficina' && <div className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-black text-white text-[10px] uppercase tracking-tighter">Recoger en oficina</p>
                      <span className="font-black text-green-400 text-[10px] shrink-0">GRATIS</span>
                    </div>
                    <p className="text-white/40 text-[9px] mt-0.5">Cll 181 # 76-15, Bogotá (cita previa)</p>
                    <p className="text-green-400/70 text-[9px] font-black uppercase tracking-widest mt-1 italic">📅 Tras finalizar producción</p>
                  </div>
                </button>
              </div>

              {/* Nota pie */}
              <div className="px-6 py-2.5 border-t border-white/[0.06] bg-black/20">
                <p className="text-white/30 text-[9px] font-medium leading-relaxed">
                  📦 Picap y recogida solo en Bogotá · Envío nacional a toda Colombia
                </p>
              </div>
            </div>

          </motion.div>

          {/* ─── DERECHA: RESUMEN ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="sticky top-[70px]"
          >
            <div
              className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
              style={{ background: "rgba(18,18,18,0.88)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-brand-yellow" />
                  <h2 className="font-black text-[13px] text-white uppercase tracking-widest italic">Resumen</h2>
                </div>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">
                  {items.length} ITEMS
                </span>
              </div>

              {/* Lista de items EDITABLE - CON SCROLL INTERNO */}
              <div className="px-4 py-3 relative">
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                  {items.map((item) => {
                    // Design items (with fileUrl) cannot have quantity changed
                    const isDesign = !!(item.fileUrl) || item.category === 'Personalizado';
                    return (
                      <div key={item.id} className="flex gap-2 items-center bg-white/[0.04] rounded-lg p-2 border border-white/[0.05]">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 border border-white/10 p-0.5 shrink-0">
                          <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-white text-[9px] uppercase tracking-tighter leading-tight line-clamp-1">
                            {item.name}
                          </p>
                          <p className="font-black text-brand-yellow text-[10px] tracking-tighter mt-0.5">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        {/* Controls */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isDesign ? (
                            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest bg-white/5 px-1.5 py-0.5 rounded-lg">
                              x{item.quantity}
                            </span>
                          ) : (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                              >
                                <Minus className="w-2.5 h-2.5 text-white" />
                              </button>
                              <span className="text-white font-black text-[10px] w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                              >
                                <Plus className="w-2.5 h-2.5 text-white" />
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-5 h-5 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-all"
                          >
                            <X className="w-2.5 h-2.5 text-red-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Free shipping progress bar */}
                {!allShippingFree && (
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                      <span className="text-white/40">Envío gratis desde $180.000 o Vinilos 60cm/1m+</span>
                      <span className="text-brand-yellow">-${amountToFreeShipping.toLocaleString()}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-yellow transition-all duration-500"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                {allShippingFree && (
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-green-400/20 flex items-center justify-center">
                      <ShieldCheck className="w-2.5 h-2.5 text-green-400" />
                    </div>
                    <p className="text-green-400 text-[9px] font-black uppercase tracking-widest">
                      ¡Envío gratis desbloqueado!
                    </p>
                  </div>
                )}
              </div>

              <div className="px-6 pb-4 border-t border-white/[0.08] pt-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                    <Input
                      placeholder="CUPÓN"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="bg-white/[0.07] border-white/10 h-10 rounded-xl text-white placeholder:text-white/20 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow pl-9 uppercase font-black tracking-widest text-[10px] transition-all"
                    />
                  </div>
                  <Button
                    onClick={applyCoupon}
                    className="h-10 bg-brand-yellow hover:bg-yellow-400 text-black font-black uppercase text-[9px] tracking-widest px-4 rounded-xl transition-all"
                  >
                    APLICAR
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-[9px] text-green-400 font-black uppercase tracking-widest mt-1.5">
                    ✓ -{discount * 100}% descuento aplicado
                  </p>
                )}
              </div>

              <div className="px-6 py-4 border-t border-white/[0.08] space-y-2.5 bg-black/20">
                <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">${totalPrice.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[10px] font-black text-green-400 uppercase tracking-widest">
                    <span>Descuento</span>
                    <span>-${(totalPrice * discount).toLocaleString()}</span>
                  </div>
                )}
                {/* Envío dinámico */}
                {deliveryMethod === 'nacional' ? (
                  shippingGroups.map((group, idx) => (
                    <div key={idx} className="flex justify-between text-[9px] font-black text-white/40 uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{group.label}</span>
                      </div>
                      {group.isFree ? (
                        <span className="text-green-400">GRATIS</span>
                      ) : (
                        <span className="text-white">${group.cost.toLocaleString()}</span>
                      )}
                    </div>
                  ))
                ) : deliveryMethod === 'picap' ? (
                  <div className="flex justify-between text-[9px] font-black text-white/40 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3 h-3" />
                      <span>PICAP (COBRADO POR APP)</span>
                    </div>
                    <span className="text-orange-400">CLIENTE PAGA</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[9px] font-black text-white/40 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      <span>RECOGIDA EN OFICINA</span>
                    </div>
                    <span className="text-green-400">GRATIS</span>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-end pt-1.5 border-t border-white/[0.08]">
                  <div>
                    <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Total a pagar</p>
                    <p className="text-xl font-black text-brand-yellow italic tracking-tighter leading-none">TOTAL</p>
                  </div>
                  <p className="text-xl font-black text-white tracking-tighter leading-none">
                    ${(discountedTotal + totalShipping).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppOrder}
                  className="w-full h-14 bg-[#25D366] hover:bg-[#20bd5b] text-white rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2.5 shadow-[0_6px_25px_rgba(37,211,102,0.3)] transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <MessageCircle className="w-5 h-5" />
                  CONFIRMAR PEDIDO
                </motion.button>

                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <ShieldCheck className="w-3 h-3 text-white/20" />
                  <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.18em]">
                    Transacción 100% Protegida
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </main >
  );
}