import { api } from "@/trpc/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FaImdb, FaYoutube } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
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
      <div className="relative mx-auto mb-8 h-96 w-full lg:mx-8 lg:h-auto lg:max-w-xs lg:pb-0">
        <Image
          src={media.posterUrl}
          alt={media.title}
          className="rounded-xl object-cover"
          fill
        />
      </div>
      <div className="ml-auto flex w-full flex-col">
        <div className="flex items-center">
          <h1 className="mb-4 text-2xl font-bold lg:text-4xl">{media.title}</h1>
          <div className="ml-auto flex items-center gap-2 text-2xl font-bold text-red-800">
            <GiTomato />
            {Math.round(media.rating)}%
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 text-base md:grid-cols-4 lg:text-lg">
          {isMovie ? (
            <>
              <div>
                <div className="text-gray-400">Length</div>
                <div className="font-bold">{media.runtime} min.</div>
              </div>
              <div>
                <div className="text-gray-400">Release Year</div>
                <div className="font-bold">
                  {media.releaseDate && media.releaseDate.getFullYear()}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-gray-400">First Air Date</div>
                <div className="font-bold">
                  {media.firstAirDate &&
                    media.firstAirDate.toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Last Air Date</div>
                <div className="font-bold">
                  {media.lastAirDate && media.lastAirDate.toLocaleDateString()}
                </div>
              </div>
            </>
          )}
          <div>
            <div className="text-gray-400">Language</div>
            <div className="font-bold">{media.language}</div>
          </div>
          <div>
            <div className="text-gray-400">Status</div>
            <div className="font-bold">
              {media.status.charAt(0).toUpperCase() + media.status.slice(1)}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-lg font-bold">Genres</div>
          <div className="flex flex-wrap">
            {media.genres?.map((genre, index) => (
              <div
                key={index}
                className="mb-2 mr-2 rounded-full border border-red-500 bg-gray-600 px-4 py-2 text-sm capitalize text-white"
              >
                {genre}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-lg font-bold">Synopsis</div>
          <p className="text-base">{media.summary}</p>
        </div>

        <div className="mb-4">
          <div className="mb-2 text-lg font-bold">Cast</div>
          <div className="flex flex-wrap">
            {media.cast?.slice(0, 25).map((actor, index) => (
              <div
                key={index}
                className="mb-2 mr-2 rounded-full border border-red-500 bg-gray-600 px-4 py-2 text-sm capitalize text-white"
              >
                {actor}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap">
          {media.homepage && (
            <a
              href={media.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 mr-2 flex items-center rounded-lg bg-blue-500 px-3 py-2 text-sm text-white md:text-base"
            >
              <FiLink className="mr-1 text-lg" /> Website
            </a>
          )}
          {media.trailerUrl && (
            <a
              href={media.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 mr-2 flex items-center rounded-lg bg-red-500 px-3 py-2 text-sm text-white md:text-base"
            >
              <FaYoutube className="mr-1 text-lg" /> Trailer
            </a>
          )}
          {media.imdbId && (
            <a
              href={`https://www.imdb.com/title/${media.imdbId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 mr-2 flex items-center rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white md:text-base"
            >
              <FaImdb className="mr-1 text-lg" /> IMDb
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
