import { v4 as uuid } from 'uuid';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/passowrd-reset-token';
import _dbContext from '@/lib/dbContext';

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await _dbContext.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await _dbContext.verificationToken.create({
    data: { email, token, expires },
  });
  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await _dbContext.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await _dbContext.passwordResetToken.create({
    data: { email, token, expires },
  });
  return passwordResetToken;
};
