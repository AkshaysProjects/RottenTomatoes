"use client";

import MediaGrid from "@/components/media/MediaGrid";
import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import Grid from "@/components/ui/grid";
import useFilters from "@/hooks/useFilters";
import { api } from "@/trpc/client";

export default function ShortlistPage() {
  // Fetch filters from search params
  const filters = useFilters();

  // Fetch all media
  const { data, isLoading, isFetching, isError, error, fetchNextPage } =
    api.shortlist.getShortlistItems.useInfiniteQuery(
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
