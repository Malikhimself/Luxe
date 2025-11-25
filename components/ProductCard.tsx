import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import './ProductCard.css';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="product-card">
            <Link href={`/products/${product.id}`} className="product-card__image-link">
                <div className="product-card__image-wrapper">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-card__image"
                    />
                    <button className="product-card__add-btn" aria-label="Add to cart">
                        <ShoppingBag size={18} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </Link>

            <div className="product-card__info">
                <span className="product-card__category">{product.category}</span>
                <h3 className="product-card__name">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <span className="product-card__price">${product.price}</span>
            </div>
        </div>
    );
}
