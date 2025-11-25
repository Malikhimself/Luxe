"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
    isAuthenticated: boolean;
}

export default function AddToCartButton({ product, isAuthenticated }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const router = useRouter();

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        setIsAdding(true);
        addToCart({
            ...product,
            quantity: 1
        });

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`add-to-cart-btn ${isAdding ? 'added' : ''}`}
        >
            <ShoppingBag size={20} />
            {isAdding ? 'Added to Cart' : 'Add to Cart'}
        </button>
    );
}
