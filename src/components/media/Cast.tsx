// Define props interface for Cast component
export interface ICastProps {
  cast: string[];
}

function Cast({ cast }: ICastProps) {
  return (
    <div className="mb-4">
      {/* Display cast title */}
      <div className="mb-2 text-lg font-bold">Cast</div>
      <div className="flex flex-wrap">
        {/* Display each actor */}
        {cast?.slice(0, 25).map((actor, index) => (
          <span
            key={index}
            className="mb-2 mr-2 rounded-full border border-red-500 bg-gray-600 px-4 py-2 text-sm capitalize text-white"
          >
            {actor}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Cast;
