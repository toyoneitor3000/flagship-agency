"use client";

import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Truck, User, Phone, Mail, ExternalLink,
  ChevronDown, ChevronUp, Hash, StickyNote, Send,
  MessageCircle, Copy, Check, Package
} from "lucide-react";
import { useState } from "react";
import { EmailPreviewModal } from "./EmailPreviewModal";
import { WhatsAppPreviewModal } from "./WhatsAppPreviewModal";

type OrderProps = {
  orders: any[];
  isAdmin?: boolean;
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  PENDING: { label: 'Procesando', bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
  PRODUCTION: { label: 'En Producción', bg: 'bg-blue-100', text: 'text-blue-800', icon: '🔧' },
  PACKING: { label: 'Empacando', bg: 'bg-orange-100', text: 'text-orange-800', icon: '📋' },
  SHIPPED: { label: 'Enviado', bg: 'bg-purple-100', text: 'text-purple-800', icon: '📦' },
  COMPLETED: { label: 'Entregado', bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
  CANCELLED: { label: 'Cancelado', bg: 'bg-red-100', text: 'text-red-800', icon: '❌' },
};

const DELIVERY_LABELS: Record<string, string> = {
  nacional: '📦 Envío Nacional (Interrapidísimo)',
  picap: '⚡ Picap (Mismo día)',
  oficina: '📍 Recogida en Oficina',
};

// ─── Helper: construir detalle de items para mensajes ───
function buildItemsDetail(order: any, format: 'whatsapp' | 'html' | 'text') {
  return order.items.map((item: any) => {
    const meta = item.metadata ? JSON.parse(item.metadata) : null;
    const name = item.product?.name || meta?.name || meta?.materialName || 'Sticker Personalizado';
    const category = meta?.category || '';
    const qty = item.quantity;
    const price = formatPrice(item.price * qty);
    const features = meta?.features || [];
    const description = meta?.description || '';
    const designUrl = item.fileUrl ? `/view-design/${item.fileUrl.split('/').pop()}` : '';

    if (format === 'whatsapp') {
      let line = `• *${qty}x ${name}* — ${price}`;
      if (category) line += `%0A  _${category}_`;
      if (description) line += `%0A  _${description}_`;
      if (features.length > 0) line += `%0A  _Specs: ${features.join(', ')}_`;
      if (designUrl) line += `%0A  🔗 Ver diseño: ${typeof window !== 'undefined' ? window.location.origin : ''}${designUrl}`;
      return line;
    }

    if (format === 'html') {
      let html = `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <div style="width: 48px; height: 48px; border-radius: 10px; background: #FFF8E1; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;">🎨</div>
              <div style="flex: 1;">
                <p style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin: 0;">${qty}x ${name}</p>
                ${category ? `<p style="font-size: 11px; color: #888; margin: 2px 0 0; text-transform: uppercase; font-weight: 700;">${category}</p>` : ''}
                ${description ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;">${description}</p>` : ''}
                ${features.length > 0 ? `<p style="font-size: 11px; color: #999; margin: 4px 0 0;">📋 ${features.join(' · ')}</p>` : ''}
                ${designUrl ? `<a href="${typeof window !== 'undefined' ? window.location.origin : ''}${designUrl}" style="font-size: 12px; color: #7B1FA2; font-weight: 700; text-decoration: none; margin-top: 4px; display: inline-block;">🔗 Ver diseño</a>` : ''}
              </div>
              <div style="text-align: right; flex-shrink: 0;">
                <p style="font-size: 14px; font-weight: 900; color: #1a1a1a; margin: 0;">${price}</p>
              </div>
            </div>
          </td>
        </tr>`;
      return html;
    }

    // text
    let text = `• ${qty}x ${name} — ${price}`;
    if (category) text += `\n  ${category}`;
    if (features.length > 0) text += `\n  ${features.join(', ')}`;
    return text;
  });
}

// ─── Helper: construir detalle de envío ───
function buildShippingDetail(order: any, format: 'whatsapp' | 'html') {
  const delivery = DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod || '';

  if (format === 'whatsapp') {
    let lines = '';
    if (order.shippingName) lines += `%0A👤 *Destinatario:* ${order.shippingName}`;
    if (order.shippingAddress) lines += `%0A📍 *Dirección:* ${order.shippingAddress}${order.shippingCity ? `, ${order.shippingCity}` : ''}`;
    if (delivery) lines += `%0A🚚 *Envío:* ${delivery}`;
    if (order.trackingNumber) lines += `%0A📦 *Guía:* ${order.trackingNumber}`;
    if (order.trackingUrl) lines += `%0A🔗 Rastrear: ${order.trackingUrl}`;
    return lines;
  }

  // html
  return `
    <div style="background: #f8f9fa; border-radius: 10px; padding: 16px; margin-top: 16px;">
      <p style="font-size: 11px; font-weight: 900; color: #999; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Datos de Envío</p>
      ${order.shippingName ? `<p style="font-size: 13px; color: #444; margin: 4px 0;">👤 <strong>${order.shippingName}</strong></p>` : ''}
      ${order.shippingAddress ? `<p style="font-size: 13px; color: #444; margin: 4px 0;">📍 ${order.shippingAddress}${order.shippingCity ? `, ${order.shippingCity}` : ''}</p>` : ''}
      ${delivery ? `<p style="font-size: 13px; color: #444; margin: 4px 0;">🚚 ${delivery}</p>` : ''}
      ${order.trackingNumber ? `
        <div style="background: #F3E5F5; border: 1px solid #CE93D8; border-radius: 8px; padding: 10px 14px; margin-top: 10px;">
          <p style="font-size: 11px; font-weight: 700; color: #7B1FA2; margin: 0 0 2px; text-transform: uppercase;">Número de Guía</p>
          <p style="font-size: 15px; font-weight: 900; color: #4A148C; margin: 0;">${order.trackingNumber}</p>
          ${order.trackingUrl ? `<a href="${order.trackingUrl}" style="font-size: 12px; color: #7B1FA2; margin-top: 4px; display: inline-block;">🔗 Rastrear envío</a>` : ''}
        </div>
      ` : ''}
    </div>
  `;
}

export function OrderHistory({ orders, isAdmin = false }: OrderProps) {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [editingTracking, setEditingTracking] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingUrlInput, setTrackingUrlInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Modal states
  const [emailModal, setEmailModal] = useState<{
    isOpen: boolean; to: string; subject: string;
    htmlPreview: string; textBody: string; htmlBody: string;
  }>({ isOpen: false, to: '', subject: '', htmlPreview: '', textBody: '', htmlBody: '' });

  const [waModal, setWaModal] = useState<{
    isOpen: boolean; phone: string; messagePreview: string; rawMessage: string;
  }>({ isOpen: false, phone: '', messagePreview: '', rawMessage: '' });

  const [phoneInputs, setPhoneInputs] = useState<Record<string, string>>({});

  const toggleExpand = (orderId: string) => {
    setExpandedOrders(prev => {
      const next = new Set(prev);
      next.has(orderId) ? next.delete(orderId) : next.add(orderId);
      return next;
    });
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      window.location.reload();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleSaveTracking = async (orderId: string) => {
    setSaving(true);
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: trackingInput, trackingUrl: trackingUrlInput })
      });
      setEditingTracking(null);
      window.location.reload();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleSaveNotes = async (orderId: string) => {
    setSaving(true);
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: notesInput })
      });
      setEditingNotes(null);
      window.location.reload();
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ─── Constructores de mensajes ─────────────────────────
  const getTrackingUrl = (orderId: string) =>
    typeof window !== 'undefined' ? `${window.location.origin}/pedido/${orderId}` : `/pedido/${orderId}`;

  const buildWhatsAppPlainText = (order: any) => {
    const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
    const orderId = order.id.slice(-6).toUpperCase();
    const trackingPageUrl = getTrackingUrl(order.id);

    // ── PRIMERA ETAPA: mensaje completo con todos los detalles ──
    if (order.status === 'PENDING') {
      let msg = `Hola ${order.shippingName || 'cliente'}! 👋\n`;
      msg += `Te escribimos de *Pigmento Stickers* 🎨\n\n`;
      msg += `✅ *¡Tu pedido ha sido recibido!*\n\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📋 *PEDIDO #${orderId}*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `🛒 *PRODUCTOS:*\n\n`;

      order.items.forEach((item: any) => {
        const meta = item.metadata ? JSON.parse(item.metadata) : null;
        const name = item.product?.name || meta?.name || meta?.materialName || 'Sticker';
        const price = formatPrice(item.price * item.quantity);
        const category = meta?.category || '';
        const features = meta?.features || [];
        const designUrl = item.fileUrl ? `${typeof window !== 'undefined' ? window.location.origin : ''}/view-design/${item.fileUrl.split('/').pop()}` : '';

        msg += `• *${item.quantity}x ${name}* — ${price}\n`;
        if (category) msg += `  _${category}_\n`;
        if (features.length > 0) msg += `  _${features.join(', ')}_\n`;
        if (designUrl) msg += `  🔗 Ver diseño: ${designUrl}\n`;
        msg += `\n`;
      });

      msg += `━━━━━━━━━━━━━━━━━━━━\n`;
      if (order.shippingName) msg += `👤 *Destinatario:* ${order.shippingName}\n`;
      if (order.shippingAddress) msg += `📍 *Dirección:* ${order.shippingAddress}${order.shippingCity ? `, ${order.shippingCity}` : ''}\n`;
      if (order.deliveryMethod) msg += `🚚 *Envío:* ${DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod}\n`;
      msg += `\n💰 *TOTAL: ${formatPrice(order.amount)}*\n\n`;
      msg += `📱 Sigue tu pedido aquí:\n${trackingPageUrl}\n\n`;
      msg += `¿Alguna pregunta? Estamos para ti. 🎨`;

      return msg;
    }

    // ── ETAPAS POSTERIORES: mensaje corto + link ──
    let msg = `Hola ${order.shippingName || 'cliente'}! 👋\n`;
    msg += `Te escribimos de *Pigmento Stickers* 🎨\n\n`;
    msg += `${statusConf.icon} *Tu pedido #${orderId}* está ahora:\n`;
    msg += `*${statusConf.label.toUpperCase()}*\n\n`;

    // Mensaje específico por etapa
    if (order.status === 'PRODUCTION') {
      msg += `Estamos trabajando en tu pedido. Te notificaremos cuando esté listo. 🔧\n\n`;
    } else if (order.status === 'PACKING') {
      msg += `¡Tu pedido ya está listo y lo estamos empacando! 📦\n\n`;
    } else if (order.status === 'SHIPPED') {
      msg += `¡Tu pedido va en camino! 🚚\n\n`;
      if (order.trackingNumber) {
        msg += `📦 *Guía de envío:* ${order.trackingNumber}\n`;
        if (order.trackingUrl) msg += `🔗 Rastrear: ${order.trackingUrl}\n`;
        msg += `\n`;
      }
    } else if (order.status === 'COMPLETED') {
      msg += `¡Esperamos que disfrutes tus stickers! 🎉\n\n`;
    }

    msg += `💰 *Total:* ${formatPrice(order.amount)}\n\n`;
    msg += `📱 *Ver detalles de tu pedido:*\n${trackingPageUrl}\n\n`;
    msg += `¿Alguna pregunta? Estamos para ti. 🎨`;

    return msg;
  };

  const buildWhatsAppPreviewHtml = (order: any) => {
    const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
    const orderId = order.id.slice(-6).toUpperCase();

    let html = `<p>Hola <strong>${order.shippingName || 'cliente'}</strong>! 👋</p>`;
    html += `<p>Te escribimos de <strong>Pigmento Stickers</strong> 🎨</p>`;
    html += `<hr style="border:none;border-top:1px solid #ccc;margin:8px 0"/>`;
    html += `<p>📋 <strong>PEDIDO #${orderId}</strong></p>`;
    html += `<p>${statusConf.icon} Estado: <strong>${statusConf.label.toUpperCase()}</strong></p>`;
    html += `<hr style="border:none;border-top:1px solid #ccc;margin:8px 0"/>`;
    html += `<p>🛒 <strong>PRODUCTOS:</strong></p>`;

    order.items.forEach((item: any) => {
      const meta = item.metadata ? JSON.parse(item.metadata) : null;
      const name = item.product?.name || meta?.name || meta?.materialName || 'Sticker';
      const category = meta?.category || '';
      const features = meta?.features || [];
      const designUrl = item.fileUrl ? `/view-design/${item.fileUrl.split('/').pop()}` : '';
      const price = formatPrice(item.price * item.quantity);

      html += `<div style="padding:6px 0;border-bottom:1px dashed #ddd">`;
      html += `<p style="margin:0"><strong>${item.quantity}x ${name}</strong> — ${price}</p>`;
      if (category) html += `<p style="margin:2px 0;font-size:12px;color:#888">${category}</p>`;
      if (features.length > 0) html += `<p style="margin:2px 0;font-size:11px;color:#999">📋 ${features.join(' · ')}</p>`;
      if (designUrl) html += `<p style="margin:2px 0;font-size:12px"><a href="${typeof window !== 'undefined' ? window.location.origin : ''}${designUrl}" style="color:#7B1FA2;font-weight:700">🔗 Ver diseño</a></p>`;
      html += `</div>`;
    });

    if (order.shippingName) html += `<p style="margin-top:8px">👤 <strong>${order.shippingName}</strong></p>`;
    if (order.shippingAddress) html += `<p>📍 ${order.shippingAddress}${order.shippingCity ? `, ${order.shippingCity}` : ''}</p>`;
    if (order.deliveryMethod) html += `<p>🚚 ${DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod}</p>`;
    if (order.trackingNumber) {
      html += `<p>📦 <strong>Guía:</strong> ${order.trackingNumber}</p>`;
      if (order.trackingUrl) html += `<p><a href="${order.trackingUrl}" style="color:#7B1FA2">🔗 Rastrear</a></p>`;
    }

    html += `<hr style="border:none;border-top:1px solid #ccc;margin:8px 0"/>`;
    html += `<p>💰 <strong>TOTAL: ${formatPrice(order.amount)}</strong></p>`;
    html += `<p style="color:#999;font-size:12px;margin-top:8px">¿Alguna pregunta? Estamos para ti. 🎨</p>`;

    return html;
  };

  const openWhatsAppModal = (order: any) => {
    const phone = order.contactPhone || '';
    const plainMessage = buildWhatsAppPlainText(order);
    const messagePreview = buildWhatsAppPreviewHtml(order);
    setWaModal({ isOpen: true, phone, messagePreview, rawMessage: plainMessage });
  };

  // ─── Email ─────────────────────────
  const buildEmailContent = (order: any) => {
    const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
    const name = order.shippingName || 'cliente';
    const orderId = order.id.slice(-6).toUpperCase();
    const total = formatPrice(order.amount);
    const itemsHtml = buildItemsDetail(order, 'html').join('');
    const itemsText = buildItemsDetail(order, 'text').join('\n');
    const shippingHtml = buildShippingDetail(order, 'html');

    const textBody = [
      `Hola ${name},`,
      '',
      `Tu pedido #${orderId} está ahora: ${statusConf.label}`,
      '',
      'PRODUCTOS:',
      itemsText,
      '',
      `Total: ${total}`,
      order.trackingNumber ? `\nGuía de envío: ${order.trackingNumber}` : '',
      order.trackingUrl ? `Rastrear: ${order.trackingUrl}` : '',
      '',
      '¡Gracias por tu compra! — Pigmento Stickers 🎨',
    ].filter(Boolean).join('\n');

    const htmlBody = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 0; background: #ffffff;">
        <div style="background: #1a1a1a; padding: 24px; text-align: center; border-radius: 16px 16px 0 0;">
          <h1 style="font-size: 22px; font-weight: 900; color: white; margin: 0;">Pigmento Stickers 🎨</h1>
        </div>
        <div style="padding: 28px 24px; border: 1px solid #eee; border-top: none; border-radius: 0 0 16px 16px;">
          <p style="font-size: 15px; color: #333; margin: 0 0 6px;">Hola <strong>${name}</strong>,</p>
          <p style="font-size: 15px; color: #333; margin: 0 0 20px;">Tu pedido <strong>#${orderId}</strong> ha sido actualizado:</p>
          <div style="background: #FFF8E1; border: 2px solid #FFD54F; border-radius: 10px; padding: 14px 18px; text-align: center; margin-bottom: 20px;">
            <p style="font-size: 12px; color: #666; margin: 0 0 4px; text-transform: uppercase; font-weight: 700;">Estado del pedido</p>
            <span style="font-size: 18px; font-weight: 900; color: #1a1a1a;">${statusConf.icon} ${statusConf.label.toUpperCase()}</span>
          </div>
          <p style="font-size: 11px; font-weight: 900; color: #999; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Tu pedido</p>
          <table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>
          ${shippingHtml}
          <div style="background: #1a1a1a; border-radius: 10px; padding: 16px; margin-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #999; margin: 0 0 4px;">Total del pedido</p>
            <p style="font-size: 24px; font-weight: 900; color: #FFD54F; margin: 0;">${total}</p>
          </div>
        </div>
        <p style="font-size: 11px; color: #bbb; text-align: center; margin-top: 16px;">¿Preguntas? Responde a este correo o escríbenos por WhatsApp</p>
      </div>
    `.trim();

    // Preview más limpio para el modal
    const htmlPreview = `
      <div style="font-family: sans-serif; font-size: 14px; color: #333;">
        <p>Hola <strong>${name}</strong>,</p>
        <p>Tu pedido <strong>#${orderId}</strong> está ahora: <strong>${statusConf.icon} ${statusConf.label}</strong></p>
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
        <p style="font-weight:700;font-size:11px;color:#999;text-transform:uppercase">Productos:</p>
        ${order.items.map((item: any) => {
      const meta = item.metadata ? JSON.parse(item.metadata) : null;
      const n = item.product?.name || meta?.name || meta?.materialName || 'Sticker';
      const designUrl = item.fileUrl ? `${typeof window !== 'undefined' ? window.location.origin : ''}/view-design/${item.fileUrl.split('/').pop()}` : '';
      return `<div style="padding:6px 0;border-bottom:1px solid #f5f5f5">
            <p style="margin:0"><strong>${item.quantity}x ${n}</strong> — ${formatPrice(item.price * item.quantity)}</p>
            ${meta?.category ? `<p style="margin:2px 0;font-size:11px;color:#888">${meta.category}</p>` : ''}
            ${meta?.description ? `<p style="margin:2px 0;font-size:12px;color:#666">${meta.description}</p>` : ''}
            ${designUrl ? `<p style="margin:2px 0"><a href="${designUrl}" style="color:#7B1FA2;font-size:12px;font-weight:700">🔗 Ver diseño</a></p>` : ''}
          </div>`;
    }).join('')}
        ${order.trackingNumber ? `<p style="margin-top:10px">📦 <strong>Guía:</strong> ${order.trackingNumber}</p>` : ''}
        ${order.trackingUrl ? `<p><a href="${order.trackingUrl}" style="color:#7B1FA2">🔗 Rastrear envío</a></p>` : ''}
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
        <p>💰 <strong>Total: ${total}</strong></p>
        <p style="color:#999;font-size:12px;margin-top:12px">— Pigmento Stickers 🎨</p>
      </div>
    `.trim();

    return { textBody, htmlBody, htmlPreview };
  };

  const openEmailModal = (order: any) => {
    const to = order.contactEmail || order.user?.email || '';
    const subject = `Actualización de tu pedido #${order.id.slice(-6).toUpperCase()} - Pigmento Stickers`;
    const { textBody, htmlBody, htmlPreview } = buildEmailContent(order);
    setEmailModal({ isOpen: true, to, subject, htmlPreview, textBody, htmlBody });
  };

  // ─── Render ─────────────────────────
  if (orders.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">🛍️</div>
        <h3 className="text-lg font-medium text-gray-900">No hay pedidos aún</h3>
        <p className="mt-1 text-sm text-gray-500">¡Es hora de comprar algunos stickers increíbles!</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 p-4 sm:p-6 bg-brand-gray/30">
        {orders.map((order, index) => {
          const isExpanded = expandedOrders.has(order.id);
          const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
          const firstItemMeta = order.items?.[0]?.metadata ? JSON.parse(order.items[0].metadata) : null;
          const appliedCoupon = firstItemMeta?.coupon;
          const appliedDiscount = firstItemMeta?.discount;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-100/80 rounded-3xl hover:border-brand-yellow/30 hover:shadow-lg hover:shadow-brand-yellow/5 transition-all w-full overflow-hidden"
            >
              {/* Header */}
              <button onClick={() => toggleExpand(order.id)} className="w-full p-5 sm:p-6 text-left">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-sm font-bold text-gray-800">
                        {statusConf.icon} Pedido #{order.id.slice(-6).toUpperCase()}
                      </p>
                      {isAdmin && order.user && (
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">{order.user.email}</span>
                      )}
                      {order.trackingNumber && (
                        <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-lg">📦 {order.trackingNumber}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                    {!isExpanded && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {order.items.slice(0, 3).map((item: any) => {
                          const meta = item.metadata ? JSON.parse(item.metadata) : null;
                          return (
                            <span key={item.id} className="text-[10px] bg-brand-yellow/10 text-brand-black font-bold px-2 py-1 rounded-lg">
                              {item.quantity}x {item.product?.name || meta?.name || 'Producto'}
                            </span>
                          );
                        })}
                        {order.items.length > 3 && <span className="text-[10px] text-gray-400 font-bold">+{order.items.length - 3} más</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <div className="flex items-center gap-2">
                      {isAdmin ? (
                        <select
                          value={order.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full outline-none border-none cursor-pointer ${statusConf.bg} ${statusConf.text}`}
                        >
                          <option value="PENDING">⏳ Procesando</option>
                          <option value="PRODUCTION">🔧 En Producción</option>
                          <option value="PACKING">📋 Empacando</option>
                          <option value="SHIPPED">📦 Enviado</option>
                          <option value="COMPLETED">✅ Entregado</option>
                          <option value="CANCELLED">❌ Cancelado</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${statusConf.bg} ${statusConf.text}`}>
                          {statusConf.label}
                        </span>
                      )}
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                    <p className="text-lg font-black text-brand-black">{formatPrice(order.amount)}</p>
                  </div>
                </div>
              </button>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-100"
                  >
                    {/* ── Contacto + Envío ── */}
                    <div className="px-5 sm:px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5"><User className="w-3 h-3" /> Contacto</p>
                          <div className="space-y-1.5">
                            {order.shippingName && (
                              <div className="flex items-center gap-2">
                                <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span className="text-sm text-gray-700 font-medium">{order.shippingName}</span>
                              </div>
                            )}
                            {order.contactPhone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span className="text-sm text-gray-700 font-medium">{order.contactPhone}</span>
                                <button onClick={() => copyToClipboard(order.contactPhone, `ph-${order.id}`)} className="text-gray-300 hover:text-gray-500 transition-colors">
                                  {copiedId === `ph-${order.id}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            )}
                            {order.contactEmail && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span className="text-sm text-gray-700 font-medium">{order.contactEmail}</span>
                                <button onClick={() => copyToClipboard(order.contactEmail, `em-${order.id}`)} className="text-gray-300 hover:text-gray-500 transition-colors">
                                  {copiedId === `em-${order.id}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            )}
                            {isAdmin && order.user && (
                              <div className="flex items-center gap-2 mt-1 pt-1 border-t border-gray-100">
                                <span className="text-[10px] text-gray-400 font-bold">Cuenta:</span>
                                <span className="text-[11px] text-gray-600 font-medium">{order.user.name} ({order.user.email})</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5"><Truck className="w-3 h-3" /> Envío</p>
                          <div className="space-y-1.5">
                            {order.shippingAddress && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span className="text-sm text-gray-700 font-medium">{order.shippingAddress}{order.shippingCity ? `, ${order.shippingCity}` : ''}</span>
                              </div>
                            )}
                            {order.deliveryMethod && (
                              <div className="flex items-center gap-2">
                                <Package className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span className="text-sm text-gray-700 font-medium">{DELIVERY_LABELS[order.deliveryMethod] || order.deliveryMethod}</span>
                              </div>
                            )}
                            {order.trackingNumber && editingTracking !== order.id && (
                              <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-xl mt-1">
                                <Hash className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                                <span className="text-sm text-purple-700 font-bold">{order.trackingNumber}</span>
                                {order.trackingUrl && (
                                  <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-700"><ExternalLink className="w-3.5 h-3.5" /></a>
                                )}
                              </div>
                            )}
                            {appliedCoupon && (
                              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-lg mt-1">
                                🏷️ Cupón: {appliedCoupon} (-{(appliedDiscount * 100)}%)
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Admin tools ── */}
                    {isAdmin && (
                      <div className="px-5 sm:px-6 py-4 bg-brand-yellow/5 border-b border-gray-100 space-y-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">⚙️ Herramientas de Admin</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Tracking */}
                          <div>
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Número de Rastreo</label>
                            {editingTracking === order.id ? (
                              <div className="space-y-2">
                                <input type="text" value={trackingInput} onChange={(e) => setTrackingInput(e.target.value)} placeholder="Ej: INT1234567890"
                                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none" />
                                <input type="url" value={trackingUrlInput} onChange={(e) => setTrackingUrlInput(e.target.value)} placeholder="URL de rastreo (opcional)"
                                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none" />
                                <div className="flex gap-2">
                                  <button onClick={() => handleSaveTracking(order.id)} disabled={saving}
                                    className="text-[10px] font-black bg-brand-yellow text-brand-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors uppercase tracking-wider disabled:opacity-50">
                                    {saving ? 'Guardando...' : 'Guardar'}
                                  </button>
                                  <button onClick={() => setEditingTracking(null)}
                                    className="text-[10px] font-black text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wider">Cancelar</button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => { setTrackingInput(order.trackingNumber || ''); setTrackingUrlInput(order.trackingUrl || ''); setEditingTracking(order.id); }}
                                className="text-[11px] font-bold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5">
                                <Hash className="w-3 h-3" />
                                {order.trackingNumber ? `Editar: ${order.trackingNumber}` : 'Agregar número de rastreo'}
                              </button>
                            )}
                          </div>
                          {/* Notes */}
                          <div>
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Notas Internas</label>
                            {editingNotes === order.id ? (
                              <div className="space-y-2">
                                <textarea value={notesInput} onChange={(e) => setNotesInput(e.target.value)} placeholder="Notas privadas..." rows={3}
                                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none resize-none" />
                                <div className="flex gap-2">
                                  <button onClick={() => handleSaveNotes(order.id)} disabled={saving}
                                    className="text-[10px] font-black bg-brand-yellow text-brand-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors uppercase tracking-wider disabled:opacity-50">
                                    {saving ? 'Guardando...' : 'Guardar'}
                                  </button>
                                  <button onClick={() => setEditingNotes(null)}
                                    className="text-[10px] font-black text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wider">Cancelar</button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => { setNotesInput(order.adminNotes || ''); setEditingNotes(order.id); }}
                                className="text-[11px] font-bold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 w-full text-left">
                                <StickyNote className="w-3 h-3 shrink-0" />
                                <span className="truncate">{order.adminNotes || 'Agregar notas internas'}</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Photo upload */}
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">📸 Fotos del Proceso</label>
                          {(() => {
                            const photos: string[] = order.progressPhotos ? JSON.parse(order.progressPhotos) : [];
                            return (
                              <div className="space-y-2">
                                {photos.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {photos.map((url: string, i: number) => (
                                      <div key={i} className="relative group">
                                        <img src={url} alt={`Foto ${i + 1}`} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                                        <button
                                          onClick={async () => {
                                            const updated = photos.filter((_: string, idx: number) => idx !== i);
                                            await fetch(`/api/orders/${order.id}`, {
                                              method: 'PATCH',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({ progressPhotos: JSON.stringify(updated) })
                                            });
                                            window.location.reload();
                                          }}
                                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <label className="cursor-pointer inline-flex items-center gap-1.5 text-[10px] font-black bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-wider">
                                  📷 Subir Foto
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      const formData = new FormData();
                                      formData.append('file', file);
                                      try {
                                        // Upload to uploadthing via their API
                                        const reader = new FileReader();
                                        reader.onload = async () => {
                                          const base64 = reader.result as string;
                                          const updated = [...photos, base64];
                                          await fetch(`/api/orders/${order.id}`, {
                                            method: 'PATCH',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ progressPhotos: JSON.stringify(updated) })
                                          });
                                          window.location.reload();
                                        };
                                        reader.readAsDataURL(file);
                                      } catch (err) {
                                        console.error('Error uploading photo:', err);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Notification buttons */}
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Notificar al Cliente</label>
                          <div className="flex flex-wrap gap-2 items-center">
                            {/* WhatsApp - siempre visible */}
                            {order.contactPhone ? (
                              <button
                                onClick={() => openWhatsAppModal(order)}
                                className="inline-flex items-center gap-1.5 text-[10px] font-black bg-[#25D366] text-white px-3 py-2 rounded-lg hover:bg-[#20bd5b] transition-colors uppercase tracking-wider"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                Notificar por WhatsApp
                              </button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <input
                                  type="tel"
                                  placeholder="Tel. cliente (ej: 3161234567)"
                                  value={phoneInputs[order.id] || ''}
                                  onChange={(e) => setPhoneInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                                  className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] outline-none w-44"
                                />
                                <button
                                  onClick={() => {
                                    if (phoneInputs[order.id]?.trim()) {
                                      openWhatsAppModal({ ...order, contactPhone: phoneInputs[order.id].trim() });
                                    }
                                  }}
                                  disabled={!phoneInputs[order.id]?.trim()}
                                  className="inline-flex items-center gap-1.5 text-[10px] font-black bg-[#25D366] text-white px-3 py-2 rounded-lg hover:bg-[#20bd5b] transition-colors uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  WhatsApp
                                </button>
                              </div>
                            )}
                            {/* Email - siempre visible si hay email */}
                            {(order.contactEmail || order.user?.email) && (
                              <button
                                onClick={() => openEmailModal(order)}
                                className="inline-flex items-center gap-1.5 text-[10px] font-black bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors uppercase tracking-wider"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                Notificar por Correo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── Items ── */}
                    <div className="px-5 sm:px-6 py-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Productos ({order.items.length})</p>
                      <div className="space-y-3">
                        {order.items.map((item: any) => {
                          const metadata = item.metadata ? JSON.parse(item.metadata) : null;
                          const itemName = item.product?.name || metadata?.name || metadata?.materialName || 'Sticker Personalizado';
                          const itemCategory = metadata?.category;
                          const itemDescription = metadata?.description;
                          const itemFeatures = metadata?.features || [];
                          return (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="h-12 w-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center overflow-hidden border border-brand-yellow/20 shrink-0">
                                  {item.product?.image ? (
                                    <img src={item.product.image} alt={itemName} className="object-cover w-full h-full" />
                                  ) : (
                                    <span className="text-lg">🎨</span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold text-gray-900">{itemName}</h4>
                                  <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                                    <span className="text-[10px] text-gray-500 font-medium">Cant: {item.quantity}</span>
                                    {itemCategory && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-bold uppercase">{itemCategory}</span>}
                                    {metadata?.dimensions && <span className="text-[10px] bg-brand-yellow/10 px-1.5 py-0.5 rounded text-brand-black font-bold">{metadata.dimensions}</span>}
                                    {metadata?.cutTypeName && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-bold uppercase">{metadata.cutTypeName}</span>}
                                  </div>
                                  {itemFeatures.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {itemFeatures.map((f: string, i: number) => (
                                        <span key={i} className="text-[9px] bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-gray-500">{f}</span>
                                      ))}
                                    </div>
                                  )}
                                  {itemDescription && <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{itemDescription}</p>}
                                </div>
                              </div>
                              <div className="flex items-center justify-between sm:justify-end gap-3 sm:flex-col sm:items-end">
                                <p className="text-sm font-black text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                {item.fileUrl && (
                                  <a href={`/view-design/${item.fileUrl.split('/').pop()}`} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 bg-brand-black text-white text-[10px] font-black px-3 py-1.5 rounded-lg hover:bg-brand-yellow hover:text-black transition-all uppercase tracking-tight">
                                    <ExternalLink className="w-3 h-3" /> Ver Diseño
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Modals */}
      <EmailPreviewModal
        isOpen={emailModal.isOpen}
        onClose={() => setEmailModal(prev => ({ ...prev, isOpen: false }))}
        to={emailModal.to}
        subject={emailModal.subject}
        htmlPreview={emailModal.htmlPreview}
        textBody={emailModal.textBody}
        htmlBody={emailModal.htmlBody}
      />
      <WhatsAppPreviewModal
        isOpen={waModal.isOpen}
        onClose={() => setWaModal(prev => ({ ...prev, isOpen: false }))}
        phone={waModal.phone}
        messagePreview={waModal.messagePreview}
        plainMessage={waModal.rawMessage}
      />
    </>
  );
}
