import z from "zod";

export const createFuelSchema = z.object({
  name: z.string().min(5).max(20),
  fuelType: z.enum(["DIESEL", "GASOLINE", "PMS", "LPG"]),
  fuelVolume: z.coerce.number(),
  volumeLeft: z.number().optional(),
  unit: z.enum(["LITRE", "GALLON"]),
  price_per: z.coerce.number().min(1),
});

export type ICreateFuelSchema = z.infer<typeof createFuelSchema>;
