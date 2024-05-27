import { Filters } from "@/schemas";
import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Parses URL search parameters into Filters object.
 * @param {ReadonlyURLSearchParams} searchParams - URL search parameters.
 * @returns {Filters} - Parsed Filters object.
 */
export default function parseFilters(
  searchParams: ReadonlyURLSearchParams,
): Filters {
  // Initialize an empty Filters object
  const filters: Filters = {};

  // Parse status parameter
  const status = searchParams.get("status");
  if (status) filters.status = status.split(",");

  // Parse rating parameter
  const rating = searchParams.get("rating");
  if (rating) filters.rating = rating.split(",").map((n) => parseInt(n, 10)); // Ensure base 10

  // Parse languages parameter
  const languages = searchParams.get("languages");
  if (languages) filters.languages = languages.split(",");

  // Parse releaseYear parameter
  const releaseYear = searchParams.get("releaseYear");
  if (releaseYear)
    filters.releaseYear = releaseYear.split(",").map((n) => parseInt(n, 10)); // Ensure base 10

  // Parse genres parameter
  const genres = searchParams.get("genres");
  if (genres) filters.genres = genres.split(",");

  // Parse query parameter
  const query = searchParams.get("query");
  if (query) filters.query = query;

  return filters; // Return the parsed Filters object
}
