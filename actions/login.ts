'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { REDIRECT_LOGIN } from '@/routes';
import { AuthError } from 'next-auth';
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: REDIRECT_LOGIN,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      console.log({ error: e.message });
      console.log({ type: e.type });
      switch (e.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    throw e;
  }
};
