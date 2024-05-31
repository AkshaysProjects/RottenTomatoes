import { useSession } from "next-auth/react";
import ShortlistLoader from "./ShortlistLoader";

export default function JotaiLoader() {
  // Get the current user session
  const { status: sessionStatus } = useSession();

  // If user is not authenticated, return null
  if (sessionStatus !== "authenticated") return null;

  // If the user is authenticated, load the ShortlistLoader component
  return <ShortlistLoader />;
}
