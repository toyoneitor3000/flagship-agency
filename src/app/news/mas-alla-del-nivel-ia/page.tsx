import { ArticleNivelIA } from '@/components/editorial/ArticleNivelIA';

export const metadata = {
  title: 'El Mito de los 30 Segundos y el Verdadero "Nivel IA" | Camilo Toloza • Purrpurr',
  description: 'Por qué las empresas que pretenden dominar su mercado no se construyen con un prompt descartable, sino con un sistema operativo digital. Ensayo e investigación por Camilo Toloza.',
  openGraph: {
    title: 'El Mito de los 30 Segundos y el Verdadero "Nivel IA" | Camilo Toloza',
    description: 'Por qué las empresas que pretenden dominar su mercado no se construyen con un prompt descartable, sino con un sistema operativo digital. Análisis del mercado y costos reales en 2026.',
    type: 'article',
    authors: ['Camilo Toloza'],
    publishedTime: '2026-09-10T00:00:00.000Z',
  }
};

export default function ArticlePage() {
  return <ArticleNivelIA />;
}
