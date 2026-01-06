import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL || 'file:./dev.db'

const prismaClientSingleton = () => {
    try {
        const adapter = new PrismaLibSql({
            url: connectionString,
        })
        return new PrismaClient({ adapter })
    } catch (e) {
        console.error('Failed to initialize Prisma adapter/client:', e)
        // Fallback to default client if adapter fails - useful for build steps if binaries are missing
        return new PrismaClient()
    }
}

export const prisma = globalForPrisma.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
