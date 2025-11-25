"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import './page.css';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <main className="container cart-page cart-empty">
                <h1>Your Cart is Empty</h1>
                <p>Looks like you haven't added anything yet.</p>
                <Link href="/products" className="btn btn--primary">
                    Start Shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="container cart-page">
            <h1 className="cart-title">Shopping Cart</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item__image-wrapper">
                                <img src={item.image} alt={item.name} className="cart-item__image" />
                            </div>

                            <div className="cart-item__details">
                                <div className="cart-item__header">
                                    <h3 className="cart-item__name">
                                        <Link href={`/products/${item.id}`}>{item.name}</Link>
                                    </h3>
                                    <button
                                        className="cart-item__remove"
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <p className="cart-item__price">${item.price}</p>

                                <div className="cart-item__actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <p className="cart-item__subtotal">
                                        ${item.price * item.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${cartTotal}</span>
                    </div>

                    <Link href="/checkout" className="checkout-btn">
                        Proceed to Checkout
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
