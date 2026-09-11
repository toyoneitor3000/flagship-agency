import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'camilotoloza1136@gmail.com,purrpurrdev@gmail.com,purpuregamechanger@gmail.com')
    .split(',')
    .map(email => email.trim().toLowerCase());

export const { handlers, auth, signIn, signOut } = NextAuth({
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
        async signIn({ user }) {
            if (user?.email) {
                try {
                    const { prisma } = await import("@/lib/prisma");
                    const role = ADMIN_EMAILS.includes(user.email.toLowerCase()) ? 'admin' : 'user';
                    await prisma.user.upsert({
                        where: { email: user.email },
                        update: {
                            name: user.name,
                            image: user.image,
                            role,
                        },
                        create: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            role,
                        },
                    });
                } catch {
                    // Silently continue
                }
            }
            return true;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.email = user.email;

                if (user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) {
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
