import { Media } from "@/models";
import User from "@/models/User";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

/**
 * TRPC router for managing a user's media shortlist:
 * - getShortlist: Fetches the user's shortlist with pagination.
 * - addMedia: Adds a media item to the user's shortlist.
 * - removeMedia: Removes a media item from the user's shortlist.
 */
export const shortlistRouter = createTRPCRouter({
  // Procedure to get shortlist
  getShortlist: publicProcedure
    .input(z.object({ cursor: z.number() }).default({ cursor: 1 }))
    .query(async ({ ctx, input: { cursor } }) => {
      const session = await ctx.session;
      if (!session || !session.user)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      await ctx.db;
      const offset = cursor ? cursor - 1 : 0;
      const user = await User.findById(session.user.id);
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
      const data = await Media.find({ _id: { $in: user.shortlist } })
        .skip(offset)
        .limit(20)
        .lean();
      return data.length === 20 ? { data, nextCursor: cursor + 20 } : { data };
    }),

  // Procedure to add media to shortlist
  addMedia: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const session = await ctx.session;
      if (!session || !session.user)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      await ctx.db;
      const user = await User.findById(session.user.id);
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
      if (user.shortlist.includes(id)) return user.shortlist;
      user.shortlist.push(id);
      await user.save();
      return user.shortlist;
    }),

  // Procedure to remove media from shortlist
  removeMedia: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const session = await ctx.session;
      if (!session || !session.user)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      await ctx.db;
      const user = await User.findById(session.user.id);
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
      user.shortlist = user.shortlist.filter(
        (mediaId) => mediaId.toString() !== id,
      );
      await user.save();
      return user.shortlist;
    }),
});
