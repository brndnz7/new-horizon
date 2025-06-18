// Wrapper Prisma qui fonctionne avec ou sans client généré
let PrismaClient: any;
try {
  const prismaModule = require('@prisma/client');
  PrismaClient = prismaModule.PrismaClient;
} catch (error) {
  console.warn('Prisma client not available, using mock mode');
  PrismaClient = null;
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

// Wrapper qui gère les erreurs de connexion gracieusement
function createPrismaClient() {
  if (!PrismaClient) {
    console.warn('Prisma not available, using fallback mode');
    return null;
  }
  
  try {
    return new PrismaClient()
  } catch (error) {
    console.warn('Prisma connection failed, using fallback mode:', error)
    return null;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
} 