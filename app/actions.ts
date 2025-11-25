'use server';

import {
    getProducts as dbGetProducts,
    getProductById as dbGetProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    Product
} from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getProducts() {
    return dbGetProducts();
}

export async function getProductById(id: string) {
    return dbGetProductById(id);
}

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const image = formData.get('image') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    await addProduct({
        name,
        price,
        image,
        category,
        description
    });

    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/admin/products');
    redirect('/admin/products');
}

export async function updateProductAction(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const image = formData.get('image') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    await updateProduct(id, {
        name,
        price,
        image,
        category,
        description
    });

    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${id}`);
    revalidatePath('/admin/products');
    redirect('/admin/products');
}

export async function deleteProductAction(id: string) {
    await deleteProduct(id);
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/admin/products');
}

export async function login(formData: FormData) {
    const { login } = await import('@/lib/auth');
    return login(formData);
}

// User Auth Actions

export async function signupAction(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { userSignup } = await import('@/lib/auth');
    const success = await userSignup(name, email, password);

    if (success) {
        redirect('/');
    } else {
        return { error: 'Email already exists' };
    }
}

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { userLogin } = await import('@/lib/auth');
    const success = await userLogin(email, password);

    if (success) {
        redirect('/');
    } else {
        return { error: 'Invalid credentials' };
    }
}

export async function logoutAction() {
    const { userLogout } = await import('@/lib/auth');
    await userLogout();
    redirect('/login');
}

export async function updateProfileAction(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const { getUserSession, updateUserDetails } = await import('@/lib/auth');
    const userId = await getUserSession();

    if (!userId) {
        redirect('/login');
    }

    const success = await updateUserDetails(userId, { name, email });

    if (success) {
        revalidatePath('/profile');
        return { success: true };
    } else {
        return { error: 'Failed to update profile' };
    }
}

export async function changePasswordAction(formData: FormData) {
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;

    const { getUserSession, changeUserPassword } = await import('@/lib/auth');
    const userId = await getUserSession();

    if (!userId) {
        redirect('/login');
    }

    const success = await changeUserPassword(userId, currentPassword, newPassword);

    if (success) {
        return { success: true };
    } else {
        return { error: 'Incorrect current password' };
    }
}
