'use server';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import _dbContext from '@/lib/dbContext';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'An account with this email already exists!' };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await _dbContext.user.create({
    data: { email: email, password: hashedPassword, name: name },
  });

  const verificationToken = await generateVerificationToken(email);

  let res = await sendVerificationEmail(email, verificationToken.token);
  if (res.error) {
    return {
      error:
        'There was an error while sending verification token! Try to login and we will resend the Email',
    };
  }
  return { success: 'Confirmation email sent, please verify your account!' };
};
