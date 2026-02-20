"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, ShieldCheck, CreditCard, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    // SPEEDLIGHT20 da 20% de descuento
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

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0) {
      router.push("/packs");
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = () => {
    // Validación básica
    if (!formData.name || !formData.address) {
      alert("Por favor completa tu nombre y dirección");
      return;
    }

    // Construir mensaje de pedido
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

    message += `%0A*TOTAL A PAGAR: $${discountedTotal.toLocaleString()}*`;
    message += `%0A%0AQuedo atento a los datos de pago (Nequi/Bancolombia).`;

    // Abrir WhatsApp
    window.open(`https://wa.me/573160535247?text=${message}`, '_blank');
  };

  if (items.length === 0) return null;

  return (
    <main className="min-h-screen bg-white pt-20 pb-8 relative overflow-hidden flex flex-col justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-dot-pattern brightness-0"></div>
      <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 relative z-10 scale-[0.95] origin-top">
        <Link
          href="/packs"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-brand-yellow mb-4 transition-colors group"
        >
          <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">

          {/* COLUMNA IZQUIERDA: DATOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-brand-yellow rounded-full"></div>
                <h1 className="text-3xl md:text-4xl font-black text-black italic tracking-tighter uppercase leading-none">
                  FINALIZAR PEDIDO
                </h1>
              </div>
              <p className="text-gray-500 font-medium text-xs max-w-sm ml-3">Tus datos para el envío.</p>
            </div>

            <div className="bg-gray-50/50 backdrop-blur-sm p-5 md:p-6 rounded-[1.5rem] border border-gray-100 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-brand-yellow/10 rounded-lg">
                  <MapPin className="text-brand-yellow w-4 h-4" />
                </div>
                <h2 className="font-black text-base text-black uppercase tracking-tighter italic">Información de Envío</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre</label>
                  <Input
                    name="name"
                    placeholder="Juan Pérez"
                    className="bg-white border-gray-200 h-10 rounded-lg text-sm text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Teléfono</label>
                  <Input
                    name="phone"
                    placeholder="300 123 4567"
                    className="bg-white border-gray-200 h-10 rounded-lg text-sm text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Dirección</label>
                <Input
                  name="address"
                  placeholder="Calle 123 # 45-67, Apto 201"
                  className="bg-white border-gray-200 h-10 rounded-lg text-sm text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Ciudad</label>
                  <Input
                    name="city"
                    placeholder="Bogotá D.C."
                    className="bg-white border-gray-200 h-10 rounded-lg text-sm text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Email <span className="text-gray-300 italic">(Opcional)</span></label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    className="bg-white border-gray-200 h-10 rounded-lg text-sm text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="bg-brand-yellow/5 p-3 rounded-xl flex items-center gap-3 border border-brand-yellow/10">
              <div className="p-2 bg-brand-yellow/20 rounded-lg shrink-0">
                <ShieldCheck className="text-brand-yellow w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-black uppercase italic tracking-tighter text-xs leading-none">Pago Seguro al Recibir</h3>
                <p className="text-gray-500 text-[10px] font-medium mt-0.5 leading-tight">
                  Pagas al confirmar por WhatsApp (Nequi/Bancolombia).
                </p>
              </div>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: RESUMEN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white p-5 md:p-6 rounded-[2rem] border border-gray-100 sticky top-20 shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                <h2 className="font-black text-xl text-black uppercase italic tracking-tighter flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-yellow" /> RESUMEN
                </h2>
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{items.length} ITEMS</span>
              </div>

              <div className="space-y-3 mb-5 max-h-[22vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 group">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden p-1 border border-gray-100 shrink-0">
                      <img src={item.image} className="w-full h-full object-contain p-0.5" alt={item.name} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-black text-black text-xs leading-tight uppercase tracking-tighter line-clamp-1">{item.name}</h4>
                      <p className="text-[8px] font-black text-brand-yellow uppercase tracking-widest mt-0.5">CANT: {item.quantity}</p>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <p className="font-black text-black text-xs tracking-tighter">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CUPON SECTION */}
              <div className="pb-4 border-b border-gray-50">
                <div className="flex gap-2">
                  <Input
                    placeholder="CUPÓN"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="bg-gray-50 border-gray-100 h-9 rounded-lg text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all uppercase font-black tracking-widest text-[9px]"
                  />
                  <Button
                    onClick={applyCoupon}
                    className="h-9 bg-gray-900 hover:bg-black text-white font-black uppercase text-[8px] tracking-widest px-3 rounded-lg"
                  >
                    APLICAR
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-[8px] text-green-600 font-black uppercase tracking-widest mt-1 ml-1">
                    ¡-{discount * 100}% DCTO!
                  </p>
                )}
              </div>

              <div className="space-y-2 py-4 border-t border-gray-50">
                <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-black">${totalPrice.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[9px] font-black text-green-600 uppercase tracking-widest">
                    <span>Descuento</span>
                    <span>-${(totalPrice * discount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  <span>Envío <span className="text-[8px] opacity-40 ml-1">(NACIONAL)</span></span>
                  <span className="text-brand-yellow italic">WHATSAPP</span>
                </div>
                <div className="flex justify-between items-end pt-1">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black text-brand-yellow italic tracking-tighter">TOTAL</span>
                  </div>
                  <span className="text-3xl font-black text-black tracking-tighter leading-none">${discountedTotal.toLocaleString()}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppOrder}
                className="w-full h-14 bg-[#25D366] hover:bg-[#20bd5b] text-white rounded-xl shadow-[0_10px_25px_rgba(37,211,102,0.15)] flex flex-col items-center justify-center gap-0 transition-all group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-base font-black uppercase tracking-widest">CONFIRMAR PEDIDO</span>
                </div>
              </motion.button>

              <div className="flex items-center justify-center gap-1.5 mt-3">
                <ShieldCheck className="w-3 h-3 text-gray-300" />
                <p className="text-[7px] text-gray-300 font-black uppercase tracking-[0.2em]">
                  Transacción 100% Protegida
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}