import NextAuth from "next-auth";
import { authConfig } from "./config";

/*
 * Exporting the auth object, handlers, signIn, and signOut functions from Auth.js.
 *
 * This is the main entry point for the NextAuth configuration.
 *
 * @see https://authjs.dev/reference/nextjs
 */
export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
