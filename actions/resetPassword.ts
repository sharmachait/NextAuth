'use server';
import { ResetSchema } from '@/schemas';
import * as z from 'zod';
import { getUserByEmail } from '@/data/user';
import { sendResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export default async function reset(values: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: 'No account linked to this email address!' };
  }

  const token = await generatePasswordResetToken(email);

  await sendResetEmail(email, token.token);

  return { success: 'Reset email sent!' };
}
