import MediaCardSkeleton from "@/components/skeletons/MediaCardSkeleton";

export default function LoadingSkeleton() {
  return (
    <>
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <MediaCardSkeleton key={index} />
        ))}
    </>
  );
}
