import Hero from "@/components/Hero";
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from './actions';

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="page-container">
      <Hero />

      <section className="products-section">
        <h2 className="section-title">Latest Arrivals</h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
