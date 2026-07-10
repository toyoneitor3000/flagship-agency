"use client";

import React, { useRef, useState } from "react";
import { Download, Copy, Check, Instagram, Phone, LayoutDashboard } from "lucide-react";

interface PromoConfig {
  id: string;
  badge: string;
  title: string;
  price: string;
  priceSub: string;
  services: string[];
  footnote: string;
  phone: string;
  instagram: string;
  bgImage: string;
  bgPosition: string;
  caption: string;
}

const promos: PromoConfig[] = [
  {
    id: "alistamiento",
    badge: "JULIO 2026",
    title: "RENOVAR\nES ESTRENAR.",
    price: "DESDE $900.000",
    priceSub: "PAQUETE ALISTAMIENTO",
    services: [
      "✔  Tapicería full",
      "✔  Corrección de pintura",
      "✔  Cerámico por 1 año",
      "✔  Motor estético",
      "✔  Partes negras",
    ],
    footnote: "* Tarifa diferencial para camionetas y SUVs",
    phone: "+57 312 473 0909",
    instagram: "@victorycarsdetailing",
    bgImage: "/alistamiento-bg.jpg",
    bgPosition: "center center",
    caption: `💎 ¡EL PAQUETE DEFINITIVO DE ALISTAMIENTO YA ESTÁ AQUÍ! 💎

¿Quieres revivir por completo tu vehículo y dejarlo con un acabado de vitrina?

Llévalo todo DESDE $900.000 COP:

✔ Tapicería Full (Limpieza y desinfección profunda)
✔ Corrección de pintura profesional (elimina micro-rayones)
✔ Recubrimiento Cerámico Premium por 1 año
✔ Lavado detallado estético de motor
✔ Acondicionamiento e hidratación de partes negras

*Precio base para automóviles. Camionetas tienen tarifa diferencial.*

WhatsApp +57 312 473 0909 o DM para agendar tu cupo VIP 📆

#VictoryCarsDetailing #AlistamientoPremium #TapiceriaVehicular #CorreccionDePintura #DetailingColombia`,
  },
  {
    id: "gratis-coating",
    badge: "JULIO 2026",
    title: "CERÁMICO\n100% GRATIS.",
    price: "SIN COSTO EXTRA",
    priceSub: "CON DETAILING COMPLETO",
    services: [
      "✔  Protección UV total",
      "✔  Brillo espejo profundo",
      "✔  Repele agua y polvo",
      "✔  Duración 1 año",
      "✔  Incluye pulimento",
    ],
    footnote: "* Aplica en combo con Detailing Completo",
    phone: "+57 312 473 0909",
    instagram: "@victorycarsdetailing",
    bgImage: "/services/ceramic-coating.jpg",
    bgPosition: "center 40%",
    caption: `🔥 ¡PROMO DE JULIO EN VICTORY CARS DETAILING! 🔥

Solo por este mes, al pagar tu servicio de Detailing Completo, te obsequiamos el RECUBRIMIENTO CERÁMICO 100% GRATIS!

✔ Protección UV total
✔ Brillo espejo profundo
✔ Repele agua y polvo
✔ Duración 1 año
✔ Incluye pulimento

WhatsApp +57 312 473 0909 o DM. ¡Cupos limitados!

#VictoryCarsDetailing #CeramicCoating #CoatingGratis #DetailingColombia #JulioPromo`,
  },
  {
    id: "combo-polarizado",
    badge: "JULIO 2026",
    title: "POLARIZADO HD\nAL 50%.",
    price: "50% DESCUENTO",
    priceSub: "CON CERÁMICO COMPLETO",
    services: [
      "✔  Pintura + vidrios + rines",
      "✔  Reducción térmica",
      "✔  Bloqueo UV interior",
      "✔  Película de seguridad",
      "✔  Acabado invisible",
    ],
    footnote: "* Al sellar pintura, vidrios y rines",
    phone: "+57 312 473 0909",
    instagram: "@victorycarsdetailing",
    bgImage: "/services/sun-guard.jpg",
    bgPosition: "center 50%",
    caption: `💎 ¡EL COMBO PERFECTO PARA EL VERANO! 💎

Por el pago del Recubrimiento Cerámico Completo obtienes 50% DESCUENTO en Polarizado High Definition.

✔ Pintura + vidrios + rines
✔ Reducción térmica real
✔ Bloqueo UV interior
✔ Película de seguridad
✔ Acabado invisible

WhatsApp +57 312 473 0909 o DM para apartar tu fecha 📆

#VictoryCarsDetailing #PolarizadoHD #CeramicCoating #EsteticaVehicular #DetailingColombia`,
  },
];

