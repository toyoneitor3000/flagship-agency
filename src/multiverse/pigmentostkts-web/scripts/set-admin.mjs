import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'camilotoloza1136@gmail.com';

async function main() {
    // 1. Set Camilo Toloza as ADMIN
    const adminUser = await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { role: 'ADMIN' },
    });
    console.log(`✅ ${adminUser.name} (${adminUser.email}) ahora es ADMIN`);

    // 2. Demote any other admins back to USER
    const demoted = await prisma.user.updateMany({
        where: {
            email: { not: ADMIN_EMAIL },
            role: 'ADMIN',
        },
        data: { role: 'USER' },
    });
    console.log(`🔒 ${demoted.count} otros usuarios fueron degradados a USER`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
