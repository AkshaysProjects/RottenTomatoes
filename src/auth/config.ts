import { MongooseAdapter } from "@brendon1555/authjs-mongoose-adapter";
import { type NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

/**
 * Options for Auth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://authjs.dev/reference/nextjs
 */
export const authConfig: NextAuthConfig = {
  adapter: MongooseAdapter(process.env.MONGODB_URI),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
