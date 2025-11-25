"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper({ isAuthenticated }: { isAuthenticated: boolean }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return null;
    }

    return <Header isAuthenticated={isAuthenticated} />;
}
