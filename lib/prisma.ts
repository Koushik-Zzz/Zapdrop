import { PrismaClient } from './generated/prisma/client'

/*
    * This file initializes a Prisma client instance.
    * It ensures that the Prisma client is a singleton to avoid multiple instances in production.
    * The client is used to interact with the PostgreSQL database.
*/

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: prismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

