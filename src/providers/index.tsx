import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "./TRPCReactProvider";

export interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProvidersProps) {
  return (
    <SessionProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  );
}
