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
      const total = await Media.countDocuments();
      const totalPages = Math.ceil(total / 20);
      const data = await Media.find().skip(offset).limit(20).lean();
      return { total, data, totalPages };
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
    .input(z.object({ query: z.string(), page: z.number().default(1) }))
    .query(async ({ ctx, input: { query, page } }) => {
      await ctx.db;
      const offset = page ? (page - 1) * 20 : 0;
      const total = await Media.countDocuments({
        title: { $regex: query, $options: "i" },
      });
      const totalPages = Math.ceil(total / 20);
      const data = await Media.find({ title: { $regex: query, $options: "i" } })
        .skip(offset)
        .limit(20)
        .lean();
      return { total, data, totalPages };
    }),
});
