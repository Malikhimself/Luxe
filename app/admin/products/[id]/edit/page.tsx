import ProductForm from '@/components/ProductForm';
import { getProductById, updateProductAction } from '@/app/actions';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    const updateAction = updateProductAction.bind(null, id);

    return (
        <div>
            <div className="admin-header">
                <h1 className="admin-title">Edit Product</h1>
            </div>
            <ProductForm
                product={product}
                action={updateAction}
                submitLabel="Update Product"
            />
        </div>
    );
}
