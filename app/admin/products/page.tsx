import Link from 'next/link';
import { getProducts, deleteProductAction } from '@/app/actions';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <div className="admin-header">
                <h1 className="admin-title">Products</h1>
                <Link href="/admin/products/new" className="btn-primary">
                    <Plus size={18} />
                    Add Product
                </Link>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <div className="product-cell">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-thumb"
                                    />
                                    <span className="product-name">{product.name}</span>
                                </div>
                            </td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <div className="action-buttons">
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className="action-btn"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </Link>
                                    <form action={deleteProductAction.bind(null, product.id)} style={{ display: 'inline' }}>
                                        <button
                                            type="submit"
                                            className="action-btn delete"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
