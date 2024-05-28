"use client";

import { useSetShortlist } from "@/hooks/useShortlist";
import { api } from "@/trpc/client";
import { Provider } from "jotai";
import { useEffect } from "react";

export interface IJotaiProviderProps {
  children: React.ReactNode;
}

export function JotaiProvider({ children }: IJotaiProviderProps) {
  // Get the setter for the shortlist atom
  const setShortlist = useSetShortlist();

  // Fetch the shortlist data using a custom hook from trpc client
  const { data, isLoading, isError, error } =
    api.shortlist.getShortlist.useQuery();

  useEffect(() => {
    if (isLoading) {
      // Update the shortlist atom state to loading
      setShortlist((prev) => ({ ...prev, status: "loading" }));
    } else if (isError) {
      // Update the shortlist atom state to error and store the error message
      setShortlist((prev) => ({
        ...prev,
        status: "error",
        error: error.message,
      }));
    } else if (data) {
      // Update the shortlist atom state to success and map the data to strings
      setShortlist((prev) => ({
        ...prev,
        status: "success",
        data: data.map((item) => item.toString()),
      }));
    }
  }, [data, isLoading, isError, error, setShortlist]);

  return <Provider>{children}</Provider>;
}
