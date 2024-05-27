import { Media } from "@/models";
import { filtersSchema } from "@/schemas";
import createQuery from "@/utils/createQuery";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

/**
 * TRPC router for media-related procedures:
 * - getAllMedia: Fetches all media items with optional filters and pagination.
 * - getMediaById: Fetches a single media item by its ID.
 * - searchMedia: Searches for media items by a query string with optional filters and pagination.
 */
export const mediaRouter = createTRPCRouter({
  getAllMedia: publicProcedure
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

  searchMedia: publicProcedure
    .input(
      z.object({
        query: z.string(), // Query string for searching media titles
        cursor: z.number().default(1), // Cursor for pagination, default is 1
        filters: filtersSchema, // Filters for querying media
      }),
    )
    .query(async ({ ctx, input: { query, cursor, filters } }) => {
      await ctx.db;
      const offset = cursor ? cursor - 1 : 0;
      const filtersQuery = createQuery(filters);
      const data = await Media.find({
        title: { $regex: query, $options: "i" },
        ...filtersQuery,
      })
        .skip(offset)
        .limit(20)
        .lean();
      return data.length === 20 ? { data, nextCursor: cursor + 20 } : { data };
    }),
});
