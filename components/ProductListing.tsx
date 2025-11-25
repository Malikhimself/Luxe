"use client";

import { useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import './ProductListing.css';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

interface ProductListingProps {
    initialProducts: Product[];
}

const categories = ['All', 'Dresses', 'Outerwear', 'Knitwear', 'Skirts', 'Pants', 'Accessories'];

export default function ProductListing({ initialProducts }: ProductListingProps) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All'
        ? initialProducts
        : initialProducts.filter(p => p.category === activeCategory);

    return (
        <>
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <ProductGrid products={filteredProducts} />
        </>
    );
}
