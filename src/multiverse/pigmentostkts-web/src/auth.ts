import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "select_account",
          scope: "openid email profile",
          response_type: "code",
        },
      },
      token: "https://oauth2.googleapis.com/token",
      userinfo: "https://openidconnect.googleapis.com/v1/userinfo",
    })
  ],
  pages: {
    signIn: '/?login=true',
  },
  adapter: PrismaAdapter(prisma),
  trustHost: true,
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

      // Only query the DB on initial sign-in (account is present).
      // This runs in Node.js runtime (OAuth callback), NOT in Edge middleware.
      if (account) {
        try {
          const { cookies } = await import("next/headers");
          const cookieStore = cookies();
          const rememberMe = cookieStore.get("pigmento_remember_me")?.value === "true";

          if (!rememberMe) {
            token.shortExp = Math.floor(Date.now() / 1000) + (2 * 60 * 60);
          }
        } catch (e) {
          console.error("Could not read cookies in jwt callback", e);
        }

        // Fetch role from DB only on sign-in — this is safe because
        // the OAuth callback runs in Node.js, not Edge Runtime.
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
          });
          if (dbUser) {
            token.role = dbUser.role;
          }
        } catch (e) {
          console.error("Could not fetch user role from DB", e);
        }
      }

      // On subsequent requests (middleware/Edge), the role is already
      // persisted in the JWT token — no DB query needed.
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      return true;
    },
  },
});
