import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

async function main() {
    const orders = await p.order.findMany({
        include: { items: true, user: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
    });
    console.log('Total orders:', orders.length);
    orders.forEach(o => {
        console.log(`  Order ${o.id} | user: ${o.user?.email || 'guest'} | userId: ${o.userId} | amount: ${o.amount} | status: ${o.status} | items: ${o.items.length}`);
    });

    const users = await p.user.findMany({ select: { id: true, email: true, role: true } });
    console.log('\nUsers:');
    users.forEach(u => console.log(`  ${u.id} | ${u.email} | ${u.role}`));
}

main().catch(console.error).finally(() => p.$disconnect());
