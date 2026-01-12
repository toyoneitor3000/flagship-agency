
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
            accounts: true,
            sessions: true
        }
    });

    console.log('___ FULL USER DEBUG ___');
    users.forEach(u => {
        console.log(`User: [${u.id}] ${u.email} (${u.name})`);
        console.log(`  Role: ${u.role}`);
        if (u.accounts.length > 0) {
            console.log(`  Linked Accounts (${u.accounts.length}):`);
            u.accounts.forEach(a => {
                console.log(`    - Provider: ${a.provider}`);
                console.log(`    - Provider Account ID: ${a.providerAccountId}`);
            });
        } else {
            console.log(`  No linked accounts.`);
        }
        console.log(`  Active Sessions: ${u.sessions.length}`);
        console.log('---');
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
