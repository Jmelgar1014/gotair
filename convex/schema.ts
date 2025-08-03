import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submitLocation: defineTable({
    name: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    userId: v.string(),
    approved: v.boolean(),
  }),
  tasks: defineTable({
    name: v.string(),
    address: v.string(),
    lat: v.number(),
    lng: v.number(),
  }),
});
