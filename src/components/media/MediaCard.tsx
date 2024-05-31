import useShortlistItems from "@/hooks/useShortlistItems";
import { TMedia } from "@/models";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  BookmarkMinusIcon,
  BookmarkPlusIcon,
  ClapperboardIcon,
  Tv2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GiTomato } from "react-icons/gi";

export interface IMediaCardProps {
  media: TMedia;
}

export default function MediaCard({ media }: IMediaCardProps) {
  // Fetch the shortlist status and toggle function
  const { isShortlisted, toggleShortlist } = useShortlistItems(
    media._id.toString(),
  );

  // Determine the media icon based on type
  const MediaIcon = media.type === "Movie" ? ClapperboardIcon : Tv2Icon;

  // Get the release year of the media item
  const releaseDate =
    media.type === "Movie" ? media.releaseDate : media.firstAirDate;
  const releaseYear = new Date(releaseDate ?? 0).getFullYear();

  return (
    <Link href={`/media/${media._id}`}>
      <div className="group relative rounded-lg">
        <div className="relative h-56 w-full min-w-72 overflow-hidden rounded-xl object-cover">
          <Image
            src={media.bannerUrl}
            alt={media.title}
            className="rounded-xl object-cover group-hover:opacity-90"
            fill
            sizes="100%"
          />
        </div>
        <div className="w-full p-2">
          <div>
            <div className="text-body-m text-light-blue flex font-light">
              {releaseYear} • <MediaIcon className="mx-1 inline-block" />
              {media.type}
              <div className="ml-auto flex items-center gap-2 font-semibold text-red-800">
                <GiTomato />
                {Math.round(media.rating)}%
              </div>
            </div>
            <div className="heading-xs mt-2">{media.title}</div>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full p-3">
          <button
            className="rounded-md bg-gray-800/80 p-2 hover:bg-gray-700"
            onClick={toggleShortlist}
          >
            {isShortlisted ? (
              <>
                <BookmarkCheckIcon className="block text-white group-hover:hidden" />
                <BookmarkMinusIcon className="hidden text-white group-hover:block" />
              </>
            ) : (
              <>
                <BookmarkIcon className="block text-white group-hover:hidden" />
                <BookmarkPlusIcon className="hidden text-white group-hover:block" />
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
