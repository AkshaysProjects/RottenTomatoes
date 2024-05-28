"use client";

import { Input } from "@/components/ui/input";
import useSearch from "@/hooks/useSearch";
import { SearchIcon } from "lucide-react";

export default function Search() {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <div className="3xl:w-1/5 ml-8 flex w-full items-center justify-between rounded-full border-2 border-white bg-red-800 pl-4 text-white lg:ml-0 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
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
