import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";

export default function useInfiniteScroll(fetchNextPage: () => void) {
  // Ref for intersection observer
  const ref = useRef(null);

  // Use the intersection hook from Mantine
  const { ref: intersectionRef, entry } = useIntersection({
    root: ref.current,
    threshold: 1,
  });

  // If it's intersecting, fetch the next page
  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  // Return the intersection ref
  return intersectionRef;
}
