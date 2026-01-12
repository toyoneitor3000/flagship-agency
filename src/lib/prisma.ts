import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }


const connectionString = process.env.DATABASE_URL || 'file:./dev.db'
const authToken = process.env.TURSO_AUTH_TOKEN

const prismaClientSingleton = () => {
    try {
        const adapter = new PrismaLibSql({
            url: connectionString,
            authToken: authToken,
        })
        return new PrismaClient({ adapter })
    } catch (e) {
        console.error('Failed to initialize Prisma adapter/client:', e)
        // Fallback to default client
        return new PrismaClient()
    }
}


export const prisma = globalForPrisma.prisma || prismaClientSingleton()

console.log('PRISMA CLIENT INITIALIZED WITH MODELS:', Object.keys(prisma).filter(k => !k.startsWith('$')));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


