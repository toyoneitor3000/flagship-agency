
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
        async jwt({ token, user }: any) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.email = user.email;

                // Hardcoded Admin Check (Temporary since DB is disabled)
                const adminEmails = ['camilotoloza1136@gmail.com', 'purrpurrdev@gmail.com', 'purpuregamechanger@gmail.com'];
                if (user.email && adminEmails.includes(user.email)) {
                    token.role = 'admin';
                } else {
                    token.role = 'user';
                }
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
})





