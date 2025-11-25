import Link from 'next/link';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import './admin.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__header">
                    <h1 className="admin-logo">Luxe Admin</h1>
                </div>

                <nav className="admin-nav">
                    <Link href="/admin/products" className="admin-nav__link active">
                        <Package size={20} />
                        Products
                    </Link>
                    <Link href="/admin/settings" className="admin-nav__link">
                        <Settings size={20} />
                        Settings
                    </Link>
                </nav>

                <div className="admin-sidebar__footer">
                    <Link href="/" className="admin-nav__link">
                        <LogOut size={20} />
                        Back to Site
                    </Link>
                </div>
            </aside>

            <main className="admin-content">
                {children}
            </main>
        </div>
    );
}
