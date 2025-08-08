import * as z from "zod";

export const addStationAdmin = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  lat: z.coerce.number().lte(90).gte(-90),
  lng: z.coerce.number().lte(180).gte(-180),
});
