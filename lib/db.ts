import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'products.json');

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

async function readDb(): Promise<Product[]> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading DB:', error);
        return [];
    }
}

async function writeDb(products: Product[]): Promise<void> {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(products, null, 4), 'utf-8');
    } catch (error) {
        console.error('Error writing DB:', error);
    }
}

export async function getProducts(): Promise<Product[]> {
    return readDb();
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const products = await readDb();
    return products.find((p) => p.id === id);
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const products = await readDb();
    const newProduct = { ...product, id: crypto.randomUUID() };
    products.push(newProduct);
    await writeDb(products);
    return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const products = await readDb();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    await writeDb(products);
    return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
    const products = await readDb();
    const filteredProducts = products.filter((p) => p.id !== id);
    if (filteredProducts.length === products.length) return false;

    await writeDb(filteredProducts);
    return true;
}

// User Management

const USERS_DB_PATH = path.join(process.cwd(), 'data', 'users.json');

export interface User {
    id: string;
    email: string;
    password: string; // In a real app, this would be hashed
    name: string;
}

async function readUsersDb(): Promise<User[]> {
    try {
        const data = await fs.readFile(USERS_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading Users DB:', error);
        return [];
    }
}

async function writeUsersDb(users: User[]): Promise<void> {
    try {
        await fs.writeFile(USERS_DB_PATH, JSON.stringify(users, null, 4), 'utf-8');
    } catch (error) {
        console.error('Error writing Users DB:', error);
    }
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
    const users = await readUsersDb();
    const newUser = { ...user, id: crypto.randomUUID() };
    users.push(newUser);
    await writeUsersDb(users);
    return newUser;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const users = await readUsersDb();
    return users.find((u) => u.email === email);
}

export async function getUserById(id: string): Promise<User | undefined> {
    const users = await readUsersDb();
    return users.find((u) => u.id === id);
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const users = await readUsersDb();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates };
    await writeUsersDb(users);
    return users[index];
}
