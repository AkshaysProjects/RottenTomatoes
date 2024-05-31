// Define props interface for Synopsis component
export interface ISynopsisProps {
  summary: string;
}

function Synopsis({ summary }: ISynopsisProps) {
  return (
    <div className="mb-4">
      {/* Display synopsis title */}
      <div className="mb-2 text-lg font-bold">Synopsis</div>
      {/* Display synopsis summary */}
      <p className="text-base">{summary}</p>
    </div>
  );
}

export default Synopsis;
