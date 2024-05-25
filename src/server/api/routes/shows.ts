import { Media } from "@/models";
import { MediaType } from "@/models/Media";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Create a new router for shows
export const showsRouter = createTRPCRouter({
  // Procedure to get all shows
  getAllShows: publicProcedure
    .input(z.object({ page: z.number() }).default({ page: 1 }))
    .query(async ({ ctx, input: { page } }) => {
      await ctx.db;
      const offset = page ? (page - 1) * 20 : 0;
      return Media.find({ type: MediaType.TV_SHOW })
        .skip(offset)
        .limit(20)
        .lean();
    }),
  // Procedure to get a show by its ID
  getShowById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      await ctx.db;
      return Media.findById(id).lean();
    }),
});
