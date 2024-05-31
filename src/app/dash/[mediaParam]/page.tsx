import Filters from "@/components/filters/Filters";
import MediaPage from "@/components/media/MediaPage";
import { redirect } from "next/navigation";

export interface IMediaListPageProps {
  params: { mediaParam: string };
}

export default function MediaListPage({
  params: { mediaParam },
}: IMediaListPageProps) {
  if (mediaParam !== "movies" && mediaParam !== "shows") {
    redirect("/");
  }
  return (
    <>
      <Filters />
      <MediaPage />
    </>
  );
}
