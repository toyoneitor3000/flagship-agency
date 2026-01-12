
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        // Verify admin role
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        const userRole = (currentUser as any).role || 'user';
        if (userRole !== 'admin') {
            return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
        }

        // Fetch users
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { projects: true, domains: true }
                }
            }
        });

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