export default function PromoCanvas() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const copyCaption = (caption: string, id: string) => {
    navigator.clipboard.writeText(caption);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const drawAndDownload = (promo: PromoConfig) => {
    setDownloadingId(promo.id);
    const canvas = canvasRef.current;
    if (!canvas) { setDownloadingId(null); return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { setDownloadingId(null); return; }

    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = promo.bgImage;

    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = "/logo.png";

    let loaded = 0;
    const tryRender = () => {
      loaded++;
      if (loaded === 2) {
        renderCanvas(
          canvas,
          ctx, W, H,
          bgImg.naturalWidth > 0 ? bgImg : null,
          logoImg.naturalWidth > 0 ? logoImg : null,
          promo
        );
      }
    };
    bgImg.onload = tryRender;
    bgImg.onerror = tryRender;
    logoImg.onload = tryRender;
    logoImg.onerror = tryRender;
  };

  const renderCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    W: number, H: number,
    bgImg: HTMLImageElement | null,
    logoImg: HTMLImageElement | null,
    promo: PromoConfig
  ) => {
    // 1. Photo — fills 100% top-anchored
    if (bgImg) {
      const scale = Math.max(W / bgImg.naturalWidth, H / bgImg.naturalHeight);
      ctx.drawImage(bgImg, (W - bgImg.naturalWidth * scale) / 2, 0, bgImg.naturalWidth * scale, bgImg.naturalHeight * scale);
    } else {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);
    }

    // 2. Strong gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,    "rgba(0,0,0,0.55)");
    grad.addColorStop(0.18, "rgba(0,0,0,0.10)");
    grad.addColorStop(0.42, "rgba(0,0,0,0.60)");
    grad.addColorStop(0.55, "rgba(0,0,0,0.92)");
    grad.addColorStop(1,    "rgba(0,0,0,1.00)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = "center";

    // 3. Logo
    if (logoImg) {
      const lw = 240;
      const lh = (logoImg.naturalHeight / logoImg.naturalWidth) * lw;
      ctx.drawImage(logoImg, W / 2 - lw / 2, 52, lw, lh);
    }

    // 4. Badge
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 28px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    ctx.fillText(promo.badge, W / 2, H * 0.53);

    // 5. Title — BIGGEST. Two lines.
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 100px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    const titleLines = promo.title.split("\n");
    const titleY = H * 0.585;
    titleLines.forEach((line, i) => ctx.fillText(line, W / 2, titleY + i * 112));

    // 6. Price — second biggest
    const priceBlockY = titleY + titleLines.length * 112 + 20;
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "600 30px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    ctx.fillText(promo.priceSub, W / 2, priceBlockY);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 76px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    ctx.fillText(promo.price, W / 2, priceBlockY + 82);

    // 7. Services list — LARGE and LEFT-ALIGNED (billboard readable)
    const servicesStartY = priceBlockY + 82 + 52;
    ctx.textAlign = "left";
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 32px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    const leftMargin = 110;
    promo.services.forEach((service, i) => {
      ctx.fillText(service, leftMargin, servicesStartY + i * 46);
    });

    // 8. Divider
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, H - 120);
    ctx.lineTo(W - 80, H - 120);
    ctx.stroke();

    // 9. Footnote
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(148,163,184,0.6)";
    ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    ctx.fillText(promo.footnote, W / 2, H - 90);

    // 10. Contact — LARGE
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 30px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
    ctx.fillText(`📞 ${promo.phone}   ·   ${promo.instagram}`, W / 2, H - 48);

    // Download
    const link = document.createElement("a");
    link.download = `victory-promo-${promo.id}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
    setDownloadingId(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="flex flex-col border-b border-neutral-800 pb-6 mb-10 gap-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/50 tracking-widest uppercase">
          <LayoutDashboard className="w-4 h-4" />
          Panel de Pautas Editoriales
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          CAMPAÑAS DE MARKETING <span className="text-white/60">JULIO 2026</span>
        </h1>
        <p className="text-neutral-500 text-sm">
          Formato Instagram 4:5 · 1080 × 1350 px · Tipografía legible
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {promos.map((promo) => (
          <div key={promo.id} className="flex flex-col gap-4">

            {/* CANVAS PREVIEW */}
            <div className="w-full aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">

              {/* Background photo */}
              <div
                className="absolute inset-0 bg-cover group-hover:scale-105 transition-transform duration-1000"
                style={{ backgroundImage: `url(${promo.bgImage})`, backgroundPosition: promo.bgPosition }}
              />

              {/* Strong gradient */}
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to bottom,
                  rgba(0,0,0,0.55) 0%,
                  rgba(0,0,0,0.08) 18%,
                  rgba(0,0,0,0.60) 42%,
                  rgba(0,0,0,0.92) 55%,
                  rgba(0,0,0,1.00) 100%)`
              }} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">

                {/* Logo — top */}
                <div className="flex justify-center pt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="Victory Cars Detailing" className="h-8 w-auto object-contain" />
                </div>

                {/* Bottom block */}
                <div className="flex flex-col gap-2">

                  {/* Badge */}
                  <p className="text-white/80 text-[10px] font-semibold tracking-widest uppercase text-center">
                    {promo.badge}
                  </p>

                  {/* TITLE — billboard size */}
                  <h2
                    className="text-white font-bold leading-tight whitespace-pre-line text-center tracking-tight"
                    style={{ fontSize: "clamp(1.6rem, 6vw, 2.2rem)" }}
                  >
                    {promo.title}
                  </h2>

                  {/* Price */}
                  <div className="text-center mt-2">
                    <p className="text-white/50 text-[9px] font-semibold tracking-widest uppercase">
                      {promo.priceSub}
                    </p>
                    <p
                      className="text-white font-bold leading-none tracking-tight mt-1"
                      style={{ fontSize: "clamp(1.3rem, 5.5vw, 1.8rem)" }}
                    >
                      {promo.price}
                    </p>
                  </div>

                  {/* SERVICES — left aligned, big, readable */}
                  <ul className="mt-4 space-y-1 pl-2">
                    {promo.services.map((s, i) => (
                      <li
                        key={i}
                        className="text-white/80 font-medium font-sans leading-relaxed"
                        style={{ fontSize: "clamp(0.7rem, 2vw, 0.85rem)" }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* Divider + Contact */}
                  <div className="border-t border-white/10 mt-4 pt-3">
                    <p className="text-white/40 text-[8px] text-center tracking-wide">
                      {promo.footnote}
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-white font-semibold tracking-wide flex items-center gap-1.5"
                        style={{ fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)" }}>
                        <Phone className="w-3 h-3 text-white/50" />
                        {promo.phone}
                      </span>
                      <span className="text-white/20 text-[8px]">·</span>
                      <span className="text-white/70 font-semibold tracking-wide"
                        style={{ fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)" }}>
                        {promo.instagram}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Admin actions */}
            <button
              onClick={() => drawAndDownload(promo)}
              disabled={downloadingId === promo.id}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white hover:bg-white/90 disabled:opacity-50 text-black font-semibold rounded-full text-sm transition-all shadow-lg active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              {downloadingId === promo.id ? "GENERANDO..." : "DESCARGAR PAUTA (4:5)"}
            </button>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/60 text-xs font-semibold flex items-center gap-2 tracking-wide">
                  <Instagram className="w-4 h-4 text-white" />
                  Copy de Instagram
                </span>
                <button
                  onClick={() => copyCaption(promo.caption, promo.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-transparent"
                >
                  {copiedId === promo.id
                    ? <Check className="w-4 h-4 text-green-400" />
                    : <Copy className="w-4 h-4" />
                  }
                </button>
              </div>
              <p className="text-white/50 text-xs leading-relaxed line-clamp-3 select-none font-regular">
                {promo.caption}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
