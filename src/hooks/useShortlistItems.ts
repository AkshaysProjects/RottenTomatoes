import { api } from "@/trpc/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useShortlist from "./useShortlist";

export default function useShortlistItems(mediaId: string) {
  // Fetch the current shortlist data using the custom hook
  const [shortlist, setShortlist] = useShortlist();
  const apiUtils = api.useUtils();

  // Fetch the current user session
  const session = useSession();

  // Initialize the router
  const router = useRouter();

  // Check if the media item is in the shortlist
  const isShortlisted = shortlist.data.includes(mediaId);

  // Add shortlist Mutation
  const addMutation = api.shortlist.addMedia.useMutation({
    onMutate: ({ id }) => {
      setShortlist((prev) => ({ ...prev, data: [...prev.data, id] }));
    },
    onError: (_err, { id }) => {
      setShortlist((prev) => ({
        ...prev,
        data: prev.data.filter((i) => i === id),
      }));
    },
  });

  // Remove shortlist Mutation
  const removeMutation = api.shortlist.removeMedia.useMutation({
    onMutate: async ({ id }) => {
      await apiUtils.shortlist.getShortlistItems.cancel();
      setShortlist((prev) => ({
        ...prev,
        data: prev.data.filter((i) => i !== id),
      }));
    },
    onError: (_err, { id }, context) => {
      setShortlist((prev) => ({
        ...prev,
        data: [...prev.data, id],
      }));
    },
    onSettled: () => {
      apiUtils.shortlist.getShortlistItems.invalidate();
    },
  });

  // Toggle shortlist status (functionality to be implemented)
  const toggleShortlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (session.status !== "authenticated") {
      router.push("/api/auth/signin");
      return;
    }
    if (!isShortlisted) addMutation.mutate({ id: mediaId });
    else removeMutation.mutate({ id: mediaId });
  };

  return { isShortlisted, toggleShortlist };
}
