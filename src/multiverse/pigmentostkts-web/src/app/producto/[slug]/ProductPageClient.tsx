"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    ShoppingCart,
    Droplets,
    Ruler,
    Palette,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    Check,
    Send,
    Package,
    Shield,
    MessageCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

type Product = {
    slug: string;
    name: string;
    qty: number;
    price: number;
    description: string;
    longDescription: string;
    finish: string;
    material: string;
    size: string;
    waterproof: boolean;
    tags: string[];
    image: string;
    gallery: string[];
};

type Review = {
    id: string;
    rating: number;
    comment: string;
    authorName: string;
    createdAt: Date;
};

function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(price);
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                    style={{ width: size, height: size }}
                />
            ))}
        </div>
    );
}

export function ProductPageClient({
    product,
    reviews,
    avgRating,
    otherProducts,
    userName,
    userEmail,
    isCustomer,
}: {
    product: Product;
    reviews: Review[];
    avgRating: number;
    otherProducts: Product[];
    userName: string | null;
    userEmail: string | null;
    isCustomer: boolean;
}) {
    const isLoggedIn = !!userEmail;
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [submittingReview, setSubmittingReview] = useState(false);
    const { addItem } = useCart();
    const unitPrice = Math.round(product.price / product.qty);

    const handleAddToCart = () => {
        const numericId = product.slug.split('').reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0) % 100000 + 5000;
        addItem({
            id: numericId,
            name: product.name,
            price: product.price,
            displayPrice: formatPrice(product.price),
            image: product.image,
            category: "PACK EXCLUSIVO",
            description: product.description,
            features: [product.material, `${product.qty} unidades`, product.finish],
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    const handleSubmitReview = async () => {
        if (!reviewForm.comment || !userName) return;
        setSubmittingReview(true);
        try {
            await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productSlug: product.slug,
                    rating: reviewForm.rating,
                    comment: reviewForm.comment,
                    authorName: userName,
                    authorEmail: userEmail,
                }),
            });
            setReviewSubmitted(true);
            setShowReviewForm(false);
        } catch {
            console.error("Error submitting review");
        } finally {
            setSubmittingReview(false);
        }
    };

    const nextImage = () => setSelectedImage((p) => (p + 1) % product.gallery.length);
    const prevImage = () => setSelectedImage((p) => (p - 1 + product.gallery.length) % product.gallery.length);

    return (
        <div className="min-h-screen bg-white pt-28 md:pt-36">
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
                <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <Link href="/" className="hover:text-brand-black transition-colors">Inicio</Link>
                    <span>/</span>
                    <Link href="/packs" className="hover:text-brand-black transition-colors">Packs</Link>
                    <span>/</span>
                    <span className="text-brand-black font-bold">{product.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Gallery */}
                    <div className="space-y-3">
                        {/* Main Image */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={product.gallery[selectedImage]}
                                        alt={`${product.name} - Foto ${selectedImage + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={selectedImage === 0}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </AnimatePresence>
                            {product.gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-800" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                    >
                                        <ChevronRight className="w-5 h-5 text-gray-800" />
                                    </button>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {product.gallery.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedImage(i)}
                                                className={`w-2 h-2 rounded-full transition-all ${i === selectedImage ? "bg-white w-6" : "bg-white/50"}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        {/* Thumbnails */}
                        {product.gallery.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {product.gallery.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${i === selectedImage
                                            ? "border-brand-yellow shadow-lg shadow-brand-yellow/20"
                                            : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="lg:sticky lg:top-36 lg:self-start space-y-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {product.tags.map((tag) => (
                                <span key={tag} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Name & Rating */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-brand-black tracking-tight leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-3 mt-2">
                                <StarRating rating={Math.round(avgRating)} />
                                {reviews.length > 0 ? (
                                    <span className="text-sm text-gray-500 font-medium">
                                        {avgRating} ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
                                    </span>
                                ) : (
                                    <span className="text-sm text-gray-400">Sin reseñas aún</span>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-black text-brand-black">{formatPrice(product.price)}</span>
                            <span className="text-sm text-gray-400 font-medium">
                                ({formatPrice(unitPrice)}/sticker)
                            </span>
                        </div>

                        {/* Short Description */}
                        <p className="text-base text-gray-600 leading-relaxed">{product.longDescription}</p>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                <Package className="w-4 h-4 text-brand-yellow shrink-0" />
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cantidad</p>
                                    <p className="text-sm font-black text-brand-black">{product.qty} stickers</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                <Palette className="w-4 h-4 text-brand-yellow shrink-0" />
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Material</p>
                                    <p className="text-sm font-black text-brand-black">{product.material}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                <Sparkles className="w-4 h-4 text-brand-yellow shrink-0" />
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Acabado</p>
                                    <p className="text-sm font-black text-brand-black">{product.finish}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                <Ruler className="w-4 h-4 text-brand-yellow shrink-0" />
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tamaño</p>
                                    <p className="text-sm font-black text-brand-black">{product.size}</p>
                                </div>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            {product.waterproof && (
                                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                                    <Droplets className="w-3.5 h-3.5" /> Resistente al agua
                                </div>
                            )}
                            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                                <Shield className="w-3.5 h-3.5" /> Alta durabilidad
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3 pt-2">
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleAddToCart}
                                disabled={addedToCart}
                                className={`flex-1 flex items-center justify-center gap-2.5 font-black text-sm py-4 rounded-2xl uppercase tracking-wider transition-all ${addedToCart
                                    ? "bg-green-500 text-white"
                                    : "bg-brand-yellow text-brand-black hover:bg-yellow-400 shadow-lg shadow-brand-yellow/20 hover:shadow-xl hover:shadow-brand-yellow/30"
                                    }`}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check className="w-5 h-5" /> ¡Agregado!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-5 h-5" /> Agregar al Carrito
                                    </>
                                )}
                            </motion.button>
                            <a
                                href={`https://wa.me/573160535247?text=${encodeURIComponent(`¡Hola! Me interesa el ${product.name} 🎨`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-2xl hover:bg-[#20bd5b] transition-colors shrink-0"
                            >
                                <MessageCircle className="w-6 h-6" />
                            </a>
                        </div>

                        {/* Shipping info */}
                        <div className="text-xs text-gray-400 font-medium space-y-1 pt-1">
                            <p>🚚 Envío Nacional: $18,800 (2-3 días)</p>
                            <p>⚡ Envío Picap Bogotá (mismo día)</p>
                            <p>📍 Recogida en oficina: Gratis</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 mb-8">
                <div className="border-t border-gray-100 pt-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-brand-black tracking-tight">Reseñas</h2>
                            {reviews.length > 0 && (
                                <div className="flex items-center gap-2 mt-1">
                                    <StarRating rating={Math.round(avgRating)} size={14} />
                                    <span className="text-sm text-gray-500">{avgRating} de 5 • {reviews.length} reseñas</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA: Write Review */}
                    {!reviewSubmitted && (
                        <div className="mb-8">
                            {!isLoggedIn ? (
                                /* Not logged in */
                                <button
                                    onClick={() => signIn("google", { callbackUrl: `/producto/${product.slug}` })}
                                    className="w-full flex items-center justify-center gap-3 bg-brand-yellow text-brand-black font-black text-sm py-5 rounded-2xl hover:bg-yellow-400 transition-all uppercase tracking-wider shadow-lg shadow-brand-yellow/20 hover:shadow-xl hover:shadow-brand-yellow/30"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Inicia sesión para dejar tu reseña
                                </button>
                            ) : !isCustomer ? (
                                /* Logged in but not a customer */
                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                                    <p className="text-sm font-bold text-gray-500">🛒 Solo clientes verificados pueden dejar reseñas.</p>
                                    <p className="text-xs text-gray-400 mt-1">Realiza tu primera compra para poder opinar.</p>
                                </div>
                            ) : !showReviewForm ? (
                                /* Verified customer, show CTA */
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="w-full flex items-center justify-center gap-3 bg-brand-black text-white font-black text-sm py-5 rounded-2xl hover:bg-brand-yellow hover:text-brand-black transition-all uppercase tracking-wider shadow-lg"
                                >
                                    <Star className="w-5 h-5" />
                                    ⭐ Deja tu reseña, {userName?.split(' ')[0]}
                                </button>
                            ) : null}
                        </div>
                    )}

                    {/* Review Form (only for verified customers) */}
                    <AnimatePresence>
                        {showReviewForm && isCustomer && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 overflow-hidden"
                            >
                                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-yellow/20 border border-brand-yellow/30 flex items-center justify-center text-sm font-black text-brand-black">
                                            {userName?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-brand-black">{userName}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">Cliente verificado ✓</p>
                                        </div>
                                    </div>

                                    {/* Stars */}
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold mb-2">¿Cómo lo calificarías?</p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setReviewForm((p) => ({ ...p, rating: star }))}
                                                    className="p-0.5"
                                                >
                                                    <Star
                                                        className={`w-8 h-8 transition-colors ${star <= reviewForm.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 hover:text-yellow-300"
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <textarea
                                        placeholder="¿Qué te pareció este producto?"
                                        rows={3}
                                        value={reviewForm.comment}
                                        onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                                        className="w-full text-sm px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow outline-none resize-none"
                                    />

                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleSubmitReview}
                                            disabled={!reviewForm.comment || submittingReview}
                                            className="inline-flex items-center gap-2 text-xs font-black bg-brand-black text-white px-6 py-3 rounded-xl hover:bg-brand-yellow hover:text-brand-black transition-all uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-3.5 h-3.5" />
                                            {submittingReview ? "Enviando..." : "Publicar Reseña"}
                                        </button>
                                        <button
                                            onClick={() => setShowReviewForm(false)}
                                            className="text-xs font-bold text-gray-400 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Review submitted confirmation */}
                    {reviewSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-3"
                        >
                            <Check className="w-5 h-5 text-green-600 shrink-0" />
                            <p className="text-sm text-green-700 font-bold">¡Gracias por tu reseña, {userName?.split(' ')[0]}! Será visible una vez aprobada.</p>
                        </motion.div>
                    )}

                    {/* Reviews List */}
                    {reviews.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-sm font-black text-brand-black">
                                                {review.authorName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{review.authorName}</p>
                                                <StarRating rating={review.rating} size={12} />
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-medium">
                                            {new Date(review.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mt-2">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !reviewSubmitted && (
                            <div className="text-center py-12">
                                <p className="text-gray-300 text-5xl mb-3">⭐</p>
                                <p className="text-sm text-gray-400 font-medium">Sé el primero en dejar una reseña</p>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Related Products */}
            {otherProducts.length > 0 && (
                <div className="bg-gray-50 border-t border-gray-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                        <h2 className="text-xl font-black text-brand-black tracking-tight mb-6">También te puede gustar</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {otherProducts.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/producto/${p.slug}`}
                                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-yellow/30 transition-all"
                                >
                                    <div className="aspect-square relative overflow-hidden">
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 50vw, 25vw"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-sm font-black text-brand-black truncate">{p.name}</h3>
                                        <p className="text-[10px] text-gray-400 font-medium">{p.description}</p>
                                        <p className="text-sm font-black text-brand-black mt-1">{formatPrice(p.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
