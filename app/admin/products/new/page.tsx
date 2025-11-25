import ProductForm from '@/components/ProductForm';
import { createProduct } from '@/app/actions';

export default function NewProductPage() {
    return (
        <div>
            <div className="admin-header">
                <h1 className="admin-title">Add New Product</h1>
            </div>
            <ProductForm action={createProduct} submitLabel="Create Product" />
        </div>
    );
}
