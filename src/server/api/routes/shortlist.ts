import { Media } from "@/models";
import { Types } from "mongoose";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

/**
 * TRPC router for managing a user's media shortlist:
 * - getShortlist: Fetches the user's shortlisted media ids.
 * - getShortlistItems: Fetches the user's shortlist items with pagination.
 * - addMedia: Adds a media item to the user's shortlist.
 * - removeMedia: Removes a media item from the user's shortlist.
 */
export const shortlistRouter = createTRPCRouter({
  // Procedure to get shortlist
  getShortlist: protectedProcedure.query(async ({ ctx: { db, user } }) => {
    await db;
    if (!user.shortlist) {
      user.shortlist = [];
      user.save();
    }
    return user.shortlist;
  }),

  // Procedure to get shortlist items
  getShortlistItems: protectedProcedure
    .input(z.object({ cursor: z.number().default(1) }).default({ cursor: 1 }))
    .query(async ({ ctx: { db, user }, input: { cursor } }) => {
      await db;
      const offset = cursor ? cursor - 1 : 0;
      const data = await Media.find({
        _id: { $in: user.shortlist.map((i) => i.toString()) },
      })
        .skip(offset)
        .limit(20)
        .lean();
      return data.length === 20 ? { data, nextCursor: cursor + 20 } : { data };
    }),

  // Procedure to add media to shortlist
  addMedia: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { db, user }, input: { id } }) => {
      await db;
      const objId = new Types.ObjectId(id);
      if (user.shortlist.includes(objId)) return user.shortlist;
      user.shortlist.push(objId);
      await user.save();
      return user.shortlist;
    }),

  // Procedure to remove media from shortlist
  removeMedia: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { db, user }, input: { id } }) => {
      await db;
      user.shortlist = user.shortlist.filter(
        (mediaId) => mediaId.toString() !== id,
      );
      await user.save();
      return user.shortlist;
    }),
});
