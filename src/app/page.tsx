"use client";

import MediaCard from "@/components/MediaCard";
import MediaCardSkeleton from "@/components/MediaCardSkeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
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

  // Intersection ref for infinite scrolling
  const intersectionRef = useInfiniteScroll(fetchNextPage);

  // If loading, show loading skeleton
  if (isLoading)
    return (
      <div className="m-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <MediaCardSkeleton key={index} />
          ))}
      </div>
    );

  // If error or no data, show error message
  if (isError && error) throw error;

  // If there is no data, throw an error
  if (!data || data.pages.length === 0) throw new Error("No data");

  // Flatten the pages
  const media = data.pages.map((page) => page.data).flat();

  return (
    <div className="m-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {media.map((item, index) => (
        <div
          key={item._id.toString()}
          ref={index === media.length - 1 ? intersectionRef : null}
        >
          <MediaCard key={item._id.toString()} media={item} />
        </div>
      ))}
      {isFetching &&
        Array(20)
          .fill(null)
          .map((_, index) => <MediaCardSkeleton key={index} />)}
    </div>
  );
}
