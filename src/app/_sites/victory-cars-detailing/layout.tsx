import React from 'react';
import { Inter, Orbitron, Style_Script } from 'next/font/google';
import '@/multiverse/victory-cars-detailing/app/globals.css';
import WhatsAppFloatingButton from '@/multiverse/victory-cars-detailing/app/components/WhatsAppFloatingButton';
import ScrollReveal from '@/multiverse/victory-cars-detailing/app/components/ScrollReveal';
import VisualEffects from '@/multiverse/victory-cars-detailing/app/components/VisualEffects';
import Header from '@/multiverse/victory-cars-detailing/app/components/Header';
import Preloader from '@/multiverse/victory-cars-detailing/app/components/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-orbitron' });
const styleScript = Style_Script({ subsets: ['latin'], weight: ['400'], variable: '--font-style-script' });

/**
 * Tenant Layout para Victory Cars Detailing
 * Este layout se monta DENTRO del root layout, así que NO debe tener <html> ni <body>
 * Solo contiene el contenido específico del sitio de Victory Cars
 */
export default function VictoryCarsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.variable} ${orbitron.variable} ${styleScript.variable} font-sans bg-brand-dark-blue text-brand-slate selection:bg-brand-cyan selection:text-brand-dark-blue custom-cursor scroll-smooth`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AutoBodyShop',
                        name: 'Victory Cars S.A.S.',
                        alternateName: 'Victory Cars Detailing',
                        description: 'Centro especializado en Detailing, Protección Cerámica 9H, PPF y Restauración Automotriz en Bogotá.',
                        url: 'https://victorycarsdetailing.com',
                        logo: 'https://victorycarsdetailing.com/logo.png',
                        image: 'https://victorycarsdetailing.com/hero-bg.jpg',
                        email: 'contacto@victorycarsdetailing.com',
                        telephone: '+573157742419',
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: 'Calle 128 #47-36',
                            addressLocality: 'Bogotá',
                            addressRegion: 'Cundinamarca',
                            postalCode: '111111',
                            addressCountry: 'CO',
                        },
                        geo: {
                            '@type': 'GeoCoordinates',
                            latitude: 4.717,
                            longitude: -74.057,
                        },
                        openingHoursSpecification: [
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                                opens: '08:00',
                                closes: '18:00',
                            },
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: 'Saturday',
                                opens: '09:00',
                                closes: '16:00',
                            },
                        ],
                        sameAs: [
                            'https://www.instagram.com/victorycars_paintdetailing',
                            'https://www.facebook.com/victorycarsdetailing',
                        ],
                        priceRange: '$$$',
                    }),
                }}
            />
            <Preloader />
            <Header />

            {children}

            <ScrollReveal />
            <VisualEffects />
            <WhatsAppFloatingButton />
        </div>
    );
}

// Export metadata from Victory Cars
export { metadata } from '@/multiverse/victory-cars-detailing/app/layout';
