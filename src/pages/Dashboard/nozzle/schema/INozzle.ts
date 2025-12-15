import { z } from "zod";

export const NozzleSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(4).max(20),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  pumpId: z.coerce.number().optional(),
});

export type INozzleSchema = z.infer<typeof NozzleSchema>;

export const updateNozzleSchema = NozzleSchema.partial();
export type IUpdateNozzleSchema = z.infer<typeof updateNozzleSchema>;
