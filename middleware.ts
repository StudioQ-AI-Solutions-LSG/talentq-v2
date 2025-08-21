import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {locales} from '@/config';

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  const defaultLocale = request.headers.get('dashcode-locale') || 'en';
 
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale
  });
  
  const response = handleI18nRouting(request);
 
  // Step 3: Alter the response (example)
  response.headers.set('dashcode-locale', defaultLocale);

  return response;
}
 
export const config = {
  // Match all internationalized pathnames including requisitions
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',
    
    // Set a cookie to remember the previous locale
    '/(ar|en)/:path*',
    
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ]
};