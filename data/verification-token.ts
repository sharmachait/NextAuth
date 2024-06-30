import _dbContext from '@/lib/dbContext';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    let verificationToken = _dbContext.verificationToken.findFirst({
      where: { email: email },
    });
    return verificationToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    let verificationToken = _dbContext.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};
