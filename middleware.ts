import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
const { auth } = NextAuth(authConfig);
import {
  authApiBaseRoute,
  authRoutes,
  publicRoutes,
  REDIRECT_LOGIN,
} from '@/routes';
import type { NextRequest } from 'next/server';
import type { Session } from '@auth/core/types';

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export default auth(async function middleware(req: NextAuthRequest) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(authApiBaseRoute);
  let isPublicRoute = false;
  for (let publicRoute of publicRoutes) {
    if (nextUrl.pathname.startsWith(publicRoute)) isPublicRoute = true;
  }
  let isAuthRoute = false;
  for (let authRoute of authRoutes) {
    if (nextUrl.pathname.startsWith(authRoute)) isAuthRoute = true;
  }

  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(REDIRECT_LOGIN, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
