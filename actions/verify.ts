'use server';
import _dbContext from '@/lib/dbContext';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const verify = async (token: string) => {
  console.log('here');
  const existingToken = await getVerificationTokenByToken(token);
  console.log({ existingToken });
  if (!existingToken) return { error: 'Invalid verification token' };
  const hasExpired = new Date(existingToken.expires) < new Date();
  console.log({ hasExpired });
  if (hasExpired) return { error: 'Verification token has Expired' };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: 'Account not found, Invalid Email' };
  console.log({ existingUser });

  await _dbContext.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await _dbContext.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Email verified. Please proceed with login.' };
};
