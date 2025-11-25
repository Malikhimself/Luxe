'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAction } from '@/app/actions';
import '../admin/admin.css'; // Reuse admin styles for now

export default function UserLoginPage() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const result = await loginAction(formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
        // If success, the action redirects
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="login-title">Login</h1>

                {error && <div className="login-error">{error}</div>}

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
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Don't have an account? <Link href="/signup" style={{ color: '#000', textDecoration: 'underline' }}>Sign up</Link>
                </div>
            </form>
        </div>
    );
}
