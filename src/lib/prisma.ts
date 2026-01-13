import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }


const connectionString = process.env.DATABASE_URL || 'file:./dev.db'
const authToken = process.env.TURSO_AUTH_TOKEN

const prismaClientSingleton = () => {
    try {
        if (!process.env.DATABASE_URL) {
            console.warn('⚠️ DATABASE_URL not set, falling back to local SQLite (file:./dev.db). This may fail in production.');
        }

        const adapter = new PrismaLibSql({
            url: connectionString,
            authToken: authToken,
        })
        return new PrismaClient({ adapter })
    } catch (e) {
        console.error('CRITICAL: Failed to initialize Prisma adapter/client:', e)
        // Fallback to default client
        return new PrismaClient()
    }
}


export const prisma = globalForPrisma.prisma || prismaClientSingleton()

// Silenced logger for production stability
// console.log('PRISMA CLIENT INITIALIZED WITH MODELS:', Object.keys(prisma).filter(k => !k.startsWith('$')));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


