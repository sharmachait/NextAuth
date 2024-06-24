import { PrismaClient } from '@prisma/client';

const globalObj = global as unknown as { prisma: PrismaClient };

export const _dbContext = globalObj.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalObj.prisma = _dbContext;

export default _dbContext;
