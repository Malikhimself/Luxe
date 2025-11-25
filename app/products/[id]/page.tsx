import { getProductById } from '@/app/actions';
import AddToCartButton from '@/components/AddToCartButton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUserSession } from '@/lib/auth';
import './page.css';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);
    const session = await getUserSession();
    const isAuthenticated = !!session;

    if (!product) {
        notFound();
    }

    return (
        <main className="container product-page">
            <Link href="/" className="back-link">
                <ArrowLeft size={20} />
                Back to Shop
            </Link>

            <div className="product-grid-layout">
                <div className="product-image-section">
                    <img src={product.image} alt={product.name} className="product-main-image" />
                </div>

                <div className="product-info-section">
                    <span className="product-category">{product.category}</span>
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-price">${product.price}</p>

                    <div className="product-description">
                        <p>{product.description}</p>
                        <p>
                            Crafted with the finest materials, this piece embodies the essence of
                            modern luxury. Designed for the discerning individual who values
                            quality and timeless style.
                        </p>
                    </div>

                    <AddToCartButton product={product} isAuthenticated={isAuthenticated} />
                </div>
            </div>
        </main>
    );
}
