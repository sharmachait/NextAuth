'use server';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import _dbContext from '@/lib/dbContext';
import { getUserByEmail } from '@/data/user';

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

  //TODO: send verification email token

  return { success: 'Email sent, please verify your account!' };
};
