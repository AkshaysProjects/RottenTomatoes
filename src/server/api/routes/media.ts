import { Media } from "@/models";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Create a new router for media
export const mediaRouter = createTRPCRouter({
  // Procedure to get all media
  getAllMedia: publicProcedure
    .input(z.object({ cursor: z.number().default(1) }).default({ cursor: 1 }))
    .query(async ({ ctx, input: { cursor } }) => {
      await ctx.db;
      const offset = cursor ? cursor - 1 : 0;
      const data = await Media.find().skip(offset).limit(20).lean();
      return { data, nextCursor: cursor + 20 };
    }),
  // Procedure to get a media by its ID
  getMediaById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      await ctx.db;
      return Media.findById(id).lean();
    }),
  // Search for shows
  searchMedia: publicProcedure
    .input(z.object({ query: z.string(), cursor: z.number().default(1) }))
    .query(async ({ ctx, input: { query, cursor } }) => {
      await ctx.db;
      const offset = cursor ? cursor - 1 : 0;
      const data = await Media.find({ title: { $regex: query, $options: "i" } })
        .skip(offset)
        .limit(20)
        .lean();
      return { data, nextCursor: cursor + 20 };
    }),
});
