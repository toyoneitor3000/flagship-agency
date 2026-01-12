import { exec } from 'child_process';
import { promisify } from 'util';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const execAsync = promisify(exec);

export async function GET() {
    const session = await auth();

    // Check if user is admin
    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Since we don't have the user object here, we might need to check role from DB or just rely on session if role is there
    // In our case, the session might already have the role if configured in NextAuth
    // But to be safe, we can check email against a list or query DB.
    // For now, let's assume session.user.role is available if we updated auth.ts

    // @ts-ignore - role might not be    // @ts-ignore
    if (session.user.role !== 'admin' && session.user.email !== 'camilotoloza1136@gmail.com') {
        return new NextResponse("Unauthorized", { status: 403 });
    }



    try {
        // Run git log. We need to specify the path to the repo if it's not the current one, 
        // but since this is running in the same environment, it should work.
        // We use a custom format to make it easy to parse.
        const { stdout } = await execAsync('git log -n 12 --pretty=format:"%h|%an|%ar|%s"');

        const commits = stdout.trim().split('\n').filter(Boolean).map(line => {
            const [hash, author, date, message] = line.split('|');
            return { hash, author, date, message };
        });

        return NextResponse.json(commits);
    } catch (error) {
        console.error("Git error:", error);
        return NextResponse.json({ error: 'Failed to fetch git history' }, { status: 500 });
    }
}
