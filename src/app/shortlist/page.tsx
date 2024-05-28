import { auth } from "@/auth";
import ShortlistPage from "@/components/media/ShortlistPage";
import { redirect } from "next/navigation";

export default async function Shortlist() {
  // Fetch session
  const session = await auth();

  // If no session, redirect to sign in
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return <ShortlistPage />;
}
