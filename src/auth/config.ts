import { type NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";

/**
 * Options for Auth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://authjs.dev/reference/nextjs
 */
export const authConfig: NextAuthConfig = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
