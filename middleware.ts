import { authMiddleware } from '@clerk/nextjs';
 
export default authMiddleware({
  // Add more public routes as needed
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/trpc/(.*)",
    "/api/(.*)",
  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next|.+..+)(.+)",
    "/api/webhook/(.*)"
  ],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};