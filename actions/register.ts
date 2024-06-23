'use server';
import * as z from 'zod';
import { LoginSchema, RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  console.log('hello');
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  return { success: 'Email sent!' };
};
