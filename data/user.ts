import _dbContext from '@/lib/dbContext';

export const getUserByEmail = async (email: string) => {
  try {
    return await _dbContext.user.findUnique({
      where: { email: email },
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await _dbContext.user.findUnique({
      where: { id: id },
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};
