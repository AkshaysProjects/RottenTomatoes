import { MongooseAdapter } from "@brendon1555/authjs-mongoose-adapter";
import { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    ResendProvider({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
};
