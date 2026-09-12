import { ArticleNivelIA } from '@/components/editorial/ArticleNivelIA';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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

export default async function ArticlePage() {
  let authorImage: string = '/api/author/avatar';
  try {
    const author = await prisma.user.findFirst({
      where: {
        email: {
          in: ['camilotoloza1136@gmail.com', 'purrpurrdev@gmail.com'],
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: { image: true },
    });

    if (author?.image) {
      authorImage = author.image.replace(/=s\d+-c/, '=s800-c');
    }
  } catch (err) {
    console.error('Error retrieving live author avatar:', err);
  }

  return <ArticleNivelIA liveAuthorImage={authorImage} />;
}
