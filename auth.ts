import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import _dbContext from '@/lib/dbContext';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { UserRole } from '@prisma/client';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(_dbContext),
  session: { strategy: 'jwt' },
  events: {
    linkAccount: async ({ user }) => {
      let existingUser = await _dbContext.user.findUnique({
        where: { id: user.id },
      });
      if (existingUser && !existingUser.emailVerified) {
        await _dbContext.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      }
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      console.log({ user, account });
      if (account?.provider !== 'credentials') return true;
      if (!user || !user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
      //add 2fa check
      return true;
    },
    jwt: async ({ token }) => {
      console.log({ token });
      // token: {
      //   name: 'kanhaiya@bhayana.com',
      //     email: 'kanhaiya@bhayana.com',
      //     picture: null,
      //     sub: 'clxvec7s40001ic37z853rf4r',
      //     iat: 1719467097,
      //     exp: 1722059097,
      //     jti: '789a34f9-ca2e-4671-a45c-a2f0eba592d4'
      // }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
    session: async ({ session, token }) => {
      console.log({ session });
      // session: {
      //   user: {
      //     name: 'kanhaiya@bhayana.com',
      //       email: 'kanhaiya@bhayana.com',
      //       image: null
      //   },
      //   expires: '2024-07-27T05:44:59.123Z'
      // }

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
  ...authConfig,
});
