import { Media } from "@/models";
import { MediaType } from "@/models/Media";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Create a new router for movies
export const moviesRouter = createTRPCRouter({
  // Procedure to get all movies
  getAllMovies: publicProcedure
    .input(z.object({ page: z.number() }).default({ page: 1 }))
    .query(async ({ ctx, input: { page } }) => {
      await ctx.db;
      const offset = page ? (page - 1) * 20 : 0;
      return Media.find({ type: MediaType.MOVIE })
        .skip(offset)
        .limit(20)
        .lean();
    }),
  // Procedure to get a movie by its ID
  getMovieById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      await ctx.db;
      return Media.findById(id).lean();
    }),
});
