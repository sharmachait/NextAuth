import _dbContext from '@/lib/dbContext';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await _dbContext.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await _dbContext.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};
