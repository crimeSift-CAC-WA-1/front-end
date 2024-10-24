import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/api/trpc(.*)',
    '/api(.*)',
    '/_next(.*)',
    '/favicon.ico',
    '/assets(.*)',
  ],
  ignoredRoutes: ['/((?!api|trpc))(_next.*|.+.[w]+$)'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
