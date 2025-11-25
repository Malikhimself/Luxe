import ProductCard from './ProductCard';
import { products as allProducts } from '@/lib/data';
import './ProductGrid.css';

interface ProductGridProps {
    products?: typeof allProducts;
}

export default function ProductGrid({ products = allProducts }: ProductGridProps) {
    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
