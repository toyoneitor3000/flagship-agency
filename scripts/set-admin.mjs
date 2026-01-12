
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
    const email = 'camilotoloza1136@gmail.com';
    console.log(`Promoting ${email} to admin...`);

    const user = await prisma.user.update({
        where: { email },
        data: { role: 'admin' }
    });

    console.log(`User ${user.email} is now ${user.role}.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
