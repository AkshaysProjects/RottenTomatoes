import { useDebouncedValue } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

// Custom hook to manage search functionality with debouncing and URL query parameter updates
export default function useSearch() {
  // Get the current pathname, search parameters, and router from Next.js navigation
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize the search query state with the current 'query' parameter value from the URL, or an empty string if not present
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Debounce the search query state with a 500ms delay to limit the frequency of updates
  const [debouncedQuery] = useDebouncedValue(searchQuery, 500);

  // Memoize the updated search parameters to ensure they are recalculated only when necessary
  const updatedParams = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      // Set the 'query' parameter to the debounced query value if it's not empty
      params.set("query", debouncedQuery);
    } else {
      // Remove the 'query' parameter if the debounced query value is empty
      params.delete("query");
    }
    return params;
  }, [debouncedQuery, searchParams]);

  // Update the URL with the new search parameters whenever they change
  useEffect(() => {
    const newUrl =
      pathname +
      (updatedParams.toString() ? `?${updatedParams.toString()}` : "");
    router.replace(newUrl);
  }, [updatedParams, pathname, router]);

  // Handle input changes by updating the search query state
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Return the current search query and the handler function for input changes
  return { searchQuery, handleSearch };
}
