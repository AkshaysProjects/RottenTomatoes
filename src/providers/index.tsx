import { TRPCReactProvider } from "./TRPCReactProvider";

export interface IProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProvidersProps) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
