import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import _dbContext from '@/lib/dbContext';

export default {
  adapter: PrismaAdapter(_dbContext),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          return null;
        }
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;
