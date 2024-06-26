import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import _dbContext from '@/lib/dbContext';
import authConfig from '@/auth.config';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authConfig);
