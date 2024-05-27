"use client";

import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import MediaGrid from "@/components/media/MediaGrid";
import Grid from "@/components/ui/grid";
import { api } from "@/trpc/client";

export default function Home() {
  // Fetch all media
  const { data, isLoading, isFetching, isError, error, fetchNextPage } =
    api.media.getAllMedia.useInfiniteQuery(
      {},
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
  const media = data.pages.map((page) => page.data).flat();

  return (
    <MediaGrid
      media={media}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
    />
  );
}
