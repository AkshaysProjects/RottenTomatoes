import { SessionProvider } from "next-auth/react";
import { JotaiProvider } from "./JotaiProvider";
import { TRPCReactProvider } from "./TRPCReactProvider";

export interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProvidersProps) {
  return (
    <JotaiProvider>
      <SessionProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </SessionProvider>
    </JotaiProvider>
  );
}
