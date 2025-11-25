"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
    id?: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

interface ProductFormProps {
    product?: Product;
    action: (formData: FormData) => Promise<void>;
    submitLabel: string;
}

export default function ProductForm({ product, action, submitLabel }: ProductFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        await action(formData);
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={product?.name}
                    required
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="price" className="form-label">Price ($)</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    defaultValue={product?.price}
                    required
                    min="0"
                    step="0.01"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                    id="category"
                    name="category"
                    defaultValue={product?.category || ''}
                    required
                    className="form-select"
                >
                    <option value="" disabled>Select a category</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Knitwear">Knitwear</option>
                    <option value="Skirts">Skirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Accessories">Accessories</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="image" className="form-label">Image URL</label>
                <input
                    type="url"
                    id="image"
                    name="image"
                    defaultValue={product?.image}
                    required
                    className="form-input"
                    placeholder="https://images.unsplash.com/..."
                />
            </div>

            <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={product?.description}
                    required
                    className="form-textarea"
                />
            </div>

            <div className="form-actions">
                <Link href="/admin/products" className="btn-secondary">
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    );
}
