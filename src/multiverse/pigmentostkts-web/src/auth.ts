import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google
  ],
  pages: {
    signIn: '/?login=true',
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }

      // Enforce our custom strictly short expiration if they didn't trust the device
      if (token.shortExp) {
        // Overwrite the session expiration to the short timestamp
        session.expires = new Date((token.shortExp as number) * 1000).toISOString() as any;
      }

      return session;
    },
    async jwt({ token, account }) {
      if (!token.sub) return token;

      // On initial sign-in, check the preference cookie
      if (account) {
        try {
          const { cookies } = await import("next/headers");
          const cookieStore = cookies();
          const rememberMe = cookieStore.get("pigmento_remember_me")?.value === "true";

          if (!rememberMe) {
            // For not trusted devices, force a much shorter expiration inside the token (e.g., 2 hours)
            token.shortExp = Math.floor(Date.now() / 1000) + (2 * 60 * 60);
          }
        } catch (e) {
          console.error("Could not read cookies in jwt callback", e);
        }
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!dbUser) return token;

      token.role = dbUser.role;
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      return true;
    },
  },
});
