import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Database connection test
export async function testDatabaseConnection() {
  try {
    await db.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Create initial user if doesn't exist
export async function createUserIfNotExists(email: string, name?: string) {
  try {
    const user = await db.user.upsert({
      where: { email },
      update: { lastLoginAt: new Date() },
      create: {
        email,
        name,
        credits: 10, // Free credits
        totalCredits: 10,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Get user with all relations
export async function getUserWithDetails(email: string) {
  try {
    return await db.user.findUnique({
      where: { email },
      include: {
        subscription: true,
        generations: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        transactions: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
}
