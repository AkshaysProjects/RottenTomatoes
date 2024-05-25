import { Media } from "@/models";
import User from "@/models/User";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Create a new router for media
export const shortlistRouter = createTRPCRouter({
  // Procedure to get shortlist
  getShortlist: publicProcedure
    .input(z.object({ page: z.number() }).default({ page: 1 }))
    .query(async ({ ctx, input: { page } }) => {
      const session = await ctx.session;
      if (!session || !session.user)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      await ctx.db;
      const offset = page ? (page - 1) * 20 : 0;
      const user = await User.findById(session.user.id);
      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
      const total = user.shortlist.length;
      const totalPages = Math.ceil(total / 20);
      const data = await Media.find({ _id: { $in: user.shortlist } })
        .skip(offset)
        .limit(20)
        .lean();
      return { total, data, totalPages };
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
        (mediaId) => mediaId.toString() !== id
      );
      await user.save();
      return user.shortlist;
    }),
});
