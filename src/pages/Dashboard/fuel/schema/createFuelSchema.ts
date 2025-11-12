import z from "zod";

export const createFuelSchema = z.object({
  name: z.string().min(5).max(20),
  fuelType: z.enum(["DIESEL", "GASOLINE", "PMS", "LPG"]),
  fuelVolume: z.string(),
  volumeLeft: z.string(),
  unit: z.enum(["LITRE", "GALLON"]),
  price_per: z.number().min(1),
});

export type ICreateFuelSchema = z.infer<typeof createFuelSchema>;
