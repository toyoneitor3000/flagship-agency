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
    <main className="min-h-screen bg-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-dot-pattern brightness-0"></div>
      <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <Link
          href="/packs"
          className="inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-brand-yellow mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver a la tienda
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">

          {/* COLUMNA IZQUIERDA: DATOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-10 bg-brand-yellow rounded-full"></div>
                <h1 className="text-5xl md:text-6xl font-black text-black italic tracking-tighter uppercase leading-none">
                  FINALIZAR <br />PEDIDO
                </h1>
              </div>
              <p className="text-gray-500 font-medium text-lg max-w-md">Completa tus datos para enviarte tus stickers premium.</p>
            </div>

            <div className="bg-gray-50/50 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-gray-100 space-y-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-brand-yellow/10 rounded-2xl">
                  <MapPin className="text-brand-yellow w-6 h-6" />
                </div>
                <h2 className="font-black text-xl text-black uppercase tracking-tighter italic">Información de Envío</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <Input
                    name="name"
                    placeholder="Ej: Juan Pérez"
                    className="bg-white border-gray-200 h-14 rounded-2xl text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Teléfono / WhatsApp</label>
                  <Input
                    name="phone"
                    placeholder="Ej: 300 123 4567"
                    className="bg-white border-gray-200 h-14 rounded-2xl text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dirección Completa</label>
                <Input
                  name="address"
                  placeholder="Calle 123 # 45-67, Apto 201"
                  className="bg-white border-gray-200 h-14 rounded-2xl text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ciudad / Municipio</label>
                  <Input
                    name="city"
                    placeholder="Ej: Bogotá D.C."
                    className="bg-white border-gray-200 h-14 rounded-2xl text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email <span className="text-gray-400 italic">(Opcional)</span></label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    className="bg-white border-gray-200 h-14 rounded-2xl text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="bg-brand-yellow/5 p-6 rounded-3xl flex items-start gap-5 border border-brand-yellow/10">
              <div className="p-3 bg-brand-yellow/20 rounded-2xl shrink-0">
                <ShieldCheck className="text-brand-yellow w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-black uppercase italic tracking-tighter text-lg leading-tight">Pago Seguro al Recibir</h3>
                <p className="text-gray-500 font-medium mt-1 leading-relaxed">
                  No te cobraremos nada en este sitio. Coordinaremos el pago (Nequi/Bancolombia) directamente por WhatsApp para tu total seguridad.
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
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 sticky top-32 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="flex items-baseline justify-between mb-8 border-b border-gray-50 pb-6">
                <h2 className="font-black text-3xl text-black uppercase italic tracking-tighter flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-brand-yellow" /> RESUMEN
                </h2>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{items.length} ARTÍCULOS</span>
              </div>

              <div className="space-y-6 mb-10 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden p-1 border border-gray-100 shrink-0">
                      <img src={item.image} className="w-full h-full object-contain p-2" alt={item.name} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-black text-black text-base leading-tight uppercase tracking-tighter line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] font-black text-brand-yellow uppercase tracking-widest mt-1">CANT: {item.quantity}</p>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <p className="font-black text-black text-lg tracking-tighter">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CUPON SECTION */}
              <div className="pb-8 border-b border-gray-50">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">¿Tienes un cupón?</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="INGRESAR CÓDIGO"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="bg-gray-50 border-gray-100 h-12 rounded-xl text-black placeholder:text-gray-400 focus:border-brand-yellow focus:ring-brand-yellow transition-all uppercase font-black tracking-widest text-xs"
                  />
                  <Button
                    onClick={applyCoupon}
                    className="h-12 bg-gray-900 hover:bg-black text-white font-black uppercase text-[10px] tracking-widest px-4 rounded-xl"
                  >
                    APLICAR
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mt-2 ml-1">
                    ¡CUPÓN APLICADO! -{(discount * 100)}% DCTO
                  </p>
                )}
              </div>

              <div className="space-y-5 py-8 border-t border-gray-50">
                <div className="flex justify-between text-xs font-black text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-black">${totalPrice.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs font-black text-green-600 uppercase tracking-widest">
                    <span>Descuento</span>
                    <span>-${(totalPrice * discount).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest">
                  <span>Envío <span className="text-[8px] opacity-40 ml-1">(NACIONAL)</span></span>
                  <span className="text-brand-yellow italic">CALCULAR EN WHATSAPP</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Estimado</span>
                    <span className="text-5xl font-black text-brand-yellow italic tracking-tighter">TOTAL</span>
                  </div>
                  <span className="text-5xl font-black text-black tracking-tighter leading-none">${discountedTotal.toLocaleString()}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppOrder}
                className="w-full h-20 bg-[#25D366] hover:bg-[#20bd5b] text-white rounded-3xl shadow-[0_20px_40px_rgba(37,211,102,0.15)] flex flex-col items-center justify-center gap-0 transition-all group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-7 h-7" />
                  <span className="text-xl font-black uppercase tracking-widest">CONFIRMAR PEDIDO</span>
                </div>
                <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-0.5">Te atenderemos al instante</span>
              </motion.button>

              <div className="flex items-center justify-center gap-2 mt-6">
                <ShieldCheck className="w-4 h-4 text-gray-300" />
                <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.2em]">
                  Transacción 100% Protegida vía WhatsApp
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}