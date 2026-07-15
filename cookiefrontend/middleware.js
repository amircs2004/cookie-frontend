import { NextResponse } from 'next/server';

export function middleware(request) {
  try {
    console.log('Middleware initiated for:', request.nextUrl.pathname);

    // Retrieve the token
    const token = request.cookies.get('token');
    
    // Log the existence of the token clearly
    console.log("Middleware running! Token found:", !!token);

    // If the token is missing, redirect
    if (!token) {
      console.log("No token found. Redirecting to /auth/log");
      return NextResponse.redirect(new URL('/auth/log', request.url));
    }

    // Token exists, proceed
    return NextResponse.next();

  } catch (error) {
    // If something crashes (e.g., cookie access issues), catch it here
    console.error("Middleware CRITICAL ERROR:", error);
    
    // In case of error, you might want to redirect to log or just allow the request
    // Returning NextResponse.next() here will "fail open" and let the user through
    return NextResponse.next(); 
  }
}

export const config = {
  matcher: ['/create-formulaire'],
};