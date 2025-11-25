import Link from 'next/link';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero__bg">
                {/* Placeholder for actual image */}
                <div className="hero__overlay"></div>
            </div>

            <div className="container hero__content">
                <span className="hero__subtitle">New Collection</span>
                <h1 className="hero__title">Summer Elegance</h1>
                <p className="hero__description">
                    Discover the essence of modern luxury with our latest arrival of curated pieces.
                </p>
                <Link href="/products" className="btn btn--primary">
                    Shop Collection
                </Link>
            </div>
        </section>
    );
}
