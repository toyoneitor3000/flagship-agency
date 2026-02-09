import WrapPromoGraphic from '@/components/promo/WrapPromoGraphic';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Promoción Forrado BMW M3 - Victory Cars',
    description: 'Diseño publicitario para promoción de wrap automotriz.',
};

export default function PromoPage() {
    return (
        <main className="bg-brand-dark-blue min-h-screen">
            <WrapPromoGraphic />
        </main>
    );
}
