
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const connectionString = process.env.DATABASE_URL || 'file:./dev.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log('Connecting to:', connectionString);

let prisma;

try {
    const adapter = new PrismaLibSql({
        url: connectionString,
        authToken: authToken,
    });
    prisma = new PrismaClient({ adapter });
} catch (e) {
    console.warn('Adapter init failed, using default client (sqlite provider?):');
    console.warn(e.message);
    prisma = new PrismaClient();
}

async function main() {
    const users = await prisma.user.findMany();
    console.log('___ USER LIST ___');
    users.forEach(u => {
        console.log(`[${u.id}] ${u.email} | Role: ${u.role}`);
    });
    console.log('_________________');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
