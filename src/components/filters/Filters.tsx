import { filters } from "@/constants/filters";
import { api } from "@/trpc/server";
import FilterPopover from "./FilterPopover";

export default async function Filters() {
  // Fetch available filter values from the API
  const filterValues = await api.media.getMediaFilters();

  return (
    <div className="flex h-16 items-center gap-2 overflow-auto border-b-2 md:mx-auto md:justify-center">
      {filters.map((filter) => (
        <FilterPopover
          key={filter.slug}
          type={filter.type}
          filter={filter.name}
          filterSlug={filter.slug}
          minValue={
            filter.minValue ??
            filterValues[filter.slug as keyof typeof filterValues][0]
          }
          maxValue={
            filter.maxValue ??
            filterValues[filter.slug as keyof typeof filterValues][1]
          }
          values={
            filter.values ??
            filterValues[filter.slug as keyof typeof filterValues]
          }
        />
      ))}
    </div>
  );
}
