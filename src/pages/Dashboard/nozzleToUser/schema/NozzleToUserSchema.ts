import { z } from "zod";

export const NozzleToUserSchema = z.object({
  id: z.number().int().positive(),
  nozzle_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  // status: TaskStatusEnum,
});
export type INozzleUserAssign = z.infer<typeof NozzleToUserSchema>;

export const UpdateNozzleToUserSchema = NozzleToUserSchema.partial();

export type IUpdateNozzleToUserSchema = z.infer<
  typeof UpdateNozzleToUserSchema
>;
