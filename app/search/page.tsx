import { getProducts } from '@/app/actions';
import ProductListing from '@/components/ProductListing';
import Link from 'next/link';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const q = typeof searchParams.q === 'string' ? searchParams.q : '';
    const products = await getProducts();

    const filteredProducts = products.filter((product) => {
        const searchTerm = q.toLowerCase();
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <main className="container" style={{ paddingTop: 'calc(var(--header-height) + 2rem)', paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                    Search Results
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    {q ? `Showing results for "${q}"` : 'All products'}
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <ProductListing initialProducts={filteredProducts} />
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No products found matching your search.</p>
                    <Link href="/products" style={{ textDecoration: 'underline', color: 'var(--color-text-main)' }}>
                        Browse all products
                    </Link>
                </div>
            )}
        </main>
    );
}
