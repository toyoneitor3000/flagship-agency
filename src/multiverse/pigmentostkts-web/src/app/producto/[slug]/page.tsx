import { PIGMENTO_DATA } from "@/lib/pigmento-content";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ProductPageClient } from "./ProductPageClient";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

function getProduct(slug: string) {
    return PIGMENTO_DATA.pricing.collectionPacks.find(p => p.slug === slug);
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

    const otherProducts = PIGMENTO_DATA.pricing.collectionPacks.filter(p => p.slug !== slug);

    // Check auth & customer status
    let userName: string | null = null;
    let userEmail: string | null = null;
    let isCustomer = false;

    try {
        const session = await auth();
        if (session?.user) {
            userName = session.user.name || null;
            userEmail = session.user.email || null;
            if (userEmail) {
                const orderCount = await prisma.order.count({
                    where: { user: { email: userEmail } },
                });
                isCustomer = orderCount > 0;
            }
        }
    } catch { }

    return (
        <ProductPageClient
            product={product}
            reviews={reviews}
            avgRating={avgRating}
            otherProducts={otherProducts}
            userName={userName}
            userEmail={userEmail}
            isCustomer={isCustomer}
        />
    );
}
