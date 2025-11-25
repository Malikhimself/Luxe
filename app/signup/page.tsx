'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signupAction } from '@/app/actions';
import '../admin/admin.css'; // Reuse admin styles for now

export default function SignupPage() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const result = await signupAction(formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
        // If success, the action redirects
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="login-title">Create Account</h1>

                {error && <div className="login-error">{error}</div>}

                <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="form-input"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary login-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Already have an account? <Link href="/login" style={{ color: '#000', textDecoration: 'underline' }}>Login</Link>
                </div>
            </form>
        </div>
    );
}
