import { MediaType } from "@/enums";
import { Filters } from "@/schemas";
import parseFilters from "@/utils/parseFilters";
import { usePathname, useSearchParams } from "next/navigation";

export default function useFilters() {
  // Fetch pathname
  const pathname = usePathname();

  // Fetch search params
  const searchParams = useSearchParams();

  // Parse filters from search params
  const filters: Filters = parseFilters(searchParams);

  // If pathname is /movies or /tv, set the type filter
  if (pathname === "/movies") filters.type = MediaType.MOVIE;
  if (pathname === "/tv") filters.type = MediaType.TV_SHOW;

  return filters;
}
