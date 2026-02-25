import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'slug requerido' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
        where: { productSlug: slug, approved: true },
        orderBy: { createdAt: 'desc' },
    });

    const total = reviews.length;
    const avg = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

    return NextResponse.json({ reviews, total, avg: Math.round(avg * 10) / 10 });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productSlug, rating, comment, authorName, authorEmail } = body;

        if (!productSlug || !rating || !comment || !authorName) {
            return NextResponse.json({ error: 'Campos requeridos: productSlug, rating, comment, authorName' }, { status: 400 });
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json({ error: 'Rating debe ser entre 1 y 5' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                productSlug,
                rating: Number(rating),
                comment: comment.slice(0, 500),
                authorName: authorName.slice(0, 100),
                authorEmail: authorEmail || null,
                approved: false, // Requiere aprobación del admin
            },
        });

        return NextResponse.json({ success: true, review });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json({ error: 'Error creando review' }, { status: 500 });
    }
}
