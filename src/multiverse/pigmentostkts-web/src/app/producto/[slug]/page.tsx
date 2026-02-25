import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductPageClient } from "./ProductPageClient";
import type { Metadata } from "next";

function getProduct(slug: string) {
    return PIGMENTO_DATA.pricing.collectionPacks.find(p => p.slug === slug);
}

export async function generateStaticParams() {
    return PIGMENTO_DATA.pricing.collectionPacks.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) return { title: "Producto no encontrado" };

    return {
        title: `${product.name} — Pigmento Stickers`,
        description: product.longDescription,
        openGraph: {
            title: `${product.name} — Pigmento Stickers`,
            description: product.description,
            images: [{ url: product.image, width: 800, height: 800 }],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) return notFound();

    const reviews = await prisma.review.findMany({
        where: { productSlug: slug, approved: true },
        orderBy: { createdAt: "desc" },
    });

    const avgRating = reviews.length > 0
        ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
        : 0;

    // Otros productos para "También te puede gustar"
    const otherProducts = PIGMENTO_DATA.pricing.collectionPacks.filter(p => p.slug !== slug);

    return (
        <ProductPageClient
            product={product}
            reviews={reviews}
            avgRating={avgRating}
            otherProducts={otherProducts}
        />
    );
}
