import { cookies } from 'next/headers';

export async function login(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // Hardcoded credentials for this iteration
    if (username === 'admin' && password === 'secure-luxe-2024') {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return true;
    }
    return false;
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
}

export async function getSession() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_session')?.value === 'true';
}

// User Authentication

export async function userLogin(email: string, password: string): Promise<boolean> {
    const { getUserByEmail } = await import('./db');
    const user = await getUserByEmail(email);

    if (user && user.password === password) {
        const cookieStore = await cookies();
        cookieStore.set('user_session', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });
        return true;
    }
    return false;
}

export async function userSignup(name: string, email: string, password: string): Promise<boolean> {
    const { createUser, getUserByEmail } = await import('./db');

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return false; // User already exists
    }

    const newUser = await createUser({ name, email, password });

    // Auto login after signup
    const cookieStore = await cookies();
    cookieStore.set('user_session', newUser.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });

    return true;
}

export async function userLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('user_session');
}

export async function getUserSession() {
    const cookieStore = await cookies();
    return cookieStore.get('user_session')?.value;
}

export async function updateUserDetails(userId: string, data: { name?: string; email?: string }): Promise<boolean> {
    const { updateUser } = await import('./db');
    const updatedUser = await updateUser(userId, data);
    return !!updatedUser;
}

export async function changeUserPassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    const { getUserById, updateUser } = await import('./db');
    const user = await getUserById(userId);

    if (!user || user.password !== currentPassword) {
        return false;
    }

    await updateUser(userId, { password: newPassword });
    return true;
}
