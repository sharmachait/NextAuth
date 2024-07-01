'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { REDIRECT_LOGIN } from '@/routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials!' };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    console.log(verificationToken);
    await sendVerificationEmail(email, verificationToken.token);
    return {
      error:
        'Email address not verified. Confirmation email sent! Please verify your account.',
    };
  }
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: REDIRECT_LOGIN,
    });
    console.log('hi');
    // return { success: 'Login successful!' };
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
    } else {
      console.log({ e });
      throw e;
      // return { error: e.message };
    }
  }
};
