'use client';

import React, { useState, useMemo } from 'react';
import { FaCar, FaTruckMonster, FaCheckCircle, FaCalculator, FaTag } from 'react-icons/fa';

const VEHICLE_TYPES = [
    { id: 'auto', label: 'Automóvil', icon: FaCar },
    { id: 'suv', label: 'SUV / Camioneta', icon: FaTruckMonster },
];

const SERVICES = [
    {
        id: 'sylex',
        name: 'Protección Cerámica SYLEX 9H',
        prices: { auto: 1090000, suv: 1290000 },
        category: 'Cerámicos',
        benefits: ["Cerámico en todos los vidrios incluido", "Corrección de pintura profesional 95%", "Mantenimiento inicial GRATIS", "Lavado de tapicería incluido"]
    },
    {
        id: 'systemx',
        name: 'Crystal System X USA (5 Años)',
        prices: { auto: 1390000, suv: 1590000 },
        category: 'Cerámicos',
        benefits: ["Tecnología americana de élite", "Garantía certificada", "Cerámico en todos los vidrios", "Protección extrema UV"]
    },
    {
        id: 'gtechniq',
        name: 'GTECHNIQ Crystal Serum Light',
        prices: { auto: 1690000, suv: 1890000 },
        category: 'Cerámicos',
        benefits: ["Tecnología británica 9H+", "Máximo brillo espejo", "Corrección de pintura nivel concurso", "Resistencia química superior"]
    },
    {
        id: 'wax-restoration',
        name: 'Restauración con Cera Premium',
        prices: { auto: 650000, suv: 750000 },
        category: 'Cerámicos',
        benefits: ["Corrección de pintura (Hologramas)", "Cera de alta gama aplicada", "Brillo profundo restaurado", "Opción ideal sin cerámico"]
    },
    {
        id: 'ppf-full',
        name: 'PPF Completo (Ultra Protection)',
        prices: { auto: 12000000, suv: 14000000 },
        category: 'Protección',
        benefits: ["Cobertura total del vehículo", "Autorregenerable", "Protección máxima", "Valoración física obligatoria"]
    },
    {
        id: 'ppf-front',
        name: 'PPF Kit Frontal (Más pedido)',
        prices: { auto: 2800000, suv: 3500000 },
        category: 'Protección',
        benefits: ["Bumper delantero, Capó y Guardabarros", "Protección contra piedras", "Garantía de 10 años"]
    },
    {
        id: 'ppf-bumpers',
        name: 'PPF Bumpers (Frontal + Trasero)',
        prices: { auto: 1800000, suv: 2200000 },
        category: 'Protección',
        benefits: ["Protección en zonas de impacto", "Evita rayones de parqueo", "Sellado hidrofóbico incluido"]
    },
    {
        id: 'ppf-doors',
        name: 'PPF Kit Puertas',
        prices: { auto: 1200000, suv: 1500000 },
        category: 'Protección',
        benefits: ["Protección 4 puertas", "Evita rayones laterales", "Auto-curación con sol/calor"]
    },
    {
        id: 'ppf-interior',
        name: 'PPF Kit Interior (Negro Piano)',
        prices: { auto: 450000, suv: 650000 },
        category: 'Protección',
        benefits: ["Protección consolas y pantallas", "Evita micro-rayones", "Precio base aproximado"]
    },
    {
        id: 'ceramic-ppf',
        name: 'Cerámico HALO (Especial PPF)',
        prices: { auto: 750000, suv: 900000 },
        category: 'Protección',
        benefits: ["Sellado específico para film", "Máxima hidrofobia", "Aplicación de 2 horas", "Protección UV"]
    },
    {
        id: 'polarizado',
        name: 'Polarizado SUN GUARD Premium',
        prices: { auto: 750000, suv: 850000 },
        category: 'Protección',
        benefits: ["Rechazo de calor IR 90%", "Protección UV 99.9%", "Visibilidad nocturna HD"]
    },
    {
        id: 'aqua-wash',
        name: 'Lavado Premium Aqua Wash',
        prices: { auto: 125000, suv: 135000 },
        category: 'Lavado',
        benefits: ["Exterior profesional", "Interior detallado", "Hidratación neumáticos"]
    },
    {
        id: 'engine',
        name: 'Detallado de Motor',
        prices: { auto: 70000, suv: 90000 },
        category: 'Lavado',
        benefits: ["Desengrase profundo", "Protección de plásticos", "Seguro para componentes"]
    },
    {
        id: 'upholstery',
        name: 'Tapicería Full Clean',
        prices: { auto: 255000, suv: 300000 },
        category: 'Interior',
        benefits: ["Inyección-succión", "Vaporización de ductos", "Hidratación cuero"]
    },
    {
        id: 'wrap-full',
        name: 'Wrap Completo (Cambio Color)',
        prices: { auto: 6500000, suv: 12500000 },
        category: 'Personalización',
        benefits: ["Vinilo de alta gama", "Cambio estético radical", "Precio relativo al material"]
    },
    {
        id: 'rims-paint',
        name: 'Pintura de Rines (Set x4)',
        prices: { auto: 650000, suv: 750000 },
        category: 'Personalización',
        benefits: ["Pintura horneada", "Remoción de rayones de andén"]
    },
    {
        id: 'caliper-paint',
        name: 'Pintura de Mordazas (Set x4)',
        prices: { auto: 450000, suv: 550000 },
        category: 'Personalización',
        benefits: ["Alta temperatura", "Look deportivo custom"]
    },
    {
        id: 'pdr',
        name: 'PDR (Sin Pintar)',
        prices: { auto: 150000, suv: 150000 },
        category: 'Reparación',
        benefits: ["Mantiene pintura original", "Sin masilla ni soldadura", "Técnica artesanal rápida"]
    },
    {
        id: 'sacatocos',
        name: 'Sacatocos (Latonería - Requiere Pintura)',
        prices: { auto: 350000, suv: 350000 },
        category: 'Reparación',
        benefits: ["Soldadura de pieza", "Requiere repintado", "Reparación estructural estética"]
    },
    {
        id: 'painting',
        name: 'Pintura de Piezas',
        prices: { auto: 280000, suv: 350000 },
        category: 'Reparación',
        benefits: ["Colorimetría computarizada", "Barniz altos sólidos", "Cabina profesional"]
    }
];

