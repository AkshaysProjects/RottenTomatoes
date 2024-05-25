import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import dbConnection from "@/lib/dbConnect";
import { createCaller } from "@/server/api/routes";
import { createTRPCContext } from "@/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    db: dbConnection,
    headers: heads,
  });
});

export const api = createCaller(createContext);
