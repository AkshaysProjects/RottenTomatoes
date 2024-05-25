import { Media } from "@/models";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Create a new router for media
export const mediaRouter = createTRPCRouter({
  // Procedure to get all media
  getAllMedia: publicProcedure
    .input(z.object({ page: z.number() }).default({ page: 1 }))
    .query(async ({ ctx, input: { page } }) => {
      await ctx.db;
      const offset = page ? (page - 1) * 20 : 0;
      return Media.find().skip(offset).limit(20).lean();
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
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input: { query } }) => {
      await ctx.db;
      return Media.find({
        title: { $regex: query, $options: "i" },
      }).lean();
    }),
});
