import { Media } from "@/models";
import { filtersSchema } from "@/schemas";
import createQuery from "@/utils/createQuery";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

/**
 * TRPC router for media-related procedures:
 * - getMedia: Fetches all media items with optional filters and pagination.
 * - getMediaById: Fetches a single media item by its ID.
 * - getMediaFilters: Fetches available filters for media items.
 */
export const mediaRouter = createTRPCRouter({
  getMedia: publicProcedure
    .input(
      z
        .object({
          cursor: z.number().default(1), // Cursor for pagination, default is 1
          filters: filtersSchema, // Filters for querying media
        })
        .default({ cursor: 1 }), // Default input values
    )
    .query(async ({ ctx, input: { cursor, filters } }) => {
      await ctx.db;
      const offset = cursor ? cursor - 1 : 0;
      const query = createQuery(filters);
      const data = await Media.find(query).skip(offset).limit(20).lean();
      return data.length === 20 ? { data, nextCursor: cursor + 20 } : { data };
    }),

  getMediaById: publicProcedure
    .input(z.object({ id: z.string() })) // Input validation to ensure ID is a string
    .query(async ({ ctx, input: { id } }) => {
      await ctx.db;
      return Media.findById(id).lean();
    }),

  getMediaFilters: publicProcedure.query(async ({ ctx }) => {
    await ctx.db;

    // Fetch distinct languages
    const languages = await Media.distinct("language");

    // Fetch distinct status
    const status = await Media.distinct("status");

    // Fetch distinct genres
    const genres = await Media.aggregate([
      { $unwind: "$genres" },
      { $group: { _id: "$genres" } },
    ]).then((res) => res.map((g) => g._id));

    // Fetch min and max release years
    const releaseYear = await Media.aggregate([
      {
        $group: {
          _id: null,
          releaseYears: { $addToSet: { $year: "$releaseDate" } },
          firstAirYears: { $addToSet: { $year: "$firstAirDate" } },
        },
      },
      {
        $project: {
          releaseYears: { $setUnion: ["$releaseYears", "$firstAirYears"] },
        },
      },
      { $unwind: "$releaseYears" },
      {
        $group: {
          _id: null,
          minReleaseYear: { $min: "$releaseYears" },
          maxReleaseYear: { $max: "$releaseYears" },
        },
      },
      {
        $project: {
          _id: 0,
          minReleaseYear: 1,
          maxReleaseYear: 1,
        },
      },
    ]);

    return {
      languages,
      status,
      genres,
      releaseYear: Object.values(releaseYear[0]) as [number, number],
    };
  }),
});
