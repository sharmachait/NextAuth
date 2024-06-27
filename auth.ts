import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import _dbContext from '@/lib/dbContext';
import authConfig from '@/auth.config';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(_dbContext),
  session: { strategy: 'jwt' },
  callbacks: {
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

      return session;
    },
  },
  ...authConfig,
});
