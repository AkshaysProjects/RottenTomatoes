import { Skeleton } from "../ui/skeleton";

export default function MediaCardSkeleton() {
  return (
    <div className="group relative rounded-lg">
      <Skeleton className="relative h-56 w-full min-w-72 rounded-xl bg-gray-300" />
      <div className="w-full p-2">
        <div className="flex">
          <Skeleton className="h-6 w-36 bg-gray-300" />
          <div className="ml-auto">
            <Skeleton className="h-6 w-16 bg-gray-300" />
          </div>
        </div>
        <Skeleton className="mt-2 h-6 w-24 bg-gray-300" />
      </div>
    </div>
  );
}
