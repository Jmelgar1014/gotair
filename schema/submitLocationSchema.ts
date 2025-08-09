import { z } from "zod";

export const submitLocationType = z.object({
  name: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  user: z.string(),
  id: z.string(),
});

export const getLocationType = z.object({
  page: z.array(submitLocationType),
  isDone: z.boolean(),
  continueCursor: z.string(),
  splitCursor: z.string().nullish(), // string | null | undefined
  pageStatus: z.enum(["SplitRecommended", "SplitRequired"]).nullish(),
});

// name: v.string(),
// address: v.string(),
// city: v.string(),
// state: v.string(),
// userId: v.string(),
export const insertLocationType = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  userId: z.string(),
});

export type insertToSubmitTable = z.infer<typeof insertLocationType>;
export type locationType = z.infer<typeof getLocationType>;

// export type paginationType = {
//   page: userSubmitType[];
//   isDone: boolean;
//   continueCursor: string;
//   splitCursor?: string | null;
//   pageStatus?: "SplitRecommended" | "SplitRequired" | null;
// };
