import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import type { MutationCtx } from "./_generated/server";

type ReviewWithCritic = Doc<"reviews"> & {
  critic: Doc<"critics"> | null;
};

async function readReviewByLegacyId(ctx: MutationCtx, reviewId: number) {
  return await ctx.db
    .query("reviews")
    .withIndex("by_review_id", (q) => q.eq("review_id", reviewId))
    .unique();
}

async function attachCritic(
  ctx: MutationCtx,
  review: Doc<"reviews">,
): Promise<ReviewWithCritic> {
  const critic = await ctx.db
    .query("critics")
    .withIndex("by_critic_id", (q) => q.eq("critic_id", review.critic_id))
    .unique();

  return { ...review, critic };
}

export const update = mutation({
  args: {
    reviewId: v.number(),
    data: v.object({
      content: v.optional(v.string()),
      score: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args): Promise<ReviewWithCritic> => {
    const review = await readReviewByLegacyId(ctx, args.reviewId);
    if (!review) throw new ConvexError("Review cannot be found");

    await ctx.db.patch(review._id, {
      ...args.data,
      updated_at: new Date().toISOString(),
    });

    const updatedReview = await readReviewByLegacyId(ctx, args.reviewId);
    if (!updatedReview) throw new ConvexError("Review cannot be found");

    return attachCritic(ctx, updatedReview);
  },
});

export const destroy = mutation({
  args: {
    reviewId: v.number(),
  },
  handler: async (ctx, args): Promise<void> => {
    const review = await readReviewByLegacyId(ctx, args.reviewId);
    if (!review) throw new ConvexError("Review cannot be found");

    await ctx.db.delete(review._id);
  },
});
