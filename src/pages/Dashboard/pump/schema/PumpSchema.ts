import { z } from "zod";

export const pumpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Pump name must be at least 2 characters." })
    .max(20, { message: "Pump name must be at most 20 characters." }),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]),
});

export const pumpUpdateSchema = pumpSchema.partial();

export type IPumpSchema = z.infer<typeof pumpSchema>;
export type IPumpUpdateSchema = z.infer<typeof pumpUpdateSchema>;
