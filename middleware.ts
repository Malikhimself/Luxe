import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if it's an admin route
    if (path.startsWith('/admin')) {
        // Allow access to login page
        if (path === '/admin/login') {
            return NextResponse.next();
        }

        // Check for session cookie
        const session = request.cookies.get('admin_session');

        // If no session, redirect to login
        if (!session || session.value !== 'true') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
