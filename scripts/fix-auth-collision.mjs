
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
    const userId = 'cmk235wla0000ldzeuizv4rvd';

    console.log(`Unlinking all Google accounts for user ${userId}...`);

    const { count } = await prisma.account.deleteMany({
        where: { userId: userId }
    });

    console.log(`Deleted ${count} linked account(s).`);
    console.log('Now, when you log in with a different Google account, it should create a NEW user instead of merging.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
