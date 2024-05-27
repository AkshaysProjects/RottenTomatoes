"use client";

import MediaCard from "@/components/MediaCard";
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

  // If loading, show loading message
  // TODO: Use Skeleton loader
  if (isLoading) return <div>Loading...</div>;

  // If error or no data, show error message
  if (isError || !data) return <div>Error: {error?.message}</div>;

  // Flatten the pages
  const media = data.pages.map((page) => page.data).flat();

  return (
    <div className="m-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {media.map((item) => (
        <MediaCard key={item._id.toString()} media={item} />
      ))}
    </div>
  );
}
