import { notFound } from 'next/navigation';
import { RenderEngine } from '@/components/engine/RenderEngine';

export default async function PipelowDemoPage() {
    // Definimos la arquitectura "DNA" directamente para la demo
    const architecture = {
        identity: {
            name: 'PIPELOW',
            category: 'CREATOR',
            seo: {
                title: 'PIPELOW | Galería de Eventos',
                description: 'Portal exclusivo para la visualización y descarga de capturas profesionales.'
            },
            brand: {
                colors: { primary: '#FFFFFF', secondary: '#000000' },
                typography: 'SAN_SERIF',
                themeColors: {
                    color1: '#000000',
                    color2: '#080808',
                    color3: '#111111',
                    color4: '#000000'
                }
            }
        },
        ui: { theme: 'dark', layout: 'luxury' },
        sections: [
            {
                id: 'hero',
                type: 'HERO',
                content: {
                    title: 'PIPELOW',
                    subtitle: 'LA BELLEZA ESTÁ EN EL DETALLE. EXPLORA EL ÁLBUM DEL EVENTO.'
                }
            },
            {
                id: 'gallery-info',
                type: 'AUTHORITY',
                content: {
                    headline: 'CALIDAD Y EXCLUSIVIDAD EN CADA TOMA',
                    logos: ['ALTA RESOLUCIÓN', 'RETOQUE PROFESIONAL', 'DESCARGA INMEDIATA']
                }
            },
            {
                id: 'value',
                type: 'VALUE_PROP',
                content: {
                    headline: 'Capturando los mejores momentos sobre ruedas.',
                    cards: [
                        {
                            title: 'CALIDAD MASTER',
                            desc: 'Todas las fotografías se entregan en su resolución máxima, optimizadas para impresión y visualización digital.'
                        },
                        {
                            title: 'ACCESO RÁPIDO',
                            desc: 'Una vez confirmado el pago, recibe un enlace de descarga directa sin esperas.'
                        },
                        {
                            title: 'DERECHOS DE USO',
                            desc: 'Al adquirir tu fotografía, obtienes la licencia para uso personal en todas tus plataformas.'
                        }
                    ]
                }
            },
            {
                id: 'gallery',
                type: 'DEMO',
                content: {
                    headline: 'GALERÍA DEL EVENTO',
                    images: [
                        '/pipelow_hero.png',
                        '/pipelow_1.png',
                        '/pipelow_2.png',
                        '/pipelow_3.png'
                    ]
                }
            },
            {
                id: 'pricing',
                type: 'PRICING',
                content: {
                    headline: 'ELIGE TU PAQUETE',
                    plans: [
                        {
                            name: 'INDIVIDUAL',
                            price: '$45.000',
                            features: ['1 Fotografía en Alta Resolución', 'Retoque Básico incluido', 'Descarga Web']
                        },
                        {
                            name: 'PACK SELECCIÓN',
                            price: '$95.000',
                            features: ['3 Fotografías a elección', 'Retoque Premium', 'Licencia de Uso Personal']
                        },
                        {
                            name: 'ÁLBUM COMPLETO',
                            price: '$280.000',
                            features: ['Todas tus fotos del evento', 'Video Reel de regalo', 'Máxima Prioridad de entrega']
                        }
                    ]
                }
            }
        ]
    };

    return (
        <RenderEngine
            buildId="demo-pipelow"
            slug="pipelow"
            architecture={architecture as any}
        />
    );
}
