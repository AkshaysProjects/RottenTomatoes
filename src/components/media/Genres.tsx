// Define props interface for Genres component
export interface IGenresProps {
  genres: string[];
}

function Genres({ genres }: IGenresProps) {
  return (
    <div className="mb-4">
      {/* Display genres title */}
      <div className="mb-2 text-lg font-bold">Genres</div>
      <div className="flex flex-wrap">
        {/* Display each genre */}
        {genres?.map((genre, index) => (
          <span
            key={index}
            className="mb-2 mr-2 rounded-full border border-red-500 bg-gray-600 px-4 py-2 text-sm capitalize text-white"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Genres;
