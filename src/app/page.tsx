"use client";

import MediaGrid from "@/components/media/MediaGrid";
import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import Grid from "@/components/ui/grid";
import { Filters } from "@/schemas";
import { api } from "@/trpc/client";
import parseFilters from "@/utils/parseFilters";
import { useSearchParams } from "next/navigation";

export default function Home() {
  // Fetch search params
  const searchParams = useSearchParams();

  // Fetch filters from search params
  const filters: Filters = parseFilters(searchParams);

  // Fetch all media
  const { data, isLoading, isFetching, isError, error, fetchNextPage } =
    api.media.getAllMedia.useInfiniteQuery(
      { filters },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  // If loading, show loading skeleton
  if (isLoading)
    return (
      <Grid>
        <LoadingSkeleton />
      </Grid>
    );

  // If error or no data, show error message
  if (isError && error) throw error;

  // If there is no data, throw an error
  if (!data || data.pages.length === 0) throw new Error("No data");

  // Flatten the pages
  const media = data.pages.flatMap((page) => page.data);

  return (
    <MediaGrid
      media={media}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
    />
  );
}
