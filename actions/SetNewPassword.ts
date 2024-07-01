'use server';
import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/passowrd-reset-token';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import _dbContext from '@/lib/dbContext';

export const setNewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (token === null) {
    return { error: 'Invalid token!' };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid token!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'No account associated with this token!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await _dbContext.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await _dbContext.passwordResetToken.delete({
    where: { id: existingToken.id },
  });
  return { success: 'Password updated!' };
};
