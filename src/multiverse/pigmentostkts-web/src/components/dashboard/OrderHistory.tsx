"use client";

import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";

type OrderProps = {
  orders: any[];
  isAdmin?: boolean;
};

export function OrderHistory({ orders, isAdmin = false }: OrderProps) {
  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        window.location.reload(); // Recarga simple para reflejar cambios
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  if (orders.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          🛍️
        </div>
        <h3 className="text-lg font-medium text-gray-900">No hay pedidos aún</h3>
        <p className="mt-1 text-sm text-gray-500">¡Es hora de comprar algunos stickers increíbles!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Pedido #{order.id.slice(-6).toUpperCase()}</p>
              <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="mt-2 sm:mt-0 text-right">
              {isAdmin ? (
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1 rounded-full outline-none border-none transition-all cursor-pointer ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  <option value="PENDING">Procesando</option>
                  <option value="PRODUCTION">En Producción</option>
                  <option value="SHIPPED">Enviado</option>
                  <option value="COMPLETED">Entregado</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              ) : (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                  {order.status === 'COMPLETED' ? 'Entregado' :
                    order.status === 'PENDING' ? 'Procesando' :
                      order.status === 'PRODUCTION' ? 'En Producción' :
                        order.status === 'SHIPPED' ? 'Enviado' :
                          order.status === 'CANCELLED' ? 'Cancelado' : order.status}
                </span>
              )}
              <p className="text-lg font-bold text-brand-black mt-1">{formatPrice(order.amount)}</p>
            </div>
          </div>

          <div className="space-y-4">
            {order.items.map((item: any) => {
              const metadata = item.metadata ? JSON.parse(item.metadata) : null;

              return (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-14 w-14 rounded-xl bg-brand-yellow/10 flex items-center justify-center overflow-hidden border border-brand-yellow/20 shrink-0">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product?.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-xl">🎨</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {item.product?.name || metadata?.materialName || 'Sticker Personalizado'}
                      </h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
                        <p className="text-[10px] text-gray-500 font-medium">Cant: {item.quantity}</p>
                        {metadata?.dimensions && (
                          <p className="text-[10px] text-brand-black font-bold uppercase">{metadata.dimensions}</p>
                        )}
                        {metadata?.cutTypeName && (
                          <p className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-bold uppercase">{metadata.cutTypeName}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0">
                    <p className="text-sm font-black text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    {item.fileUrl && (
                      <a
                        href={`/view-design/${item.fileUrl.split('/').pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-black text-white text-[10px] font-black px-3 py-1.5 rounded-lg hover:bg-brand-yellow hover:text-black transition-all uppercase tracking-tight"
                      >
                        Ver Diseño
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}