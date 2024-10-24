import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    "/",               // Public homepage
    "/sign-in",        // Sign-in page
    "/sign-up",        // Sign-up page
    "/username-search", // Public route for searching usernames
    "/api/trpc/(.*)",  // All tRPC API routes
    "/api/(.*)",       // All API routes except the ones in ignoredRoutes
  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next|.*\\..+)(.*)", // Ignore static assets (_next, other files like .png, .js, etc.)
    "/api/webhook/(.*)",  // Ignore API webhooks
  ],
});

export const config = {
  matcher: ['/analyze(.*)', '/reports(.*)'], // Protect /analyze and /reports routes
};
