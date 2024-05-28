"use client";

import JotaiLoader from "@/loaders/JotaiLoader";
import { Provider } from "jotai";

export interface IJotaiProviderProps {
  children: React.ReactNode;
}

export function JotaiProvider({ children }: IJotaiProviderProps) {
  return (
    <Provider>
      <JotaiLoader />
      {children}
    </Provider>
  );
}
