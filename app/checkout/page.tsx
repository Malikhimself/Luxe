"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import './page.css';

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
            // Here we would clear the cart in a real app
        }
    };

    if (step === 3) {
        return (
            <main className="container checkout-page success">
                <h1>Thank You!</h1>
                <p>Your order has been placed successfully.</p>
                <p className="order-number">Order #LUXE-{Math.floor(Math.random() * 10000)}</p>
            </main>
        );
    }

    return (
        <main className="container checkout-page">
            <div className="checkout-grid">
                <div className="checkout-form-section">
                    <h1 className="checkout-title">Checkout</h1>

                    <div className="steps-indicator">
                        <span className={`step ${step === 1 ? 'active' : ''}`}>Shipping</span>
                        <span className="step-divider">/</span>
                        <span className={`step ${step === 2 ? 'active' : ''}`}>Payment</span>
                    </div>

                    <form onSubmit={handleSubmit} className="checkout-form">
                        {step === 1 ? (
                            <div className="form-step">
                                <h2>Shipping Information</h2>
                                <div className="form-row">
                                    <input type="text" placeholder="First Name" required />
                                    <input type="text" placeholder="Last Name" required />
                                </div>
                                <input type="email" placeholder="Email Address" required />
                                <input type="text" placeholder="Address" required />
                                <div className="form-row">
                                    <input type="text" placeholder="City" required />
                                    <input type="text" placeholder="Postal Code" required />
                                </div>
                                <button type="submit" className="btn-primary">Continue to Payment</button>
                            </div>
                        ) : (
                            <div className="form-step">
                                <h2>Payment Details</h2>
                                <div className="card-mock">
                                    <p>Credit Card (Mock)</p>
                                    <input type="text" placeholder="Card Number" defaultValue="4242 4242 4242 4242" readOnly />
                                    <div className="form-row">
                                        <input type="text" placeholder="MM/YY" defaultValue="12/25" readOnly />
                                        <input type="text" placeholder="CVC" defaultValue="123" readOnly />
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary">Place Order</button>
                                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                            </div>
                        )}
                    </form>
                </div>

                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-items">
                        {cart.map(item => (
                            <div key={item.id} className="summary-item">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${cartTotal}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
