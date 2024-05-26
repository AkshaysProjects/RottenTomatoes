"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useTRPCClient from "@/hooks/useTRPCClient";
import { api } from "@/trpc/client";
import { useState } from "react";

export interface ITRPCReactProviderProps {
  children: React.ReactNode;
}

export function TRPCReactProvider({ children }: ITRPCReactProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const trpcClient = useTRPCClient();

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  );
}
