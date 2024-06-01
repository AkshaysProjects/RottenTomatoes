"use client";

import MediaGrid from "@/components/media/MediaGrid";
import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import Grid from "@/components/ui/grid";
import useFilters from "@/hooks/useFilters";
import { api } from "@/trpc/client";
import Link from "next/link";

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

  // If there is no data, show a message indicating that the shortlist is empty
  if (!media || media.length === 0)
    return (
      <div
        className="bg-gray flex flex-col items-center justify-center"
        style={{ minHeight: "calc(100vh - 164px)" }} // Consider the navbar and filter bar height
      >
        <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-700">
            Your shortlist is empty
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Add some items to your shortlist to see them here.
          </p>
          <Link
            href="/dash"
            className="rounded-xl bg-red-600 px-6 py-3 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );

  return (
    <MediaGrid
      media={media}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
    />
  );
}
