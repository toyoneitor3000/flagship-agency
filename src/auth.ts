
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    // adapter: PrismaAdapter(prisma), // Disabled for Production stability (SQLite not supported on Vercel)
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    callbacks: {
        async session({ session, user }: any) {
            if (session.user) {
                session.user.id = user.id;
                const adminEmails = ['camilotoloza1136@gmail.com', 'purpuregamechanger@gmail.com'];
                // Force Admin role for specific emails, otherwise fallback to DB role
                if (adminEmails.includes(user.email)) {
                    session.user.role = 'admin';
                } else {
                    session.user.role = user.role || 'user';
                }
            }


            return session;
        },
    },
})





