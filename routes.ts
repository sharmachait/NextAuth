export const publicRoutes = ['/auth/verify'];

export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/newPassword',
];

//should always be allowed never be protected
export const authApiBaseRoute = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/settings';

export const REDIRECT_LOGIN = '/dashboard';
