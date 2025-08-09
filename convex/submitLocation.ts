import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getSubmits = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("submitLocation")
      .paginate(args.paginationOpts);
    return {
      ...result,
      page: result.page.map((item) => ({
        name: item.name,
        street: item.address,
        city: item.city,
        state: item.state,
        user: item.userId,
        id: item._id,
      })),
    };
  },
});

export const submit = mutation({
  args: {
    name: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const submitting = await ctx.db.insert("submitLocation", {
      name: args.name,
      address: args.address,
      city: args.city,
      state: args.state,
      userId: args.userId,
      approved: false,
    });
    return submitting;
  },
});
