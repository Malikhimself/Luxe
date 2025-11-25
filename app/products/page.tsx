import { getProducts } from '@/app/actions';
import ProductListing from '@/components/ProductListing';
import './page.css';

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="container products-page">
            <div className="products-header">
                <h1 className="products-title">Shop Collection</h1>
                <p className="products-subtitle">Curated pieces for the modern wardrobe.</p>
            </div>

            <ProductListing initialProducts={products} />
        </main>
    );
}