interface QuoterProps {
    hasDiscount?: boolean;
    discountCode?: string;
}

const Quoter: React.FC<QuoterProps> = ({ hasDiscount: initialHasDiscount = false, discountCode: initialDiscountCode }) => {
    const [selectedVehicle, setSelectedVehicle] = useState<'auto' | 'suv'>('auto');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    // Internal discount state
    const [inputCode, setInputCode] = useState('');
    const [codeError, setCodeError] = useState(false);
    const [internalDiscount, setInternalDiscount] = useState<{ active: boolean, code: string | null }>({
        active: initialHasDiscount,
        code: initialDiscountCode || null
    });

    const toggleService = (id: string) => {
        const service = SERVICES.find(s => s.id === id);
        if (!service) return;

        setSelectedServices(prev => {
            // Si ya está seleccionado, deseleccionarlo
            if (prev.includes(id)) {
                return prev.filter(s => s !== id);
            }

            // Lógica de exclusión por categoría
            let filtered = prev;

            if (service.category === 'Cerámicos') {
                // Solo 1 cerámico a la vez
                filtered = prev.filter(sid => {
                    const s = SERVICES.find(srv => srv.id === sid);
                    return s?.category !== 'Cerámicos';
                });
            }

            if (service.category === 'Lavado') {
                // Solo 1 lavado a la vez
                filtered = prev.filter(sid => {
                    const s = SERVICES.find(srv => srv.id === sid);
                    return s?.category !== 'Lavado';
                });
            }

            return [...filtered, id];
        });
    };

    const totals = useMemo(() => {
        const subtotal = selectedServices.reduce((acc, serviceId) => {
            const service = SERVICES.find(s => s.id === serviceId);
            return acc + (service?.prices[selectedVehicle] || 0);
        }, 0);

        const isFidelity = internalDiscount.code === 'VICTORY50' || internalDiscount.code === 'victory50';
        const discountPercentage = isFidelity ? 0.50 : 0.20;
        const discount = internalDiscount.active ? subtotal * discountPercentage : 0;

        // Para fidelity: total = vehículo1 + vehículo2 (subtotal + subtotal/2)
        // Para otros: total = subtotal - descuento
        const total = isFidelity && internalDiscount.active ? subtotal + (subtotal / 2) : subtotal - discount;

        return { subtotal, discount, total, percentage: discountPercentage * 100, isFidelity };
    }, [selectedVehicle, selectedServices, internalDiscount]);

    const handleValidateCode = () => {
        const code = inputCode.toUpperCase();
        if (code === 'VICTORY50') {
            setInternalDiscount({ active: true, code: 'VICTORY50' });
            setCodeError(false);
        } else if (code.startsWith('VICTORY20-') && code.length >= 11) {
            setInternalDiscount({ active: true, code });
            setCodeError(false);
        } else {
            setCodeError(true);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-brand-dark-blue/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center text-brand-cyan">
                        <FaCalculator size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white uppercase tracking-wider">
                            Cotizador <span className="text-brand-cyan">Inteligente</span>
                        </h2>
                        <p className="text-white/70 text-sm md:text-base italic">Selecciona tu tipo de vehículo y los servicios que deseas.</p>
                    </div>
                </div>

                {/* Step 1: Vehicle Type */}
                <div className="mb-10">
                    <label className="text-xs font-orbitron text-brand-cyan uppercase tracking-widest mb-4 block">1. Tipo de Vehículo</label>
                    <div className="grid grid-cols-2 gap-4">
                        {VEHICLE_TYPES.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedVehicle(type.id as any)}
                                className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 ${selectedVehicle === type.id
                                    ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                                    }`}
                            >
                                <type.icon size={32} />
                                <span className="font-orbitron font-bold text-sm tracking-tighter uppercase">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 2: Services */}
                <div className="mb-10">
                    <label className="text-xs font-orbitron text-brand-cyan uppercase tracking-widest mb-6 block">2. Servicios Disponibles</label>

                    {[
                        { title: 'Protección Cerámica', cat: 'Cerámicos', icon: '💎', single: true },
                        { title: 'Protección Avanzada', cat: 'Protección', icon: '🛡️', single: false },
                        { title: 'Lavados Premium', cat: 'Lavado', icon: '🚿', single: true },
                        { title: 'Interior Detailing', cat: 'Interior', icon: '🪑', single: false },
                        { title: 'Personalización', cat: 'Personalización', icon: '🎨', single: false },
                        { title: 'Reparación Estética', cat: 'Reparación', icon: '🛠️', single: false },
                    ].map((category) => (
                        <div key={category.cat} className="mb-10 last:mb-0">
                            <h3 className="text-base font-orbitron text-white mb-4 flex items-center justify-between border-b border-white/10 pb-2">
                                <span className="flex items-center gap-2">
                                    <span className="text-xl">{category.icon}</span> {category.title}
                                </span>
                                {category.single && <span className="text-[10px] text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-3 py-1 rounded-full uppercase tracking-tighter font-bold">Selección Única</span>}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-4">
                                {SERVICES.filter(s => s.category === category.cat).map((service) => (
                                    <div key={service.id} className="group flex flex-col gap-1">
                                        <button
                                            onClick={() => toggleService(service.id)}
                                            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${selectedServices.includes(service.id)
                                                ? 'bg-brand-cyan/20 border-brand-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)] text-white'
                                                : 'bg-white/10 border-white/10 text-white hover:border-brand-cyan/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 text-left">
                                                <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${selectedServices.includes(service.id)
                                                    ? 'bg-brand-cyan border-brand-cyan text-brand-dark-blue'
                                                    : 'border-white/40'
                                                    }`}>
                                                    {selectedServices.includes(service.id) && <FaCheckCircle size={16} />}
                                                </div>
                                                <span className="text-[15px] font-black uppercase tracking-tight leading-tight text-white">{service.name}</span>
                                            </div>
                                            <span className="font-inter font-black text-brand-cyan whitespace-nowrap ml-4 text-sm">
                                                {formatCurrency(service.prices[selectedVehicle])}
                                            </span>
                                        </button>

                                        {/* Benefits list */}
                                        <ul className="px-4 mt-2 space-y-1.5">
                                            {service.benefits?.map((benefit, idx) => (
                                                <li key={idx} className="text-[12px] text-white flex items-start gap-2 leading-tight font-medium">
                                                    <span className="text-brand-cyan font-bold">›</span>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Table */}
                <div className="mt-12 bg-black/40 rounded-2xl p-6 md:p-8 border border-white/5">
                    <div className="space-y-3 mb-6">
                        {totals.isFidelity ? (
                            <>
                                <div className="flex justify-between text-white">
                                    <span>Vehículo 1</span>
                                    <span className="font-inter">{formatCurrency(totals.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-emerald-400 bg-emerald-400/5 p-3 rounded-lg border border-emerald-400/20">
                                    <div className="flex items-center gap-2">
                                        <FaTag size={12} />
                                        <span>Vehículo 2 (50% OFF)</span>
                                        {internalDiscount.code && <span className="text-[10px] bg-emerald-400/20 px-2 py-0.5 rounded font-mono uppercase tracking-wider">{internalDiscount.code}</span>}
                                    </div>
                                    <span className="font-inter">{formatCurrency(totals.subtotal / 2)}</span>
                                </div>
                                <p className="text-[10px] text-brand-cyan/60 uppercase tracking-widest text-right">Aplica para los mismos servicios en el segundo vehículo</p>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between text-slate-400">
                                    <span>Subtotal estimado</span>
                                    <span className="font-inter">{formatCurrency(totals.subtotal)}</span>
                                </div>
                                {internalDiscount.active && totals.discount > 0 && (
                                    <div className="flex justify-between text-emerald-400 bg-emerald-400/5 p-3 rounded-lg border border-emerald-400/20">
                                        <div className="flex items-center gap-2">
                                            <FaTag size={12} />
                                            <span>Bono de Descuento ({totals.percentage}%)</span>
                                            {internalDiscount.code && <span className="text-[10px] bg-emerald-400/20 px-2 py-0.5 rounded font-mono uppercase tracking-wider">{internalDiscount.code}</span>}
                                        </div>
                                        <span className="font-inter">-{formatCurrency(totals.discount)}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Coupon Input simplified */}
                    {!internalDiscount.active && (
                        <div className="mb-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="TIENES UN CÓDIGO?"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)}
                                    className={`flex-grow bg-white/5 border ${codeError ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2 text-white text-xs font-orbitron focus:outline-none focus:border-brand-cyan transition-colors`}
                                />
                                <button
                                    onClick={handleValidateCode}
                                    className="bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan px-4 py-2 rounded-lg text-xs font-orbitron hover:bg-brand-cyan hover:text-brand-dark-blue transition-all"
                                >
                                    APLICAR
                                </button>
                            </div>
                            <p className="text-[10px] text-white/40 mt-3 italic leading-snug">
                                * Encuentra códigos exclusivos en nuestro **Instagram**, consulta por **Bonos Físicos** al visitar nuestro taller o mantente atento a nuestras promociones activas en redes sociales.
                            </p>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                        <span className="text-xl font-orbitron font-bold text-white uppercase tracking-tighter">
                            {totals.isFidelity ? 'Total 2 Vehículos' : 'Total Inversión'}
                        </span>
                        <div className="text-right">
                            <span className="text-3xl md:text-4xl font-inter font-black text-brand-cyan block">
                                {formatCurrency(totals.total)}
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-orbitron">Base estimada / Sujeto a peritaje físico</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <p className="text-[10px] text-white/50 bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed italic">
                            * Los servicios de Wrap, PPF y Reparaciones Estéticas (PDR/Pintura) requieren una valoración técnica presencial para confirmar el costo final según el estado de la pieza y material elegido.
                        </p>
                        <a
                            href={`https://wa.me/573157742419?text=${encodeURIComponent(
                                `🚗 *COTIZACIÓN VICTORY CARS*\n\n` +
                                `Tipo de vehículo: ${selectedVehicle === 'auto' ? 'Automóvil' : 'SUV/Camioneta'}\n\n` +
                                `📋 *SERVICIOS SELECCIONADOS:*\n${selectedServices.map(sid => {
                                    const service = SERVICES.find(s => s.id === sid);
                                    return `• ${service?.name}: ${formatCurrency(service?.prices[selectedVehicle] || 0)}`;
                                }).join('\n')}\n\n` +
                                (totals.isFidelity ?
                                    `💰 *DESGLOSE (PROMO FIDELIDAD):*\n` +
                                    `Vehículo 1: ${formatCurrency(totals.subtotal)}\n` +
                                    `Vehículo 2 (50% OFF): ${formatCurrency(totals.subtotal / 2)}\n` +
                                    `───────────────────\n` +
                                    `*TOTAL ESTIMADO: ${formatCurrency(totals.total)}*\n\n` +
                                    `✅ Código aplicado: ${internalDiscount.code?.toUpperCase()}\n\n`
                                    : internalDiscount.active ?
                                        `💰 *RESUMEN:*\n` +
                                        `Subtotal: ${formatCurrency(totals.subtotal)}\n` +
                                        `Descuento (${totals.percentage}%): -${formatCurrency(totals.discount)}\n` +
                                        `───────────────────\n` +
                                        `*TOTAL ESTIMADO: ${formatCurrency(totals.total)}*\n\n` +
                                        `✅ Código aplicado: ${internalDiscount.code?.toUpperCase()}\n\n`
                                        :
                                        `💰 *TOTAL ESTIMADO: ${formatCurrency(totals.total)}*\n\n`
                                ) +
                                `⚠️ *Nota:* Entiendo que este valor es un estimado y requiere validación técnica en el taller.\n\n` +
                                `Deseo agendar mi valoración. ¿Cuándo tienen disponibilidad?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-brand-cyan text-brand-dark-blue font-orbitron font-bold py-4 rounded-xl text-center hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] uppercase tracking-wider"
                        >
                            Solicitar Valoración por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quoter;
