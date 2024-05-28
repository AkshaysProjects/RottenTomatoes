"use client";

import { Input } from "@/components/ui/input";
import useSearch from "@/hooks/useSearch";
import { SearchIcon } from "lucide-react";

export default function Search() {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <div className="flex w-1/5 items-center justify-between rounded-full border-2 border-white bg-red-800 pl-4 text-white">
      <SearchIcon />
      <Input
        className="focus-visible: w-full rounded-full border-none bg-transparent text-white ring-0 placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
        type="search"
        placeholder="Search for Movies and TV Shows"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}
