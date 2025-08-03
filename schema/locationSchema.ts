import * as z from "zod";

export const location = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(5, "City must be at least 5 characters"),
  state: z.string().min(5, "State must be at least 5 characters"),
});
