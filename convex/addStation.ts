import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addStation = mutation({
  args: {
    name: v.string(),
    address: v.string(),
    lat: v.number(),
    lng: v.number(),
  },
  handler: async (ctx, args) => {
    const addStation = await ctx.db.insert("tasks", {
      name: args.name,
      address: args.address,
      lat: args.lat,
      lng: args.lng,
    });
    return addStation;
  },
});
