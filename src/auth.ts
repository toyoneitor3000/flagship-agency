
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
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
                session.user.role = user.role || (user.email === 'camilotoloza1136@gmail.com' ? 'admin' : 'user');
            }


            return session;
        },
    },
})





