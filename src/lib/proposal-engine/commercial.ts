import type {
    AlternativePackageOption,
    CommercialData,
    CommercialItem,
    DiscountRule,
    PaymentMethod,
    PaymentTerm,
    TaxRule,
} from './types';

// =============================================================================
// 01 / 02 · DETERMINISTIC FINANCIAL ENGINE (Never delegated to LLM)
// All amounts, subtotals, discounts, and 50/50 split terms are calculated
// with exact integer arithmetic in COP.
// =============================================================================

export function formatCOP(value: number): string {
    const safe = Number.isFinite(value) ? Math.round(value) : 0;
    return `$ ${safe.toLocaleString('es-CO')} COP`;
}

export function formatCOPCompact(value: number): string {
    const safe = Number.isFinite(value) ? Math.round(value) : 0;
    return `$ ${safe.toLocaleString('es-CO')}`;
}

export function addDaysToISODate(isoDate: string, days: number): string {
    const parsed = new Date(`${isoDate}T12:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return isoDate;
    parsed.setUTCDate(parsed.getUTCDate() + Math.max(0, days));
    return parsed.toISOString().slice(0, 10);
}

export interface CalculateCommercialInput {
    issueDate: string;
    validDays: number;
    items: Array<{
        id: string;
        title: string;
        description: string;
        phaseLabel: string;
        quantity: number;
        unitLabel: string;
        listUnitPrice?: number;
        unitPrice: number;
        providerTag: string;
    }>;
    discountLabel?: string;
    taxRegimeLabel?: string;
    taxExemptNotice?: string;
    paymentMethods: PaymentMethod[];
    alternativePackages?: Array<Omit<AlternativePackageOption, 'discountAmount' | 'discountPercentage' | 'advanceAmount' | 'balanceAmount'>>;
    legalConditions: { title: string; body: string }[];
    warrantySummary: string;
    /** Optional fixed net total override when proposal represents multi-tier matrix options */
    overrideGrandTotal?: number;
    overrideDiscountAmount?: number;
    overrideDiscountPercentage?: number;
}

export function calculateCommercialData(input: CalculateCommercialInput): CommercialData {
    const normalizedItems: CommercialItem[] = input.items.map((raw) => {
        const qty = Math.max(1, Math.round(raw.quantity || 1));
        const unitPrice = Math.max(0, Math.round(raw.unitPrice || 0));
        const listUnitPrice = Math.max(unitPrice, Math.round(raw.listUnitPrice ?? unitPrice));
        return {
            id: raw.id,
            title: raw.title,
            description: raw.description,
            phaseLabel: raw.phaseLabel,
            quantity: qty,
            unitLabel: raw.unitLabel || 'Módulo',
            listUnitPrice,
            unitPrice,
            subtotal: qty * unitPrice,
            providerTag: raw.providerTag,
        };
    });

    const listSubtotal = normalizedItems.reduce(
        (acc, item) => acc + item.quantity * item.listUnitPrice,
        0,
    );
    const netItemsTotal = normalizedItems.reduce(
        (acc, item) => acc + item.subtotal,
        0,
    );

    const computedDiscount = Math.max(0, listSubtotal - netItemsTotal);
    const discountAmount =
        typeof input.overrideDiscountAmount === 'number'
            ? Math.max(0, Math.round(input.overrideDiscountAmount))
            : computedDiscount;

    const discountPercentage =
        typeof input.overrideDiscountPercentage === 'number'
            ? Number(input.overrideDiscountPercentage.toFixed(2))
            : listSubtotal > 0
                ? Number(((discountAmount / listSubtotal) * 100).toFixed(2))
                : 0;

    const discounts: DiscountRule[] =
        discountAmount > 0
            ? [
                  {
                      label: input.discountLabel || 'Beneficio Alianza purrpurr.dev × Speedlight',
                      percentage: discountPercentage,
                      amount: discountAmount,
                      appliesTo: 'Tarifa Lista Consolidada',
                  },
              ]
            : [];

    // Tax policy: Régimen No Responsable de IVA -> closed net totals (0% tax)
    const taxes: TaxRule[] = [
        {
            regimeLabel: input.taxRegimeLabel || 'Régimen No Responsable de IVA (Valor Neto Cerrado)',
            taxRatePercentage: 0,
            taxAmount: 0,
            exemptNotice:
                input.taxExemptNotice ||
                'Operación exenta de IVA. El valor total estipulado es neto, definitivo y no incluye recargos tributarios ni comisiones de pasarela.',
        },
    ];
    const taxTotal = 0;

    const grandTotal =
        typeof input.overrideGrandTotal === 'number'
            ? Math.max(0, Math.round(input.overrideGrandTotal))
            : Math.max(0, netItemsTotal + taxTotal);

    const advanceAmount = Math.round(grandTotal * 0.5);
    const balanceAmount = grandTotal - advanceAmount;

    const paymentTerms: PaymentTerm[] = [
        {
            id: 'term-advance-50',
            label: 'Anticipo 50% — Inicio & Reserva',
            percentage: 50,
            amount: advanceAmount,
            triggerDescription: 'A la aprobación de la propuesta para habilitar arquitectura, cronograma y reserva operativa.',
        },
        {
            id: 'term-balance-50',
            label: 'Saldo 50% — Contra Entrega Verificada',
            percentage: 50,
            amount: balanceAmount,
            triggerDescription: 'Al verificar el 100% de entregables funcionales y actas de entrega a satisfacción.',
        },
    ];

    const alternativePackages: AlternativePackageOption[] = (input.alternativePackages || []).map((pkg) => {
        const pkgList = Math.max(pkg.total, Math.round(pkg.listPrice));
        const pkgTotal = Math.max(0, Math.round(pkg.total));
        const pkgDiscount = Math.max(0, pkgList - pkgTotal);
        const pkgDiscountPct = pkgList > 0 ? Math.round((pkgDiscount / pkgList) * 100) : 0;
        const pkgAdvance = Math.round(pkgTotal * 0.5);
        const pkgBalance = pkgTotal - pkgAdvance;

        return {
            ...pkg,
            listPrice: pkgList,
            total: pkgTotal,
            discountAmount: pkgDiscount,
            discountPercentage: pkgDiscountPct,
            advanceAmount: pkgAdvance,
            balanceAmount: pkgBalance,
        };
    });

    return {
        currency: 'COP',
        issueDate: input.issueDate,
        validDays: input.validDays,
        validUntil: addDaysToISODate(input.issueDate, input.validDays),
        items: normalizedItems,
        listSubtotal,
        netItemsTotal,
        discounts,
        discountTotal: discountAmount,
        taxes,
        taxTotal,
        grandTotal,
        paymentTerms,
        paymentMethods: input.paymentMethods,
        alternativePackages,
        legalConditions: input.legalConditions,
        warrantySummary: input.warrantySummary,
    };
}

export interface CommercialMathVerification {
    itemsSumValid: boolean;
    discountMathValid: boolean;
    paymentSplitValid: boolean;
    packagesValid: boolean;
    zeroProhibitedTaxText: boolean;
    details: string[];
}

export function verifyCommercialMath(data: CommercialData): CommercialMathVerification {
    const recomputedNet = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const recomputedList = data.items.reduce((sum, item) => sum + item.quantity * item.listUnitPrice, 0);

    const itemsSumValid = recomputedNet === data.netItemsTotal && recomputedList === data.listSubtotal;
    const expectedDiscount = Math.max(0, recomputedList - data.grandTotal);
    const discountMathValid =
        data.discountTotal >= 0 &&
        Math.abs(data.listSubtotal - data.discountTotal - data.grandTotal) <= 1 &&
        expectedDiscount === data.discountTotal;

    const paymentTermsSum = data.paymentTerms.reduce((sum, t) => sum + t.amount, 0);
    const paymentPctSum = data.paymentTerms.reduce((sum, t) => sum + t.percentage, 0);
    const paymentSplitValid = paymentTermsSum === data.grandTotal && paymentPctSum === 100;

    const packagesValid = data.alternativePackages.every(
        (pkg) => pkg.advanceAmount + pkg.balanceAmount === pkg.total && pkg.total <= pkg.listPrice,
    );

    const taxTexts = data.taxes.map((t) => `${t.regimeLabel} ${t.exemptNotice}`.toLowerCase()).join(' ');
    const zeroProhibitedTaxText =
        !taxTexts.includes('precios sin iva') &&
        !taxTexts.includes('19% adicional') &&
        !taxTexts.includes('más iva');

    const details: string[] = [];
    if (!itemsSumValid) {
        details.push(`Desfase en suma de ítems (${recomputedNet} vs ${data.netItemsTotal}).`);
    }
    if (!discountMathValid) {
        details.push(`Desfase en descuento (${data.listSubtotal} - ${data.discountTotal} != ${data.grandTotal}).`);
    }
    if (!paymentSplitValid) {
        details.push(`Términos de pago no suman 100% del total (${paymentTermsSum} vs ${data.grandTotal}).`);
    }
    if (!packagesValid) {
        details.push('Uno o más paquetes alternativos tienen anticipo+saldo distinto al total neto.');
    }
    if (!zeroProhibitedTaxText) {
        details.push('Texto tributario prohibido detectado bajo Régimen No Responsable de IVA.');
    }

    return {
        itemsSumValid,
        discountMathValid,
        paymentSplitValid,
        packagesValid,
        zeroProhibitedTaxText,
        details,
    };
}
