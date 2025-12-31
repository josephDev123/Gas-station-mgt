import { z } from "zod";

export const ProfileSchema = z.object({
  avatar: z.string().url().or(z.instanceof(File)).optional(),
  address: z.string().optional(),
  phone_no: z.string().optional(),
});

export const UserRoleSchema = z.enum(["ATTENDANT", "ADMIN", "MANAGER"]);

export const UserSchema = z.object({
  email: z.string().email().optional().readonly(),
  name: z.string().min(1).optional(),
  //   password: z.string().min(6).optional(),
  role: UserRoleSchema,
  profile: ProfileSchema.nullable(),
});

export type IUserSchema = z.infer<typeof UserSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
