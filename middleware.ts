import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)'],
  
  // Routes that require authentication
  ignoredRoutes: ['/api/public'],
  
  // Sign-in URL for redirecting unauthenticated users
  signInUrl: '/sign-in',
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
};
