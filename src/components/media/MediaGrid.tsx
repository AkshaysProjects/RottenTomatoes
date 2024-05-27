import MediaCard from "@/components/media/MediaCard";
import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";
import Grid from "@/components/ui/grid";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { TMedia } from "@/models";

export interface IMediaGridProps {
  media: TMedia[];
  fetchNextPage: () => void;
  isFetching: boolean;
}

export default function MediaGrid({
  media,
  fetchNextPage,
  isFetching,
}: IMediaGridProps) {
  // Intersection ref for infinite scrolling
  const intersectionRef = useInfiniteScroll(fetchNextPage);

  return (
    <Grid>
      {media.map((item, index) => (
        <div
          key={item._id.toString()}
          ref={index === media.length - 1 ? intersectionRef : null}
        >
          <MediaCard key={item._id.toString()} media={item} />
        </div>
      ))}
      {isFetching && <LoadingSkeleton />}
    </Grid>
  );
}
