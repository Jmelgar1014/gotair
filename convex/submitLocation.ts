import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSubmits = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("submitLocation").collect();
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
