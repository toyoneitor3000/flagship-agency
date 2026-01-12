
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const connectionString = process.env.DATABASE_URL || 'file:./dev.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

let prisma;
try {
    const adapter = new PrismaLibSql({
        url: connectionString,
        authToken: authToken,
    });
    prisma = new PrismaClient({ adapter });
} catch (e) {
    prisma = new PrismaClient();
}

async function main() {
    const users = await prisma.user.findMany({
        include: {
            accounts: true
        }
    });

    console.log('___ CURRENT DB STATE ___');
    for (const u of users) {
        console.log(`User: ${u.email} (ID: ${u.id})`);
        if (u.accounts.length === 0) {
            console.log('  - No accounts linked');
        } else {
            u.accounts.forEach(a => {
                console.log(`  - Linked Account: ${a.provider} / ${a.providerAccountId}`);
            });
        }
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
