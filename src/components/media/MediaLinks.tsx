import { FaImdb, FaYoutube } from "react-icons/fa";
import { FiLink } from "react-icons/fi";

// Define props interface for MediaLinks component
export interface IMediaLinksProps {
  homepage?: string;
  trailerUrl?: string;
  imdbId?: string;
}

function MediaLinks({ homepage, trailerUrl, imdbId }: IMediaLinksProps) {
  return (
    <div className="mt-4 flex flex-wrap">
      {/* Display homepage link if available */}
      {homepage && (
        <a
          href={homepage}
          className="mb-2 mr-2 flex items-center rounded-lg bg-blue-500 px-3 py-2 text-sm text-white md:text-base"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiLink className="mr-1 text-lg" />
          Website
        </a>
      )}
      {/* Display trailer link if available */}
      {trailerUrl && (
        <a
          href={trailerUrl}
          className="mb-2 mr-2 flex items-center rounded-lg bg-red-500 px-3 py-2 text-sm text-white md:text-base"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="mr-1 text-lg" />
          Trailer
        </a>
      )}
      {/* Display IMDb link if available */}
      {imdbId && (
        <a
          href={`https://www.imdb.com/title/${imdbId}`}
          className="mb-2 mr-2 flex items-center rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white md:text-base"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaImdb className="mr-1 text-lg" />
          IMDb
        </a>
      )}
    </div>
  );
}

export default MediaLinks;
