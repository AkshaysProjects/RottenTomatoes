import Cast from "@/components/media/Cast";
import Genres from "@/components/media/Genres";
import InfoItem from "@/components/media/InfoItem";
import MediaLinks from "@/components/media/MediaLinks";
import Synopsis from "@/components/media/Synopsis";
import { api } from "@/trpc/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { GiTomato } from "react-icons/gi";

export interface IMediaProps {
  params: { id: string };
}

export default async function Media({ params: { id } }: IMediaProps) {
  const media = await api.media.getMediaById({ id }).catch((error) => {
    throw error;
  });

  if (!media) {
    redirect("/404");
  }

  const isMovie = media.type === "Movie";

  return (
    <div className="flex flex-col rounded-lg bg-white p-4 lg:flex-row lg:p-8">
      <div className="relative mx-auto mb-8 h-96 w-full lg:mx-8 lg:h-auto lg:max-w-xs">
        <Image
          src={media.posterUrl}
          alt={media.title}
          className="rounded-xl object-cover"
          fill
        />
      </div>
      <div className="flex w-full flex-col lg:ml-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold lg:text-4xl">{media.title}</h1>
          <div className="flex items-center gap-2 text-2xl font-bold text-red-800">
            <GiTomato />
            {Math.round(media.rating)}%
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 text-base md:grid-cols-4 lg:text-lg">
          {isMovie ? (
            <>
              <InfoItem label="Length" value={`${media.runtime} min.`} />
              <InfoItem
                label="Release Year"
                value={media.releaseDate!.getFullYear()}
              />
            </>
          ) : (
            <>
              <InfoItem
                label="First Air Date"
                value={media.firstAirDate!.toLocaleDateString()}
              />
              <InfoItem
                label="Last Air Date"
                value={media.lastAirDate!.toLocaleDateString()}
              />
            </>
          )}
          <InfoItem label="Language" value={media.language} />
          <InfoItem label="Status" value={media.status} />
        </div>
        <Genres genres={media.genres} />
        <Synopsis summary={media.summary} />
        <Cast cast={media.cast} />
        <MediaLinks
          homepage={media.homepage}
          trailerUrl={media.trailerUrl}
          imdbId={media.imdbId}
        />
      </div>
    </div>
  );
}
