"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, User, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

import './Header.css';

export default function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
    const { cartCount } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => {
                document.getElementById('search-input')?.focus();
            }, 100);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <header className="header">
            <div className="container header__container">
                <div className="header__left">
                    <button className="header__menu-btn" onClick={toggleMenu}>
                        <Menu size={24} />
                    </button>
                    <Link href="/" className="header__logo">
                        LUXE
                    </Link>
                </div>

                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li><Link href="/" className="header__nav-link">Home</Link></li>
                        <li><Link href="/products" className="header__nav-link">Shop</Link></li>
                        <li><Link href="/about" className="header__nav-link">About</Link></li>
                        <li><Link href="/journal" className="header__nav-link">Journal</Link></li>
                    </ul>
                </nav>

                <div className="header__right">
                    <div className={`header__search-container ${isSearchOpen ? 'active' : ''}`}>
                        <form onSubmit={handleSearch} className="header__search-form">
                            <input
                                id="search-input"
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="header__search-input"
                            />
                        </form>
                    </div>
                    <button
                        className="header__icon-btn"
                        aria-label="Search"
                        onClick={toggleSearch}
                    >
                        {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                    </button>

                    {isAuthenticated ? (
                        <Link href="/profile" className="header__icon-btn" aria-label="Profile">
                            <User size={20} />
                        </Link>
                    ) : (
                        <Link href="/login" className="header__icon-btn" aria-label="Login">
                            <User size={20} />
                        </Link>
                    )}

                    <Link href="/cart" className="header__icon-btn" aria-label="Cart">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-content">
                    <button className="mobile-menu-close" onClick={toggleMenu}>
                        <X size={24} />
                    </button>
                    <nav className="mobile-menu-nav">
                        <ul className="mobile-menu-list">
                            <li><Link href="/" className="mobile-menu-link" onClick={toggleMenu}>Home</Link></li>
                            <li><Link href="/products" className="mobile-menu-link" onClick={toggleMenu}>Categories</Link></li>
                            <li><Link href="/about" className="mobile-menu-link" onClick={toggleMenu}>About</Link></li>
                            <li><Link href="/journal" className="mobile-menu-link" onClick={toggleMenu}>Journal</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
