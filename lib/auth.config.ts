import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Edge-safe auth config (no Prisma/Node.js-only imports).
// Used by proxy.ts which runs on the edge runtime.
export const authConfig = {
  providers: [
    Credentials({
      name: "username and password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // authorize is defined in auth.ts where Prisma is available
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
